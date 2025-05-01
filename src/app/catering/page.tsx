'use client'
import React, { useState } from "react";
import axios from "axios";

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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/catering", formData);
      alert(response.data.message);  // Show success message
    } catch (error) {
      alert("Error submitting request!");  // Show error message
    }
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
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
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

      {/* Contact Form */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-center">Request a Quote</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            className="md:col-span-2 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
          >
            Submit Request
          </button>
        </form>
      </section>
    </div>
  );
};

export default CateringPage;
