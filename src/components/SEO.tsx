import { Helmet } from 'react-helmet-async';
import React from 'react';
interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  type?: string;
  keywords?: string[];
}

const baseUrl = typeof window !== 'undefined' 
  ? window.location.origin 
  : 'https://fishtank.vc';

const defaultTitle = 'Fishtank — Where innovators, creators, and investors meet';
const defaultDescription = 'Fishtank connects innovators, creators, and investors to launch and scale startups with milestone-based funding and verifiable outcomes.';
const defaultOgImage = `${baseUrl}/og-image.png`;
const defaultKeywords = [
  'startup',
  'freelance',
  'seed',
  'pre-seed',
  'investing',
  'founders',
  'networking',
  'social-network',
  'milestone funding',
  'venture capital',
  'innovation platform',
  'creator economy'
];

export function SEO({ 
  title = defaultTitle,
  description = defaultDescription,
  path = '/',
  ogImage = defaultOgImage,
  type = 'website',
  keywords = defaultKeywords
}: SEOProps) {
  const url = `${baseUrl}${path === '/' ? '' : path}`;
  const fullTitle = title === defaultTitle ? title : `${title} | Fishtank`;

  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FishTank",
    "url": baseUrl,
    "logo": `${baseUrl}/og-image.png`,
    "description": defaultDescription,
    "sameAs": [
      "https://www.linkedin.com/company/fishtankteam",
      "https://x.com/fishtankapp",
      "https://www.instagram.com/fishtankteam"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "team@fishtank.vc"
    },
    "foundingDate": "2025",
    "founders": [
      {
        "@type": "Person",
        "name": "Elie Bouzaglou"
      },
      {
        "@type": "Person",
        "name": "Jacob Cohen"
      }
    ]
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      ...(path !== '/' ? [{
        "@type": "ListItem",
        "position": 2,
        "name": fullTitle,
        "item": url
      }] : [])
    ]
  };

  const pageStructuredData = type === 'article' ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": fullTitle,
    "description": description,
    "image": ogImage,
    "author": {
      "@type": "Organization",
      "name": "Fishtank"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Fishtank",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/og-image.png`
      }
    }
  } : null;

  return (
    <Helmet>
      {/* Resource Hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link rel="dns-prefetch" href="https://api.web3forms.com" />

      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="author" content="Fishtank" />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#0a0a1a" />
      <meta name="color-scheme" content="dark light" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Fishtank" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image:alt" content={fullTitle} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@fishtankapp" />
      <meta name="twitter:site" content="@fishtankapp" />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbStructuredData)}
      </script>
      {pageStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(pageStructuredData)}
        </script>
      )}
    </Helmet>
  );
}

