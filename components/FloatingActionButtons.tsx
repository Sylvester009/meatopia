'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, MessageCircle } from 'lucide-react';
import { getEvents } from '@/lib/events';

export default function FloatingActionButtons() {
  const [eventsCount, setEventsCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Fetch active events count
    const fetchEventsCount = async () => {
      try {
        const count = getEvents.length;
        setEventsCount(count);
      } catch (error) {
        console.error('Failed to fetch events count:', error);
      }
    };

    fetchEventsCount();

    const interval = setInterval(fetchEventsCount, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, []);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const whatsappMessage = encodeURIComponent('Hi! I would like to inquire about your meat products.');

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
      {/* Events Button */}
      <Link
        href="/special-events"
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          <div className="bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
            <Calendar className="w-6 h-6" />
          </div>
          {eventsCount > 0  && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
              {eventsCount || getEvents.length}
            </div>
          )}
        </div>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
          Special Events
        </span>
      </Link>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group"
      >
        <div className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
          <MessageCircle className="w-6 h-6" />
        </div>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
          Chat with us on WhatsApp
        </span>
      </a>
    </div>
  );
}