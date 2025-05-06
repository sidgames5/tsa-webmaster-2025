"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import Link from "next/link";

interface CartItem {
  name: string;
  price: string;
  count: number;
}

const CheckoutPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ message: "", isError: false });
  const [emailValid, setEmailValid] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const grouped: Record<string, CartItem> = {};

    storedCart.forEach((item: CartItem) => {
      if (grouped[item.name]) {
        grouped[item.name].count++;
      } else {
        grouped[item.name] = { ...item, count: 1 };
      }
    });

    setCart(Object.values(grouped));
  };

  const updateCart = (newCart: CartItem[]) => {
    // Flatten the cart for localStorage
    const flatCart = newCart.flatMap(item => 
      Array(item.count).fill({ name: item.name, price: item.price })
    );
    localStorage.setItem("cart", JSON.stringify(flatCart));
    setCart(newCart.filter(item => item.count > 0)); // Remove items with 0 count
  };

  const adjustQuantity = (index: number, change: number) => {
    const newCart = [...cart];
    newCart[index].count += change;
    
    if (newCart[index].count <= 0) {
      newCart.splice(index, 1); // Remove item if count reaches 0
    }
    
    updateCart(newCart);
  };

  const clearOrder = () => {
    localStorage.removeItem("cart");
    setCart([]);
    setStatus({ message: "Order cleared", isError: false });
  };

  const getTotal = () => {
    return cart
      .reduce((total, item) => {
        const price = parseFloat(item.price.replace("$", ""));
        return total + price * item.count;
      }, 0)
      .toFixed(2);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Purchase Summary", 20, 20);
    doc.setFontSize(12);

    let y = 40;
    cart.forEach((item, index) => {
      const totalItemPrice = (
        parseFloat(item.price.replace("$", "")) * item.count
      ).toFixed(2);
      doc.text(`${index + 1}. ${item.name} x${item.count} - $${totalItemPrice}`, 20, y);
      y += 10;
    });

    doc.text(`Total: $${getTotal()}`, 20, y + 10);
    doc.save("purchase-summary.pdf");
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const sendEmail = async () => {
    if (!validateEmail(email)) {
      setStatus({ message: "Please enter a valid email address", isError: true });
      setEmailValid(false);
      return;
    }

    setSending(true);
    setStatus({ message: "", isError: false });

    try {
      const res = await fetch("http://localhost:5000/send-results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, cart }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const data = await res.json();
      
      if (data.success) {
        setStatus({
          message: "Order confirmation sent to your email!",
          isError: false,
        });
        clearOrder();
      } else {
        throw new Error(data.error || "Failed to send email");
      }
    } catch (error) {
      console.error("Email sending error:", error);
      setStatus({
        message: error instanceof Error ? error.message : "Failed to send email",
        isError: true,
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 text-center">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      {cart.length === 0 ? (
        <div>
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <Link href="/merch" className="text-blue-600 hover:underline font-medium">
            Browse Merchandise →
          </Link>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Your Order</h2>
            <button
              onClick={clearOrder}
              className="px-4 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
            >
              Clear Order
            </button>
          </div>

          <ul className="mb-6">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between items-center py-3 border-b">
                <div className="flex items-center">
                  <span className="font-medium">{item.name}</span>
                  <span className="ml-2 text-gray-500">${parseFloat(item.price.replace("$", "")).toFixed(2)}</span>
                </div>
                
                <div className="flex items-center">
                  <button
                    onClick={() => adjustQuantity(index, -1)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-l hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="w-10 text-center">{item.count}</span>
                  <button
                    onClick={() => adjustQuantity(index, 1)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-r hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-bold">Total:</span>
            <span className="text-xl font-bold">${getTotal()}</span>
          </div>

          <button
            onClick={downloadPDF}
            className="w-full mb-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Download PDF Receipt
          </button>

          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailValid(true);
              }}
              className={`border ${emailValid ? "border-gray-300" : "border-red-500"} rounded px-4 py-2 w-full mb-2`}
            />
            {!emailValid && (
              <p className="text-red-500 text-sm mb-2">Please enter a valid email</p>
            )}
            
            <button
              onClick={sendEmail}
              disabled={sending || !email || !validateEmail(email)}
              className={`w-full px-6 py-2 text-white rounded ${
                sending || !email || !validateEmail(email)
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {sending ? "Sending..." : "Send Confirmation Email"}
            </button>
            
            {status.message && (
              <p className={`mt-2 text-sm ${
                status.isError ? "text-red-500" : "text-green-500"
              }`}>
                {status.message}
              </p>
            )}
          </div>

          <Link href="/merch" className="text-blue-600 hover:underline font-medium">
            Continue Shopping →
          </Link>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;