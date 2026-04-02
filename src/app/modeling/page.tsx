"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const photos = [
  { src: "/modeling-nike.jpeg",    alt: "Nike Casual Fit"           },
  { src: "https://res.cloudinary.com/dmnjnkhnu/image/upload/v1775130976/modeling-cuir1_uuub0b.jpg",   alt: "Studio cuir foulard"       },
  { src: "https://res.cloudinary.com/dmnjnkhnu/image/upload/v1775130724/modeling-paco2_lgbtff.png",    alt: "Paco Rabanne Raw Instinct" },
  { src: "/modeling-adidas1.jpeg", alt: "Adidas editorial"          },
  { src: "https://res.cloudinary.com/dmnjnkhnu/image/upload/v1775144114/modeling-cuir2_hftapn.jpg",   alt: "Studio cuir fond sombre"   },
  { src: "https://res.cloudinary.com/dmnjnkhnu/image/upload/v1775130723/modeling-paco1_lugonf.png",    alt: "Paco Rabanne SS26"         },
  { src: "/modeling-adidas2.jpeg", alt: "Adidas assis"              },
];

const layout = [
  { col: "1 / 7",   row: "1 / 4", mt: "0",    aspect: "2/3" },
  { col: "9 / 12",  row: "1 / 2", mt: "6rem", aspect: "3/4" },
  { col: "7 / 11",  row: "2 / 4", mt: "2rem", aspect: "3/4" },
  { col: "10 / 13", row: "3 / 6", mt: "0",    aspect: "2/3" },
  { col: "2 / 5",   row: "4 / 5", mt: "3rem", aspect: "4/5" },
  { col: "5 / 10",  row: "4 / 7", mt: "1rem", aspect: "2/3" },
  { col: "1 / 4",   row: "5 / 7", mt: "4rem", aspect: "3/4" },
];

function Lightbox({ photo, onClose }: { photo: { src: string; alt: string }; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "none" }}
      >
        <button onClick={onClose} style={{ position: "absolute", top: "2rem", right: "2.5rem", background: "none", border: "none", color: "#f5f3ef", fontFamily: "var(--font-montserrat)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "none", opacity: 0.6 }}>
          FERMER ✕
        </button>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{ position: "relative", width: "min(90vw, 700px)", height: "min(90vh, 900px)" }}
        >
          <Image src={photo.src} alt={photo.alt} fill style={{ objectFit: "contain" }} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function PhotoCard({ src, alt, layoutItem, index, onClick }: {
  src: string; alt: string;
  layoutItem: (typeof layout)[0];
  index: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: layoutItem.col,
        gridRow: layoutItem.row,
        marginTop: layoutItem.mt,
        aspectRatio: layoutItem.aspect,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#1a1a1a",
        cursor: "none",
      }}
    >
      <Image
        src={src} alt={alt} fill
        sizes="(max-width: 768px) 100vw, 40vw"
        style={{
          objectFit: "cover",
          objectPosition: "top center",
          // Grisé au survol
          filter: hovered ? "brightness(0.5)" : "brightness(1)",
          transition: "filter 0.4s ease",
        }}
      />
    </motion.div>
  );
}

export default function ModelingPage() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  return (
    <div style={{ minHeight: "100vh", background: "#080808", color: "#f5f3ef", overflowX: "hidden" }}>
      <main
        style={{
          paddingTop: "8rem", paddingBottom: "8rem",
          paddingLeft: "2rem", paddingRight: "2rem",
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridTemplateRows: "repeat(7, 18vw)",
          gap: "1rem",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {photos.map((photo, i) => (
          <PhotoCard
            key={i} src={photo.src} alt={photo.alt}
            layoutItem={layout[i]} index={i}
            onClick={() => setLightbox(photo)}
          />
        ))}
      </main>

      <footer style={{ textAlign: "center", paddingBottom: "3rem", fontFamily: "var(--font-montserrat)", fontWeight: 300, fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", opacity: 0.3 }}>
        KIRIAAAZ — Modeling
      </footer>

      {lightbox && <Lightbox photo={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  );
}