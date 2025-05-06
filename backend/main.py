from flask import Flask, request, jsonify
from backend.email import send_email
from flask_cors import CORS
app = Flask(__name__)

CORS(app)
@app.route("/send-results", methods=['POST'])
def send_results():
    data = request.get_json()
    email = data.get('email')
    cart = data.get('cart', [])

    if not email:
        return jsonify({"success": False, "error": "Email is required"}), 400

    # Create HTML content from cart
    table_rows = ""
    for item in cart:
        total_price = float(item["price"].replace("$", "")) * item["count"]
        table_rows += f"<tr><td>{item['name']}</td><td>{item['count']}</td><td>${total_price:.2f}</td></tr>"

    message = f"""
    <html>
      <body>
        <h1>Your Sprout&Spoon Order Summary</h1>
        <table border="1" cellpadding="5">
          <tr><th>Item</th><th>Quantity</th><th>Total Price</th></tr>
          {table_rows}
        </table>
        <p>Thank you for your order!</p>
        <p>Best,<br>The Sprout&Spoon Team</p>
      </body>
    </html>
    """

    success = send_email(email, message)
    return jsonify({"success": success, "error": None if success else "Failed to send email"}), 500 if not success else 200

if __name__ == "__main__":
    app.run(debug=True)
