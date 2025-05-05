'use client';

import { useState } from "react";

export default function CateringPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        payment: "",
        eventType: "",
        eventDate: "",
        details: "",
    });

    const mealPlans = [
        {
            title: "Italian Veggie Bowl",
            items: [
                "Quinoa \"Meatballs\"",
                "Spaghetti",
                "Garlic Herb Breadsticks",
                "Fresh Basil Tomato Sauce",
            ],
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        },
        {
            title: "Garden Fresh Delight",
            items: [
                "Grilled Veggie Skewers",
                "Herbed Quinoa Pilaf",
                "Arugula & Citrus Salad",
                "Chickpea Fritters",
            ],
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        },
        {
            title: "Rustic Tuscan Greens",
            items: [
                "White Beans & Kale Stew",
                "Roasted Garlic Broccolini",
                "Stuffed Bell Peppers",
                "Toasted Focaccia",
            ],
            image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        },
        {
            title: "Coastal Herb Harvest",
            items: [
                "Lemon-Herb Couscous",
                "Grilled Zucchini & Squash",
                "Spinach & Artichoke Dip",
                "Rosemary Flatbread",
            ],
            image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTB8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
        },
    ];

    const services = [
        {
            title: "Weddings",
            description: "Elegant menus crafted for your big day.",
            icon: "💍",
            gradient: "from-purple-500 to-blue-500"
        },
        {
            title: "Corporate Events",
            description: "Professional catering for meetings, parties, and more.",
            icon: "💼",
            gradient: "from-blue-500 to-teal-400"
        },
        {
            title: "Private Parties",
            description: "From birthdays to reunions, we handle it all.",
            icon: "🎉",
            gradient: "from-pink-500 to-orange-400"
        }
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50 font-sans text-gray-800">
            {/* Hero Section with Peach Gradient */}
            <section className="relative bg-gradient-to-r from-amber-200 to-orange-300 py-24 text-white">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative max-w-6xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                        Catering Services 
                    </h1>
                    <p className="text-xl md:text-2xl max-w-2xl mx-auto text-amber-100">
                        Exceptional food and service for your special events.
                    </p>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 bg-white/80 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        Our Catering Services
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div 
                                key={index} 
                                className={`bg-gradient-to-br ${service.gradient} text-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                            >
                                <div className="text-4xl mb-4">{service.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                                <p className="text-white/90">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Meal Plans Section */}
            <section className="py-16 bg-gradient-to-br from-blue-100 to-amber-100">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">
                        Signature Meal Plans
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {mealPlans.map((meal, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={meal.image}
                                        alt={meal.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-amber-600">
                                        {meal.title}
                                    </h3>
                                    <ul className="space-y-2">
                                        {meal.items.map((item, i) => (
                                            <li key={i} className="flex items-start">
                                                <span className="text-amber-600 mr-2">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-16 bg-white/80 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-gradient-to-br from-blue-50 to-amber-50 rounded-xl p-8 shadow-lg border border-white">
                        <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-amber-700">
                            Request a Quote
                        </h2>
                        <form 
                            className="space-y-4"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { name: "name", type: "text", placeholder: "Name" },
                                    { name: "email", type: "email", placeholder: "Email" },
                                    { name: "address", type: "text", placeholder: "Address" },
                                    { name: "payment", type: "text", placeholder: "Form of Payment" },
                                    { name: "eventType", type: "text", placeholder: "Event Type" },
                                    { name: "eventDate", type: "date", placeholder: "Event Date" },
                                ].map((field, i) => (
                                    <div key={i}>
                                        <input
                                            name={field.name}
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white/80"
                                            value={(formData as any)[field.name]}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                ))}
                            </div>
                            <div>
                                <textarea
                                    name="details"
                                    placeholder="Additional Details"
                                    rows={4}
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white/80"
                                    value={formData.details}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-amber-600 hover:from-blue-700 hover:to-amber-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                                >
                                    Submit Request
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}