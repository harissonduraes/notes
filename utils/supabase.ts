
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://xciazflkopzpwcnzvcua.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjaWF6Zmxrb3B6cHdjbnp2Y3VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5ODc0MDcsImV4cCI6MjA1MzU2MzQwN30.o4GfQ89cRXZZF82wpSpjEHIw4DMWDyoZbf-EdK9tJOo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase
