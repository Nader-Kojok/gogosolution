import Script from 'next/script';

export function LocalBusinessSchema() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://GOGOSOLUTION.com/#organization",
    "name": "GOGOSOLUTION",
    "alternateName": "GOGO SOLUTION VTC Dakar",
    "description": "Service de transport VTC premium à Dakar. Transferts aéroport, chauffeur privé et courses professionnelles disponibles 24/7.",
    "url": "https://GOGOSOLUTION.com",
    "logo": "https://GOGOSOLUTION.com/logo.svg",
    "image": "https://GOGOSOLUTION.com/og-image.jpg",
    "telephone": "+221 77 533 43 59",
    "email": "contact@gogosolution.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dakar",
      "addressRegion": "Dakar",
      "addressCountry": "SN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "14.6928",
      "longitude": "-17.4467"
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "14.6928",
        "longitude": "-17.4467"
      },
      "geoRadius": "50000"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://www.facebook.com/gogosolution",
      "https://www.instagram.com/gogosolution",
      "https://twitter.com/gogosolution"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services de Transport",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Transfert Aéroport",
            "description": "Service de transfert depuis/vers l'aéroport international Blaise Diagne"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Chauffeur Privé",
            "description": "Service de chauffeur privé pour vos déplacements professionnels et personnels"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Transport VIP",
            "description": "Service de transport premium avec véhicules haut de gamme"
          }
        }
      ]
    }
  };

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function WebSiteSchema() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://GOGOSOLUTION.com/#website",
    "url": "https://GOGOSOLUTION.com",
    "name": "GOGOSOLUTION",
    "description": "Service de transport VTC premium à Dakar",
    "inLanguage": "fr-FR",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://GOGOSOLUTION.com/?s={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function BreadcrumbSchema({ items }: Readonly<{ items: Array<{ name: string; url: string }> }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function FAQSchema({ faqs }: Readonly<{ faqs: Array<{ question: string; answer: string }> }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
