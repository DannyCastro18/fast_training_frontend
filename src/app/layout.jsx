// app/layout.jsx
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers";
import { Suspense } from 'react';
import Loading from '@/components/shared/Loading';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Fast-Training",
  description: "Futbol",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${poppins.variable} ${montserrat.variable} antialiased min-h-full w-full`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
