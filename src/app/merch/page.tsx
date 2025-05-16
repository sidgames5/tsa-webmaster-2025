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

const menuSections: MenuSection[] = [
  {
    title: "Starters",
    items: [
      {
        name: "Stuffed Mushrooms",
        description: "Baked cremini mushrooms filled with herbs and vegan cheese.",
        price: "$9",
        ingredients: ["Cremini mushrooms", "Vegan cheese", "Fresh herbs", "Garlic", "Olive oil"],
        image: "https://images.unsplash.com/photo-1622268805718-ca073548d4ad?q=80&w=2610&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        name: "Avocado Toast",
        description: "Rustic bread topped with smashed avocado, radish, and sprouts.",
        price: "$7",
        ingredients: ["Sourdough bread", "Avocado", "Radish", "Microgreens", "Lemon zest"],
        image: "https://cdn.pixabay.com/photo/2020/02/06/12/36/breakfast-4824116_1280.jpg",
      },
      {
        name: "Seasonal Soup",
        description: "A rotating selection of fresh, locally-sourced soups.",
        price: "$8",
        ingredients: ["Seasonal vegetables", "Vegetable broth", "Fresh herbs"],
        image: "https://cdn.pixabay.com/photo/2023/05/27/13/49/soup-8021564_1280.jpg",
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
        image: "https://plus.unsplash.com/premium_photo-1726783346698-aeeee98bd358?q=80&w=2653&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        name: "Buddha Bowl",
        description: "Cheese, Onion, kale, and peppers.",
        price: "$14",
        ingredients: ["Cheese", "Onion", "Kale", "Pepper", "Lemon", "Cucumber"],
        image: "https://cdn.pixabay.com/photo/2018/04/21/03/47/food-3337621_1280.jpg",
      },
      {
        name: "Wild Rice Pilaf",
        description: "Wild rice and sautéed vegetables in a single dish.",
        price: "$18",
        ingredients: ["Acorn squash", "Wild rice", "Dried cranberries", "Pecans", "Sage"],
        image: "https://cd.pixabay.com/photo/WildRicePilaf.jpg",
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
        image: "https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552_1280.jpg",
      },
      {
        name: "Fruit Tart",
        description: "Crisp almond crust filled with vanilla custard and seasonal fruit.",
        price: "$8",
        ingredients: ["Almond flour", "Coconut milk", "Vanilla bean", "Seasonal berries"],
        image: "https://cdn.pixabay.com/photo/2016/03/27/19/23/tart-1283822_1280.jpg",
      },
      {
        name: "Chia Pudding",
        description: "Chia seeds soaked in coconut milk with a touch of maple syrup.",
        price: "$7",
        ingredients: ["Chia seeds", "Coconut milk", "Maple syrup", "Fresh fruit"],
        image: "https://cdn.pixabay.com/photo/2020/07/18/11/20/chia-5416921_1280.jpg",
      },
    ],
  },
];

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
    name: "Bamboo Plates 5pcs",
    price: "$11.99",
    image: "https://cdn.pixabay.com/photo/2020/05/15/09/35/dish-wooden-5172967_1280.jpg",
    description: "Eco-friendly plate set",
  },
];

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

export default function MerchPage() {
  const [showModal, setShowModal] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart: CartItem[] = JSON.parse(storedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        setCart([]);
      }
    }
  }, []);

  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.name === product.name && item.type === 'merch');
    const newCart = [...cart];
    
    if (existingItem) {
      existingItem.count += 1;
    } else {
      newCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        count: 1,
        description: product.description,
        image: product.image,
        type: 'merch'
      });
    }
    
    updateCart(newCart);
  };

  const addToFoodCart = (foodItem: MenuItem) => {
    const existingItem = cart.find(item => item.name === foodItem.name && item.type === 'food');
    const newCart = [...cart];
    
    if (existingItem) {
      existingItem.count += 1;
    } else {
      newCart.push({
        name: foodItem.name,
        price: foodItem.price,
        count: 1,
        description: foodItem.description,
        ingredients: foodItem.ingredients,
        type: 'food'
      });
    }
    
    updateCart(newCart);
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    updateCart(newCart);
  };

  const updateQuantity = (index: number, newCount: number) => {
    if (newCount < 1) return;
    
    const newCart = [...cart];
    newCart[index].count = newCount;
    updateCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.count, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      return total + (parseFloat(item.price.replace("$", ""))) * item.count;
    }, 0).toFixed(2);
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
                  <div key={item.name} className="bg-white rounded-lg shadow-md p-6 h-[400px]">
                    {item.image && (
                      <div className="h-48 w-full relative mb-4">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="rounded-2xl max-h-[200px] max-w-[300px] ml-7 mt-3" />
                      </div>
                    )}
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h4>
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">{item.price}</span>
                      <button
                        onClick={() => addToFoodCart(item)}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                      >
                        Add to Order
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Merchandise Section */}
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

        {/* About Section */}
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

        {/* Combined Cart Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Your Order ({getTotalItems()} items)</h2>
          {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
              <ul className="mb-6">
                {cart.map((item, index) => (
                  <li key={index} className="flex justify-between items-start py-3 border-b">
                    <div className="flex-1">
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
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <span className="font-medium">
                        ${(parseFloat(item.price.replace("$", "")) * item.count).toFixed(2)}
                      </span>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => updateQuantity(index, item.count - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-l hover:bg-gray-300"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.count}
                          onChange={(e) => updateQuantity(index, parseInt(e.target.value) || 1)}
                          className="w-12 text-center border-t border-b border-gray-300"
                        />
                        <button
                          onClick={() => updateQuantity(index, item.count + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-r hover:bg-gray-300"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-xl font-bold">${getTotalPrice()}</span>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={clearCart}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Clear Order
                </button>
                <Link 
                  href="/checkout" 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Materials Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sustainable Materials</h2>
              <p className="text-gray-700 mb-4">
                We use organic cotton, bamboo, recycled plastics, and other environmentally conscious
                materials to reduce waste and support sustainable practices.
              </p>
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Our Materials:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>100% Organic Cotton - Grown without harmful pesticides</li>
                  <li>Bamboo - Fast-growing and renewable resource</li>
                  <li>Recycled Polyester - Made from post-consumer plastic bottles</li>
                  <li>Natural Dyes - Plant-based coloring with low environmental impact</li>
                </ul>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="mt-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </motion.main>
    </div>
  );
}