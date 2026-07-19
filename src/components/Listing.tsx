"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Star, MapPin, Calendar, DollarSign, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// TypeScript Interface for Product
interface Product {
    _id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    date: string;
    rating: number;
    location: string;
    category: string;
    carbonSaved: string;
}

// --- Skeleton Loader Component ---
const CardSkeleton = () => (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden animate-pulse">
        <div className="h-48 bg-slate-800 w-full" />
        <div className="p-5 space-y-4">
            <div className="h-4 bg-slate-800 rounded w-1/4" />
            <div className="h-6 bg-slate-800 rounded w-3/4" />
            <div className="h-4 bg-slate-800 rounded w-full" />
            <div className="grid grid-cols-2 gap-4">
                <div className="h-4 bg-slate-800 rounded w-full" />
                <div className="h-4 bg-slate-800 rounded w-full" />
            </div>
            <div className="h-10 bg-slate-800 rounded-xl w-full pt-2" />
        </div>
    </div>
);

const Listing = () => {
    // TanStack Query দিয়ে ডাটা ফেচ করা
    const { data: products, isLoading } = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/api/products?limit=4');
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            return data.products || data;
        }
    });

    return (
        <section className="py-20 bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <h2 className="text-emerald-500 font-bold uppercase tracking-widest text-sm mb-2">Marketplace</h2>
                        <h3 className="text-3xl md:text-4xl font-extrabold text-white">Global <span className="text-emerald-500">Eco-Routes</span></h3>
                    </div>
                    <Link href="/explore" className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 transition-colors">
                        View All Routes <ArrowUpRight size={20} />
                    </Link>
                </div>

                {/* Grid System - Requirement: 4 cards per row on desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {isLoading ? (
                        // লোড হওয়ার সময় ৪টি স্কেলিটন দেখানো
                        Array(4).fill(0).map((_, i) => <CardSkeleton key={i} />)
                    ) : (
                        products?.slice(0, 4).map((item) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="group bg-slate-900 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 flex flex-col h-full"
                            >
                                {/* Image Section */}
                                <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
                                    <Image
                                        src={item.image}
                                        width={400}
                                        height={400}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase">
                                        {item.category}
                                    </div>
                                    <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-emerald-400 text-[10px] font-bold px-2 py-1 rounded-md border border-emerald-500/30">
                                        {item.carbonSaved} Saved
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-5 flex flex-col flex-grow">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="flex items-center gap-1 text-emerald-400 font-bold text-lg">
                                            <DollarSign size={16} /> {item.price}
                                        </span>
                                        <span className="flex items-center gap-1 text-amber-400 text-sm font-medium">
                                            <Star size={14} fill="currentColor" /> {item.rating}
                                        </span>
                                    </div>

                                    <h4 className="text-xl font-bold text-white mb-2 line-clamp-1">{item.title}</h4>
                                    <p className="text-slate-400 text-xs line-clamp-2 mb-4 flex-grow">
                                        {item.description}
                                    </p>

                                    {/* Meta Info */}
                                    <div className="space-y-2 mb-5 border-t border-slate-800 pt-4">
                                        <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                                            <MapPin size={14} className="text-emerald-500" />
                                            <span className="truncate">{item.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                                            <Calendar size={14} className="text-emerald-500" />
                                            <span>Available: {item.date}</span>
                                        </div>
                                    </div>

                                    {/* Button */}
                                    <Link
                                        href={`/details/${item._id}`}
                                        className="w-full py-3 bg-slate-800 hover:bg-emerald-600 text-white text-center rounded-xl font-bold text-sm transition-all active:scale-95"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default Listing;