"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Zap, Globe, ShieldCheck, BarChart4, Cpu } from 'lucide-react';

const features = [
    {
        title: "Autonomous Routing",
        description: "Our AI agents analyze thousands of global routes to find the most carbon-efficient path for your cargo.",
        icon: <BrainCircuit className="text-emerald-500" size={28} />,
    },
    {
        title: "Real-time Emissions",
        description: "Track CO2 output in real-time with granular data analysis powered by our proprietary LLM models.",
        icon: <Zap className="text-emerald-500" size={28} />,
    },
    {
        title: "Global Compliance",
        description: "Automatically adjust to international environmental laws and shipping regulations without manual input.",
        icon: <Globe className="text-emerald-500" size={28} />,
    },
    {
        title: "Predictive Logistics",
        description: "AI agents predict potential delays and suggest eco-friendly alternatives before issues arise.",
        icon: <BarChart4 className="text-emerald-500" size={28} />,
    },
    {
        title: "Secure Verification",
        description: "Every shipment's sustainability data is verified and encrypted for audit-ready reporting.",
        icon: <ShieldCheck className="text-emerald-500" size={28} />,
    },
    {
        title: "Agentic Reasoning",
        description: "Beyond simple automation, our AI reasons through complex supply chain disruptions like a human expert.",
        icon: <Cpu className="text-emerald-500" size={28} />,
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
                        Core Capabilities
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mt-3 text-3xl md:text-5xl font-extrabold text-white"
                    >
                        The Future of <span className="text-emerald-500">Autonomous</span> Logistics
                    </motion.h3>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/5"
                        >
                            <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Features;