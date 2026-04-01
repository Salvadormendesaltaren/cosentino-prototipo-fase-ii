"use client";

import { useParams } from "next/navigation";
import Header from "@/components/Header";
import basePath from "@/lib/basePath";

export default function ProductoDetalle() {
  const { slug } = useParams<{ slug: string }>();

  const productName = slug
    ?.replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase()) ?? "";

  return (
    <div className="relative">
      <Header />

      {/* ═══ HERO FULLSCREEN ═══ */}
      <section className="relative w-full h-screen">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${basePath}/images/product-hero.jpg`}
          alt={productName}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Product name */}
        <div className="absolute bottom-16 left-6 right-6 max-w-[1440px] mx-auto">
          <h1
            className="text-white text-[48px] font-light"
            style={{ letterSpacing: "-1.5px" }}
          >
            {productName}
          </h1>
        </div>
      </section>
    </div>
  );
}
