'use client';

import {useEffect, useState} from 'react';
import EventsList from '@/components/EventsList';
import {Event} from '@/lib/events';
import {ArrowLeft} from 'lucide-react';
import Link from 'next/link';

export default function SpecialEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/events');

        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const result = await response.json();
        setEvents(result.data || []);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Unable to load events at this time.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">
          🎉 Special Events
        </h1>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6f8961]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">
          🎉 Special Events
        </h1>
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">{error}</p>
          <p className="text-gray-400 mt-2">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">🎉 Special Events</h1>
      <Link
        href="/"
        className="text-gray-700 py-2 hover:text-primary transition-colors flex items-center gap-1"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Shop
      </Link>

      {events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">
            No active events at the moment.
          </p>
          <p className="text-gray-400 mt-2">
            Check back soon for exciting offers!
          </p>
        </div>
      ) : (
        <EventsList events={events} />
      )}
    </div>
  );
}
