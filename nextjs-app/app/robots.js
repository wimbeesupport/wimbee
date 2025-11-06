export default function robots() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://wimbeetech.com';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${base}/sitemap.xml`,
    host: base.replace(/^https?:\/\//, ''),
  };
}
