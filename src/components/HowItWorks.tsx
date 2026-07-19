"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Cpu, Send, LineChart } from 'lucide-react';

const steps = [
    {
        title: "Data Integration",
        desc: "Connect your logistics data or input shipment details into the autonomous dashboard.",
        icon: <Search size={24} />,
        color: "bg-blue-500/10 text-blue-500 border-blue-500/20"
    },
    {
        title: "Agentic Reasoning",
        desc: "Our AI agents analyze carbon impact, weather, and traffic to reason through millions of combinations.",
        icon: <Cpu size={24} />,
        color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
    },
    {
        title: "Autonomous Selection",
        desc: "The agent independently selects the most eco-friendly and cost-effective route for your cargo.",
        icon: <Send size={24} />,
        color: "bg-purple-500/10 text-purple-500 border-purple-500/20"
    },
    {
        title: "Continuous Tracking",
        desc: "Monitor real-time progress and receive automated sustainability reports at every milestone.",
        icon: <LineChart size={24} />,
        color: "bg-amber-500/10 text-amber-500 border-amber-500/20"
    }
];

const HowItWorks = () => {
    return (
        <section className="py-24 bg-slate-950 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-20">
                    <h2 className="text-emerald-500 font-bold uppercase tracking-widest text-sm mb-3">Workflow</h2>
                    <h3 className="text-3xl md:text-5xl font-extrabold text-white">
                        How our <span className="text-emerald-500">AI Agents</span> Work
                    </h3>
                    <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
                        Experience the power of autonomous logistics through 4 simple AI-driven steps.
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="relative">
                    {/* Connector Line (Desktop Only) */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -translate-y-1/2 z-0" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="flex flex-col items-center text-center group"
                            >
                                {/* Step Number & Icon */}
                                <div className={`w-20 h-20 rounded-3xl border-2 flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 bg-slate-900 ${step.color}`}>
                                    {step.icon}
                                </div>

                                {/* Step Number Badge */}
                                <div className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                                    Step 0{index + 1}
                                </div>

                                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                                    {step.title}
                                </h4>
                                <p className="text-slate-400 text-sm leading-relaxed px-4">
                                    {step.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default HowItWorks;