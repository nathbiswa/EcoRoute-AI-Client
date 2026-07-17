"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, LogIn, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { authClient } from '@/src/lib/auth-client';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();

  // সেশন চেক
  const { data: session } = authClient.useSession();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    if (data) {
      toast.success('Successfully signed in!');
      router.push('/');
    }
    if (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/"
    });
  };

  // ডেমো লগইন হ্যান্ডলার
  const handleDemoLogin = async () => {
    const { data, error } = await authClient.signIn.email({
      email: "admin@ecoroute.ai", // আপনার ডেমো ইমেইল
      password: "password123",    // আপনার ডেমো পাসওয়ার্ড
    });
    if (data) {
      toast.success('Logged in as Demo User');
      router.push('/');
    }
  };

  return (
    // Navbar fixed থাকায় উপরে padding (pt-20) দেওয়া হয়েছে যাতে কন্টেন্ট নিচে দেখা যায়
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 pt-20 pb-10">

      {/* max-w-md ব্যবহার করা হয়েছে যা লগইন ফর্মের জন্য স্ট্যান্ডার্ড (প্রায় 448px) */}
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-100">

        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h2>
          <p className="mt-2 text-sm text-slate-500">Sign in to access your Agentic AI dashboard</p>
        </div>

        {/* GOOGLE LOGIN */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-medium text-slate-700 shadow-sm active:scale-95"
        >
          <Image src="https://www.svgrepo.com/show/355037/google.svg"
            width={20}
            height={20}
            alt="Google" />
          Continue with Google
        </button>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-4 text-slate-400 text-xs uppercase tracking-widest">Or</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* FORM SECTION */}
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-slate-400" size={18} />
              <input
                type="email"
                name="email" // name অ্যাট্রিবিউট অবশ্যই লাগবে
                required
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-900"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-slate-400" size={18} />
              <input
                type="password"
                name="password" // name অ্যাট্রিবিউট অবশ্যই লাগবে
                required
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-900"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-100 active:scale-95"
            >
              <LogIn size={18} /> Sign In
            </button>

            {/* DEMO LOGIN BUTTON */}
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Sparkles size={18} className="text-emerald-400" /> Use Demo Credentials
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-slate-600">
          New here? <Link href="/auth/register" className="text-emerald-600 font-semibold hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;