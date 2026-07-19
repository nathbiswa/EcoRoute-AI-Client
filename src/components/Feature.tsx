"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, BarChart3, ShieldCheck, Users } from 'lucide-react';

const coreValues = [
    {
        id: 1,
        title: "Sustainability First",
        description: "We prioritize long-term ecological balance in every solution we provide, ensuring a greener footprint.",
        icon: <Leaf className="w-8 h-8 text-emerald-500" />
    },
    {
        id: 2,
        title: "Data-Driven Insights",
        description: "Empower your decisions with actionable metrics and deep analytics on your environmental impact.",
        icon: <BarChart3 className="w-8 h-8 text-emerald-500" />
    },
    {
        id: 3,
        title: "Transparent Reporting",
        description: "Clear, verifiable, and accurate sustainability data to build trust with your stakeholders.",
        icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />
    },
    {
        id: 4,
        title: "Community Collaboration",
        description: "Join a network of environmentally conscious partners working together for a sustainable future.",
        icon: <Users className="w-8 h-8 text-emerald-500" />
    }
];

const Features = () => {
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
                        Our Core Values
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mt-3 text-3xl md:text-5xl font-extrabold text-white"
                    >
                        Why Choose <span className="text-emerald-500">Eco Insight</span>
                    </motion.h3>
                </div>

                {/* Grid Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {coreValues.map((value, index) => (
                        <motion.div
                            key={value.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 group"
                        >
                            <div className="bg-slate-950 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-emerald-500/5">
                                {value.icon}
                            </div>
                            <h4 className="text-xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                                {value.title}
                            </h4>
                            <p className="text-slate-400 leading-relaxed">
                                {value.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;