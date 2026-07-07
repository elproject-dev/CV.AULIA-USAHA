import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env') });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function test() {
  const { data: androidFiles, error: androidError } = await supabase.storage.from('app-releases').list('android');
  console.log('Android Files:', androidFiles);
  console.log('Android Error:', androidError);

  const { data: desktopFiles, error: desktopError } = await supabase.storage.from('app-releases').list('desktop');
  console.log('Desktop Files:', desktopFiles);
  console.log('Desktop Error:', desktopError);
}

test();
