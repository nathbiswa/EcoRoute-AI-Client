"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Bell, Sparkles } from 'lucide-react';
import { toast } from 'react-toastify';

const CTA = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return toast.error("Please enter your email");

        toast.success("Subscribed! You'll receive AI updates.");
        setEmail("");
    };

    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">

            {/* Background Abstract Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-16 rounded-[2.5rem] border border-emerald-500/20 text-center shadow-2xl"
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-8 uppercase tracking-widest">
                        <Sparkles size={14} /> Ready to start?
                    </div>

                    <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                        Automate Your <span className="text-emerald-500">Green Logistics</span> Today
                    </h2>

                    <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
                        Join 5,000+ companies using our AI agents to optimize shipping and reduce carbon emissions globally.
                    </p>

                    {/* Newsletter Input */}
                    <form
                        onSubmit={handleSubscribe}
                        className="flex flex-col md:flex-row items-center gap-4 max-w-xl mx-auto"
                    >
                        <div className="relative w-full">
                            <Bell className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your professional email"
                                className="w-full pl-12 pr-4 py-4 bg-slate-950 border border-slate-700 rounded-2xl text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full md:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 whitespace-nowrap shadow-lg shadow-emerald-900/20"
                        >
                            Get Started <Send size={18} />
                        </button>
                    </form>

                    <p className="mt-6 text-slate-500 text-xs italic">
                        * No credit card required. Start with our free tier today.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default CTA;