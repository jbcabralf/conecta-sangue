CREATE TABLE public.blood_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid(),
  requester_kind text NOT NULL CHECK (requester_kind IN ('hospital','familiar')),
  blood_type text NOT NULL CHECK (blood_type IN ('A+','A-','B+','B-','AB+','AB-','O+','O-')),
  urgent boolean NOT NULL DEFAULT false,
  location text NOT NULL CHECK (char_length(location) BETWEEN 1 AND 120),
  patient_name text NOT NULL CHECK (char_length(patient_name) BETWEEN 1 AND 120),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, DELETE ON public.blood_requests TO authenticated;
GRANT ALL ON public.blood_requests TO service_role;
ALTER TABLE public.blood_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own requests" ON public.blood_requests FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users create own requests" ON public.blood_requests FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own requests" ON public.blood_requests FOR DELETE TO authenticated USING (auth.uid() = user_id);