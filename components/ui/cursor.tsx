"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const springX = useSpring(cursorX, { stiffness: 500, damping: 50 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 50 });

  const lagX = useSpring(cursorX, { stiffness: 150, damping: 30 });
  const lagY = useSpring(cursorY, { stiffness: 150, damping: 30 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };
    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    const checkPointer = () => {
      const el = document.elementFromPoint(cursorX.get(), cursorY.get());
      if (!el) return;
      const computed = window.getComputedStyle(el);
      const tag = el.tagName.toLowerCase();
      setIsPointer(
        computed.cursor === "pointer" ||
        tag === "a" ||
        tag === "button" ||
        el.closest("a") !== null ||
        el.closest("button") !== null
      );
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseenter", onEnter);
    const interval = setInterval(checkPointer, 100);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnter);
      clearInterval(interval);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isPointer ? 0 : 1 }}
        transition={{ opacity: { duration: 0.2 } }}
        className="fixed top-0 left-0 z-[99999] pointer-events-none w-1.5 h-1.5 rounded-full bg-white"
      />
      {/* Ring */}
      <motion.div
        style={{ x: lagX, y: lagY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: isVisible ? 1 : 0,
          width: isPointer ? 56 : 40,
          height: isPointer ? 56 : 40,
          borderColor: isPointer ? "#ff3c00" : "rgba(255,255,255,0.5)",
          backgroundColor: isPointer ? "rgba(255,60,0,0.08)" : "transparent",
        }}
        transition={{ opacity: { duration: 0.2 }, width: { duration: 0.3 }, height: { duration: 0.3 }, borderColor: { duration: 0.2 } }}
        className="fixed top-0 left-0 z-[99998] pointer-events-none rounded-full border"
      />
    </>
  );
}
