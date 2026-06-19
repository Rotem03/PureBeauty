import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { PRODUCTS } from '../constants/data'

const toMock = () => PRODUCTS.map(p => ({
  id: p.id,
  name: p.name,
  brand: p.brand,
  category: p.category,
  image_url: p.img,
  match_score: p.match,
}))

export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) { setProducts(toMock()); setLoading(false); return }
    const fetch = async () => {
      const { data, error } = await supabase.from('products').select('*')
      setProducts(data && !error && data.length > 0 ? data : toMock())
      setLoading(false)
    }
    fetch()
  }, [])

  return { products, loading }
}

export const useUserCollection = (userId) => {
  const [collection, setCollection] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!userId || !supabase) return
    const fetch = async () => {
      setLoading(true)
      const { data } = await supabase
        .from('user_products')
        .select('product_id, match_score, products(*)')
        .eq('user_id', userId)
      setCollection(data ?? [])
      setLoading(false)
    }
    fetch()
  }, [userId])

  const addToCollection = async (userId, productId, matchScore) => {
    setCollection(prev =>
      prev.some(p => p.product_id === productId) ? prev : [...prev, { product_id: productId }]
    )
    if (!supabase || !userId) return { error: null }
    const { error } = await supabase
      .from('user_products')
      .upsert(
        { user_id: userId, product_id: productId, match_score: matchScore ?? null },
        { onConflict: 'user_id,product_id' }
      )
    return { error }
  }

  const removeFromCollection = async (userId, productId) => {
    setCollection(prev => prev.filter(p => p.product_id !== productId))
    if (!supabase || !userId) return { error: null }
    const { error } = await supabase
      .from('user_products')
      .delete()
      .match({ user_id: userId, product_id: productId })
    return { error }
  }

  return { collection, loading, addToCollection, removeFromCollection }
}
