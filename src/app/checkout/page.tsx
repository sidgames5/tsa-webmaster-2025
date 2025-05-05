"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { motion } from "framer-motion";
import Link from "next/link";
const CheckoutPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const grouped = {};

    storedCart.forEach(item => {
      if (grouped[item.name]) {
        grouped[item.name].count++;
      } else {
        grouped[item.name] = { ...item, count: 1 };
      }
    });

    setCart(Object.values(grouped));
  }, []);

  const getTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace("$", ""));
      return total + price * item.count;
    }, 0).toFixed(2);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Purchase Summary", 20, 20);
    doc.setFontSize(12);

    let y = 40;
    cart.forEach((item, index) => {
      const totalItemPrice = (parseFloat(item.price.replace("$", "")) * item.count).toFixed(2);
      doc.text(`${index + 1}. ${item.name} x${item.count} - $${totalItemPrice}`, 20, y);
      y += 10;
    });

    doc.text(`Total: $${getTotal()}`, 20, y + 10);
    doc.save("purchase-summary.pdf");
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 px-4 py-12 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
          <ul className="text-left mb-6">
            {cart.map((item, index) => (
              <li key={index} className="mb-2">
                {item.name} x{item.count} - ${(parseFloat(item.price.replace("$", "")) * item.count).toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="text-lg font-bold mb-4">Total: ${getTotal()}</p>
          <button
            onClick={downloadPDF}
            className="mb-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Download PDF
          </button>
          {/* Email sending logic (e.g. call backend to send email with order details) */}
          {/* Example: await fetch('/api/send-email', { method: 'POST', body: JSON.stringify(cart) }) */}
          <p className="text-sm text-gray-500">* You will also receive an email confirmation.</p>
          <Link href="/merch" className="text-blue-600 hover:underline font-medium">
            Back to Merch→
            </Link>
        </div>
        
      )}
    </motion.div>
  );
};

export default CheckoutPage;
