"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '../../../lib/auth-client';
import axios from 'axios';
import { Leaf, PlusCircle, AlertCircle, CheckCircle, Package, Calendar, DollarSign, MapPin, Image as ImageIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddItemPage = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();



    const [title, setTitle] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (!isPending && !session) {
            router.push('/auth/login');
        }
    }, [isPending, session, router]);

    if (isPending || !session) {
        return (
            <div className="min-h-screen bg-slate-950 pt-24 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Fetch a signed JWT from our custom Next.js API route
            // This route reads the Better Auth session (via cookie) and signs a JWT using jose
            const tokenRes = await fetch('/api/token');
            if (!tokenRes.ok) {
                throw new Error("Session expired. Please log in again.");
            }
            const { token } = await tokenRes.json();

            if (!token) {
                throw new Error("Failed to retrieve authentication token.");
            }

            const response = await axios.post('http://localhost:5000/api/products', {
                title,
                shortDescription,
                description: `${shortDescription}\n\n${description}`,
                price: Number(price),
                date,
                location,
                image
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const successMsg = "Item successfully added to the marketplace!";
            setSuccess(successMsg);
            toast.success(successMsg, {
                theme: "dark",
                position: "bottom-right",
                autoClose: 4000
            });

            // Reset form
            setTitle('');
            setShortDescription('');
            setDescription('');
            setPrice('');
            setDate('');
            setLocation('');
            setImage('');

        } catch (err: any) {
            console.error("Submission error:", err);
            // Extract the most specific error message available
            const errMsg =
                err.response?.data?.error ||
                err.response?.data?.message ||
                err.message ||
                "An unexpected error occurred.";
            setError(errMsg);
            toast.error(errMsg, {
                theme: "dark",
                position: "bottom-right",
                autoClose: 4000
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-white flex items-center justify-center gap-3">
                        <PlusCircle className="text-emerald-500" size={32} />
                        Add New <span className="text-emerald-400">Item</span>
                    </h1>
                    <p className="text-slate-400 mt-2">List a new product, service, or asset on the marketplace.</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-10 shadow-2xl">

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-start gap-3">
                            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/50 rounded-xl flex items-start gap-3">
                            <CheckCircle className="text-emerald-500 flex-shrink-0 mt-0.5" size={20} />
                            <p className="text-emerald-400 text-sm font-medium">{success}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-2 flex items-center gap-2">
                                <Package size={16} className="text-emerald-500" /> Title
                            </label>
                            <input
                                type="text"
                                required
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                                placeholder="E.g., Tesla Model 3 Long Range"
                            />
                        </div>

                        {/* Short Description */}
                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-2">
                                Short Description
                            </label>
                            <input
                                type="text"
                                required
                                value={shortDescription}
                                onChange={e => setShortDescription(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-all"
                                placeholder="Brief overview of the item"
                            />
                        </div>

                        {/* Full Description */}
                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-2">
                                Full Description
                            </label>
                            <textarea
                                required
                                rows={4}
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-all resize-y"
                                placeholder="Detailed specifications, history, and features..."
                            ></textarea>
                        </div>

                        {/* Grid for Price, Date, Location */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-300 mb-2 flex items-center gap-2">
                                    <DollarSign size={16} className="text-emerald-500" /> Price
                                </label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-all"
                                    placeholder="45000"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-300 mb-2 flex items-center gap-2">
                                    <Calendar size={16} className="text-emerald-500" /> Available Date
                                </label>
                                <input
                                    type="date"
                                    required
                                    value={date}
                                    onChange={e => setDate(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 text-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-300 mb-2 flex items-center gap-2">
                                    <MapPin size={16} className="text-emerald-500" /> Location
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={location}
                                    onChange={e => setLocation(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-all"
                                    placeholder="e.g., New York, NY"
                                />
                            </div>
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-2 flex items-center gap-2">
                                <ImageIcon size={16} className="text-emerald-500" /> Image URL
                            </label>
                            <input
                                type="url"
                                required
                                value={image}
                                onChange={e => setImage(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-all"
                                placeholder="https://example.com/image.jpg"
                            />
                            {image && (
                                <div className="mt-4 rounded-xl overflow-hidden border border-slate-700 h-48 bg-slate-950 relative">
                                    <img src={image} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/25 flex items-center justify-center text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-slate-950"></div>
                                ) : (
                                    <>Submit Item</>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddItemPage;
