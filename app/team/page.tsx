"use client";
import React, { useState, useEffect } from "react";
import TeamLoader from "../../components/TeamLoader";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isDesktop;
}

export default function TeamPage() {
  const [showMain, setShowMain] = useState(false);
  const isDesktop = useIsDesktop();

  if (!isDesktop) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f5f5",
          color: "#222",
          fontSize: "2rem",
          fontWeight: 600,
        }}
      >
        Welcome to the Team page!
      </div>
    );
  }

  return showMain ? (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5",
        color: "#222",
        fontSize: "2rem",
        fontWeight: 600,
      }}
    >
      Welcome to the Team page!
    </div>
  ) : (
    <TeamLoader onContinue={() => setShowMain(true)} />
  );
}
