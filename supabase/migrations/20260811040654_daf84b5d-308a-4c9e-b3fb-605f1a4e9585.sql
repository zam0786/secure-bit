ALTER TABLE public.contact_submissions
  ADD COLUMN IF NOT EXISTS phone TEXT,
  ADD COLUMN IF NOT EXISTS topic TEXT;