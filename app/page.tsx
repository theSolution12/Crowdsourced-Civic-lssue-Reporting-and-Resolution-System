"use client";
import { useState, useEffect } from "react";
import RingLoader from "../components/ring-loader/RingLoader";
import Seo from "../components/Seo";
import FAQDemo from "../demo/faq-demo";
import { FeaturesSectionDemo } from "../components/ui/Grid-home";
import DarkMirror from "../components/DarkMirror/DarkMirror";
import PinnedIntro from "../components/PinnedIntro";
import OpenScDemo from "../demo/opensc-demo";
import LiquidGlassDemo from "../demo/liquidglass-demo";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <RingLoader />;
  }

  return (
    <>
      <Seo />
      {/* LiquidGlass Menu Demo */}
      <LiquidGlassDemo />
      {/* Scroll-pinned intro where SIH rises over MagicaHands */}
      <PinnedIntro />
      {/* Dark Mirror Section (Desktop only) */}
      <section className="hidden md:block">
        <DarkMirror />
      </section>
      {/* Features Section */}
      <section>
        <FeaturesSectionDemo />
      </section>
      {/* Open Source Demo Section */}
      <section>
        <OpenScDemo />
      </section>
      {/* FAQ Section */}
      <section id="faq">
        <FAQDemo />
      </section>
    </>
  );
}
