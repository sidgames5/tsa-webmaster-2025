"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Organic Cotton T-Shirt",
    price: "$24.99",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    description: "Soft 100% organic cotton with minimalist print"
  },
  {
    id: 2,
    name: "Reusable Shopping Tote",
    price: "$15.99",
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d",
    description: "Durable canvas tote for everyday use"
  },
  {
    id: 3,
    name: "Ceramic Coffee Mug",
    price: "$18.99",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38",
    description: "Handcrafted mug with comfortable grip"
  },
  {
    id: 4,
    name: "Bamboo Utensil Set",
    price: "$22.99",
    image: "https://images.unsplash.com/photo-1583947581924-a6d188504e89",
    description: "Eco-friendly portable cutlery set"
  }
];

export default function MerchPage() {
  const [showModal, setShowModal] = useState(false);
  const [cart, setCart] = useState({});

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
    setCart(grouped);
  }, []);

  const addToCart = (product) => {
    const newCart = { ...cart };
    if (newCart[product.name]) {
      newCart[product.name].count++;
    } else {
      newCart[product.name] = { ...product, count: 1 };
    }
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(Object.values(newCart).flatMap(item => Array(item.count).fill(item))));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12"
      >
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Our Merchandise
          </motion.h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sustainable products for your everyday life
          </p>
        </div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.5
                  }
                }
              }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-64 relative">
                <Image
                  src={`${product.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80`}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  unoptimized={process.env.NODE_ENV !== "production"}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">
                    {product.price}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(product)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Eco-Friendly Materials
            </h2>
            <p className="text-gray-600 mb-6">
              All products are made from sustainable materials with minimal environmental impact.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="text-green-600 hover:text-green-800 font-medium transition-colors"
            >
              Learn about our materials →
            </button>
          </motion.div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
          {Object.keys(cart).length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <ul className="text-gray-800 mb-4">
              {Object.values(cart).map((item, index) => (
                <li key={index}>{item.name} x{item.count} - ${(parseFloat(item.price.replace("$", "")) * item.count).toFixed(2)}</li>
              ))}
            </ul>
          )}
          <Link href="/checkout" className="text-blue-600 hover:underline font-medium">
            Link to Checkout →
          </Link>
        </div>
      </motion.main>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg text-center shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sustainable Materials</h2>
            <p className="text-gray-700 mb-4">
              We use organic cotton, bamboo, recycled plastics, and other environmentally conscious materials to reduce waste and support sustainable practices.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
