'use client';

import React from 'react';
import Link from 'next/link';
import { KTACard } from '@/components/shared/KTACard';
import { useDemoStore } from '@/store/useDemoStore';
import { 
  ShieldCheck, 
  BarChart3, 
  Award, 
  ShoppingBag, 
  Coins, 
  Bell, 
  Briefcase, 
  ChevronRight, 
  TrendingUp, 
  Sparkles,
  Users
} from 'lucide-react';

export default function HomePage() {
  const { userProfile, points, isPremium } = useDemoStore();

  const pillarCards = [
    {
      title: 'Business Advantage',
      desc: 'Directory & Tender',
      path: '/advantage',
      icon: ShieldCheck,
      color: 'from-amber-500 to-amber-600',
      badge: 'Pilar 1'
    },
    {
      title: 'BI Analytics',
      path: '/bi-dashboard',
      desc: 'B2B Market Insights',
      icon: BarChart3,
      color: 'from-blue-600 to-indigo-700',
      badge: 'Pilar 2'
    },
    {
      title: 'Certification',
      path: '/certification',
      desc: 'LMS & Modul PK 1-3',
      icon: Award,
      color: 'from-emerald-500 to-teal-700',
      badge: 'Pilar 3'
    },
    {
      title: 'Commerce Store',
      path: '/commerce',
      desc: 'Merch & Partner Perk',
      icon: ShoppingBag,
      color: 'from-purple-600 to-pink-600',
      badge: 'Pilar 4'
    }
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Top Header Row */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <span className="text-[11px] text-slate-500 font-medium">Selamat datang,</span>
          <h2 className="text-lg font-bold text-slate-900 leading-none mt-0.5 flex items-center gap-1.5">
            {userProfile.name}
            {isPremium && <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Points Chip */}
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-full text-amber-800 font-bold text-xs shadow-xs">
            <Coins className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{points.toLocaleString('id-ID')}</span>
          </div>

          <button className="p-2 bg-white rounded-full border border-slate-200 text-slate-600 shadow-xs relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>

      {/* KTA Digital Card */}
      <KTACard />

      {/* Upgrade Banner (if Basic Member) */}
      {!isPremium && (
        <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 p-3.5 rounded-2xl shadow-md border border-amber-300 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-slate-950/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs">Upgrade Business Advantage</h4>
              <p className="text-[10px] text-slate-800 font-medium">Buka akses tender, directory verified & priority matching</p>
            </div>
          </div>
          <Link
            href="/advantage"
            className="px-3 py-1.5 bg-slate-950 text-white font-bold text-[11px] rounded-xl hover:bg-slate-800 transition-colors shadow-xs flex-shrink-0"
          >
            Upgrade
          </Link>
        </div>
      )}

      {/* 4 Monetization Pillars Grid */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">4 Pilar Ekosistem HIPMI</h3>
          <span className="text-[10px] text-slate-400 font-medium">Live MVP Engine</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {pillarCards.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Link
                key={pillar.path}
                href={pillar.path}
                className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="flex items-start justify-between">
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${pillar.color} text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                    {pillar.badge}
                  </span>
                </div>

                <div className="mt-3">
                  <h4 className="font-bold text-xs text-slate-900 group-hover:text-amber-600 transition-colors flex items-center justify-between">
                    {pillar.title}
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-amber-600 transition-colors" />
                  </h4>
                  <p className="text-[10px] text-slate-500 font-normal mt-0.5 truncate">{pillar.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Priority Opportunity Board Preview */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-bold text-slate-900">Priority Opportunity Board</h3>
          </div>
          <Link href="/advantage" className="text-[11px] text-amber-600 font-bold hover:underline flex items-center gap-0.5">
            Lihat Semua <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="space-y-2">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-extrabold px-1.5 py-0.2 rounded">TENDER INTERNAL</span>
                <span className="text-[10px] text-slate-400 font-mono">Nilai: Rp 450 Juta</span>
              </div>
              <h4 className="font-bold text-xs text-slate-900 mt-1">Pengadaan Apparel & Uniform Event Nasional HIPMI</h4>
            </div>
            <Link
              href="/advantage"
              className="text-[10px] bg-slate-900 text-white font-bold px-2.5 py-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Lamar
            </Link>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="bg-blue-100 text-blue-800 text-[9px] font-extrabold px-1.5 py-0.2 rounded">B2B MATCHING</span>
                <span className="text-[10px] text-slate-400 font-mono">Supply Chain</span>
              </div>
              <h4 className="font-bold text-xs text-slate-900 mt-1">Kebutuhan Vendor Bahan Baku Kopi Olahan 5 Ton/Bulan</h4>
            </div>
            <Link
              href="/advantage"
              className="text-[10px] bg-slate-900 text-white font-bold px-2.5 py-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Kontak
            </Link>
          </div>
        </div>
      </div>

      {/* Ecosystem Statistics Counter */}
      <div className="bg-gradient-to-br from-slate-900 to-[#0B2545] p-3.5 rounded-2xl text-white shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Live Ecosystem Impact
          </span>
          <span className="text-[9px] text-slate-400">Diperbarui Realtime</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center pt-1">
          <div className="border-r border-slate-800 pr-1">
            <span className="font-extrabold text-base text-amber-400 block font-mono">60,302</span>
            <span className="text-[9px] text-slate-300">Member HIPMI</span>
          </div>
          <div className="border-r border-slate-800 px-1">
            <span className="font-extrabold text-base text-blue-400 block font-mono">38</span>
            <span className="text-[9px] text-slate-300">BPD Provinsi</span>
          </div>
          <div className="pl-1">
            <span className="font-extrabold text-base text-emerald-400 block font-mono">Rp 4.2 T</span>
            <span className="text-[9px] text-slate-300">Est. Transaksi</span>
          </div>
        </div>
      </div>
    </div>
  );
}
