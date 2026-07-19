"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Leaf, Zap, ShieldCheck } from 'lucide-react';

const stats = [
    {
        label: "Global Routes Optimized",
        value: "1.2M+",
        icon: <Globe className="text-emerald-500" size={24} />,
        desc: "Autonomous navigation across 50+ countries."
    },
    {
        label: "Carbon Reduced",
        value: "450K Tons",
        icon: <Leaf className="text-emerald-500" size={24} />,
        desc: "Average 32% CO2 saving per shipment."
    },
    {
        label: "Real-time AI Decisions",
        value: "99.9%",
        icon: <Zap className="text-emerald-500" size={24} />,
        desc: "Decisions made in under 200ms by agents."
    },
    {
        label: "Verified Reports",
        value: "100%",
        icon: <ShieldCheck className="text-emerald-500" size={24} />,
        desc: "Audit-ready sustainability documentation."
    }
];

const Stats = () => {
    return (
        <section className="py-20 bg-slate-900 border-y border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative p-8 rounded-2xl bg-slate-950 border border-slate-800 group hover:border-emerald-500/30 transition-all duration-300"
                        >
                            {/* Icon & Glow Effect */}
                            <div className="absolute -top-4 left-8 bg-slate-900 border border-slate-800 p-3 rounded-xl shadow-xl text-emerald-500 group-hover:scale-110 transition-transform">
                                {stat.icon}
                            </div>

                            <div className="mt-4">
                                <h4 className="text-3xl font-extrabold text-white mb-1">{stat.value}</h4>
                                <p className="text-emerald-400 text-sm font-bold uppercase tracking-wider mb-3">
                                    {stat.label}
                                </p>
                                <p className="text-slate-500 text-xs leading-relaxed">
                                    {stat.desc}
                                </p>
                            </div>

                            {/* Decorative line */}
                            <div className="mt-6 h-1 w-12 bg-emerald-500/20 group-hover:w-full transition-all duration-500 rounded-full" />
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Stats;