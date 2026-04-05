"use client";

import { useState, useEffect } from "react";
import basePath from "@/lib/basePath";

const NAV_LINKS = [
  "Colores", "Marcas", "Espacios", "Inspiración",
  "Simuladores", "Showroom", "Donde Comprar",
];

interface HeaderProps {
  dark?: boolean;
  /** Show solid white bg when scrolled (for pages with white content like Encuentra) */
  withBg?: boolean;
}

export default function Header({ dark, withBg }: HeaderProps = {}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Pages with explicit dark prop: just track scroll for withBg
      // Pages without: switch to dark after scrolling past hero (~85vh)
      const threshold = dark !== undefined ? 10 : window.innerHeight * 0.85;
      setScrolled(window.scrollY > threshold);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [dark]);

  const isDark = dark !== undefined ? dark : scrolled;
  const showBg = withBg;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: showBg ? "#ffffff" : "transparent",
      }}
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
          {NAV_LINKS.map((l) => {
            if (l === "Inspiración" || l === "Donde Comprar") {
              const href = l === "Inspiración" ? `${basePath}/prototipo` : `${basePath}/`;
              return (
                <a
                  key={l}
                  href={href}
                  className={`text-[14px] cursor-pointer transition-colors duration-300 ${
                    isDark ? "text-black" : "text-white"
                  }`}
                  style={{ opacity: 0.6 }}
                >
                  {l}
                </a>
              );
            }
            return (
              <span
                key={l}
                className={`text-[14px] cursor-pointer transition-colors duration-300 ${
                  isDark ? "text-black" : "text-white"
                }`}
                style={{ opacity: 0.6 }}
              >
                {l}
              </span>
            );
          })}
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
