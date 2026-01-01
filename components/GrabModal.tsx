import React, { useEffect, useState } from 'react';
import { ActiveGrab } from '../types';

interface GrabModalProps {
  grab: ActiveGrab;
  onClose: () => void;
}

export const GrabModal: React.FC<GrabModalProps> = ({ grab, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          onClose(); // Auto close on expire
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onClose]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-6 animate-in fade-in zoom-in duration-300">
      <div className="w-full max-w-sm bg-[#1A1A1A] rounded-3xl border border-[#FF6B00]/30 p-6 text-center relative overflow-hidden shadow-[0_0_40px_rgba(255,107,0,0.2)]">
        
        {/* Animated Glow Background */}
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,107,0,0.1)_0%,transparent_70%)] animate-pulse pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-center mb-4">
             <span className="text-[#00FF41] font-bold text-sm tracking-widest uppercase animate-pulse">
                Deal Secured
             </span>
          </div>

          <h2 className="text-2xl font-black text-white mb-2">{grab.deal.title}</h2>
          <p className="text-gray-400 text-sm mb-6">Show this code to {grab.deal.merchantName}</p>

          <div className="bg-white p-4 rounded-xl mx-auto w-48 h-48 mb-6 flex items-center justify-center shadow-lg">
             {/* Mock QR Code */}
             <div className="w-full h-full bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=GRAB-IT-TOKEN-123')] bg-contain bg-no-repeat bg-center mix-blend-multiply" />
          </div>

          <div className="mb-6">
            <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Expires In</p>
            <div className="text-4xl font-mono font-bold text-[#FF6B00]">
              {formatTime(timeLeft)}
            </div>
          </div>

          <button 
            className="w-full bg-[#333] hover:bg-[#444] text-white font-bold py-3 rounded-xl transition-colors mb-3 flex items-center justify-center gap-2"
          >
             <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 01-.553-.894L15 7m0 13V7" />
             </svg>
             Get Directions
          </button>

          <button 
            onClick={onClose}
            className="text-gray-500 text-sm hover:text-white transition-colors"
          >
            Close & Keep in Vault
          </button>
        </div>
      </div>
    </div>
  );
};