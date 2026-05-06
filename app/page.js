import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BadgeCheck, Building2, Lightbulb, Ruler, Sparkles, SunMedium } from "lucide-react";
import { categories, products } from "@/lib/products";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-media" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1600&q=85"
            alt=""
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="hero-content">
          <div className="hero-copy-block">
            <p className="eyebrow">LED strips, bulbs, and decorative lighting</p>
            <h1>Affordable LED lighting for polished commercial interiors.</h1>
            <p className="hero-copy">
              Simlux Technology Limited supplies quality LED strips, bulbs, and decorative lighting for
              offices, retail spaces, hospitality interiors, and indoor decoration projects.
            </p>
            <div className="hero-actions">
              <Link className="button primary" href="/products">
                View products <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link className="button secondary" href="/contact">
                Contact sales
              </Link>
            </div>
            <div className="hero-metrics" aria-label="Simlux product strengths">
              <span>
                <strong>Indoor</strong>
                Decoration focus
              </span>
              <span>
                <strong>LED</strong>
                Strips and bulbs
              </span>
              <span>
                <strong>Value</strong>
                Quality at fair cost
              </span>
            </div>
          </div>
          <div className="hero-video-panel">
            <video
              src="/videos/simlux-demo-video.mp4"
              poster="/products/generated-flex-neon-showroom.png"
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="metadata"
              aria-label="Simlux LED lighting demo video"
            />
          </div>
        </div>
      </section>

      <section className="section intro-grid section-contained">
        <div>
          <p className="eyebrow">Built for practical projects</p>
          <h2>Clear choices for teams sourcing LED lighting without overspending.</h2>
        </div>
        <div className="value-list">
          <article>
            <BadgeCheck size={24} aria-hidden="true" />
            <h3>Quality first</h3>
            <p>Product ranges focused on reliable brightness, usable formats, and everyday indoor performance.</p>
          </article>
          <article>
            <Ruler size={24} aria-hidden="true" />
            <h3>Project friendly</h3>
            <p>Options for coves, shelves, counters, offices, retail displays, and commercial decoration.</p>
          </article>
          <article>
            <Sparkles size={24} aria-hidden="true" />
            <h3>Affordable supply</h3>
            <p>Cost-conscious LED solutions for companies that need good lighting without overspending.</p>
          </article>
        </div>
      </section>

      <section className="section band">
        <div className="section-heading section-contained">
          <p className="eyebrow">Product categories</p>
          <h2>Core LED ranges for decoration, replacement, and fit-out work.</h2>
        </div>
        <div className="category-grid section-contained">
          {categories.map((category) => (
            <Link className="category-card" href={`/products?category=${category.id}`} key={category.id}>
              <Lightbulb size={26} aria-hidden="true" />
              <h3>{category.name}</h3>
              <p>{category.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section section-contained">
        <div className="section-heading split">
          <div>
            <p className="eyebrow">Featured products</p>
            <h2>Start with the most requested lighting formats.</h2>
          </div>
          <Link className="text-link" href="/products">
            Full catalog <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="product-grid">
          {products.slice(0, 3).map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="section use-case-section">
        <div className="section-contained use-case-grid">
          <div>
            <p className="eyebrow">Commercial use cases</p>
            <h2>Lighting that supports the atmosphere of your space.</h2>
            <p>
              From bright office replacements to warm accent lines, Simlux products help
              companies create practical interiors with a cleaner finished look.
            </p>
          </div>
          <div className="use-case-list">
            {["Retail shelf accents", "Office and reception lighting", "Hotel counters and coves", "Showroom display areas"].map(
              (item) => (
                <span key={item}>
                  <SunMedium size={18} aria-hidden="true" />
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      <section className="cta-strip">
        <Building2 size={32} aria-hidden="true" />
        <div>
          <h2>Planning a shop, office, hotel, or interior decoration project?</h2>
          <p>Send the product type, quantity, and lighting goal. Simlux can help match a suitable LED option.</p>
        </div>
        <Link className="button primary" href="/contact">
          Request inquiry <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}

function ProductCard({ product }) {
  return (
    <Link className="product-card" href={`/products/${product.slug}`}>
      <Image src={product.image} alt={`${product.name} product scene`} width={900} height={675} sizes="(max-width: 980px) 100vw, 33vw" />
      <div>
        <span>{product.categoryName}</span>
        <h3>{product.name}</h3>
        <p>{product.summary}</p>
      </div>
    </Link>
  );
}
