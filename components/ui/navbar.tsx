"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import Link from "next/link";

const links = [
  { label: "Collections", href: "/collection" },
  { label: "Matériaux", href: "/#materiaux" },
  { label: "L'Atelier", href: "/atelier" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <nav className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="font-display font-bold text-white text-sm md:text-base tracking-[0.15em] uppercase">
            MAISON LUMA
          </Link>

          <ul className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs tracking-[0.15em] text-[#888] hover:text-white transition-colors duration-200 uppercase"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/80"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 35 }}
              className="fixed top-0 left-0 bottom-0 z-[70] w-72 bg-[#0a0a0a] border-r border-[#1a1a1a] flex flex-col px-8 py-10"
            >
              <div className="flex items-center justify-between mb-12">
                <span className="font-display font-bold text-white text-sm tracking-[0.15em]">
                  MAISON LUMA
                </span>
                <button onClick={() => setMenuOpen(false)} className="text-[#666] hover:text-white transition-colors">
                  <X size={18} />
                </button>
              </div>
              <ul className="flex flex-col gap-6">
                {links.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-[#888] hover:text-white text-sm tracking-[0.15em] uppercase transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto text-[10px] text-[#444] tracking-[0.2em]">
                ML-2024-EXT
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
