"use client";
import GlassSurface from "../components/ui/LiquidGlass";

export default function LiquidGlassDemo() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        zIndex: 100,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "auto",
      }}
    >
      <GlassSurface
        width="76.5vw"
        height={61.2}
        borderRadius={20.4}
        className="shadow-lg"
        style={{ margin: "12px auto", maxWidth: 765 }}
      >
        <div style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          justifyContent: "flex-start",
          width: "100%",
        }}>
          <img
            src="/menulogo.png"
            alt="Menu Logo"
            style={{ height: 48, width: 48, marginRight: 18, marginLeft: 0, objectFit: "contain" }}
          />
        </div>
      </GlassSurface>
    </div>
  );
}
