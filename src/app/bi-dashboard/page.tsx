'use client';

import React, { useState } from 'react';
import biData from '@/mock/biAnalytics.json';
import { 
  BarChart3, 
  Download, 
  MapPin, 
  TrendingUp, 
  ShieldCheck, 
  DollarSign, 
  PieChart as PieIcon, 
  Building, 
  Sparkles,
  Layers,
  FileText,
  CheckCircle,
  Activity
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar 
} from 'recharts';

export default function BIDashboardPage() {
  const [downloading, setDownloading] = useState(false);
  const [downloadDone, setDownloadDone] = useState(false);
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'MAP' | 'SECTORS' | 'CREDIT'>('OVERVIEW');

  const SECTOR_COLORS = ['#E5A93C', '#1E6091', '#10B981', '#6366F1', '#EC4899', '#8B5CF6', '#F59E0B'];

  const handleDownloadPDF = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadDone(true);
      setTimeout(() => setDownloadDone(false), 3000);
    }, 1200);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 space-y-6">
      {/* Top B2B Corporate Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              PILAR 2: BUSINESS INTELLIGENCE
            </span>
            <span className="text-xs text-slate-400 font-mono">B2B Enterprise View</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white mt-1 tracking-tight">
            HIPMI Macro Ecosystem Analytics Dashboard
          </h1>
          <p className="text-slate-400 text-xs md:text-sm mt-0.5">
            Sistem Intelijen Ekonomi Real-Time 60.000+ Pengusaha Muda Indonesia
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2"
          >
            {downloading ? (
              <>
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                <span>Generating Executive PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Executive Ecosystem Report (PDF)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Download Alert Banner */}
      {downloadDone && (
        <div className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 p-3 rounded-xl flex items-center justify-between text-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Dokumen <strong>HIPMIGO_Executive_Report_2026.pdf</strong> telah disimulasikan terunduh!</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono">PDF Standard 24 Pages</span>
        </div>
      )}

      {/* Top 4 Macro KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 shadow-md">
          <div className="flex justify-between items-start text-slate-400 text-xs">
            <span>Total Anggota Terdaftar</span>
            <Building className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white font-mono">{biData.totalMembers.toLocaleString('id-ID')}</span>
            <span className="text-xs text-emerald-400 font-bold">+18.4% YoY</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Tersebar di 38 BPD & 514 BPC</p>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 shadow-md">
          <div className="flex justify-between items-start text-slate-400 text-xs">
            <span>Anggota Digital Aktif</span>
            <Activity className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white font-mono">{biData.activeDigitalMembers.toLocaleString('id-ID')}</span>
            <span className="text-xs text-blue-400 font-bold">56.1% Retention</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Menggunakan SuperApp HIPMI GO</p>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 shadow-md">
          <div className="flex justify-between items-start text-slate-400 text-xs">
            <span>Badan Usaha Terverifikasi</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white font-mono">{biData.verifiedBusinesses.toLocaleString('id-ID')}</span>
            <span className="text-xs text-amber-400 font-bold">PT / CV Valid</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Legalitas Kemenkumham Verified</p>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 shadow-md">
          <div className="flex justify-between items-start text-slate-400 text-xs">
            <span>Est. Omset / Transaksi</span>
            <DollarSign className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white font-mono">{biData.totalTransactionVolume}</span>
            <span className="text-xs text-emerald-400 font-bold">Nasional</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Agregat Ekonomi Anggota 2026</p>
        </div>
      </div>

      {/* Main Charts & Heatmap Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Growth Trend Chart (2/3 width) */}
        <div className="lg:col-span-2 bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                Tren Pertumbuhan Anggota & Transaksi Ekosistem (2023-2026)
              </h3>
              <p className="text-xs text-slate-400">Proyeksi dan histori keanggotaan digital terverifikasi</p>
            </div>
            <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full font-mono">
              B2B Predictive Engine
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={biData.growthTrends} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E5A93C" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#E5A93C" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorVerified" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E6091" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#1E6091" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0A192F', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                  labelStyle={{ color: '#E5A93C', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="members" name="Total Member" stroke="#E5A93C" strokeWidth={3} fillOpacity={1} fill="url(#colorMembers)" />
                <Area type="monotone" dataKey="verified" name="Verified PT/CV" stroke="#1E6091" strokeWidth={2} fillOpacity={1} fill="url(#colorVerified)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column: Top Sectors Distribution (1/3 width) */}
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-emerald-400" />
              Sebaran Sektor Usaha Utama
            </h3>
            <p className="text-xs text-slate-400">Komposisi industri anggota HIPMI</p>
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={biData.topSectors}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="percentage"
                >
                  {biData.topSectors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={SECTOR_COLORS[index % SECTOR_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0A192F', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-1">
            {biData.topSectors.slice(0, 4).map((sector, idx) => (
              <div key={sector.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: SECTOR_COLORS[idx] }}></span>
                  <span className="text-slate-300 font-medium">{sector.name}</span>
                </div>
                <span className="font-bold text-white font-mono">{sector.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Indonesia Heatmap Regional Concentration & Banking Credit Risk */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Indonesia Regional Heatmap Breakdown */}
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-400" />
                Peta Sebaran Konsentrasi Wilayah (38 BPD)
              </h3>
              <p className="text-xs text-slate-400">Peta sebaran pengusaha per BPD Provinsi</p>
            </div>
            <span className="text-xs bg-red-500/20 text-red-400 px-2.5 py-0.5 rounded-full font-bold border border-red-500/30">
              National Coverage
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {biData.provinces.map((prov) => (
              <div key={prov.code} className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-white">{prov.name}</span>
                    {prov.intensity === 'high' && (
                      <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{prov.bpcCount} BPC Cabang</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-xs text-amber-400 block">{prov.members.toLocaleString('id-ID')}</span>
                  <span className="text-[9px] text-slate-500">Anggota</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Banking API & Enterprise Credit Scoring Integration */}
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  Enterprise Credit Scoring & B2B API Access
                </h3>
                <p className="text-xs text-slate-400">Solusi riset & scoring risiko kredit untuk Perbankan & BUMN</p>
              </div>
              <span className="text-xs bg-blue-500/20 text-blue-400 px-2.5 py-0.5 rounded-full font-bold border border-blue-500/30">
                B2B Subscription
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Proporsi High-Trust Member (Low Risk)</span>
                  <span className="text-xl font-mono font-bold text-emerald-400 mt-0.5 block">{biData.creditScoreRiskDistribution.lowRisk}</span>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-lg border border-emerald-500/30">
                  Bankable
                </span>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                <h4 className="font-bold text-xs text-white mb-1">Commercial Pricing Model B2B:</h4>
                <ul className="space-y-1 text-xs text-slate-400">
                  <li className="flex items-center justify-between">
                    <span>- Annual Corporate License:</span>
                    <span className="font-mono font-bold text-amber-400">Rp 150M – 300M / thn</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>- Custom Ecosystem Research PDF:</span>
                    <span className="font-mono font-bold text-amber-400">Rp 25M – 50M / report</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>- Real-time API Credit Verification:</span>
                    <span className="font-mono font-bold text-amber-400">Rp 5.000 / call</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800">
            <button
              onClick={handleDownloadPDF}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 border border-slate-700"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Minta Demo API & Sample Enterprise Report PDF</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
