import React from 'react';
import { MOCK_DEALS } from '../constants';

export const HaloMap: React.FC = () => {
  return (
    <div className="relative w-full h-full bg-[#0A0A0A] overflow-hidden flex items-center justify-center">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20" 
           style={{ 
             backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', 
             backgroundSize: '30px 30px' 
           }} 
      />

      {/* Radar Circles */}
      <div className="absolute w-[600px] h-[600px] border border-[#FF6B00]/10 rounded-full animate-[spin_10s_linear_infinite]" />
      <div className="absolute w-[400px] h-[400px] border border-[#FF6B00]/20 rounded-full" />
      <div className="absolute w-[200px] h-[200px] border border-[#FF6B00]/30 rounded-full" />
      
      {/* Scanner Sweep */}
      <div className="absolute w-[300px] h-[300px] bg-gradient-to-r from-transparent via-[#FF6B00]/10 to-transparent rounded-full animate-[spin_3s_linear_infinite] origin-bottom-right top-[-150px] left-[-150px] blur-xl" />

      {/* User Halo */}
      <div className="relative z-10 w-6 h-6 bg-[#FF6B00] rounded-full shadow-[0_0_30px_#FF6B00] animate-pulse flex items-center justify-center">
        <div className="w-2 h-2 bg-white rounded-full" />
      </div>

      {/* Deal Pins */}
      {MOCK_DEALS.map((deal, idx) => {
        // Random placement for demo visualization
        const angle = (idx / MOCK_DEALS.length) * 2 * Math.PI;
        const radius = 100 + idx * 40; 
        const top = `calc(50% + ${Math.sin(angle) * radius}px)`;
        const left = `calc(50% + ${Math.cos(angle) * radius}px)`;

        return (
          <div 
            key={deal.id}
            className="absolute z-20 flex flex-col items-center group cursor-pointer"
            style={{ top, left }}
          >
            <div className={`
              w-4 h-4 rounded-full shadow-[0_0_15px_currentColor] animate-bounce
              ${deal.discountPrice === 0 ? 'bg-[#FFD700] text-[#FFD700]' : 'bg-[#00FF41] text-[#00FF41]'}
            `} />
            <div className="mt-2 bg-black/80 backdrop-blur text-xs px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {deal.merchantName} • {deal.distanceMeters}m
            </div>
          </div>
        );
      })}

      <div className="absolute bottom-24 w-full flex justify-center pointer-events-none">
        <div className="bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs text-gray-400">
           Scanning area... 3 deals found
        </div>
      </div>
    </div>
  );
};