"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Leaf, LayoutDashboard, PlusCircle, Ship, BarChart3, User, LogOut } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Replace this with your actual Auth logic later (e.g., const { user } = useAuth())
    const isLoggedIn = true;

    const loggedOutLinks = [
        { name: 'Home', href: '/' },
        { name: 'Features', href: '#features' },
        { name: 'About AI', href: '/about' },
    ];

    const loggedInLinks = [
        { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={18} /> },
        { name: 'Optimize', href: '/items/add', icon: <PlusCircle size={18} /> },
        { name: 'Fleet', href: '/items/manage', icon: <Ship size={18} /> },
        { name: 'Analytics', href: '/analytics', icon: <BarChart3 size={18} /> },
        { name: 'Profile', href: '/profile', icon: <User size={18} /> },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 bg-slate-900/95 backdrop-blur-md border-b border-emerald-500/20 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo Section */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <Leaf className="text-emerald-400" />
                        <span className="text-xl font-bold tracking-tight">
                            EcoRoute <span className="text-emerald-400">AI</span>
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {!isLoggedIn ? (
                                <>
                                    {loggedOutLinks.map((link) => (
                                        <Link key={link.name} href={link.href} className="hover:text-emerald-400 px-3 py-2 transition-colors">
                                            {link.name}
                                        </Link>
                                    ))}
                                    <Link href="/login" className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-medium transition-all">
                                        Login
                                    </Link>
                                </>
                            ) : (
                                <>
                                    {loggedInLinks.map((link) => (
                                        <Link key={link.name} href={link.href} className="flex items-center gap-2 hover:text-emerald-400 px-3 py-2 transition-colors text-sm font-medium">
                                            {link.icon}
                                            {link.name}
                                        </Link>
                                    ))}
                                    <button className="ml-4 p-2 text-slate-400 hover:text-red-400 transition-colors">
                                        <LogOut size={20} />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Sidebar */}
            {isOpen && (
                <div className="md:hidden bg-slate-900 border-b border-emerald-500/20">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {!isLoggedIn ? (
                            loggedOutLinks.map((link) => (
                                <Link key={link.name} href={link.href} className="block px-3 py-4 text-base font-medium border-b border-slate-800">
                                    {link.name}
                                </Link>
                            ))
                        ) : (
                            loggedInLinks.map((link) => (
                                <Link key={link.name} href={link.href} className="flex items-center gap-3 px-3 py-4 text-base font-medium border-b border-slate-800">
                                    {link.icon}
                                    {link.name}
                                </Link>
                            ))
                        )}
                        {!isLoggedIn && (
                            <Link href="/login" className="block w-full text-center bg-emerald-600 py-3 mt-4 rounded-md">
                                Get Started
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;