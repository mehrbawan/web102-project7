import { createClient } from '@supabase/supabase-js'

const URL = 'https://mgtolbffhxdylgjgrqzu.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ndG9sYmZmaHhkeWxnamdycXp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA4NDY4MzksImV4cCI6MjA0NjQyMjgzOX0.yA6-Iq1S-iY45hW0N4ATHFNTFwtQT6-qbDUuR8SkMF0';

export const supabase = createClient(URL, API_KEY);
