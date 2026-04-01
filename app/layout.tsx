import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const diagramm = localFont({
  src: [
    { path: "../public/fonts/diagramm-regular.woff2", weight: "400" },
    { path: "../public/fonts/diagramm-medium.woff2", weight: "500" },
    { path: "../public/fonts/diagramm-semibold.woff2", weight: "600" },
    { path: "../public/fonts/diagramm-bold.woff2", weight: "700" },
  ],
  display: "swap",
  variable: "--font-diagramm",
});

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
    <html lang="es" className={`h-full antialiased ${diagramm.variable}`}>
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
