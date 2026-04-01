import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cosentino — Prototipo Fase II",
  description: "Prototipo funcional para Cosentino",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <div className="md:hidden flex items-center justify-center min-h-screen px-8 text-center">
          <p className="text-[18px] font-normal" style={{ color: "rgba(0, 0, 0, 0.75)", lineHeight: "26px" }}>
            Este prototipo sólo está disponible en desktop.
          </p>
        </div>
        <div className="hidden md:flex md:flex-col md:min-h-full">
          {children}
        </div>
      </body>
    </html>
  );
}
