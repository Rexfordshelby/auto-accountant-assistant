// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://woagnmamhxlpwlkyfyms.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvYWdubWFtaHhscHdsa3lmeW1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwMDYyOTksImV4cCI6MjA1MjU4MjI5OX0.ydemaApYnFnI0KHQhmzGELZ7eLcTSHUrezH_gFsIDgQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);