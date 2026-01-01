import React, { useEffect, useState } from 'react';
import { Deal } from '../types';
import { COLORS } from '../constants';

interface DealCardProps {
  deal: Deal;
  onGrab: (deal: Deal) => void;
  isActive: boolean;
}

export const DealCard: React.FC<DealCardProps> = ({ deal, onGrab, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // Mock countdown

  useEffect(() => {
    if (!isActive) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isActive]);

  return (
    <div className="relative w-full h-full bg-gray-900 snap-start shrink-0 overflow-hidden">
      {/* Background Image */}
      <img 
        src={deal.imageUrl} 
        alt={deal.title} 
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90" />

      {/* Top Overlay: Distance & Units */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
        <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
          <svg className="w-4 h-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm font-bold">{Math.round(deal.distanceMeters / 1.2)}m walk</span>
        </div>
        
        <div className="flex flex-col items-end">
           <div className="bg-red-600 px-3 py-1 rounded-full animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.7)]">
             <span className="text-xs font-black uppercase tracking-wider text-white">Only {deal.unitsLeft} Left</span>
           </div>
        </div>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 pb-24">
        {/* Merchant Info */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden border border-white/20">
             <img src={`https://ui-avatars.com/api/?name=${deal.merchantName}&background=random`} alt="merchant" />
          </div>
          <span className="text-sm font-medium text-gray-300 shadow-black drop-shadow-md">{deal.merchantName}</span>
        </div>

        {/* Title & Price */}
        <h2 className="text-3xl font-black text-white leading-tight mb-2 drop-shadow-lg">
          {deal.title}
        </h2>
        
        <div className="flex items-end gap-3 mb-4">
            <span className="text-[#00FF41] text-2xl font-bold drop-shadow-md">
                {deal.discountPrice === 0 ? 'FREE' : `$${deal.discountPrice.toFixed(2)}`}
            </span>
            <span className="text-gray-400 text-lg line-through mb-1">
                ${deal.originalPrice.toFixed(2)}
            </span>
            <span className="bg-[#FF6B00] text-black text-xs font-bold px-2 py-0.5 rounded ml-auto">
                {Math.round(((deal.originalPrice - deal.discountPrice) / deal.originalPrice) * 100)}% OFF
            </span>
        </div>

        {/* Description */}
        <p className="text-gray-200 text-sm mb-4 line-clamp-2 drop-shadow-md">
          {deal.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {deal.tags.map(tag => (
            <span key={tag} className="text-xs font-medium text-[#FF6B00] bg-black/50 px-2 py-1 rounded border border-[#FF6B00]/30 backdrop-blur-sm">
              {tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <button 
          onClick={() => onGrab(deal)}
          className="w-full bg-[#FF6B00] text-black font-black text-lg py-4 rounded-xl shadow-[0_0_20px_rgba(255,107,0,0.4)] active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          <span>GRAB IT NOW</span>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
};