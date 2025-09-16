// lib/ensureProfile.ts
import { supabase } from './supabase';

export async function ensureProfile() {
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error || !user) return { user: null, error: error ?? new Error('Not signed in') };

    // Upsert a profile row (id must be the auth user id)
    await supabase.from('profiles').upsert({ id: user.id }, { onConflict: 'id' });

    return { user, error: null };
}
