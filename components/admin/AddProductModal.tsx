// components/admin/AddProductModal.tsx
"use client";

import { useState } from 'react';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: unknown) => void;
}

export default function AddProductModal({ isOpen, onClose, onAddProduct }: AddProductModalProps) {
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

  const generateSKU = () => {
    const categoryCode = formData.category.slice(0, 3).toUpperCase();
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `MEA-${randomNum}-${categoryCode}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct = {
      // eslint-disable-next-line react-hooks/purity
      id: Date.now(),
      name: formData.name,
      category: formData.category,
      price: parseInt(formData.price) || 0,
      description: formData.description,
      weightUnit: formData.unit,
      sku: formData.sku || generateSKU(),
      stock: parseInt(formData.stock) || 0,
      image: imagePreview || 'https://images.unsplash.com/photo-1604503468505-6f3d5a7353e5?w=800',
      tag: 'New',
      tagColor: 'primary',
      reviewsCount: 0,
      tags: [
        { icon: "eco", label: "Grass-fed", color: "primary" },
        { icon: "location_on", label: "Local Farm" },
      ],
      details: {
        cookingTips: [
          "Season generously with sea salt and cracked pepper.",
          "Sear in a cast-iron skillet for 3-4 minutes per side for Medium-Rare.",
          "Let rest for at least 5 minutes before slicing."
        ],
        nutritionalInfo: [
          "Protein: 25g per 100g",
          "Fat: 15g per 100g",
          "Calories: 250 per 100g",
        ]
      }
    };

    onAddProduct(newProduct);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      name: '',
      category: '',
      price: '',
      unit: 'kg',
      description: '',
      sku: '',
      stock: '',
    });
    setImageFile(null);
    setImagePreview('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto p-4 md:p-8 animate-in fade-in duration-200">
      {/* Modal Content Container */}
      <div className="relative w-full max-w-160 bg-white rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-2 duration-300">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#dfe6db]">
          <h1 className="text-[#131811] tracking-light text-2xl font-bold leading-tight">Add New Product</h1>
          <button 
            onClick={handleClose}
            className="text-[#6f8961] hover:text-[#131811] transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Modal Body (Form) */}
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Basic Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col flex-1">
              <label className="text-[#131811] text-sm font-semibold pb-2">Product Name *</label>
              <input
                required
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full rounded-lg text-[#131811] focus:ring-2 focus:ring-primary focus:border-primary border border-[#dfe6db] bg-[#f2f4f0] h-12 placeholder:text-[#6f8961] px-4 text-base"
                placeholder="e.g. Boneless Beef"
                type="text"
              />
            </div>
            
            <div className="flex flex-col flex-1">
              <label className="text-[#131811] text-sm font-semibold pb-2">Category *</label>
              <div className="relative">
                <select
                  required
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="appearance-none w-full rounded-lg text-[#131811] focus:ring-2 focus:ring-primary focus:border-primary border border-[#dfe6db] bg-[#f2f4f0] h-12 p-4 text-base cursor-pointer"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-[#6f8961]">expand_more</span>
              </div>
            </div>
          </div>

          {/* Pricing & Unit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col flex-1">
              <label className="text-[#131811] text-sm font-semibold pb-2">Price (₦) *</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-[#6f8961]">₦</span>
                <input
                  required
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full rounded-lg text-[#131811] focus:ring-2 focus:ring-primary focus:border-primary border border-[#dfe6db] bg-[#f2f4f0] h-12 placeholder:text-[#6f8961] pl-8 pr-4 text-base"
                  placeholder="0.00"
                  type="number"
                  min="0"
                />
              </div>
            </div>
            
            <div className="flex flex-col flex-1">
              <label className="text-[#131811] text-sm font-semibold pb-2">Unit *</label>
              <div className="relative">
                <select
                  required
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  className="appearance-none w-full rounded-lg text-[#131811] focus:ring-2 focus:ring-primary focus:border-primary border border-[#dfe6db] bg-[#f2f4f0] h-12 p-4 text-base cursor-pointer"
                >
                  {units.map((unit) => (
                    <option key={unit.value} value={unit.value}>{unit.label}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-[#6f8961]">expand_more</span>
              </div>
            </div>
          </div>

          {/* SKU & Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col flex-1">
              <label className="text-[#131811] text-sm font-semibold pb-2">SKU</label>
              <div className="flex gap-2">
                <input
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  className="flex-1 rounded-lg text-[#131811] focus:ring-2 focus:ring-primary focus:border-primary border border-[#dfe6db] bg-[#f2f4f0] h-12 placeholder:text-[#6f8961] px-4 text-base"
                  placeholder="MEA-001-BEEF"
                  type="text"
                />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, sku: generateSKU() }))}
                  className="px-4 bg-[#f2f4f0] hover:bg-[#e2e8e2] text-[#6f8961] rounded-lg font-medium"
                >
                  Generate
                </button>
              </div>
            </div>
            
            <div className="flex flex-col flex-1">
              <label className="text-[#131811] text-sm font-semibold pb-2">Initial Stock *</label>
              <input
                required
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className="w-full rounded-lg text-[#131811] focus:ring-2 focus:ring-primary focus:border-primary border border-[#dfe6db] bg-[#f2f4f0] h-12 placeholder:text-[#6f8961] px-4 text-base"
                placeholder="0"
                type="number"
                min="0"
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col w-full">
            <label className="text-[#131811] text-sm font-semibold pb-2">Description *</label>
            <textarea
              required
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full rounded-lg text-[#131811] focus:ring-2 focus:ring-primary focus:border-primary border border-[#dfe6db] bg-[#f2f4f0] min-h-25 placeholder:text-[#6f8961] p-4 text-base"
              placeholder="Describe the meat cut, origin, or preparation details..."
              rows={3}
            />
          </div>

          {/* Image Upload */}
          <div className="flex flex-col w-full">
            <label className="text-[#131811] text-sm font-semibold pb-2">Product Image</label>
            <div className="relative">
              {imagePreview ? (
                <div className="relative">
                  <div 
                    className="w-full h-48 rounded-xl bg-cover bg-center"
                    style={{ backgroundImage: `url(${imageFile})` }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview('');
                      setImageFile(null);
                    }}
                    className="absolute top-2 right-2 size-8 bg-red-500 text-white rounded-full flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              ) : (
                <label className="border-2 border-dashed border-[#dfe6db] rounded-xl p-8 flex flex-col items-center justify-center bg-[#f2f4f0] hover:bg-primary/5 hover:border-primary transition-colors cursor-pointer group">
                  <div className="size-12 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl">cloud_upload</span>
                  </div>
                  <p className="text-[#131811] font-medium mb-1">Click to upload or drag and drop</p>
                  <p className="text-[#6f8961] text-xs">PNG, JPG or WEBP (max. 5MB)</p>
                  <input
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-8 py-6 border-t border-[#dfe6db] bg-[#f2f4f0]">
          <button
            type="button"
            onClick={handleClose}
            className="px-6 py-2.5 rounded-lg text-sm font-bold text-[#131811] hover:bg-[#dfe6db] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-8 py-2.5 rounded-lg bg-primary text-[#162210] text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}