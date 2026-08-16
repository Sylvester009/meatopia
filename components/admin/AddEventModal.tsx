'use client';

import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {toast} from 'sonner';
import {supabase} from '@/lib/supabase';
import { Loader } from 'lucide-react';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddEventModal({isOpen, onClose}: AddEventModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fullDescription: '',
    image: '',
    startDate: '',
    endDate: '',
    location: '',
    discount: '',
    isActive: true,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      // Validate file type
      const allowedTypes = [
        'image/png',
        'image/jpeg',
        'image/webp',
        'image/jpg',
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload PNG, JPG or WEBP image');
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToSupabase = async (file: File): Promise<string> => {
    try {
      setUploadingImage(true);

      // Create a unique filename
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 8);
      const fileExtension = file.name.split('.').pop() || 'jpg';
      const fileName = `event-${timestamp}-${randomString}.${fileExtension}`;

      console.log(
        'Uploading file:',
        fileName,
        'Size:',
        file.size,
        'Type:',
        file.type,
      );

      // Upload to Supabase Storage
      const {data, error} = await supabase.storage
        .from('event-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        console.error('Supabase upload error:', error);
        throw new Error(`Failed to upload image: ${error.message}`);
      }

      console.log('Upload successful:', data);

      // Get the public URL
      const {data: urlData} = supabase.storage
        .from('event-images')
        .getPublicUrl(fileName);

      if (!urlData?.publicUrl) {
        throw new Error('Failed to get public URL for uploaded image');
      }

      console.log('Public URL:', urlData.publicUrl);
      return urlData.publicUrl;
    } catch (error) {
      console.error('Error in uploadImageToSupabase:', error);
      throw error;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if image is selected
      if (!imageFile) {
        toast.error('Please select an event image');
        setLoading(false);
        return;
      }

      // Validate required fields
      if (
        !formData.title ||
        !formData.description ||
        !formData.startDate ||
        !formData.endDate ||
        !formData.location
      ) {
        toast.error('Please fill in all required fields');
        setLoading(false);
        return;
      }

      // Upload image first
      let imageUrl = '';
      try {
        imageUrl = await uploadImageToSupabase(imageFile);
      } catch (uploadError) {
        toast.error('Failed to upload image. Please try again.');
        setLoading(false);
        return;
      }

      // Create the event with the image URL
      const eventData = {
        ...formData,
        image: imageUrl,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
      };

      // console.log('Creating event with data:', eventData);

      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create event');
      }

      const result = await response.json();
      console.log('Event created:', result);

      toast.success('Event created successfully');

      // Reset form and close modal
      handleClose();

      // Refresh the page to show new event
      router.refresh();
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to create event',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      fullDescription: '',
      image: '',
      startDate: '',
      endDate: '',
      location: '',
      discount: '',
      isActive: true,
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
              Event Image *
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
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                    required
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
              onChange={e => setFormData({...formData, title: e.target.value})}
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
              onChange={e =>
                setFormData({...formData, description: e.target.value})
              }
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
              onChange={e =>
                setFormData({...formData, fullDescription: e.target.value})
              }
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
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={e =>
                  setFormData({...formData, startDate: e.target.value})
                }
                className="w-full rounded-lg border border-[#dfe6db] focus:border-primary focus:ring-2 focus:ring-primary/20 h-12 px-4 text-[#131811] transition-all bg-[#f2f4f0]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#131811] text-sm font-bold">
                End Date *
              </label>
              <input
                required
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={e =>
                  setFormData({...formData, endDate: e.target.value})
                }
                className="w-full rounded-lg border border-[#dfe6db] focus:border-primary focus:ring-2 focus:ring-primary/20 h-12 px-4 text-[#131811] transition-all bg-[#f2f4f0]"
              />
            </div>
          </div>

          {/* Location & Discount */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[#131811] text-sm font-bold">
                Location *
              </label>
              <input
                required
                name="location"
                value={formData.location}
                onChange={e =>
                  setFormData({...formData, location: e.target.value})
                }
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
                onChange={e =>
                  setFormData({...formData, discount: e.target.value})
                }
                className="w-full rounded-lg border border-[#dfe6db] focus:border-primary focus:ring-2 focus:ring-primary/20 h-12 px-4 text-[#131811] placeholder:text-[#6f8961] transition-all bg-[#f2f4f0]"
                placeholder="e.g. 20% OFF"
                type="text"
              />
            </div>
          </div>

          {/* Status */}
          <div className="flex gap-2">
            <label className="text-[#131811] text-sm font-bold pt-1">
              <span className="pt-0.5">Active</span>
              <input
                name="isActive"
                type="checkbox"
                checked={formData.isActive}
                onChange={e =>
                  setFormData({...formData, isActive: e.target.checked})
                }
                className="ml-3 rounded-lg cursor-pointer"
              />
            </label>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-3 px-8 py-6 border-t border-[#dfe6db] bg-[#f2f4f0] -mx-8 -mb-6">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2.5 rounded-lg text-sm font-bold text-[#131811] hover:bg-[#dfe6db] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || uploadingImage}
              className="px-8 py-2.5 rounded-lg bg-primary text-[#162210] text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading || uploadingImage ? (
                <span className="flex items-center gap-2">
                  <Loader />
                  {uploadingImage ? 'Uploading Image...' : 'Creating Event...'}
                </span>
              ) : (
                'Create Event'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
