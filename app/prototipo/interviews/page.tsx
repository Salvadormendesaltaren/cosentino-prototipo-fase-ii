"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import ArticleThumbnail from "@/components/ArticleThumbnail";
import { useReveal } from "@/hooks/useReveal";
import { useProtoCurtain } from "../layout";
import basePath from "@/lib/basePath";

const SUB_NAV = ["MAGAZINE", "ENCUENTRA"];
const SUBS = ["Designers", "Architects", "Artists"];

export default function InterviewsPage() {
  const { navigateTo } = useProtoCurtain();
  // activeSubNav removed — SUB_NAV now navigates directly
  const [activeSub, setActiveSub] = useState(-1);
  const [overHero, setOverHero] = useState(true);
  const [searchMode, setSearchMode] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealRef = useReveal();

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
      <Header />

      {/* Breadcrumb */}
      <div className="absolute top-[66px] left-0 right-0 z-40 px-[32px] pt-[16px]">
        <p className="text-[14px] font-normal" style={{ lineHeight: "22px", letterSpacing: "-0.28px" }}>
          <span
            className="cursor-pointer transition-opacity hover:opacity-70 text-white/50"
            onClick={() => navigateTo("/prototipo")}
          >
            Magazine
          </span>
          <span className="text-white/50"> · </span>
          <span className="text-white font-medium">Interviews</span>
        </p>
      </div>

      {/* Sub-nav: MAGAZINE / ENCUENTRA — rendered above bottom pill */}

      {/* Hero — full viewport (clickable) */}
      <div
        className="relative w-full h-screen cursor-pointer group"
        onClick={() => navigateTo("/prototipo/articulo/continuidad-y-resistencia")}
      >
        <img
          src={`${basePath}/images/interview-moodboard.jpg`}
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
              Creatividad y espacio
            </h1>
            <p
              className="mt-[8px] text-white text-[14px] font-normal"
              style={{ lineHeight: "22px", opacity: 0.8 }}
            >
              Entrevistas · Designers
            </p>
          </div>
        </div>
      </div>

      {/* 1. Escritorio — mid, 5 col, centro-izquierda */}
      <div className="grid-container pt-[148px]">
        <div className="grid-12">
          <div className="col-start-4 col-span-5 reveal">
            <ArticleThumbnail
              variant="mid"
              article={{
                image: "/images/interview-escritorio.jpg",
                title: "El rincón que me inspira: Ana Morales",
                category: "Entrevistas · Designers",
              }}
            />
          </div>
        </div>
      </div>

      {/* 2. Sofa — small, 3 col, centro-derecha */}
      <div className="grid-container pt-[180px]">
        <div className="grid-12">
          <div className="col-start-7 col-span-3 reveal">
            <ArticleThumbnail
              variant="small"
              article={{
                image: "/images/interview-sofa.jpg",
                title: "La quietud como proyecto: Elena Roig",
                category: "Entrevistas · Artists",
              }}
            />
          </div>
        </div>
      </div>

      {/* 3. Martin Baas — big, 6 col, centrado */}
      <div className="grid-container pt-[180px]">
        <div className="grid-12">
          <div className="col-start-4 col-span-6 reveal">
            <ArticleThumbnail
              variant="big"
              article={{
                image: "/images/martin-baas.jpg",
                title: "De la poética al diseño: Martín Baas",
                category: "Entrevistas · Designers",
              }}
            />
          </div>
        </div>
      </div>

      {/* 4. Moodboard hero — super, full width */}
      <div className="pt-[180px] reveal">
        <ArticleThumbnail
          variant="super"
          article={{
            image: "/images/interview-escritorio.jpg",
            label: "Entrevistas",
            title: "Diálogo entre materiales",
            category: "Architects",
          }}
          href="/prototipo/articulo/continuidad-y-resistencia"
          onNavigate={navigateTo}
        />
      </div>

      {/* 5. Sofa — small, 3 col, izquierda */}
      <div className="grid-container pt-[180px] pb-[180px]">
        <div className="grid-12">
          <div className="col-start-3 col-span-3 reveal">
            <ArticleThumbnail
              variant="small"
              article={{
                image: "/images/interview-sofa.jpg",
                title: "Tejer el hogar: artesanía y confort",
                category: "Entrevistas · Artists",
              }}
            />
          </div>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-[90px] left-1/2 -translate-x-1/2 z-50 bg-black/80 backdrop-blur-[12px] text-white text-[13px] px-[20px] py-[8px] rounded-full animate-[fadeSlideIn_300ms_ease] whitespace-nowrap">
          Búsqueda temporalmente no disponible
        </div>
      )}

      {/* Sub-nav: MAGAZINE / ENCUENTRA */}
      <div className="fixed bottom-[80px] left-0 right-0 z-40 flex justify-center gap-[16px]">
        {SUB_NAV.map((item) => (
          <button
            key={item}
            onClick={() => {
              if (item === "MAGAZINE") navigateTo("/prototipo");
              else if (item === "ENCUENTRA") navigateTo("/prototipo/encuentra");
            }}
            className="text-white text-[13px] font-normal cursor-pointer transition-opacity duration-300"
            style={{
              lineHeight: "normal",
              opacity: 0.4,
            }}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Bottom floating nav — glass pill */}
      <div className="fixed bottom-[32px] left-0 right-0 z-40 flex justify-center">
        <div
          className={`flex items-center gap-[16px] px-[32px] pt-[12px] pb-[11px] rounded-[72px] backdrop-blur-[36px] text-white text-[14px] font-normal transition-all duration-500 ${
            overHero ? "bg-black/16" : "bg-black/[0.46]"
          }`}
          style={{ lineHeight: "normal" }}
          onMouseLeave={() => { if (searchMode) { searchTimeoutRef.current = setTimeout(() => setSearchMode(false), 5000); } }}
          onMouseEnter={() => { if (searchTimeoutRef.current) { clearTimeout(searchTimeoutRef.current); searchTimeoutRef.current = null; } }}
        >
          <button className="font-medium cursor-pointer" onClick={() => navigateTo("/prototipo")}>
            Magazine
          </button>

          {/* Lupa */}
          <button
            onClick={() => setSearchMode(!searchMode)}
            className="cursor-pointer transition-opacity duration-300 opacity-60 hover:opacity-100 shrink-0"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="5.5" cy="5.5" r="4.75" stroke="white" strokeWidth="1" />
              <line x1="9" y1="9" x2="13" y2="13" stroke="white" strokeWidth="1" />
            </svg>
          </button>

          {searchMode ? (
            <>
              <input
                type="text"
                placeholder="¿Qué estás buscando?"
                className="bg-transparent border-none outline-none text-white text-[14px] placeholder-white/40 w-[240px]"
                autoFocus
              />
              <button
                className="cursor-pointer text-white/60 hover:text-white transition-colors duration-300 text-[14px] shrink-0"
                onClick={() => { setSearchMode(false); setShowToast(true); setTimeout(() => setShowToast(false), 2500); }}
              >
                Buscar
              </button>
            </>
          ) : (
            <>
              <span className="flex items-center gap-[8px]">
                <span className="block w-[6px] h-[6px] rounded-full bg-white shrink-0" />
                Interviews
              </span>

              <span className="text-white/30">|</span>

              {SUBS.map((sub, i) => {
                const subHrefs: Record<string, string> = {
                  Designers: "/prototipo/interviews/designers",
                  Architects: "/prototipo/interviews/architects",
                  Artists: "/prototipo/interviews/artists",
                };
                return (
                  <button
                    key={sub}
                    onClick={() => { setActiveSub(i); if (subHrefs[sub]) navigateTo(subHrefs[sub]); }}
                    className="cursor-pointer transition-opacity duration-300"
                    style={{ opacity: activeSub === i ? 1 : 0.6 }}
                  >
                    {sub}
                  </button>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
