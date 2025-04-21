import { Poppins, Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata = {
  title: "Login - Fast-Training",
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
