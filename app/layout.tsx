import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


export const metadata: Metadata = {
  title: "Source of Adventure | Discover Your Next Journey",
  description: "Find and book unique adventure experiences worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-sans">
      <body className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
        {children}
      </body>
    </html>
  );
}
