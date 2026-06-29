'use client';

import { X, AlertTriangle } from 'lucide-react';
import Image from 'next/image';

interface DeleteProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  product: any;
}

export default function DeleteProductModal({
  isOpen,
  onClose,
  onConfirm,
  product,
}: DeleteProductModalProps) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Delete Product
          </h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-gray-900">
              "{product.name}"
            </span>
            ? This action cannot be undone.
          </p>

          {/* Product Preview */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg bg-gray-200 overflow-hidden shrink-0">
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div>
              <p className="font-medium text-gray-900">{product.name}</p>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="text-sm text-gray-500">
                ₦{product.price?.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-2.5 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="flex-1 px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all shadow-sm hover:shadow-md"
            >
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}