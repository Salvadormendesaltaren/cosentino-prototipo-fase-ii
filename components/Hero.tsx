"use client";

import Image from "next/image";
import basePath from "@/lib/basePath";

interface HeroProps {
  heroImage: string;
  heroTitle: string;
}

export default function Hero({ heroImage, heroTitle }: HeroProps) {
  const lines = heroTitle.split("\n");

  return (
    <div className="relative w-full h-screen">
      <Image
        src={`${basePath}${heroImage}`}
        alt=""
        width={2880}
        height={1024}
        className="w-full h-full object-cover"
        priority
      />
      <div className="absolute inset-0 flex items-center justify-center px-[24px] md:px-0">
        <div className="flex flex-col items-center max-w-[542px] text-center">
          <p className="text-white text-[14px] font-normal" style={{ lineHeight: "22px" }}>
            Modulor x Cosentino
          </p>
          <h1 className="mt-[8px] text-white text-[40px] font-medium" style={{ lineHeight: "normal" }}>
            {lines.map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h1>
          <div className="mt-[16px] flex items-center gap-[8px]">
            <button
              onClick={() => document.getElementById("intro")?.scrollIntoView({ behavior: "smooth" })}
              className="px-[32px] pt-[12px] pb-[11px] rounded-[72px] bg-black/16 backdrop-blur-[36px] hover:backdrop-blur-[6px] hover:bg-black/36 transition-all duration-500 ease-out text-white text-[14px] font-normal cursor-pointer"
              style={{ lineHeight: "normal" }}
            >
              Saber más
            </button>
            <button
              onClick={() => {
                const video = document.querySelector(".aspect-video");
                if (video) video.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
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
  );
}
