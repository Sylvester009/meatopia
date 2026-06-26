
export interface Event {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image?: string;
  startDate: string;
  endDate: string;
  location?: string;
  discount?: string;
  isActive: boolean;
}


export const getEvents: Event[] =  [
    {
      id: '1',
      title: '🎄 Holiday Meat Bundle',
      description: 'Get 20% off on our premium holiday meat selection',
      fullDescription: 'Celebrate the holidays with our specially curated meat bundle featuring prime cuts, gourmet sausages, and artisan meats. Perfect for family gatherings and festive feasts!',
      image: '/images/events/holiday-bundle.jpg',
      startDate: new Date('2026-12-01').toISOString(),
      endDate: new Date('2026-12-31').toISOString(),
      location: 'All locations',
      discount: '20% OFF',
      isActive: true,
    },
    {
      id: '2',
      title: '🥩 Weekend BBQ Special',
      description: 'Free delivery on all BBQ meat packs this weekend',
      fullDescription: 'Fire up the grill! Get free delivery on all our premium BBQ meat packs including marinated steaks, burgers, and sausages. Perfect for your weekend gathering!',
      image: '/images/events/bbq-special.jpg',
      startDate: new Date('2026-06-27').toISOString(),
      endDate: new Date('2026-06-29').toISOString(),
      location: 'Online orders only',
      discount: 'Free Delivery',
      isActive: true,
    },
];