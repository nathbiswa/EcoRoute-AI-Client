"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Star, DollarSign } from 'lucide-react';
import axios from 'axios';

interface Product {
    _id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    date: string;
    rating: number;
    location: string;
}

const Features = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Adjust backend URL as needed based on environment
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section id="features" className="py-24 bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-emerald-500 font-bold tracking-widest uppercase text-sm"
                    >
                        Core Listings
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mt-3 text-3xl md:text-5xl font-extrabold text-white"
                    >
                        Explore Our <span className="text-emerald-500">Products</span>
                    </motion.h3>
                </div>

                {/* Grid Container - 4 per row on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {loading ? (
                        // Skeleton Loader
                        Array.from({ length: 8 }).map((_, index) => (
                            <div key={index} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col h-[420px] animate-pulse">
                                <div className="h-48 bg-slate-800 w-full"></div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="h-6 bg-slate-800 rounded w-3/4 mb-3"></div>
                                    <div className="h-4 bg-slate-800 rounded w-full mb-2"></div>
                                    <div className="h-4 bg-slate-800 rounded w-5/6 mb-4"></div>
                                    <div className="grid grid-cols-2 gap-2 mt-auto mb-4">
                                        <div className="h-4 bg-slate-800 rounded w-full"></div>
                                        <div className="h-4 bg-slate-800 rounded w-full"></div>
                                        <div className="h-4 bg-slate-800 rounded w-full"></div>
                                        <div className="h-4 bg-slate-800 rounded w-full"></div>
                                    </div>
                                    <div className="h-10 bg-slate-800 rounded w-full mt-auto"></div>
                                </div>
                            </div>
                        ))
                    ) : products.length > 0 ? (
                        // Product Cards
                        products.map((product, index) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl overflow-hidden flex flex-col h-[420px] transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 group"
                            >
                                {/* Image Container */}
                                <div className="h-48 w-full overflow-hidden relative bg-slate-800">
                                    <img 
                                        src={product.image || 'https://via.placeholder.com/400x300?text=No+Image'} 
                                        alt={product.title} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 right-3 bg-emerald-500 text-slate-950 font-bold px-2 py-1 rounded text-xs flex items-center shadow-lg">
                                        <Star size={12} className="mr-1 fill-slate-950" />
                                        {product.rating}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5 flex-1 flex flex-col">
                                    <h4 className="text-lg font-bold text-white mb-2 line-clamp-1">{product.title}</h4>
                                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">{product.description}</p>
                                    
                                    {/* Meta Info Grid */}
                                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 mt-auto mb-5">
                                        <div className="flex items-center text-slate-300 text-xs">
                                            <DollarSign size={14} className="text-emerald-500 mr-1.5" />
                                            <span className="truncate font-medium">${product.price}</span>
                                        </div>
                                        <div className="flex items-center text-slate-300 text-xs">
                                            <Calendar size={14} className="text-emerald-500 mr-1.5" />
                                            <span className="truncate">{new Date(product.date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center text-slate-300 text-xs col-span-2">
                                            <MapPin size={14} className="text-emerald-500 mr-1.5 flex-shrink-0" />
                                            <span className="truncate">{product.location}</span>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <button className="w-full py-2.5 mt-auto bg-slate-800/50 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 font-semibold rounded-lg transition-all duration-300 text-sm border border-slate-700 hover:border-transparent">
                                        View Details
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-1 md:col-span-2 lg:col-span-4 text-center py-16 bg-slate-900 rounded-2xl border border-slate-800">
                            <p className="text-slate-400">No products found. Add some to your database!</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Features;