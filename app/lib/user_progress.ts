// lib/progress.ts
import { supabase } from './supabase';

/** Upsert current level for the signed-in user */
export async function setCurrentLevel(level: number) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not signed in');

    const { error } = await supabase
        .from('user_level')
        .upsert({ user_id: user.id, current_level: level, updated_at: new Date().toISOString() },
            { onConflict: 'user_id' });

    if (error) throw error;
}

/** Fetch current level (default 1 if none) */
export async function getCurrentLevel(): Promise<number> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not signed in');

    const { data, error } = await supabase
        .from('user_level')
        .select('current_level')
        .eq('user_id', user.id)
        .maybeSingle();

    if (error) throw error;
    return data?.current_level ?? 1;
}

/** Record a correct country slug ("nz", "nz_maori", etc.). Idempotent because of PK */
export async function recordCorrectCountry(slug: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not signed in');

    const { error } = await supabase
        .from('correct_answers')
        .upsert({ user_id: user.id, country_slug: slug }, { onConflict: 'user_id,country_slug' });

    if (error) throw error;
}

/** Get all correct country slugs for the user */
export async function getCorrectCountries(): Promise<string[]> { // slug
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not signed in');

    const { data, error } = await supabase
        .from('correct_answers')
        .select('country_slug')
        .eq('user_id', user.id)
        .order('first_answered_at', { ascending: true });

    if (error) throw error;
    return (data ?? []).map(r => r.country_slug);
}
