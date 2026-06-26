'use client';

import {X, AlertTriangle} from 'lucide-react';

interface DeleteEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  event: any;
}

export default function DeleteEventModal({
  isOpen,
  onClose,
  onConfirm,
  event,
}: DeleteEventModalProps) {
  if (!isOpen || !event) return null;

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

          <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Event</h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-gray-900">"{event.title}"</span>
            ? This action cannot be undone.
          </p>

          {/* Event Preview */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="font-medium text-gray-900">{event.title}</p>
            <p className="text-sm text-gray-500">{event.description}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span>
                {event.date
                  ? new Date(event.date).toLocaleDateString()
                  : 'No date'}
              </span>
              {event.status && (
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    event.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : event.status === 'upcoming'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {event.status}
                </span>
              )}
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
              Delete Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
