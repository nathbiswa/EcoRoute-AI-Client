"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, ArrowUpRight } from 'lucide-react';

const blogPosts = [
    {
        id: 1,
        title: "The Future of Sustainable Supply Chains",
        excerpt: "Discover how AI is revolutionizing route optimization and significantly reducing carbon emissions across global logistics.",
        category: "Technology",
        date: "July 12, 2026",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1586528116311-ad8ed7c50a30?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Navigating Green Policies in 2026",
        excerpt: "A comprehensive guide to the latest environmental regulations and how your business can stay compliant while maximizing profits.",
        category: "Policy",
        date: "July 08, 2026",
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Top 5 Eco-Friendly Packaging Innovations",
        excerpt: "Say goodbye to single-use plastics. Here are the top packaging solutions that are taking the e-commerce world by storm.",
        category: "Innovation",
        date: "July 01, 2026",
        readTime: "4 min read",
        image: "https://images.unsplash.com/photo-1530587191336-3a7c0e82845c?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "How to Calculate Your Company's Carbon Footprint",
        excerpt: "Step-by-step instructions on measuring your environmental impact, with free templates and tools to get you started today.",
        category: "Guide",
        date: "June 25, 2026",
        readTime: "10 min read",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 5,
        title: "Interview: The Rise of the Green Consumer",
        excerpt: "We sat down with industry experts to discuss how consumer habits have shifted towards sustainability in the past decade.",
        category: "Interview",
        date: "June 18, 2026",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 6,
        title: "Renewable Energy Adoption in Warehousing",
        excerpt: "Solar panels, wind turbines, and smart grids: how modern warehouses are becoming entirely self-sufficient.",
        category: "Energy",
        date: "June 10, 2026",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800&auto=format&fit=crop"
    }
];

export default function BlogsPage() {
    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-extrabold text-white mb-4"
                    >
                        Eco Insight <span className="text-emerald-500">Journal</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 max-w-2xl mx-auto text-lg"
                    >
                        Stay updated with the latest trends in sustainability, supply chain innovations, and green technologies.
                    </motion.p>
                </div>

                {/* Featured Post */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-16 relative group cursor-pointer rounded-3xl overflow-hidden h-[400px]"
                >
                    <img 
                        src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=1200&auto=format&fit=crop" 
                        alt="Featured post" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3 z-10">
                        <span className="inline-block bg-emerald-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                            Featured
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                            The Global Shift Towards Circular Economies
                        </h2>
                        <p className="text-slate-300 mb-6 line-clamp-2 text-lg">
                            How discarding the "take, make, dispose" model is creating trillions in economic opportunity while saving our planet's limited resources.
                        </p>
                        <div className="flex items-center text-emerald-400 font-semibold gap-2">
                            Read Article <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </div>
                    </div>
                </motion.div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + (index * 0.1) }}
                            className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl overflow-hidden flex flex-col h-full group transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/5 cursor-pointer"
                        >
                            {/* Image Container */}
                            <div className="relative h-56 w-full overflow-hidden bg-slate-800">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-md border border-emerald-500/30 uppercase z-10">
                                    {post.category}
                                </div>
                            </div>

                            {/* Content Container */}
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center justify-between text-slate-400 text-xs mb-4">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar size={14} className="text-emerald-500" />
                                        <span>{post.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock size={14} className="text-emerald-500" />
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>
                                
                                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                                    {post.title}
                                </h3>
                                
                                <p className="text-slate-400 text-sm line-clamp-3 mb-6 flex-grow">
                                    {post.excerpt}
                                </p>
                                
                                <div className="mt-auto pt-4 border-t border-slate-800 flex items-center text-emerald-500 text-sm font-bold group-hover:text-emerald-400 transition-colors">
                                    Read More <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Load More Button */}
                <div className="text-center mt-16">
                    <button className="px-8 py-3 bg-transparent border border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 font-bold rounded-lg transition-colors duration-300">
                        Load More Articles
                    </button>
                </div>

            </div>
        </div>
    );
}
