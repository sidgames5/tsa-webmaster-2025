'use client'
import React, { useState } from "react";
import { handleCateringSubmit } from "./actions";

const CateringPage: React.FC = () => {
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

    return (
        <div className="px-4 py-10 max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold mb-4">Catering Services</h1>
                <p className="text-lg text-gray-600">
                    Exceptional food and service for your special events.
                </p>
            </div>

            {/* Services Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <div className="p-6 bg-white shadow-lg rounded-2xl text-center">
                    <h2 className="text-xl font-semibold mb-2">Weddings</h2>
                    <p className="text-gray-600">Elegant menus crafted for your big day.</p>
                </div>

                <div className="p-6 bg-white shadow-lg rounded-2xl text-center">
                    <h2 className="text-xl text-center font-semibold mb-2">Corporate Events</h2>
                    <p className="text-gray-600">Professional catering for meetings, parties, and more.</p>
                </div>
                <div className="p-6 bg-white shadow-lg rounded-2xl text-center">
                    <h2 className="text-xl font-semibold mb-2">Private Parties</h2>
                    <p className="text-gray-600">From birthdays to reunions, we handle it all.</p>
                </div>
            </section>

            {/* Top Meal Plans */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-6">Top Meal Plans</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Italian Veggie Bowl */}
                    <div className="bg-amber-50 border border-yellow-100 rounded-2xl shadow-md flex flex-col md:flex-row overflow-hidden">
                        <div className="p-6 flex-1">
                            <h3 className="text-xl font-semibold mb-2 text-green-800">Italian Veggie Bowl </h3>
                            <ul className="text-gray=700 list-disc list-inside">
                                <li>Quinoa "Meatballs"</li>
                                <li>Spaghetti</li>
                                <li>Gharlic Herb Breadsticks</li>
                                <li>Fresh Basil Tomato Sauce</li>
                            </ul>
                        </div>
                        <img src="/images/remove_watermark_image_20250504_003125.jpg" alt="Dinner#1" className="w-full md:w-48 h-auto object-cover" />
                    </div>
                    <div className="bg-amber-50 border border-yellow-100 rounded-2xl shadow-md flex flex-col md:flex-row overflow-hidden">
                        <div className="p-6 flex-1">
                            <h3 className="text-xl font-semibold mb-2 text-green-800">Garden Fresh Delight</h3>
                            <ul className="text-gray=700 list-disc list-inside">
                                <li>Grilled Veggie Skewers</li>
                                <li>Herbed Quinoa Pilaf</li>
                                <li>Arugala & Citrus Salad</li>
                                <li>Chickpea Fritters</li>
                            </ul>
                        </div>
                        <img src="/images/remove_watermark_image_20250504_003125.jpg" alt="Dinner#2" className="w-full md:w-48 h-auto object-cover" />
                    </div>
                    <div className="bg-amber-50 border border-yellow-100 rounded-2xl shadow-md flex flex-col md:flex-row overflow-hidden">
                        <div className="p-6 flex-1">
                            <h3 className="text-xl font-semibold mb-2 text-green-800">Rustic Tuscan Greens</h3>
                            <ul className="text-gray=700 list-disc list-inside">
                                <li>White Beans & Kale Stew</li>
                                <li>Roasted Garlic Brocollini</li>
                                <li>Stuffed Bell Peppers</li>
                                <li>Toasted Focaccia</li>
                            </ul>
                        </div>
                        <img src="/images/remove_watermark_image_20250504_003125.jpg" alt="Dinner#2" className="w-full md:w-48 h-auto object-cover" />
                    </div>
                    <div className="bg-amber-50 border border-yellow-100 rounded-2xl shadow-md flex flex-col md:flex-row overflow-hidden">
                        <div className="p-6 flex-1">
                            <h3 className="text-xl font-semibold mb-2 text-green-800">Coastal Herb Harvest</h3>
                            <ul className="text-gray=700 list-disc list-inside">
                                <li>Lemon-Herb Couscous</li>
                                <li>Grilled Zucchini & Squash</li>
                                <li>Spinach & Artichoke Dip</li>
                                <li>Rosemary Flatbread</li>
                            </ul>
                        </div>
                        <img src="/images/remove_watermark_image_20250504_003125.jpg" alt="Dinner#2" className="w-full md:w-48 h-auto object-cover" />
                    </div>
                </div>
            </section>
            {/* Contact Form */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-center">Request a Quote</h2>
                <form action={handleCateringSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        name="name"
                        type="text"
                        placeholder="Name"
                        className="p-3 rounded-xl border border-gray-300"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="p-3 rounded-xl border border-gray-300"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        name="address"
                        type="text"
                        placeholder="Address"
                        className="p-3 rounded-xl border border-gray-300"
                        value={formData.address}
                        onChange={handleChange}
                    />
                    <input
                        name="payment"
                        type="text"
                        placeholder="Form of Payment"
                        className="p-3 rounded-xl border border-gray-300"
                        value={formData.payment}
                        onChange={handleChange}
                    />
                    <input
                        name="eventType"
                        type="text"
                        placeholder="Event Type"
                        className="p-3 rounded-xl border border-gray-300"
                        value={formData.eventType}
                        onChange={handleChange}
                    />
                    <input
                        name="eventDate"
                        type="date"
                        placeholder="Event Date"
                        className="p-3 rounded-xl border border-gray-300"
                        value={formData.eventDate}
                        onChange={handleChange}
                    />
                    <textarea
                        name="details"
                        placeholder="Additional Details"
                        className="md:col-span-2 p-3 rounded-xl border border-gray-300"
                        value={formData.details}
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        className="md:col-span-2 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition cursor-pointer"
                    >
                        Submit Request
                    </button>
                </form>
            </section>
        </div>
    );
};

export default CateringPage;
