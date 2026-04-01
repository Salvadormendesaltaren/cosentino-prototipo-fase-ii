"use client";

import basePath from "@/lib/basePath";

export interface ArticleData {
  image: string;
  label?: string;
  title: string;
  category?: string;
}

interface ArticleThumbnailProps {
  article: ArticleData;
  variant: "super" | "big" | "mid" | "small";
}

export default function ArticleThumbnail({ article, variant }: ArticleThumbnailProps) {
  if (variant === "super") return <SuperThumbnail article={article} />;
  return <CardThumbnail article={article} />;
}

function CardThumbnail({ article }: { article: ArticleData }) {
  return (
    <div className="cursor-pointer group">
      <div className="w-full overflow-hidden" style={{ aspectRatio: "672 / 872" }}>
        <img
          src={`${basePath}${article.image}`}
          alt=""
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <h3
        className="mt-[12px] text-black text-[16px] font-normal transition-opacity duration-300 group-hover:opacity-60"
        style={{ lineHeight: "normal", letterSpacing: "-0.64px" }}
      >
        {article.title}
      </h3>
      {article.category && (
        <p
          className="mt-[4px] text-[14px] font-normal transition-opacity duration-300"
          style={{ color: "rgba(0, 0, 0, 0.50)", lineHeight: "22px", letterSpacing: "-0.28px" }}
        >
          {article.category}
        </p>
      )}
    </div>
  );
}

function SuperThumbnail({ article }: { article: ArticleData }) {
  return (
    <div className="relative w-full h-screen overflow-hidden cursor-pointer group">
      <img
        src={`${basePath}${article.image}`}
        alt=""
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="flex flex-col items-center text-center">
          {article.label && (
            <p
              className="text-white text-[14px] font-normal transition-opacity duration-500 group-hover:opacity-100"
              style={{ lineHeight: "22px", opacity: 0.8 }}
            >
              {article.label}
            </p>
          )}
          <h2
            className="mt-[8px] text-white text-[56px] font-medium"
            style={{ lineHeight: "normal" }}
          >
            {article.title}
          </h2>
          {article.category && (
            <p
              className="mt-[8px] text-white text-[14px] font-normal transition-opacity duration-500 group-hover:opacity-100"
              style={{ lineHeight: "22px", opacity: 0.8 }}
            >
              {article.category}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
