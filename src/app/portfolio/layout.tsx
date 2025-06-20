import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Portfolio | Enegix Web Solutions',
  description: 'Explore our portfolio of web development, e-commerce, branding, and digital marketing projects that showcase our expertise and creative solutions.',
  keywords: 'portfolio, web design, branding, digital marketing, e-commerce, case studies, Enegix Web Solutions',
};

// This is a metadata file for the portfolio route
// The default export is necessary for Next.js to recognize this file
export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
