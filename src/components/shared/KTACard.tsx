'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useDemoStore } from '@/store/useDemoStore';
import { ShieldCheck, QrCode, Wifi, CheckCircle2, Copy, Sparkles } from 'lucide-react';

export const KTACard: React.FC = () => {
  const { userProfile, isPremium } = useDemoStore();
  const [showQRModal, setShowQRModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyKTA = () => {
    navigator.clipboard.writeText(userProfile.ktaNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="w-full relative rounded-2xl overflow-hidden shadow-xl border border-amber-500/30 bg-gradient-to-br from-[#0B2545] via-[#0A192F] to-[#133663] text-white p-5 transition-all transform hover:scale-[1.01]">
        {/* Card Background Branding Accent Watermark */}
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl pointer-events-none"></div>

        {/* Top Header Row */}
        <div className="flex items-center justify-between border-b border-slate-700/60 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-[#0B2545] rounded-[10px] flex items-center justify-center">
                <span className="font-extrabold text-amber-400 text-xs tracking-tighter">HMG</span>
              </div>
            </div>
            <div>
              <h3 className="font-black text-sm tracking-tight text-white flex items-center gap-1.5">
                HIPMI GO <span className="text-[10px] text-amber-400 font-semibold px-1.5 py-0.2 bg-amber-400/10 rounded border border-amber-400/30">KTA DIGITAL</span>
              </h3>
              <p className="text-[10px] text-slate-300 font-medium">Himpunan Pengusaha Muda Indonesia</p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <Wifi className="w-4 h-4 rotate-90 text-amber-400/80" />
            <span className="text-[9px] font-mono text-amber-300/80">NFC PASS</span>
          </div>
        </div>

        {/* Middle Profile Info Section */}
        <div className="flex items-start gap-4 mb-4">
          {/* Avatar with status ring */}
          <div className="relative flex-shrink-0">
            <div className={`w-16 h-16 rounded-xl overflow-hidden border-2 shadow-lg ${isPremium ? 'border-amber-400 ring-2 ring-amber-400/40' : 'border-slate-600'}`}>
              <Image
                src={userProfile.avatar}
                alt={userProfile.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            {isPremium && (
              <span className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 p-0.5 rounded-full shadow-md" title="Verified Member">
                <CheckCircle2 className="w-4 h-4 fill-amber-400 text-slate-950" />
              </span>
            )}
          </div>

          {/* User Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h4 className="font-bold text-base text-white truncate tracking-tight">{userProfile.name}</h4>
            </div>

            <p className="text-xs text-amber-300 font-medium truncate mt-0.5">{userProfile.role}</p>
            <p className="text-xs text-slate-300 font-normal truncate">{userProfile.company}</p>

            <div className="mt-2 flex items-center gap-2">
              {isPremium ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/50 shadow-sm gold-shimmer text-slate-950">
                  <Sparkles className="w-3 h-3 text-slate-950" />
                  VERIFIED BUSINESS
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  <ShieldCheck className="w-3 h-3 text-slate-400" />
                  BASIC MEMBER
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bottom KTA Number & Verification QR Action */}
        <div className="pt-3 border-t border-slate-700/60 flex items-end justify-between">
          <div>
            <span className="text-[9px] uppercase tracking-widest text-slate-400 block font-semibold">Nomor Anggota EKTA</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="font-mono text-xs text-amber-200 tracking-wider font-semibold">
                {userProfile.ktaNumber}
              </span>
              <button 
                onClick={copyKTA} 
                className="text-slate-400 hover:text-amber-300 transition-colors p-1"
                title="Salin KTA"
              >
                <Copy className="w-3 h-3" />
              </button>
              {copied && <span className="text-[9px] text-emerald-400 font-medium">Tersalin!</span>}
            </div>
            <p className="text-[10px] text-slate-400 mt-1">{userProfile.bpc}</p>
          </div>

          <button
            onClick={() => setShowQRModal(true)}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-amber-400/30 shadow-md flex items-center justify-center text-amber-400"
            title="Tampilkan QR Pass"
          >
            <QrCode className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* QR Code Pass Modal */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-xs w-full text-center shadow-2xl border border-slate-200">
            <h4 className="font-bold text-slate-900 text-base">Digital Pass QR Code</h4>
            <p className="text-xs text-slate-500 mt-1">Scan untuk verifikasi keanggotaan HIPMI di merchant/event</p>
            
            <div className="my-4 p-4 bg-slate-50 rounded-2xl inline-block border border-slate-200 shadow-inner">
              <Image
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=EKTA-${userProfile.ktaNumber}`}
                alt="EKTA QR Code"
                width={180}
                height={180}
                className="mx-auto"
                unoptimized
              />
            </div>

            <p className="font-mono text-xs font-semibold text-slate-700">{userProfile.ktaNumber}</p>
            
            <button
              onClick={() => setShowQRModal(false)}
              className="mt-5 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
};
