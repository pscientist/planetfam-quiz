// lib/supabase.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
// import 'react-native-url-polyfill/auto';

import { CONFIG } from '../../config/env';

export const supabase = createClient(CONFIG.EXPO_PUBLIC_SUPABASE_URL, CONFIG.EXPO_PUBLIC_SUPABASE_ANON_KEY, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});
