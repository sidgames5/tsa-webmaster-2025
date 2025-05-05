'use client';
import { FaLeaf, FaRecycle, FaSeedling, FaShippingFast, FaUtensils } from 'react-icons/fa';

export default function Home() {
  // Featured dishes data with expanded details
  const featuredDishes = [
    {
      id: 1,
      title: "Harvest Grain Bowl",
      description: "Quinoa, roasted sweet potatoes, kale, and tahini drizzle.",
      img: "/images/veggie_bowl.jpeg",
      ingredients: ["Quinoa", "Sweet Potatoes", "Kale", "Tahini", "Lemon", "Pumpkin Seeds"],
      calories: 520,
      seasonal: true,
      vegan: true
    },
    {
      id: 2,
      title: "Avocado Bloom Toast",
      description: "Sourdough, smashed avocado, heirloom tomatoes, microgreens.",
      img: "/images/avocado_toast.jpeg",
      ingredients: ["Sourdough", "Avocado", "Heirloom Tomatoes", "Microgreens", "Edible Flowers", "Sea Salt"],
      calories: 480,
      seasonal: false,
      vegan: true
    },
    {
      id: 3,
      title: "Summer Herb Pasta",
      description: "Fresh basil pesto, zucchini ribbons, sun-dried tomatoes.",
      img: "/images/pasta.jpeg",
      ingredients: ["Fresh Pasta", "Basil", "Zucchini", "Sun-dried Tomatoes", "Pine Nuts", "Parmesan"],
      calories: 610,
      seasonal: true,
      vegan: false
    }
  ];

  // Commitment items with SVG icons
  const commitments = [
    { 
      text: "Locally Sourced Ingredients", 
      icon: (
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
        </svg>
      ) 
    },
    { 
      text: "Organic Produce", 
      icon: (
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      ) 
    },
    { 
      text: "Seasonal Menus", 
      icon: (
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ) 
    },
    { 
      text: "Sustainable Practices", 
      icon: (
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </svg>
      ) 
    },
    { 
      text: "Plant-Based Innovation", 
      icon: (
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"/>
        </svg>
      ) 
    },
    { 
      text: "Zero-Waste Initiatives", 
      icon: (
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
        </svg>
      ) 
    }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "The most innovative plant-based cuisine I've ever experienced. Every bite was a revelation!",
      author: "Jamie L., Food Critic",
      role: "Local Guide"
    },
    {
      quote: "My go-to spot for fresh, flavorful meals that make me feel good about what I'm eating.",
      author: "Morgan T.",
      role: "Regular Customer"
    },
    {
      quote: "The seasonal tasting menu changed my perspective on vegetarian dining completely.",
      author: "Alex R.",
      role: "First-time Visitor"
    }
  ];

  return (
    <main className="flex flex-col items-center">
      {/* Hero Section with your original background image */}
      <section 
        className="relative w-full min-h-[50vh] max-h-[110vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/360_F_69024210_2JAt5Ura3ETabT3KVb1SNPkPNlWDbLKT.webp')",
        }}
        aria-label="Sprout & Spoon restaurant hero image"
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-6">
          <h1 className="tangerine-bold text-white text-7xl md:text-8xl mb-6 drop-shadow-lg">
            Sprout & Spoon
          </h1>
          <p className="text-white text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto">
            Exceptional food and service for your special events and everyday dining
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300">
              <a href="./reservations">Reserve a Table</a>
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white/20 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300">
            <a href="./menu">View Menu</a>
            </button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="w-full bg-amber-50 py-16 px-6 md:px-20 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-dm-serif italic text-3xl md:text-5xl text-green-800 mb-6">
            Committed to Green
          </h2>
          <p className="text-gray-700 text-lg md:text-xl mb-8">
            At Sprout & Spoon, we believe that eating well and living sustainably go hand in hand. 
            Our menu is rooted in fresh, locally sourced produce, crafted to bring out the best flavors each season has to offer. 
            Every dish we serve is a celebration of nature's bounty, designed to nourish both body and soul.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {commitments.map((item, index) => (
              <li key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex justify-center text-3xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">{item.text}</h3>
                <p className="text-gray-600">
                  {index === 0 && "Sourced within 50 miles"}
                  {index === 1 && "Certified organic or grown using organic practices"}
                  {index === 2 && "Menu changes quarterly to reflect what's in season"}
                  {index === 3 && "Composting, recycling, and energy-efficient operations"}
                  {index === 4 && "Creative dishes that celebrate plant-based ingredients"}
                  {index === 5 && "Minimizing food waste through careful planning"}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="w-full py-16 px-6 md:px-20 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-dm-serif italic text-3xl md:text-5xl text-green-800 mb-6">
            Signature Creations
          </h2>
          <p className="text-gray-600 text-lg md:text-xl mb-12 max-w-3xl mx-auto">
            From hearty grain bowls to vibrant seasonal salads, our chefs create dishes that are as nourishing as they are delicious.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDishes.map((dish) => (
              <div 
                key={dish.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={dish.img} 
                    alt={dish.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {dish.seasonal && (
                    <span className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Seasonal
                    </span>
                  )}
                  {dish.vegan && (
                    <span className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Vegan
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{dish.title}</h3>
                    <span className="text-gray-500 text-sm">{dish.calories} cal</span>
                  </div>
                  <p className="text-gray-600 mb-4">{dish.description}</p>
                  <div className="border-t border-gray-100 pt-4">
                    <h4 className="text-sm font-semibold text-green-700 mb-2">Key Ingredients:</h4>
                    <div className="flex flex-wrap gap-2">
                      {dish.ingredients.map((ingredient, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-16 px-6 md:px-20 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-dm-serif italic text-3xl md:text-5xl text-green-800 mb-12">
            Dining Experiences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex justify-center text-amber-400 text-2xl mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 italic text-lg mb-6">"{testimonial.quote}"</p>
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-semibold text-gray-800">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full py-16 px-6 md:px-20 bg-amber-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-dm-serif italic text-3xl md:text-5xl text-green-800 mb-6">
            Join Our Community
          </h2>
          <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
            Sign up for updates on seasonal menus, special events, and exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}