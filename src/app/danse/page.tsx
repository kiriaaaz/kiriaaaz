"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Category = "all" | "battle" | "choregraphie";

interface Video {
  id: number;
  title: string;
  category: "battle" | "choregraphie";
  type: "local" | "youtube" | "instagram";
  src: string;
  thumbnail?: string;
  hero?: boolean;
}

const videos: Video[] = [
  // BATTLE
  { id: 1,  title: "The Vibe Rome 2025",  category: "battle",       type: "youtube", src: "https://youtu.be/BPgNWyfYKNU", hero: true  },
  { id: 2,  title: "The Platforme",       category: "battle",       type: "youtube", src: "https://youtu.be/6tc9qHmMBcU", hero: false },
  { id: 3,  title: "HIP OPSession",       category: "battle",       type: "youtube", src: "https://youtu.be/OVNY8FyBgtw", hero: false },
  { id: 4,  title: "FDN Battle",          category: "battle",       type: "youtube", src: "https://youtu.be/8v3QQVW0Dx8", hero: false },
  { id: 5,  title: "FDN Battle",          category: "battle",       type: "youtube", src: "https://youtu.be/TGMRJdPkzjc", hero: false },
  { id: 6,  title: "FDN Battle",          category: "battle",       type: "youtube", src: "https://youtu.be/sggBqKzj-RE", hero: false },
  { id: 7,  title: "FDN Battle",          category: "battle",       type: "youtube", src: "https://youtu.be/4u6jYQeRoyA", hero: false },
  { id: 8,  title: "Oflow Battle",        category: "battle",       type: "youtube", src: "https://youtu.be/g_sPH26CWTw", hero: false },
  // CHORÉGRAPHIE
  { id: 9,  title: "Circle Contest",                                          category: "choregraphie", type: "youtube", src: "https://youtu.be/lWwZgfnuHSI", hero: false },
  { id: 10, title: "Creative Sneakart",                                       category: "choregraphie", type: "youtube", src: "https://youtu.be/rQ8heN1PT-Q", hero: false },
  { id: 11, title: "Show No Luck Battle",                                     category: "choregraphie", type: "youtube", src: "https://youtu.be/i7vN4xWhaHs", hero: false },
  { id: 12, title: "Leto & Guy2bezbar - La Capitale Est Sous Contrôle",       category: "choregraphie", type: "youtube", src: "https://youtu.be/f5Yuh37rYlw", hero: true  },
  { id: 13, title: "Only 4 Choreo",                                           category: "choregraphie", type: "youtube", src: "https://youtu.be/yT4OgWcDs6k", hero: false },
];

function getYoutubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|v=)([^?&/]+)/);
  return match ? match[1] : null;
}

function getYoutubeThumbnail(url: string): string {
  const id = getYoutubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
}

