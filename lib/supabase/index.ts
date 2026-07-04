import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

// Validate environment variables
if (!supabaseUrl) throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
if (!supabasePublishableKey) throw new Error('Missing NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY');

export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey || supabasePublishableKey, // Falls back to publishable if no service key
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    db: {
      schema: 'public',
    },
    global: {
      headers: {
        'x-application-name': 'meatopia-admin',
      },
    },
  }
);

export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

export const createServiceRoleClient = () => {
  if (!supabaseServiceKey) {
    console.warn('SUPABASE_SERVICE_KEY is not set, falling back to publishable key');
    return supabase;
  }
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};

export { supabase as default };
