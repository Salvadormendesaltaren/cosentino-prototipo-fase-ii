"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import { useReveal } from "@/hooks/useReveal";
import { useProtoCurtain } from "../layout";
import basePath from "@/lib/basePath";

const SUB_NAV = ["MAGAZINE", "ENCUENTRA"];

type Category = "all" | "espacios" | "contract";

interface MasonryItem {
  image: string;
  title: string;
  category: "espacios" | "contract";
  tags: string[];
  href?: string;
}

const ITEMS: MasonryItem[] = [
  // Kitchens (8)
  { image: "/images/kitchen-hexagonal.jpg", title: "Geometría hexagonal en la cocina", category: "espacios", tags: ["kitchens"] },
  { image: "/images/kitchen-luz-onda.jpg", title: "Luz y onda: cocina escultural", category: "espacios", tags: ["kitchens"] },
  { image: "/images/kitchen-rustica.jpg", title: "Cocina rústica contemporánea", category: "espacios", tags: ["kitchens"] },
  { image: "/images/kitchen-jardin.jpg", title: "La cocina que mira al jardín", category: "espacios", tags: ["kitchens"] },
  { image: "/images/kitchen-verde-smeg.jpg", title: "Verde Smeg: retro y actual", category: "espacios", tags: ["kitchens"] },
  { image: "/images/kitchen-marmol-isla.jpg", title: "Isla de mármol: el centro de todo", category: "espacios", tags: ["kitchens"] },
  { image: "/images/kitchen-limones.jpg", title: "Limones y luz mediterránea", category: "espacios", tags: ["kitchens"] },
  { image: "/images/kitchen-negra.jpg", title: "Total black: cocina sin concesiones", category: "espacios", tags: ["kitchens"] },
  // Contract (10)
  { image: "/images/contract-brutalismo.jpg", title: "Brutalismo y sensibilidad material", category: "contract", tags: ["public"] },
  { image: "/images/contract-museo-piedra.jpg", title: "Museo en piedra: volumen y silencio", category: "contract", tags: ["public"] },
  { image: "/images/contract-atrio-lucernario.jpg", title: "El atrio y el lucernario", category: "contract", tags: ["hotels"] },
  { image: "/images/contract-vidrio-oficinas.jpg", title: "Oficinas de vidrio y acero", category: "contract", tags: ["offices"] },
  { image: "/images/contract-hotel-cabana.jpg", title: "Hotel Cabaña: naturaleza habitada", category: "contract", tags: ["hotels"] },
  { image: "/images/contract-galeria-ceramica.jpg", title: "Galería cerámica: arte y superficie", category: "contract", tags: ["retail"] },
  { image: "/images/contract-fachada-piedra.jpg", title: "Fachada en piedra: lo eterno", category: "contract", tags: ["facades"] },
  { image: "/images/contract-paneles-blancos.jpg", title: "Paneles blancos: ritmo y luz", category: "contract", tags: ["facades"] },
  { image: "/images/contract-corredor-marmol.jpg", title: "Corredor de mármol: perspectiva infinita", category: "contract", tags: ["hotels"] },
  { image: "/images/contract-escalera-ladrillo.jpg", title: "Escalera en ladrillo: lo artesanal elevado", category: "contract", tags: ["public"] },
  // Interiors (7)
  { image: "/images/interior-boho-beige.jpg", title: "Boho beige: calidez sin esfuerzo", category: "espacios", tags: ["interiors"] },
  { image: "/images/interior-salon-gris.jpg", title: "Salón gris: elegancia contenida", category: "espacios", tags: ["interiors"] },
  { image: "/images/interior-butaca-amarilla.jpg", title: "La butaca amarilla como manifiesto", category: "espacios", tags: ["interiors"] },
  { image: "/images/interior-olivo-blanco.jpg", title: "Olivo y blanco: pureza mediterránea", category: "espacios", tags: ["interiors"] },
  { image: "/images/interior-cortinas-rosa.jpg", title: "Cortinas rosa: suavidad radical", category: "espacios", tags: ["interiors"] },
  { image: "/images/interior-arbol-luz.jpg", title: "Árbol de luz: naturaleza interior", category: "espacios", tags: ["interiors"] },
  { image: "/images/interior-sofa-tropical.jpg", title: "Sofá tropical: color y confort", category: "espacios", tags: ["interiors"] },
  // Espacios (4)
  { image: "/images/espacios-hero.png", title: "The Penthouse: vivir en lo alto", category: "espacios", tags: ["facades"] },
  { image: "/images/espacios-mediterranea.png", title: "Arquitectura mediterránea con Dekton", category: "espacios", tags: ["salones"] },
  { image: "/images/espacios-continuidad.png", title: "Continuidad y resistencia", category: "espacios", tags: ["salones"], href: "/prototipo/articulo/continuidad-y-resistencia" },
  { image: "/images/espacios-diafano.png", title: "Diáfano: la casa sin muros", category: "espacios", tags: ["facades"] },
  // Bathrooms (4)
  { image: "/images/bath-piedra.png", title: "Baño en piedra natural", category: "espacios", tags: ["bathrooms"] },
  { image: "/images/bath-combinar.png", title: "El arte de combinar texturas", category: "espacios", tags: ["bathrooms"] },
  { image: "/images/bath-vida-natural.png", title: "Vida natural en el baño", category: "espacios", tags: ["bathrooms"] },
  { image: "/images/bath-homenaje.png", title: "Homenaje al agua: baño escultórico", category: "espacios", tags: ["bathrooms"] },
  // Misc espacios (3)
  { image: "/images/spa-exterior.png", title: "Spas de exterior: tendencia en auge", category: "espacios", tags: ["outdoor"] },
  { image: "/images/as-little-design.png", title: "As little design as possible", category: "espacios", tags: ["tendencias"] },
  { image: "/images/spaces-cocina-terrazzo.jpg", title: "Terrazzo y cocina: textura viva", category: "espacios", tags: ["kitchens"] },
  // Contract extra (4)
  { image: "/images/contract-mediterraneo.jpg", title: "Mediterráneo contract: hotel entre olivos", category: "contract", tags: ["hotels"] },
  { image: "/images/contract-bloque-blanco.jpg", title: "Bloque blanco: geometría pura", category: "contract", tags: ["offices"] },
  { image: "/images/contract-curvas-plata.jpg", title: "Curvas en plata: museo contemporáneo", category: "contract", tags: ["public"] },
  { image: "/images/contract-damero.jpg", title: "Damero urbano: fachada con ritmo", category: "contract", tags: ["facades"] },
];

