"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import Link from "next/link";
import Image from "next/image";

interface CartItem {
  id?: number;
  name: string;
  price: string;
  count: number;
  description?: string;
  image?: string;
  ingredients?: string[];
  type: 'food' | 'merch';
}

const CheckoutPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ message: "", isError: false });
  const [emailValid, setEmailValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error("Error parsing cart:", error);
        setCart([]);
      }
    }
  };

  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const adjustQuantity = (index: number, change: number) => {
    const newCart = [...cart];
    newCart[index].count += change;
    
    if (newCart[index].count <= 0) {
      newCart.splice(index, 1);
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

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(phone);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Order Summary", 20, 20);
    doc.setFontSize(12);

    let y = 40;
    doc.text(`Customer: ${name}`, 20, y);
    y += 10;
    doc.text(`Email: ${email}`, 20, y);
    y += 10;
    doc.text(`Phone: ${phone}`, 20, y);
    y += 10;
    doc.text(`Delivery Address: ${address}`, 20, y);
    y += 15;

    doc.text("Order Items:", 20, y);
    y += 10;

    cart.forEach((item, index) => {
      const totalItemPrice = (
        parseFloat(item.price.replace("$", "")) * item.count
      ).toFixed(2);
      
      doc.text(`${index + 1}. ${item.name} x${item.count} - $${totalItemPrice}`, 20, y);
      
      if (item.description) {
        y += 7;
        doc.setFontSize(10);
        doc.text(`   ${item.description}`, 20, y);
        doc.setFontSize(12);
      }
      
      if (item.ingredients) {
        y += 7;
        doc.setFontSize(10);
        doc.text(`   Ingredients: ${item.ingredients.join(", ")}`, 20, y);
        doc.setFontSize(12);
      }
      
      y += 10;
    });

    doc.setFontSize(14);
    doc.text(`Total: $${getTotal()}`, 20, y + 10);
    doc.save("order-summary.pdf");
  };

  const sendOrder = async () => {
    if (!validateEmail(email)) {
      setStatus({ message: "Please enter a valid email address", isError: true });
      setEmailValid(false);
      return;
    }

    if (!validatePhone(phone)) {
      setStatus({ message: "Please enter a valid phone number", isError: true });
      setPhoneValid(false);
      return;
    }

    if (!name || !address) {
      setStatus({ message: "Please fill in all required fields", isError: true });
      return;
    }

    setSending(true);
    setStatus({ message: "", isError: false });

    try {
      // In a real app, you would send this to your backend
      console.log("Order submitted:", {
        customer: { name, email, phone, address },
        items: cart,
        total: getTotal()
      });

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus({
        message: "Order submitted successfully!",
        isError: false,
      });
      
      // Clear cart after successful submission
      clearOrder();
    } catch (error) {
      console.error("Order submission error:", error);
      setStatus({
        message: "Failed to submit order. Please try again.",
        isError: true,
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Checkout</h1>

        {cart.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">Your cart is empty.</p>
            <Link href="/merch" className="text-blue-600 hover:underline font-medium">
              Browse Menu & Merchandise →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-6">
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
                  <li key={index} className="py-3 border-b">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start">
                        {item.image && (
                          <div className="w-16 h-16 relative mr-4">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover rounded"
                              sizes="64px"
                              unoptimized={process.env.NODE_ENV !== "production"}
                            />
                          </div>
                        )}
                        <div>
                          <span className="font-medium">{item.name}</span>
                          {item.description && (
                            <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                          )}
                          {item.ingredients && (
                            <p className="text-sm text-gray-500 mt-1">
                              Ingredients: {item.ingredients.join(", ")}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <span className="font-medium">
                          ${(parseFloat(item.price.replace("$", "")) * item.count).toFixed(2)}
                        </span>
                        <div className="flex items-center mt-2">
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
                      </div>
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
            </div>

            {/* Checkout Form */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailValid(true);
                    }}
                    className={`w-full border ${emailValid ? "border-gray-300" : "border-red-500"} rounded px-4 py-2`}
                    required
                  />
                  {!emailValid && (
                    <p className="text-red-500 text-sm mt-1">Please enter a valid email</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setPhoneValid(true);
                    }}
                    className={`w-full border ${phoneValid ? "border-gray-300" : "border-red-500"} rounded px-4 py-2`}
                    required
                  />
                  {!phoneValid && (
                    <p className="text-red-500 text-sm mt-1">Please enter a valid phone number</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Address *
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    rows={3}
                    required
                  />
                </div>

                <button
                  onClick={sendOrder}
                  disabled={sending}
                  className={`w-full px-6 py-3 text-white rounded ${
                    sending ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {sending ? "Processing..." : "Place Order"}
                </button>

                {status.message && (
                  <p className={`text-sm text-center ${
                    status.isError ? "text-red-500" : "text-green-500"
                  }`}>
                    {status.message}
                  </p>
                )}

                <div className="text-sm text-gray-500 mt-4">
                  <p>* Required fields</p>
                  <p className="mt-2">We'll contact you to confirm your order details.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;