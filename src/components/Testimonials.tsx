"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        name: "Sarah Jenkins",
        role: "Sustainability Director, Global Logistics",
        content: "The AI agents at EcoRoute transformed our supply chain. We've seen a 40% reduction in carbon footprint in just six months.",
        avatar: "https://i.pravatar.cc/150?u=sarah",
        rating: 5
    },
    {
        name: "Marcus Thorne",
        role: "Operations Head, Swift-Cargo",
        content: "Autonomous routing is a game changer. The AI independently handles disruptions that used to take our team hours to solve.",
        avatar: "https://i.pravatar.cc/150?u=marcus",
        rating: 5
    },
    {
        name: "Elena Rodriguez",
        role: "CEO, GreenShip Intl.",
        content: "The most reliable Agentic AI tool we've used. The automated sustainability reports are audit-ready and highly accurate.",
        avatar: "https://i.pravatar.cc/150?u=elena",
        rating: 4
    }
];

const Testimonials = () => {
    return (
        <section className="py-24 bg-slate-900 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-32 -mt-32" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-emerald-500 font-bold uppercase tracking-widest text-sm mb-3">Testimonials</h2>
                    <h3 className="text-3xl md:text-5xl font-extrabold text-white">
                        Trusted by <span className="text-emerald-500">Industry Leaders</span>
                    </h3>
                </div>

                {/* Testimonial Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/30 transition-all duration-300 flex flex-col h-full shadow-xl"
                        >
                            {/* Stars & Quote */}
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex gap-1">
                                    {[...Array(item.rating)].map((_, i) => (
                                        <Star key={i} size={16} className="fill-emerald-500 text-emerald-500" />
                                    ))}
                                </div>
                                <Quote size={32} className="text-slate-800" />
                            </div>

                            {/* Content */}
                            <p className="text-slate-400 text-lg italic leading-relaxed mb-8 flex-grow">
                                "{item.content}"
                            </p>

                            {/* Profile */}
                            <div className="flex items-center gap-4 border-t border-slate-800 pt-6">
                                <img
                                    src={item.avatar}
                                    alt={item.name}
                                    className="w-12 h-12 rounded-full border-2 border-emerald-500"
                                />
                                <div>
                                    <h4 className="text-white font-bold text-sm">{item.name}</h4>
                                    <p className="text-slate-500 text-[10px] uppercase font-semibold tracking-wider">
                                        {item.role}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;