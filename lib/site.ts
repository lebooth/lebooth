export const site = {
  name: "Le Booth",
  url: "https://le-booth.com",
  email: "info@le-booth.com",
  phone: "(619) 438-0163",
  phoneHref: "tel:+16194380163",
  phoneE164: "+1-619-438-0163",
  founder: "Leonardo Amezcua",
  founded: "2025",
};

/** Link-preview image (iMessage, WhatsApp, Facebook, X...). 1200x630, cropped from the hero photo. */
export const shareImage = {
  url: "/images/share.jpg",
  width: 1200,
  height: 630,
  alt: "Le Booth enclosed photo booth glowing at night",
};

/**
 * Shared Open Graph fields. A page's `openGraph` replaces the layout's entirely
 * (image included), so every page must spread this in.
 */
export const baseOpenGraph = { type: "website" as const, siteName: site.name, locale: "en_US", images: [shareImage] };

export const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${site.url}/#business`,
  name: site.name,
  alternateName: "Le Booth San Diego",
  description:
    "Hand-built photo booth rentals, custom booth builds, and venue profit-share installs serving San Diego and Los Angeles.",
  url: `${site.url}/`,
  image: `${site.url}/images/booth-angle.png`,
  email: site.email,
  telephone: site.phoneE164,
  priceRange: "$$",
  foundingDate: site.founded,
  founder: { "@type": "Person", name: site.founder },
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Diego",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "San Diego" },
    { "@type": "City", name: "Los Angeles" },
    { "@type": "AdministrativeArea", name: "Southern California" },
  ],
  knowsAbout: [
    "photo booth rental",
    "wedding photo booth",
    "custom photo booth fabrication",
    "event photo booth",
  ],
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Photo booth rentals for weddings and events", serviceType: "Photo booth rental" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom built photo booths", serviceType: "Custom photo booth fabrication" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Venue profit share installs", serviceType: "Revenue share photo booth placement" } },
  ],
};
