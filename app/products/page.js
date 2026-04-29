import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Filter } from "lucide-react";
import { categories, getProductsByCategory } from "@/lib/products";

export const metadata = {
  title: "LED Products",
  description:
    "Browse Simlux Technology LED strips, LED bulbs, and decorative LED lighting for indoor and commercial spaces.",
};

export default async function ProductsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const activeCategory = resolvedSearchParams?.category || "all";
  const visibleProducts = getProductsByCategory(activeCategory);

  return (
    <>
      <section className="page-hero compact">
        <p className="eyebrow">Product catalog</p>
        <h1>LED products for practical indoor lighting projects.</h1>
        <p>
          Browse simple overviews for Simlux LED strips, bulbs, and decorative lighting options.
          Contact us with your target application and quantity for product matching.
        </p>
      </section>

      <section className="section products-layout">
        <aside className="filter-panel" aria-label="Product category filters">
          <div className="filter-title">
            <Filter size={18} aria-hidden="true" />
            <strong>Categories</strong>
          </div>
          <Link className={activeCategory === "all" ? "active" : ""} href="/products">
            All products
          </Link>
          {categories.map((category) => (
            <Link
              className={activeCategory === category.id ? "active" : ""}
              href={`/products?category=${category.id}`}
              key={category.id}
            >
              {category.name}
            </Link>
          ))}
        </aside>

        <div className="product-grid catalog">
          {visibleProducts.map((product) => (
            <Link className="product-card" href={`/products/${product.slug}`} key={product.slug}>
              <Image
                src={product.image}
                alt={`${product.name} product scene`}
                width={900}
                height={675}
                sizes="(max-width: 980px) 100vw, 33vw"
              />
              <div>
                <span>{product.categoryName}</span>
                <h3>{product.name}</h3>
                <p>{product.summary}</p>
                <strong className="card-link">
                  View details <ArrowRight size={15} aria-hidden="true" />
                </strong>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
