import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface MerchantDashboardProps {
  onCreate: () => void;
}

const data = [
  { name: '12pm', grabs: 4 },
  { name: '1pm', grabs: 12 },
  { name: '2pm', grabs: 8 },
  { name: '3pm', grabs: 2 },
  { name: '4pm', grabs: 15 },
  { name: '5pm', grabs: 23 },
];

export const MerchantDashboard: React.FC<MerchantDashboardProps> = ({ onCreate }) => {
  const [isLive, setIsLive] = useState(true);

  return (
    <div className="h-full bg-[#0A0A0A] p-6 overflow-y-auto pb-24">
      <h1 className="text-2xl font-black mb-6">Pulse Dashboard</h1>

      {/* The Traffic Toggle */}
      <div className="bg-[#1A1A1A] rounded-3xl p-6 border border-white/10 mb-8 flex flex-col items-center shadow-lg">
        <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-4">Store Visibility</h3>
        <button 
          onClick={() => setIsLive(!isLive)}
          className={`relative w-full h-32 rounded-2xl transition-all duration-500 flex items-center justify-center overflow-hidden group ${isLive ? 'bg-gradient-to-br from-green-900 to-[#00FF41]/20 border border-[#00FF41]' : 'bg-gray-900 border border-red-900'}`}
        >
          <div className={`absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20`} />
          <div className="z-10 flex flex-col items-center">
            <span className={`text-4xl font-black uppercase tracking-tighter ${isLive ? 'text-[#00FF41] drop-shadow-[0_0_10px_rgba(0,255,65,0.8)]' : 'text-red-500'}`}>
              {isLive ? 'LIVE' : 'OFFLINE'}
            </span>
            <span className="text-xs text-white/50 mt-2">{isLive ? 'Traffic Engine Active' : 'Store Hidden from Map'}</span>
          </div>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-[#1A1A1A] p-4 rounded-2xl border border-white/5">
          <p className="text-gray-400 text-xs">Active Grabs</p>
          <p className="text-3xl font-bold text-white mt-1">12</p>
        </div>
        <div className="bg-[#1A1A1A] p-4 rounded-2xl border border-white/5">
           <p className="text-gray-400 text-xs">Redeemed Today</p>
           <p className="text-3xl font-bold text-[#FF6B00] mt-1">45</p>
        </div>
      </div>

      {/* Analytics */}
      <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 p-4 mb-8 h-64">
        <h3 className="text-gray-400 text-xs uppercase mb-4">Traffic Velocity</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#555" fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '8px' }}
              itemStyle={{ color: '#fff' }}
              cursor={{fill: 'rgba(255,255,255,0.1)'}}
            />
            <Bar dataKey="grabs" fill="#FF6B00" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <button 
        onClick={onCreate}
        className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Create New Deal
      </button>
    </div>
  );
};