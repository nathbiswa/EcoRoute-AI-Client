"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Ship, Leaf, BarChart3 } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
    return (
        <section className="relative py-16 h-[80vh] w-full flex items-center justify-center overflow-hidden bg-slate-900 pt-16">

            {/* Background Glow Decorations */}
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-emerald-600/10 rounded-full blur-[120px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-6 uppercase tracking-wider">
                        <Leaf size={14} />
                        AI-Powered Sustainability
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
                        Scaling Green Logistics with <span className="text-emerald-500">Agentic AI</span>
                    </h1>
                    <p className="mt-6 text-lg text-slate-400 max-w-lg">
                        Optimize your supply chain, reduce carbon footprints, and automate eco-friendly shipping routes with our autonomous AI agents.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">
                        <Link
                            href="/items/add"
                            className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                        >
                            Start Optimizing <ArrowRight size={20} />
                        </Link>
                        <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl flex items-center gap-2 transition-all border border-slate-700 active:scale-95">
                            <Play size={18} fill="currentColor" /> Watch Demo
                        </button>
                    </div>
                </motion.div>

                {/* Right Content - Interactive Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="hidden lg:flex justify-center relative"
                >
                    {/* Main Floating Card */}
                    <div className="relative z-20 bg-slate-800/50 backdrop-blur-xl p-8 rounded-3xl border border-slate-700 shadow-2xl w-full max-w-md">
                        <div className="flex justify-between items-center mb-6">
                            <div className="h-10 w-10 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-500">
                                <Ship size={24} />
                            </div>
                            <span className="text-xs text-slate-400 font-mono">Agent ID: #0821</span>
                        </div>
                        <div className="space-y-4">
                            <div className="h-2 w-3/4 bg-slate-700 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '70%' }}
                                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                                    className="h-full bg-emerald-500"
                                />
                            </div>
                            <div className="h-2 w-full bg-slate-700 rounded-full" />
                            <div className="h-2 w-1/2 bg-slate-700 rounded-full" />
                        </div>
                        <div className="mt-8 flex gap-3">
                            <div className="flex-1 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl text-center">
                                <p className="text-xs text-slate-400">Carbon Saved</p>
                                <p className="text-xl font-bold text-emerald-400">42%</p>
                            </div>
                            <div className="flex-1 bg-slate-700/30 border border-slate-700 p-3 rounded-xl text-center">
                                <p className="text-xs text-slate-400">Efficiency</p>
                                <p className="text-xl font-bold text-white">98.4%</p>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Floating Stats Badge */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-10 -right-6 bg-emerald-600 p-4 rounded-2xl shadow-xl flex items-center gap-3 z-30"
                    >
                        <BarChart3 className="text-white" />
                        <div>
                            <p className="text-[10px] text-emerald-100 uppercase font-bold">Real-time Analysis</p>
                            <p className="text-sm font-bold text-white tracking-tight">AI Agent Active</p>
                        </div>
                    </motion.div>
                </motion.div>

            </div>

            {/* Visual Flow to next section */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Scroll to Explore</p>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-transparent rounded-full"
                />
            </div>
        </section>
    );
};

export default Hero;