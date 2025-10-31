import { Helmet } from 'react-helmet-async';
import React from 'react';
interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  type?: string;
}

const baseUrl = typeof window !== 'undefined' 
  ? window.location.origin 
  : 'https://fishtank.vc';

const defaultTitle = 'Fishtank — Where innovators, creators, and investors meet';
const defaultDescription = 'Fishtank connects innovators, creators, and investors to launch and scale startups with milestone-based funding and verifiable outcomes.';
const defaultOgImage = `${baseUrl}/og-image.png`;

export function SEO({ 
  title = defaultTitle,
  description = defaultDescription,
  path = '/',
  ogImage = defaultOgImage,
  type = 'website'
}: SEOProps) {
  const url = `${baseUrl}${path === '/' ? '' : path}`;
  const fullTitle = title === defaultTitle ? title : `${title} | Fishtank`;

  // Structured data for better SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Fishtank",
    "url": baseUrl,
    "logo": `${baseUrl}/og-image.png`,
    "description": defaultDescription,
    "sameAs": [],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service"
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Fishtank" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}

