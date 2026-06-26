'use client';

import {useState} from 'react';
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  Clock,
  MapPin,
  Tag,
} from 'lucide-react';
import Image from 'next/image';

interface Event {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image?: string;
  startDate: string;
  endDate: string;
  location?: string;
  discount?: string;
}

interface EventsListProps {
  events: Event[];
}

export default function EventsList({events}: EventsListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {events.map(event => (
        <div
          key={event.id}
          className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
        >
          <div
            className="p-6 cursor-pointer"
            onClick={() => toggleExpand(event.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {event.title}
                </h2>
                <p className="text-gray-600 line-clamp-2">
                  {event.description}
                </p>

                <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(event.startDate).toLocaleDateString()} -{' '}
                      {new Date(event.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  )}
                  {event.discount && (
                    <div className="flex items-center gap-1 text-green-600 font-medium">
                      <Tag className="w-4 h-4" />
                      <span>{event.discount}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="ml-4 shrink-0">
                {expandedId === event.id ? (
                  <ChevronUp className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </div>
            </div>
          </div>

          {/* Expanded content */}
          {expandedId === event.id && (
            <div className="px-6 pb-6 pt-2 border-t border-gray-100">
              <div className="prose prose-sm max-w-none">
                {event.image && (
                  <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <p className="text-gray-700 whitespace-pre-wrap">
                  {event.fullDescription}
                </p>

                <div className="mt-4 flex gap-4">
                  <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                    Learn More
                  </button>
                  <button className="border border-primary text-primary px-6 py-2 rounded-lg hover:bg-primary/10 transition-colors">
                    Save Event
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
