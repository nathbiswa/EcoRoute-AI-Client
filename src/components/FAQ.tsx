"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';

const faqs = [
    { q: "How does the AI Agent different from automation?", a: "Automation follows fixed rules. Our Agentic AI uses reasoning to adapt to new situations like port strikes or weather changes without human intervention." },
    { q: "Is the carbon data verified?", a: "Yes, all carbon metrics are calculated using international GLEC frameworks and are audit-ready for ESG reporting." },
    { q: "Can I integrate this with existing ERPs?", a: "Absolutely. Our platform offers secure API endpoints to connect with SAP, Oracle, and other major logistics software." }
];

const FAQ = () => {
    return (
        <section className="py-24 bg-slate-950">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <HelpCircle className="mx-auto text-emerald-500 mb-4" size={40} />
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white">Got <span className="text-emerald-500">Questions?</span></h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <details key={i} className="group bg-slate-900 rounded-2xl border border-slate-800 p-6 transition-all cursor-pointer">
                            <summary className="flex justify-between items-center font-bold text-white list-none">
                                {faq.q}
                                <ChevronDown className="text-emerald-500 transition-transform group-open:rotate-180" size={20} />
                            </summary>
                            <p className="mt-4 text-slate-400 text-sm leading-relaxed">
                                {faq.a}
                            </p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;