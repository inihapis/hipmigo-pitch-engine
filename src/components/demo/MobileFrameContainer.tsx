'use client';

import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';
import { BottomNav } from '@/components/shared/BottomNav';

interface MobileFrameContainerProps {
  children: React.ReactNode;
}

export const MobileFrameContainer: React.FC<MobileFrameContainerProps> = ({ children }) => {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center p-2 sm:p-4 my-2">
      {/* Outer Mobile Mockup Frame */}
      <div className="w-full max-w-[412px] h-[846px] bg-white rounded-[44px] shadow-2xl border-[9px] border-slate-900 overflow-hidden relative flex flex-col transform transition-all duration-300">
        
        {/* Dynamic Island / Camera Notch & Mobile Status Bar */}
        <div className="bg-slate-950 text-white px-6 pt-3 pb-2 flex items-center justify-between z-40 select-none">
          {/* Time */}
          <span className="text-xs font-semibold tracking-wider font-mono">09:41</span>
          
          {/* Camera Notch Pillar */}
          <div className="w-24 h-4 bg-slate-900 rounded-full flex items-center justify-center gap-2 border border-slate-800/80 shadow-inner">
            <span className="w-2.5 h-2.5 bg-slate-950 rounded-full border border-slate-800"></span>
            <span className="w-1.5 h-1.5 bg-blue-950 rounded-full"></span>
          </div>

          {/* Status Icons */}
          <div className="flex items-center gap-1.5 text-slate-300">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4 text-emerald-400 fill-emerald-400" />
          </div>
        </div>

        {/* Inner Scrollable Screen Content */}
        <main className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50 relative pb-20">
          {children}
        </main>

        {/* Mobile Navigation Bar at bottom */}
        <BottomNav />
      </div>
    </div>
  );
};
