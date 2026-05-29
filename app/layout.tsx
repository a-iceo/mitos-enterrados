import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Mitos Enterrados · Investigaciones Paranormales",
    template: "%s | Mitos Enterrados",
  },
  description: "Investigaciones paranormales, fenómenos inexplicables y evidencias perturbadoras de todo el mundo.",
  metadataBase: new URL("https://mitos-enterrados.vercel.app"),
  verification: {
    google: "bYtU1NUr1KSo1e0UBMcxEKNFAY9YqmgVFlWWg05kxF0",
  },
  openGraph: {
    siteName: "Mitos Enterrados",
    type: "website",
    locale: "es_ES",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
