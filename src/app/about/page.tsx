"use client";

import React from "react";
import { Leaf, Info, Users, Globe, Zap, Mail } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero */}
        <header className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-6">
            <Leaf className="text-emerald-400" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            About <span className="text-emerald-400">Eco Insight</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A modern platform empowering sustainable product discovery, backed by a real-time MongoDB marketplace.
          </p>
        </header>

        {/* Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-emerald-500/50 transition-colors">
            <Zap className="text-emerald-400 mb-4" size={28} />
            <h2 className="text-xl font-bold text-white mb-2">Our Mission</h2>
            <p className="text-slate-400">
              To make eco-friendly products accessible and verifiable, driving transparency in sustainable commerce.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-emerald-500/50 transition-colors">
            <Globe className="text-emerald-400 mb-4" size={28} />
            <h2 className="text-xl font-bold text-white mb-2">Global Impact</h2>
            <p className="text-slate-400">
              Connecting conscious buyers and sellers worldwide to reduce carbon footprints one transaction at a time.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-emerald-500/50 transition-colors">
            <Users className="text-emerald-400 mb-4" size={28} />
            <h2 className="text-xl font-bold text-white mb-2">Community</h2>
            <p className="text-slate-400">
              Built by and for eco-conscious innovators, entrepreneurs, and everyday consumers.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-emerald-500/50 transition-colors">
            <Info className="text-emerald-400 mb-4" size={28} />
            <h2 className="text-xl font-bold text-white mb-2">Tech Stack</h2>
            <ul className="text-slate-400 space-y-1 list-disc list-inside">
              <li>Next.js 14 – Frontend</li>
              <li>Express + MongoDB – Backend API</li>
              <li>Tailwind CSS – Styling</li>
              <li>Better-Auth – Authentication</li>
            </ul>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl text-center">
          <Mail className="text-emerald-400 mx-auto mb-4" size={32} />
          <h2 className="text-2xl font-bold text-white mb-2">Get in Touch</h2>
          <p className="text-slate-400 mb-4">
            Questions, feedback or partnerships? We would love to hear from you.
          </p>
          <a
            href="mailto:info@ecoinsight.dev"
            className="inline-block px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-colors"
          >
            Contact Us
          </a>
        </section>

      </div>
    </div>
  );
}
