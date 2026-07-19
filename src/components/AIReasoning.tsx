"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, Search, CheckCircle } from 'lucide-react';

const reasoningSteps = [
    { icon: <Search size={18} />, title: "Data Ingestion", status: "Completed", text: "Analyzing 14,000+ global shipping lanes and weather patterns." },
    { icon: <Cpu size={18} />, title: "Neural Processing", status: "Active", text: "Simulating route efficiency for lowest carbon emissions." },
    { icon: <Terminal size={18} />, title: "Agent Reasoning", status: "Pending", text: "Selecting optimal vessel based on real-time port congestion." }
];

const AIReasoning = () => {
    return (
        <section className="py-24 bg-slate-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                <div>
                    <h2 className="text-emerald-500 font-bold uppercase tracking-widest text-sm mb-3">Live Logic</h2>
                    <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
                        Inside the <span className="text-emerald-500">Agent's Mind</span>
                    </h3>
                    <p className="text-slate-400 text-lg mb-8">
                        Unlike standard algorithms, our Agentic AI reasons through disruptions. It doesn't just find a path; it finds the <span className="text-white italic">most sustainable</span> path by simulating thousands of scenarios in seconds.
                    </p>

                    <div className="space-y-4">
                        {reasoningSteps.map((step, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
                                <div className="text-emerald-500">{step.icon}</div>
                                <div className="flex-grow">
                                    <p className="text-white font-bold text-sm">{step.title}</p>
                                    <p className="text-slate-500 text-xs">{step.text}</p>
                                </div>
                                <span className={`text-[10px] px-2 py-1 rounded-md font-bold uppercase ${step.status === 'Active' ? 'bg-emerald-500 text-white animate-pulse' : 'bg-slate-800 text-slate-400'}`}>
                                    {step.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Visual Terminal Wrapper */}
                <div className="relative">
                    <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 font-mono text-xs text-emerald-400 shadow-2xl">
                        <div className="flex gap-2 mb-4">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-amber-500" />
                            <div className="w-3 h-3 rounded-full bg-emerald-500" />
                        </div>
                        <p className="mb-2"> {'>'} Initializing Eco-Agent...</p>
                        <p className="mb-2 text-slate-500"> [INFO] Fetching real-time satellite data...</p>
                        <p className="mb-2"> {'>'} Analysis: Route A (12% CO2) | Route B (8% CO2)</p>
                        <p className="mb-2 text-emerald-500"> [SUCCESS] Optimal path selected: Route B</p>
                        <p className="mb-2"> {'>'} Deploying autonomous shipping instructions...</p>
                        <motion.div
                            animate={{ opacity: [0, 1] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="inline-block w-2 h-4 bg-emerald-500 ml-1 translate-y-1"
                        />
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
                </div>

            </div>
        </section>
    );
};

export default AIReasoning;