"use client";
import { useState, useEffect } from "react";
import RingLoader from "../components/ring-loader/RingLoader";
import Seo from "../components/Seo";
import FAQDemo from "../demo/faq-demo";
import { FeaturesSectionDemo } from "../components/ui/Grid-home";
import DarkMirror from "../components/DarkMirror/DarkMirror";
import PinnedIntro from "../components/PinnedIntro";
import SihHero from "../components/SihHero";
import OpenScDemo from "../demo/opensc-demo";
import LiquidGlassDemo from "../demo/liquidglass-demo";

export default function Home() {
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
      <Seo title="जनसेतु | home" />
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
