import ProductImageGallery from '@/components/ProductImageGallery';
import ProductDetails from '@/components/ProductDetails';
import {products} from '@/data/product';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {use} from 'react';
import {ArrowLeft} from 'lucide-react';

interface ProductPageProps {
  params: Promise<{id: string}>;
}

export default function ProductPage({params}: ProductPageProps) {
  const {id} = use(params);
  const product = products.find(p => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50/30">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        {/* Simplified Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm mb-6 lg:mb-8">
          <Link
            href="/"
            className="text-gray-500 hover:text-primary transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-500">{product.category}</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium truncate">
            {product.name}
          </span>
        </nav>

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-white rounded-2xl shadow-sm p-4 sm:p-6 lg:p-8">
          {/* Image Gallery */}
          <div className="lg:col-span-1">
            <ProductImageGallery
              productName={product.name}
              tag={product.tag}
              tagColor={product.tagColor}
              images={product?.weightOptions?.map(wImage => wImage.image) || []}
            />
          </div>

          {/* Product Details */}
          <div className="lg:col-span-1">
            <ProductDetails product={product} />
          </div>
        </div>
      </main>
    </div>
  );
}
