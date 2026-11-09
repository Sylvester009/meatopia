// app/admin/actions.ts
'use server';

import { createClient } from '@/lib/supabase/server';

export async function adminLogin(formData: FormData) {
  const emailValue = formData.get('email');
  const passwordValue = formData.get('password');
  const email = typeof emailValue === 'string' ? emailValue.trim() : '';
  const password = typeof passwordValue === 'string' ? passwordValue : '';
  const rememberMe = formData.get('rememberMe') === 'true';

  if (!email || !password) {
    return { error: 'Please fill in all fields' };
  }

  try {
    const supabase = await createClient(rememberMe);

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
    const isAdmin =
      user?.app_metadata?.role === 'admin' ||
      user?.email?.toLowerCase() === 'meatopia.ng@gmail.com';

    if (!isAdmin) {
      const {error: signOutError} = await supabase.auth.signOut();
      if (signOutError) {
        console.error('Unable to clear non-admin session:', signOutError);
      }
      return { error: 'Access denied. Admin privileges required.' };
    }

    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'An unexpected error occurred' };
  }
}

export async function adminLogout() {
  try {
    const supabase = await createClient();
    const {error} = await supabase.auth.signOut();
    if (error) throw error;

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

    const isAdmin =
      user.app_metadata?.role === 'admin' ||
      user.email?.toLowerCase() === 'meatopia.ng@gmail.com';

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
    const supabase = await createClient();
    const {
      data: {user},
      error,
    } = await supabase.auth.getUser();

    if (error || !user) return false;

    const isAdmin =
      user.app_metadata?.role === 'admin' ||
      user.email?.toLowerCase() === 'meatopia.ng@gmail.com';

    return isAdmin;
  } catch (error) {
    console.error('Auth check error:', error);
    return false;
  }
}