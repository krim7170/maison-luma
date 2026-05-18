import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Maison Luma — L'élégance à l'état pur",
  description:
    "Maison Luma réunit des artisans d'exception pour créer des objets qui transcendent le temps. Collection de mobilier, céramiques et luminaires d'exception.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
