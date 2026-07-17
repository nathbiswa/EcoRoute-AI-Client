import React from 'react';
import Link from 'next/link';
import { Leaf, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-8 text-slate-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    
                    {/* Brand & Description */}
                    <div className="space-y-4">
                        <Link href="/" className="flex-shrink-0 flex items-center gap-2 group mb-6">
                            <Leaf className="text-emerald-400 group-hover:rotate-12 transition-transform" size={28} />
                            <span className="text-2xl font-bold tracking-tight text-white">
                                EcoRoute <span className="text-emerald-400">AI</span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-slate-400">
                            Revolutionizing global logistics with autonomous, AI-driven routing that prioritizes carbon efficiency and predictive supply chain management.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-all">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-all">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-all">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-all">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><Link href="/" className="text-sm hover:text-emerald-400 transition-colors">Home</Link></li>
                            <li><Link href="/#features" className="text-sm hover:text-emerald-400 transition-colors">Explore Features</Link></li>
                            <li><Link href="/about" className="text-sm hover:text-emerald-400 transition-colors">About Us</Link></li>
                            <li><Link href="/blogs" className="text-sm hover:text-emerald-400 transition-colors">Our Blog</Link></li>
                        </ul>
                    </div>

                    {/* Support & Legal */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Support & Legal</h4>
                        <ul className="space-y-3">
                            <li><Link href="/support" className="text-sm hover:text-emerald-400 transition-colors">Help Center</Link></li>
                            <li><Link href="/contact" className="text-sm hover:text-emerald-400 transition-colors">Contact Support</Link></li>
                            <li><Link href="/privacy" className="text-sm hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/privacy" className="text-sm hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-sm">
                                <MapPin className="text-emerald-500 mt-0.5 flex-shrink-0" size={18} />
                                <span>123 Innovation Drive,<br />Tech District, CA 94103</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <Phone className="text-emerald-500 flex-shrink-0" size={18} />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <Mail className="text-emerald-500 flex-shrink-0" size={18} />
                                <span>support@ecorouteai.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 text-center flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-500">
                        &copy; {currentYear} EcoRoute AI. All rights reserved.
                    </p>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                        Built with <Leaf size={12} className="text-emerald-500" /> for a sustainable future.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
