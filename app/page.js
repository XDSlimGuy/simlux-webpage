import site from "@/content/site.json";
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
            data-studio-field="home.heroImage"
            src={site.home.heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="hero-content">
          <div className="hero-copy-block">
            <p className="eyebrow" data-studio-field="home.eyebrow">{site.home.eyebrow}</p>
            <h1 data-studio-field="home.heading">{site.home.heading}</h1>
            <p className="hero-copy" data-studio-field="home.intro">
              {site.home.intro}
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
          <h2 data-studio-field="home.valueHeading">{site.home.valueHeading}</h2>
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
          <h2 data-studio-field="home.categoryHeading">{site.home.categoryHeading}</h2>
        </div>
        <div className="category-grid section-contained">
          {categories.map((category) => (
            <Link className="category-card" href={`/products?category=${category.id}`} key={category.id}>
              <Lightbulb size={26} aria-hidden="true" />
              <h3 data-studio-field={`category.${category.id}.name`}>{category.name}</h3>
              <p data-studio-field={`category.${category.id}.summary`}>{category.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section section-contained">
        <div className="section-heading split">
          <div>
            <p className="eyebrow">Featured products</p>
            <h2 data-studio-field="home.featuredHeading">{site.home.featuredHeading}</h2>
          </div>
          <Link className="text-link" href="/products">
            Full catalog <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="product-grid" data-studio-catalog="featured">
          {products.slice(0, 3).map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="section use-case-section">
        <div className="section-contained use-case-grid">
          <div>
            <p className="eyebrow">Commercial use cases</p>
            <h2 data-studio-field="home.useHeading">{site.home.useHeading}</h2>
            <p data-studio-field="home.useIntro">
              {site.home.useIntro}
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
          <h2 data-studio-field="home.ctaHeading">{site.home.ctaHeading}</h2>
          <p data-studio-field="home.ctaText">{site.home.ctaText}</p>
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
    <Link className="product-card" data-studio-product={product.slug} href={`/products/${product.slug}`}>
      <Image data-studio-field={`catalog.product.${product.slug}.image`} src={product.image} alt={`${product.name} product scene`} width={900} height={675} sizes="(max-width: 980px) 100vw, 33vw" />
      <div>
        <span data-studio-field={`catalog.product.${product.slug}.category`}>{product.categoryName}</span>
        <h3 data-studio-field={`catalog.product.${product.slug}.name`}>{product.name}</h3>
        <p data-studio-field={`catalog.product.${product.slug}.summary`}>{product.summary}</p>
      </div>
    </Link>
  );
}

