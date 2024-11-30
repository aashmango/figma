// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Use environment variables for Supabase URL and anon key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create a Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const fetchBlocks = async () => {
    const { data, error } = await supabase.from('canvas_blocks').select('*');
    if (error) console.error(error);
    return data;
}; 