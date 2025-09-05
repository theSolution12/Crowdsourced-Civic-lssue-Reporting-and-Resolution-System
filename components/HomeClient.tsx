"use client";
import { useEffect, useState } from "react";
import RingLoader from "./ring-loader/RingLoader";
import FAQDemo from "../demo/faq-demo";
import { FeaturesSectionDemo } from "./ui/Grid-home";
import DarkMirror from "./DarkMirror/DarkMirror";
import PinnedIntro from "./PinnedIntro";
import SihHero from "./SihHero";
import OpenScDemo from "../demo/opensc-demo";
import LiquidGlassDemo from "../demo/liquidglass-demo";

export default function HomeClient() {
  const [loading, setLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (loading) {
    return <RingLoader />;
  }

  return (
    <>
      <LiquidGlassDemo />
      {/* Show PinnedIntro only on desktop, SihHero only on non-desktop */}
      {isDesktop ? <PinnedIntro /> : <SihHero />}
      <section className="hidden md:block">
        <DarkMirror />
      </section>
      <section>
        <FeaturesSectionDemo />
      </section>
      <section>
        <OpenScDemo />
      </section>
      <section id="faq">
        <FAQDemo />
      </section>
    </>
  );
}
