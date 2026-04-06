"use client";

import { useReveal } from "@/hooks/useReveal";
import VideoEmbed from "@/components/VideoEmbed";

interface IntroSectionProps {
  introText: string[];
  videoLabel: string;
  loomId: string;
  loomTitle?: string;
  loomId2?: string;
  loomId2Title?: string;
}

export default function IntroSection({ introText, videoLabel, loomId, loomTitle, loomId2, loomId2Title }: IntroSectionProps) {
  const ref = useReveal();

  return (
    <section id="intro" className="grid-container pt-[104px] pb-[32px]" ref={ref}>
      <div className="grid-12">
        <div className="col-span-4 md:col-start-4 md:col-span-6 reveal">
          {introText.map((text, i) => (
            <p
              key={i}
              className="text-black text-[32px] font-normal"
              style={{ lineHeight: "40px", marginTop: i > 0 ? 40 : 0 }}
            >
              {text}
            </p>
          ))}
        </div>

        <div className="col-span-12 mt-[104px] reveal">
          <p className="text-black text-[32px] font-medium mb-[16px]" style={{ lineHeight: "40px" }}>
            {videoLabel}
          </p>
          {loomId2 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
              <div>
                {loomTitle && (
                  <h3
                    className="text-[18px] font-normal mb-[12px]"
                    style={{ color: "rgba(0, 0, 0, 0.75)", lineHeight: "26px" }}
                  >
                    {loomTitle}
                  </h3>
                )}
                <VideoEmbed loomId={loomId} />
              </div>
              <div>
                {loomId2Title && (
                  <h3
                    className="text-[18px] font-normal mb-[12px]"
                    style={{ color: "rgba(0, 0, 0, 0.75)", lineHeight: "26px" }}
                  >
                    {loomId2Title}
                  </h3>
                )}
                <VideoEmbed loomId={loomId2} />
              </div>
            </div>
          ) : (
            <VideoEmbed loomId={loomId} />
          )}
        </div>
      </div>
    </section>
  );
}
