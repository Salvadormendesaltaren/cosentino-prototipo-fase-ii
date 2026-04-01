"use client";

import { useState, useRef, useEffect } from "react";
import Hero from "@/components/Hero";
import NavMenu from "@/components/NavMenu";
import IntroSection from "@/components/IntroSection";
import ThreeColumns from "@/components/ThreeColumns";
import Footer from "@/components/Footer";
import { sections } from "@/lib/sections";

export default function Home() {
  const [active, setActive] = useState(0);
  const [displayedSection, setDisplayedSection] = useState(0);
  const [curtainPhase, setCurtainPhase] = useState<"idle" | "covering" | "revealing">("idle");
  const [overHero, setOverHero] = useState(true);
  const isTransitioning = useRef(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const section = sections[displayedSection];

  // Track scroll to know if nav is over hero
  useEffect(() => {
    function handleScroll() {
      if (!heroRef.current) return;
      const heroBottom = heroRef.current.getBoundingClientRect().bottom;
      setOverHero(heroBottom > 48);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleSelect(index: number) {
    if (index === active || isTransitioning.current) return;
    isTransitioning.current = true;
    setActive(index);
    setCurtainPhase("covering");

    // Curtain covers (600ms) → swap content → curtain reveals (600ms)
    setTimeout(() => {
      setDisplayedSection(index);
      window.scrollTo({ top: 0 });
      setOverHero(true);

      requestAnimationFrame(() => {
        setCurtainPhase("revealing");

        setTimeout(() => {
          setCurtainPhase("idle");
          isTransitioning.current = false;
        }, 600);
      });
    }, 600);
  }

  return (
    <>
      {/* Nav fixed */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavMenu active={active} onSelect={handleSelect} overHero={overHero} />
      </div>

      {/* Curtain */}
      <div
        className="fixed inset-0 bg-black z-40 pointer-events-none"
        style={{
          transform:
            curtainPhase === "idle"
              ? "translateY(100%)"
              : curtainPhase === "covering"
              ? "translateY(0%)"
              : "translateY(-100%)",
          transition:
            curtainPhase === "idle"
              ? "none"
              : "transform 600ms cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      />

      <main key={displayedSection}>
        <div ref={heroRef}>
          <Hero
            heroImage={section.heroImage}
            heroTitle={section.heroTitle}
          />
        </div>
        <IntroSection
          introText={section.introText}
          videoLabel={section.videoLabel}
          loomId={section.loomId}
        />
        <ThreeColumns
          title={section.bottomTitle}
          columns={section.columns}
          onNavigate={handleSelect}
        />
        <Footer />
      </main>
    </>
  );
}
