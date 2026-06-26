import { getEvents } from '@/lib/events';
import EventsList from '@/components/EventsList';

export const metadata = {
  title: 'Special Events - Meatopia',
  description: 'Discover our special events, promotions, and exclusive offers',
};

export default async function SpecialEventsPage() {
  const events = getEvents;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">🎉 Special Events</h1>
      
      {events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No active events at the moment.</p>
          <p className="text-gray-400 mt-2">Check back soon for exciting offers!</p>
        </div>
      ) : (
        <EventsList events={events} />
      )}
    </div>
  );
}