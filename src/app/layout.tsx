import type { Metadata } from "next";
import "./globals.css";
import { PresenterDemoBar } from "@/components/demo/PresenterDemoBar";

export const metadata: Metadata = {
  title: "HIPMIGO Pitching Engine — Web Simulation MVP",
  description: "Digital Business Ecosystem Platform for HIPMI 60,000+ Members",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-slate-900 text-slate-900 flex flex-col font-sans antialiased">
        <PresenterDemoBar />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
