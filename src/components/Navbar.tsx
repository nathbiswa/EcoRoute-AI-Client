"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Leaf, LayoutDashboard, PlusCircle, Ship, BarChart3, LogOut, User } from 'lucide-react';
import { authClient } from '../lib/auth-client';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const { data: session } = authClient.useSession();
    const user = session?.user;
    const isLoggedIn = !!user;

    const loggedInLinks = [
        { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={18} /> },
        { name: 'Optimize', href: '/items/add', icon: <PlusCircle size={18} /> },
        { name: 'Fleet', href: '/items/manage', icon: <Ship size={18} /> },
        { name: 'Analytics', href: '/analytics', icon: <BarChart3 size={18} /> },
    ];

    const handleLogOut = async () => {
        await authClient.signOut();
        window.location.href = "/auth/login";
    };

    // সাধারণ লিঙ্কের জন্য একটিভ ক্লাস (Home, About)
    const getLinkClass = (path: string) => {
        return pathname === path
            ? "text-emerald-400 font-bold border-b-2 border-emerald-400 pb-1 transition-all"
            : "text-slate-300 hover:text-emerald-400 transition-colors";
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-slate-900/95 backdrop-blur-md border-b border-emerald-500/20 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
                        <Leaf className="text-emerald-400 group-hover:rotate-12 transition-transform" />
                        <span className="text-xl font-bold tracking-tight">
                            EcoRoute <span className="text-emerald-400">AI</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-6">
                            {!isLoggedIn ? (
                                <div className="flex items-center space-x-4">
                                    <Link href="/" className={getLinkClass('/')}>Home</Link>
                                    <Link href="/about" className={getLinkClass('/about')}>About</Link>

                                    {/* Login Button - Active State Highlights with Border */}
                                    <Link
                                        href="/auth/login"
                                        className={`px-5 py-2 rounded-lg font-medium transition-all border ${pathname === '/auth/login'
                                                ? 'bg-emerald-500/10 border-emerald-400 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.2)]'
                                                : 'border-slate-700 hover:border-emerald-500 text-slate-300 hover:text-white'
                                            }`}
                                    >
                                        Login
                                    </Link>

                                    {/* Register Button - Active State turns White */}
                                    <Link
                                        href="/auth/register"
                                        className={`px-5 py-2 rounded-lg font-medium transition-all shadow-md border border-transparent ${pathname === '/auth/register'
                                                ? 'bg-white text-slate-900 scale-105'
                                                : 'bg-emerald-600 hover:bg-emerald-500 text-white active:scale-95'
                                            }`}
                                    >
                                        Register
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-5">
                                    {loggedInLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className={`flex items-center gap-2 text-sm font-medium transition-colors ${pathname === link.href ? 'text-emerald-400' : 'text-slate-300 hover:text-emerald-400'
                                                }`}
                                        >
                                            {link.icon}
                                            {link.name}
                                        </Link>
                                    ))}

                                    {/* User Profile */}
                                    <div className="flex items-center gap-3 ml-4 pl-4 border-l border-slate-700">
                                        <div className="text-right hidden lg:block">
                                            <p className="text-xs font-bold text-white leading-none">{user?.name}</p>
                                            <span className="text-[10px] text-emerald-400 uppercase tracking-tighter">Pro Agent</span>
                                        </div>
                                        <Link href="/profile" className={`relative p-0.5 rounded-full border-2 transition-all ${pathname === '/profile' ? 'border-white' : 'border-emerald-500'}`}>
                                            <div className="h-8 w-8 rounded-full overflow-hidden bg-slate-800">
                                                {user?.image ? (
                                                    <img src={user.image} alt="User" className="h-full w-full object-cover" />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center"><User size={14} /></div>
                                                )}
                                            </div>
                                        </Link>
                                        <button onClick={handleLogOut} className="p-2 text-slate-400 hover:text-red-400 transition-colors" title="Logout">
                                            <LogOut size={20} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-300 hover:text-white">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-slate-900/98 backdrop-blur-xl border-b border-emerald-500/20 px-4 pb-8 pt-4 space-y-3 animate-in slide-in-from-top duration-300">
                    {!isLoggedIn ? (
                        <>
                            <Link href="/" onClick={() => setIsOpen(false)} className={`block py-3 text-lg ${pathname === '/' ? 'text-emerald-400 font-bold' : ''}`}>Home</Link>
                            <Link href="/auth/login" onClick={() => setIsOpen(false)} className={`block py-3 text-center rounded-xl border ${pathname === '/auth/login' ? 'border-emerald-400 bg-emerald-400/10 text-emerald-400' : 'border-slate-700'}`}>
                                Login
                            </Link>
                            <Link href="/auth/register" onClick={() => setIsOpen(false)} className={`block py-3 text-center rounded-xl font-bold ${pathname === '/auth/register' ? 'bg-white text-slate-900' : 'bg-emerald-600 text-white'}`}>
                                Register
                            </Link>
                        </>
                    ) : (
                        <>
                            {loggedInLinks.map((link) => (
                                <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className={`flex items-center gap-3 py-4 border-b border-slate-800/50 ${pathname === link.href ? 'text-emerald-400 font-bold' : 'text-slate-300'}`}>
                                    {link.icon} {link.name}
                                </Link>
                            ))}
                            <button onClick={handleLogOut} className="flex items-center gap-3 py-4 text-red-400 w-full font-medium">
                                <LogOut size={18} /> Logout Session
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;