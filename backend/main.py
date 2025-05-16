from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import time
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

# Configuration
REVIEW_FILE = "backend/reviews.json"
ADMIN_USERNAME = "S&S-Admin"
ADMIN_PASSWORD_HASH = generate_password_hash("S&S_Admin123$$")

# Ensure directory exists
os.makedirs(os.path.dirname(REVIEW_FILE), exist_ok=True)

@app.route('/api/reviews', methods=['GET', 'OPTIONS'])
def get_reviews():
    if request.method == 'OPTIONS':
        return jsonify({}), 200
        
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
        return jsonify({"error": str(e)}), 500

@app.route('/api/submit-review', methods=['POST', 'OPTIONS'])
def submit_review():
    if request.method == 'OPTIONS':
        return jsonify({}), 200
        
    try:
        data = request.get_json()
        name = data.get('name', 'Anonymous')
        message = data.get('message', '')
        photo = data.get('photo')

        if not message:
            return jsonify({"success": False, "error": "Message required"}), 400

        review = {
            "name": name,
            "message": message,
            "image": photo or "https://cdn-icons-png.flaticon.com/512/4333/4333609.png",
            "timestamp": time.time()
        }

        # Load existing reviews
        reviews = []
        if os.path.exists(REVIEW_FILE):
            with open(REVIEW_FILE, 'r') as f:
                try:
                    reviews = json.load(f)
                except json.JSONDecodeError:
                    reviews = []

        reviews.append(review)
        
        # Save back to file
        with open(REVIEW_FILE, 'w') as f:
            json.dump(reviews, f, indent=4)

        return jsonify({"success": True, "review": review})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/admin/login', methods=['POST', 'OPTIONS'])
def admin_login():
    if request.method == 'OPTIONS':
        return jsonify({}), 200
        
    try:
        data = request.get_json()
        username = data.get('username', '').strip()
        password = data.get('password', '').strip()

        if not username or not password:
            return jsonify({"success": False, "error": "Credentials required"}), 400
        
        if username != ADMIN_USERNAME or not check_password_hash(ADMIN_PASSWORD_HASH, password):
            time.sleep(1)  # Basic brute force protection
            return jsonify({"success": False, "error": "Invalid credentials"}), 401
        
        return jsonify({
            "success": True,
            "message": "Login successful"
        })

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/admin/reviews', methods=['DELETE', 'OPTIONS'])
def delete_reviews():
    if request.method == 'OPTIONS':
        return jsonify({}), 200
        
    try:
        auth = request.authorization
        if not auth or not (auth.username == ADMIN_USERNAME and 
                          check_password_hash(ADMIN_PASSWORD_HASH, auth.password)):
            return jsonify({"success": False, "error": "Authentication required"}), 401

        with open(REVIEW_FILE, 'w') as f:
            json.dump([], f)
            
        return jsonify({"success": True, "message": "Reviews cleared"})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)