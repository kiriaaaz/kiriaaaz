import { BG_VIDEO_SRC } from "@/lib/constants";

export default function VideoBackground() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "85vw",
          height: "80vh",
          marginTop: "5vh",
          borderRadius: "2rem",
          overflow: "hidden",
          position: "relative",
          backgroundColor: "#111",
        }}
      >
        <video
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={BG_VIDEO_SRC} type="video/mp4" />
        </video>

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.38)",
            borderRadius: "2rem",
          }}
        />
      </div>
    </div>
  );
}