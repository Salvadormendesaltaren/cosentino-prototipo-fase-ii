import ProductoDetalle from "@/components/ProductoDetalle";

export function generateStaticParams() {
  return [{ slug: "cinder-craze" }];
}

export default function Page() {
  return <ProductoDetalle />;
}
