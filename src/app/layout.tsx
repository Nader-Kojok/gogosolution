import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/ui/Footer";
import { LocalBusinessSchema, WebSiteSchema } from "@/components/StructuredData";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://GOGOSOLUTION.com'),
  title: {
    default: "GOGOSOLUTION - Service de Transport Premium à Dakar | VTC & Chauffeur Privé",
    template: "%s | GOGOSOLUTION - Transport Premium Dakar"
  },
  description: "Service de transport VTC premium à Dakar. Transferts aéroport, chauffeur privé et courses professionnelles disponibles 24/7. Confort, sécurité et ponctualité garantis pour tous vos déplacements à Dakar et au Sénégal.",
  keywords: [
    "VTC Dakar",
    "transport premium Dakar",
    "chauffeur privé Dakar",
    "transfert aéroport Dakar",
    "transport professionnel Dakar",
    "taxi premium Dakar",
    "service VTC Dakar",
    "chauffeur privé Sénégal",
    "transport VIP Dakar",
    "course professionnelle Dakar"
  ].join(", "),
  authors: [{ name: "GOGOSOLUTION", url: "https://GOGOSOLUTION.com" }],
  creator: "GOGOSOLUTION",
  publisher: "GOGOSOLUTION",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://GOGOSOLUTION.com",
    title: "GOGOSOLUTION - Service de Transport Premium à Dakar | VTC & Chauffeur Privé",
    description: "Service de transport VTC premium à Dakar. Transferts aéroport, chauffeur privé et courses professionnelles disponibles 24/7. Confort, sécurité et ponctualité garantis.",
    siteName: "GOGOSOLUTION",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GOGOSOLUTION - Service de Transport Premium à Dakar"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GOGOSOLUTION VTC - Service de Transport Premium à Dakar",
    description: "Service de transport VTC premium à Dakar. Transferts aéroport et chauffeur privé disponibles 24/7. Confort et sécurité garantis.",
    creator: "@GOGOSOLUTION",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // À remplacer par le code de vérification réel
    yandex: "yandex-verification-code", // À remplacer par le code de vérification réel
  },
  alternates: {
    canonical: "https://GOGOSOLUTION.com",
    languages: {
      'fr-FR': 'https://GOGOSOLUTION.com',
      'en-US': 'https://GOGOSOLUTION.com/en',
    },
  },
  category: "transport",
  classification: "business",
  referrer: "origin-when-cross-origin",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "GOGOSOLUTION",
  },
  applicationName: "GOGOSOLUTION",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png" },
    ],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <LocalBusinessSchema />
        <WebSiteSchema />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
