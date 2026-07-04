import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;

// Validate environment variables
if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
}

if (!supabasePublishableKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY');
}

// CLIENT-SIDE Supabase instance (ALWAYS uses publishable key)
export const supabaseClient = createClient(
  supabaseUrl,
  supabasePublishableKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

// SERVER-SIDE only - Service role client (for API routes, server actions, etc.)
export const createServiceRoleClient = () => {
  const serviceKey = process.env.SUPABASE_SERVICE_KEY;
  if (!serviceKey) {
    throw new Error('SUPABASE_SERVICE_KEY is not set');
  }
  return createClient(supabaseUrl, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};

// For backwards compatibility - use supabaseClient for browser code
export const supabase = supabaseClient;

// Export for convenience
export default supabase;
