
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

const supabaseUrl = 'https://woagnmamhxlpwlkyfyms.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvYWdubWFtaHhscHdsa3lmeW1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwMDYyOTksImV4cCI6MjA1MjU4MjI5OX0.ydemaApYnFnI0KHQhmzGELZ7eLcTSHUrezH_gFsIDgQ';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
