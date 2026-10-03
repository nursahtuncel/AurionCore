import type { Metadata } from "next";
import "../../../app/globals.css";
import "./davetiye.css";

export const metadata: Metadata = {
  title: "Minel & Muhammed | Düğün Davetiyesi",
  description:
    "28 Ekim Kına • 31 Ekim 2026 Cumartesi 13:00 Düğün — Minel & Muhammed'in davetlisiniz. Besa Albatros, Kartal / İstanbul.",
  openGraph: {
    title: "Minel & Muhammed | Düğün Davetiyesi",
    description:
      "28 Ekim Kına • 31 Ekim 2026 Cumartesi 13:00 Düğün — Minel & Muhammed'in davetlisiniz. Besa Albatros, Kartal / İstanbul.",
    type: "website",
    url: "https://www.aurioncore.com/davetiye/minelmuhammed",
    siteName: "Aurion Core Dijital Davetiyeler",
    locale: "tr_TR",
    images: [
      {
        url: "/davetiye/minelmuhammed/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Minel & Muhammed Düğün Davetiyesi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Minel & Muhammed | Düğün Davetiyesi",
    description:
      "28 Ekim Kına • 31 Ekim 2026 Cumartesi 13:00 Düğün — Minel & Muhammed'in davetlisiniz.",
  },
  alternates: {
    canonical: "https://www.aurioncore.com/davetiye/minelmuhammed",
  },
  other: {
    "theme-color": "#FAF7F2",
  },
};

export default function DavetiyeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cinzel:wght@400;500;600&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet" />
      
      <div className="davetiye-body">
        {children}
      </div>
    </>
  );
}
