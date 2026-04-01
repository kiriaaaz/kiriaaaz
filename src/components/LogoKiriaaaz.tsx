"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LogoKiriaaaz() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) return null;

  return (
    <Link
      href="/"
      style={{
        position: "fixed",
        top: "24px",    // ← même que y: "calc(-50vh + 24px)"
        left: "20px",   // ← même que x: "calc(-50vw + 20px)"
        zIndex: 100,          // ← très haut pour être au dessus de tout
        fontFamily: "var(--font-anton)",
        fontSize: "clamp(1.1rem, 2.5vw, 1.8rem)",
        color: "#f5f3ef",
        textDecoration: "none",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        cursor: "none",
        pointerEvents: "auto", // ← s'assure que le clic passe bien
      }}
    >
      KIRIAAAZ
    </Link>
  );
}