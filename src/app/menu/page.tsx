'use client';

import { useState } from "react";

type MenuItem = {
    name: string;
    description: string;
    price: string;
    ingredients?: string[];
};

type MenuSection = {
    title: string;
    items: MenuItem[];
};

export default function MenuPage() {
    const [expandedSection, setExpandedSection] = useState<string | null>("Starters");
    const [expandedItem, setExpandedItem] = useState<string | null>(null);

    const menuSections: MenuSection[] = [
        {
            title: "Starters",
            items: [
                {
                    name: "Stuffed Mushrooms",
                    description: "Baked cremini mushrooms filled with herbs and vegan cheese.",
                    price: "$9",
                    ingredients: ["Cremini mushrooms", "Vegan cheese", "Fresh herbs", "Garlic", "Olive oil"]
                },
                {
                    name: "Avocado Toast",
                    description: "Rustic bread topped with smashed avocado, radish, and sprouts.",
                    price: "$7",
                    ingredients: ["Sourdough bread", "Avocado", "Radish", "Microgreens", "Lemon zest"]
                },
                {
                    name: "Seasonal Soup",
                    description: "A rotating selection of fresh, locally-sourced soups.",
                    price: "$8",
                    ingredients: ["Seasonal vegetables", "Vegetable broth", "Fresh herbs"]
                }
            ]
        },
        {
            title: "Mains",
            items: [
                {
                    name: "Grilled Vegetable Lasagna",
                    description: "Layers of roasted veggies, plant-based cheese, and marinara sauce.",
                    price: "$16",
                    ingredients: ["Zucchini", "Eggplant", "Bell peppers", "Vegan ricotta", "Lasagna noodles"]
                },
                {
                    name: "Chickpea Buddha Bowl",
                    description: "Quinoa, roasted chickpeas, kale, and tahini dressing.",
                    price: "$14",
                    ingredients: ["Chickpeas", "Quinoa", "Kale", "Tahini", "Lemon", "Cucumber"]
                },
                {
                    name: "Stuffed Acorn Squash",
                    description: "Wild rice, cranberries, and pecans in a roasted squash half.",
                    price: "$18",
                    ingredients: ["Acorn squash", "Wild rice", "Dried cranberries", "Pecans", "Sage"]
                }
            ]
        },
        {
            title: "Desserts",
            items: [
                {
                    name: "Vegan Chocolate Cake",
                    description: "Decadent dark chocolate cake with coconut cream frosting.",
                    price: "$9",
                    ingredients: ["Dark chocolate", "Coconut cream", "Almond flour", "Maple syrup"]
                },
                {
                    name: "Fruit Tart",
                    description: "Crisp almond crust filled with vanilla custard and seasonal fruit.",
                    price: "$8",
                    ingredients: ["Almond flour", "Coconut milk", "Vanilla bean", "Seasonal berries"]
                },
                {
                    name: "Chia Pudding",
                    description: "Chia seeds soaked in coconut milk with a touch of maple syrup.",
                    price: "$7",
                    ingredients: ["Chia seeds", "Coconut milk", "Maple syrup", "Fresh fruit"]
                }
            ]
        }
    ];

    const toggleSection = (title: string) => {
        if (expandedSection !== title) {
            setExpandedSection(title);
            setExpandedItem(null);
        }
    };

    const toggleItem = (itemName: string) => {
        setExpandedItem(expandedItem === itemName ? null : itemName);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-green-50">
            {/* Hero Section */}
            <div className="relative min-h-[50vh] w-full flex items-center justify-center bg-cover bg-center bg-fixed"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
                }}>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-7xl md:text-8xl font-bold text-white mb-4 tangerine-bold">Menu</h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto">
                        Seasonal ingredients crafted with passion and creativity
                    </p>
                </div>
            </div>

            {/* Menu Sections */}
            <div className="max-w-5xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {menuSections.map((section) => (
                        <button
                            key={section.title}
                            onClick={() => toggleSection(section.title)}
                            className={`p-6 rounded-xl transition-all duration-300 ${expandedSection === section.title ?
                                'bg-white/80 backdrop-blur-md shadow-lg ring-2 ring-amber-500' :
                                'bg-white/50 backdrop-blur-sm hover:bg-white/70'}`}
                        >
                            <h2 className="text-2xl font-semibold text-gray-800">{section.title}</h2>
                            <p className="text-gray-600 mt-2">
                                {expandedSection === section.title ? '▼' : '▶'} {section.items.length} items
                            </p>
                        </button>
                    ))}
                </div>

                {/* Expanded Section Content */}
                {expandedSection && (
                    <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg p-8 mb-12 animate-fade-in">
                        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                            {expandedSection}
                        </h2>
                        <div className="space-y-4">
                            {menuSections
                                .find(section => section.title === expandedSection)?.items
                                .map((item) => (
                                    <div
                                        key={item.name}
                                        className={`p-4 rounded-lg transition-all cursor-pointer ${expandedItem === item.name ?
                                            'bg-amber-50 ring-1 ring-amber-300' :
                                            'hover:bg-amber-50'}`}
                                        onClick={() => toggleItem(item.name)}
                                    >
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                            <span className="text-lg font-bold text-amber-700">{item.price}</span>
                                        </div>

                                        {expandedItem === item.name && (
                                            <div className="mt-3 pt-3 border-t border-amber-100 animate-fade-in">
                                                <p className="text-gray-600 mb-3">{item.description}</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {item.ingredients?.map((ingredient, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs"
                                                        >
                                                            {ingredient}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}