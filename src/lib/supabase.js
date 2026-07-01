import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ohualwzjjxunroqdcmjt.supabase.co'
const supabaseAnonKey = 'sb_publishable_D-s_mPeoB2k53hI5mNVrQw_szzNfIs3'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
