// app/admin/actions.ts
'use server';

import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function adminLogin(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const rememberMe = formData.get('rememberMe') === 'true';

  if (!email || !password) {
    return { error: 'Please fill in all fields' };
  }

  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Sign in error:', error);
      return { error: 'Invalid email or password' };
    }

    // Check if user is admin
    const user = data.user;
    const isAdmin = user?.user_metadata?.role === 'admin' || 
                    user?.email === 'meatopia.ng@gmail.com';

    if (!isAdmin) {
      await supabase.auth.signOut();
      return { error: 'Access denied. Admin privileges required.' };
    }

    // Set session cookies
    const cookieStore = await cookies();
    const maxAge = rememberMe ? 2592000 : 86400; // 30 days or 1 day

    cookieStore.set('adminLoggedIn', 'true', {
      path: '/',
      maxAge,
      sameSite: 'lax',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    cookieStore.set('adminEmail', user.email || '', {
      path: '/',
      maxAge,
      sameSite: 'lax',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'An unexpected error occurred' };
  }
}

export async function adminLogout() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();

    const cookieStore = await cookies();
    cookieStore.delete('adminLoggedIn');
    cookieStore.delete('adminEmail');

    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { error: 'Failed to logout' };
  }
}

export async function getAdminUser() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;

    const isAdmin = user?.user_metadata?.role === 'admin' || 
                    user?.email === 'meatopia.ng@gmail.com';

    if (!isAdmin) return null;

    return {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.full_name || 'Admin',
      createdAt: user.created_at,
    };
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
}

export async function isAdminAuthenticated() {
  try {
    const cookieStore = await cookies();
    const adminLoggedIn = cookieStore.get('adminLoggedIn');
    
    if (!adminLoggedIn || adminLoggedIn.value !== 'true') {
      return false;
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return false;

    const isAdmin = user?.user_metadata?.role === 'admin' || 
                    user?.email === 'meatopia.ng@gmail.com';

    return isAdmin;
  } catch (error) {
    console.error('Auth check error:', error);
    return false;
  }
}