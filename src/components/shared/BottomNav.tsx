'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDemoStore } from '@/store/useDemoStore';
import { Home, ShieldCheck, Award, ShoppingBag } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const { cart } = useDemoStore();
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    {
      label: 'Home',
      path: '/home',
      icon: Home,
    },
    {
      label: 'Advantage',
      path: '/advantage',
      icon: ShieldCheck,
      badge: 'Pilar 1'
    },
    {
      label: 'Certify',
      path: '/certification',
      icon: Award,
      badge: 'Pilar 3'
    },
    {
      label: 'Commerce',
      path: '/commerce',
      icon: ShoppingBag,
      count: cartItemCount > 0 ? cartItemCount : undefined,
      badge: 'Pilar 4'
    }
  ];

  return (
    <nav className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 px-3 flex items-center justify-around z-40 shadow-lg">
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        const Icon = item.icon;

        return (
          <Link
            key={item.path}
            href={item.path}
            className={`flex flex-col items-center justify-center w-full h-full relative transition-colors ${
              isActive ? 'text-amber-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
              {item.count !== undefined && (
                <span className="absolute -top-1.5 -right-2.5 bg-red-500 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {item.count}
                </span>
              )}
            </div>
            <span className="text-[11px] mt-1 tracking-tight">{item.label}</span>

            {/* Active Top Bar Indicator */}
            {isActive && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-amber-500 rounded-b-full shadow-sm"></span>
            )}
          </Link>
        );
      })}
    </nav>
  );
};
