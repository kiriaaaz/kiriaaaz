"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

/**
 * SectionCards
 * Deux cartes côte à côte — Danse & Modeling.
 * Au survol : la photo disparaît, une vidéo se lance.
 *
 * Pour changer les fichiers :
 * - photo-danse.jpg / photo-modeling.jpg  → tes photos dans /public/
 * - video-danse.mp4 / video-modeling.mp4  → tes vidéos dans /public/
 */

const cards = [
  {
    label: "Danse",
    href: "/danse",
    photo: "/photo-danse.jpg",
    video: "/video-danse.mov",
  },
  {
    label: "Modeling",
    href: "/modeling",
    photo: "/photo-modeling.jpeg",
    video: "/video-modeling.mov",
  },
];

function Card({
  label,
  href,
  photo,
  video,
}: {
  label: string;
  href: string;
  photo: string;
  video: string;
}) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setHovered(true);
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Link href={href} className="block flex-1">
      <div
        className="relative overflow-hidden cursor-none"
        style={{
          borderRadius: "2rem",
          height: "45vh",
          // Légère élévation au survol
          transition: "transform 0.4s ease, box-shadow 0.4s ease",
          transform: hovered ? "scale(1.02)" : "scale(1)",
          boxShadow: hovered
            ? "0 24px 60px rgba(0,0,0,0.45)"
            : "0 8px 30px rgba(0,0,0,0.25)",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Photo de base */}
        <Image
          src={photo}
          alt={label}
          fill
          style={{
            objectFit: "cover",
            transition: "opacity 0.5s ease",
            opacity: hovered ? 0 : 1,
          }}
        />

        {/* Vidéo au survol */}
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            backgroundColor: "#111",
            height: "100%",
            objectFit: "cover",
            transition: "opacity 0.5s ease",
            opacity: hovered ? 1 : 0,
          }}
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>
    </Link>
  );
}

export default function SectionCards() {
  return (
    <div
      className="relative z-10"
      style={{
        display: "flex",
        gap: "1.5rem",           // ← espace entre les deux cartes
        width: "85vw",           // ← même largeur que la vidéo principale
        margin: "1.5rem auto 0", // ← espace sous la vidéo principale
      }}
    >
      {cards.map((card) => (
        <Card key={card.label} {...card} />
      ))}
    </div>
  );
}