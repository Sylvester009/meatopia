// lib/supabase/index.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

// Use the anon key or publishable key for client-side
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey || supabasePublishableKey
);