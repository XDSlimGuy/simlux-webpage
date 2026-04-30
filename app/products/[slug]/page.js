import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Mail } from "lucide-react";
import { getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const product = getProduct(resolvedParams.slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.summary,
  };
}

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const product = getProduct(resolvedParams.slug);
  if (!product) notFound();

  return (
    <>
      <section className="product-detail-hero">
        <div className="detail-copy">
          <p className="eyebrow">{product.categoryName}</p>
          <h1>{product.name}</h1>
          <p>{product.summary}</p>
          <div className="hero-actions">
            <Link className="button primary" href={`/contact?product=${encodeURIComponent(product.name)}`}>
              Inquire about this product <Mail size={18} aria-hidden="true" />
            </Link>
            <Link className="button secondary" href="/products">
              Back to products
            </Link>
          </div>
        </div>
        <Image
          src={product.image}
          alt={`${product.name} lighting application`}
          width={1100}
          height={880}
          sizes="(max-width: 980px) 100vw, 50vw"
          priority
        />
      </section>

      <section className="section detail-grid">
        <div>
          <p className="eyebrow">Key features</p>
          <h2>Designed for indoor decoration and commercial interiors.</h2>
          <ul className="check-list">
            {product.features.map((feature) => (
              <li key={feature}>
                <Check size={18} aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="spec-panel">
          <h2>Basic specs</h2>
          <dl>
            {Object.entries(product.specs).map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {product.gallery?.length ? (
        <section className="section product-gallery-section">
          <div className="section-heading section-contained">
            <p className="eyebrow">Product images</p>
            <h2>Real project references and generated product visuals.</h2>
          </div>
          <div className="product-gallery section-contained">
            {product.gallery.map((image, index) => (
              <figure className={index === 0 ? "feature" : ""} key={image.src}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={index === 0 ? 1200 : 720}
                  height={index === 0 ? 800 : 540}
                  sizes={index === 0 ? "(max-width: 980px) 100vw, 50vw" : "(max-width: 980px) 50vw, 25vw"}
                />
                <figcaption>{image.alt}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      <section className="section band">
        <div className="section-heading split">
          <div>
            <p className="eyebrow">Applications</p>
            <h2>Common uses for {product.name}</h2>
          </div>
          <Link className="text-link" href={`/contact?product=${encodeURIComponent(product.name)}`}>
            Ask for pricing <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="application-grid">
          {product.applications.map((application) => (
            <span key={application}>{application}</span>
          ))}
        </div>
      </section>
    </>
  );
}
