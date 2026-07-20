"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Home, Search, Map, ChevronLeft, Bot } from 'lucide-react';
import Link from 'next/link';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 overflow-hidden relative">

            {/* Background Decorative Elements */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-600/10 rounded-full blur-[100px] animate-pulse delay-700" />

            <div className="max-w-2xl w-full text-center relative z-10">

                {/* Animated 404 Illustration */}
                <div className="relative mb-8">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[12rem] md:text-[15rem] font-black text-slate-900 leading-none select-none"
                    >
                        404
                    </motion.h1>

                    <motion.div
                        animate={{
                            y: [0, -15, 0],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                        <div className="p-6 bg-slate-900 border-2 border-emerald-500 rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                            <Bot size={80} className="text-emerald-500" />
                        </div>
                    </motion.div>
                </div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Route <span className="text-emerald-500">Not Found</span>
                    </h2>

                    <div className="flex items-center justify-center gap-2 text-slate-400 font-mono text-sm mb-8 bg-slate-900/50 py-2 px-4 rounded-full border border-slate-800 w-fit mx-auto">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                        Agent Status: Recalculating coordinates...
                    </div>

                    <p className="text-slate-400 mb-10 max-w-md mx-auto leading-relaxed">
                        Even our most advanced AI Agents couldn't find the logistics path you're looking for. It might have been decommissioned or moved to a new hub.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl transition-all active:scale-95 shadow-lg shadow-emerald-900/20"
                        >
                            <Home size={20} /> Back to Base
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-all border border-slate-700 active:scale-95"
                        >
                            <ChevronLeft size={20} /> Go Back
                        </button>
                    </div>
                </motion.div>

                {/* Floating Search Icons Decor */}
                <motion.div
                    animate={{ x: [0, 100, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute -top-10 left-0 text-slate-800 pointer-events-none"
                >
                    <Search size={40} />
                </motion.div>
                <motion.div
                    animate={{ x: [0, -100, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: 12, repeat: Infinity, delay: 2 }}
                    className="absolute bottom-10 right-0 text-slate-800 pointer-events-none"
                >
                    <Map size={40} />
                </motion.div>

            </div>
        </div>
    );
};

export default NotFound;