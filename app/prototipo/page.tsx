"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Header from "@/components/Header";
import ArticleThumbnail from "@/components/ArticleThumbnail";
import { useReveal } from "@/hooks/useReveal";
import { useProtoCurtain } from "./layout";
import basePath from "@/lib/basePath";

const SUB_NAV = ["JOURNAL", "ENCUENTRA"];

const FILTERS: { label: string; href?: string; subs?: string[] }[] = [
  { label: "Todo" },
  { label: "Spaces", href: "/prototipo/espacios", subs: ["Bathrooms", "Kitchens", "Interiors", "Facades"] },
  { label: "Interviews", href: "/prototipo/interviews", subs: ["Designers", "Architects", "Artists"] },
  { label: "Contract", href: "/prototipo/contract", subs: ["Hotels", "Offices", "Retail", "Public"] },
  { label: "Tendencias", subs: ["Materials", "Color", "Sustainability"] },
  { label: "Reformas", subs: ["Residential", "Commercial", "Outdoor"] },
];

const SUB_HREFS: Record<string, string> = {
  Bathrooms: "/prototipo/espacios/bathrooms",
  Kitchens: "/prototipo/espacios/kitchens",
  Interiors: "/prototipo/espacios/interiors",
};

export default function PrototipoPage() {
  const { navigateTo } = useProtoCurtain();
  // activeSubNav removed — SUB_NAV now navigates directly
  const [activeFilter, setActiveFilter] = useState(0);
  const [activeSub, setActiveSub] = useState(0);
  const [overHero, setOverHero] = useState(true);
  const [searchMode, setSearchMode] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const revealRef = useReveal();
  const pillRef = useRef<HTMLDivElement>(null);
  const collapsedLeftRef = useRef<number | null>(null);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentFilter = FILTERS[activeFilter];
  const hasSubs = activeFilter > 0 && currentFilter.subs;

  // Lock the pill's left edge before any state change so items don't shift
  const lockPill = useCallback(() => {
    if (pillRef.current) {
      collapsedLeftRef.current = pillRef.current.getBoundingClientRect().left;
    }
  }, []);

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
            onClick={() => {
              if (item === "ENCUENTRA") navigateTo("/prototipo/encuentra");
            }}
            className="text-white text-[14px] font-normal cursor-pointer transition-opacity duration-300"
            style={{
              lineHeight: "normal",
              opacity: i === 0 ? 1 : 0.5,
            }}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Hero — full viewport (clickable) */}
      <div
        className="relative w-full h-screen cursor-pointer group"
        onClick={() => navigateTo("/prototipo/articulo/continuidad-y-resistencia")}
      >
        <img
          src={`${basePath}/images/fondo-journal.png`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
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

      {/* Toast — búsqueda no disponible */}
      {showToast && (
        <div className="fixed bottom-[90px] left-1/2 -translate-x-1/2 z-50 bg-black/80 backdrop-blur-[12px] text-white text-[13px] px-[20px] py-[8px] rounded-full animate-[fadeSlideIn_300ms_ease] whitespace-nowrap">
          Búsqueda temporalmente no disponible
        </div>
      )}

      {/* Bottom floating nav — glass pill (fixed) */}
      <div
        ref={pillRef}
        className={`fixed bottom-[32px] z-40 flex items-center gap-[16px] px-[32px] pt-[12px] pb-[11px] rounded-[72px] backdrop-blur-[36px] text-white text-[14px] font-normal whitespace-nowrap transition-colors duration-500 ${
          overHero ? "bg-black/16" : "bg-black/[0.46]"
        }`}
        style={{
          lineHeight: "normal",
          left: collapsedLeftRef.current !== null ? collapsedLeftRef.current : "50%",
          transform: collapsedLeftRef.current !== null ? "none" : "translateX(-50%)",
        }}
        onMouseLeave={() => {
          setActiveFilter(0); setActiveSub(0); collapsedLeftRef.current = null;
          if (searchMode) {
            searchTimeoutRef.current = setTimeout(() => { setSearchMode(false); }, 5000);
          }
        }}
        onMouseEnter={() => {
          if (searchTimeoutRef.current) { clearTimeout(searchTimeoutRef.current); searchTimeoutRef.current = null; }
        }}
      >
        <button
          className="font-medium cursor-pointer"
          onClick={() => navigateTo("/prototipo")}
          onMouseEnter={() => { if (hasSubs) { lockPill(); setActiveFilter(0); setActiveSub(0); } }}
        >
          Journal
        </button>

        {/* Lupa */}
        <button
          onClick={() => { lockPill(); setSearchMode(!searchMode); setActiveFilter(0); setActiveSub(0); }}
          className="cursor-pointer transition-opacity duration-300 opacity-60 hover:opacity-100 shrink-0"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="5.5" cy="5.5" r="4.75" stroke="white" strokeWidth="1" />
            <line x1="9" y1="9" x2="13" y2="13" stroke="white" strokeWidth="1" />
          </svg>
        </button>

        {/* Search mode */}
        {searchMode && (
          <>
            <input
              type="text"
              placeholder="¿Qué estás buscando?"
              className="bg-transparent border-none outline-none text-white text-[14px] placeholder-white/40 w-[240px]"
              autoFocus
            />
            <button
              className="cursor-pointer text-white/60 hover:text-white transition-colors duration-300 text-[14px] shrink-0"
              onClick={() => {
                setSearchMode(false);
                collapsedLeftRef.current = null;
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2500);
              }}
            >
              Buscar
            </button>
          </>
        )}

        {/* Filters — hidden in search mode */}
        {!searchMode && (
          <>
            {FILTERS.map((filter, i) => {
              if (i === 0) return null;
              if (hasSubs && i > activeFilter) return null;
              const isActive = activeFilter === i;
              const showDot = hasSubs ? i === activeFilter : isActive;
              return (
                <button
                  key={filter.label}
                  onClick={() => {
                    if (filter.href) { navigateTo(filter.href); return; }
                    setActiveFilter(i); setActiveSub(0);
                  }}
                  onMouseEnter={() => {
                    if (filter.subs) { lockPill(); setActiveFilter(i); setActiveSub(0); }
                    else if (hasSubs) { lockPill(); setActiveFilter(0); setActiveSub(0); }
                  }}
                  className="flex items-center gap-[8px] cursor-pointer transition-opacity duration-300"
                  style={{ opacity: showDot ? 1 : 0.6 }}
                >
                  <span
                    className="block w-[6px] h-[6px] rounded-full bg-white transition-all duration-300 shrink-0"
                    style={{
                      opacity: showDot ? 1 : 0,
                      transform: showDot ? "scale(1)" : "scale(0)",
                    }}
                  />
                  {filter.label}
                </button>
              );
            })}

            {hasSubs && (
              <>
                <span className="text-white/30">|</span>
                {currentFilter.subs?.map((sub, i) => (
                  <button
                    key={sub}
                    onClick={() => {
                      setActiveSub(i);
                      if (SUB_HREFS[sub]) navigateTo(SUB_HREFS[sub]);
                    }}
                    className="cursor-pointer transition-opacity duration-300"
                    style={{ opacity: activeSub === i ? 1 : 0.6 }}
                  >
                    {sub}
                  </button>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
