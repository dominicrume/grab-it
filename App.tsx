import React, { useState } from 'react';
import { DealCard } from './components/DealCard';
import { GrabModal } from './components/GrabModal';
import { HaloMap } from './components/HaloMap';
import { MerchantDashboard } from './components/MerchantDashboard';
import { AICreator } from './components/AICreator';
import { COLORS, MOCK_DEALS } from './constants';
import { AppMode, ViewState, Deal, ActiveGrab } from './types';

function App() {
  const [appMode, setAppMode] = useState<AppMode>(AppMode.CONSUMER);
  const [viewState, setViewState] = useState<ViewState>(ViewState.FEED);
  const [activeGrab, setActiveGrab] = useState<ActiveGrab | null>(null);
  const [activeDealIndex, setActiveDealIndex] = useState(0);

  const handleGrab = (deal: Deal) => {
    setActiveGrab({
      deal,
      grabTime: Date.now(),
      qrCodeData: `GRAB-${deal.id}-${Date.now()}`
    });
  };

  const renderConsumerView = () => {
    switch (viewState) {
      case ViewState.MAP:
        return <HaloMap />;
      case ViewState.FEED:
      default:
        return (
          <div className="h-full w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black">
            {MOCK_DEALS.map((deal, idx) => (
              <div key={deal.id} className="h-full w-full snap-start">
                <DealCard 
                  deal={deal} 
                  onGrab={handleGrab} 
                  isActive={idx === activeDealIndex} 
                />
              </div>
            ))}
          </div>
        );
    }
  };

  const renderMerchantView = () => {
    switch (viewState) {
      case ViewState.MERCHANT_CREATE:
        return <AICreator onBack={() => setViewState(ViewState.MERCHANT_DASH)} />;
      case ViewState.MERCHANT_DASH:
      default:
        return <MerchantDashboard onCreate={() => setViewState(ViewState.MERCHANT_CREATE)} />;
    }
  };

  return (
    <div className="relative w-full h-[100dvh] bg-[#0A0A0A] overflow-hidden font-sans text-white select-none">
      
      {/* App Mode Switcher (Dev Tool mostly, but functional for demo) */}
      <div className="absolute top-4 right-4 z-50 opacity-30 hover:opacity-100 transition-opacity">
         <button 
           onClick={() => {
             const newMode = appMode === AppMode.CONSUMER ? AppMode.MERCHANT : AppMode.CONSUMER;
             setAppMode(newMode);
             setViewState(newMode === AppMode.CONSUMER ? ViewState.FEED : ViewState.MERCHANT_DASH);
           }}
           className="bg-white/10 backdrop-blur px-2 py-1 rounded text-xs border border-white/20"
         >
           Switch to {appMode === AppMode.CONSUMER ? 'Merchant' : 'Consumer'}
         </button>
      </div>

      {/* Main Content Area */}
      <main className="w-full h-full pb-16">
        {appMode === AppMode.CONSUMER ? renderConsumerView() : renderMerchantView()}
      </main>

      {/* Modals */}
      {activeGrab && (
        <GrabModal grab={activeGrab} onClose={() => setActiveGrab(null)} />
      )}

      {/* Bottom Navigation (Only for Consumer view usually, but adapted for merchant demo) */}
      {appMode === AppMode.CONSUMER && (
        <div className="absolute bottom-0 w-full h-16 bg-black/90 backdrop-blur border-t border-white/10 flex items-center justify-around z-40">
           <button 
             onClick={() => setViewState(ViewState.FEED)}
             className={`flex flex-col items-center gap-1 ${viewState === ViewState.FEED ? 'text-[#FF6B00]' : 'text-gray-500'}`}
           >
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
             </svg>
             <span className="text-[10px] font-bold">DEALS</span>
           </button>

           <button 
             onClick={() => setViewState(ViewState.MAP)}
             className={`flex flex-col items-center gap-1 ${viewState === ViewState.MAP ? 'text-[#FF6B00]' : 'text-gray-500'}`}
           >
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
             </svg>
             <span className="text-[10px] font-bold">RADAR</span>
           </button>

           <button 
             className="flex flex-col items-center gap-1 text-gray-500"
             onClick={() => alert("Profile Vault coming soon!")}
           >
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
             </svg>
             <span className="text-[10px] font-bold">VAULT</span>
           </button>
        </div>
      )}
    </div>
  );
}

export default App;