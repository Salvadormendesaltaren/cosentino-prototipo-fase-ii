"use client";

import { useState, useRef } from "react";
import Header from "@/components/Header";
import ArticleThumbnail from "@/components/ArticleThumbnail";
import { useReveal } from "@/hooks/useReveal";
import { useProtoCurtain } from "../../layout";

const SUBS = ["Bathrooms", "Kitchens", "Interiors", "Facades"];

export default function InteriorsPage() {
  const { navigateTo } = useProtoCurtain();
  const [activeSub, setActiveSub] = useState(2);
  const [searchMode, setSearchMode] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealRef = useReveal();

  const subHrefs: Record<string, string> = {
    Bathrooms: "/prototipo/espacios/bathrooms",
    Kitchens: "/prototipo/espacios/kitchens",
    Interiors: "/prototipo/espacios/interiors",
  };

  return (
    <div className="relative w-full min-h-screen bg-white" ref={revealRef}>
      <Header dark />

      {/* Breadcrumb */}
      <div className="absolute top-[66px] left-0 right-0 z-40 px-[32px] pt-[16px]">
        <p className="text-[14px] font-normal" style={{ lineHeight: "22px", letterSpacing: "-0.28px" }}>
          <span
            className="cursor-pointer transition-opacity hover:opacity-70"
            style={{ color: "rgba(0, 0, 0, 0.50)" }}
            onClick={() => navigateTo("/prototipo")}
          >
            Journal
          </span>
          <span style={{ color: "rgba(0, 0, 0, 0.50)" }}> · </span>
          <span
            className="cursor-pointer transition-opacity hover:opacity-70"
            style={{ color: "rgba(0, 0, 0, 0.50)" }}
            onClick={() => navigateTo("/prototipo/espacios")}
          >
            Espacios
          </span>
          <span style={{ color: "rgba(0, 0, 0, 0.50)" }}> · </span>
          <span className="text-black font-medium">Interiors</span>
        </p>
      </div>

      {/* 1. Salón minimalista — mid, 5 col, centro-derecha */}
      <div className="pt-[120px]" />
      <div className="grid-container">
        <div className="grid-12">
          <div className="col-start-5 col-span-5 reveal">
            <ArticleThumbnail
              variant="mid"
              article={{
                image: "/images/spaces-salon.jpg",
                title: "La ventana como protagonista",
                category: "Espacios · Interiors",
              }}
            />
          </div>
        </div>
      </div>

      {/* 2. Dormitorio colorido — small, 3 col, izquierda */}
      <div className="grid-container pt-[180px]">
        <div className="grid-12">
          <div className="col-start-3 col-span-3 reveal">
            <ArticleThumbnail
              variant="small"
              article={{
                image: "/images/spaces-dormitorio.jpg",
                title: "Color y personalidad en el dormitorio",
                category: "Espacios · Interiors",
              }}
            />
          </div>
        </div>
      </div>

      {/* 3. As little design — small, 4 col, centro-derecha */}
      <div className="grid-container pt-[180px]">
        <div className="grid-12">
          <div className="col-start-6 col-span-4 reveal">
            <ArticleThumbnail
              variant="small"
              article={{
                image: "/images/as-little-design.png",
                title: "As little design as possible",
                category: "Espacios · Interiors",
              }}
            />
          </div>
        </div>
      </div>

      {/* 4. Salón hero — super, full width */}
      <div className="pt-[180px] reveal">
        <ArticleThumbnail
          variant="super"
          article={{
            image: "/images/spaces-salon.jpg",
            title: "Vivir en calma",
            category: "Espacios · Interiors",
          }}
          href="/prototipo/articulo/continuidad-y-resistencia"
          onNavigate={navigateTo}
        />
      </div>

      {/* 5. Dormitorio — mid, 5 col, derecha */}
      <div className="grid-container pt-[180px] pb-[180px]">
        <div className="grid-12">
          <div className="col-start-7 col-span-5 reveal">
            <ArticleThumbnail
              variant="mid"
              article={{
                image: "/images/spaces-dormitorio.jpg",
                title: "Texturas suaves, colores vivos",
                category: "Espacios · Interiors",
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

      {/* Bottom floating nav — glass pill */}
      <div className="fixed bottom-[32px] left-0 right-0 z-40 flex justify-center">
        <div
          className="flex items-center gap-[16px] px-[32px] pt-[12px] pb-[11px] rounded-[72px] backdrop-blur-[36px] bg-black/[0.46] text-white text-[14px] font-normal"
          style={{ lineHeight: "normal" }}
          onMouseLeave={() => { if (searchMode) { searchTimeoutRef.current = setTimeout(() => setSearchMode(false), 5000); } }}
          onMouseEnter={() => { if (searchTimeoutRef.current) { clearTimeout(searchTimeoutRef.current); searchTimeoutRef.current = null; } }}
        >
          <button className="font-medium cursor-pointer" onClick={() => navigateTo("/prototipo")}>
            Journal
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
              <button
                onClick={() => navigateTo("/prototipo/espacios")}
                className="cursor-pointer transition-opacity duration-300"
                style={{ opacity: 0.6 }}
              >
                Spaces
              </button>

              <span className="text-white/30">|</span>

              {SUBS.map((sub, i) => (
                <button
                  key={sub}
                  onClick={() => {
                    setActiveSub(i);
                    if (subHrefs[sub] && sub !== "Interiors") navigateTo(subHrefs[sub]);
                  }}
                  className="cursor-pointer transition-opacity duration-300"
                  style={{ opacity: activeSub === i ? 1 : 0.6 }}
                >
                  {sub === "Interiors" ? (
                    <span className="flex items-center gap-[8px]">
                      <span className="block w-[6px] h-[6px] rounded-full bg-white shrink-0" />
                      {sub}
                    </span>
                  ) : (
                    sub
                  )}
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
