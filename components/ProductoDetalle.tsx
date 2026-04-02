"use client";

import { useRef, useEffect, useState } from "react";
import Header from "@/components/Header";
import { useProtoCurtain } from "@/app/prototipo/layout";
import basePath from "@/lib/basePath";

export default function ProductoDetalle() {
  const { navigateTo } = useProtoCurtain();
  const [headerDark, setHeaderDark] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const fullwidthRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function update() {
      const headerBottom = 66;
      let overDark = false;
      [heroRef.current, fullwidthRef.current].forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < headerBottom && rect.bottom > 0) overDark = true;
      });
      setHeaderDark(!overDark);
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div style={{ background: "#F5F5F5" }}>
      <Header dark={headerDark} />

      {/* ═══ VOLVER — fixed sobre hero ═══ */}
      <div className="absolute top-[66px] left-0 right-0 z-40 px-[32px] pt-[16px]">
        <button
          onClick={() => navigateTo("/prototipo/articulo/continuidad-y-resistencia")}
          className={`text-[14px] font-normal cursor-pointer transition-all duration-300 hover:opacity-70 ${
            headerDark ? "text-black/50" : "text-white/50"
          }`}
          style={{ lineHeight: "22px", letterSpacing: "-0.28px" }}
        >
          &larr; Volver
        </button>
      </div>

      {/* ═══ HERO ═══ */}
      <div
        ref={heroRef}
        className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${basePath}/images/detalle-photo-01.png')` }}
      >
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/45 to-transparent pointer-events-none" />
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-[2]">
          <div className="flex flex-col gap-1.5">
            <h1
              className="text-white text-[44px] font-medium leading-[48px]"
              style={{ letterSpacing: "-2.2px" }}
            >
              Cinder Craze
            </h1>
            <p className="text-white/70 text-[14px]">Silestone — Loft</p>
          </div>
        </div>
      </div>

      {/* ═══ DESCRIPCIÓN ═══ */}
      <section className="px-6 py-12 flex flex-col items-start gap-6" style={{ background: "#F5F5F5" }}>
        <p
          className="text-black text-[32px] font-normal leading-[1.25]"
          style={{ letterSpacing: "-1.6px" }}
        >
          Grandes vetas e incrustaciones de grano de diversos tamaños recuerdan a la vía láctea en un cielo estrellado. El azul de su fondo refuerza la profundidad de Romantic Ash.
        </p>
        <a
          href="#"
          className="inline-block bg-black text-white text-[14px] font-medium px-5 py-3 rounded"
          style={{ letterSpacing: "-0.7px" }}
        >
          Pedir muestra
        </a>
      </section>

      {/* ═══ FOTO + SPECS ═══ */}
      <section className="mt-[120px] px-6 flex items-end gap-6">
        <div className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${basePath}/images/detalle-photo-01.png`}
            alt="Interior con chimenea"
            className="block object-cover"
            style={{ width: 612, height: 769 }}
          />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="grid grid-cols-2 gap-6">
            <div className="border-t border-black/15 pt-4 pb-6">
              <p className="text-black text-[14px] mb-1">Suede N-BOOST</p>
              <p className="text-black/70 text-[14px]">Las mismas propiedades que Suede más propiedades hidrófugas</p>
            </div>
            <div className="border-t border-black/15 pt-4 pb-6">
              <p className="text-black text-[14px] mb-1">Pulido N-BOOST</p>
              <p className="text-black/70 text-[14px]">Mismas propiedades que Polished más propiedades repelentes al agua.</p>
            </div>
          </div>
          <div className="border-t border-black/15 pt-4 pb-6">
            <p className="text-black text-[14px] mb-1">Formato</p>
            <p className="text-black/70 text-[14px]">327 x 159 cm</p>
          </div>
          <div className="border-t border-black/15 pt-4 pb-6">
            <p className="text-black text-[14px] mb-1">Espesores</p>
            <div className="flex flex-col gap-2.5 mt-1">
              <div className="flex items-center gap-3">
                <div className="h-[2px] bg-black" style={{ width: 30 }} />
                <span className="text-black/70 text-[14px]">1,2 cm</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-[2px] bg-black" style={{ width: 50 }} />
                <span className="text-black/70 text-[14px]">2,0 cm</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-[2px] bg-black" style={{ width: 75 }} />
                <span className="text-black/70 text-[14px]">3,0 cm</span>
              </div>
            </div>
          </div>
          <div className="border-t border-black/15 pt-4 pb-6">
            <p className="text-black text-[14px] mb-1">Recursos profesionales</p>
            <div className="text-black/70 text-[14px]">
              <p><a href="#" className="underline hover:text-black transition-colors">Archivo HD</a></p>
              <p><a href="#" className="underline hover:text-black transition-colors">Download for BIM</a></p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FULLWIDTH MARBLE ═══ */}
      <div ref={fullwidthRef} className="mt-[120px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${basePath}/images/detalle-marmol.png`}
          alt="Detalle del material"
          className="w-full block"
        />
      </div>

      {/* ═══ COLORES SIMILARES ═══ */}
      <section className="mt-[370px] px-6 pb-6 flex items-end gap-6">
        <h2
          className="text-black text-[32px] font-medium shrink-0 whitespace-nowrap pb-1"
          style={{ letterSpacing: "-1.6px" }}
        >
          Colores similares
        </h2>
        <div className="flex gap-6 ml-auto">
          {[
            { img: "similar-01.png", name: "Eter", sub: "Dekton - Dk natural" },
            { img: "similar-02.png", name: "Somnia", sub: "Dekton - Onirika" },
            { img: "similar-03.png", name: "Bromo", sub: "Dekton - Dk natural" },
            { img: "similar-04.png", name: "Domoos", sub: "Dekton - Dk solid" },
          ].map((c) => (
            <div key={c.name} className="w-[206px] shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${basePath}/images/${c.img}`}
                alt={c.name}
                className="w-[206px] block"
              />
              <p className="text-black text-[14px] mt-2.5" style={{ letterSpacing: "-0.42px" }}>
                {c.name}
              </p>
              <p className="text-[#B3B3B3] text-[14px]" style={{ letterSpacing: "-0.42px" }}>
                {c.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ DUAL IMAGES ═══ */}
      <div className="mt-[120px] px-6 pb-6 flex">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${basePath}/images/detalle-dual-01.png`}
          alt="Cocina con encimera"
          className="w-1/2 block object-cover"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${basePath}/images/detalle-dual-02.png`}
          alt="Comedor con mesa"
          className="w-1/2 block object-cover"
        />
      </div>
    </div>
  );
}
