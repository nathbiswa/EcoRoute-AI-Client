"use client";

import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSession } from '../../lib/auth-client';
import { useRouter } from 'next/navigation';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Package, DollarSign, Activity, Star } from 'lucide-react';
import Image from 'next/image';

interface Product {
    _id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    date: string;
    rating: number;
    location: string;
    category?: string;
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function DashboardPage() {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    React.useEffect(() => {
        if (!isPending && !session) {
            router.push('/login');
        }
    }, [session, isPending, router]);

    const { data: products, isLoading } = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/api/products');
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            return data.products || data;
        },
        enabled: !!session,
    });

    // Calculate Metrics
    const metrics = useMemo(() => {
        if (!products) return { totalItems: 0, totalValue: 0, avgRating: 0 };
        const totalItems = products.length;
        const totalValue = products.reduce((sum, item) => sum + item.price, 0);
        const avgRating = totalItems > 0 ? (products.reduce((sum, item) => sum + item.rating, 0) / totalItems).toFixed(1) : 0;
        return { totalItems, totalValue, avgRating };
    }, [products]);

    // Prepare Chart Data: Distribution by category (or location as fallback)
    const distributionData = useMemo(() => {
        if (!products) return [];
        const counts: Record<string, number> = {};
        products.forEach(p => {
            const key = p.category || p.location || 'Other';
            counts[key] = (counts[key] || 0) + 1;
        });
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, [products]);

    // Prepare Chart Data: Top expensive items
    const topExpensiveData = useMemo(() => {
        if (!products) return [];
        return [...products]
            .sort((a, b) => b.price - a.price)
            .slice(0, 5)
            .map(p => ({
                name: p.title.substring(0, 15) + '...',
                price: p.price
            }));
    }, [products]);

    if (isPending || isLoading) {
        return (
            <div className="min-h-screen bg-slate-950 pt-24 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Project <span className="text-emerald-400">Dashboard</span></h1>
                    <p className="text-slate-400">Overview of all events and product analytics.</p>
                </div>

                {/* Key Metrics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center shadow-lg">
                        <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center mr-4 border border-emerald-500/20">
                            <Package className="text-emerald-400" size={24} />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm font-medium mb-1">Total Products</p>
                            <h3 className="text-2xl font-bold text-white">{metrics.totalItems}</h3>
                        </div>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center shadow-lg">
                        <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center mr-4 border border-blue-500/20">
                            <DollarSign className="text-blue-400" size={24} />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm font-medium mb-1">Total Value</p>
                            <h3 className="text-2xl font-bold text-white">${metrics.totalValue.toLocaleString()}</h3>
                        </div>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center shadow-lg">
                        <div className="h-12 w-12 rounded-full bg-yellow-500/10 flex items-center justify-center mr-4 border border-yellow-500/20">
                            <Star className="text-yellow-400" size={24} />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm font-medium mb-1">Average Rating</p>
                            <h3 className="text-2xl font-bold text-white">{metrics.avgRating} / 5.0</h3>
                        </div>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center shadow-lg">
                        <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center mr-4 border border-purple-500/20">
                            <Activity className="text-purple-400" size={24} />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm font-medium mb-1">Active Events</p>
                            <h3 className="text-2xl font-bold text-white">{metrics.totalItems}</h3>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
                    {/* Bar Chart */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
                        <h3 className="text-lg font-bold text-white mb-6">Top Expensive Items</h3>
                        <div className="h-72 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={topExpensiveData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                                    <Tooltip 
                                        cursor={{ fill: '#1e293b' }}
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc' }}
                                    />
                                    <Bar dataKey="price" fill="#10b981" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Pie Chart */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
                        <h3 className="text-lg font-bold text-white mb-6">Distribution by Location/Category</h3>
                        <div className="h-72 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={distributionData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {distributionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc' }}
                                    />
                                    <Legend wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="p-6 border-b border-slate-800">
                        <h3 className="text-lg font-bold text-white">Event Data Log</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-400">
                            <thead className="text-xs text-slate-300 uppercase bg-slate-800/50">
                                <tr>
                                    <th scope="col" className="px-6 py-4">Item Name</th>
                                    <th scope="col" className="px-6 py-4">Location</th>
                                    <th scope="col" className="px-6 py-4">Price</th>
                                    <th scope="col" className="px-6 py-4">Rating</th>
                                    <th scope="col" className="px-6 py-4 text-right">Date Added</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products?.map((item) => (
                                    <tr key={item._id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative h-10 w-10 rounded overflow-hidden bg-slate-800">
                                                    <Image src={item.image || 'https://via.placeholder.com/100'} alt={item.title} fill className="object-cover" />
                                                </div>
                                                <span className="font-medium text-white">{item.title}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{item.location}</td>
                                        <td className="px-6 py-4 font-medium text-emerald-400">${item.price.toLocaleString()}</td>
                                        <td className="px-6 py-4">
                                            <span className="flex items-center gap-1">
                                                <Star size={14} className="text-yellow-500 fill-yellow-500" /> {item.rating}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">{new Date(item.date).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {(!products || products.length === 0) && (
                            <div className="p-10 text-center text-slate-500">
                                No event data available.
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
