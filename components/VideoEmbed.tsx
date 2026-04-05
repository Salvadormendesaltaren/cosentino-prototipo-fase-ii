"use client";

import { useState } from "react";

interface VideoEmbedProps {
  loomId: string;
}

export default function VideoEmbed({ loomId }: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const thumbnail = `https://cdn.loom.com/sessions/thumbnails/${loomId}-with-play.gif`;

  return (
    <div className="w-full aspect-video rounded-[12px] overflow-hidden relative bg-[#111]">
      {playing ? (
        <iframe
          src={`https://www.loom.com/embed/${loomId}?hide_owner=true&hide_title=true&hide_share=true&hideEmbedTopBar=true&autoplay=1`}
          frameBorder="0"
          allowFullScreen
          allow="autoplay"
          className="w-full h-full"
        />
      ) : (
        <button
          onClick={() => setPlaying(true)}
          className="w-full h-full relative cursor-pointer group"
        >
          {/* Try to load Loom thumbnail; if it fails, dark bg shows through */}
          {!imgError && (
            <img
              src={thumbnail}
              alt=""
              className="w-full h-full object-cover transition-opacity duration-300"
              style={{ opacity: imgLoaded ? 1 : 0 }}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
            />
          )}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[64px] h-[64px] rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center transition-all duration-300 group-hover:scale-105">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M8 5v14l11-7L8 5z" fill="#333" />
              </svg>
            </div>
          </div>
        </button>
      )}
    </div>
  );
}
