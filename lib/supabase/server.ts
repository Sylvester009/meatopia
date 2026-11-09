import {createServerClient} from '@supabase/ssr';
import {cookies} from 'next/headers';

export async function createClient(rememberMe = false) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL and publishable key must be configured.');
  }

  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseKey, {
    cookieOptions: {
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      ...(rememberMe ? {maxAge: 60 * 60 * 24 * 30} : {}),
    },
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({name, value, options}) => {
          cookieStore.set(name, value, options);
        });
      },
    },
  });
}
