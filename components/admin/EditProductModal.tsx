/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from 'react';

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProduct: any) => void;
  product: any;
}

export default function EditProductModal({ isOpen, onClose, onSave, product }: EditProductModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    unit: 'kg',
    description: '',
    sku: '',
    stock: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const categories = [
    'Beef',
    'Goat Meat',
    'Chicken',
    'Turkey',
    'Rabbit',
    'Meat Sharing',
    'Premium Beef',
    'Organic Chicken',
    'Tender Lamb',
    'Artisan Sausages'
  ];

  const units = [
    { value: 'kg', label: 'Per Kilogram (/kg)' },
    { value: 'piece', label: 'Per Piece (/pc)' },
    { value: 'box', label: 'Per Box (/box)' },
    { value: 'pack', label: 'Per Pack (/pack)' },
  ];

  // Initialize form with product data when modal opens
  useEffect(() => {
    if (product) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: product.name || '',
        category: product.category || '',
        price: product.price?.toString() || '',
        unit: product.weightUnit || 'kg',
        description: product.description || '',
        sku: product.sku || '',
        stock: product.stock?.toString() || '',
      });
      setImagePreview(product.image || '');
    }
  }, [product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedProduct = {
      ...product,
      name: formData.name,
      category: formData.category,
      price: parseInt(formData.price) || 0,
      description: formData.description,
      weightUnit: formData.unit,
      sku: formData.sku,
      stock: parseInt(formData.stock) || 0,
      image: imagePreview || product.image,
    };

    onSave(updatedProduct);
    handleClose();
  };

  const handleClose = () => {
    setImageFile(null);
    onClose();
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto p-4 md:p-8 animate-in fade-in duration-200">
      {/* Modal Content Container */}
      <div className="relative w-full max-w-160 bg-white rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-2 duration-300">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#dfe6db]">
          <div className="flex flex-col">
            <h1 className="text-[#131811] text-2xl font-bold">Edit Product</h1>
            <p className="text-[#6f8961] text-sm">Update the details for your inventory item.</p>
          </div>
          <button 
            onClick={handleClose}
            className="text-[#6f8961] hover:text-[#131811] transition-colors"
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
        </div>

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 px-8 py-3 bg-[#f2f4f0] border-b border-[#dfe6db]">
          <span className="text-[#6f8961] text-xs font-medium uppercase tracking-wider">Inventory</span>
          <span className="text-[#6f8961] text-xs">/</span>
          <span className="text-[#131811] text-xs font-bold uppercase tracking-wider">Edit: {product.name}</span>
        </div>

        {/* Modal Body (Form) */}
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Image Section */}
          <div className="flex flex-col gap-4">
            <p className="text-[#131811] text-base font-semibold">Product Photo</p>
            <div className="flex items-center gap-6">
              <div className="relative group cursor-pointer">
                <div 
                  className="size-28 bg-center bg-no-repeat bg-cover rounded-lg border-2 border-primary/30"
                  style={{ backgroundImage: `url('${imageFile}')` }}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-white">edit</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[#131811] text-base font-medium">{product.name}</p>
                <label className="text-primary text-sm font-bold hover:underline flex items-center gap-1 cursor-pointer">
                  <span className="material-symbols-outlined text-sm">upload</span>
                  <span>Replace current photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                <p className="text-[#6f8961] text-xs">Recommended: 800x800px JPG or PNG</p>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 gap-5">
            {/* Name Field */}
            <div className="flex flex-col gap-2">
              <label className="text-[#131811] text-sm font-bold">Product Name</label>
              <input
                required
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-[#dfe6db] focus:border-primary focus:ring-2 focus:ring-primary/20 h-12 px-4 text-[#131811] placeholder:text-[#6f8961] transition-all bg-[#f2f4f0]"
                placeholder="Enter product name"
                type="text"
              />
            </div>

            {/* Category Field */}
            <div className="flex flex-col gap-2">
              <label className="text-[#131811] text-sm font-bold">Category</label>
              <select
                required
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-[#dfe6db] focus:border-primary focus:ring-2 focus:ring-primary/20 h-12 px-4 text-[#131811] transition-all bg-[#f2f4f0] cursor-pointer"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Price and Unit Group */}
            <div className="flex flex-col md:flex-row gap-5">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[#131811] text-sm font-bold">Price (₦)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6f8961] font-medium">₦</span>
                  <input
                    required
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-[#dfe6db] focus:border-primary focus:ring-2 focus:ring-primary/20 h-12 pl-10 pr-4 text-[#131811] transition-all bg-[#f2f4f0]"
                    type="number"
                    min="0"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full md:w-32">
                <label className="text-[#131811] text-sm font-bold">Unit</label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#dfe6db] focus:border-primary focus:ring-2 focus:ring-primary/20 h-12 px-4 text-[#131811] transition-all bg-[#f2f4f0] cursor-pointer"
                >
                  {units.map((unit) => (
                    <option key={unit.value} value={unit.value}>{unit.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* SKU Field */}
            <div className="flex flex-col gap-2">
              <label className="text-[#131811] text-sm font-bold">SKU</label>
              <input
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-[#dfe6db] focus:border-primary focus:ring-2 focus:ring-primary/20 h-12 px-4 text-[#131811] placeholder:text-[#6f8961] transition-all bg-[#f2f4f0]"
                placeholder="Product SKU"
                type="text"
              />
            </div>

            {/* Stock Field */}
            <div className="flex flex-col gap-2">
              <label className="text-[#131811] text-sm font-bold">Stock Quantity</label>
              <input
                required
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-[#dfe6db] focus:border-primary focus:ring-2 focus:ring-primary/20 h-12 px-4 text-[#131811] transition-all bg-[#f2f4f0]"
                type="number"
                min="0"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label className="text-[#131811] text-sm font-bold">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-[#dfe6db] focus:border-primary focus:ring-2 focus:ring-primary/20 min-h-25 p-4 text-[#131811] placeholder:text-[#6f8961] transition-all bg-[#f2f4f0]"
                placeholder="Describe the meat cut, origin, or preparation details..."
                rows={3}
              />
            </div>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-[#dfe6db] px-8 py-6 bg-[#f2f4f0]">
          <button
            type="button"
            onClick={handleClose}
            className="px-6 py-3 rounded-lg border border-[#dfe6db] text-[#131811] font-bold text-sm hover:bg-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-8 py-3 rounded-lg bg-primary text-[#162210] font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}