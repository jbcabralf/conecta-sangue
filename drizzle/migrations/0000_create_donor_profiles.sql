CREATE TABLE public.donor_profiles (
  id uuid PRIMARY KEY,
  full_name text NOT NULL,
  email text NOT NULL,
  neighborhood_city text NOT NULL,
  blood_type text NOT NULL CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.donor_profiles TO authenticated;
GRANT ALL ON public.donor_profiles TO service_role;
ALTER TABLE public.donor_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Donors can view own profile" ON public.donor_profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Donors can create own profile" ON public.donor_profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Donors can edit own profile" ON public.donor_profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);