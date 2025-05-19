"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import Link from "next/link";
import Image from "next/image";
import { sendOrderConfirmation } from './actions';
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
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [orderDetails, setOrderDetails] = useState({
        orderNumber: "",
        estimatedDelivery: "",
    });

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

    const generateOrderNumber = () => {
        return `ORD-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
    };

    const getEstimatedDelivery = () => {
        const now = new Date();
        now.setDate(now.getDate() + 3); // 3 days from now
        return now.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric'
        });
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

    // Update the sendOrder function in your checkout page
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
            // Generate order details
            const orderNumber = generateOrderNumber();
            const estimatedDelivery = getEstimatedDelivery();

            // Prepare order data
            const orderData = {
                customer: { name, email, phone, address },
                items: cart.map(item => ({
                    name: item.name,
                    price: item.price,
                    count: item.count
                })),
                total: getTotal(),
                orderNumber,
                estimatedDelivery
            };


            console.log("Order submitted:", orderData);

            // Send confirmation email
            const emailSent = await sendOrderConfirmation(orderData);

            if (!emailSent) {
                console.warn("Failed to send confirmation email");
            }

            // Set order details for success modal
            setOrderDetails({
                orderNumber,
                estimatedDelivery
            });

            // Show success modal
            setShowSuccessModal(true);

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

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={downloadPDF}
                                    className="flex-1 px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 flex items-center justify-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    Download Receipt
                                </button>
                                <button
                                    onClick={sendOrder}
                                    disabled={sending}
                                    className={`flex-1 px-6 py-2 text-white rounded ${sending ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                                        }`}
                                >
                                    {sending ? "Processing..." : "Place Order"}
                                </button>
                            </div>

                            {status.message && (
                                <p className={`text-sm mt-4 text-center ${status.isError ? "text-red-500" : "text-green-500"
                                    }`}>
                                    {status.message}
                                </p>
                            )}
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

                                <div className="text-sm text-gray-500 mt-4">
                                    <p>* Required fields</p>
                                    <p className="mt-2">We&apos;ll contact you to confirm your order details.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                <svg
                                    className="h-6 w-6 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold mt-3">Order Processed Successfully!</h2>
                            <p className="text-gray-600 mt-2">
                                Thank you for shopping with us.
                            </p>

                            <div className="mt-6 bg-gray-50 p-4 rounded-lg text-left">
                                <h3 className="font-medium">Order Details</h3>
                                <p className="mt-2 text-sm">
                                    <span className="font-medium">Order Number:</span> {orderDetails.orderNumber}
                                </p>
                                <p className="text-sm">
                                    <span className="font-medium">Estimated Delivery:</span> {orderDetails.estimatedDelivery}
                                </p>
                                <p className="text-sm mt-2">
                                    A confirmation has been sent to your email.
                                </p>
                            </div>

                            <div className="mt-6">
                                <button
                                    onClick={() => setShowSuccessModal(false)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;