"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function Loading() {
    return (
        <div className="min-h-screen bg-slate-950 px-4 py-20 flex flex-col items-center">
            {/* Top Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1 bg-slate-900 z-[100]">
                <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]"
                />
            </div>

            <div className="max-w-7xl w-full mx-auto space-y-12">
                {/* Header Skeleton */}
                <div className="space-y-4">
                    <div className="h-4 bg-slate-900 rounded-full w-32 animate-pulse" />
                    <div className="h-10 bg-slate-900 rounded-xl w-full md:w-1/2 animate-pulse" />
                </div>

                {/* Hero-like Loader */}
                <div className="w-full h-[40vh] bg-slate-900/50 rounded-[2.5rem] border border-slate-800 relative overflow-hidden">
                    <motion.div
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 w-full h-20 bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent z-10"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-slate-800 border-t-emerald-500 rounded-full animate-spin" />
                            <p className="text-slate-500 font-mono text-xs tracking-widest uppercase animate-pulse">
                                AI Agent: Syncing...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}