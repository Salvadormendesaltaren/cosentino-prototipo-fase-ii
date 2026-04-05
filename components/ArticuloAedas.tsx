"use client";

import { useRef, useEffect, useState } from "react";
import Header from "@/components/Header";
import { useProtoCurtain } from "@/app/prototipo/layout";
import basePath from "@/lib/basePath";

const MATERIALS = [
  { image: "/images/material-snowy-ibiza.png", brand: "Silestone", name: "Blanco Zeus", aplicacion: "Encimera e isla de cocina", espesor: "20 mm", superficie: "36 m2" },
  { image: "/images/material-snowy-ibiza.png", brand: "Dekton", name: "Entzo", aplicacion: "Recepción y zonas comunes", espesor: "12 mm", superficie: "52 m2" },
  { image: "/images/material-snowy-ibiza.png", brand: "Silestone", name: "Ethereal Glow", aplicacion: "Encimera de cocina", espesor: "20 mm", superficie: "18 m2" },
];

function ArticleImage({ src, className, style, material, materialHref, inspireHref }: {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  material?: string;
  materialHref?: string;
  inspireHref?: string;
}) {
  return (
    <div className="relative group/img overflow-hidden">
      <img src={src} alt="" className={className} style={style} />
      {material && (
        <div className="absolute bottom-0 left-0 right-0 flex items-center gap-[10px] px-[16px] py-[10px] bg-black/50 backdrop-blur-[8px] opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
          <span className="w-[12px] h-[12px] border border-white/60 rounded-[2px] shrink-0" />
          <a
            href={`${basePath}${materialHref || "/prototipo/producto/cinder-craze"}`}
            className="text-white text-[13px] hover:underline"
            style={{ lineHeight: "normal" }}
          >
            {material}
          </a>
          <span className="text-white/40">|</span>
          <a
            href={`${basePath}${inspireHref || "/prototipo/encuentra"}`}
            className="text-white text-[13px] hover:underline"
            style={{ lineHeight: "normal" }}
          >
            Inspírame
          </a>
        </div>
      )}
    </div>
  );
}

