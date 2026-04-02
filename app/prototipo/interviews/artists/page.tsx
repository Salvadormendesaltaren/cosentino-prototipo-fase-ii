"use client";

import { useState, useRef } from "react";
import Header from "@/components/Header";
import ArticleThumbnail from "@/components/ArticleThumbnail";
import { useReveal } from "@/hooks/useReveal";
import { useProtoCurtain } from "../../layout";

const SUBS = ["Designers", "Architects", "Artists"];

export default function ArtistsPage() {
  const { navigateTo } = useProtoCurtain();
  const [activeSub, setActiveSub] = useState(2);
  const [searchMode, setSearchMode] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealRef = useReveal();

  return (
    <div className="relative w-full min-h-screen bg-white overflow-x-hidden" ref={revealRef}>
      <Header dark />

      {/* Breadcrumb */}
      <div className="absolute top-[66px] left-0 right-0 z-40 px-[32px] pt-[16px]">
        <p className="text-[14px] font-normal" style={{ lineHeight: "22px", letterSpacing: "-0.28px" }}>
          <span
            className="cursor-pointer transition-opacity hover:opacity-70"
            style={{ color: "rgba(0, 0, 0, 0.50)" }}
            onClick={() => navigateTo("/prototipo")}
          >
            Magazine
          </span>
          <span style={{ color: "rgba(0, 0, 0, 0.50)" }}> · </span>
          <span
            className="cursor-pointer transition-opacity hover:opacity-70"
            style={{ color: "rgba(0, 0, 0, 0.50)" }}
            onClick={() => navigateTo("/prototipo/interviews")}
          >
            Interviews
          </span>
          <span style={{ color: "rgba(0, 0, 0, 0.50)" }}> · </span>
          <span className="text-black font-medium">Artists</span>
        </p>
      </div>

      {/* 1. Pintura viva — mid, 5 col */}
      <div className="pt-[120px]" />
      <div className="grid-container">
        <div className="grid-12">
          <div className="col-start-5 col-span-5 reveal">
            <ArticleThumbnail
              variant="mid"
              article={{
                image: "/images/interview-artist-abstral.jpg",
                title: "Pintura viva: el rostro como lienzo",
                category: "Entrevistas · Artists",
              }}
            />
          </div>
        </div>
      </div>

      {/* 2. Neon y contemplacion — small, 3 col */}
      <div className="grid-container pt-[180px]">
        <div className="grid-12">
          <div className="col-start-2 col-span-3 reveal">
            <ArticleThumbnail
              variant="small"
              article={{
                image: "/images/interview-artist-mahdis.jpg",
                title: "Neon y contemplacion: Erik Holm",
                category: "Entrevistas · Artists",
              }}
            />
          </div>
        </div>
      </div>

      {/* 3. Generacion estudio — big, 6 col */}
      <div className="grid-container pt-[180px]">
        <div className="grid-12">
          <div className="col-start-3 col-span-6 reveal">
            <ArticleThumbnail
              variant="big"
              article={{
                image: "/images/interview-artistas.jpg",
                title: "Generacion estudio: crear sin fronteras",
                category: "Entrevistas · Artists",
              }}
            />
          </div>
        </div>
      </div>

      {/* 4. La calle como escenario — super, full width */}
      <div className="pt-[180px] reveal">
        <ArticleThumbnail
          variant="super"
          article={{
            image: "/images/interview-artist-skater.jpg",
            title: "La calle como escenario",
            category: "Entrevistas · Artists",
          }}
          href="/prototipo/articulo/continuidad-y-resistencia"
          onNavigate={navigateTo}
        />
      </div>

      {/* Spacer final */}
      <div className="pb-[180px]" />

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-[90px] left-1/2 -translate-x-1/2 z-50 bg-black/80 backdrop-blur-[12px] text-white text-[13px] px-[20px] py-[8px] rounded-full animate-[fadeSlideIn_300ms_ease] whitespace-nowrap">
          Busqueda temporalmente no disponible
        </div>
      )}

      {/* Bottom floating nav — glass pill */}
      <div className="fixed bottom-[20px] left-0 right-0 z-40 flex justify-center">
        <div
          className="flex items-center gap-[16px] px-[32px] pt-[12px] pb-[11px] rounded-[72px] backdrop-blur-[36px] bg-black/[0.46] text-white text-[14px] font-normal"
          style={{ lineHeight: "normal" }}
          onMouseLeave={() => { if (searchMode) { searchTimeoutRef.current = setTimeout(() => setSearchMode(false), 5000); } }}
          onMouseEnter={() => { if (searchTimeoutRef.current) { clearTimeout(searchTimeoutRef.current); searchTimeoutRef.current = null; } }}
        >
          <button className="cursor-pointer transition-opacity duration-300" style={{ opacity: 0.5 }} onClick={() => navigateTo("/prototipo")}>
            Magazine
          </button>
          <button className="cursor-pointer transition-opacity duration-300" style={{ opacity: 0.5 }} onClick={() => navigateTo("/prototipo/encuentra")}>
            Encuentra
          </button>
          <span className="text-white/30">|</span>

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
                placeholder="Que estas buscando?"
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
              <button
                onClick={() => navigateTo("/prototipo/interviews")}
                className="cursor-pointer transition-opacity duration-300"
                style={{ opacity: 0.6 }}
              >
                Interviews
              </button>

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
                    onClick={() => {
                      setActiveSub(i);
                      if (subHrefs[sub] && sub !== "Artists") navigateTo(subHrefs[sub]);
                    }}
                    className="cursor-pointer transition-opacity duration-300"
                    style={{ opacity: activeSub === i ? 1 : 0.6 }}
                  >
                    {sub === "Artists" ? (
                      <span className="flex items-center gap-[8px]">
                        <span className="block w-[6px] h-[6px] rounded-full bg-white shrink-0" />
                        {sub}
                      </span>
                    ) : (
                      sub
                    )}
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
