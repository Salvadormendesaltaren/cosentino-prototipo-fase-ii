"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ArticleThumbnail from "@/components/ArticleThumbnail";
import { useReveal } from "@/hooks/useReveal";
import { useProtoCurtain } from "./layout";

const SUB_NAV = ["JOURNAL", "ENCUENTRA"];

const FILTERS: { label: string; href?: string; subs?: string[] }[] = [
  { label: "All" },
  { label: "Spaces", href: "/prototipo/espacios", subs: ["Bathrooms", "Kitchens", "Interiors", "Facades", "Contract"] },
  { label: "Interviews", subs: ["Designers", "Architects", "Artists"] },
  { label: "Tendencias", subs: ["Materials", "Color", "Sustainability"] },
  { label: "Reformas", subs: ["Residential", "Commercial", "Outdoor"] },
];

export default function PrototipoPage() {
  const { navigateTo } = useProtoCurtain();
  const [activeSubNav, setActiveSubNav] = useState(0);
  const [activeFilter, setActiveFilter] = useState(0);
  const [activeSub, setActiveSub] = useState(0);
  const [overHero, setOverHero] = useState(true);
  const revealRef = useReveal();

  const currentFilter = FILTERS[activeFilter];
  const hasSubs = activeFilter > 0 && currentFilter.subs;

  useEffect(() => {
    function handleScroll() {
      const heroBottom = window.innerHeight;
      setOverHero(window.scrollY < heroBottom - 100);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full min-h-screen" ref={revealRef}>
      {/* Header */}
      <Header />

      {/* Sub-nav: JOURNAL / ENCUENTRA */}
      <div className="fixed top-[66px] left-0 right-0 z-40 flex justify-center gap-[16px] pt-[16px]">
        {SUB_NAV.map((item, i) => (
          <button
            key={item}
            onClick={() => setActiveSubNav(i)}
            className="text-white text-[14px] font-normal cursor-pointer transition-opacity duration-300"
            style={{
              lineHeight: "normal",
              opacity: activeSubNav === i ? 1 : 0.5,
            }}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Hero — full viewport */}
      <div className="relative w-full h-screen">
        <img
          src="/images/fondo-journal.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="flex flex-col items-center text-center">
            <p
              className="text-white text-[14px] font-normal"
              style={{ lineHeight: "22px", opacity: 0.8 }}
            >
              En Portada
            </p>
            <h1
              className="mt-[8px] text-white text-[56px] font-medium"
              style={{ lineHeight: "normal" }}
            >
              Spatial by nature
            </h1>
            <p
              className="mt-[8px] text-white text-[14px] font-normal"
              style={{ lineHeight: "22px", opacity: 0.8 }}
            >
              Espacio
            </p>
          </div>
        </div>
      </div>

      {/* 1. Martin Baas — mid, 5 col, centro-izquierda */}
      <div className="grid-container pt-[180px]">
        <div className="grid-12">
          <div className="col-start-4 col-span-5 reveal">
            <ArticleThumbnail
              variant="mid"
              article={{
                image: "/images/martin-baas.jpg",
                title: "De la poética al diseño: Martín Baas",
                category: "Entrevistas",
              }}
            />
          </div>
        </div>
      </div>

      {/* 2. Spa exterior — small, 3 col, centro-derecha */}
      <div className="grid-container pt-[180px]">
        <div className="grid-12">
          <div className="col-start-7 col-span-3 reveal">
            <ArticleThumbnail
              variant="small"
              article={{
                image: "/images/spa-exterior.png",
                title: "Spas de exterior: una tendencia en auge",
                category: "Espacios",
              }}
            />
          </div>
        </div>
      </div>

      {/* 3. Studio Banana — super, full width */}
      <div className="pt-[180px] reveal">
        <ArticleThumbnail
          variant="super"
          article={{
            image: "/images/studio-banana.jpg",
            label: "Spaces",
            title: "Studio Banana",
            category: "Espacios",
          }}
        />
      </div>

      {/* 4. As little design — big, 6 col, centrado */}
      <div className="grid-container pt-[180px]">
        <div className="grid-12">
          <div className="col-start-4 col-span-6 reveal">
            <ArticleThumbnail
              variant="big"
              article={{
                image: "/images/as-little-design.png",
                title: "As little design as possible",
                category: "Tendencias",
              }}
            />
          </div>
        </div>
      </div>

      {/* 5. Battersea — small, 3 col, izquierda */}
      <div className="grid-container pt-[180px]">
        <div className="grid-12">
          <div className="col-start-3 col-span-3 reveal">
            <ArticleThumbnail
              variant="small"
              article={{
                image: "/images/battersea.png",
                title: "Battersea Residential",
                category: "Espacios",
              }}
            />
          </div>
        </div>
      </div>

      {/* 6. Cocina — mid, 5 col, derecha */}
      <div className="grid-container pt-[180px] pb-[180px]">
        <div className="grid-12">
          <div className="col-start-7 col-span-5 reveal">
            <ArticleThumbnail
              variant="mid"
              article={{
                image: "/images/cocina.png",
                title: "Una cocina para cocinar",
                category: "Tendencias",
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom floating nav — glass pill (fixed) */}
      <div className="fixed bottom-[32px] left-0 right-0 z-40 flex justify-center">
        <div
          className={`flex items-center gap-[16px] px-[32px] pt-[12px] pb-[11px] rounded-[72px] backdrop-blur-[36px] text-white text-[14px] font-normal transition-all duration-500 ${
            overHero ? "bg-black/16" : "bg-black/[0.46]"
          }`}
          style={{ lineHeight: "normal" }}
        >
          <span className="font-medium">Journal</span>

          {hasSubs ? (
            <>
              <button
                onClick={() => { setActiveFilter(0); setActiveSub(0); }}
                className="cursor-pointer transition-opacity duration-300"
                style={{ opacity: 0.6 }}
              >
                Todo
              </button>

              <span className="flex items-center gap-[8px]">
                <span className="block w-[6px] h-[6px] rounded-full bg-white shrink-0" />
                {currentFilter.label}
              </span>

              <span className="text-white/30">|</span>

              {currentFilter.subs!.map((sub, i) => (
                <button
                  key={sub}
                  onClick={() => setActiveSub(i)}
                  className="cursor-pointer transition-opacity duration-300"
                  style={{ opacity: activeSub === i ? 1 : 0.6 }}
                >
                  {sub}
                </button>
              ))}
            </>
          ) : (
            FILTERS.map((filter, i) => {
              const isActive = activeFilter === i;
              return (
                <button
                  key={filter.label}
                  onClick={() => {
                    if (filter.href) { navigateTo(filter.href); return; }
                    setActiveFilter(i); setActiveSub(0);
                  }}
                  className="flex items-center gap-[8px] cursor-pointer transition-opacity duration-300"
                  style={{ opacity: isActive ? 1 : 0.6 }}
                >
                  <span
                    className="block w-[6px] h-[6px] rounded-full bg-white transition-all duration-300 shrink-0"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "scale(1)" : "scale(0)",
                    }}
                  />
                  {filter.label}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
