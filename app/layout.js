import AnalyticsTracker from "@/components/analytics/AnalyticsTracker";
import PageViewTracker from "@/components/analytics/PageViewTracker";
import "@/node_modules/react-modal-video/css/modal-video.css";
import { Inter, Jost } from "next/font/google";
import Script from "next/script";

import "../styles/_keyframe-animations.scss";
import "../styles/_variables.scss";
import "../styles/globals.css";
import "/public/assets/css/bootstrap.min.css";
import "/public/assets/css/common-style.css";
import "/public/assets/css/dark-mode.css";
import "/public/assets/css/line-awesome.min.css";
import "/public/assets/css/main.css";
import "/public/assets/css/posty-color.css";
import "/public/assets/css/swiper.min.css";
import "/public/assets/css/venobox.min.css";


const inter = Inter({
  weight: ["200", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--body-font",
  display: "swap",
});

const jost = Jost({
  weight: ["200", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--secondary-font",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "newswatch24 | Blog & Magazine",
    template: "%s | newswatch24",
  },
  description: "newswatch24 - News, tech, lifestyle and more.",
  openGraph: {
    title: "newswatch24 | Blog & Magazine",
    description: "newswatch24 - News, tech, lifestyle and more.",
    type: "website",
    url: "/",
    images: [
      {
        url: "/assets/img/logo/logo-3.png",
        width: 512,
        height: 128,
        alt: "newswatch24",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
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
  twitter: {
    card: "summary_large_image",
    title: "newswatch24 | Blog & Magazine",
    description: "newswatch24 - News, tech, lifestyle and more.",
    images: ["/assets/img/logo/logo-3.png"],
  },
    verification: {
    google: "Kgc1a-INCtJugxCtN2ib5RBlgs72OJXnjBQxhzVYeto",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google AdSense Verification */}
        <meta name="google-adsense-account" content="ca-pub-6982430724321336" />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${jost.variable}`}
      >
        <AnalyticsTracker />

        {/* Schema.org Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsMediaOrganization",
              name: "newswatch24",
              url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
              logo: `${
                process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
              }/assets/img/logo/logo-3.png`,
            }),
          }}
        />

        {children}
      </body>
    </html>
  );
}
