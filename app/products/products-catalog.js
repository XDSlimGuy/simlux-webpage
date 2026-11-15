"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Filter } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { categories, getProductsByCategory } from "@/lib/products";

const categoryIds = new Set(["all", ...categories.map((category) => category.id)]);

function normalizeCategory(category) {
  return categoryIds.has(category) ? category : "all";
}

function categoryFromLocation() {
  if (typeof window === "undefined") return "all";
  return normalizeCategory(new URLSearchParams(window.location.search).get("category") || "all");
}

export default function ProductsCatalog({ initialCategory }) {
  const [activeCategory, setActiveCategory] = useState(normalizeCategory(initialCategory));
  const visibleProducts = useMemo(() => getProductsByCategory(activeCategory), [activeCategory]);

  useEffect(() => {
    const syncCategory = () => setActiveCategory(categoryFromLocation());
    window.addEventListener("popstate", syncCategory);
    return () => window.removeEventListener("popstate", syncCategory);
  }, []);

  function selectCategory(category) {
    const nextCategory = normalizeCategory(category);
    setActiveCategory(nextCategory);

    const nextUrl =
      nextCategory === "all" ? "/products" : `/products?category=${encodeURIComponent(nextCategory)}`;
    window.history.pushState({}, "", nextUrl);
  }

  return (
    <section className="section products-layout">
      <aside className="filter-panel" aria-label="Product category filters">
        <div className="filter-title">
          <Filter size={18} aria-hidden="true" />
          <strong>Categories</strong>
        </div>
        <button className={activeCategory === "all" ? "active" : ""} type="button" onClick={() => selectCategory("all")}>
          All products
        </button>
        {categories.map((category) => (
          <button
            className={activeCategory === category.id ? "active" : ""}
            key={category.id}
            type="button"
            onClick={() => selectCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </aside>

      <div className="product-grid catalog" data-studio-catalog="all" key={activeCategory}>
        {visibleProducts.map((product) => (
          <Link className="product-card" data-studio-product={product.slug} href={`/products/${product.slug}`} key={product.slug}>
            <Image
              data-studio-field={`catalog.product.${product.slug}.image`}
              src={product.image}
              alt={`${product.name} product scene`}
              width={900}
              height={675}
              sizes="(max-width: 980px) 100vw, 33vw"
            />
            <div>
              <span data-studio-field={`catalog.product.${product.slug}.category`}>{product.categoryName}</span>
              <h3 data-studio-field={`catalog.product.${product.slug}.name`}>{product.name}</h3>
              <p data-studio-field={`catalog.product.${product.slug}.summary`}>{product.summary}</p>
              <strong className="card-link">
                View details <ArrowRight size={15} aria-hidden="true" />
              </strong>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
