// components/ProductImageGallery.tsx
"use client";

import { useState } from 'react';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  tag?: string;
  tagColor?: string;
}

export default function ProductImageGallery({ images, productName, tag }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full bg-white rounded-xl overflow-hidden shadow-sm aspect-4/3 relative">
        {tag && (
          <div className="absolute top-4 left-4 bg-primary text-[#162210] font-bold text-xs uppercase px-3 py-1 rounded-full z-10">
            {tag}
          </div>
        )}
        <div
          className="w-full h-full bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url("${images[selectedImage]}")` }}
          aria-label={`High resolution photo of ${productName}`}
        ></div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.slice(0, 3).map((image, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`aspect-square bg-center bg-no-repeat bg-cover rounded-lg cursor-pointer transition-all ${
              selectedImage === index 
                ? 'border-2 border-primary' 
                : 'border-2 border-transparent hover:border-primary/50'
            }`}
            style={{ backgroundImage: `url("${image}")` }}
            aria-label={`Thumbnail ${index + 1} for ${productName}`}
          ></div>
        ))}
        {images.length > 3 && (
          <div
            onClick={() => setSelectedImage(3)}
            className="aspect-square bg-center bg-no-repeat bg-cover rounded-lg hover:border-primary/50 border-2 border-transparent transition-all cursor-pointer flex items-center justify-center bg-black/40 relative overflow-hidden"
            style={{ backgroundImage: `url("${images[3]}")` }}
            aria-label={`More images of ${productName}`}
          >
            <span className="relative z-10 text-white font-bold">+{images.length - 3} More</span>
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        )}
      </div>
    </div>
  );
}