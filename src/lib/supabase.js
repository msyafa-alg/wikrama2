import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ohualwzjjxunroqdcmjt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9odWFsd3pqanh1bnJvcWRjbWp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2NzQzMDksImV4cCI6MjA5ODI1MDMwOX0.nqXT-9U81x3DGnrVmOIwpspyzsQloKS3blNBuC08-dA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
