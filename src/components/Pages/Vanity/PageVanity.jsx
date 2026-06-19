import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../../Icon/Icon'
import { CircleProgress } from '../../CircleProgress/CircleProgress'
import { useApp } from '../../../context/AppContext'
import { useSkinProfile } from '../../../hooks/useSkinProfile'
import { useUserCollection } from '../../../hooks/useProducts'
import { useRoutine } from '../../../hooks/useRoutine'
import { useAvatar } from '../../../hooks/useAvatar'
import { theme } from '../../../constants/theme'
import styles from './PageVanity.module.css'

export const PageVanity = () => {
  const navigate = useNavigate()
  const { user, signOut } = useApp()
  const { profile } = useSkinProfile()
  const { collection } = useUserCollection(user?.id)
  const { routine, toggleStep } = useRoutine(user?.id)
  const { uploadAvatar, uploading } = useAvatar()
  const fileInputRef = useRef(null)
  const [avatarUrl, setAvatarUrl] = useState(null)

  const displayName = user?.user_metadata?.display_name ?? user?.email?.split('@')[0] ?? 'Guest'
  const glowScore = profile?.glow_score ?? 87
  const undertone = profile?.undertone ?? 'Warm Neutral'
  const faceShape = profile?.face_shape ?? 'Oval'

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file || !user) return
    const { url } = await uploadAvatar(user.id, file)
    if (url) setAvatarUrl(url)
  }

  return (
    <div className={styles.container}>
      {/* Profile header */}
      <div className={styles.profileHeader}>
        <div className={styles.avatarRow}>
          <div
            className={styles.avatar}
            onClick={() => user && fileInputRef.current?.click()}
            style={{ cursor: user ? 'pointer' : 'default', overflow: 'hidden' }}
            title={user ? 'Click to change photo' : ''}
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
            ) : (
              <Icon name="vanity" size={26} color={theme.accent} />
            )}
            {uploading && (
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: 10 }}>…</div>
            )}
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
          <div>
            <div className={styles.name}>{displayName}</div>
            <div className={styles.subtitle}>{undertone} · {faceShape} Face</div>
          </div>
        </div>
        {user ? (
          <button onClick={handleSignOut} className={styles.signOutBtn}>Sign Out</button>
        ) : (
          <button onClick={() => navigate('/auth')} className={styles.signOutBtn}>Sign In</button>
        )}
      </div>

      {/* Glow Score */}
      <div className={styles.glowCard}>
        <CircleProgress pct={glowScore} size={90} stroke={7} color={theme.accent} label="Glow" />
        <div>
          <div className={styles.glowLabel}>Glow Score</div>
          <div className={styles.glowScore}>
            {glowScore}<span>/100</span>
          </div>
          <div className={styles.glowText}>
            {glowScore >= 85 ? 'Excellent skin health ✨' :
             glowScore >= 70 ? 'Great skin health 🌸' : 'Good progress 💪'}
          </div>
        </div>
      </div>

      {/* My products */}
      <div className={styles.collectionCard}>
        <div className={styles.cardLabel}>My Collection</div>
        {collection.length === 0 ? (
          <button onClick={() => navigate('/shop')} className={styles.emptyCollection}>
            + Browse your matched products
          </button>
        ) : (
          <div className={styles.productScroll}>
            {collection.slice(0, 4).map((c) => {
              const p = c.products ?? c
              return (
                <div key={c.product_id ?? c.id} className={styles.productThumb}>
                  <div className={styles.thumbImage}>
                    {p.image_url && <img src={p.image_url} alt={p.name} />}
                  </div>
                  <div className={styles.thumbBrand}>{p.brand}</div>
                </div>
              )
            })}
            <button onClick={() => navigate('/shop')} className={styles.addMore}>
              <Icon name="plus" size={20} color={theme.muted} />
            </button>
          </div>
        )}
      </div>

      {/* Daily routine */}
      <div className={styles.routineCard}>
        <div className={styles.cardLabel}>Daily Routine</div>
        {routine.map((r, i) => (
          <button key={i} onClick={() => toggleStep(i)} className={styles.routineItem}>
            <div className={`${styles.routineCheck} ${r.done ? styles.done : ''}`}>
              {r.done ? (
                <Icon name="check" size={16} color={theme.white} />
              ) : (
                <div className={styles.dot} />
              )}
            </div>
            <div className={styles.routineContent}>
              <div className={`${styles.routineLabel} ${r.done ? styles.done : ''}`}>
                {r.label}
              </div>
              <div className={styles.routineTime}>{r.time}</div>
            </div>
          </button>
        ))}
      </div>

      {!user && (
        <div className={styles.authPrompt}>
          <p>Sign in to save your profile and sync your routine across devices.</p>
          <button onClick={() => navigate('/auth')} className={styles.authButton}>
            Create Account →
          </button>
        </div>
      )}
    </div>
  )
}
