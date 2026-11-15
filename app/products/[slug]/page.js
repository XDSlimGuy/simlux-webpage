import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/products";
import ProductDetailView from "./product-detail-view";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const product = getProduct((await params).slug);
  return product ? { title: product.name, description: product.summary } : {};
}

export default async function ProductDetailPage({ params }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  return <ProductDetailView product={product} />;
}
