"use client";

import { useState, useEffect } from "react";
import basePath from "@/lib/basePath";

const NAV_LINKS = [
  "Colores", "Marcas", "Espacios", "Inspiración",
  "Simuladores", "Showroom", "Donde Comprar",
];

interface HeaderProps {
  dark?: boolean;
}

export default function Header({ dark }: HeaderProps = {}) {
  // If dark prop is provided, use it; otherwise fall back to scroll-based behavior
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (dark !== undefined) return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dark]);

  const isDark = dark !== undefined ? dark : scrolled;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="flex items-center justify-between px-[32px] h-[66px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <a href={`${basePath}/`}>
          <img
            src={`${basePath}/images/logo.svg`}
            alt="Cosentino"
            className={`h-[14px] w-auto transition-all duration-300 ${
              isDark ? "invert" : ""
            }`}
          />
        </a>
        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <span
              key={l}
              className={`text-[14px] cursor-pointer transition-colors duration-300 ${
                isDark ? "text-black" : "text-white"
              }`}
              style={{ opacity: 0.6 }}
            >
              {l}
            </span>
          ))}
        </div>
        <span
          className={`text-[14px] cursor-pointer transition-colors duration-300 ${
            isDark ? "text-black" : "text-white"
          }`}
          style={{ opacity: 0.6 }}
        >
          Profesionales
        </span>
      </div>
    </nav>
  );
}
