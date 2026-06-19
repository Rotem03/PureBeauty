-- ============================================================
-- PureBeauty — Initial Schema Migration
-- Run this in Supabase SQL Editor or via Supabase CLI
-- ============================================================

-- ─── PROFILES ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id            uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name  text,
  avatar_url    text,
  created_at    timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own_profile_select" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "own_profile_update" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Auto-create profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ─── SKIN PROFILES ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.skin_profiles (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at      timestamptz DEFAULT now() NOT NULL,
  undertone       text,
  undertone_hex   text,
  face_shape      text,
  eye_shape       text,
  symmetry_pct    smallint CHECK (symmetry_pct BETWEEN 0 AND 100),
  hydration_pct   smallint CHECK (hydration_pct BETWEEN 0 AND 100),
  oiliness_pct    smallint CHECK (oiliness_pct BETWEEN 0 AND 100),
  pores_pct       smallint CHECK (pores_pct BETWEEN 0 AND 100),
  t_zone          text,
  cheeks          text,
  under_eye       text,
  glow_score      smallint CHECK (glow_score BETWEEN 0 AND 100),
  raw_analysis    jsonb
);

CREATE INDEX IF NOT EXISTS idx_skin_profiles_user_created
  ON public.skin_profiles (user_id, created_at DESC);

ALTER TABLE public.skin_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own_scans_select" ON public.skin_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "own_scans_insert" ON public.skin_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "own_scans_delete" ON public.skin_profiles
  FOR DELETE USING (auth.uid() = user_id);


-- ─── PRODUCTS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.products (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text NOT NULL,
  brand         text NOT NULL,
  category      text CHECK (category IN ('Luxury', 'Drugstore')),
  image_url     text,
  description   text,
  tags          text[] DEFAULT '{}',
  suitable_for  jsonb DEFAULT '{}',
  price         numeric(10,2),
  created_at    timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_products_tags
  ON public.products USING GIN (tags);

CREATE INDEX IF NOT EXISTS idx_products_suitable_for
  ON public.products USING GIN (suitable_for);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_products_select" ON public.products
  FOR SELECT USING (true);


-- ─── USER PRODUCTS (collection) ──────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_products (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  product_id  uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  match_score smallint CHECK (match_score BETWEEN 0 AND 100),
  added_at    timestamptz DEFAULT now() NOT NULL,
  UNIQUE (user_id, product_id)
);

CREATE INDEX IF NOT EXISTS idx_user_products_user
  ON public.user_products (user_id);

ALTER TABLE public.user_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own_collection_all" ON public.user_products
  FOR ALL USING (auth.uid() = user_id);


-- ─── TUTORIALS ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.tutorials (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title         text NOT NULL,
  description   text,
  steps         jsonb NOT NULL DEFAULT '[]',
  tags          text[] DEFAULT '{}',
  suitable_for  jsonb DEFAULT '{}',
  created_at    timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_tutorials_tags
  ON public.tutorials USING GIN (tags);

ALTER TABLE public.tutorials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_tutorials_select" ON public.tutorials
  FOR SELECT USING (true);


-- ─── USER TUTORIAL PROGRESS ──────────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_tutorial_progress (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  tutorial_id  uuid NOT NULL REFERENCES public.tutorials(id) ON DELETE CASCADE,
  current_step smallint DEFAULT 0 NOT NULL,
  completed    boolean DEFAULT false NOT NULL,
  updated_at   timestamptz DEFAULT now() NOT NULL,
  UNIQUE (user_id, tutorial_id)
);

ALTER TABLE public.user_tutorial_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own_progress_all" ON public.user_tutorial_progress
  FOR ALL USING (auth.uid() = user_id);


-- ─── ROUTINES ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.routines (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  date        date DEFAULT current_date NOT NULL,
  steps       jsonb NOT NULL DEFAULT '[]',
  updated_at  timestamptz DEFAULT now() NOT NULL,
  UNIQUE (user_id, date)
);

CREATE INDEX IF NOT EXISTS idx_routines_user_date
  ON public.routines (user_id, date DESC);

ALTER TABLE public.routines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own_routines_all" ON public.routines
  FOR ALL USING (auth.uid() = user_id);
