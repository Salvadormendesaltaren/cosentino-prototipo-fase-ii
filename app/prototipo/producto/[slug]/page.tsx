import ProductoDetalle from "./ProductoDetalle";

export function generateStaticParams() {
  return [{ slug: "continuidad-y-resistencia" }];
}

export default function Page() {
  return <ProductoDetalle />;
}
