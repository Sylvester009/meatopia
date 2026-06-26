'use client';

import {useState} from 'react';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: any) => void;
}

export default function AddEventModal({
  isOpen,
  onClose,
  onAddEvent,
}: AddEventModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fullDescription: '',
    date: '',
    endDate: '',
    location: '',
    discount: '',
    status: 'upcoming' as 'active' | 'upcoming' | 'ended',
    image: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
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

    const newEvent = {
      id: `EVT-${Date.now().toString().slice(-6)}`,
      title: formData.title,
      description: formData.description,
      fullDescription: formData.fullDescription || formData.description,
      startDate: formData.date,
      endDate: formData.endDate || formData.date,
      location: formData.location || 'Online & In-Store',
      discount: formData.discount || '',
      status: formData.status,
      isActive: formData.status === 'active',
      image:
        imagePreview ||
        'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800',
    };

    onAddEvent(newEvent);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      fullDescription: '',
      date: '',
      endDate: '',
      location: '',
      discount: '',
      status: 'upcoming',
      image: '',
    });
    setImageFile(null);
    setImagePreview('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto p-4 md:p-8 animate-in fade-in duration-200">
      <div className="relative w-full max-w-160 bg-white rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-2 duration-300">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#dfe6db]">
          <div>
            <h1 className="text-[#131811] text-2xl font-bold">Add New Event</h1>
            <p className="text-[#6f8961] text-sm">
              Create a special event or promotion
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-[#6f8961] hover:text-[#131811] transition-colors"
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <form
          onSubmit={handleSubmit}
          className="px-8 py-6 space-y-6 max-h-[70vh] overflow-y-auto"
        >
          {/* Image Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-[#131811] text-sm font-bold">
              Event Image
            </label>
            <div className="relative">
              {imagePreview ? (
                <div className="relative">
                  <div
                    className="w-full h-48 rounded-xl bg-cover bg-center"
                    style={{backgroundImage: `url(${imagePreview})`}}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview('');
                      setImageFile(null);
                    }}
                    className="absolute top-2 right-2 size-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">
                      delete
                    </span>
                  </button>
                </div>
              ) : (
                <label className="border-2 border-dashed border-[#dfe6db] rounded-xl p-8 flex flex-col items-center justify-center bg-[#f2f4f0] hover:bg-primary/5 hover:border-primary transition-colors cursor-pointer group">
                  <div className="size-12 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl">
                      cloud_upload
                    </span>
                  </div>
                  <p className="text-[#131811] font-medium mb-1">
                    Click to upload event image
                  </p>
                  <p className="text-[#6f8961] text-xs">
                    PNG, JPG or WEBP (max. 5MB)
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="text-[#131811] text-sm font-bold">
              Event Title *
            </label>
            <input
              required
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-[#dfe6db] focus:border-primary focus:ring-2 focus:ring-primary/20 h-12 px-4 text-[#131811] placeholder:text-[#6f8961] transition-all bg-[#f2f4f0]"
              placeholder="e.g. Holiday Meat Bundle"
              type="text"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-[#131811] text-sm font-bold">
              Short Description *
            </label>
            <input
              required
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-[#dfe6db] focus:border-primary focus:ring-2 focus:ring-primary/20 h-12 px-4 text-[#131811] placeholder:text-[#6f8961] transition-all bg-[#f2f4f0]"
              placeholder="Brief description shown in listings"
              type="text"
            />
          </div>

          {/* Full Description */}
          <div className="flex flex-col gap-2">
            <label className="text-[#131811] text-sm font-bold">
              Full Description
            </label>
            <textarea
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-[#dfe6db] focus:border-primary focus:ring-2 focus:ring-primary/20 min-h-25 p-4 text-[#131811] placeholder:text-[#6f8961] transition-all bg-[#f2f4f0]"
              placeholder="Detailed event description (shows when expanded)"
              rows={3}
            />
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[#131811] text-sm font-bold">
                Start Date *
              </label>
              <input
                required
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-[#dfe6db] focus:border-primary focus:ring-2 focus:ring-primary/20 h-12 px-4 text-[#131811] transition-all bg-[#f2f4f0]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#131811] text-sm font-bold">
                End Date
              </label>
              <input
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-[#dfe6db] focus:border-primary focus:ring-2 focus:ring-primary/20 h-12 px-4 text-[#131811] transition-all bg-[#f2f4f0]"
              />
            </div>
          </div>

          {/* Location & Discount */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[#131811] text-sm font-bold">
                Location
              </label>
              <input
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-[#dfe6db] focus:border-primary focus:ring-2 focus:ring-primary/20 h-12 px-4 text-[#131811] placeholder:text-[#6f8961] transition-all bg-[#f2f4f0]"
                placeholder="e.g. Online & In-Store"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#131811] text-sm font-bold">
                Discount / Offer
              </label>
              <input
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-[#dfe6db] focus:border-primary focus:ring-2 focus:ring-primary/20 h-12 px-4 text-[#131811] placeholder:text-[#6f8961] transition-all bg-[#f2f4f0]"
                placeholder="e.g. 20% OFF"
                type="text"
              />
            </div>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-2">
            <label className="text-[#131811] text-sm font-bold">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-[#dfe6db] focus:border-primary focus:ring-2 focus:ring-primary/20 h-12 px-4 text-[#131811] transition-all bg-[#f2f4f0] cursor-pointer"
            >
              <option value="upcoming">Upcoming</option>
              <option value="active">Active</option>
              <option value="ended">Ended</option>
            </select>
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
            Add Event
          </button>
        </div>
      </div>
    </div>
  );
}
