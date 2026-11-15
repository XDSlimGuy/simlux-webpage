import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Mail } from "lucide-react";

export default function ProductDetailView({ product }) {
  return (
    <>
      <section className="product-detail-hero">
        <div className="detail-copy">
          <p className="eyebrow" data-studio-field="product.category">{product.categoryName}</p>
          <h1 data-studio-field="product.name">{product.name}</h1>
          <p data-studio-field="product.summary">{product.summary}</p>
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
          data-studio-field="product.image"
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
          <ul className="check-list" data-studio-field="product.features">
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
          <dl data-studio-field="product.specs">
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
          <div className="product-gallery section-contained" data-studio-gallery>
            {product.gallery.map((image, index) => (
              <figure className={index === 0 ? "feature" : ""} key={image.src}>
                <Image
                  data-studio-field={`product.gallery.${index}.src`}
                  src={image.src}
                  alt={image.alt}
                  width={index === 0 ? 1200 : 720}
                  height={index === 0 ? 800 : 540}
                  sizes={index === 0 ? "(max-width: 980px) 100vw, 50vw" : "(max-width: 980px) 50vw, 25vw"}
                />
                <figcaption data-studio-field={`product.gallery.${index}.alt`}>{image.alt}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      <section className="section band">
        <div className="section-heading split">
          <div>
            <p className="eyebrow">Applications</p>
            <h2>Common uses for <span data-studio-field="product.name">{product.name}</span></h2>
          </div>
          <Link className="text-link" href={`/contact?product=${encodeURIComponent(product.name)}`}>
            Ask for pricing <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="application-grid" data-studio-field="product.applications">
          {product.applications.map((application) => (
            <span key={application}>{application}</span>
          ))}
        </div>
      </section>
    </>
  );
}
