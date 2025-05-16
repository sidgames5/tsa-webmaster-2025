from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from functools import wraps
import json
import time

app = Flask(__name__)

# App Configuration
REVIEW_FILE = "backend/reviews.json"
ADMIN_CREDENTIALS = {
    "username": os.getenv("ADMIN_USERNAME", "admin"),
    "password": os.getenv("ADMIN_PASSWORD", "SproutAdmin123")
}

CORS(app)

# Making sure the REVIEW_FILE path exists
os.makedirs(os.path.dirname(REVIEW_FILE), exist_ok=True)

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
            "image": photo_url or "https://cdn-icons-png.flaticon.com/512/4333/4333609.png",  # Default avatar
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
        auth = request.authorization
        if not auth or not (auth.username == ADMIN_CREDENTIALS["username"] and auth.password == ADMIN_CREDENTIALS["password"]):
            return jsonify({"success": False, "error": "Authentication required"}), 401
        return f(*args, **kwargs)
    return decorated_function

@app.route('/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json()
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({"success": False, "error": "Username and password required"}), 400
    
    if data['username'] == ADMIN_CREDENTIALS["username"] and data['password'] == ADMIN_CREDENTIALS["password"]:
        return jsonify({"success": True, "message": "Login successful"})
    else:
        return jsonify({"success": False, "error": "Invalid credentials"}), 401

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
    app.run(debug=True)