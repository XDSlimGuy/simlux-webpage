import site from "@/content/site.json";
import ProductsCatalog from "./products-catalog";

export const metadata = {
  title: "LED Products",
  description:
    "Browse Simlux Technology Limited LED strips, LED bulbs, and decorative LED lighting for indoor and commercial spaces.",
};

export default async function ProductsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const activeCategory = resolvedSearchParams?.category || "all";

  return (
    <>
      <section className="page-hero compact">
        <p className="eyebrow">Product catalog</p>
        <h1>{site.productsPage.heading}</h1>
        <p>
          {site.productsPage.intro}
        </p>
      </section>

      <ProductsCatalog initialCategory={activeCategory} />
    </>
  );
}