const PILL_FILTERS: { label: string; value: Category }[] = [
  { label: "Todo", value: "all" },
  { label: "Espacios", value: "espacios" },
  { label: "Contract", value: "contract" },
];

export default function EncuentraPage() {
  const { navigateTo } = useProtoCurtain();
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [searchMode, setSearchMode] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [filtering, setFiltering] = useState(false);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealRef = useReveal();

  const filteredItems = activeFilter === "all"
    ? ITEMS
    : ITEMS.filter((item) => item.category === activeFilter);

  function handleFilter(value: Category) {
    if (value === activeFilter) return;
    setFiltering(true);
    setTimeout(() => {
      setActiveFilter(value);
      setFiltering(false);
    }, 250);
  }

  // Re-trigger reveal on filter change
  useEffect(() => {
    const el = revealRef.current;
    if (!el) return;
    const targets = el.querySelectorAll(".reveal");
    targets.forEach((t) => t.classList.remove("visible"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [activeFilter, revealRef]);

  return (
    <div className="relative w-full min-h-screen bg-white" ref={revealRef}>
      {/* Header */}
      <Header dark />

      {/* Sub-nav: MAGAZINE / ENCUENTRA — above bottom pill */}

      {/* Masonry Grid */}
      <div
        className="grid-container pt-[120px] pb-[120px]"
        style={{ transition: "opacity 250ms ease", opacity: filtering ? 0 : 1 }}
      >
        <div className="masonry-grid">
          {filteredItems.map((item, i) => (
            <div
              key={`${item.image}-${activeFilter}`}
              className="masonry-item reveal"
              style={{ transitionDelay: `${Math.min(i * 60, 600)}ms` }}
            >
              <div
                className="relative overflow-hidden rounded-[4px] cursor-pointer group"
                onClick={() => {
                  if (item.href) navigateTo(item.href);
                }}
              >
                <Image
                  src={`${basePath}${item.image}`}
                  alt=""
                  width={800}
                  height={600}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-end p-[16px] md:p-[20px]">
                  <h3
                    className="text-white text-[14px] md:text-[16px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-[8px] group-hover:translate-y-0"
                    style={{ lineHeight: "normal", letterSpacing: "-0.32px", transition: "opacity 500ms ease, transform 500ms ease" }}
                  >
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
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
        {SUB_NAV.map((item, i) => (
          <button
            key={item}
            onClick={() => {
              if (item === "MAGAZINE") navigateTo("/prototipo");
            }}
            className="text-black/70 text-[13px] font-normal cursor-pointer transition-opacity duration-300"
            style={{
              lineHeight: "normal",
              opacity: i === 1 ? 1 : 0.4,
            }}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Bottom floating nav — glass pill */}
      <div className="fixed bottom-[32px] left-0 right-0 z-40 flex justify-center">
        <div
          className="flex items-center gap-[16px] px-[32px] pt-[12px] pb-[11px] rounded-[72px] backdrop-blur-[36px] bg-black/[0.46] text-white text-[14px] font-normal whitespace-nowrap transition-all duration-500"
          style={{ lineHeight: "normal" }}
          onMouseLeave={() => {
            if (searchMode) {
              searchTimeoutRef.current = setTimeout(() => setSearchMode(false), 5000);
            }
          }}
          onMouseEnter={() => {
            if (searchTimeoutRef.current) {
              clearTimeout(searchTimeoutRef.current);
              searchTimeoutRef.current = null;
            }
          }}
        >
          {/* Encuentra label with dot */}
          <span className="flex items-center gap-[8px] font-medium">
            <span className="block w-[6px] h-[6px] rounded-full bg-white shrink-0" />
            Encuentra
          </span>

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
                onClick={() => {
                  setSearchMode(false);
                  setShowToast(true);
                  setTimeout(() => setShowToast(false), 2500);
                }}
              >
                Buscar
              </button>
            </>
          ) : (
            <>
              <span className="text-white/30">|</span>
              {PILL_FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => handleFilter(f.value)}
                  className="cursor-pointer transition-opacity duration-300"
                  style={{ opacity: activeFilter === f.value ? 1 : 0.6 }}
                >
                  {f.label}
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
