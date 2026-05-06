import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import MenuOutsideClose from "./menu-outside-close";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Globe2, Mail, Phone } from "lucide-react";
import { Inter, Sora } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Simlux Technology Limited | Affordable Quality LED Lighting",
    template: "%s | Simlux Technology Limited",
  },
  description:
    "Simlux Technology Limited supplies affordable quality LED strips, LED bulbs, and decorative LED lighting for indoor decoration and commercial spaces.",
  openGraph: {
    title: "Simlux Technology Limited",
    description:
      "Affordable quality LED products for indoor decoration, company interiors, and commercial lighting projects.",
    url: "https://www.simluxled.com",
    type: "website",
  },
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${sora.variable}`}>
        <header className="site-header">
          <Link className="brand" href="/" aria-label="Simlux Technology Limited home">
            <Image
              className="brand-logo-image"
              src="/brand/simlux-full-transparent.png"
              alt=""
              width={581}
              height={527}
              priority
            />
            <span>
              <strong>Technology Limited</strong>
            </span>
          </Link>
          <input className="nav-toggle" id="nav-toggle" type="checkbox" aria-label="Toggle navigation" />
          <label className="menu-button" htmlFor="nav-toggle" title="Menu" aria-label="Toggle navigation menu">
            <span />
            <span />
            <span />
          </label>
          <nav className="site-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <Link className="header-contact" href="/contact">
            <Mail size={18} aria-hidden="true" />
            <span>Inquire</span>
          </Link>
        </header>
        <MenuOutsideClose />
        <main id="main-content">{children}</main>
        <div className="viewport-fade viewport-fade-top" aria-hidden="true" />
        <div className="viewport-fade viewport-fade-bottom" aria-hidden="true" />
        <SpeedInsights />
        <footer className="site-footer">
          <div>
            <strong>Simlux Technology Limited</strong>
            <p>Affordable quality LED lighting for indoor decoration and commercial spaces.</p>
          </div>
          <div className="footer-links">
            <a href="mailto:sales@simluxled.com">
              <Mail size={16} aria-hidden="true" />
              sales@simluxled.com
            </a>
            <a href="tel:+85293485095">
              <Phone size={16} aria-hidden="true" />
              +852 93485095
            </a>
            <a href="tel:+8613164705570">
              <Phone size={16} aria-hidden="true" />
              +86 13164705570
            </a>
            <a href="https://www.simluxled.com">
              <Globe2 size={16} aria-hidden="true" />
              www.simluxled.com
            </a>
            <Link href="/products">Product catalog</Link>
            <Link href="/contact">Contact form</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
