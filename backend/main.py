from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from functools import wraps
import json
import time
import dotenv
from werkzeug.security import generate_password_hash, check_password_hash
import secrets
from datetime import datetime, timedelta

app = Flask(__name__)
dotenv.load_dotenv()

# App Configuration
REVIEW_FILE = "backend/reviews.json"

# Admin credentials with password hashing
ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "S&S-Admin")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "S&S_Admin123$$")
ADMIN_PASSWORD_HASH = generate_password_hash(ADMIN_PASSWORD)

# Security configuration
SECRET_KEY = os.getenv("FLASK_SECRET_KEY", secrets.token_hex(32))
TOKEN_EXPIRATION_HOURS = 1

CORS(app)

# Token storage (in production, use a database)
active_tokens = {}

# Making sure the REVIEW_FILE path exists
os.makedirs(os.path.dirname(REVIEW_FILE), exist_ok=True)

def generate_auth_token():
    """Generate a secure random token with expiration"""
    token = secrets.token_urlsafe(32)
    expiration = datetime.now() + timedelta(hours=TOKEN_EXPIRATION_HOURS)
    active_tokens[token] = expiration
    return token

def validate_token(token):
    """Validate if token exists and hasn't expired"""
    if token not in active_tokens:
        return False
    if datetime.now() > active_tokens[token]:
        del active_tokens[token]
        return False
    return True

@app.route('/submit-review', methods=['POST'])
def submit_review():
    try:
        # Get JSON data from request
        data = request.get_json()
        if not data:
            return jsonify({"success": False, "error": "No data provided"}), 400

        name = data.get('name', 'Anonymous')
        message = data.get('message', '')
        photo_url = data.get('photo')  

        if not message:
            return jsonify({"success": False, "error": "Review message is required"}), 400

        review_data = {
            "name": name,
            "message": message,
            "image": photo_url or "https://cdn-icons-png.flaticon.com/512/4333/4333609.png",
            "timestamp": time.time()
        }

        # Save review to file
        reviews = []
        if os.path.exists(REVIEW_FILE):
            with open(REVIEW_FILE, 'r') as f:
                try:
                    reviews = json.load(f)
                except json.JSONDecodeError:
                    reviews = []

        reviews.append(review_data)
        
        with open(REVIEW_FILE, 'w') as f:
            json.dump(reviews, f, indent=4)

        return jsonify({
            "success": True, 
            "review": review_data
        })

    except Exception as e:
        app.logger.error(f"Error in submit_review: {str(e)}")
        return jsonify({
            "success": False,
            "error": "Internal server error"
        }), 500

@app.route('/get-reviews', methods=['GET'])
def get_reviews():
    try:
        if not os.path.exists(REVIEW_FILE):
            return jsonify([])
            
        with open(REVIEW_FILE, 'r') as f:
            try:
                reviews = json.load(f)
                return jsonify(reviews)
            except json.JSONDecodeError:
                return jsonify([])
                
    except Exception as e:
        app.logger.error(f"Error in get_reviews: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({"success": False, "error": "Authorization token required"}), 401
        
        token = auth_header.split(' ')[1]
        if not validate_token(token):
            return jsonify({"success": False, "error": "Invalid or expired token"}), 401
            
        return f(*args, **kwargs)
    return decorated_function

@app.route('/admin/login', methods=['POST'])
def admin_login():
    try:
        if not request.is_json:
            return jsonify({"success": False, "error": "Content-Type must be application/json"}), 400

        data = request.get_json()
        username = data.get('username', '').strip()
        password = data.get('password', '').strip()

        if not username or not password:
            return jsonify({"success": False, "error": "Username and password required"}), 400
        
        # Secure credential verification
        if username != ADMIN_USERNAME:
            # Don't reveal whether username exists
            time.sleep(1)  # Slow down brute force attempts
            return jsonify({"success": False, "error": "Invalid credentials"}), 401
            
        if not check_password_hash(ADMIN_PASSWORD_HASH, password):
            time.sleep(1)
            return jsonify({"success": False, "error": "Invalid credentials"}), 401
        
        # Generate auth token
        token = generate_auth_token()
        return jsonify({
            "success": True,
            "message": "Login successful",
            "token": token,
            "expires_in": TOKEN_EXPIRATION_HOURS * 3600
        })

    except Exception as e:
        app.logger.error(f"Admin login error: {str(e)}")
        return jsonify({"success": False, "error": "Internal server error"}), 500

@app.route('/testimonials', methods=['DELETE'])
@admin_required
def delete_all_reviews():
    try:
        with open(REVIEW_FILE, "w") as f:
            json.dump([], f)
        return jsonify({"success": True, "message": "All reviews deleted"})
    except Exception as e:
        app.logger.error(f"Failed to delete reviews: {str(e)}")
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == "__main__":
    app.secret_key = SECRET_KEY
    app.run(debug=True)