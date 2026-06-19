import { useState } from 'react'
import { supabase } from '../lib/supabase'

export const useAvatar = () => {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)

  const uploadAvatar = async (userId, file) => {
    if (!supabase || !userId || !file) return { url: null, error: 'Missing required fields' }

    setUploading(true)
    setError(null)

    const ext = file.name.split('.').pop()
    const path = `${userId}/avatar.${ext}`

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(path, file, { upsert: true })

    if (uploadError) {
      setError(uploadError.message)
      setUploading(false)
      return { url: null, error: uploadError.message }
    }

    const { data } = supabase.storage.from('avatars').getPublicUrl(path)
    const url = data.publicUrl

    // Save avatar_url to profiles table
    await supabase
      .from('profiles')
      .update({ avatar_url: url })
      .eq('id', userId)

    setUploading(false)
    return { url, error: null }
  }

  return { uploadAvatar, uploading, error }
}
