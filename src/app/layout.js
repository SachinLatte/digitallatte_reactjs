import { Plus_Jakarta_Sans, Libre_Franklin } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import AppLayoutShell from "./components/common/AppLayoutShell";
import JsonLd from "./components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "../utils/seo";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta-sans",
});

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-libre",
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata = {
  metadataBase: new URL("https://digitallatte.in"),
  title: {
    default: "Best Digital Agency Mumbai | Social Media Marketing | India",
    template: "%s | Digital Latte",
  },
  description:
    "Digital Latte is a full-service Creative Digital Marketing Agency in Mumbai, India. Get the best digital experts to boost your social media & digital presence.",
  icons: {
    icon: `${basePath}/favicon-32x32.webp`,
    apple: `${basePath}/favicon-32x32.png`,
  },
  openGraph: {
    title: "Best Digital Agency Mumbai | Social Media Marketing | India",
    description:
      "Digital Latte is a full-service Creative Digital Marketing Agency in Mumbai, India. Get the best digital experts to boost your social media & digital presence.",
    url: "https://digitallatte.in",
    siteName: "Digital Latte",
    images: [
      {
        url: "https://digitallatte.in/img/og-img.png",
        width: 1200,
        height: 630,
        alt: "Digital Latte - Creative Digital Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@digitallatte",
    creator: "@digitallatte",
    title: "Best Digital Agency Mumbai | Social Media Marketing | India",
    description:
      "Digital Latte is a full-service Creative Digital Marketing Agency in Mumbai, India. Get the best digital experts to boost your social media & digital presence.",
    images: ["https://digitallatte.in/img/og-img.png"],
  },
  verification: {
    other: {
      "facebook-domain-verification": "0d261v9402vz3nz78intdxahv3prml",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${libreFranklin.variable} antialiased overflow-x-hidden`}
    >
      <head>
        {/* Global Schemas */}
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />

        {/* Google Tag Manager (Script) */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-T7NRNDM');
            `,
          }}
        />

        {/* Google Analytics 4 (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MKQJY21F5V"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-MKQJY21F5V');
              gtag('config', 'AW-1003125856');
            `,
          }}
        />

        {/* Meta / Facebook Pixel */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '211014609966458');
              fbq('track', 'PageView');
            `,
          }}
        />

        {/* LinkedIn Insight Tag */}
        <Script
          id="linkedin-insight"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              _linkedin_partner_id = "338083";
              window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
              window._linkedin_data_partner_ids.push(_linkedin_partner_id);
              (function(l) {
                if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                window.lintrk.q=[]}
                var s = document.getElementsByTagName("script")[0];
                var b = document.createElement("script");
                b.type = "text/javascript";b.async = true;
                b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                s.parentNode.insertBefore(b, s);})(window.lintrk);
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans overflow-x-hidden">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T7NRNDM"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Meta Pixel (noscript) */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=211014609966458&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {/* LinkedIn (noscript) */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://px.ads.linkedin.com/collect/?pid=338083&fmt=gif"
          />
        </noscript>

        <AppLayoutShell>{children}</AppLayoutShell>
      </body>
    </html>
  );
}