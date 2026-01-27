"use client";

import { useState } from 'react';
import { Product } from '@/data/product';

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'cooking' | 'nutrition'>('cooking');

  const totalPrice = (product.price * quantity / 100).toFixed(2);

  const formatPrice = (price: number) => {
    return `₦${(price / 100).toFixed(2)}`;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-primary font-bold tracking-widest text-xs uppercase">Limited Reserve</p>
        <h1 className="text-[#131811] text-2xl lg:text-4xl font-black leading-tight tracking-tight">
          {product.name}
        </h1>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex text-primary">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="material-symbols-outlined text-sm">
                star
              </span>
            ))}
          </div>
          <span className="text-sm text-[#6f8961] font-medium">
            ({product.reviewsCount || 0} reviews)
          </span>
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-xl lg:text-2xl font-black text-[#131811]">
          {formatPrice(product.price)}
        </span>
        {product.weightUnit && (
          <span className="text-[#6f8961] text-lg lg:text-xl font-normal">
            / {product.weightUnit}
          </span>
        )}
      </div>

      {product.tags && product.tags.length > 0 && (
        <div className="flex gap-3 flex-wrap">
          {product.tags.map((tag, index) => (
            <div 
              key={index}
              className={`flex h-8 items-center justify-center gap-x-2 rounded-lg px-4 ${
                tag.color === 'primary' 
                  ? 'bg-primary/20 border border-primary/30' 
                  : 'bg-[#f2f4f0]'
              }`}
            >
              <span className="material-symbols-outlined text-sm text-[#131811]">
                {tag.icon}
              </span>
              <p className="text-[#131811] text-xs font-bold uppercase tracking-wider">
                {tag.label}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="prose">
        <p className="text-[#131811] leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Purchase Actions */}
      <div className="flex flex-col gap-4 pt-4 border-t border-[#e5e7e5]">
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-[#f2f4f0] rounded-lg h-12 px-2">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-md transition-colors"
            >
              <span className="material-symbols-outlined">remove</span>
            </button>
            <span className="w-12 text-center font-bold text-lg">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-md transition-colors"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
          <div className="flex-1">
            <p className="text-[10px] uppercase font-bold text-[#6f8961] mb-1">Total Estimated</p>
            <p className="font-bold text-lg">₦{totalPrice}</p>
          </div>
        </div>
        <button className="flex w-full items-center justify-center gap-3 rounded-lg h-14 bg-primary text-[#131811] text-lg font-black tracking-wide hover:opacity-90 transition-all shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined">shopping_basket</span>
          Add to Basket
        </button>
        <div className="flex items-center justify-center gap-4 lg:gap-6 mt-2">
          <div className="flex items-center gap-2 text-[11px] font-bold text-[#6f8961] uppercase">
            <span className="material-symbols-outlined text-lg">local_shipping</span>
            Next Day Delivery
          </div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-[#6f8961] uppercase">
            <span className="material-symbols-outlined text-lg">ac_unit</span>
            Chilled Shipping
          </div>
        </div>
      </div>

      {/* Info Tabs */}
      {product.details && (
        <div className="flex flex-col gap-1 pt-4">
          <div className="border-b border-[#e5e7e5] py-4">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setActiveTab(activeTab === 'cooking' ? 'nutrition' : 'cooking')}
            >
              <span className="font-bold text-sm uppercase tracking-widest">
                {activeTab === 'cooking' ? 'Cooking Tips' : 'Nutritional Info'}
              </span>
              <span className="material-symbols-outlined">
                {activeTab === 'cooking' ? 'expand_less' : 'expand_more'}
              </span>
            </div>
            {activeTab === 'cooking' && product.details.cookingTips && (
              <div className="mt-4 text-sm text-[#6f8961] space-y-2">
                {product.details.cookingTips.map((tip, index) => (
                  <p key={index}>• {tip}</p>
                ))}
              </div>
            )}
            {activeTab === 'nutrition' && product.details.nutritionalInfo && (
              <div className="mt-4 text-sm text-[#6f8961] space-y-2">
                {product.details.nutritionalInfo.map((info, index) => (
                  <p key={index}>• {info}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}