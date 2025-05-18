'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { admin_reviews, adminLogin, getReviews, submitReview } from './actions';

interface Review {
    name: string;
    message: string;
    image: string;
    timestamp: number;
}

export default function Home() {
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
            img: "/images/avacado_toast.jpeg",
            ingredients: ["Sourdough", "Avocado", "Heirloom Tomatoes", "Microgreens", "Edible Flowers", "Sea Salt"],
            calories: 480,
            seasonal: false,
            vegan: false
        },
        {
            id: 3,
            title: "Summer Herb Pasta",
            description: "Fresh basil pesto, zucchini ribbons, sun-dried tomatoes.",
            img: "/images/spaghetti-1392266_1280.jpg", // fixed path
            ingredients: ["Fresh Pasta", "Basil", "Zucchini", "Sun-dried Tomatoes", "Pine Nuts", "Parmesan"],
            calories: 610,
            seasonal: true,
            vegan: false
        }
    ];

    const commitments = [
        {
            text: "Locally Sourced Ingredients",
            icon: (
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
            )
        },
        {
            text: "Organic Produce",
            icon: (
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            )
        },
        {
            text: "Seasonal Menus",
            icon: (
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            text: "Sustainable Practices",
            icon: (
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            )
        },
        {
            text: "Plant-Based Innovation",
            icon: (
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                </svg>
            )
        },
        {
            text: "Zero-Waste Initiatives",
            icon: (
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            )
        }
    ];

    const avatarList = [
        "https://cdn-icons-png.flaticon.com/512/4333/4333609.png",
        "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
        "https://cdn-icons-png.flaticon.com/512/921/921071.png",
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        "https://cdn-icons-png.flaticon.com/128/2202/2202112.png",
        "https://cdn-icons-png.flaticon.com/128/1256/1256650.png",
        "https://cdn-icons-png.flaticon.com/128/15537/15537905.png",
        "https://cdn-icons-png.flaticon.com/128/11498/11498793.png",
        "https://cdn-icons-png.flaticon.com/128/16683/16683419.png",
        "https://cdn-icons-png.flaticon.com/128/3641/3641988.png",
        "https://cdn-icons-png.flaticon.com/128/2920/2920072.png",
        "https://cdn-icons-png.flaticon.com/128/3135/3135823.png",
        "https://cdn-icons-png.flaticon.com/128/4015/4015967.png",
        "https://cdn-icons-png.flaticon.com/128/4015/4015994.png",
        "https://cdn-icons-png.flaticon.com/128/484/484945.png",
        "https://cdn-icons-png.flaticon.com/128/15375/15375450.png",
        "https://cdn-icons-png.flaticon.com/128/6705/6705530.png"
    ];
    const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/4333/4333609.png";

    const [reviews, setReviews] = useState<Review[]>([]);
    const [formData, setFormData] = useState({
        name: "",
        message: "",
        photo: defaultAvatar,
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
    const [adminCredentials, setAdminCredentials] = useState({
        username: "",
        password: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAdminProcessing, setIsAdminProcessing] = useState(false);

    useEffect(() => {
        async function loadReviews() {
            try {
                const fetchedReviews = await getReviews();
                setReviews(fetchedReviews);
                localStorage.setItem("reviews", JSON.stringify(fetchedReviews));
            } catch (error) {
                console.error("Error loading reviews:", error);
                const storedReviews = localStorage.getItem("reviews");
                if (storedReviews) setReviews(JSON.parse(storedReviews));
            }
        }
        loadReviews();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!formData.message.trim()) {
            alert("Please write a testimonial.");
            setIsSubmitting(false);
            return;
        }

        try {
            const fd = new FormData();
            fd.append('name', formData.name);
            fd.append('message', formData.message);
            fd.append('photo', formData.photo);

            const result = await submitReview(fd);

            if (result.success && result.review) {
                setReviews(prev => [result.review!, ...prev]);
                localStorage.setItem("reviews", JSON.stringify([result.review, ...reviews]));
            setFormData({ name: "", message: "", photo: defaultAvatar });
            setIsModalOpen(false);
          } else {
            throw new Error(result.error || "Submission failed");
          }
        } catch (error) {
          console.error("Submission error:", error);
          alert(error instanceof Error ? error.message : "An error occurred");
        } finally {
          setIsSubmitting(false);
        }
      };

    const handleAdminLogin = async () => {
        setIsAdminProcessing(true);
        try {
            const loginResult = await adminLogin(adminCredentials);
            
            if (!loginResult.success) {
                throw new Error(loginResult.error || "Login failed");
            }

            // If login successful, delete reviews
            const deleteResult = await admin_reviews('delete');
            
            if (deleteResult.success) {
                setReviews([]);
                localStorage.removeItem("reviews");
                setIsAdminModalOpen(false);
                alert("All testimonials cleared successfully");
            } else {
                throw new Error(deleteResult.error || "Failed to clear reviews");
            }
        } catch (error) {
            console.error("Admin operation failed:", error);
            alert(error instanceof Error ? error.message : "An error occurred");
        } finally {
            setIsAdminProcessing(false);
        }
    };

    const clearReviews = () => {
        setIsAdminModalOpen(true);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src = defaultAvatar;
    };

    return (
        <div className="relative flex flex-col justify-center items-center overflow-hidden">
            <section className="relative w-full min-h-[50vh] max-h-[110vh] flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: "url('/images/360_F_69024210_2JAt5Ura3ETabT3KVb1SNPkPNlWDbLKT.webp')" }}>
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 text-center px-6">
                    <h1 className="tangerine-bold text-white text-7xl md:text-8xl mb-6 drop-shadow-lg">
                        Sprout & Spoon
                    </h1>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/reservations">
                            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg font-medium">
                                Reserve a Table
                            </button>
                        </Link>
                        <Link href="/menu">
                            <button className="bg-transparent border-2 border-white hover:bg-white/20 text-white px-8 py-3 rounded-full text-lg font-medium">
                                View Menu
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="w-full bg-amber-50 py-16 px-6 md:px-20 text-center">
                <div className="max-w-6xl mx-auto">
                    <h2 className="font-dm-serif italic text-3xl md:text-5xl text-green-800 mb-6">
                        Committed to Green
                    </h2>
                    <p className="text-gray-700 text-lg md:text-xl mb-8">
                        At Sprout & Spoon, we believe that eating well and living sustainably go hand in hand.
                        Our menu is rooted in fresh, locally sourced produce, crafted to bring out the best flavors each season has to offer.
                        Every dish we serve is a celebration of nature&apos;s bounty, designed to nourish both body and soul.
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
                                    <Image
                                        src={dish.img}
                                        alt={dish.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                        width={512}
                                        height={512}
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

            <section className="w-full py-16 px-6 md:px-20 bg-green-50" id="testimonials">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-center mb-12 tracking-light bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-green-700 to-emerald-500">
                        What Do Our Customers Say?
                    </h2>

                    <div className="mb-12 flex justify-center items-center gap-10">
                        <button
                            onClick={openModal}
                            className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:bg-green-700 text-white font-medium py-2.5 px-6 rounded-full text-lg cursor-pointer"
                        >
                            Add a Review
                        </button>
                        <button
                            onClick={clearReviews}
                            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-full">
                            Clear Testimonial History
                        </button>
                    </div>

                    {isModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 z-50">
                            <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-2xl h-fit max-h-[85vh] overflow-y-auto">
                                <h3 className="text-3xl font-bold mb-4 text-gray-800 text-center">Submit Your Review</h3>
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your name (optional)"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-gray-800"
                                    />
                                    <textarea
                                        name="message"
                                        placeholder="Write your testimonial..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-3 border border-gray-300 rounded-md h-28 resize-none focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-800"
                                    />

                                    <div className="space-y-2">
                                        <label className="block font-medium text-gray-700">Choose an Avatar:</label>
                                        <div className="grid grid-cols-4 gap-3">
                                            <div className="col-span-4">
                                                <label className="block mb-2 text-sm font-medium text-gray-700">Choose an Avatar</label>
                                                <div className="grid grid-cols-7 gap-4 mb-4">
                                                    {avatarList.map((avatar, index) => (
                                                        <button
                                                            key={index}
                                                            type="button"
                                                            className={`rounded-full overflow-hidden border-4 ${formData.photo === avatar ? "border-green-500" : "border-transparent"
                                                                }`}
                                                            onClick={() => setFormData({ ...formData, photo: avatar })}>
                                                            <img
                                                                src={avatar}
                                                                alt={`Avatar ${index + 1}`}
                                                                className="w-16 h-16 object-cover"
                                                                onError={handleImageError}
                                                            />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {formData.photo && (
                                                <div
                                                    className="flex flex-col items-center gap-2 pt-4 col-span-4">
                                                    <span className="text-sm text-gray-500">Selected Avatar</span>
                                                    <img
                                                        src={formData.photo}
                                                        alt="Selected avatar"
                                                        className="w-24 h-24 rounded-full border-2 border-green-500 shadow-md"
                                                        onError={handleImageError}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-end space-x-4">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="bg-gray-300 py-2 px-4 rounded-md hover:bg-gray-400">
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            {isSubmitting ? 'Submitting...' : 'Submit Review'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {isAdminModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white p-6 rounded-lg max-w-md w-full">
                                <h3 className="text-xl font-bold mb-4">Admin Login</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Username</label>
                                        <input
                                            type="text"
                                            value={adminCredentials.username}
                                            onChange={(e) => setAdminCredentials({ ...adminCredentials, username: e.target.value })}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Password</label>
                                        <input
                                            type="password"
                                            value={adminCredentials.password}
                                            onChange={(e) => setAdminCredentials({ ...adminCredentials, password: e.target.value })}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            onClick={() => setIsAdminModalOpen(false)}
                                            className="px-4 py-2 bg-gray-300 rounded">
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleAdminLogin}
                                            disabled={isAdminProcessing}
                                            className={`px-4 py-2 bg-green-600 text-white rounded ${isAdminProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            {isAdminProcessing ? 'Processing...' : 'Login'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="max-h-[500px] overflow-y-auto px-4">
                        {reviews.length === 0 ? (
                            <p className="text-gray-500 text-center">No reviews yet</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center mt-2">
                                {reviews.map((review, index) => (
                                    <motion.div
                                        key={index}
                                        className="bg-stone-100 text-black shadow-xl rounded-xl p-6 w-full max-w-xl border-t-4 border-green-400"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        whileHover={{ scale: 1.04 }}>
                                        <div className="flex items-center gap-4 mb-4">
                                            <img
                                                src={review.image || defaultAvatar}
                                                alt="User avatar"
                                                className="w-14 h-14 rounded-full object-cover border border-gray-300"
                                                onError={handleImageError}
                                            />
                                            <h3 className="text-gray-800 text-lg font-semibold">
                                                {review.name || "Anonymous"}
                                            </h3>
                                        </div>
                                        <p className="text-gray-700 text-base break-words whitespace-pre-wrap">
                                            {review.message}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

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
                                        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium">
                                            Subscribe
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </div>
                    );
                }