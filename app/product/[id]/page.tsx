// app/product/[id]/page.tsx
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductDetails from "@/components/ProductDetails";
import { products } from "@/data/product";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  // Use React's use() hook to unwrap the Promise
  const { id } = use(params);

  const productId = id;

  const product = products.find((p) => p.id === productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <main className="flex flex-1 justify-center py-8">
        <div className="layout-content-container flex flex-col max-w-full w-full flex-1 px-4 sm:px-4 md:px-8 lg:px-20">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap gap-2 py-4">
            <Link
              href="/"
              className="text-[#6f8961] text-sm tracking-widest hover:underline font-bold"
            >
              SHOP
            </Link>
            <span className="text-[#6f8961] text-sm">/</span>
            <span className="text-[#131811] text-sm font-bold">
              {product.category}
            </span>
            <span className="text-[#6f8961] text-sm">/</span>
            <span className="text-[#131811] text-sm font-bold">
              {product.name}
            </span>
          </div>

          {/* Product Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 py-4">
            <div className="lg:col-span-7">
              <ProductImageGallery
                productName={product.name}
                tag={product.tag}
                tagColor={product.tagColor}
                images={product?.weightOptions.map(wImage => wImage.image)}
              />
            </div>

            <div className="lg:col-span-5">
              <ProductDetails product={product} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
