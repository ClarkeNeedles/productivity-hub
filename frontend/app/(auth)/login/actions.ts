"use server";

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Send authentication request to Supabase
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // If the password is wrong, return the error to the form UI
  if (error) {
    return { error: error.message };
  }

  // If correct, @supabase/ssr automatically sets cookies. 
  // We can now safely redirect them to the app zone.
  redirect('/dashboard');
}
