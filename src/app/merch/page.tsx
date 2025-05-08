"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface MenuItem {
  name: string;
  description: string;
  price: string;
  ingredients: string[];
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

// Assuming menuSections is imported here from the other file
const menuSections: MenuSection[] = [
  {
    title: "Starters",
    items: [
      {
        name: "Stuffed Mushrooms",
        description: "Baked cremini mushrooms filled with herbs and vegan cheese.",
        price: "$9",
        ingredients: ["Cremini mushrooms", "Vegan cheese", "Fresh herbs", "Garlic", "Olive oil"],
      },
      {
        name: "Avocado Toast",
        description: "Rustic bread topped with smashed avocado, radish, and sprouts.",
        price: "$7",
        ingredients: ["Sourdough bread", "Avocado", "Radish", "Microgreens", "Lemon zest"],
      },
      {
        name: "Seasonal Soup",
        description: "A rotating selection of fresh, locally-sourced soups.",
        price: "$8",
        ingredients: ["Seasonal vegetables", "Vegetable broth", "Fresh herbs"],
      },
    ],
  },
  {
    title: "Mains",
    items: [
      {
        name: "Grilled Vegetable Lasagna",
        description: "Layers of roasted veggies, plant-based cheese, and marinara sauce.",
        price: "$16",
        ingredients: ["Zucchini", "Eggplant", "Bell peppers", "Vegan ricotta", "Lasagna noodles"],
      },
      {
        name: "Chickpea Buddha Bowl",
        description: "Quinoa, roasted chickpeas, kale, and tahini dressing.",
        price: "$14",
        ingredients: ["Chickpeas", "Quinoa", "Kale", "Tahini", "Lemon", "Cucumber"],
      },
      {
        name: "Stuffed Acorn Squash",
        description: "Wild rice, cranberries, and pecans in a roasted squash half.",
        price: "$18",
        ingredients: ["Acorn squash", "Wild rice", "Dried cranberries", "Pecans", "Sage"],
      },
    ],
  },
  {
    title: "Desserts",
    items: [
      {
        name: "Vegan Chocolate Cake",
        description: "Decadent dark chocolate cake with coconut cream frosting.",
        price: "$9",
        ingredients: ["Dark chocolate", "Coconut cream", "Almond flour", "Maple syrup"],
      },
      {
        name: "Fruit Tart",
        description: "Crisp almond crust filled with vanilla custard and seasonal fruit.",
        price: "$8",
        ingredients: ["Almond flour", "Coconut milk", "Vanilla bean", "Seasonal berries"],
      },
      {
        name: "Chia Pudding",
        description: "Chia seeds soaked in coconut milk with a touch of maple syrup.",
        price: "$7",
        ingredients: ["Chia seeds", "Coconut milk", "Maple syrup", "Fresh fruit"],
      },
    ],
  },
]; // Replace with the actual path

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Organic Cotton T-Shirt",
    price: "$24.99",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    description: "Soft 100% organic cotton with minimalist print",
  },
  {
    id: 2,
    name: "Reusable Shopping Tote",
    price: "$15.99",
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d",
    description: "Durable canvas tote for everyday use",
  },
  {
    id: 3,
    name: "Ceramic Coffee Mug",
    price: "$18.99",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38",
    description: "Handcrafted mug with comfortable grip",
  },
  {
    id: 4,
    name: "Bamboo Utensil Set",
    price: "$22.99",
    image: "https://images.unsplash.com/photo-1583947581924-a6d188504e89",
    description: "Eco-friendly portable cutlery set",
  },
];

interface CartItem extends Product {
  count: number;
}

interface FoodCartItem extends MenuItem {
  quantity?: number;
}

interface FoodCart {
  [key: string]: FoodCartItem;
}

interface MerchCart {
  [key: string]: CartItem;
}

export default function MerchPage() {
  const [showModal, setShowModal] = useState(false);
  const [cart, setCart] = useState<MerchCart>({});
  const [foodCart, setFoodCart] = useState<FoodCart>({}); // New state for food cart

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart: Product[] = JSON.parse(storedCart);
        const grouped: MerchCart = {};
        parsedCart.forEach((item) => {
          if (grouped[item.name]) {
            grouped[item.name].count++;
          } else {
            grouped[item.name] = { ...item, count: 1 };
          }
        });
        setCart(grouped);
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        setCart({});
      }
    }

    // Load food cart from local storage
    const storedFoodCart = localStorage.getItem("foodCart");
    if (storedFoodCart) {
      try {
        const parsedFoodCart: FoodCart = JSON.parse(storedFoodCart);
        setFoodCart(parsedFoodCart);
      } catch (error) {
        console.error("Error parsing food cart from localStorage:", error);
        setFoodCart({});
      }
    }
  }, []);

  const addToCart = (product: Product) => {
    const newCart = { ...cart };
    if (newCart[product.name]) {
      newCart[product.name].count++;
    } else {
      newCart[product.name] = { ...product, count: 1 };
    }
    setCart(newCart);
    localStorage.setItem(
      "cart",
      JSON.stringify(
        Object.values(newCart).flatMap((item) =>
          Array(item.count).fill({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            description: item.description,
          })
        )
      )
    );
  };

  const addToFoodCart = (foodItem: MenuItem) => {
    const newFoodCart = { ...foodCart };
    if (newFoodCart[foodItem.name]) {
      newFoodCart[foodItem.name].quantity = (newFoodCart[foodItem.name].quantity || 0) + 1;
    } else {
      newFoodCart[foodItem.name] = { ...foodItem, quantity: 1 };
    }
    setFoodCart(newFoodCart);
    localStorage.setItem("foodCart", JSON.stringify(newFoodCart));
  };

  const clearFoodOrders = () => {
    setFoodCart({});
    localStorage.removeItem("foodCart");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12"
      >
        {/* Food Ordering Section */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-3xl font-bold text-green-700 mb-4"
          >
            Order Delicious Food
          </motion.h2>
          {menuSections.map((section) => (
            <div key={section.title} className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">{section.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.items.map((item) => (
                  <div key={item.name} className="bg-white rounded-lg shadow-md p-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h4>
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    <span className="text-lg font-bold text-gray-900">{item.price}</span>
                    <button
                      onClick={() => addToFoodCart(item)}
                      className="mt-3 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      Add to Order
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {Object.keys(foodCart).length > 0 && (
            <div className="mt-8">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Your Food Order</h4>
              <ul className="text-gray-800 mb-4">
                {Object.values(foodCart).map((item) => (
                  <li key={item.name}>
                    {item.name} x {item.quantity} - $
                    {item.price ? (parseFloat(item.price.replace("$", "")) * (item.quantity || 0)).toFixed(2) : '0.00'}
                  </li>
                ))}
              </ul>
              <button
                onClick={clearFoodOrders}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Clear Order
              </button>
              <Link href="/checkout" className="text-blue-600 hover:underline font-medium ml-4">
                Proceed to Checkout →
              </Link>
            </div>
          )}
        </div>

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
                staggerChildren: 0.1,
              },
            },
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
                    duration: 0.5,
                  },
                },
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
              {Object.values(cart).map((item) => (
                <li key={item.name}>
                  {item.name} x{item.count} - $
                  {(parseFloat(item.price.replace("$", "")) * item.count).toFixed(2)}
                </li>
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
              We use organic cotton, bamboo, recycled plastics, and other environmentally conscious
              materials to reduce waste and support sustainable practices.
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