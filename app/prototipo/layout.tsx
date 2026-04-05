"use client";

import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import AuthGate from "@/components/AuthGate";

interface ProtoCurtainContextType {
  navigateTo: (href: string) => void;
  goBack: () => void;
}

const ProtoCurtainContext = createContext<ProtoCurtainContextType>({
  navigateTo: () => {},
  goBack: () => {},
});

export function useProtoCurtain() {
  return useContext(ProtoCurtainContext);
}

export default function PrototipoLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<"idle" | "covering" | "revealing" | "snap-cover">("idle");
  const busyRef = useRef(false);
  const prevPathRef = useRef(pathname);
  const mountRef = useRef(true);

  /* ── On mount: if sessionStorage flag exists, play reveal (handles full-reload) ── */
  useEffect(() => {
    const flag = sessionStorage.getItem("curtain-reveal");
    if (flag) {
      sessionStorage.removeItem("curtain-reveal");
      setPhase("snap-cover");          // translateY(0%) instantly, no transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPhase("revealing");        // translateY(-100%) with transition
          setTimeout(() => setPhase("idle"), 600);
        });
      });
    }
    mountRef.current = false;
  }, []);

  /* ── SPA navigation: detect pathname change → reveal ── */
  useEffect(() => {
    if (mountRef.current) { prevPathRef.current = pathname; return; }
    if (busyRef.current && pathname !== prevPathRef.current) {
      prevPathRef.current = pathname;
      sessionStorage.removeItem("curtain-reveal");
      // Small delay so React can render new page content before we reveal
      setTimeout(() => {
        setPhase("revealing");
        setTimeout(() => {
          setPhase("idle");
          busyRef.current = false;
        }, 600);
      }, 60);
      return;
    }
    prevPathRef.current = pathname;
  }, [pathname]);

  const navigateTo = useCallback((href: string) => {
    if (busyRef.current) return;
    busyRef.current = true;
    setPhase("covering");
    setTimeout(() => {
      sessionStorage.setItem("curtain-reveal", "1");
      router.push(href);
      window.scrollTo({ top: 0 });
    }, 600);
  }, [router]);

  const goBack = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    setPhase("covering");
    setTimeout(() => {
      sessionStorage.setItem("curtain-reveal", "1");
      router.back();
    }, 600);
  }, [router]);

  const curtainStyle = (() => {
    switch (phase) {
      case "idle":       return { transform: "translateY(100%)",  transition: "none" };
      case "snap-cover": return { transform: "translateY(0%)",    transition: "none" };
      case "covering":   return { transform: "translateY(0%)",    transition: "transform 600ms cubic-bezier(0.65,0,0.35,1)" };
      case "revealing":  return { transform: "translateY(-100%)", transition: "transform 600ms cubic-bezier(0.65,0,0.35,1)" };
    }
  })();

  return (
    <AuthGate>
    <ProtoCurtainContext.Provider value={{ navigateTo, goBack }}>
      {/* Curtain */}
      <div
        className="fixed inset-0 bg-black z-[60] pointer-events-none"
        style={curtainStyle}
      />
      {children}

      {/* Top gradient overlay for header contrast */}
      <div
        className="fixed top-0 left-0 right-0 z-30 pointer-events-none"
        style={{
          height: "80px",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Bottom gradient overlay for nav contrast */}
      <div
        className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none"
        style={{
          height: "80px",
          background: "linear-gradient(to top, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 100%)",
        }}
      />
    </ProtoCurtainContext.Provider>
    </AuthGate>
  );
}
