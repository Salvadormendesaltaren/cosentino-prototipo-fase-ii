import ArticuloDetalle from "@/components/ArticuloDetalle";
import ArticuloAedas from "@/components/ArticuloAedas";

export function generateStaticParams() {
  return [
    { slug: "continuidad-y-resistencia" },
    { slug: "aedas-homes-blanco-luz-silencio" },
  ];
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "aedas-homes-blanco-luz-silencio") return <ArticuloAedas />;
  return <ArticuloDetalle />;
}
