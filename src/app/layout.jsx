import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers"; // Asegúrate de importar correctamente

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Login - Fast-Training",
  description: "Fuutbol",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-auto w-full`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
