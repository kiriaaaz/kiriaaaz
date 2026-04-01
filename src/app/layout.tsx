import type { Metadata } from "next";
import { Anton, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import KazTag from "@/components/KazTag";
import CustomCursor from "@/components/CustomCursor";
import LogoKiriaaaz from "@/components/LogoKiriaaaz";

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KIRIAAAZ",
  description: "Portfolio artistique — Danse & Modeling",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${anton.variable} ${montserrat.variable}`}>
      <body>
        {/* Curseur custom */}
        <CustomCursor />

        {/* KAZ tag clignotant en haut au centre */}
        <KazTag />

        {/* KIRIAAAZ — statique sur les autres pages, absent sur l'accueil */}
        <LogoKiriaaaz />

        {/* Header (Instagram + Contact me) fixe en haut à droite */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 20,
            padding: "clamp(1.2rem, 3vw, 2.5rem) clamp(1.4rem, 4vw, 3.5rem)"
          }}
        >
          <Header />
        </div>

        {children}
      </body>
    </html>
  );
}