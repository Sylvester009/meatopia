'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Plus, Trash2, Upload } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProduct: any) => void;
  product: any;
}

export default function EditProductModal({
  isOpen,
  onClose,
  onSave,
  product,
}: EditProductModalProps) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: '',
    price: '',
    description: '',
    image: '',
    tag: '',
    reviewsCount: 0,
    weightOptions: [{ label: '1kg', multiplier: 1, image: '' }],
    tags: [{ label: '', icon: '', color: 'primary' }],
    details: { cookingTips: [''], nutritionalInfo: [''] },
  });
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (product) {
      const weightOptions = product.weightOptions?.map((opt: any) => ({
        label: opt.label || '',
        multiplier: opt.multiplier || 1,
        image: opt.image || '',
      })) || [{ label: '1kg', multiplier: 1, image: '' }];

      setFormData({
        id: product.id || '',
        name: product.name || '',
        category: product.category || '',
        price: product.price?.toString() || '',
        description: product.description || '',
        image: product.image || '',
        tag: product.tag || '',
        reviewsCount: product.reviewsCount || 0,
        weightOptions: weightOptions,
        tags: product.tags || [{ label: '', icon: '', color: 'primary' }],
        details: product.details || { cookingTips: [''], nutritionalInfo: [''] },
      });
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleImageUpload = async (file: File, type: 'main' | 'weight', index?: number) => {
    try {
      setUploading(true);
      setUploadProgress(0);

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        console.error('Upload error:', error);
        alert('Failed to upload image. Please try again.');
        setUploading(false);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      setUploadProgress(100);

      if (type === 'main') {
        setFormData(prev => ({ ...prev, image: publicUrl }));
      } else if (type === 'weight' && index !== undefined) {
        setFormData(prev => ({
          ...prev,
          weightOptions: prev.weightOptions.map((opt, i) =>
            i === index ? { ...opt, image: publicUrl } : opt
          ),
        }));
      }

      setUploading(false);
      setUploadProgress(0);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image.');
      setUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'main' | 'weight', index?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB.');
      return;
    }

    handleImageUpload(file, type, index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProduct = {
      ...formData,
      id: product.id,
      price: parseFloat(formData.price) || 0,
      reviewsCount: Number(formData.reviewsCount) || 0,
    };
    onSave(updatedProduct);
  };

  const addWeightOption = () => {
    setFormData(prev => ({
      ...prev,
      weightOptions: [
        ...prev.weightOptions,
        { label: '', multiplier: 1, image: '' },
      ],
    }));
  };

  const removeWeightOption = (index: number) => {
    setFormData(prev => ({
      ...prev,
      weightOptions: prev.weightOptions.filter((_, i) => i !== index),
    }));
  };

  const updateWeightOption = (
    index: number,
    field: string,
    value: string | number,
  ) => {
    setFormData(prev => ({
      ...prev,
      weightOptions: prev.weightOptions.map((opt, i) =>
        i === index ? { ...opt, [field]: value } : opt,
      ),
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Edit Product</h2>
            <p className="text-sm text-gray-500">Update product details</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e =>
                  setFormData(prev => ({ ...prev, name: e.target.value }))
                }
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={e =>
                  setFormData(prev => ({ ...prev, category: e.target.value }))
                }
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
              >
                <option value="">Select Category</option>
                <option value="Beef">Beef</option>
                <option value="Chicken">Chicken</option>
                <option value="Goat Meat">Goat Meat</option>
                <option value="Turkey">Turkey</option>
                <option value="Rabbit">Rabbit</option>
                <option value="Meat Sharing">Meat Sharing</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (₦) *
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={e =>
                  setFormData(prev => ({ ...prev, price: e.target.value }))
                }
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tag
              </label>
              <input
                type="text"
                value={formData.tag}
                onChange={e =>
                  setFormData(prev => ({ ...prev, tag: e.target.value }))
                }
                placeholder="e.g. Popular, Premium"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={e =>
                setFormData(prev => ({ ...prev, description: e.target.value }))
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all resize-none"
            />
          </div>

          {/* Main Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Image *
            </label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={formData.image}
                  onChange={e =>
                    setFormData(prev => ({ ...prev, image: e.target.value }))
                  }
                  placeholder="Image URL or upload below"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                />
              </div>
              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileSelect(e, 'main')}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors disabled:opacity-50"
                >
                  <Upload className="w-4 h-4" />
                  Upload
                </button>
              </div>
            </div>
            {uploading && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Uploading... {uploadProgress}%</p>
              </div>
            )}
            {formData.image && (
              <div className="mt-2 relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={formData.image}
                  alt="Product preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* Weight Options */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Weight Options
              </label>
              <button
                type="button"
                onClick={addWeightOption}
                className="flex items-center gap-1 text-sm text-primary font-medium hover:underline"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
            <div className="space-y-3">
              {formData.weightOptions.map((option, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Label (e.g. 1kg)"
                    value={option.label || ''}
                    onChange={e =>
                      updateWeightOption(index, 'label', e.target.value)
                    }
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Multiplier"
                    step="0.1"
                    value={option.multiplier || 1}
                    onChange={e =>
                      updateWeightOption(
                        index,
                        'multiplier',
                        parseFloat(e.target.value) || 1,
                      )
                    }
                    className="w-24 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm"
                  />
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={option.image || ''}
                      onChange={e =>
                        updateWeightOption(index, 'image', e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm pr-20"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/*';
                        input.onchange = (e) => {
                          const file = (e.target as HTMLInputElement).files?.[0];
                          if (file) handleImageUpload(file, 'weight', index);
                        };
                        input.click();
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      Upload
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeWeightOption(index)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-2.5 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="flex-1 px-6 py-2.5 bg-primary text-[#162210] font-bold rounded-xl hover:bg-primary/90 transition-all shadow-sm hover:shadow-md disabled:opacity-50"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}