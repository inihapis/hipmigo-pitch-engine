'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useDemoStore } from '@/store/useDemoStore';
import membersData from '@/mock/businessDirectory.json';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Briefcase, 
  CheckCircle2, 
  Sparkles, 
  Lock, 
  CreditCard, 
  Building2, 
  ChevronRight,
  Zap,
  Star,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AdvantagePage() {
  const { isPremium, upgradeToPremium, userProfile } = useDemoStore();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [filterSector, setFilterSector] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      upgradeToPremium();
      setIsProcessing(false);
      setShowUpgradeModal(false);
      setShowSuccessModal(true);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 600); // Fast 0ms-like simulation response
  };

  const filteredMembers = membersData.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          member.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = filterSector === 'ALL' || member.sector.includes(filterSector);
    return matchesSearch && matchesSector;
  });

  return (
    <div className="p-4 space-y-4">
      {/* Top Section Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <span className="text-[10px] font-extrabold text-amber-600 uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            Pilar 1: Freemium & Premium
          </span>
          <h2 className="text-base font-bold text-slate-900 mt-1">Business Advantage</h2>
        </div>

        {isPremium ? (
          <span className="flex items-center gap-1 text-[11px] font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 px-3 py-1 rounded-full shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            VERIFIED
          </span>
        ) : (
          <button
            onClick={() => setShowUpgradeModal(true)}
            className="flex items-center gap-1 text-[11px] font-bold text-white bg-slate-900 hover:bg-slate-800 px-3 py-1.5 rounded-xl shadow-xs transition-colors"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            Upgrade Rp 299k
          </button>
        )}
      </div>

      {/* Upgrade Callout Card (if not yet premium) */}
      {!isPremium ? (
        <div className="bg-gradient-to-br from-[#0B2545] to-[#133663] text-white p-4 rounded-2xl shadow-md border border-amber-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-xl pointer-events-none"></div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center flex-shrink-0 text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Status Membership: Basic Member</h3>
              <p className="text-xs text-slate-300 mt-1 leading-snug">
                Tingkatkan ke <span className="text-amber-400 font-semibold">Premium Business Advantage</span> untuk verifikasi PT/CV, lencana Verified, & akses eksklusif Opportunity Board.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between">
            <div className="text-xs">
              <span className="text-slate-400">Investasi:</span>
              <span className="font-bold text-amber-300 ml-1">Rp 299.000 / tahun</span>
            </div>
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-md hover:brightness-110 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Upgrade Sekarang
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-emerald-900/90 to-teal-900/90 text-white p-3.5 rounded-2xl shadow-xs border border-emerald-500/30 flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-xs text-white">Verified Business Member Active</h4>
            <p className="text-[11px] text-emerald-200 mt-0.5">Identitas PT/CV Anda terverifikasi di seluruh ekosistem HIPMI.</p>
          </div>
        </div>
      )}

      {/* Opportunity Board Section */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-amber-100 rounded-lg text-amber-700">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-xs text-slate-900">Priority Opportunity Board</h3>
              <p className="text-[10px] text-slate-500">Tender & proyek internal antar-anggota</p>
            </div>
          </div>

          {!isPremium && (
            <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded flex items-center gap-1">
              <Lock className="w-3 h-3" /> Locked
            </span>
          )}
        </div>

        <div className="space-y-2.5">
          {/* Opportunity Item 1 */}
          <div className={`p-3 rounded-xl border transition-all ${isPremium ? 'bg-slate-50 border-slate-200' : 'bg-slate-50/60 border-slate-200 opacity-80'}`}>
            <div className="flex items-start justify-between">
              <span className="bg-blue-100 text-blue-800 font-extrabold text-[9px] px-2 py-0.5 rounded">TENDER KONSTRUKSI</span>
              <span className="text-xs font-mono font-bold text-emerald-600">Rp 1.2 Miliar</span>
            </div>
            <h4 className="font-bold text-xs text-slate-900 mt-1.5">Renovasi & Fit-Out Kantor Cabang BUMN Jakarta Selatan</h4>
            <p className="text-[10px] text-slate-500 mt-1">Dibutuhkan Kontraktor Utama Terverifikasi PT / CV Grade 4+</p>
            
            <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-medium">Batas: 25 Sep 2026</span>
              {isPremium ? (
                <button className="text-[10px] bg-slate-900 hover:bg-slate-800 text-white font-bold px-3 py-1 rounded-lg transition-colors">
                  Submit Proposal
                </button>
              ) : (
                <button 
                  onClick={() => setShowUpgradeModal(true)} 
                  className="text-[10px] bg-amber-500 text-slate-950 font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-xs"
                >
                  <Lock className="w-3 h-3" /> Buka Akses
                </button>
              )}
            </div>
          </div>

          {/* Opportunity Item 2 */}
          <div className={`p-3 rounded-xl border transition-all ${isPremium ? 'bg-slate-50 border-slate-200' : 'bg-slate-50/60 border-slate-200 opacity-80'}`}>
            <div className="flex items-start justify-between">
              <span className="bg-amber-100 text-amber-800 font-extrabold text-[9px] px-2 py-0.5 rounded">B2B SUPPLY</span>
              <span className="text-xs font-mono font-bold text-emerald-600">Rp 350 Juta / Thn</span>
            </div>
            <h4 className="font-bold text-xs text-slate-900 mt-1.5">Pasokan Packaging Ramah Lingkungan untuk 12 Brand F&B</h4>
            <p className="text-[10px] text-slate-500 mt-1">Dibutuhkan produsen kemasan bio-degradable kapasitas 100k pcs/bln</p>
            
            <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-medium">Batas: 30 Sep 2026</span>
              {isPremium ? (
                <button className="text-[10px] bg-slate-900 hover:bg-slate-800 text-white font-bold px-3 py-1 rounded-lg transition-colors">
                  Kontak Owner
                </button>
              ) : (
                <button 
                  onClick={() => setShowUpgradeModal(true)} 
                  className="text-[10px] bg-amber-500 text-slate-950 font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-xs"
                >
                  <Lock className="w-3 h-3" /> Buka Akses
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Verified Business Directory */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Verified Business Directory</h3>
          <span className="text-[10px] text-slate-500 font-medium">{filteredMembers.length} Pengusaha Terdaftar</span>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama anggota / nama PT..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
            />
          </div>

          <select
            value={filterSector}
            onChange={(e) => setFilterSector(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-2 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-amber-500 font-medium"
          >
            <option value="ALL">Semua Sektor</option>
            <option value="F&B">F&B / Kuliner</option>
            <option value="Konstruksi">Konstruksi</option>
            <option value="Teknologi">Teknologi</option>
            <option value="Jasa">Jasa & Legal</option>
          </select>
        </div>

        {/* Member Cards List */}
        <div className="space-y-2.5">
          {filteredMembers.map((member) => (
            <div key={member.id} className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs hover:border-amber-300 transition-all flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative flex-shrink-0">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={44}
                    height={44}
                    className="w-11 h-11 rounded-xl object-cover border border-slate-200"
                    unoptimized
                  />
                  {member.isVerified && (
                    <span className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 p-0.5 rounded-full" title="Verified Member">
                      <CheckCircle2 className="w-3 h-3 text-slate-950 fill-amber-400" />
                    </span>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-xs text-slate-900 truncate">{member.name}</h4>
                    {member.isVerified && (
                      <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-1.5 py-0.2 rounded flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" /> {member.rating}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-semibold text-slate-700 truncate">{member.company}</p>
                  <p className="text-[10px] text-slate-400 truncate">{member.sector} • {member.bpc}</p>
                </div>
              </div>

              <button className="p-2 text-slate-400 hover:text-slate-700 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors flex-shrink-0">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Upgrade Simulation Modal (0ms latency trigger) */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-xs w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">Upgrade Business Advantage</h3>
                  <p className="text-[10px] text-slate-500">Simulasi Instan Presentasi</p>
                </div>
              </div>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xs p-1"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 mb-4 space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-900 border-b border-slate-200 pb-2">
                <span>Paket Membership</span>
                <span className="text-amber-600">Rp 299.000 / thn</span>
              </div>
              
              <ul className="space-y-1.5 text-[11px] text-slate-600 pt-1">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  <span>Verified Badge KTA & Directory Priority</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  <span>Akses Penuh Opportunity Board & Tender</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  <span>Bonus 1.000 HIPMI Points Ecosystem</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleSimulatePayment}
                disabled={isProcessing}
                className="w-full py-3 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                    <span>Memproses Pembayaran...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 text-slate-950" />
                    <span>Bayar Sekarang (Simulasi Rp 299k)</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setShowUpgradeModal(false)}
                className="w-full py-2 text-slate-500 hover:text-slate-800 text-xs font-semibold"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-xs w-full text-center shadow-2xl border border-slate-200">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900">Upgrade Berhasil!</h3>
            <p className="text-xs text-slate-600 mt-1">
              Selamat! Akun Anda kini berstatus <span className="font-bold text-amber-600">VERIFIED BUSINESS</span> dan telah menerima bonus 1.000 Points.
            </p>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="mt-5 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors shadow-md"
            >
              Lihat KTA & Directory Unlocked
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
