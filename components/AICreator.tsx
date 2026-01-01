import React, { useState } from 'react';
import { generateAdVariations } from '../services/geminiService';
import { AdVariation } from '../types';

interface AICreatorProps {
  onBack: () => void;
}

export const AICreator: React.FC<AICreatorProps> = ({ onBack }) => {
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [variations, setVariations] = useState<AdVariation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // Editable fields for the final deal
  const [discountPrice, setDiscountPrice] = useState("");
  const [quantity, setQuantity] = useState("10");

  const activeVariation = variations.find(v => v.id === selectedId) || variations[0];

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setLoadingStep(0);
    
    // Simulate loading steps for better UX
    const stepsInterval = setInterval(() => {
      setLoadingStep(prev => (prev < 3 ? prev + 1 : prev));
    }, 1500);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      setImagePreview(base64);
      
      const base64Data = base64.split(',')[1];
      try {
        const aiData = await generateAdVariations(base64Data);
        setVariations(aiData);
        if (aiData.length > 0) {
            setSelectedId(aiData[0].id);
        }
      } catch (err) {
          console.error(err);
      } finally {
          clearInterval(stepsInterval);
          setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const getAnimationClass = (style: string) => {
      switch(style) {
          case 'pan': return 'animate-pan-right';
          case 'pulse': return 'animate-pulse-beat';
          case 'zoom': 
          default: return 'animate-zoom-in';
      }
  };

  const loadingMessages = [
      "Analyzing food aesthetics...",
      "Generating viral hooks...",
      "Mixing audio vibes...",
      "Finalizing ad cuts..."
  ];

  return (
    <div className="flex flex-col h-full bg-[#1A1A1A] text-white p-6 overflow-y-auto">
      <div className="flex items-center gap-4 mb-4 shrink-0">
        <button onClick={onBack} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-xl font-bold">AI Deal Director</h2>
      </div>

      {!imagePreview ? (
        <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-3xl p-8 mb-6 bg-black/20 hover:bg-black/40 transition-colors">
           <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-black/50">
             <svg className="w-10 h-10 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
             </svg>
           </div>
           <p className="text-gray-300 text-center mb-2 font-medium">Upload a food photo</p>
           <p className="text-gray-500 text-center mb-6 text-sm">Gemini will generate 3 viral ad concepts instantly.</p>
           <label className="bg-[#FF6B00] text-black font-bold py-3 px-8 rounded-full cursor-pointer hover:bg-orange-500 transition-transform active:scale-95 shadow-lg shadow-orange-500/20">
             Open Camera / Gallery
             <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
           </label>
        </div>
      ) : (
        <div className="flex-1 flex flex-col gap-6">
           {/* Main Preview Player */}
           <div className="relative w-full aspect-[9/16] max-h-[50vh] rounded-3xl overflow-hidden border border-gray-700 shadow-2xl bg-black mx-auto">
             {loading ? (
               <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center gap-6 p-8 text-center z-50">
                 <div className="w-16 h-16 relative">
                    <div className="absolute inset-0 border-4 border-[#FF6B00]/30 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-[#FF6B00] border-t-transparent rounded-full animate-spin"></div>
                 </div>
                 <div className="space-y-2">
                    <span className="text-lg font-bold text-white animate-pulse block">
                        {loadingMessages[loadingStep]}
                    </span>
                    <span className="text-xs text-gray-500">Powered by Google Gemini</span>
                 </div>
               </div>
             ) : activeVariation && (
               <>
                 {/* The Animated Image Background */}
                 <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className={`w-full h-full object-cover ${getAnimationClass(activeVariation.animationStyle)} origin-center`} 
                 />
                 
                 {/* Dark Gradient Overlay for text readability */}
                 <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />

                 {/* Music Indicator */}
                 <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                    <svg className="w-3 h-3 text-[#FF6B00] animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                    <div className="overflow-hidden w-20">
                        <span className="text-[10px] whitespace-nowrap animate-[pan-right_5s_linear_infinite] inline-block">
                            {activeVariation.musicVibe} • Trending Audio • 
                        </span>
                    </div>
                 </div>

                 {/* Simulated UI Overlay */}
                 <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-2">
                    <h2 
                        className="text-3xl font-black leading-tight drop-shadow-lg"
                        style={{ color: activeVariation.accentColor, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
                    >
                        {activeVariation.title}
                    </h2>
                    <p className="text-white text-sm font-medium drop-shadow-md">
                        {activeVariation.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {activeVariation.tags.map((t, i) => (
                            <span key={i} className="text-[10px] font-bold text-white/80 bg-white/10 px-2 py-0.5 rounded backdrop-blur-sm">
                                {t}
                            </span>
                        ))}
                    </div>
                 </div>
               </>
             )}
           </div>

           {/* Variation Selector */}
           {!loading && variations.length > 0 && (
             <div className="animate-in slide-in-from-bottom-8 duration-500">
                <label className="text-xs text-gray-500 uppercase tracking-wide mb-2 block pl-1">Select Vibe</label>
                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar snap-x">
                    {variations.map((v) => (
                        <button
                            key={v.id}
                            onClick={() => setSelectedId(v.id)}
                            className={`snap-start shrink-0 w-28 p-3 rounded-xl border text-left transition-all ${
                                selectedId === v.id 
                                ? 'bg-[#FF6B00]/10 border-[#FF6B00] shadow-[0_0_15px_rgba(255,107,0,0.2)]' 
                                : 'bg-[#222] border-gray-800 hover:border-gray-600'
                            }`}
                        >
                            <div className="text-xs font-bold mb-1 truncate text-white">{v.styleName}</div>
                            <div className="text-[10px] text-gray-400 truncate">{v.musicVibe}</div>
                            <div 
                                className="w-full h-1 mt-2 rounded-full opacity-50"
                                style={{ backgroundColor: v.accentColor }}
                            />
                        </button>
                    ))}
                </div>

                {/* Final Details Form */}
                <div className="mt-6 bg-[#222] p-4 rounded-2xl border border-white/5 space-y-4">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-xs text-gray-500 uppercase tracking-wide">Discount Price</label>
                            <input 
                                type="number" 
                                value={discountPrice}
                                onChange={(e) => setDiscountPrice(e.target.value)}
                                placeholder="0.00" 
                                className="w-full bg-[#111] border border-gray-700 rounded-lg p-3 mt-1 text-white focus:border-[#FF6B00] outline-none" 
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-xs text-gray-500 uppercase tracking-wide">Quantity</label>
                            <input 
                                type="number" 
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="w-full bg-[#111] border border-gray-700 rounded-lg p-3 mt-1 text-white focus:border-[#FF6B00] outline-none" 
                            />
                        </div>
                    </div>
                    
                    <button className="w-full bg-[#00FF41] hover:bg-[#00DD30] text-black font-black py-4 rounded-xl shadow-[0_0_20px_rgba(0,255,65,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2">
                        <span>GO LIVE INSTANTLY</span>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </button>
                </div>
             </div>
           )}
        </div>
      )}
    </div>
  );
};