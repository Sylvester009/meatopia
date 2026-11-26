import { supabase } from '@/lib/supabase';

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
  createdAt?: string;
  updatedAt?: string;
}

export async function getEvents(isActive?: boolean): Promise<Event[]> {
  let query = supabase
    .from('Events')
    .select('*')
    .order('startDate', {ascending: true});

  if (isActive !== undefined) {
    query = query.eq('isActive', isActive);
  }

  const {data, error} = await query;
  if (error) {
    console.error('Error fetching events:', error);
    throw error;
  }

  return data || [];
}

export async function getActiveEventsCount(): Promise<number> {
  const {count, error} = await supabase
    .from('Events')
    .select('id', {count: 'exact', head: true})
    .eq('isActive', true);

  if (error) {
    console.error('Error fetching active events count:', error);
    throw error;
  }

  return count || 0;
}