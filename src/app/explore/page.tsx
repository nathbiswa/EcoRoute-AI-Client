"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, SlidersHorizontal, MapPin, Calendar, Star, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Product {
    _id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    date: string;
    rating: number;
    location: string;
}

const ExplorePage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Pagination state
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    
    // Filter & Sort state
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState(''); // for debouncing/submitting
    const [location, setLocation] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sort, setSort] = useState('newest');

    useEffect(() => {
        fetchProducts();
    }, [page, search, location, sort]); // refetch when these change

    // If minPrice/maxPrice change, wait for user to hit "Apply" so we don't spam API
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                page: page.toString(),
                limit: '8', // 8 items per page for a good grid
                sort,
                ...(search && { search }),
                ...(location && { location }),
                ...(minPrice && { minPrice }),
                ...(maxPrice && { maxPrice })
            });

            const res = await axios.get(`http://localhost:5000/api/products?${queryParams}`);
            setProducts(res.data.products);
            setTotalPages(res.data.pagination.totalPages || 1);
        } catch (error) {
            console.error("Error fetching explore products:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        setSearch(searchInput);
    };

    const handleApplyFilters = () => {
        setPage(1);
        fetchProducts(); // manually trigger for price since it's not in dependency array
    };

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header & Search */}
                <div className="mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Explore the <span className="text-emerald-400">Market</span></h1>
                    
                    <form onSubmit={handleSearchSubmit} className="relative max-w-2xl">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input 
                                type="text"
                                placeholder="Search products, services, items..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl pl-12 pr-32 py-4 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-lg"
                            />
                            <button 
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2 px-6 rounded-lg transition-colors"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Sidebar / Filters */}
                    <div className="w-full lg:w-1/4">
                        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 sticky top-24">
                            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-800">
                                <Filter className="text-emerald-400" size={20} />
                                <h2 className="text-xl font-bold text-white">Filters</h2>
                            </div>

                            {/* Location Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-slate-400 mb-2">Location</label>
                                <select 
                                    value={location}
                                    onChange={(e) => { setLocation(e.target.value); setPage(1); }}
                                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors appearance-none"
                                >
                                    <option value="">All Locations</option>
                                    <option value="New York">New York</option>
                                    <option value="California">California</option>
                                    <option value="Texas">Texas</option>
                                    <option value="London">London</option>
                                    <option value="Berlin">Berlin</option>
                                </select>
                            </div>

                            {/* Price Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-slate-400 mb-2">Price Range</label>
                                <div className="flex items-center gap-2">
                                    <input 
                                        type="number"
                                        placeholder="Min"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                                    />
                                    <span className="text-slate-500">-</span>
                                    <input 
                                        type="number"
                                        placeholder="Max"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                                    />
                                </div>
                            </div>

                            <button 
                                onClick={handleApplyFilters}
                                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition-colors border border-slate-700 hover:border-emerald-500/50"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="w-full lg:w-3/4 flex flex-col">
                        
                        {/* Sort Bar */}
                        <div className="flex flex-col sm:flex-row items-center justify-between bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6">
                            <p className="text-slate-400 text-sm mb-4 sm:mb-0">
                                Showing {products.length} {products.length === 1 ? 'result' : 'results'}
                            </p>
                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                <SlidersHorizontal size={18} className="text-emerald-400 flex-shrink-0" />
                                <select 
                                    value={sort}
                                    onChange={(e) => { setSort(e.target.value); setPage(1); }}
                                    className="w-full sm:w-48 bg-slate-800 border border-slate-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500 appearance-none"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="price_asc">Price: Low to High</option>
                                    <option value="price_desc">Price: High to Low</option>
                                    <option value="rating_desc">Highest Rated</option>
                                </select>
                            </div>
                        </div>

                        {/* Product Grid */}
                        {loading ? (
                            <div className="flex-grow flex items-center justify-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                            </div>
                        ) : products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
                                {products.map((product) => (
                                    <div key={product._id} className="group bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-emerald-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(52,211,153,0.1)] flex flex-col h-[400px]">
                                        {/* Image Container */}
                                        <div className="h-48 w-full overflow-hidden bg-slate-800 relative">
                                            <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-sm text-emerald-400 font-bold px-3 py-1 rounded-full text-sm border border-emerald-500/30">
                                                ${product.price.toLocaleString()}
                                            </div>
                                        </div>

                                        {/* Content Container */}
                                        <div className="p-5 flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-emerald-400 transition-colors">
                                                    {product.title}
                                                </h3>
                                                <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                                                    {product.description}
                                                </p>
                                            </div>

                                            <div>
                                                <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pb-4 border-b border-slate-800">
                                                    <div className="flex items-center gap-1.5"><MapPin size={14} className="text-emerald-500"/>{product.location}</div>
                                                    <div className="flex items-center gap-1.5"><Star size={14} className="text-yellow-500 fill-yellow-500"/>{product.rating}</div>
                                                </div>

                                                <Link href={`/product/${product._id}`} className="block w-full">
                                                    <button className="w-full py-2.5 bg-slate-800/50 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 font-semibold rounded-lg transition-all duration-300 text-sm border border-slate-700 hover:border-transparent">
                                                        View Details
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex-grow flex flex-col items-center justify-center text-center p-12 bg-slate-900 border border-slate-800 rounded-2xl">
                                <Search className="text-slate-600 mb-4" size={48} />
                                <h3 className="text-2xl font-bold text-white mb-2">No results found</h3>
                                <p className="text-slate-400">Try adjusting your search or filters to find what you're looking for.</p>
                                <button 
                                    onClick={() => { setSearch(''); setSearchInput(''); setLocation(''); setMinPrice(''); setMaxPrice(''); setPage(1); }}
                                    className="mt-6 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold rounded-lg transition-colors border border-slate-700"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}

                        {/* Pagination */}
                        {!loading && products.length > 0 && (
                            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-800">
                                <p className="text-slate-400 text-sm">
                                    Showing page <span className="font-bold text-white">{page}</span> of <span className="font-bold text-white">{totalPages}</span>
                                </p>
                                
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => setPage(p => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                        className="flex items-center gap-1 px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-emerald-400 hover:border-emerald-500 hover:bg-slate-800 disabled:opacity-50 disabled:pointer-events-none transition-all"
                                    >
                                        <ChevronLeft size={16} /> Previous
                                    </button>
                                    
                                    {/* Numbered pages can go here if needed, for now just show Prev/Next clearly */}
                                    <div className="px-4 py-2 bg-emerald-500/10 text-emerald-400 font-bold rounded-lg border border-emerald-500/20">
                                        {page}
                                    </div>

                                    <button 
                                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                        disabled={page === totalPages}
                                        className="flex items-center gap-1 px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-emerald-400 hover:border-emerald-500 hover:bg-slate-800 disabled:opacity-50 disabled:pointer-events-none transition-all"
                                    >
                                        Next <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExplorePage;
