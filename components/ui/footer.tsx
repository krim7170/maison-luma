"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const collections = ["Canapé Oural XL", "Méridienne Bora", "Set Îlot", "Table Solstice"];
const atelier = ["Notre Histoire", "Processus", "Matériaux", "Artisans"];

export function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-[#111]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1 — Brand */}
          <div>
            <Link href="/" className="font-display font-bold text-white text-sm tracking-[0.15em] uppercase block mb-4">
              MAISON LUMA
            </Link>
            <p className="text-[#555] text-sm leading-relaxed mb-6">
              L&apos;art de vivre en extérieur.<br />Teck massif &amp; Sunbrella®.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 border border-[#2a2a2a] flex items-center justify-center text-[#555] hover:text-white hover:border-[#555] transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-8 h-8 border border-[#2a2a2a] flex items-center justify-center text-[#555] hover:text-white hover:border-[#555] transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
              </a>
            </div>
          </div>

          {/* Col 2 — Collections */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] text-[#444] uppercase mb-5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Collections
            </h4>
            <ul className="space-y-3">
              {collections.map((item) => (
                <li key={item}>
                  <Link href="/collection" className="text-[#666] hover:text-[#e0e0e0] text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — L'Atelier */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] text-[#444] uppercase mb-5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              L&apos;Atelier
            </h4>
            <ul className="space-y-3">
              {atelier.map((item) => (
                <li key={item}>
                  <Link href="/atelier" className="text-[#666] hover:text-[#e0e0e0] text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Newsletter */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] text-[#444] uppercase mb-5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Contact
            </h4>
            <p className="text-[#555] text-sm mb-2">contact@maisonluma.fr</p>
            <p className="text-[#555] text-sm mb-6">Paris, France</p>

            <p className="text-[10px] tracking-[0.2em] text-[#444] uppercase mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Newsletter
            </p>
            <form
              className="flex border border-[#2a2a2a] hover:border-[#555] transition-colors"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="votre@email.fr"
                className="flex-1 bg-transparent px-3 py-2.5 text-xs text-[#888] placeholder-[#444] outline-none"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              />
              <button
                type="submit"
                className="px-4 text-[#666] hover:text-white border-l border-[#2a2a2a] hover:bg-[#ff3c00]/10 hover:border-[#ff3c00] transition-all"
              >
                <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#111] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-[#333] tracking-[0.15em]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            © {new Date().getFullYear()} MAISON LUMA — TOUS DROITS RÉSERVÉS
          </p>
          <div className="flex gap-6">
            {["Mentions légales", "CGV", "Confidentialité"].map((item) => (
              <a key={item} href="#" className="text-[10px] text-[#333] hover:text-[#666] transition-colors tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
