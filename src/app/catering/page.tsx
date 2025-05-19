'use client'
import React, { useState } from "react";
import { handleCateringSubmit } from "./actions";
import Image from "next/image";


const CateringPage: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleClick = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
        }, 3000);
    };

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        payment: "",
        eventType: "",
        eventDate: "",
        details: "",
    });



    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

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
            title: "Tuscan Greens",
            items: [
                "White Beans & Kale Stew",
                "Roasted Garlic Broccolini",
                "Stuffed Bell Peppers",
                "Toasted Focaccia",
            ],
            image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        },
        {
            title: "Coastal Herb Bowl",
            items: [
                "Lemon-Herb Couscous",
                "Grilled Zucchini & Squash",
                "Spinach & Artichoke Dip",
                "Rosemary Flatbread",
            ],
            image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTB8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
        },
    ];

    return (
        <div className=" text-[#2f2f2f] ">
            <div className="relative min-h-[50vh] w-full flex items-center justify-center bg-cover bg-center bg-fixed"
                style={{
                    backgroundImage: "url('https://cdn.pixabay.com/photo/2019/09/28/17/25/food-4511335_1280.jpg')",
                }}>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-7xl md:text-8xl font-bold text-white mb-4 tangerine-bold">Catering</h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto">
                        Let us bring the comfort of a vegetarian kitchen to your next special event
                    </p>
                </div>
            </div>

            <div className="py-24 bg-[#fcf7f2] flex flex-col items-center">
                <div className="text-center mb-16">
                    <h1 className="text-5xl text-[#4b3f2f] tracking-white">Special Events</h1>
                    <p className="mt-4 text-[#7c6f5f] text-lg max-w-xl mx-auto">
                        Whether it&apos;s an elegant wedding or an intimate, gathering, we provide unforgettable culinary experiences.
                    </p>
                </div>
                <div className="max-w-6xl w-full px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                        ["Weddings 💍", "Elegant menus crafted for your big day."],
                        ["Corporate Events 💼", "Professional service for business affairs."],
                        ["Private Parties 🎉", "From birthdays to reunions—we handle it all."]
                    ].map(([title, desc], i) => (
                        <div key={i} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-[#e4dacd]">
                            <h2 className="text-2xl font-semibold text-[#4b3f2f] mb-3">{title}</h2>
                            <p className="text-[#6e6256] text-lg leading-relaxed">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <section className="py-24 bg-gradient-to-br from-[#fdf4e4] to-[#f9eee0]">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-5xl font-extrabold text-center text-[#4b3f2f] mb-16 leading-tight">
                        Signature Meal Plans
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {mealPlans.map((meal, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="h-48 overflow-hidden">
                                    <Image
                                        src={meal.image}
                                        alt={meal.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                        width={512}
                                        height={512}
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
            {/* Contact Form */}
            <div className="bg-[#f5f9f4] py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-[#3e3e3e] mb-10">Request a Quote</h2>
                    <form action={handleCateringSubmit} onSubmit={handleClick} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            ["name", "Name", "text"],
                            ["email", "Email", "email"],
                            ["address", "Address", "text"],
                            ["payment", "Form of Payment", "text"],
                            ["eventType", "Event Type", "text"],
                            ["eventDate", "Event Date", "date"]
                        ].map(([name, placeholder, type]) => (
                            <input
                                key={name}
                                name={name}
                                type={type}
                                placeholder={placeholder}
                                value={formData[name as keyof typeof formData]}
                                onChange={handleChange}
                                className="p-4 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-300 transition"
                            />
                        ))}
                        <textarea
                            name="details"
                            placeholder="Additional Details"
                            value={formData.details}
                            onChange={handleChange}
                            className="md:col-span-2 p-4 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-300 transition min-h-[120px]"
                        />
                        <button
                            type="submit"
                            disabled={submitted}
                            className={`md:col-span-2 py-4 h-[60px] text-lg font-semibold rounded-xl transition-all duration-300 flex items-center justify-center ${submitted ? "bg-green-400" : "bg-green-600 hover:green-700"
                                } text-white`}
                        >
                            <span className={`transition-opacity duration-300 ${submitted ? "opacity-0 absolute" : "opacity-100"}`}>
                                Submit Request
                            </span>
                            <span className={`transition-opacity duration-300 ${submitted ? "opacity-100" : "opacity-0"} absolute`}>
                                ✅ Request Added!
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CateringPage;
