"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { MapPin, Calendar, Star, DollarSign, ChevronLeft, Package, User, Clock } from 'lucide-react';
import Link from 'next/link';

interface Review {
  _id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface Specification {
  _id: string;
  key: string;
  value: string;
}

interface Product {
  _id: string;
  title: string;
  description: string;
  image: string;
  images: string[];
  price: number;
  date: string;
  rating: number;
  location: string;
  specifications: Specification[];
  reviews: Review[];
}

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch current product
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
        setActiveImage(res.data.image);

        // Fetch related products (all products, then filter)
        const allRes = await axios.get(`http://localhost:5000/api/products`);
        const related = allRes.data.filter((p: Product) => p._id !== id).slice(0, 4);
        setRelatedProducts(related);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-950 pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Product Not Found</h2>
          <Link href="/">
            <button className="px-6 py-2 bg-emerald-500 text-slate-950 font-bold rounded-lg hover:bg-emerald-400 transition-colors">
              Return Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const allImages = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-slate-400 hover:text-emerald-500 transition-colors mb-8">
          <ChevronLeft size={20} className="mr-1" />
          Back to Listings
        </Link>

        {/* 1. Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Media / Images */}
          <div className="space-y-4">
            <div className="w-full h-96 md:h-[500px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
              <img src={activeImage} alt={product.title} className="w-full h-full object-cover" />
            </div>
            
            {allImages.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {allImages.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === img ? 'border-emerald-500 shadow-lg shadow-emerald-500/20' : 'border-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="flex items-center space-x-2 mb-4">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded-full uppercase tracking-wider">
                Active Listing
              </span>
              <div className="flex items-center text-yellow-500">
                <Star size={16} className="fill-yellow-500 mr-1" />
                <span className="font-bold text-sm">{product.rating}</span>
                <span className="text-slate-400 text-sm ml-1">({product.reviews?.length || 0} reviews)</span>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              {product.title}
            </h1>
            
            <div className="text-4xl font-bold text-emerald-400 mb-8 flex items-center">
              <DollarSign size={36} className="mr-1" />
              {product.price.toLocaleString()}
            </div>
            
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-6 py-6 border-t border-b border-slate-800 mb-8">
              <div className="flex items-start space-x-3">
                <MapPin className="text-emerald-500 mt-1" size={24} />
                <div>
                  <p className="text-sm text-slate-500">Location</p>
                  <p className="font-semibold text-white">{product.location}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Calendar className="text-emerald-500 mt-1" size={24} />
                <div>
                  <p className="text-sm text-slate-500">Listed Date</p>
                  <p className="font-semibold text-white">{new Date(product.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <button className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/25 flex items-center justify-center text-lg">
              <Package className="mr-2" size={24} />
              Book Now
            </button>
          </div>
        </div>

        {/* 2. Key Information / Specifications */}
        {product.specifications && product.specifications.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center mr-3">
                <Package size={18} />
              </span>
              Key Specifications
            </h3>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {product.specifications.map((spec, idx) => (
                  <div key={spec._id || idx} className={`flex justify-between p-5 border-slate-800 ${idx % 2 === 0 ? 'bg-slate-900/50' : 'bg-slate-800/20'} ${idx > 1 ? 'border-t md:border-t-0' : ''} ${idx > 0 && idx % 2 === 1 ? 'md:border-l' : ''}`}>
                    <span className="text-slate-400">{spec.key}</span>
                    <span className="font-semibold text-white text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. Reviews & Ratings */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center mr-3">
                <Star size={18} />
              </span>
              Customer Reviews
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.reviews.map((review, idx) => (
                <div key={review._id || idx} className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                        <User size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-white">{review.user}</p>
                        <div className="flex items-center text-slate-500 text-xs mt-0.5">
                          <Clock size={12} className="mr-1" />
                          {new Date(review.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-slate-700'} />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed italic">"{review.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Related Items */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white">More to Explore</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <Link href={`/product/${rel._id}`} key={rel._id} className="group">
                  <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-emerald-500/50 transition-all duration-300 h-[320px] flex flex-col">
                    <div className="h-40 w-full overflow-hidden bg-slate-800">
                      <img src={rel.image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h4 className="font-bold text-white text-base line-clamp-2 mb-2 group-hover:text-emerald-400 transition-colors">{rel.title}</h4>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="font-bold text-emerald-400">${rel.price.toLocaleString()}</span>
                        <div className="flex items-center text-slate-400 text-xs">
                          <Star size={12} className="fill-yellow-500 text-yellow-500 mr-1" />
                          {rel.rating}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductDetails;
