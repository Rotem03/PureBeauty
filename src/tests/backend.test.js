/**
 * PureBeauty — Backend CRUD Tests
 * Run with:    npm run test
 * Run with UI: npm run test:ui
 *
 * Before running: create the test user once in Supabase Auth dashboard
 *   Email:    test@purebeauty.com
 *   Password: test1234
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const TEST_EMAIL = 'test@purebeauty.com'
const TEST_PASSWORD = 'test1234'

let supabase
let userId

// ─── Setup / Teardown ─────────────────────────────────────────

beforeAll(async () => {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

  const { data, error } = await supabase.auth.signInWithPassword({
    email: TEST_EMAIL,
    password: TEST_PASSWORD,
  })

  if (error) throw new Error(
    `Could not sign in as test user (${TEST_EMAIL}). ` +
    `Create this user in Supabase Auth dashboard first. Error: ${error.message}`
  )

  userId = data.user.id

  // Ensure a profile row exists (required by routines FK)
  await supabase
    .from('profiles')
    .upsert({ id: userId, display_name: 'Test User' }, { onConflict: 'id' })
})

afterAll(async () => {
  await supabase.auth.signOut()
})

// ─── Auth Tests ───────────────────────────────────────────────

describe('Authentication', () => {
  it('signs in and returns a valid user ID', () => {
    expect(userId).toBeTruthy()
    expect(typeof userId).toBe('string')
  })

  it('session persists after sign-in', async () => {
    const { data } = await supabase.auth.getSession()
    expect(data.session).not.toBeNull()
    expect(data.session?.user?.id).toBe(userId)
  })
})

// ─── Products — Read (public table) ──────────────────────────

describe('Products — Read', () => {
  it('fetches all products', async () => {
    const { data, error } = await supabase.from('products').select('*')
    expect(error).toBeNull()
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThan(0)
  })

  it('each product has required fields', async () => {
    const { data } = await supabase.from('products').select('*').limit(1)
    const p = data[0]
    expect(p).toHaveProperty('id')
    expect(p).toHaveProperty('name')
    expect(p).toHaveProperty('brand')
    expect(p).toHaveProperty('category')
    expect(p).toHaveProperty('price')
  })

  it('filters products by category', async () => {
    const { data, error } = await supabase
      .from('products').select('*').eq('category', 'Drugstore')
    expect(error).toBeNull()
    data.forEach(p => expect(p.category).toBe('Drugstore'))
  })
})

// ─── User Collection — CRUD ───────────────────────────────────

describe('User Collection — CRUD', () => {
  let testProductId

  beforeAll(async () => {
    const { data } = await supabase.from('products').select('id').limit(1)
    testProductId = data?.[0]?.id
  })

  it('adds a product to collection (Create)', async () => {
    const { data, error } = await supabase
      .from('user_products')
      .upsert({ user_id: userId, product_id: testProductId, match_score: 90 })
      .select()
    expect(error).toBeNull()
    expect(data[0].product_id).toBe(testProductId)
  })

  it('reads user collection (Read)', async () => {
    const { data, error } = await supabase
      .from('user_products')
      .select('*, products(*)')
      .eq('user_id', userId)
    expect(error).toBeNull()
    expect(data.length).toBeGreaterThan(0)
  })

  it('RLS — only returns current user rows', async () => {
    const { data } = await supabase.from('user_products').select('user_id')
    data?.forEach(row => expect(row.user_id).toBe(userId))
  })

  it('removes a product from collection (Delete)', async () => {
    const { error } = await supabase
      .from('user_products')
      .delete()
      .match({ user_id: userId, product_id: testProductId })
    expect(error).toBeNull()

    const { data } = await supabase
      .from('user_products')
      .select('id')
      .match({ user_id: userId, product_id: testProductId })
    expect(data?.length).toBe(0)
  })
})

// ─── Skin Profiles — CRUD ────────────────────────────────────

describe('Skin Profiles — CRUD', () => {
  let profileId

  it('creates a skin profile (Create)', async () => {
    const { data, error } = await supabase
      .from('skin_profiles')
      .insert({
        user_id: userId,
        undertone: 'Warm',
        face_shape: 'Oval',
        hydration_pct: 80,
        oiliness_pct: 60,
        glow_score: 85,
      })
      .select()
    expect(error).toBeNull()
    expect(data[0].undertone).toBe('Warm')
    profileId = data[0].id
  })

  it('reads skin profile for current user (Read)', async () => {
    const { data, error } = await supabase
      .from('skin_profiles')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
    expect(error).toBeNull()
    expect(data[0].user_id).toBe(userId)
  })

  it('RLS — only returns current user skin profiles', async () => {
    const { data } = await supabase.from('skin_profiles').select('user_id')
    data?.forEach(row => expect(row.user_id).toBe(userId))
  })

  it('deletes the test skin profile (Delete)', async () => {
    if (!profileId) return
    const { error } = await supabase
      .from('skin_profiles').delete().eq('id', profileId)
    expect(error).toBeNull()
  })
})

// ─── Routines — CRUD ─────────────────────────────────────────

describe('Routines — CRUD', () => {
  const today = new Date().toISOString().split('T')[0]
  const steps = [
    { label: 'Cleanser', time: '07:00 AM', done: false },
    { label: 'Moisturizer', time: '07:10 AM', done: false },
  ]

  it('upserts a daily routine (Create)', async () => {
    const { data, error } = await supabase
      .from('routines')
      .upsert({ user_id: userId, date: today, steps }, { onConflict: 'user_id,date' })
      .select()
    expect(error).toBeNull()
    expect(data[0].user_id).toBe(userId)
    expect(data[0].steps.length).toBe(2)
  })

  it('reads routine for today (Read)', async () => {
    const { data, error } = await supabase
      .from('routines')
      .select('*')
      .eq('user_id', userId)
      .eq('date', today)
    expect(error).toBeNull()
    expect(data.length).toBeGreaterThan(0)
    expect(data[0].date).toBe(today)
  })

  it('updates a routine step (Update)', async () => {
    const updatedSteps = [
      { label: 'Cleanser', time: '07:00 AM', done: true },
      { label: 'Moisturizer', time: '07:10 AM', done: false },
    ]
    const { data, error } = await supabase
      .from('routines')
      .update({ steps: updatedSteps })
      .eq('user_id', userId)
      .eq('date', today)
      .select()
    expect(error).toBeNull()
    expect(data[0].steps[0].done).toBe(true)
  })

  it('RLS — only returns current user routines', async () => {
    const { data } = await supabase.from('routines').select('user_id')
    data?.forEach(row => expect(row.user_id).toBe(userId))
  })

  it('deletes the test routine (Delete)', async () => {
    const { error } = await supabase
      .from('routines')
      .delete()
      .eq('user_id', userId)
      .eq('date', today)
    expect(error).toBeNull()
  })
})

// ─── Tutorials — Read (public) ────────────────────────────────

describe('Tutorials — Read', () => {
  it('fetches all tutorials', async () => {
    const { data, error } = await supabase.from('tutorials').select('*')
    expect(error).toBeNull()
    expect(data.length).toBeGreaterThan(0)
  })

  it('tutorial has a non-empty steps array', async () => {
    const { data } = await supabase.from('tutorials').select('*').limit(1)
    expect(Array.isArray(data[0].steps)).toBe(true)
    expect(data[0].steps.length).toBeGreaterThan(0)
  })
})
