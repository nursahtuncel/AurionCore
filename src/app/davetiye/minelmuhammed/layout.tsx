import type { Metadata } from "next";
import { Great_Vibes, Cormorant_Garamond, Amiri, Nunito } from "next/font/google";
import "../../../app/globals.css";
import "./davetiye.css";

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

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
    <div
      className={`davetiye-body ${greatVibes.variable} ${cormorant.variable} ${amiri.variable} ${nunito.variable}`}
    >
      {children}
    </div>
  );
}
