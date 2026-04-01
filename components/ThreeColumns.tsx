"use client";

import type { Column } from "@/lib/sections";
import { useReveal } from "@/hooks/useReveal";

interface ThreeColumnsProps {
  title: string;
  columns: Column[];
  onNavigate?: (sectionIndex: number) => void;
}

export default function ThreeColumns({ title, columns, onNavigate }: ThreeColumnsProps) {
  const ref = useReveal();

  return (
    <section className="grid-container" ref={ref}>
      {title && (
        <p className="text-black text-[32px] font-medium mb-[32px] reveal" style={{ lineHeight: "40px" }}>
          {title}
        </p>
      )}
      <div className="grid-12 reveal-stagger">
        {columns.map((col, i) => (
          <div key={i} className="col-span-4 flex flex-col reveal">
            <h3
              className="text-[18px] font-normal"
              style={{ color: "rgba(0, 0, 0, 0.75)", lineHeight: "26px" }}
            >
              {col.title}
            </h3>
            <p
              className="mt-[8px] text-black text-[16px] font-normal whitespace-pre-line"
              style={{ lineHeight: "20px" }}
            >
              {col.body}
            </p>
            {col.link && (
              <a
                href="#"
                className="mt-[16px] text-[18px] font-normal hover:opacity-100 transition-opacity duration-300"
                style={{ color: "rgba(0, 0, 0, 0.75)", lineHeight: "26px" }}
                onClick={(e) => {
                  e.preventDefault();
                  if (col.goToSection != null && onNavigate) {
                    onNavigate(col.goToSection);
                  }
                }}
              >
                {col.link}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
