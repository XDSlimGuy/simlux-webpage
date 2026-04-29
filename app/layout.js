import "./globals.css";
import Link from "next/link";
import { Mail, Menu, Zap } from "lucide-react";
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
    default: "Simlux Technology | Affordable Quality LED Lighting",
    template: "%s | Simlux Technology",
  },
  description:
    "Simlux Technology supplies affordable quality LED strips, LED bulbs, and decorative LED lighting for indoor decoration and commercial spaces.",
  openGraph: {
    title: "Simlux Technology",
    description:
      "Affordable quality LED products for indoor decoration, company interiors, and commercial lighting projects.",
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
          <Link className="brand" href="/" aria-label="Simlux Technology home">
            <span className="brand-mark">
              <Zap size={20} aria-hidden="true" />
            </span>
            <span>
              <strong>Simlux</strong>
              <small>Technology</small>
            </span>
          </Link>
          <input className="nav-toggle" id="nav-toggle" type="checkbox" aria-label="Toggle navigation" />
          <label className="menu-button" htmlFor="nav-toggle" title="Menu">
            <Menu size={22} aria-hidden="true" />
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
        <main id="main-content">{children}</main>
        <footer className="site-footer">
          <div>
            <strong>Simlux Technology</strong>
            <p>Affordable quality LED lighting for indoor decoration and commercial spaces.</p>
          </div>
          <div className="footer-links">
            <a href="mailto:sales@simluxtechnology.com">sales@simluxtechnology.com</a>
            <Link href="/products">Product catalog</Link>
            <Link href="/contact">Contact form</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
