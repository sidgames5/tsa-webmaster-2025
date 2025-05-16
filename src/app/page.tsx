'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

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

    // Testimonials state
    const [reviews, setReviews] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        message: "",
        profileImage: null,
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCameraAllowed, setIsCameraAllowed] = useState(false);
    const [videoStream, setVideoStream] = useState(null);
    const videoRef = useRef(null);
    const [reviewsCleared, setReviewsCleared] = useState(false);
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
    const constraintsRef = useRef(null);
    const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
    const [adminCredentials, setAdminCredentials] = useState({ username: "", password: "" });
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

    const handleAdminLogin = async () => {
        try {
            const response = await fetch('http://localhost:5000/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: adminCredentials.username,
                    password: adminCredentials.password
                })
            });
    
            const result = await response.json();
            
            if (result.success) {
                // Store the token securely (HttpOnly cookie would be better)
                localStorage.setItem('adminToken', result.token);
                setIsAdminAuthenticated(true);
                setIsAdminModalOpen(false);
                alert("Admin login successful");
            } else {
                alert(result.error || "Invalid credentials");
            }
        } catch (error) {
            console.error("Admin login error:", error);
            alert("Failed to connect to server");
        }
    };

    const clearReviews = async () => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            setIsAdminModalOpen(true);
            return;
        }
    
        try {
            const response = await fetch('http://localhost:5000/testimonials', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            const result = await response.json();
            if (result.success) {
                setReviews([]);
                alert("All testimonials cleared");
            } else {
                alert(result.error || "Failed to clear testimonials");
            }
        } catch (error) {
            console.error("Error clearing reviews:", error);
            alert("Error clearing testimonials");
        }
    };

    useEffect(() => {
        const reviewsClearedFlag = localStorage.getItem("reviewsCleared");
        if (reviewsClearedFlag === "true") {
            setReviews([]);
            return;
        }

        const storedReviews = localStorage.getItem("reviews");
        if (storedReviews) {
            setReviews(JSON.parse(storedReviews));
        } else {
            fetch("/api/get-reviews")
                .then((res) => res.json())
                .then((data) => {
                    if (data.reviews && data.reviews.length > 0) {
                        setReviews(data.reviews);
                        localStorage.setItem("reviews", JSON.stringify(data.reviews));
                    } else {
                        setReviews([]);
                    }
                });
        }
    }, []);

    const resetReviews = () => {
        localStorage.removeItem("reviewsCleared");
        fetch("/api/get-reviews")
            .then((res) => res.json())
            .then((data) => {
                setReviews(data.reviews || []);
                localStorage.setItem("reviews", JSON.stringify(data.reviews || []));
            })
            .catch((error) => {
                console.error("Error fetching reviews after reset:", error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (!formData.message.trim()) {
          alert("Please write a testimonial.");
          return;
        }
      
        try {
          const response = await fetch("http://localhost:5000/submit-review", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              name: formData.name.trim(),
              message: formData.message.trim(),
              photo: formData.photo || null
            })
          });
      
          // First check if response is OK
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server error: ${errorText}`);
          }
      
          // Then parse as JSON
          const data = await response.json();
          
          // Update state
          setReviews((prev) => [data.review, ...prev]);
          localStorage.setItem("reviews", JSON.stringify([data.review, ...reviews]));
          
        } catch (err) {
          console.error("Submission error:", err);
          alert(`Error: ${err.message}`);
        } finally {
          setFormData({ name: "", message: "", photo: null });
          closeModal();
        }
    };
    const handleImageError = (e) => {
        e.target.src = defaultAvatar;
    };

    const openModal = () => {
        setIsModalOpen(true);
        setIsCameraAllowed(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        if (videoStream) {
            videoStream.getTracks().forEach((track) => track.stop());
            setVideoStream(null);
        }
    };

    const handleCameraPermission = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setIsCameraAllowed(true);
            setVideoStream(stream);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            alert("Camera access denied or not available.");
        }
    };

    const handleCapture = () => {
        const canvas = document.createElement("canvas");
        const video = videoRef.current;
        if (!video) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video, 0, 0);

        canvas.toBlob((blob) => {
            if (blob) {
                setFormData((prev) => ({ ...prev, profileImage: blob }));
            }
        }, "image/jpeg");
    };

    return (
        <div className="relative flex flex-col justify-center items-center overflow-hidden">
            {/* Hero Section */}
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
                        <Link href="/reservations">
                            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 cursor-pointer">
                                Reserve a Table
                            </button>
                        </Link>
                        <Link href="/menu">
                            <button className="bg-transparent border-2 border-white hover:bg-white/20 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 cursor-pointer">
                                View Menu
                            </button>
                        </Link>
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

            {/* Enhanced Testimonials Section */}
            <section className="w-full py-16 px-6 md:px-20 bg-gradient-to-r from-green-100 via-stone-50 to-blue-100" id="testimonials">
                <div className="max-w-6xl mx-auto">
                    <motion.h2 
                        className="text-4xl font-extrabold text-center mb-12 tracking-light bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-blue-700 to-cyan-500"
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        What Do Our Users Say?
                    </motion.h2>
                    
                    <div className="mb-12 flex justify-center items-center gap-10">
                        <motion.button
                            onClick={openModal}
                            className="bg-gradient-to-r from-sky-400 via-blue-700 to-cyan-500 hover:bg-green-700 text-white font-medium py-2.5 px-6 rounded-full text-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Add a Review
                        </motion.button>
                        <button
                            onClick={clearReviews}
                            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-full"
                        >
                            Clear Testimonial History
                        </button>
                    </div>
                    
                    {isModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 bg-opacity-60 z-50" ref={constraintsRef}>
                            <motion.div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-2xl h-fit max-h-[85vh] overflow-y-auto"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale:0.9, opacity: 0 }}
                                drag
                                dragConstraints={constraintsRef}
                            >
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
                                                            className={`rounded-full overflow-hidden border-4 ${
                                                                formData.photo === avatar ? "border-green-500" : "border-transparent"
                                                            }`}
                                                            onClick={() => setFormData({ ...formData, photo: avatar })}
                                                        >
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
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="flex flex-col items-center gap-2 pt-4 col-span-4"
                                                >
                                                    <span className="text-sm text-gray-500">Selected Avatar</span>
                                                    <img
                                                        src={formData.photo}
                                                        alt="Selected avatar"
                                                        className="w-24 h-24 rounded-full border-2 border-green-500 shadow-md"
                                                        onError={handleImageError}
                                                    />
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-end space-x-4">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="bg-gray-300 py-2 px-4 rounded-md hover:bg-gray-400"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700"
                                        >
                                            Submit Review
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}
                    
                    {isAdminModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 z-50">
                            <motion.div
                                className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                            >
                                <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">Admin Login</h3>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={adminCredentials.username}
                                    onChange={(e) =>
                                        setAdminCredentials({ ...adminCredentials, username: e.target.value })
                                    }
                                    className="w-full mb-3 p-3 border border-gray-300 rounded-md text-gray-800"
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={adminCredentials.password}
                                    onChange={(e) =>
                                        setAdminCredentials({ ...adminCredentials, password: e.target.value })
                                    }
                                    className="w-full mb-4 p-3 border border-gray-300 rounded-md text-gray-800"
                                />
                                <div className="flex justify-between">
                                    <button
                                        onClick={() => setIsAdminModalOpen(false)}
                                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleAdminLogin}
                                        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                                    >
                                        Log In
                                    </button>
                                </div>
                            </motion.div>
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
                                        whileHover={{ scale: 1.04 }}
                                    >
                                        <div className="flex items-center gap-4 mb-4">
                                            <img
                                                src={review.image || defaultAvatar}
                                                alt="User avatar"
                                                className="w-14 h-14 rounded-full object-cover border border-gray-300"
                                            />
                                            <h3 className="text-gray-800 text-lg font-semibold">
                                                {review.name || "Anonymous"}
                                            </h3>
                                        </div>
                                        <p className="text-gray-700 text-base break-words whitespace-pre-wrap">{review.message}</p>
                                    </motion.div>
                                ))}
                            </div>
                        )}
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
                        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 cursor-pointer">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}