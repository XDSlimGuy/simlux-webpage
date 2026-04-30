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
        <h1>LED products for practical indoor lighting projects.</h1>
        <p>
          Browse simple overviews for Simlux LED strips, bulbs, and decorative lighting options.
          Contact us with your target application and quantity for product matching.
        </p>
      </section>

      <ProductsCatalog initialCategory={activeCategory} />
    </>
  );
}
