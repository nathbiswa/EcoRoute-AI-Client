"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, Settings, CreditCard, Users, ChevronDown, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const faqs = [
    {
        id: 1,
        question: "How do I reset my password?",
        answer: "To reset your password, click on the 'Forgot Password' link on the login page. Enter your email address, and we will send you a link to securely reset your password."
    },
    {
        id: 2,
        question: "How is the carbon footprint calculated?",
        answer: "We use a proprietary algorithm that takes into account distance, vehicle type, fuel efficiency, and route topography to estimate the carbon emissions for each route."
    },
    {
        id: 3,
        question: "Can I integrate Eco Insight into my own platform?",
        answer: "Yes! We offer a comprehensive API for Enterprise users. You can find our full API documentation in the developer portal."
    },
    {
        id: 4,
        question: "What forms of payment do you accept?",
        answer: "We currently accept all major credit cards (Visa, MasterCard, American Express) as well as PayPal and wire transfers for annual enterprise plans."
    },
    {
        id: 5,
        question: "How do I upgrade my current plan?",
        answer: "You can upgrade your plan at any time from your Account Dashboard. Simply go to 'Billing' and select the new tier you'd like to subscribe to."
    }
];

const helpCategories = [
    {
        title: "Getting Started",
        icon: <FileText className="w-6 h-6 text-emerald-500" />,
        description: "Everything you need to know to set up your account and take your first steps."
    },
    {
        title: "Account Settings",
        icon: <Settings className="w-6 h-6 text-emerald-500" />,
        description: "Manage your profile, preferences, security, and notification settings."
    },
    {
        title: "Billing & Subscriptions",
        icon: <CreditCard className="w-6 h-6 text-emerald-500" />,
        description: "Information on invoices, payment methods, and upgrading your plans."
    },
    {
        title: "Community Forums",
        icon: <Users className="w-6 h-6 text-emerald-500" />,
        description: "Connect with other eco-conscious users and share your best practices."
    }
];

export default function SupportPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleFaq = (index: number) => {
        if (openFaq === index) {
            setOpenFaq(null);
        } else {
            setOpenFaq(index);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-20">
            {/* Hero / Search Section */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-extrabold text-white mb-6"
                >
                    How can we <span className="text-emerald-500">help</span> you?
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="relative max-w-2xl mx-auto"
                >
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-12 pr-4 py-4 bg-slate-900 border border-slate-800 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-xl"
                        placeholder="Search for articles, guides, or questions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Help Categories */}
                <div className="mb-24">
                    <h2 className="text-2xl font-bold text-white mb-8 text-center">Browse by Topic</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {helpCategories.map((category, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + (index * 0.1) }}
                                className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 p-6 rounded-2xl cursor-pointer group transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5"
                            >
                                <div className="bg-slate-950 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    {category.icon}
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                                    {category.title}
                                </h3>
                                <p className="text-slate-400 text-sm">
                                    {category.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto mb-24">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={faq.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + (index * 0.1) }}
                                className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                                >
                                    <span className={`font-semibold transition-colors ${openFaq === index ? 'text-emerald-400' : 'text-white'}`}>
                                        {faq.question}
                                    </span>
                                    <ChevronDown
                                        className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openFaq === index ? 'transform rotate-180 text-emerald-400' : ''}`}
                                    />
                                </button>
                                <AnimatePresence>
                                    {openFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="px-6 pb-4 text-slate-400"
                                        >
                                            {faq.answer}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Contact Support CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-emerald-900/20 border border-emerald-500/20 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto"
                >
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <MessageSquare className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Still need help?</h2>
                    <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                        Can't find the answer you're looking for? Our dedicated support team is here to assist you with any questions or technical issues.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-lg transition-colors duration-300"
                    >
                        Contact Support
                    </Link>
                </motion.div>

            </div>
        </div>
    );
}
