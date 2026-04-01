/**
 * Home page — app/page.tsx
 * Header, KazTag et CustomCursor sont maintenant dans layout.tsx
 */

import VideoBackground from "@/components/VideoBackground";
import HeroTitle       from "@/components/HeroTitle";
import SectionCards    from "@/components/SectionCards";

export default function HomePage() {
  return (
    <>
      {/* Hero title (fixe, animation Rock Men) */}
      <HeroTitle />

      {/* Contenu scrollable */}
      <main
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingBottom: "4rem",
        }}
      >
        {/* Section vidéo — prend 100vh */}
        <div style={{ width: "100%", height: "100vh", position: "relative" }}>
          <VideoBackground />
        </div>

        {/* Cartes Danse & Modeling en dessous */}
        <div style={{ width: "85vw", marginTop: "2rem" }}>
          <SectionCards />
        </div>
      </main>
    </>
  );
}