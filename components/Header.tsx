"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  "Colores", "Marcas", "Espacios", "Inspiración",
  "Simuladores", "Showroom", "Donde Comprar",
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 h-[66px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <a href="/">
          <img
            src="/images/logo.svg"
            alt="Cosentino"
            className={`h-[14px] w-auto transition-all duration-500 ${
              scrolled ? "invert" : ""
            }`}
          />
        </a>
        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <span
              key={l}
              className={`text-[14px] cursor-pointer transition-colors ${
                scrolled ? "text-neutral-700" : "text-white"
              }`}
            >
              {l}
            </span>
          ))}
        </div>
        <span
          className={`text-[14px] cursor-pointer transition-colors ${
            scrolled ? "text-neutral-700" : "text-white"
          }`}
        >
          Profesionales
        </span>
      </div>
    </nav>
  );
}
