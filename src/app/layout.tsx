import type { Metadata } from "next";
import { Syncopate, DM_Sans } from "next/font/google";
import "./globals.css";

const syncopate = Syncopate({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-syncopate",
  display: "swap",
  preload: true,
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Maison Luma — Mobilier Outdoor Premium",
  description:
    "Mobilier outdoor haut de gamme en teck massif et tissu Sunbrella®. Collections exclusives, assemblage artisanal, livraison sur-mesure.",
  keywords: ["mobilier outdoor", "canapé jardin", "teck", "luxe", "Sunbrella"],
  openGraph: {
    title: "Maison Luma — Mobilier Outdoor Premium",
    description: "L'art de vivre en extérieur. Collections exclusives en teck et Sunbrella®.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${syncopate.variable} ${dmSans.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
