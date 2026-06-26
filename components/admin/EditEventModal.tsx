'use client';

import {useState, useEffect} from 'react';
import {X} from 'lucide-react';

interface EditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedEvent: any) => void;
  event: any;
}

export default function EditEventModal({
  isOpen,
  onClose,
  onSave,
  event,
}: EditEventModalProps) {
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

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        description: event.description || '',
        fullDescription: event.fullDescription || event.description || '',
        date: event.startDate
          ? new Date(event.startDate).toISOString().split('T')[0]
          : '',
        endDate: event.endDate
          ? new Date(event.endDate).toISOString().split('T')[0]
          : '',
        location: event.location || '',
        discount: event.discount || '',
        status: event.status || 'upcoming',
        image: event.image || '',
      });
    }
  }, [event]);

  if (!isOpen || !event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedEvent = {
      ...event,
      ...formData,
      startDate: formData.date,
      endDate: formData.endDate || formData.date,
      isActive: formData.status === 'active',
    };
    onSave(updatedEvent);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Edit Event</h2>
            <p className="text-sm text-gray-500">Update event details</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e =>
                setFormData(prev => ({...prev, title: e.target.value}))
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Short Description *
            </label>
            <input
              type="text"
              required
              value={formData.description}
              onChange={e =>
                setFormData(prev => ({...prev, description: e.target.value}))
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
            />
          </div>

          {/* Full Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Description
            </label>
            <textarea
              rows={3}
              value={formData.fullDescription}
              onChange={e =>
                setFormData(prev => ({
                  ...prev,
                  fullDescription: e.target.value,
                }))
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all resize-none"
              placeholder="Detailed event description (shows when expanded)"
            />
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date *
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={e =>
                  setFormData(prev => ({...prev, date: e.target.value}))
                }
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={e =>
                  setFormData(prev => ({...prev, endDate: e.target.value}))
                }
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
              />
            </div>
          </div>

          {/* Location & Discount */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={e =>
                  setFormData(prev => ({...prev, location: e.target.value}))
                }
                placeholder="e.g. Online & In-Store"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount / Offer
              </label>
              <input
                type="text"
                value={formData.discount}
                onChange={e =>
                  setFormData(prev => ({...prev, discount: e.target.value}))
                }
                placeholder="e.g. 20% OFF"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={e =>
                setFormData(prev => ({...prev, status: e.target.value as any}))
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
            >
              <option value="upcoming">Upcoming</option>
              <option value="active">Active</option>
              <option value="ended">Ended</option>
            </select>
          </div>

          {/* Image URL */}
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
              placeholder="https://example.com/event-image.jpg"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
            />
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
