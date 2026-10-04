import type { Metadata, Viewport } from "next";
import { Archivo, Archivo_Black, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import RevealObserver from "@/components/RevealObserver";
import { baseOpenGraph, shareImage, site } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});
const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo-black",
  display: "swap",
});
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});
// Licensed TAY faces, self-hosted from app/fonts
const lasso = localFont({ src: "./fonts/TAYDannyLasso.woff2", variable: "--font-lasso", display: "swap" });
const amaya = localFont({ src: "./fonts/TAYAmaya.woff", variable: "--font-amaya", display: "swap" });
const misprint = localFont({ src: "./fonts/TAYMisprint.woff2", variable: "--font-misprint", display: "swap", preload: false });

/** Google Ads account tag. Public ID, safe to commit. */
const GOOGLE_ADS_ID = "AW-18490897737";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Le Booth | Photo Booth Rentals & Custom Booths in San Diego",
    template: "%s | Le Booth",
  },
  description:
    "Hand-built photo booths for San Diego and Los Angeles weddings and events. Rentals, custom booth builds, and free venue installs on a revenue share.",
  applicationName: site.name,
  robots: { index: true, follow: true },
  openGraph: baseOpenGraph,
  twitter: { card: "summary_large_image", images: [shareImage] },
};

export const viewport: Viewport = {
  themeColor: "#2A211A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fonts = [archivo, archivoBlack, instrument, lasso, amaya, misprint].map((f) => f.variable).join(" ");
  return (
    <html lang="en" className={fonts} suppressHydrationWarning>
      <head>
        {/* Lets CSS hide scroll-reveal blocks only when JS is running */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {/* Google tag (gtag.js) for Google Ads. Lives here so it's on every page exactly once. */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} strategy="afterInteractive" />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}');`}
        </Script>
      </head>
      <body>
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
