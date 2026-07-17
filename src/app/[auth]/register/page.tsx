"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, User, ShieldCheck, ImageIcon, Globe } from 'lucide-react';
import Image from 'next/image';
import { authClient } from '@/src/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const RegisterPage = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const user = Object.fromEntries(formData.entries());

        // 🎯 সবগুলোকে 'as string' লিখে টাইপ কাস্ট করে দেওয়া হলো
        const { data, error } = await authClient.signUp.email({
            name: user.name as string,
            email: user.email as string,
            password: user.password as string,
            image: user.image ? (user.image as string) : undefined,
        });
        console.log("Registering with data:", user);
        // Backend integration goes here
        if (!error) {
            toast.success("User registered successfully!");
            // Redirect to login or dashboard
            // router.push('/login');
        } else {
            toast.error("Something went wrong!");
        }
    };

    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google",
        });
        toast.success('Google Sign In successful! Redirecting to home page...');
        router.push('/'); // Redirect to home after Google login
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-100">

                {/* Header Section */}
                <div className="text-center">
                    <div className="flex justify-center mb-2">
                        <div className="p-3 bg-emerald-50 rounded-full">
                            <ShieldCheck size={40} className="text-emerald-600" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create Account</h2>
                    <p className="mt-2 text-sm text-slate-500 font-medium">Join EcoRoute AI and start optimizing</p>
                </div>

                {/* Social Login */}
                <button
                    onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-semibold text-slate-700 shadow-sm"
                >
                    <Image
                        src="https://www.svgrepo.com/show/355037/google.svg"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                        alt="Google" />
                    Sign up with Google
                </button>

                <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-slate-200"></div>
                    <span className="flex-shrink mx-4 text-slate-400 text-xs uppercase tracking-widest font-bold">Or</span>
                    <div className="flex-grow border-t border-slate-200"></div>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-4">

                        {/* Full Name */}
                        <div className="relative">
                            <User className="absolute left-3 top-3.5 text-slate-400" size={18} />
                            <input
                                type="text"
                                required
                                name="name"
                                placeholder="Full Name"
                                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"

                            />
                        </div>

                        {/* Email Address */}
                        <div className="relative">
                            <Mail className="absolute left-3 top-3.5 text-slate-400" size={18} />
                            <input
                                type="email"
                                required
                                placeholder="Email Address"
                                name="email"
                                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                            />
                        </div>

                        {/* Image Link Field (New) */}
                        <div className="relative">
                            <ImageIcon className="absolute left-3 top-3.5 text-slate-400" size={18} />
                            <input
                                type="url"
                                placeholder="Profile Image URL (Optional)"
                                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                name="image"
                            />
                            <div className="absolute right-3 top-3.5 group cursor-help">
                                <Globe size={16} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 text-slate-400" size={18} />
                            <input
                                type="password"
                                required
                                placeholder="Create Password"
                                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                name="password"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-100 mt-2 active:scale-[0.98]"
                    >
                        Create Account
                    </button>
                </form>

                {/* Login Link */}
                <p className="text-center text-sm text-slate-600 font-medium">
                    Already have an account? <Link href="/login" className="text-emerald-600 font-bold hover:underline">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;