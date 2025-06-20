import type { Metadata } from "next";
import { Montserrat, Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import "./scroll-fix.css";
import "./typography.css";

// Modern, premium heading font
const montserrat = Montserrat({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

// Distinctive, tech-forward body font
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

// Clean, modern sans-serif for UI elements
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Enegix Websolution - Web Development, Logo Design, SEO & Advertising",
  description: "Transform your digital presence with Enegix Websolution. We offer professional web development, logo design, SEO optimization, and digital advertising services.",
  keywords: ["web development", "logo design", "SEO services", "digital advertising", "web design", "professional website", "online marketing"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${montserrat.variable} ${spaceGrotesk.variable} ${inter.variable} font-montserrat antialiased overscroll-none`}
      >
        {/* The loading component is client-side only, so we don't include it directly in layout */}
        {children}
      </body>
    </html>
  );
}
