'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDemoStore } from '@/store/useDemoStore';
import { 
  Home, 
  ShieldCheck, 
  BarChart3, 
  Award, 
  ShoppingBag, 
  RotateCcw,
  Sparkles,
  Smartphone,
  Monitor
} from 'lucide-react';

export const PresenterDemoBar: React.FC = () => {
  const pathname = usePathname();
  const { isPremium, resetDemo } = useDemoStore();

  const demoRoutes = [
    {
      name: 'Root / Home',
      path: '/home',
      icon: Home,
      pillar: 'SuperApp Home',
      badge: 'Mobile'
    },
    {
      name: '1. Advantage',
      path: '/advantage',
      icon: ShieldCheck,
      pillar: 'Pilar 1: Membership & Directory',
      badge: 'Mobile'
    },
    {
      name: '2. BI Dashboard',
      path: '/bi-dashboard',
      icon: BarChart3,
      pillar: 'Pilar 2: B2B Business Intelligence',
      badge: 'Desktop'
    },
    {
      name: '3. Certification',
      path: '/certification',
      icon: Award,
      pillar: 'Pilar 3: LMS & Blockchain Credential',
      badge: 'Mobile'
    },
    {
      name: '4. Commerce',
      path: '/commerce',
      icon: ShoppingBag,
      pillar: 'Pilar 4: Merch & Partner Synergy',
      badge: 'Mobile'
    }
  ];

  return (
    <div className="w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-white px-4 py-2.5 flex flex-wrap items-center justify-between z-50 sticky top-0 shadow-lg">
      {/* Brand & Pitch Indicator */}
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          HIPMIGO ENGINE
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
          <span className="text-slate-500">|</span>
          <span>Pitching Mode Active</span>
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
      </div>

      {/* Quick Jump Buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-1">
        {demoRoutes.map((route) => {
          const isActive = pathname === route.path || (route.path === '/home' && pathname === '/');
          const Icon = route.icon;
          const isDesktop = route.badge === 'Desktop';

          return (
            <Link
              key={route.path}
              href={route.path}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-md scale-105 font-bold'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{route.name}</span>
              {isDesktop ? (
                <Monitor className={`w-3 h-3 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
              ) : (
                <Smartphone className="w-3 h-3 opacity-60" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Presenter Controls */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 text-xs">
          <span className="text-slate-400">Status:</span>
          {isPremium ? (
            <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 px-2 py-0.5 rounded text-[11px] font-bold">
              ★ PREMIUM VERIFIED
            </span>
          ) : (
            <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded text-[11px]">
              BASIC MEMBER
            </span>
          )}
        </div>

        <button
          onClick={resetDemo}
          title="Reset Simulation State"
          className="flex items-center gap-1.5 text-xs bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-800/50 px-2.5 py-1.5 rounded-lg transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset State</span>
        </button>
      </div>
    </div>
  );
};
