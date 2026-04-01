"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ArticleThumbnail from "@/components/ArticleThumbnail";
import { useReveal } from "@/hooks/useReveal";
import { useProtoCurtain } from "../layout";
import basePath from "@/lib/basePath";

const SUB_NAV = ["JOURNAL", "ENCUENTRA"];
const SUBS = ["Bathrooms", "Kitchens", "Interiors", "Facades", "Contract"];

export default function EspaciosPage() {
  const { navigateTo } = useProtoCurtain();
  const [activeSubNav, setActiveSubNav] = useState(0);
  const [activeSub, setActiveSub] = useState(0);
  const [overHero, setOverHero] = useState(true);
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
          src={`${basePath}/images/espacios-hero.png`}
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
              The Penthouse
            </h1>
            <p
              className="mt-[8px] text-white text-[14px] font-normal"
              style={{ lineHeight: "22px", opacity: 0.8 }}
            >
              Espacios · Facades
            </p>
          </div>
        </div>
      </div>

      {/* BACK link */}
      <div className="grid-container pt-[32px] flex justify-end">
        <button
          onClick={() => navigateTo("/prototipo")}
          className="text-[14px] font-normal cursor-pointer transition-opacity duration-300 hover:opacity-70"
          style={{ color: "rgba(0, 0, 0, 0.50)", lineHeight: "22px", letterSpacing: "-0.28px" }}
        >
          BACK &uarr;
        </button>
      </div>

      {/* 1. Niños — mid, 5 col, centrado */}
      <div className="grid-container pt-[148px]">
        <div className="grid-12">
          <div className="col-start-5 col-span-5 reveal">
            <ArticleThumbnail
              variant="mid"
              article={{
                image: "/images/espacios-ninos.png",
                title: "Un juego de niños: La cocina orgánica",
                category: "Espacios · Cocinas",
              }}
            />
          </div>
        </div>
      </div>

      {/* 2. Mediterránea — small, 3 col, izquierda */}
      <div className="grid-container pt-[180px]">
        <div className="grid-12">
          <div className="col-start-3 col-span-3 reveal">
            <ArticleThumbnail
              variant="small"
              article={{
                image: "/images/espacios-mediterranea.png",
                title: "Arquitectura mediterránea con Dekton: una villa con carácter",
                category: "Espacios · Salones",
              }}
            />
          </div>
        </div>
      </div>

      {/* 3. Continuidad — big, 6 col, centro-derecha */}
      <div className="grid-container pt-[180px]">
        <div className="grid-12">
          <div className="col-start-5 col-span-6 reveal">
            <ArticleThumbnail
              variant="big"
              article={{
                image: "/images/espacios-continuidad.png",
                title: "Continuidad y resistencia en una villa con carácter",
                category: "Espacios · Salones",
              }}
            />
          </div>
        </div>
      </div>

      {/* 4. Diáfano — super, full width */}
      <div className="pt-[180px] reveal">
        <ArticleThumbnail
          variant="super"
          article={{
            image: "/images/espacios-diafano.png",
            label: "Espacios · Facades",
            title: "Diáfano",
          }}
        />
      </div>

      {/* 5. En piedra — small, 3 col, centrado */}
      <div className="grid-container pt-[180px]">
        <div className="grid-12">
          <div className="col-start-5 col-span-3 reveal">
            <ArticleThumbnail
              variant="small"
              article={{
                image: "/images/espacios-enpiedra.png",
                title: "En piedra",
                category: "Espacios · Cocinas",
              }}
            />
          </div>
        </div>
      </div>

      {/* 6. Barroco — mid, 5 col, derecha */}
      <div className="grid-container pt-[180px] pb-[180px]">
        <div className="grid-12">
          <div className="col-start-7 col-span-5 reveal">
            <ArticleThumbnail
              variant="mid"
              article={{
                image: "/images/espacios-barroco.png",
                title: "Entre el barroco y el minimalismo",
                category: "Espacios · Baños",
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

          <button
            onClick={() => navigateTo("/prototipo")}
            className="cursor-pointer transition-opacity duration-300"
            style={{ opacity: 0.6 }}
          >
            Todo
          </button>

          <span className="flex items-center gap-[8px]">
            <span className="block w-[6px] h-[6px] rounded-full bg-white shrink-0" />
            Spaces
          </span>

          <span className="text-white/30">|</span>

          {SUBS.map((sub, i) => (
            <button
              key={sub}
              onClick={() => setActiveSub(i)}
              className="cursor-pointer transition-opacity duration-300"
              style={{ opacity: activeSub === i ? 1 : 0.6 }}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
