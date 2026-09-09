import React from 'react';

export default function BIDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 bg-slate-950 text-slate-100 min-h-[calc(100vh-48px)]">
      {children}
    </div>
  );
}
