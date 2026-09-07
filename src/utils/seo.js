export const SITE_URL = "https://digitallatte.in";
export const SITE_NAME = "Digital Latte";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/img/og-img.png`;
export const TWITTER_HANDLE = "@digitallatte";

export function constructMetadata({
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  url = "/",
  type = "website",
  noIndex = false,
  publishedTime,
  authors,
}) {
  const fullUrl = url.startsWith("http") ? url : `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;
  const fullImage = image.startsWith("http") ? image : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`;

  const metaTitle = title
    ? `${title} | ${SITE_NAME}`
    : "Best Digital Agency Mumbai | Social Media Marketing | India";
  
  const metaDescription =
    description ||
    "Digital Latte is a full-service Creative Digital Marketing Agency in Mumbai, India. Get the best digital experts to boost your social media & digital presence.";

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: fullUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      type: type,
      locale: "en_US",
      ...(publishedTime && { publishedTime }),
      ...(authors && { authors }),
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: metaTitle,
      description: metaDescription,
      images: [fullImage],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
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
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Digital Latte",
  url: SITE_URL,
  logo: `${SITE_URL}/img/logo.png`,
  image: DEFAULT_OG_IMAGE,
  description:
    "Digital Latte is a full-service creative digital agency with core expertise in Digital, Design & Development based in Mumbai, India.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Andheri West",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400053",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.facebook.com/digitallatte",
    "https://twitter.com/digitallatte",
    "https://www.instagram.com/digitallatte",
    "https://www.linkedin.com/company/digital-latte",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9920314755",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/digital-marketing-blog?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};
