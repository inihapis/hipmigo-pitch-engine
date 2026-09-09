import { create } from 'zustand';
import initialProfile from '@/mock/userProfile.json';

export interface UserProfile {
  id: string;
  name: string;
  company: string;
  role: string;
  bpc: string;
  bpd: string;
  membershipType: 'BASIC' | 'PREMIUM';
  isVerified: boolean;
  ktaNumber: string;
  points: number;
  avatar: string;
  sector: string;
  employees: string;
  established: string;
}

export interface ClaimedCertificate {
  id: string;
  courseId: string;
  title: string;
  level: string;
  serialNumber: string;
  issuedDate: string;
  qrCodeUrl: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface DemoStore {
  isPremium: boolean;
  userProfile: UserProfile;
  points: number;
  claimedCertificates: ClaimedCertificate[];
  cart: CartItem[];
  claimedVouchers: string[];
  
  // Actions
  upgradeToPremium: () => void;
  claimCertificate: (courseId: string, title: string, level: string) => void;
  addToCart: (product: { id: string; name: string; price: number; image: string }) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  claimVoucher: (voucherId: string) => void;
  resetDemo: () => void;
}

export const useDemoStore = create<DemoStore>((set) => ({
  isPremium: false,
  userProfile: initialProfile as UserProfile,
  points: initialProfile.points,
  claimedCertificates: [
    {
      id: 'CERT-000',
      courseId: 'PK-101',
      title: 'Dasar Kewirausahaan & Legalitas Usaha',
      level: 'PK 1',
      serialNumber: 'HMG-CER-2026-8819',
      issuedDate: '12 Januari 2026',
      qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=HMG-CER-2026-8819'
    }
  ],
  cart: [],
  claimedVouchers: ['VOUCH-01'],

  upgradeToPremium: () => set((state) => ({
    isPremium: true,
    points: state.points + 1000,
    userProfile: {
      ...state.userProfile,
      membershipType: 'PREMIUM',
      isVerified: true,
    }
  })),

  claimCertificate: (courseId, title, level) => set((state) => {
    const existing = state.claimedCertificates.find(c => c.courseId === courseId);
    if (existing) return state;

    const randomSerial = `HMG-CER-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCert: ClaimedCertificate = {
      id: `CERT-${Date.now()}`,
      courseId,
      title,
      level,
      serialNumber: randomSerial,
      issuedDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${randomSerial}`
    };

    return {
      claimedCertificates: [...state.claimedCertificates, newCert],
      points: state.points + 300,
    };
  }),

  addToCart: (product) => set((state) => {
    const existingIndex = state.cart.findIndex(item => item.id === product.id);
    if (existingIndex > -1) {
      const updated = [...state.cart];
      updated[existingIndex].quantity += 1;
      return { cart: updated };
    }
    return {
      cart: [...state.cart, { ...product, quantity: 1 }]
    };
  }),

  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter(item => item.id !== id)
  })),

  clearCart: () => set({ cart: [] }),

  claimVoucher: (voucherId) => set((state) => {
    if (state.claimedVouchers.includes(voucherId)) return state;
    return {
      claimedVouchers: [...state.claimedVouchers, voucherId]
    };
  }),

  resetDemo: () => set({
    isPremium: false,
    userProfile: initialProfile as UserProfile,
    points: initialProfile.points,
    claimedCertificates: [
      {
        id: 'CERT-000',
        courseId: 'PK-101',
        title: 'Dasar Kewirausahaan & Legalitas Usaha',
        level: 'PK 1',
        serialNumber: 'HMG-CER-2026-8819',
        issuedDate: '12 Januari 2026',
        qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=HMG-CER-2026-8819'
      }
    ],
    cart: [],
    claimedVouchers: ['VOUCH-01']
  })
}));
