'use client';

import {useState} from 'react';
import {Product} from '@/services/productService';
import {useCart} from '@/context/CartContext';
import {
  Star,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  Snowflake,
  Heart,
  Share2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({product}: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState(
    product.weightOptions?.[0] || null,
  );
  const [expandedSections, setExpandedSections] = useState({
    description: true,
    details: false,
  });

  const {addToCart} = useCart();

  // Calculate prices
  const basePrice = product.price;
  const unitPrice = selectedWeight
    ? basePrice * selectedWeight.multiplier
    : basePrice;
  const totalPrice = unitPrice * quantity;

  const formatPrice = (price: number) => {
    return `₦${price.toFixed(2)}`;
  };

  const handleAddToCart = () => {
    if (!selectedWeight) return;

    addToCart({
      id: `${product.id}-${selectedWeight.label}`,
      name: product.name,
      image: product.image,
      basePrice: product.price,
      unitPrice: unitPrice,
      quantity: quantity,
      weight: selectedWeight.label,
    });
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const hasCookingTips = product.cookingTips && product.cookingTips.length > 0;
  const hasNutritionalInfo =
    product.nutritionalInfo && product.nutritionalInfo.length > 0;
  const hasDetails = hasCookingTips || hasNutritionalInfo;

  return (
    <div className="flex flex-col gap-6">
      {/* Product Header */}
      <div>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-primary font-semibold text-xs uppercase tracking-wider mb-1">
              Premium Quality
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Save to favorites"
            >
              <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" />
            </button>
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Share"
            >
              <Share2 className="w-5 h-5 text-gray-400 hover:text-primary transition-colors" />
            </button>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating || 0)
                    ? 'fill-primary text-primary'
                    : 'fill-gray-200 text-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">
            {product.reviewsCount || 0} reviews
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-gray-900">
          {formatPrice(unitPrice)}
        </span>
        <span className="text-sm text-gray-500 font-medium">
          / {selectedWeight?.label || 'kg'}
        </span>
        {selectedWeight && selectedWeight.multiplier > 1 && (
          <span className="text-sm text-gray-400 line-through">
            {formatPrice(basePrice)} / kg
          </span>
        )}
      </div>

      {/* Weight Selection */}
      {product.weightOptions && product.weightOptions.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Select Weight
          </label>
          <div className="grid grid-cols-3 gap-2">
            {product.weightOptions.map(weight => (
              <button
                key={weight.id || weight.label}
                onClick={() => setSelectedWeight(weight)}
                className={`px-4 py-3 rounded-lg border-2 text-center transition-all ${
                  selectedWeight?.label === weight.label
                    ? 'border-primary bg-primary/5 text-primary font-semibold shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <span className="text-sm">{weight.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tags/Badges */}
      {product.tags && product.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {product.tags.map(tag => (
            <span
              key={tag.id}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                tag.color === 'primary'
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {tag.icon && <span>{tag.icon}</span>}
              {tag.label}
            </span>
          ))}
        </div>
      )}

      {/* Description - Collapsible */}
      <div className="border-t border-gray-100 pt-4">
        <button
          onClick={() => toggleSection('description')}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="font-semibold text-gray-900">Description</span>
          {expandedSections.description ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </button>
        {expandedSections.description && (
          <p className="mt-3 text-gray-600 leading-relaxed text-sm">
            {product.description}
          </p>
        )}
      </div>

      {/* Additional Details - Collapsible */}
      {hasDetails && (
        <div className="border-t border-gray-100 pt-4">
          <button
            onClick={() => toggleSection('details')}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="font-semibold text-gray-900">Product Details</span>
            {expandedSections.details ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>
          {expandedSections.details && (
            <div className="mt-3 space-y-3">
              {hasCookingTips && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Cooking Tips
                  </h4>
                  <ul className="space-y-1.5">
                    {product.cookingTips!.map(tip => (
                      <li
                        key={tip.id}
                        className="text-sm text-gray-600 flex items-start gap-2"
                      >
                        <span className="text-primary mt-0.5">•</span>
                        {tip.tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {hasNutritionalInfo && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Nutritional Information
                  </h4>
                  <ul className="space-y-1.5">
                    {product.nutritionalInfo!.map(info => (
                      <li
                        key={info.id}
                        className="text-sm text-gray-600 flex items-start gap-2"
                      >
                        <span className="text-primary mt-0.5">•</span>
                        {info.info}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Purchase Section */}
      <div className="border-t border-gray-100 pt-6 mt-2">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Quantity Selector */}
          <div className="w-auto flex items-center bg-gray-50 rounded-xl border border-gray-200">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-3 hover:bg-gray-100 rounded-l-xl transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4 text-gray-600" />
            </button>
            <span className="w-full sm:w-12 text-center font-semibold text-gray-900">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-3 hover:bg-gray-100 rounded-r-xl transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-gray-900 font-bold py-3.5 px-6 rounded-xl transition-all shadow-sm hover:shadow-md"
          >
            <ShoppingBag className="w-5 h-5" />
            Add to Basket
            <span className="text-sm font-normal text-gray-700 ml-1">
              {formatPrice(totalPrice)}
            </span>
          </button>
        </div>

        {/* Shipping Info */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-4 py-3">
            <Truck className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-gray-600">
              Next Day Delivery
            </span>
          </div>
          <div className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-4 py-3">
            <Snowflake className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-gray-600">
              Chilled Shipping
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
