"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { INSTAGRAM_URL } from "@/lib/constants";

const navLinks = [
  { label: "Instagram", href: INSTAGRAM_URL, external: true },
  { label: "Contact me", href: "#contact", external: false },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ── Desktop : liens normaux à droite ── */}
      <motion.header
        className="relative z-10 hidden md:flex justify-end items-center gap-8 md:gap-12"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.9 }}
      >
        {navLinks.map(({ label, href, external }) => (
          <a
            key={label}
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="
              font-montserrat font-light
              text-[0.65rem] md:text-[0.72rem]
              tracking-[0.22em] uppercase
              text-[var(--white)] no-underline
              relative pb-px
              opacity-90 hover:opacity-60
              transition-opacity duration-300
              group
            "
          >
            {label}
            <span className="absolute bottom-0 left-0 h-px w-0 bg-[var(--white)] transition-[width] duration-300 ease-in-out group-hover:w-full" />
          </a>
        ))}
      </motion.header>

      {/* ── Mobile : bouton burger à droite ── */}
      <motion.div
        className="md:hidden flex justify-end relative z-10"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.9 }}
      >
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none", border: "none", cursor: "none",
            color: "#f5f3ef", 
            padding: "0.6rem 0.3rem 0 0",  // ← augmente le 0.6rem jusqu'à ce que ce soit aligné
            display: "flex", flexDirection: "column", gap: "5px",
          }}
          aria-label="Menu"
        >
          {/* 3 traits burger */}
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{
                rotate: menuOpen && i === 0 ? 45 : menuOpen && i === 2 ? -45 : 0,
                y: menuOpen && i === 0 ? 8 : menuOpen && i === 2 ? -8 : 0,
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
              style={{ display: "block", width: "20px", height: "1px", background: "#f5f3ef" }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </button>
      </motion.div>

      {/* ── Volet latéral mobile ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay pour fermer */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              style={{ position: "fixed", inset: 0, zIndex: 90, background: "rgba(0,0,0,0.5)" }}
            />

            {/* Volet */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "fixed", top: 0, right: 0, bottom: 0,
                width: "60vw", maxWidth: "280px",
                background: "rgba(8,8,8,0.97)",
                backdropFilter: "blur(20px)",
                borderLeft: "1px solid rgba(245,243,239,0.08)",
                zIndex: 100,
                display: "flex", flexDirection: "column",
                justifyContent: "center",
                padding: "3rem 2rem",
                gap: "2.5rem",
              }}
            >
              {navLinks.map(({ label, href, external }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 300,
                    fontSize: "0.75rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "#f5f3ef",
                    textDecoration: "none",
                    opacity: 0.85,
                    cursor: "none",
                  }}
                >
                  {label}
                </motion.a>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}