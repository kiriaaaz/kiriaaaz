"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const cards = [
  {
    label: "Dance",
    href: "/danse",
    photo: "https://res.cloudinary.com/dmnjnkhnu/image/upload/v1775130700/photo-danse_qxkueq.jpg",
    video: "https://res.cloudinary.com/dmnjnkhnu/video/upload/v1775144055/video-danse_b0rxmg.mov",
  },
  {
    label: "Modeling",
    href: "/modeling",
    photo: "https://res.cloudinary.com/dmnjnkhnu/image/upload/v1775144007/photo-modeling_mso5ya.jpg",
    video: "https://res.cloudinary.com/dmnjnkhnu/video/upload/v1775144050/video-modeling_ztt3kx.mov",
  },
];

function Card({ label, href, photo, video }: { label: string; href: string; photo: string; video: string }) {
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
          backgroundColor: "#111",
          transition: "transform 0.4s ease, box-shadow 0.4s ease",
          transform: hovered ? "scale(1.02)" : "scale(1)",
          boxShadow: hovered ? "0 24px 60px rgba(0,0,0,0.45)" : "0 8px 30px rgba(0,0,0,0.25)",
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
          loop muted playsInline
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            backgroundColor: "#111",
            objectFit: "cover",
            transition: "opacity 0.5s ease",
            opacity: hovered ? 1 : 0,
          }}
        >
          <source src={video} type="video/mp4" />
        </video>

        {/* Overlay sombre au survol */}
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0.45)",
          transition: "opacity 0.4s ease",
          opacity: hovered ? 1 : 0,
        }} />

        {/* Titre au survol — Anton bold */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "opacity 0.4s ease",
          opacity: hovered ? 1 : 0,
        }}>
          <span style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: "clamp(2rem, 5vw, 4rem)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#f5f3ef",
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
          }}>
            {label}
          </span>
        </div>
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
        gap: "1.5rem",
        width: "85vw",
        margin: "1.5rem auto 0",
      }}
    >
      {cards.map((card) => (
        <Card key={card.label} {...card} />
      ))}
    </div>
  );
}