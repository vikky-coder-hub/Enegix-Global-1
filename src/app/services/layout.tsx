import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services | Enegix Web Solutions',
  description: 'Discover our comprehensive range of digital services including web development, SEO, logo design, digital marketing, e-commerce solutions, and PPC advertising.',
  keywords: 'web development, SEO optimization, logo design, digital marketing, e-commerce solutions, PPC advertising, Enegix Web Solutions',
};

// This is a metadata file for the services route
// The default export is necessary for Next.js to recognize this file
export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
