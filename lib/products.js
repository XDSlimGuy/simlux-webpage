import catalog from "@/content/products.json";

export const categories = catalog.categories;
export const products = catalog.products;

export function getProduct(slug) {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(category) {
  if (!category || category === "all") return products;
  return products.filter((product) => product.category === category);
}
