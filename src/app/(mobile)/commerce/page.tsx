'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useDemoStore } from '@/store/useDemoStore';
import commerceData from '@/mock/commerceProducts.json';
import { 
  ShoppingBag, 
  Tag, 
  ShoppingCart, 
  CheckCircle2, 
  QrCode, 
  Sparkles, 
  Plus, 
  Trash2, 
  CreditCard,
  Building,
  Coffee,
  PhoneCall,
  Percent,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CommercePage() {
  const { cart, addToCart, removeFromCart, clearCart, claimedVouchers, claimVoucher } = useDemoStore();
  const [activeTab, setActiveTab] = useState<'STORE' | 'PARTNERS'>('STORE');
  const [showCartModal, setShowCartModal] = useState(false);
  const [showVoucherQR, setShowVoucherQR] = useState<any | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleSimulateCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setShowCartModal(false);
      setCheckoutSuccess(true);
      clearCart();

      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 600);
  };

  const handleClaimVoucher = (voucher: any) => {
    claimVoucher(voucher.id);
    setShowVoucherQR(voucher);

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="p-4 space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <span className="text-[10px] font-extrabold text-purple-700 uppercase tracking-widest bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
            Pilar 4: Merch & Synergy
          </span>
          <h2 className="text-base font-bold text-slate-900 mt-1">Commerce & Synergy</h2>
        </div>

        {/* Cart Trigger */}
        <button
          onClick={() => setShowCartModal(true)}
          className="relative p-2 bg-slate-900 text-white rounded-xl shadow-xs hover:bg-slate-800 transition-colors"
        >
          <ShoppingCart className="w-4 h-4" />
          {cart.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-slate-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-white">
              {cart.reduce((a, c) => a + c.quantity, 0)}
            </span>
          )}
        </button>
      </div>

      {/* Tab Switcher: Official Store vs B2B Partner Hub */}
      <div className="grid grid-cols-2 p-1 bg-slate-200/80 rounded-xl text-xs font-bold">
        <button
          onClick={() => setActiveTab('STORE')}
          className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'STORE' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5 text-purple-600" />
          Official Store
        </button>

        <button
          onClick={() => setActiveTab('PARTNERS')}
          className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'PARTNERS' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Tag className="w-3.5 h-3.5 text-amber-600" />
          Partner Benefits
        </button>
      </div>

      {/* TAB 1: OFFICIAL MERCH STORE */}
      {activeTab === 'STORE' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Katalog Official Attributes</h3>
            <span className="text-[10px] text-slate-500 font-medium">Bisa tukar HIPMI Points</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {commerceData.merchandise.map((product) => (
              <div key={product.id} className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-purple-300 transition-all flex items-center gap-3">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 relative border border-slate-200">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                  <span className="absolute bottom-1 left-1 bg-amber-500 text-slate-950 text-[8px] font-extrabold px-1 rounded">
                    +{product.pointsReward} Pts
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-bold text-purple-700 uppercase bg-purple-50 px-1.5 py-0.2 rounded">
                    {product.category}
                  </span>
                  <h4 className="font-bold text-xs text-slate-900 mt-1 truncate">{product.name}</h4>
                  <p className="text-[10px] text-slate-500 line-clamp-1">{product.description}</p>
                  
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-mono font-extrabold text-xs text-slate-900">
                      Rp {product.price.toLocaleString('id-ID')}
                    </span>

                    <button
                      onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })}
                      className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white font-bold text-[10px] rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                    >
                      <Plus className="w-3 h-3" /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: B2B PARTNER BENEFIT HUB */}
      {activeTab === 'PARTNERS' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Mitra Strategis & Voucher Diskon</h3>
            <span className="text-[10px] text-slate-500 font-medium">Khusus Anggota HIPMI</span>
          </div>

          <div className="space-y-2.5">
            {commerceData.partnerVouchers.map((voucher) => {
              const isClaimed = claimedVouchers.includes(voucher.id);

              return (
                <div key={voucher.id} className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-amber-300 transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-lg flex items-center justify-center flex-shrink-0">
                        {voucher.logo}
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded">
                          {voucher.category}
                        </span>
                        <h4 className="font-bold text-xs text-slate-900 mt-0.5">{voucher.partnerName}</h4>
                      </div>
                    </div>

                    <span className="font-mono font-extrabold text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {voucher.discount}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-800 mt-2">{voucher.title}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{voucher.terms}</p>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[9px] text-slate-400">Berlaku s.d: {voucher.validUntil}</span>

                    {isClaimed ? (
                      <button
                        onClick={() => setShowVoucherQR(voucher)}
                        className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[10px] rounded-lg transition-colors flex items-center gap-1"
                      >
                        <QrCode className="w-3 h-3 text-amber-400" /> Tunjukkan QR Voucher
                      </button>
                    ) : (
                      <button
                        onClick={() => handleClaimVoucher(voucher)}
                        className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[10px] rounded-lg transition-colors shadow-xs"
                      >
                        Ambil Voucher (Gratis)
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Cart & Checkout Modal */}
      {showCartModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-xs w-full shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2 mb-3">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-purple-600" /> Keranjang Belanja Official
              </h3>
              <button onClick={() => setShowCartModal(false)} className="text-slate-400 font-bold text-xs p-1">
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="py-8 text-center text-slate-400">
                <ShoppingBag className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                <p className="text-xs font-semibold">Keranjang masih kosong</p>
                <button
                  onClick={() => setShowCartModal(false)}
                  className="mt-3 text-[11px] font-bold text-purple-600"
                >
                  Pilih Merchandise
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="max-h-48 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                  {cart.map((item) => (
                    <div key={item.id} className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                      <div className="min-w-0 pr-2">
                        <p className="font-bold text-slate-900 truncate">{item.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono">
                          {item.quantity} x Rp {item.price.toLocaleString('id-ID')}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-xs">
                  <span>Total Pembayaran</span>
                  <span className="font-mono text-purple-700">Rp {cartTotal.toLocaleString('id-ID')}</span>
                </div>

                <button
                  onClick={handleSimulateCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {isCheckingOut ? (
                    <span>Memproses Checkout...</span>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      <span>Simulasi Checkout Instan</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Voucher Cashier QR Modal */}
      {showVoucherQR && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-xs w-full text-center shadow-2xl border border-slate-200">
            <div className="w-10 h-10 bg-amber-100 text-amber-800 text-xl rounded-full flex items-center justify-center mx-auto mb-2">
              {showVoucherQR.logo}
            </div>

            <h3 className="font-extrabold text-sm text-slate-900">{showVoucherQR.partnerName}</h3>
            <p className="text-xs text-emerald-600 font-bold mt-0.5">{showVoucherQR.title}</p>
            <p className="text-[10px] text-slate-500 mt-1">Tunjukkan QR code ini ke kasir / merchant mitra</p>

            <div className="my-3 p-3 bg-slate-50 rounded-2xl inline-block border border-slate-200">
              <Image
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${showVoucherQR.code}`}
                alt="Voucher QR Code"
                width={150}
                height={150}
                className="mx-auto"
                unoptimized
              />
            </div>

            <p className="font-mono text-xs font-bold bg-slate-100 py-1 px-3 rounded-lg text-slate-800 inline-block">
              {showVoucherQR.code}
            </p>

            <button
              onClick={() => setShowVoucherQR(null)}
              className="mt-4 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
            >
              Tutup QR Voucher
            </button>
          </div>
        </div>
      )}

      {/* Checkout Success Modal */}
      {checkoutSuccess && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-xs w-full text-center shadow-2xl border border-slate-200">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900">Pembelian Berhasil!</h3>
            <p className="text-xs text-slate-600 mt-1">
              Pesanan Merchandise HIPMI Anda telah diproses dan akan segera dikirimkan ke alamat PT Anda.
            </p>

            <button
              onClick={() => setCheckoutSuccess(false)}
              className="mt-5 w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition-colors shadow-md"
            >
              Kembali ke Store
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
