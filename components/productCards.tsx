// components/ProductCard.tsx
'use client';

import {Product} from '@/services/productService';
import Link from 'next/link';
import {useCart} from '@/context/CartContext';
import {useState} from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({product}: ProductCardProps) {
  const {addToCart} = useCart();
  const [imageError, setImageError] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState<{
    label: string;
    multiplier: number;
  } | null>(null);

  // Helper to get the correct image URL
  const getImageUrl = (url: string) => {
    if (!url) return '/images/placeholder.png';

    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }

    if (url.startsWith('data:image')) {
      return url;
    }

    if (url.startsWith('/images/') || url.startsWith('images/')) {
      return url;
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && !url.includes('http')) {
      return `${supabaseUrl}/storage/v1/object/public/products/${url}`;
    }

    return url;
  };

  // Get weight options
  const weightOptions = product.weight_options || [];
  const hasWeightOptions = weightOptions.length > 0;

  // Default to first weight option or create a default
  const defaultWeight = hasWeightOptions
    ? weightOptions[0]
    : {label: '1kg', multiplier: 1};

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const weight = selectedWeight || defaultWeight;

    // Calculate the price based on selected weight
    const unitPrice = product.price * weight.multiplier;

    const cartItem = {
      id: product.id,
      name: product.name,
      image: getImageUrl(product.image),
      basePrice: product.price,
      unitPrice: unitPrice,
      quantity: 1,
      weight: weight.label,
    };

    addToCart(cartItem);
  };

  const handleWeightSelect = (
    e: React.MouseEvent,
    option: {label: string; multiplier: number},
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedWeight(option);
  };

  return (
    <div className="flex flex-col gap-0 bg-white rounded-xl border border-[#e2e8e2] overflow-hidden group hover:shadow-xl transition-all hover:-translate-y-1">
      <Link href={`/product/${product.id}`}>
        <div className="relative w-full aspect-4/3 overflow-hidden bg-gray-100">
          {/* Tag Badge */}
          {product.tag && (
            <div
              className={`absolute top-3 ${product.tag === 'Best Value' ? 'right-3' : 'left-3'} z-10`}
            >
              <span
                className={`text-[10px] font-black uppercase px-2 py-1 rounded ${
                  product.tagColor === 'primary'
                    ? 'bg-primary text-[#162210]'
                    : product.tagColor === 'gold'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-[#131811] text-white'
                }`}
              >
                {product.tag}
              </span>
            </div>
          )}

          {/* Rating Badge */}
          {product.rating && (
            <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 text-xs font-medium">
              <span className="text-yellow-500">★</span>
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-[#6f8961]">({product.reviewsCount})</span>
            </div>
          )}

          {/* Product Image */}
          <div
            className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-110"
            style={{
              backgroundImage: `url("${imageError ? '/images/placeholder.png' : getImageUrl(product.image)}")`,
            }}
            onError={() => setImageError(true)}
          ></div>

          {/* Quick Add to Cart Button (on hover) */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-3 right-3 bg-primary text-[#162210] p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110 transform"
            aria-label="Add to cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          </button>
        </div>

        <div className="p-5 flex flex-col gap-1">
          <p className="text-[#6f8961] text-[10px] font-bold uppercase tracking-widest">
            {product.category}
          </p>
          <h3 className="text-[#131811] text-lg font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="text-[#6f8961] text-sm font-normal mb-1 line-clamp-2">
            {product.description}
          </p>

          {/* Weight Options - Click to Select */}
          {hasWeightOptions && (
            <div className="flex flex-wrap gap-1 mt-1">
              {weightOptions.slice(0, 4).map(option => {
                const isSelected =
                  selectedWeight?.label === option.label ||
                  (!selectedWeight && option.label === defaultWeight.label);
                return (
                  <button
                    key={option.id || option.label}
                    onClick={e => handleWeightSelect(e, option)}
                    className={`text-[10px] px-2 py-0.5 rounded transition-colors ${
                      isSelected
                        ? 'bg-primary text-[#162210] font-medium'
                        : 'bg-[#eef2ee] text-[#6f8961] hover:bg-[#dce4dc]'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
              {weightOptions.length > 4 && (
                <span className="text-[10px] text-[#6f8961]">
                  +{weightOptions.length - 4} more
                </span>
              )}
            </div>
          )}

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {product.tags.slice(0, 2).map(tag => (
                <span
                  key={tag.id}
                  className="text-[10px] bg-[#eef2ee] text-[#6f8961] px-2 py-0.5 rounded flex items-center gap-1"
                >
                  {tag.icon && <span className="text-[10px]">{tag.icon}</span>}
                  {tag.label}
                </span>
              ))}
            </div>
          )}

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#eef2ee]">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-[#131811]">
                ₦
                {(
                  (product.price *
                    (selectedWeight?.multiplier || defaultWeight.multiplier))
                ).toFixed(2)}
              </span>
              <span className="text-[10px] text-[#6f8961]">
                per {selectedWeight?.label || defaultWeight.label}
              </span>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-[#eef2ee] hover:bg-primary text-[#131811] hover:text-[#162210] px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