export default function ArticuloAedas() {
  const { navigateTo, goBack } = useProtoCurtain();
  const [headerDark, setHeaderDark] = useState(false);
  const [activeMaterial, setActiveMaterial] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function update() {
      const headerBottom = 66;
      let overDark = false;
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        if (rect.top < headerBottom && rect.bottom > 0) overDark = true;
      }
      setHeaderDark(!overDark);
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div style={{ background: "#FFFFFF" }}>
      <Header dark={headerDark} />

      {/* ═══ VOLVER ═══ */}
      <div className="absolute top-[66px] left-0 right-0 z-40 px-[32px] pt-[16px]">
        <button
          onClick={() => goBack()}
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
        style={{ backgroundImage: `url('${basePath}/images/aedas-hero.avif')` }}
      >
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/45 to-transparent pointer-events-none" />
        <div className="absolute bottom-[32px] left-[32px] right-[32px] flex items-end justify-between z-[2]">
          <div className="flex flex-col gap-1.5">
            <h1
              className="text-white text-[44px] font-medium leading-[48px]"
              style={{ letterSpacing: "-2.2px" }}
            >
              Blanco, luz y silencio: cocinas que hablan sin alzar la voz
            </h1>
            <p className="text-white/70 text-[14px]">Espacios &middot; Cocinas</p>
          </div>
        </div>
      </div>

      {/* ═══ INTRO + FICHA ═══ */}
      <div className="grid-container pt-[32px]">
        <div className="grid-12">
          <div className="col-start-1 col-span-6">
            <p
              className="text-black text-[32px] font-normal"
              style={{ lineHeight: "40px", letterSpacing: "-1.6px" }}
            >
              En la nueva promoción de Aedas Homes en Madrid, el estudio de interiorismo ha apostado por una paleta decididamente blanca que convierte cada cocina en un espacio de calma. Silestone Blanco Zeus, con su textura sutil y su resistencia probada, se extiende por encimeras e islas como un manto continuo que unifica geometría y luz natural.
            </p>
          </div>

          <div className="col-start-11 col-span-2 flex flex-col gap-[24px]">
            <div>
              <p className="text-[14px] font-normal" style={{ color: "rgba(0,0,0,0.50)", lineHeight: "22px", letterSpacing: "-0.28px" }}>
                Localización
              </p>
              <p className="text-black text-[14px] font-normal" style={{ lineHeight: "22px", letterSpacing: "-0.28px" }}>
                Madrid, España
              </p>
            </div>
            <div>
              <p className="text-[14px] font-normal" style={{ color: "rgba(0,0,0,0.50)", lineHeight: "22px", letterSpacing: "-0.28px" }}>
                Promotora
              </p>
              <p className="text-black text-[14px] font-normal" style={{ lineHeight: "22px", letterSpacing: "-0.28px" }}>
                Aedas Homes
              </p>
            </div>
            <div>
              <p className="text-[14px] font-normal" style={{ color: "rgba(0,0,0,0.50)", lineHeight: "22px", letterSpacing: "-0.28px" }}>
                Fecha de finalización
              </p>
              <p className="text-black text-[14px] font-normal" style={{ lineHeight: "22px", letterSpacing: "-0.28px" }}>
                2025
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ FOTO CENTRADA ═══ */}
      <div className="grid-container pt-[160px]">
        <div className="grid-12">
          <div className="col-start-4 col-span-6">
            <ArticleImage
              src={`${basePath}/images/aedas-cocina-01.avif`}
              className="w-full h-auto"
              material="Silestone - Blanco Zeus"
              materialHref="/prototipo/producto/cinder-craze"
              inspireHref="/prototipo/encuentra"
            />
          </div>
        </div>
      </div>

      {/* ═══ HERO FULL WIDTH — RECEPCIÓN ═══ */}
      <div className="grid-container pt-[240px]">
        <ArticleImage
          src={`${basePath}/images/aedas-recepcion-01.avif`}
          className="w-full h-auto"
          material="Dekton - Entzo"
          materialHref="/prototipo/producto/cinder-craze"
          inspireHref="/prototipo/encuentra"
        />
      </div>

      {/* ═══ TÍTULO + TEXTO — RECEPCIÓN ═══ */}
      <div className="grid-container pt-[32px]">
        <div className="grid-12">
          <div className="col-start-1 col-span-4">
            <h2
              className="text-black text-[32px] font-normal"
              style={{ lineHeight: "normal", letterSpacing: "-1.6px" }}
            >
              Una recepción que anticipa lo que viene
            </h2>
          </div>
          <div className="col-start-7 col-span-6">
            <p className="text-black text-[16px] font-normal" style={{ lineHeight: "22px", letterSpacing: "-0.32px" }}>
              El vestíbulo de acceso es la primera declaración de intenciones del edificio. Aedas Homes eligió Dekton Entzo para revestir el mostrador de recepción y los paños verticales que enmarcan el acceso a los ascensores. El tono cálido y la textura mineral de Entzo establecen un diálogo con la madera del mobiliario, creando una atmósfera acogedora sin renunciar a la resistencia que exige un espacio de alto tránsito.
            </p>
            <p className="mt-[24px] text-black text-[16px] font-normal" style={{ lineHeight: "22px", letterSpacing: "-0.32px" }}>
              &ldquo;Buscábamos un material que trasladara la calidez de un hogar a las zonas comunes. Dekton Entzo nos permitió trabajar con formatos grandes y juntas mínimas, lo que refuerza la sensación de continuidad y limpieza visual en todo el espacio de entrada&rdquo;, explica el equipo de diseño de Aedas Homes.
            </p>
          </div>
        </div>
      </div>

      {/* ═══ FOTO 5 COL IZQUIERDA ═══ */}
      <div className="grid-container pt-[212px]">
        <div className="grid-12">
          <div className="col-start-1 col-span-5">
            <ArticleImage
              src={`${basePath}/images/aedas-recepcion-02.avif`}
              className="w-full h-auto"
              material="Dekton - Entzo"
              materialHref="/prototipo/producto/cinder-craze"
              inspireHref="/prototipo/encuentra"
            />
          </div>
        </div>
      </div>

      {/* ═══ DOS FOTOS 6+6 ═══ */}
      <div className="grid-container pt-[240px]">
        <div className="grid-12">
          <div className="col-span-6">
            <ArticleImage
              src={`${basePath}/images/aedas-cocina-02.avif`}
              className="w-full object-cover"
              style={{ height: 720 }}
              material="Silestone - Blanco Zeus"
              materialHref="/prototipo/producto/cinder-craze"
              inspireHref="/prototipo/encuentra"
            />
          </div>
          <div className="col-span-6">
            <ArticleImage
              src={`${basePath}/images/aedas-ethereal-01.avif`}
              className="w-full object-cover"
              style={{ height: 720 }}
              material="Silestone - Ethereal Glow"
              materialHref="/prototipo/producto/cinder-craze"
              inspireHref="/prototipo/encuentra"
            />
          </div>
        </div>
      </div>

      {/* ═══ TÍTULO + TEXTO — ETHEREAL GLOW ═══ */}
      <div className="grid-container pt-[32px] pb-[196px]">
        <div className="grid-12">
          <div className="col-start-1 col-span-6">
            <h2
              className="text-black text-[32px] font-normal"
              style={{ lineHeight: "normal", letterSpacing: "-1.6px" }}
            >
              Ethereal Glow: la luz como material de proyecto
            </h2>
            <p className="mt-[16px] text-black text-[16px] font-normal" style={{ lineHeight: "22px", letterSpacing: "-0.32px" }}>
              En las viviendas de la planta superior, el estudio optó por Silestone Ethereal Glow como superficie de encimera. Su acabado translúcido, con vetas difusas que recuerdan al cuarzo natural retroiluminado, introduce una dimensión etérea al espacio de cocina. Bajo la luz de mañana que entra por los ventanales orientados al sur, la superficie parece emitir su propia luminosidad, disolviendo el límite entre lo construido y lo natural.
            </p>
            <p className="mt-[24px] text-black text-[16px] font-normal" style={{ lineHeight: "22px", letterSpacing: "-0.32px" }}>
              Este juego con la luz no es casual. Los interioristas de la promoción buscaban que el material no solo resistiera el uso diario de una cocina activa, sino que participara activamente en la composición lumínica del espacio. Con Ethereal Glow, cada hora del día ofrece una lectura ligeramente distinta de la encimera, algo que los futuros residentes descubrirán con el tiempo.
            </p>
          </div>
        </div>
      </div>

      {/* ═══ CARRUSEL FOTOS ═══ */}
      <ImageCarousel />

      {/* ═══ HERO FULL WIDTH 2 ═══ */}
      <div className="grid-container">
        <img src={`${basePath}/images/aedas-cocina-03.avif`} alt="" className="w-full h-auto" />
      </div>

      {/* ═══ MATERIALES UTILIZADOS ═══ */}
      <div className="grid-container pt-[32px]">
        <div className="grid-12">
          <div className="col-start-1 col-span-4 flex flex-col justify-between">
            <h2
              className="text-black text-[32px] font-normal"
              style={{ lineHeight: "normal", letterSpacing: "-1.6px" }}
            >
              Materiales utilizados
            </h2>

            <div>
              <p className="text-black text-[14px] font-medium" style={{ lineHeight: "22px" }}>
                {MATERIALS[activeMaterial].brand}
              </p>
              <p className="text-[14px] font-normal" style={{ color: "rgba(0,0,0,0.50)", lineHeight: "22px", letterSpacing: "-0.28px" }}>
                {MATERIALS[activeMaterial].name}
              </p>

              <div className="mt-[24px] flex flex-col gap-[12px]">
                <div>
                  <p className="text-[14px] font-normal" style={{ color: "rgba(0,0,0,0.50)", lineHeight: "22px", letterSpacing: "-0.28px" }}>Aplicación</p>
                  <p className="text-black text-[14px] font-normal" style={{ lineHeight: "22px", letterSpacing: "-0.28px" }}>{MATERIALS[activeMaterial].aplicacion}</p>
                </div>
                <div>
                  <p className="text-[14px] font-normal" style={{ color: "rgba(0,0,0,0.50)", lineHeight: "22px", letterSpacing: "-0.28px" }}>Espesor</p>
                  <p className="text-black text-[14px] font-normal" style={{ lineHeight: "22px", letterSpacing: "-0.28px" }}>{MATERIALS[activeMaterial].espesor}</p>
                </div>
                <div>
                  <p className="text-[14px] font-normal" style={{ color: "rgba(0,0,0,0.50)", lineHeight: "22px", letterSpacing: "-0.28px" }}>Superficie</p>
                  <p className="text-black text-[14px] font-normal" style={{ lineHeight: "22px", letterSpacing: "-0.28px" }}>{MATERIALS[activeMaterial].superficie}</p>
                </div>
              </div>

              <button
                className="mt-[32px] bg-black text-white text-[14px] font-normal px-[24px] pt-[12px] pb-[11px] rounded-[4px] cursor-pointer"
                style={{ lineHeight: "normal" }}
              >
                Ver material
              </button>
            </div>
          </div>

          <div className="col-start-8 col-span-5 flex gap-[16px]">
            <div className="flex flex-col gap-[8px] justify-end pb-[4px]">
              {MATERIALS.map((mat, i) => (
                <button
                  key={mat.name}
                  onClick={() => setActiveMaterial(i)}
                  className={`w-[48px] h-[48px] overflow-hidden cursor-pointer transition-opacity duration-300 ${
                    activeMaterial === i ? "opacity-100 ring-1 ring-black/20" : "opacity-40 hover:opacity-70"
                  }`}
                >
                  <img src={`${basePath}${mat.image}`} alt={mat.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="flex-1">
              <img src={`${basePath}${MATERIALS[activeMaterial].image}`} alt={MATERIALS[activeMaterial].name} className="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>

      {/* ═══ PROYECTOS SIMILARES ═══ */}
      <RelatedCarousel navigateTo={navigateTo} />

      {/* ═══ NEWSLETTER / CTA ═══ */}
      <div className="grid-container pb-[240px]">
        <div className="flex" style={{ minHeight: 720 }}>
          <div className="w-1/2 flex flex-col justify-between p-[32px]" style={{ background: "#E8E2DB" }}>
            <div>
              <h2 className="text-black text-[32px] font-normal" style={{ lineHeight: "normal", letterSpacing: "-1.6px" }}>
                ¿Tienes una reforma?<br />Podemos ayudarte
              </h2>
              <p className="mt-[16px] text-black text-[16px] font-normal" style={{ lineHeight: "22px", letterSpacing: "-0.32px" }}>
                Nuestra amplia red de colaboradores nos permite ofrecerte asesoramiento para cualquier reforma en los cinco continentes.
              </p>
            </div>
            <div>
              <button className="bg-black text-white text-[14px] font-normal px-[24px] pt-[12px] pb-[11px] rounded-[4px] cursor-pointer" style={{ lineHeight: "normal" }}>
                Quiero comprar
              </button>
            </div>
          </div>
          <div className="w-1/2">
            <img src={`${basePath}/images/aedas-recepcion-03.avif`} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-[#1A1A1A] overflow-hidden">
        <div className="grid-container pt-[64px]">
          <div className="grid grid-cols-4 gap-[32px]">
            <FooterColumn title="Empresa" links={["Sobre nosotros", "I+D e Innovación", "Seguridad en Cosentino", "Company Report 2024", "Silestone Institute", "Fundación Eduarda Justo"]} />
            <div className="flex flex-col gap-[8px]">
              <p className="text-white text-[14px] font-medium" style={{ lineHeight: "22px" }}>Atención al cliente</p>
              {["Dónde comprar", "Atención al Cliente", "Garantía | Silestone", "Garantía | Dekton", "Garantía | Sensa"].map((l) => (
                <span key={l} className="text-[14px] font-normal cursor-pointer hover:opacity-100 transition-opacity" style={{ color: "rgba(255,255,255,0.5)", lineHeight: "22px" }}>{l}</span>
              ))}
            </div>
            <div className="flex flex-col gap-[8px]">
              <p className="text-white text-[14px] font-medium" style={{ lineHeight: "22px" }}>Área profesional</p>
              {["Diseñadores", "Arquitectos", "Marmolistas", "Estudios de cocina y baño", "Cosentino Center", "Cosentino City"].map((l) => (
                <span key={l} className="text-[14px] font-normal cursor-pointer hover:opacity-100 transition-opacity" style={{ color: "rgba(255,255,255,0.5)", lineHeight: "22px" }}>{l}</span>
              ))}
            </div>
            <div className="flex flex-col gap-[8px]">
              <p className="text-white text-[14px] font-medium" style={{ lineHeight: "22px" }}>Empleo</p>
              {["Únete a Cosentino", "Cosentino FP"].map((l) => (
                <span key={l} className="text-[14px] font-normal cursor-pointer hover:opacity-100 transition-opacity" style={{ color: "rgba(255,255,255,0.5)", lineHeight: "22px" }}>{l}</span>
              ))}
              <p className="text-white text-[14px] font-medium mt-[16px]" style={{ lineHeight: "22px" }}>Síguenos:</p>
              <div className="flex gap-[8px] mt-[4px]">
                {["facebook", "instagram", "pinterest", "linkedin", "x", "youtube"].map((s) => (
                  <span key={s} className="w-[32px] h-[32px] rounded-full border border-white/30 flex items-center justify-center text-white/50 text-[12px] cursor-pointer hover:border-white/60 transition-colors">
                    {s === "facebook" && "f"}{s === "instagram" && "ig"}{s === "pinterest" && "P"}{s === "linkedin" && "in"}{s === "x" && "X"}{s === "youtube" && "▶"}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="grid-container mt-[80px] pb-[32px]">
          <img src={`${basePath}/images/logo-footer.svg`} alt="Cosentino" className="w-full h-auto select-none" style={{ opacity: 0.5 }} draggable={false} />
        </div>
      </footer>
    </div>
  );
}

const RELATED_ARTICLES = [
  { image: "/images/related-fireplace.png", author: "Eva Cuevas", quote: "\u201CLos materiales de Cosentino me resultan imprescindibles por su diseño, calidad y durabilidad.\u201D" },
  { image: "/images/related-02.png", author: "Tango", quote: "\u201CBuscamos materiales de calidad y durabilidad, que puedan resistir el paso del tiempo\u201D." },
  { image: "/images/related-01.png", author: "Studio Banana", quote: "\u201CLa arquitectura necesita materiales que hablen el mismo idioma que el espacio.\u201D" },
];

function RelatedCarousel({ navigateTo }: { navigateTo: (href: string) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstElementChild?.getBoundingClientRect().width ?? 0;
    scrollRef.current.scrollBy({ left: dir * (cardWidth + 32), behavior: "smooth" });
  };

  return (
    <div className="pt-[240px] pb-[240px]">
      <div className="grid-container">
        <div className="grid-12 items-baseline">
          <div className="col-span-6">
            <h2 className="text-black text-[32px] font-normal" style={{ lineHeight: "normal", letterSpacing: "-1.6px" }}>Proyectos similares</h2>
          </div>
          <div className="col-start-12 col-span-1 flex justify-end">
            <span className="text-[14px] font-normal cursor-pointer whitespace-nowrap" style={{ color: "rgba(0,0,0,0.50)", lineHeight: "22px", letterSpacing: "-0.28px", textDecoration: "underline" }}>Ver todas</span>
          </div>
        </div>
      </div>
      <div className="grid-container mt-[24px]">
        <div ref={scrollRef} className="flex gap-[32px] overflow-x-auto" style={{ scrollbarWidth: "none", scrollSnapType: "x mandatory" }}>
          {RELATED_ARTICLES.map((article, i) => (
            <div key={i} className="shrink-0 cursor-pointer group" style={{ width: "calc((100vw - 96px) / 2.15)", scrollSnapAlign: "start" }}>
              <div className="w-full overflow-hidden" style={{ aspectRatio: "540 / 400" }}>
                <img src={`${basePath}${article.image}`} alt="" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
              </div>
              <p className="mt-[12px] text-[14px] font-normal" style={{ color: "rgba(0,0,0,0.50)", lineHeight: "22px", letterSpacing: "-0.28px" }}>{article.author}</p>
              <p className="mt-[4px] text-black text-[16px] font-normal transition-opacity duration-300 group-hover:opacity-60" style={{ lineHeight: "22px", letterSpacing: "-0.64px" }}>{article.quote}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid-container flex justify-between mt-[32px]">
        <button onClick={() => scroll(-1)} className="cursor-pointer opacity-40 hover:opacity-100 transition-opacity">
          <svg width="48" height="12" viewBox="0 0 48 12" fill="none"><line x1="48" y1="6" x2="4" y2="6" stroke="currentColor" strokeWidth="0.75" /><path d="M4 6L10 1M4 6L10 11" stroke="currentColor" strokeWidth="0.75" /></svg>
        </button>
        <button onClick={() => scroll(1)} className="cursor-pointer opacity-40 hover:opacity-100 transition-opacity">
          <svg width="48" height="12" viewBox="0 0 48 12" fill="none"><line x1="0" y1="6" x2="44" y2="6" stroke="currentColor" strokeWidth="0.75" /><path d="M44 6L38 1M44 6L38 11" stroke="currentColor" strokeWidth="0.75" /></svg>
        </button>
      </div>
    </div>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="flex flex-col gap-[8px]">
      <p className="text-white text-[14px] font-medium" style={{ lineHeight: "22px" }}>{title}</p>
      {links.map((l) => (
        <span key={l} className="text-[14px] font-normal cursor-pointer hover:opacity-100 transition-opacity" style={{ color: "rgba(255,255,255,0.5)", lineHeight: "22px" }}>{l}</span>
      ))}
    </div>
  );
}

function ImageCarousel() {
  return (
    <div className="py-[240px]">
      <div className="flex flex-col items-center gap-[32px]">
        <div className="grid-container">
          <div className="grid-12">
            <div className="col-start-5 col-span-4">
              <img src={`${basePath}/images/aedas-ethereal-02.avif`} alt="" className="w-full h-auto" />
            </div>
          </div>
        </div>
        <div className="grid-container">
          <div className="grid-12">
            <div className="col-start-4 col-span-6">
              <img src={`${basePath}/images/aedas-calacatta.avif`} alt="" className="w-full h-auto" />
            </div>
          </div>
        </div>
        <div className="grid-container">
          <div className="grid-12">
            <div className="col-start-5 col-span-4">
              <img src={`${basePath}/images/aedas-recepcion-03.avif`} alt="" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
