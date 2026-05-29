import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mitos Enterrados",
  description: "Descubre los misterios y leyendas ocultas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