function Lightbox({ video, onClose }: { video: Video; onClose: () => void }) {
  const id = getYoutubeId(video.src);
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.94)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "none" }}
      >
        <button onClick={onClose} style={{ position: "absolute", top: "2rem", right: "2.5rem", background: "none", border: "none", color: "#f5f3ef", fontFamily: "var(--font-montserrat)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "none", opacity: 0.6 }}>
          FERMER ✕
        </button>
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{ width: "min(90vw, 960px)", aspectRatio: "16/9", background: "#000" }}
        >
          {video.type === "youtube" && id && (
            <iframe src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`} allow="autoplay; fullscreen" allowFullScreen style={{ width: "100%", height: "100%", border: "none" }} />
          )}
          {video.type === "local" && (
            <video autoPlay controls style={{ width: "100%", height: "100%", objectFit: "contain" }}>
              <source src={video.src} type="video/mp4" />
            </video>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function VideoCard({ video, onClick, index }: { video: Video; onClick: () => void; index: number }) {
  const [hovered, setHovered] = useState(false);
  const thumb = video.thumbnail || (video.type === "youtube" ? getYoutubeThumbnail(video.src) : "");
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", cursor: "none", aspectRatio: "16/9", overflow: "hidden", background: "#1a1a1a" }}
    >
      {thumb && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={thumb} alt={video.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.3s ease", opacity: hovered ? 0.5 : 1 }} />
      )}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: hovered ? 1 : 0.4, transition: "opacity 0.3s ease" }}>
        <div style={{ width: "2.8rem", height: "2.8rem", borderRadius: "50%", border: "1px solid rgba(245,243,239,0.7)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)", background: "rgba(0,0,0,0.3)" }}>
          <span style={{ fontSize: "0.75rem", marginLeft: "3px" }}>▶</span>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem 0.7rem 0.6rem", background: "linear-gradient(transparent, rgba(0,0,0,0.75))" }}>
        <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, fontSize: "0.6rem", letterSpacing: "0.1em", margin: 0, opacity: 0.85 }}>
          {video.title}
        </p>
      </div>
    </motion.div>
  );
}

function HeroVideo({ video, onNext, onPrev, hasPrev, hasNext }: { video: Video; onNext: () => void; onPrev: () => void; hasPrev: boolean; hasNext: boolean }) {
  const id = getYoutubeId(video.src);
  return (
    <div style={{ width: "85vw", margin: "0 auto 3rem", aspectRatio: "16/9", position: "relative", background: "#111", overflow: "hidden" }}>
      {id && (
        <iframe key={id} src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&rel=0&controls=1`} allow="autoplay; fullscreen" allowFullScreen style={{ width: "100%", height: "100%", border: "none" }} />
      )}
      <div style={{ position: "absolute", bottom: "1rem", right: "1rem", display: "flex", gap: "0.5rem" }}>
        {hasPrev && <button onClick={onPrev} style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(245,243,239,0.3)", color: "#f5f3ef", fontFamily: "var(--font-montserrat)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "0.5rem 1rem", cursor: "none", backdropFilter: "blur(4px)" }}>← PRÉCÉDENTE</button>}
        {hasNext && <button onClick={onNext} style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(245,243,239,0.3)", color: "#f5f3ef", fontFamily: "var(--font-montserrat)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "0.5rem 1rem", cursor: "none", backdropFilter: "blur(4px)" }}>SUIVANTE →</button>}
      </div>
      <div style={{ position: "absolute", bottom: "1rem", left: "1rem" }}>
        <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.6, margin: 0 }}>
          {video.category === "battle" ? "Battle" : "Chorégraphie"}
        </p>
        <p style={{ fontFamily: "var(--font-anton)", fontSize: "clamp(1rem, 2vw, 1.6rem)", letterSpacing: "0.06em", margin: "0.2rem 0 0" }}>
          {video.title}
        </p>
      </div>
    </div>
  );
}

export default function DansePage() {
  const [filter, setFilter] = useState<Category>("all");
  const [lightbox, setLightbox] = useState<Video | null>(null);
  const [heroIndex, setHeroIndex] = useState(0);

  const filtered = videos.filter(v => filter === "all" || v.category === filter);
  const heroVideos = filtered.filter(v => v.hero);
  const currentHero = heroVideos[heroIndex] ?? null;

  const handleFilterChange = (cat: Category) => {
    setFilter(cat);
    setHeroIndex(0);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080808", color: "#f5f3ef", overflowX: "hidden" }}>
      <main style={{ paddingTop: "7rem", paddingBottom: "8rem" }}>
        {currentHero && (
          <HeroVideo
            video={currentHero}
            onPrev={() => setHeroIndex(i => i - 1)}
            onNext={() => setHeroIndex(i => i + 1)}
            hasPrev={heroIndex > 0}
            hasNext={heroIndex < heroVideos.length - 1}
          />
        )}
        <div style={{ width: "85vw", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "0.8rem" }}>
          {filtered.map((video, i) => (
            <VideoCard key={video.id} video={video} onClick={() => setLightbox(video)} index={i} />
          ))}
        </div>
      </main>

      <div style={{ position: "fixed", bottom: "2rem", left: "50%", transform: "translateX(-50%)", zIndex: 50, display: "flex", background: "rgba(8,8,8,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(245,243,239,0.12)", padding: "0.3rem" }}>
        {(["all", "battle", "choregraphie"] as Category[]).map((cat) => (
          <button key={cat} onClick={() => handleFilterChange(cat)} style={{ fontFamily: "var(--font-montserrat)", fontWeight: 300, fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", padding: "0.55rem 1.2rem", border: "none", cursor: "none", background: filter === cat ? "#f5f3ef" : "transparent", color: filter === cat ? "#080808" : "#f5f3ef", transition: "all 0.25s ease" }}>
            {cat === "all" ? "Tout" : cat === "battle" ? "Battle" : "Chorégraphie"}
          </button>
        ))}
      </div>

      {lightbox && <Lightbox video={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  );
}