'use client';

import {useState} from 'react';
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  Clock,
  MapPin,
  Tag,
  Sparkles,
  Heart,
  Share2,
  ArrowRight,
  Star,
  Gift,
  Users,
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
  category?: string;
  isPopular?: boolean;
  maxAttendees?: number;
  price?: number;
}

interface EventsListProps {
  events: Event[];
}

export default function EventsList({events}: EventsListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [savedEvents, setSavedEvents] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSaved = new Set(savedEvents);
    if (savedEvents.has(id)) {
      newSaved.delete(id);
    } else {
      newSaved.add(id);
    }
    setSavedEvents(newSaved);
  };

  // Group events by category
  const groupedEvents = events.reduce(
    (acc, event) => {
      const category = event.category || 'Other';
      if (!acc[category]) acc[category] = [];
      acc[category].push(event);
      return acc;
    },
    {} as Record<string, Event[]>,
  );

  // Separate featured events
  const featuredEvents = events.filter(e => e.isPopular);
  const regularEvents = events.filter(e => !e.isPopular);

  return (
    <div className="space-y-12">
      {/* Featured Events Section */}
      {featuredEvents.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-yellow-500" />
            <h2 className="text-2xl font-bold text-[#131811]">
              Featured Events
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                isExpanded={expandedId === event.id}
                onToggle={() => toggleExpand(event.id)}
                isSaved={savedEvents.has(event.id)}
                onSave={e => toggleSave(event.id, e)}
                featured
              />
            ))}
          </div>
        </section>
      )}

      {/* All Events Grouped by Category */}
      {Object.entries(groupedEvents).map(([category, categoryEvents]) => {
        // Skip if category only has featured events and they're already shown
        const nonFeaturedEvents = categoryEvents.filter(e => !e.isPopular);
        if (nonFeaturedEvents.length === 0) return null;

        return (
          <section key={category}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-[#6f8961] rounded-full" />
              <h2 className="text-2xl font-bold text-[#131811]">{category}</h2>
              <span className="text-sm text-[#6f8961] font-medium">
                ({nonFeaturedEvents.length} events)
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nonFeaturedEvents.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  isExpanded={expandedId === event.id}
                  onToggle={() => toggleExpand(event.id)}
                  isSaved={savedEvents.has(event.id)}
                  onSave={e => toggleSave(event.id, e)}
                />
              ))}
            </div>
          </section>
        );
      })}

      {/* No Events State */}
      {events.length === 0 && (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-[#f2f4f0] rounded-full mb-6">
            <Calendar className="w-12 h-12 text-[#6f8961]" />
          </div>
          <h3 className="text-2xl font-bold text-[#131811] mb-2">
            No Events Available
          </h3>
          <p className="text-[#6f8961]">
            Check back soon for exciting events and offers!
          </p>
        </div>
      )}
    </div>
  );
}

// Event Card Component
function EventCard({
  event,
  isExpanded,
  onToggle,
  isSaved,
  onSave,
  featured = false,
}: {
  event: Event;
  isExpanded: boolean;
  onToggle: () => void;
  isSaved: boolean;
  onSave: (e: React.MouseEvent) => void;
  featured?: boolean;
}) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isMultiDay = event.startDate !== event.endDate;

  return (
    <div
      className={`
        group bg-white rounded-2xl overflow-hidden shadow-sm border transition-all duration-300
        ${featured ? 'border-[#6f8961]/30 shadow-md hover:shadow-xl' : 'border-[#dfe6db] hover:shadow-lg'}
        ${isExpanded ? 'shadow-lg ring-2 ring-[#6f8961]/20' : ''}
      `}
    >
      {/* Image Section */}
      {event.image && (
        <div
          className="relative h-56 overflow-hidden cursor-pointer"
          onClick={onToggle}
        >
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {featured && (
              <span className="inline-flex items-center gap-1 bg-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                <Star className="w-3.5 h-3.5 fill-white" />
                Featured
              </span>
            )}
            {event.discount && (
              <span className="inline-flex items-center gap-1 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                <Tag className="w-3.5 h-3.5" />
                {event.discount}
              </span>
            )}
            {event.price === 0 && (
              <span className="inline-flex items-center gap-1 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                <Gift className="w-3.5 h-3.5" />
                Free
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={onSave}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isSaved ? 'fill-red-500 text-red-500' : 'text-gray-600'
                }`}
              />
            </button>
            <button
              onClick={e => {
                e.stopPropagation();
                // Share functionality
                if (navigator.share) {
                  navigator.share({
                    title: event.title,
                    text: event.description,
                    url: window.location.href,
                  });
                }
              }}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
            >
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Date Overlay */}
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4" />
              <span>
                {formatDate(event.startDate)}
                {isMultiDay && ` - ${formatDate(event.endDate)}`}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="p-6 cursor-pointer" onClick={onToggle}>
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            {/* Title and Description */}
            <h3
              className={`text-xl font-bold text-[#131811] mb-2 group-hover:text-[#6f8961] transition-colors ${
                !event.image ? 'text-2xl' : ''
              }`}
            >
              {event.title}
            </h3>
            <p className={`text-[#6f8961] ${isExpanded ? '' : 'line-clamp-2'}`}>
              {event.description}
            </p>

            {/* Event Details */}
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-[#6f8961]">
              {event.location && (
                <div className="flex items-center gap-1.5 bg-[#f2f4f0] px-3 py-1.5 rounded-full">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">{event.location}</span>
                </div>
              )}
              {event.maxAttendees && (
                <div className="flex items-center gap-1.5 bg-[#f2f4f0] px-3 py-1.5 rounded-full">
                  <Users className="w-4 h-4" />
                  <span>Max {event.maxAttendees} people</span>
                </div>
              )}
              {event.price !== undefined && event.price > 0 && (
                <div className="flex items-center gap-1.5 bg-[#f2f4f0] px-3 py-1.5 rounded-full">
                  <Tag className="w-4 h-4" />
                  <span className="font-bold text-[#131811]">
                    ₦{event.price.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Toggle Button */}
          <button className="shrink-0 w-10 h-10 bg-[#f2f4f0] rounded-full flex items-center justify-center hover:bg-[#e5eae5] transition-colors">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-[#6f8961]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#6f8961]" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-6 pb-6 pt-2 border-t border-[#f2f4f0] animate-slideDown">
          <div className="space-y-4">
            {/* Full Description */}
            <div className="prose prose-sm max-w-none text-[#6f8961]">
              <p className="whitespace-pre-wrap">{event.fullDescription}</p>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4 bg-[#f8faf8] rounded-xl p-4">
              <div>
                <p className="text-xs text-[#6f8961] font-semibold uppercase tracking-wider">
                  Start Date
                </p>
                <p className="text-sm font-medium text-[#131811] flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(event.startDate)}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#6f8961] font-semibold uppercase tracking-wider">
                  End Date
                </p>
                <p className="text-sm font-medium text-[#131811] flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(event.endDate)}
                </p>
              </div>
              {event.location && (
                <div className="col-span-2">
                  <p className="text-xs text-[#6f8961] font-semibold uppercase tracking-wider">
                    Location
                  </p>
                  <p className="text-sm font-medium text-[#131811] flex items-center gap-2 mt-1">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#6f8961] text-white font-semibold rounded-xl hover:bg-[#4a6741] transition-colors">
                Register Now
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="inline-flex items-center gap-2 px-6 py-2.5 border-2 border-[#6f8961] text-[#6f8961] font-semibold rounded-xl hover:bg-[#6f8961]/10 transition-colors">
                <Calendar className="w-4 h-4" />
                Add to Calendar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
