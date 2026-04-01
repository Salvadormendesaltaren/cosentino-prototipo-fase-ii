"use client";

import { createContext, useContext, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

interface ProtoCurtainContextType {
  navigateTo: (href: string) => void;
}

const ProtoCurtainContext = createContext<ProtoCurtainContextType>({
  navigateTo: () => {},
});

export function useProtoCurtain() {
  return useContext(ProtoCurtainContext);
}

export default function PrototipoLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [phase, setPhase] = useState<"idle" | "covering" | "revealing">("idle");
  const pendingHref = useRef<string | null>(null);

  const navigateTo = useCallback((href: string) => {
    if (phase !== "idle") return;
    pendingHref.current = href;
    setPhase("covering");

    setTimeout(() => {
      router.push(href);
      window.scrollTo({ top: 0 });

      requestAnimationFrame(() => {
        setPhase("revealing");

        setTimeout(() => {
          setPhase("idle");
          pendingHref.current = null;
        }, 600);
      });
    }, 600);
  }, [phase, router]);

  return (
    <ProtoCurtainContext.Provider value={{ navigateTo }}>
      {/* Curtain */}
      <div
        className="fixed inset-0 bg-black z-[60] pointer-events-none"
        style={{
          transform:
            phase === "idle"
              ? "translateY(100%)"
              : phase === "covering"
              ? "translateY(0%)"
              : "translateY(-100%)",
          transition:
            phase === "idle"
              ? "none"
              : "transform 600ms cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      />
      {children}
    </ProtoCurtainContext.Provider>
  );
}
