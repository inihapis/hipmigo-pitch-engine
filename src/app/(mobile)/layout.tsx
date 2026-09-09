import React from 'react';
import { MobileFrameContainer } from '@/components/demo/MobileFrameContainer';

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-slate-900 min-h-[calc(100vh-48px)]">
      <MobileFrameContainer>
        {children}
      </MobileFrameContainer>
    </div>
  );
}
