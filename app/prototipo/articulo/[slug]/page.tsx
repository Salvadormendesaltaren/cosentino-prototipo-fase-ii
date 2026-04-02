import ArticuloDetalle from "@/components/ArticuloDetalle";

export function generateStaticParams() {
  return [{ slug: "continuidad-y-resistencia" }];
}

export default function Page() {
  return <ArticuloDetalle />;
}
