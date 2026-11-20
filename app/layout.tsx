import type { Metadata } from "next";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const SITE_URL = "https://bestinterstatemovingandstorage.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Best Interstate Moving + Storage",
  description:
    "Easily connect with reliable moving and storage providers near you. Complete one contact form to receive personalized matches and quotes.",
  applicationName: "Best Interstate Moving + Storage",
  authors: [{ name: "Best Interstate Moving + Storage" }],
  keywords:
    "compare moving companies,compare storage services,moving quote request,moving company matches,moving and storage quotes,relocation providers",
  creator: "Best Interstate Moving + Storage",
  publisher: "Best Interstate Moving + Storage",
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
  category: "Moving and storage services",
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    title: "Best Interstate Moving + Storage",
    description:
      "Easily connect with reliable moving and storage providers near you. Complete one contact form to receive personalized matches and quotes.",
    url: `${SITE_URL}/`,
    siteName: "Best Interstate Moving + Storage",
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/assets/images/banner_bg.webp`,
        width: 1600,
        height: 670,
        alt: "Best Interstate Moving + Storage hero banner",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Interstate Moving + Storage",
    description:
      "Easily connect with reliable moving and storage providers near you. Complete one contact form to receive personalized matches and quotes.",
    images: [`${SITE_URL}/assets/images/banner_bg.webp`],
  },
  icons: {
    icon: "/assets/images/BEST-INTERSTATE-MOVING-AND-STORAGE_Logo-V2.png",
  },
};

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Best Interstate Moving + Storage",
    url: SITE_URL,
    logo: `${SITE_URL}/assets/images/BEST-INTERSTATE-MOVING-AND-STORAGE_Logo-V2.png`,
    telephone: "866-640-3952",
    description:
      "Compare moving and storage services in one place. Complete one quote request to connect with providers, review options, and match your move with the right support.",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "866-640-3952",
        contactType: "customer service",
        areaServed: "US",
        availableLanguage: "English",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Best Interstate Moving + Storage",
    url: SITE_URL,
    description:
      "Compare moving and storage services in one place. Complete one quote request to connect with providers, review options, and match your move with the right support.",
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US" suppressHydrationWarning>
      <body
        className="bg-white text-slate-900 antialiased"
        suppressHydrationWarning
      >
        <link rel="stylesheet" href="/assets/css/site.css" precedence="high" />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-4SZYZETGH5"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-4SZYZETGH5');`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <main className="min-h-screen overflow-x-hidden bg-white">
          <Navbar />
          {children}
          <Footer />
        </main>
        <Script src="/assets/js/jquery.min.js" strategy="beforeInteractive" />
        <Script
          src="/assets/js/bootstrap.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/js/bootstrap-datepicker.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/js/responsiveslides.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/js/ie10-viewport-bug-workaround.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/js/site-behavior.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
