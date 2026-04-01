"use client";

import { useState } from "react";
import VideoEmbed from "@/components/VideoEmbed";

export default function SistemaPage() {
  const [navActive, setNavActive] = useState(0);
  const [navHovered, setNavHovered] = useState<number | null>(null);
  const [overHero, setOverHero] = useState(true);

  const menuItems = [
    "1. Sobre el prototipo",
    "2. Investigación",
    "3. Cómo funciona el CMS",
    "4. Prototipo",
  ];

  return (
    <div className="min-h-screen bg-white pb-[120px]">
      {/* Header */}
      <div className="grid-container pt-[64px] pb-[48px] border-b border-black/10">
        <p
          className="text-black/40 text-[14px] font-normal"
          style={{ lineHeight: "22px" }}
        >
          Cosentino — Prototipo Fase II
        </p>
        <h1
          className="mt-[8px] text-black text-[40px] font-medium"
          style={{ lineHeight: "normal" }}
        >
          Sistema de diseño
        </h1>
      </div>

      {/* ---------- TIPOGRAFÍA ---------- */}
      <div className="grid-container mt-[80px]">
        <SectionLabel>Tipografía</SectionLabel>
        <p className="text-black/50 text-[16px] mt-[8px]" style={{ lineHeight: "20px" }}>
          Diagramm — Regular 400, Medium 500, Semi Bold 600, Bold 700
        </p>

        <div className="mt-[48px] flex flex-col gap-[48px]">
          {/* Hero título */}
          <StyleRow
            label="Hero / Título"
            specs="40px · Medium 500 · line-height: normal · white"
          >
            <p className="text-black text-[40px] font-medium" style={{ lineHeight: "normal" }}>
              De la pantalla a la grandeza.
            </p>
          </StyleRow>

          {/* Hero antetítulo */}
          <StyleRow
            label="Hero / Antetítulo"
            specs="14px · Regular 400 · line-height: 22px · white"
          >
            <p className="text-black text-[14px] font-normal" style={{ lineHeight: "22px" }}>
              Modulor x Cosentino
            </p>
          </StyleRow>

          {/* Texto destacado / Intro */}
          <StyleRow
            label="Texto destacado / Intro"
            specs="32px · Regular 400 · line-height: 40px · black"
          >
            <p className="text-black text-[32px] font-normal" style={{ lineHeight: "40px" }}>
              Con este concepto hemos querido poner en valor el diseño en la tecnología al servicio de soluciones funcionales y estéticas.
            </p>
          </StyleRow>

          {/* Título de sección */}
          <StyleRow
            label="Título de sección"
            specs="32px · Medium 500 · line-height: 40px · black"
          >
            <p className="text-black text-[32px] font-medium" style={{ lineHeight: "40px" }}>
              Fases de la investigación
            </p>
          </StyleRow>

          {/* Título columna */}
          <StyleRow
            label="Columna / Título"
            specs="18px · Regular 400 · line-height: 26px · rgba(0,0,0,0.75)"
          >
            <p className="text-[18px] font-normal" style={{ color: "rgba(0, 0, 0, 0.75)", lineHeight: "26px" }}>
              Auditoría del área de inspiración
            </p>
          </StyleRow>

          {/* Cuerpo columna */}
          <StyleRow
            label="Columna / Cuerpo"
            specs="16px · Regular 400 · line-height: 20px · black"
          >
            <p className="text-black text-[16px] font-normal" style={{ lineHeight: "20px" }}>
              Hemos analizado en profundidad el área de inspiración actual, identificando su estructura, contenidos y patrones de uso para detectar oportunidades de mejora.
            </p>
          </StyleRow>

          {/* Enlace columna */}
          <StyleRow
            label="Columna / Enlace"
            specs="18px · Regular 400 · line-height: 26px · rgba(0,0,0,0.75)"
          >
            <a
              href="#"
              className="text-[18px] font-normal hover:opacity-100 transition-opacity duration-300"
              style={{ color: "rgba(0, 0, 0, 0.75)", lineHeight: "26px" }}
              onClick={(e) => e.preventDefault()}
            >
              Saber más →
            </a>
          </StyleRow>

          {/* Nav / Item */}
          <StyleRow
            label="Nav / Item"
            specs="14px · Regular 400 · line-height: normal · white"
          >
            <span className="inline-flex items-center gap-[8px] px-[16px] py-[8px] rounded-[72px] bg-black/[0.46] text-white text-[14px] font-normal" style={{ lineHeight: "normal" }}>
              <span className="block w-[6px] h-[6px] rounded-full bg-white" />
              1. Sobre el prototipo
            </span>
          </StyleRow>

          {/* Botón */}
          <StyleRow
            label="Botón"
            specs="14px · Regular 400 · line-height: normal · white"
          >
            <span
              className="inline-block px-[32px] pt-[12px] pb-[11px] rounded-[72px] bg-black/[0.46] text-white text-[14px] font-normal"
              style={{ lineHeight: "normal" }}
            >
              Saber más
            </span>
          </StyleRow>
        </div>
      </div>

      {/* ---------- COLORES ---------- */}
      <div className="grid-container mt-[104px]">
        <SectionLabel>Colores</SectionLabel>

        <div className="grid-12 mt-[48px]">
          <ColorSwatch color="#FFFFFF" label="Background" border specs="--background: #ffffff" />
          <ColorSwatch color="#171717" label="Foreground" specs="--foreground: #171717" />
          <ColorSwatch color="#000000" label="Black" specs="Textos, footer, cortina" />
          <ColorSwatch color="rgba(0,0,0,0.75)" label="Black 75%" specs="Subtítulos, enlaces" />
        </div>

        <p className="text-black/50 text-[14px] mt-[48px] mb-[24px]" style={{ lineHeight: "22px" }}>
          Overlays & glass
        </p>
        <div className="grid-12">
          <ColorSwatch color="rgba(0,0,0,0.16)" label="Black/16" border specs="Botón default, nav sobre hero" />
          <ColorSwatch color="rgba(0,0,0,0.36)" label="Black/36" specs="Botón hover" />
          <ColorSwatch color="rgba(0,0,0,0.46)" label="Black/46" specs="Nav sobre blanco" />
        </div>
      </div>

      {/* ---------- GRID ---------- */}
      <div className="grid-container mt-[104px]">
        <SectionLabel>Grid</SectionLabel>
        <p className="text-black/50 text-[16px] mt-[8px]" style={{ lineHeight: "20px" }}>
          12 columnas · 32px margen · 32px gutter
        </p>

        <div className="mt-[48px] grid-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="col-span-1 h-[120px] bg-black/5 rounded-[4px] flex items-end justify-center pb-[8px]">
              <span className="text-black/30 text-[12px]">{i + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- COMPONENTES ---------- */}
      <div className="grid-container mt-[104px]">
        <SectionLabel>Componentes</SectionLabel>
      </div>

      {/* Hero */}
      <div className="grid-container mt-[48px]">
        <ComponentLabel>Hero</ComponentLabel>
        <p className="text-black/50 text-[14px] mt-[4px]" style={{ lineHeight: "22px" }}>
          Imagen full-width con overlay centrado: antetítulo + título + botones. Aspect ratio de la imagen original.
        </p>
      </div>
      <div className="mt-[24px] relative w-full" style={{ aspectRatio: "1440 / 512" }}>
        <img src="/hero.png" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center max-w-[542px] text-center">
            <p className="text-white text-[14px] font-normal" style={{ lineHeight: "22px" }}>
              Modulor x Cosentino
            </p>
            <h2 className="mt-[8px] text-white text-[40px] font-medium" style={{ lineHeight: "normal" }}>
              Sobre el prototipo.<br />De la pantalla a la grandeza.
            </h2>
            <div className="mt-[16px] flex items-center gap-[8px]">
              <span className="px-[32px] pt-[12px] pb-[11px] rounded-[72px] bg-black/16 backdrop-blur-[36px] text-white text-[14px] font-normal" style={{ lineHeight: "normal" }}>
                Saber más
              </span>
              <span className="flex items-center gap-[8px] px-[32px] pt-[12px] pb-[11px] rounded-[72px] bg-black/16 backdrop-blur-[36px] text-white text-[14px] font-normal" style={{ lineHeight: "normal" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                  <circle cx="8" cy="8" r="7.5" stroke="white" strokeWidth="1" />
                  <path d="M6.5 5L11 8L6.5 11V5Z" fill="white" />
                </svg>
                Al video
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* NavMenu */}
      <div className="grid-container mt-[80px]">
        <ComponentLabel>NavMenu</ComponentLabel>
        <p className="text-black/50 text-[14px] mt-[4px]" style={{ lineHeight: "22px" }}>
          Pill fija centrada. Dot indica activo/hover. Cambia opacidad de fondo según scroll (sobre hero vs sobre blanco).
        </p>

        <div className="mt-[32px] flex flex-col gap-[24px]">
          {/* Sobre hero */}
          <div>
            <p className="text-black/40 text-[12px] mb-[12px]">Sobre hero — bg-black/16</p>
            <div className="rounded-[16px] overflow-hidden relative" style={{ aspectRatio: "1440 / 120" }}>
              <img src="/hero.png" alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex justify-center pt-[24px]">
                <ul
                  className="flex items-center gap-[24px] px-[32px] pt-[12px] pb-[11px] rounded-[72px] bg-black/16 backdrop-blur-[36px] text-white text-[14px] font-normal"
                  style={{ lineHeight: "normal" }}
                >
                  {menuItems.map((label, i) => {
                    const isActive = navActive === i;
                    const isHovered = navHovered === i;
                    const showDot = isActive || isHovered;
                    return (
                      <li
                        key={i}
                        className="flex items-center gap-[8px] cursor-pointer transition-opacity duration-300"
                        style={{ opacity: isActive ? 1 : 0.6 }}
                        onClick={() => setNavActive(i)}
                        onMouseEnter={() => setNavHovered(i)}
                        onMouseLeave={() => setNavHovered(null)}
                      >
                        <span
                          className="block w-[6px] h-[6px] rounded-full bg-white transition-all duration-300 shrink-0"
                          style={{ opacity: showDot ? 1 : 0, transform: showDot ? "scale(1)" : "scale(0)" }}
                        />
                        {label}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          {/* Sobre blanco */}
          <div>
            <p className="text-black/40 text-[12px] mb-[12px]">Sobre blanco — bg-black/46</p>
            <div className="rounded-[16px] bg-[#f5f5f5] relative flex justify-center pt-[24px] pb-[24px]">
              <ul
                className="flex items-center gap-[24px] px-[32px] pt-[12px] pb-[11px] rounded-[72px] bg-black/[0.46] backdrop-blur-[36px] text-white text-[14px] font-normal"
                style={{ lineHeight: "normal" }}
              >
                {menuItems.map((label, i) => {
                  const isActive = navActive === i;
                  const isHovered = navHovered === i;
                  const showDot = isActive || isHovered;
                  return (
                    <li
                      key={i}
                      className="flex items-center gap-[8px] cursor-pointer transition-opacity duration-300"
                      style={{ opacity: isActive ? 1 : 0.6 }}
                      onClick={() => setNavActive(i)}
                      onMouseEnter={() => setNavHovered(i)}
                      onMouseLeave={() => setNavHovered(null)}
                    >
                      <span
                        className="block w-[6px] h-[6px] rounded-full bg-white transition-all duration-300 shrink-0"
                        style={{ opacity: showDot ? 1 : 0, transform: showDot ? "scale(1)" : "scale(0)" }}
                      />
                      {label}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="grid-container mt-[80px]">
        <ComponentLabel>Botones</ComponentLabel>
        <p className="text-black/50 text-[14px] mt-[4px]" style={{ lineHeight: "22px" }}>
          Glass pill. Hover: blur 36→6px, bg black/16→36. Transición 500ms ease-out.
        </p>

        <div className="mt-[32px] flex flex-col gap-[24px]">
          {/* Sobre imagen */}
          <div>
            <p className="text-black/40 text-[12px] mb-[12px]">Sobre imagen</p>
            <div className="rounded-[16px] overflow-hidden relative flex items-center justify-center py-[48px]" style={{ aspectRatio: "1440 / 200" }}>
              <img src="/hero.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="relative flex items-center gap-[8px]">
                <button
                  className="px-[32px] pt-[12px] pb-[11px] rounded-[72px] bg-black/16 backdrop-blur-[36px] hover:backdrop-blur-[6px] hover:bg-black/36 transition-all duration-500 ease-out text-white text-[14px] font-normal cursor-pointer"
                  style={{ lineHeight: "normal" }}
                >
                  Saber más
                </button>
                <button
                  className="flex items-center gap-[8px] px-[32px] pt-[12px] pb-[11px] rounded-[72px] bg-black/16 backdrop-blur-[36px] hover:backdrop-blur-[6px] hover:bg-black/36 transition-all duration-500 ease-out text-white text-[14px] font-normal cursor-pointer"
                  style={{ lineHeight: "normal" }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                    <circle cx="8" cy="8" r="7.5" stroke="white" strokeWidth="1" />
                    <path d="M6.5 5L11 8L6.5 11V5Z" fill="white" />
                  </svg>
                  Al video
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* IntroSection */}
      <div className="grid-container mt-[80px]">
        <ComponentLabel>IntroSection</ComponentLabel>
        <p className="text-black/50 text-[14px] mt-[4px]" style={{ lineHeight: "22px" }}>
          Texto introductorio centrado en 6 columnas (col-start-4, col-span-6). Padding top 104px.
          Incluye etiqueta de video y componente VideoEmbed.
        </p>
      </div>
      <div className="grid-container mt-[32px]">
        <div className="grid-12">
          <div className="col-span-4 md:col-start-4 md:col-span-6">
            <p className="text-black text-[32px] font-normal" style={{ lineHeight: "40px" }}>
              Con este concepto hemos querido poner en valor el diseño en la tecnología al servicio de soluciones funcionales y estéticas.
            </p>
            <p className="text-black text-[32px] font-normal" style={{ lineHeight: "40px", marginTop: 40 }}>
              El área que se nos ha pedido trabajar es compleja y contiene muchas decisiones detrás.
            </p>
          </div>
        </div>
      </div>

      {/* VideoEmbed */}
      <div className="grid-container mt-[80px]">
        <ComponentLabel>VideoEmbed</ComponentLabel>
        <p className="text-black/50 text-[14px] mt-[4px]" style={{ lineHeight: "22px" }}>
          Thumbnail de Loom con botón play 48px. Click carga iframe con autoplay. Aspect ratio 16:9.
        </p>
        <div className="mt-[32px]">
          <p className="text-black text-[32px] font-medium mb-[16px]" style={{ lineHeight: "40px" }}>
            Video explicativo
          </p>
          <VideoEmbed loomId="285713651ecf4fc4899cb7ae055e7af1" />
        </div>
      </div>

      {/* ThreeColumns */}
      <div className="grid-container mt-[80px]">
        <ComponentLabel>ThreeColumns</ComponentLabel>
        <p className="text-black/50 text-[14px] mt-[4px]" style={{ lineHeight: "22px" }}>
          3 columnas de 4/12 cada una. Título opcional. Enlaces opcionales con navegación entre secciones.
          Animación reveal con stagger (0ms, 100ms, 200ms).
        </p>

        <div className="mt-[32px]">
          <p className="text-black text-[32px] font-medium mb-[32px]" style={{ lineHeight: "40px" }}>
            Fases de la investigación
          </p>
          <div className="grid-12">
            {[
              {
                title: "Auditoría del área de inspiración",
                body: "Hemos analizado en profundidad el área de inspiración actual, identificando su estructura, contenidos y patrones de uso.",
              },
              {
                title: "Mapeo de arquitectura",
                body: "Hemos documentado y visualizado la arquitectura de información existente, estableciendo una base sólida.",
                link: "Saber más →",
              },
              {
                title: "Conversaciones con profesionales",
                body: "Hemos hablado con dos arquitectos que dirigen sendos estudios de arquitectura.",
              },
            ].map((col, i) => (
              <div key={i} className="col-span-4 flex flex-col">
                <h3 className="text-[18px] font-normal" style={{ color: "rgba(0, 0, 0, 0.75)", lineHeight: "26px" }}>
                  {col.title}
                </h3>
                <p className="mt-[8px] text-black text-[16px] font-normal" style={{ lineHeight: "20px" }}>
                  {col.body}
                </p>
                {col.link && (
                  <a
                    href="#"
                    className="mt-[16px] text-[18px] font-normal hover:opacity-100 transition-opacity duration-300"
                    style={{ color: "rgba(0, 0, 0, 0.75)", lineHeight: "26px" }}
                    onClick={(e) => e.preventDefault()}
                  >
                    {col.link}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="grid-container mt-[80px]">
        <ComponentLabel>Footer</ComponentLabel>
        <p className="text-black/50 text-[14px] mt-[4px]" style={{ lineHeight: "22px" }}>
          Fondo negro. Aspect ratio 1440/400. Logos SVG posicionados absolute bottom-32px left-24px. Margin-top 200px del componente anterior.
        </p>
      </div>
      <div className="mt-[32px] bg-black relative" style={{ aspectRatio: "1440 / 400" }}>
        <div className="absolute bottom-[32px] left-[24px]">
          <img src="/logos.svg" alt="Cosentino × Modulor Studios" className="h-auto w-auto" style={{ width: 400 }} />
        </div>
      </div>

      {/* ---------- ANIMACIONES ---------- */}
      <div className="grid-container mt-[104px]">
        <SectionLabel>Animaciones</SectionLabel>

        <div className="mt-[48px] flex flex-col gap-[40px]">
          <AnimRow
            label="Scroll Reveal"
            specs="opacity 0→1 · translateY(20px→0) · 600ms · cubic-bezier(0.25, 0.46, 0.45, 0.94) · trigger: 15% visible"
          />
          <AnimRow
            label="Reveal Stagger"
            specs="Hijos con delay escalonado: 0ms, 100ms, 200ms"
          />
          <AnimRow
            label="Cortina (transición de sección)"
            specs="Panel negro translateY: 100%→0%→-100% · 600ms por fase · cubic-bezier(0.65, 0, 0.35, 1)"
          />
          <AnimRow
            label="Botón hover"
            specs="backdrop-blur: 36px→6px · bg: black/16→black/36 · 500ms ease-out"
          />
          <AnimRow
            label="Nav dot"
            specs="scale: 0→1 · opacity: 0→1 · 300ms"
          />
          <AnimRow
            label="Nav items"
            specs="opacity: 0.6→1 (activo/hover) · 300ms"
          />
          <AnimRow
            label="Nav fondo"
            specs="black/16 (sobre hero) ↔ black/46 (sobre blanco) · 500ms"
          />
        </div>
      </div>

      {/* ---------- ESPACIADO ---------- */}
      <div className="grid-container mt-[104px]">
        <SectionLabel>Espaciado</SectionLabel>

        <div className="mt-[48px] grid-12">
          <div className="col-span-6">
            <table className="w-full text-[14px]" style={{ lineHeight: "20px" }}>
              <thead>
                <tr className="text-left text-black/40 border-b border-black/10">
                  <th className="pb-[12px] font-normal">Elemento</th>
                  <th className="pb-[12px] font-normal">Valor</th>
                </tr>
              </thead>
              <tbody className="text-black">
                {[
                  ["Grid margen lateral", "32px"],
                  ["Grid gutter", "32px"],
                  ["IntroSection padding-top", "104px"],
                  ["IntroSection padding-bottom", "32px"],
                  ["Video margin-top (desde intro)", "104px"],
                  ["Video label margin-bottom", "16px"],
                  ["ThreeColumns → Video", "32px"],
                  ["Footer margin-top", "200px"],
                  ["Antetítulo → Título", "8px"],
                  ["Título → Botones", "16px"],
                  ["Gap entre botones", "8px"],
                  ["Botón padding horizontal", "32px"],
                  ["Botón padding top / bottom", "12px / 11px"],
                  ["Nav padding-top (desde viewport)", "24px"],
                  ["Párrafos intro entre sí", "40px"],
                  ["Columna título → body", "8px"],
                  ["Columna body → link", "16px"],
                ].map(([elem, val], i) => (
                  <tr key={i} className="border-b border-black/5">
                    <td className="py-[10px]">{elem}</td>
                    <td className="py-[10px] text-black/60">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Helpers ---------- */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-black text-[32px] font-medium" style={{ lineHeight: "40px" }}>
      {children}
    </h2>
  );
}

function ComponentLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-black text-[24px] font-medium" style={{ lineHeight: "normal" }}>
      {children}
    </h3>
  );
}

function StyleRow({
  label,
  specs,
  children,
}: {
  label: string;
  specs: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[12px] pb-[48px] border-b border-black/5">
      <div className="flex items-baseline gap-[16px]">
        <span className="text-black text-[14px] font-medium shrink-0">{label}</span>
        <span className="text-black/40 text-[12px]">{specs}</span>
      </div>
      <div>{children}</div>
    </div>
  );
}

function ColorSwatch({
  color,
  label,
  specs,
  border,
}: {
  color: string;
  label: string;
  specs: string;
  border?: boolean;
}) {
  return (
    <div className="col-span-3 flex flex-col gap-[8px]">
      <div
        className="w-full h-[80px] rounded-[8px]"
        style={{
          backgroundColor: color,
          border: border ? "1px solid rgba(0,0,0,0.1)" : undefined,
        }}
      />
      <p className="text-black text-[14px] font-medium">{label}</p>
      <p className="text-black/50 text-[12px]">{specs}</p>
    </div>
  );
}

function AnimRow({ label, specs }: { label: string; specs: string }) {
  return (
    <div className="flex flex-col gap-[4px] pb-[16px] border-b border-black/5">
      <span className="text-black text-[16px] font-medium">{label}</span>
      <span className="text-black/50 text-[14px]" style={{ lineHeight: "20px" }}>{specs}</span>
    </div>
  );
}
