import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env') });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function test() {
  const { data: rootFiles, error: rootError } = await supabase.storage.from('app-releases').list();
  console.log('Root Files:', rootFiles);
  
  const { data: androidFiles, error: androidError } = await supabase.storage.from('app-releases').list('android');
  console.log('Android Files:', androidFiles);
}

test();
