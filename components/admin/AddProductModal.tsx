'use client';

import {useState} from 'react';
import {X, Plus, Trash2} from 'lucide-react';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: any) => void;
}

export default function AddProductModal({
  isOpen,
  onClose,
  onAddProduct,
}: AddProductModalProps) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: '',
    price: '',
    description: '',
    image: '',
    tag: '',
    reviewsCount: 0,
    weightOptions: [{label: '1kg', multiplier: 1, image: ''}],
    tags: [{label: '', icon: '', color: 'primary'}],
    details: {cookingTips: [''], nutritionalInfo: ['']},
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      ...formData,
      id: formData.id || `product-${Date.now()}`,
      price: parseFloat(formData.price),
      reviewsCount: Number(formData.reviewsCount),
    };
    onAddProduct(newProduct);
  };

  const addWeightOption = () => {
    setFormData(prev => ({
      ...prev,
      weightOptions: [
        ...prev.weightOptions,
        {label: '', multiplier: 1, image: ''},
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
        i === index ? {...opt, [field]: value} : opt,
      ),
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
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
                  setFormData(prev => ({...prev, name: e.target.value}))
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
                  setFormData(prev => ({...prev, category: e.target.value}))
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
                  setFormData(prev => ({...prev, price: e.target.value}))
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
                  setFormData(prev => ({...prev, tag: e.target.value}))
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
                setFormData(prev => ({...prev, description: e.target.value}))
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={e =>
                setFormData(prev => ({...prev, image: e.target.value}))
              }
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
            />
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
                    value={option.label}
                    onChange={e =>
                      updateWeightOption(index, 'label', e.target.value)
                    }
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Multiplier"
                    step="0.1"
                    value={option.multiplier}
                    onChange={e =>
                      updateWeightOption(
                        index,
                        'multiplier',
                        parseFloat(e.target.value),
                      )
                    }
                    className="w-24 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm"
                  />
                  <input
                    type="url"
                    placeholder="Image URL"
                    value={option.image}
                    onChange={e =>
                      updateWeightOption(index, 'image', e.target.value)
                    }
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm"
                  />
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
              className="flex-1 px-6 py-2.5 bg-primary text-[#162210] font-bold rounded-xl hover:bg-primary/90 transition-all shadow-sm hover:shadow-md"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
