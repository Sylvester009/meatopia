'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  tag?: string;
  tagColor?: string;
}

export default function ProductImageGallery({
  images,
  productName,
  tag,
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

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

  // Filter out empty images and handle errors
  const displayImages = images
    .filter(img => img && img.trim() !== '')
    .map(img => getImageUrl(img));

  // If no images, use placeholder
  const finalImages = displayImages.length > 0 ? displayImages : ['/images/placeholder.png'];

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  const nextImage = () => {
    setSelectedImage(prev => (prev + 1) % finalImages.length);
  };

  const prevImage = () => {
    setSelectedImage(
      prev => (prev - 1 + finalImages.length) % finalImages.length
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div
        className="relative w-full aspect-square bg-gray-100 rounded-xl overflow-hidden group"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        {tag && (
          <div className="absolute top-4 left-4 z-10 bg-primary text-[#162210] font-bold text-xs uppercase px-3 py-1.5 rounded-full">
            {tag}
          </div>
        )}

        <div className="relative w-full h-full">
          <Image
            src={imageErrors[selectedImage] ? '/images/placeholder.png' : finalImages[selectedImage]}
            alt={`${productName} - Image ${selectedImage + 1}`}
            fill
            className={`object-cover transition-transform duration-300 ${
              isZoomed ? 'scale-110' : 'scale-100'
            }`}
            priority
            onError={() => handleImageError(selectedImage)}
          />
        </div>

        {/* Navigation Arrows - Only show if multiple images */}
        {finalImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {finalImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
            {selectedImage + 1} / {finalImages.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {finalImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {finalImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? 'border-primary shadow-md'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <Image
                src={imageErrors[index] ? '/images/placeholder.png' : image}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                onError={() => handleImageError(index)}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
