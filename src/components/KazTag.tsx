"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { KAZ_TIMING } from "@/lib/constants";

const { duration, fadeIn, hold, fadeOut } = KAZ_TIMING;

const t0 = 0;
const t1 = fadeIn / duration;
const t2 = (fadeIn + hold) / duration;
const t3 = (fadeIn + hold + fadeOut) / duration;
const t4 = 1;

export default function KazTag() {
  return (
    <div
      style={{
        position: "fixed",
        top: "2rem",       // ← distance depuis le haut (ajuste ici)
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 20,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{
          opacity: [0, 1, 1, 0, 0],
          y: 0,
        }}
        transition={{
          y: { duration: 0.5, ease: "easeOut", delay: 1.8 },
          opacity: {
            times: [t0, t1, t2, t3, t4],
            duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.0,
          },
        }}
      >
        <Image
          src="/logo.png"
          alt="KAZ logo"
          width={80}
          height={80}
          style={{ objectFit: "contain" }}
        />
      </motion.div>
    </div>
  );
}