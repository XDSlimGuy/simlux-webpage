import ProductDetailView from "@/app/products/[slug]/product-detail-view";

export const metadata = { robots: { index: false, follow: false } };

const sample = {
  name: "Product", categoryName: "Category", summary: "Product description",
  image: "/products/led-application-collage.jpg",
  gallery: [{ src: "/products/led-application-collage.jpg", alt: "Product image" }],
  features: ["Product feature"], specs: { Specification: "Value" }, applications: ["Application"],
};

export default function ProductPreviewPage() {
  return <ProductDetailView product={sample} />;
}
