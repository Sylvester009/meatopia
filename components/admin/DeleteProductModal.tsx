/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";

interface DeleteProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  product: any;
}

export default function DeleteProductModal({ isOpen, onClose, onConfirm, product }: DeleteProductModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 animate-in fade-in duration-200">
      {/* Dialog Container */}
      <div className="w-full max-w-110 bg-white rounded-xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        {/* Section Header with Warning Icon */}
        <div className="flex flex-col items-center pt-8 pb-4">
          <div className="flex items-center justify-center size-16 rounded-full bg-red-100 text-red-600 mb-4">
            <span className="material-symbols-outlined text-4xl!">warning</span>
          </div>
          
          {/* Headline Text */}
          <h2 className="text-[#131811] text-2xl font-bold leading-tight px-6 text-center">
            Delete Product?
          </h2>
        </div>

        {/* Body Text */}
        <div className="px-8 pb-8">
          <p className="text-[#6f8961] text-base font-normal leading-relaxed text-center">
            Are you sure you want to delete{' '}
            <span className="font-bold text-[#131811]">&apos;{product.name}&apos;</span>? 
            This action is permanent and cannot be undone.
          </p>
          
          {/* Product Details */}
          <div className="mt-6 p-4 bg-[#f2f4f0] rounded-lg">
            <div className="flex items-center gap-3">
              <Image
                className="size-16 rounded-lg bg-cover bg-center"
                src={product.image}
                alt={product.name}
              />
              <div>
                <p className="font-semibold text-[#131811]">{product.name}</p>
                <p className="text-sm text-[#6f8961]">SKU: {product.sku}</p>
                <p className="text-sm text-[#6f8961]">Category: {product.category}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Button Group */}
        <div className="flex flex-col sm:flex-row gap-3 px-8 pb-8">
          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="flex-1 order-2 sm:order-1 flex min-w-30 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-[#f2f4f0] hover:bg-[#e2e8e2] text-[#131811] text-sm font-bold leading-normal tracking-[0.015em] transition-colors"
          >
            <span className="truncate">Keep Product</span>
          </button>
          
          {/* Delete Button */}
          <button
            onClick={handleConfirm}
            className="flex-1 order-1 sm:order-2 flex min-w-30 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-red-500 hover:bg-red-600 text-white text-sm font-bold leading-normal tracking-[0.015em] transition-colors shadow-lg shadow-red-500/20"
          >
            <span className="truncate">Yes, Delete</span>
          </button>
        </div>

        {/* Subtle Brand Tag */}
        <div className="bg-primary/5 py-3 border-t border-[#dfe6db] flex justify-center">
          <div className="flex items-center gap-1.5 opacity-60">
            <div className="size-4 text-primary">
              <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z"></path>
              </svg>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#131811]">
              Meatopia Secure
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}