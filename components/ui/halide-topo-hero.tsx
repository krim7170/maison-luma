"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface HalideLandingProps {
  title?: string;
  titleLine2?: string;
  subtitle?: string;
  tagline?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  coordLabel1?: string;
  coordValue1?: string;
  coordLabel2?: string;
  coordValue2?: string;
  layer1Src?: string;
  layer2Src?: string;
  layer3Src?: string;
}

export function HalideLanding({
  title = "MAISON",
  titleLine2 = "LUMA",
  subtitle = "[ COLLECTION 2024 ]",
  tagline = "MOBILIER OUTDOOR · ÉDITION LIMITÉE",
  ctaText = "DÉCOUVRIR LA COLLECTION",
  onCtaClick,
  coordLabel1 = "LATITUDE",
  coordValue1 = "43.2965° N",
  coordLabel2 = "MATIÈRE",
  coordValue2 = "TECK NATUREL",
  layer1Src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
  layer2Src = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200",
  layer3Src = "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1200",
}: HalideLandingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yLayer1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yLayer2 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yLayer3 = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  }, []);

  const tiltX = mousePos.y * -8;
  const tiltY = mousePos.x * 8;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0, y: 0 }); }}
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
          opacity: 0.35,
          mixBlendMode: "overlay",
        }}
      />

      {/* Dark vignette */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 z-[3] pointer-events-none"
        style={{ background: "linear-gradient(to top, #0a0a0a 0%, transparent 100%)" }}
      />

      {/* Parallax image layers */}
      <motion.div
        className="absolute inset-0 z-[0]"
        style={{ y: yLayer1, scale }}
        animate={isHovered ? { rotateX: tiltX * 0.3, rotateY: tiltY * 0.3 } : { rotateX: 0, rotateY: 0 }}
        transition={{ type: "spring", stiffness: 150, damping: 30 }}
      >
        <Image
          src={layer1Src}
          alt="Layer 1"
          fill
          className="object-cover opacity-60"
          priority
          sizes="100vw"
          unoptimized
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 z-[1]"
        style={{ y: yLayer2 }}
        animate={isHovered ? { rotateX: tiltX * 0.6, rotateY: tiltY * 0.6 } : { rotateX: 0, rotateY: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 25 }}
      >
        <Image
          src={layer2Src}
          alt="Layer 2"
          fill
          className="object-cover opacity-40 mix-blend-luminosity"
          sizes="100vw"
          unoptimized
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 z-[1]"
        style={{ y: yLayer3 }}
        animate={isHovered ? { rotateX: tiltX, rotateY: tiltY } : { rotateX: 0, rotateY: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <Image
          src={layer3Src}
          alt="Layer 3"
          fill
          className="object-cover opacity-20"
          sizes="100vw"
          unoptimized
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-[10] h-full flex flex-col justify-center items-center text-center px-6"
        style={{ opacity }}
      >
        <AnimatePresence>
          {mounted && (
            <>
              {/* Subtitle monospace */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="mb-8"
              >
                <span
                  className="text-[10px] md:text-xs tracking-[0.3em] text-[#c4a882] uppercase"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {subtitle}
                </span>
              </motion.div>

              {/* Main title */}
              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-bold uppercase leading-none mb-2"
                style={{
                  fontSize: "clamp(5rem, 18vw, 18rem)",
                  letterSpacing: "-0.02em",
                  background: "linear-gradient(180deg, #ffffff 0%, #e0e0e0 50%, #888888 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 0.9,
                }}
              >
                {title}
              </motion.h1>

              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-bold uppercase leading-none mb-10"
                style={{
                  fontSize: "clamp(5rem, 18vw, 18rem)",
                  letterSpacing: "-0.02em",
                  background: "linear-gradient(180deg, #e0e0e0 0%, #888888 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 0.9,
                }}
              >
                {titleLine2}
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="text-[10px] md:text-xs tracking-[0.4em] text-[#888] uppercase mb-12"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {tagline}
              </motion.p>

              {/* CTA Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onCtaClick}
                className="clip-polygon relative px-10 py-4 text-xs tracking-[0.3em] uppercase font-semibold transition-all duration-300"
                style={{
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "#fff",
                  fontFamily: "'JetBrains Mono', monospace",
                  clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(10px)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,60,0,0.15)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#ff3c00";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.3)";
                }}
              >
                {ctaText}
              </motion.button>
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Coordinates HUD */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-10 left-8 z-[10] hidden md:block"
      >
        <div
          className="text-[9px] tracking-[0.25em] text-[#666] uppercase space-y-1"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          <div>{coordLabel1}: <span className="text-[#c4a882]">{coordValue1}</span></div>
          <div>{coordLabel2}: <span className="text-[#c4a882]">{coordValue2}</span></div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        className="absolute bottom-10 right-8 z-[10] flex flex-col items-center gap-2"
      >
        <span
          className="text-[8px] tracking-[0.3em] text-[#555] uppercase"
          style={{ fontFamily: "'JetBrains Mono', monospace", writingMode: "vertical-rl" }}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-[#555] to-transparent"
        />
      </motion.div>

      {/* Top-right corner marker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute top-6 right-8 z-[10] hidden md:block"
      >
        <span
          className="text-[8px] tracking-[0.3em] text-[#444] uppercase"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          ML-2024-EXT
        </span>
      </motion.div>
    </div>
  );
}
