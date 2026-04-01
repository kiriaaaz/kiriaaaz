"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import { ARTIST_NAME } from "@/lib/constants";

const HOLD_DURATION = 1500;

export default function HeroTitle() {
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start("visible").then(() => {
      setTimeout(() => {
        controls.start("logo");
      }, HOLD_DURATION);
    });
  }, [controls]);

  return (
    <motion.h1
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        zIndex: 10,
        whiteSpace: "nowrap",
        fontFamily: "var(--font-anton)",  // ← directement en style, plus de classe Tailwind
        textTransform: "uppercase",
        color: "#f5f3ef",
        letterSpacing: "0.08em",
        textShadow: "0 2px 48px rgba(0,0,0,0.3)",
        willChange: "transform, font-size",
        userSelect: "none",
        pointerEvents: "none",
      }}
      variants={{
        hidden: {
          opacity: 0,
          fontSize: "clamp(4rem, 16vw, 13rem)",
          x: "-50%",
          y: "-50%",
        },
        visible: {
          opacity: 1,
          fontSize: "clamp(4rem, 16vw, 13rem)",
          x: "-50%",
          y: "-50%",
        },
        logo: {
          opacity: 1,
          fontSize: "clamp(1.1rem, 2.5vw, 1.8rem)",
          x: "calc(-50vw + 20px)",
          y: "calc(-50vh + 24px)",
        },
      }}
      initial="hidden"
      animate={controls}
      transition={{
        visible: {
          duration: 1.0,
          ease: [0.22, 1, 0.36, 1],
        },
        logo: {
          duration: 1.2,
          ease: [0.76, 0, 0.24, 1],
          fontSize: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
        },
      }}
    >
      {ARTIST_NAME}
    </motion.h1>
  );
}