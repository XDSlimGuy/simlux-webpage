import { products } from "@/lib/products";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.simluxtechnology.com";

export default function sitemap() {
  return [
    "",
    "/products",
    "/about",
    "/contact",
    ...products.map((product) => `/products/${product.slug}`),
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path.includes("/products/") ? "monthly" : "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
