"use client";

import { useState, useRef, useEffect } from "react";

const menuItems = [
  "1. Sobre el prototipo",
  "2. Investigación",
  "3. Cómo funciona el CMS",
  "4. Prototipo",
];

interface NavMenuProps {
  active: number;
  onSelect: (index: number) => void;
  overHero: boolean;
}

export default function NavMenu({ active, onSelect, overHero }: NavMenuProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closedRef = useRef<HTMLDivElement>(null);
  const openRef = useRef<HTMLDivElement>(null);
  const [closedSize, setClosedSize] = useState({ w: 0, h: 0 });
  const [openSize, setOpenSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (closedRef.current) {
      setClosedSize({
        w: closedRef.current.scrollWidth,
        h: closedRef.current.scrollHeight,
      });
    }
    if (openRef.current) {
      setOpenSize({
        w: openRef.current.scrollWidth,
        h: openRef.current.scrollHeight,
      });
    }
  }, [active]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const bgClass = overHero
    ? "bg-black/16 backdrop-blur-[36px]"
    : "bg-black/[0.46] backdrop-blur-[36px]";

  const textColor = "text-white";

  return (
    <nav className="pt-[24px] flex justify-center">
      {/* Desktop */}
      <ul
        className={`hidden md:flex items-center gap-[16px] px-[32px] pt-[12px] pb-[11px] rounded-[72px] ${bgClass} ${textColor} text-[14px] font-normal transition-colors duration-500`}
        style={{ lineHeight: "normal" }}
      >
        {menuItems.map((label, i) => {
          const isActive = active === i;
          const isHovered = hovered === i;
          const showDot = isActive || isHovered;

          return (
            <li
              key={i}
              className="flex items-center gap-[8px] cursor-pointer transition-opacity duration-300"
              style={{ opacity: isActive ? 1 : 0.6 }}
              onClick={() => onSelect(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
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

      {/* Mobile — hidden measurers */}
      <div className="md:hidden absolute pointer-events-none opacity-0" aria-hidden>
        <div ref={closedRef} className="inline-flex items-center gap-[8px] px-[20px] pt-[12px] pb-[11px] text-[13px] whitespace-nowrap">
          <span className="block w-[6px] h-[6px] shrink-0" />
          {menuItems[active]}
        </div>
        <div ref={openRef} className="inline-flex flex-col gap-[2px] px-[20px] py-[12px] text-[13px]">
          {menuItems.map((label, i) => (
            <div key={i} className="flex items-center gap-[8px] whitespace-nowrap py-[6px]">
              <span className="block w-[6px] h-[6px] shrink-0" />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile — visible */}
      <div ref={containerRef} className="md:hidden">
        <div
          className={`${bgClass} ${textColor} text-[13px] font-normal overflow-hidden cursor-pointer transition-colors duration-500`}
          style={{
            lineHeight: "normal",
            width: open ? openSize.w : closedSize.w,
            height: open ? openSize.h : closedSize.h,
            borderRadius: open ? 16 : 72,
            transition: "width 400ms cubic-bezier(0.32, 0.72, 0, 1), height 400ms cubic-bezier(0.32, 0.72, 0, 1), border-radius 400ms cubic-bezier(0.32, 0.72, 0, 1), background-color 500ms ease",
          }}
          onClick={() => { if (!open) setOpen(true); }}
        >
          <div
            className="absolute flex items-center gap-[8px] px-[20px] pt-[12px] pb-[11px] whitespace-nowrap"
            style={{
              opacity: open ? 0 : 1,
              transition: "opacity 200ms ease",
              pointerEvents: open ? "none" : "auto",
            }}
          >
            <span className="block w-[6px] h-[6px] rounded-full bg-white shrink-0" />
            {menuItems[active]}
          </div>

          <ul
            className="flex flex-col gap-[2px] px-[20px] py-[12px]"
            style={{
              opacity: open ? 1 : 0,
              transition: "opacity 300ms ease 100ms",
              pointerEvents: open ? "auto" : "none",
            }}
          >
            {menuItems.map((label, i) => {
              const isActive = active === i;
              return (
                <li
                  key={i}
                  className="flex items-center gap-[8px] whitespace-nowrap py-[6px] cursor-pointer"
                  style={{
                    opacity: isActive ? 1 : 0.6,
                    transition: "opacity 200ms ease",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(i);
                    setOpen(false);
                  }}
                >
                  <span
                    className="block w-[6px] h-[6px] rounded-full bg-white shrink-0"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transition: "opacity 200ms ease",
                    }}
                  />
                  {label}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
