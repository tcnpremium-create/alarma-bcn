import React, { useEffect } from 'react';

export default function SEOHead({ 
  title, 
  description, 
  keywords, 
  image,
  url,
  schema,
  noindex = false 
}) {
  useEffect(() => {
    // Meta tags
    document.title = title;
    
    const updateMetaTag = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.name = name;
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    if (description) updateMetaTag('description', description);
    if (keywords) updateMetaTag('keywords', keywords);
    if (noindex) {
      let robots = document.querySelector('meta[name="robots"]');
      if (!robots) {
        robots = document.createElement('meta');
        robots.name = 'robots';
        document.head.appendChild(robots);
      }
      robots.content = 'noindex, nofollow';
    }

    // Open Graph
    updateMetaTag('og:title', title);
    if (description) updateMetaTag('og:description', description);
    if (image) updateMetaTag('og:image', image);
    if (url) updateMetaTag('og:url', url);

    // Twitter Card
    updateMetaTag('twitter:title', title);
    if (description) updateMetaTag('twitter:description', description);
    if (image) updateMetaTag('twitter:image', image);

    // Schema.org — use data-id to avoid overwriting other scripts
    if (schema) {
      let schemaScript = document.querySelector('script[data-schema="dynamic"]');
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.type = 'application/ld+json';
        schemaScript.setAttribute('data-schema', 'dynamic');
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema);
    }

    return () => {
      // Cleanup if needed
    };
  }, [title, description, keywords, image, url, schema, noindex]);

  return null;
}