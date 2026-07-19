"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, Database, Share2 } from 'lucide-react';
import Link from 'next/link';

const sections = [
    {
        id: "information-collection",
        title: "1. Information We Collect",
        icon: <Database className="w-5 h-5 text-emerald-500" />,
        content: (
            <>
                <p className="mb-4">We collect information that you provide directly to us, information we collect automatically when you use our services, and information from third-party sources. This includes:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-400 mb-6">
                    <li><strong className="text-slate-300">Account Information:</strong> Name, email address, password, and company details.</li>
                    <li><strong className="text-slate-300">Usage Data:</strong> Information about how you interact with our platform, routing choices, and carbon calculations.</li>
                    <li><strong className="text-slate-300">Device Information:</strong> IP address, browser type, operating system, and device identifiers.</li>
                </ul>
            </>
        )
    },
    {
        id: "how-we-use",
        title: "2. How We Use Your Information",
        icon: <Eye className="w-5 h-5 text-emerald-500" />,
        content: (
            <>
                <p className="mb-4">We use the collected information for various purposes, including:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-400 mb-6">
                    <li>Providing, maintaining, and improving our services and algorithms.</li>
                    <li>Processing transactions and sending related information, including confirmations and invoices.</li>
                    <li>Sending technical notices, updates, security alerts, and support messages.</li>
                    <li>Responding to your comments, questions, and customer service requests.</li>
                    <li>Analyzing usage trends to enhance user experience and sustainability metrics.</li>
                </ul>
            </>
        )
    },
    {
        id: "data-sharing",
        title: "3. Data Sharing and Disclosure",
        icon: <Share2 className="w-5 h-5 text-emerald-500" />,
        content: (
            <>
                <p className="mb-4">We do not sell your personal information. We may share your information in the following circumstances:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-400 mb-6">
                    <li><strong className="text-slate-300">With Service Providers:</strong> Third-party vendors who perform services on our behalf (e.g., payment processing, cloud hosting).</li>
                    <li><strong className="text-slate-300">For Legal Reasons:</strong> If required to do so by law or in response to valid requests by public authorities.</li>
                    <li><strong className="text-slate-300">Business Transfers:</strong> In connection with any merger, sale of company assets, financing, or acquisition.</li>
                </ul>
            </>
        )
    },
    {
        id: "data-security",
        title: "4. Data Security",
        icon: <Lock className="w-5 h-5 text-emerald-500" />,
        content: (
            <>
                <p className="mb-6">We implement robust security measures designed to protect your information from unauthorized access, alteration, disclosure, or destruction. This includes encryption of data in transit and at rest, regular security audits, and strict access controls. However, no internet transmission is completely secure, and we cannot guarantee absolute security.</p>
            </>
        )
    },
    {
        id: "your-rights",
        title: "5. Your Privacy Rights",
        icon: <Shield className="w-5 h-5 text-emerald-500" />,
        content: (
            <>
                <p className="mb-4">Depending on your location, you may have certain rights regarding your personal data:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-400 mb-6">
                    <li>The right to access, update, or delete the information we have on you.</li>
                    <li>The right of rectification if your information is inaccurate or incomplete.</li>
                    <li>The right to object to our processing of your personal data.</li>
                    <li>The right to data portability (receiving a copy of your data in a structured format).</li>
                </ul>
                <p className="mb-6">To exercise these rights, please contact our support team or email us directly at privacy@ecoinsight.com.</p>
            </>
        )
    },
    {
        id: "changes",
        title: "6. Changes to This Policy",
        icon: <FileText className="w-5 h-5 text-emerald-500" />,
        content: (
            <>
                <p className="mb-6">We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this policy. You are advised to review this Privacy Policy periodically for any changes.</p>
            </>
        )
    }
];

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-20">
            {/* Header Section */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center justify-center p-3 bg-emerald-500/10 rounded-full mb-6"
                >
                    <Shield className="w-8 h-8 text-emerald-500" />
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-extrabold text-white mb-6"
                >
                    Privacy <span className="text-emerald-500">Policy</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-slate-400 text-lg"
                >
                    Last Updated: July 20, 2026
                </motion.p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    
                    {/* Table of Contents - Sticky Sidebar */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:w-1/3 lg:sticky lg:top-24 bg-slate-900 border border-slate-800 rounded-2xl p-6"
                    >
                        <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider text-sm">Table of Contents</h3>
                        <nav className="space-y-1">
                            {sections.map((section) => (
                                <a 
                                    key={section.id} 
                                    href={`#${section.id}`}
                                    className="flex items-center gap-3 py-2 px-3 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-950 transition-colors"
                                >
                                    {section.icon}
                                    <span className="text-sm font-medium">{section.title}</span>
                                </a>
                            ))}
                        </nav>
                        <div className="mt-8 pt-6 border-t border-slate-800">
                            <p className="text-sm text-slate-400 mb-4">Have questions about your privacy?</p>
                            <Link href="/contact" className="text-emerald-400 hover:text-emerald-300 font-bold text-sm flex items-center transition-colors">
                                Contact our Privacy Team &rarr;
                            </Link>
                        </div>
                    </motion.div>

                    {/* Policy Content */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:w-2/3 space-y-12 bg-slate-900/50 border border-slate-800 rounded-2xl p-8 md:p-12 text-slate-300 leading-relaxed"
                    >
                        <div>
                            <p className="text-lg mb-4">
                                At <strong>Eco Insight</strong>, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our platform.
                            </p>
                            <p>
                                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                            </p>
                        </div>

                        {sections.map((section) => (
                            <div key={section.id} id={section.id} className="scroll-mt-32">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="bg-slate-800 p-2 rounded-lg">{section.icon}</span>
                                    {section.title}
                                </h2>
                                {section.content}
                            </div>
                        ))}
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
