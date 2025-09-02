"use client";
import React from "react";

type TeamLoaderProps = {
  onContinue: () => void;
};

export default function TeamLoader({ onContinue }: TeamLoaderProps) {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        background: "#111",
      }}
    >
      <iframe
        src="https://my.spline.design/cybersamuraiupdatedmaterial-hZzZBTovoMX0C8GcRH4MlCc3/"
        frameBorder="0"
        width="100%"
        height="100%"
        style={{ border: "none", position: "absolute", top: 0, left: 0 }}
        title="Spline Cyber Samurai"
      />
      <div
        style={{
          width: "100%",
          textAlign: "center",
          padding: "24px 0",
          color: "#FFD600",
          fontSize: "1.5rem",
          fontWeight: 600,
          letterSpacing: "1px",
          position: "absolute",
          bottom: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        Click to continue
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 3,
          background: "transparent",
          cursor: "pointer",
        }}
        onClick={onContinue}
        tabIndex={0}
        role="button"
      />
    </div>
  );
}
