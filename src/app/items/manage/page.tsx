"use client";

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2, ExternalLink, Plus, MapPin, DollarSign, Calendar } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from '../../../lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../../../lib/config';

interface Product {
    _id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    date: string;
    rating: number;
    location: string;
    category: string;
}

export default function ManageItemsPage() {
    const { data: session, isPending } = useSession();
    const router = useRouter();
    const queryClient = useQueryClient();
    
    // Redirect if not authenticated (simple client-side protection)
    React.useEffect(() => {
        if (!isPending && !session) {
            router.push('/login');
        }
    }, [session, isPending, router]);

    const { data: products, isLoading } = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`${API_BASE_URL}/api/products`);
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            return data.products || data;
        },
        enabled: !!session, // only fetch if authenticated
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Failed to delete product');
            return res.json();
        },
        onSuccess: () => {
            toast.success("Item deleted successfully!");
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
        onError: () => {
            toast.error("Failed to delete the item.");
        }
    });

    const handleDelete = (id: string, title: string) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            deleteMutation.mutate(id);
        }
    };

    if (isPending) {
        return (
            <div className="min-h-screen bg-slate-950 pt-24 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    if (!session) return null; // Will redirect in useEffect

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Manage <span className="text-emerald-400">Items</span></h1>
                        <p className="text-slate-400">View and manage all products in the database.</p>
                    </div>
                    <Link href="/items/add" className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-emerald-500/20">
                        <Plus size={20} /> Add New Item
                    </Link>
                </div>

                {/* Content */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                    {isLoading ? (
                        <div className="flex justify-center p-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                        </div>
                    ) : products && products.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-400">
                                <thead className="text-xs text-slate-300 uppercase bg-slate-800 border-b border-slate-700">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 rounded-tl-xl">Product</th>
                                        <th scope="col" className="px-6 py-4">Details</th>
                                        <th scope="col" className="px-6 py-4">Location</th>
                                        <th scope="col" className="px-6 py-4 text-right rounded-tr-xl">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product._id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden border border-slate-700 bg-slate-800">
                                                        <Image 
                                                            src={product.image || 'https://via.placeholder.com/150'} 
                                                            alt={product.title}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-white text-base mb-1 line-clamp-1">{product.title}</div>
                                                        <div className="text-xs text-emerald-400 bg-emerald-500/10 inline-block px-2 py-0.5 rounded border border-emerald-500/20">
                                                            {product.category || 'General'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1.5">
                                                    <span className="flex items-center gap-1.5 font-medium text-emerald-400">
                                                        <DollarSign size={14} /> {product.price.toLocaleString()}
                                                    </span>
                                                    <span className="flex items-center gap-1.5 text-xs">
                                                        <Calendar size={14} className="text-slate-500" /> {new Date(product.date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="flex items-center gap-1.5">
                                                    <MapPin size={14} className="text-slate-500" /> {product.location}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-3">
                                                    <Link 
                                                        href={`/product/${product._id}`}
                                                        className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors border border-transparent hover:border-emerald-500/20"
                                                        title="View Details"
                                                    >
                                                        <ExternalLink size={18} />
                                                    </Link>
                                                    <button 
                                                        onClick={() => handleDelete(product._id, product.title)}
                                                        disabled={deleteMutation.isPending}
                                                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20 disabled:opacity-50"
                                                        title="Delete Item"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-slate-400 text-lg mb-4">No products found in the database.</p>
                            <Link href="/items/add" className="text-emerald-400 hover:text-emerald-300 font-bold underline underline-offset-4">
                                Add your first item
                            </Link>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
