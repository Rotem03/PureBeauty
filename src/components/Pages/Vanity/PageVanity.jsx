import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const { profile, loading: profileLoading, hasScan } = useSkinProfile()
  const { collection } = useUserCollection(user?.id)
  const { routine, toggleStep } = useRoutine(user?.id)
  const { uploadAvatar, uploading } = useAvatar()
  const fileInputRef = useRef(null)
  const [avatarUrl, setAvatarUrl] = useState(null)

  const displayName = user?.user_metadata?.display_name ?? user?.email?.split('@')[0] ?? 'Guest'
  const glowScore = profile?.glow_score ?? null
  const undertone = profile?.undertone ?? null
  const faceShape = profile?.face_shape ?? null
  const hydration = profile?.hydration_pct ?? null
  const oiliness = profile?.oiliness_pct ?? null
  const noScan = user && !profileLoading && !hasScan

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

  const doneCount = routine.filter(r => r.done).length

  const undertoneGradient = undertone?.toLowerCase().includes('warm')
    ? 'linear-gradient(135deg, #C4956A, #E8C49A)'
    : undertone?.toLowerCase().includes('cool')
    ? 'linear-gradient(135deg, #8A9EC4, #C4D0E8)'
    : 'linear-gradient(135deg, #B8A89A, #D4C8C0)'

  return (
    <div className={styles.page}>

      {/* Hero Banner */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroLeft}>
            <div
              className={styles.avatar}
              onClick={() => user && fileInputRef.current?.click()}
              title={user ? 'Click to change photo' : ''}
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt="avatar" className={styles.avatarImg} />
              ) : (
                <span className={styles.avatarInitial}>{displayName[0]?.toUpperCase()}</span>
              )}
              {uploading && <div className={styles.avatarLoading}>…</div>}
              {user && <div className={styles.avatarEdit}>✎</div>}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
            <div>
              <h1 className={styles.heroName}>{displayName}</h1>
              <p className={styles.heroSub}>{undertone && faceShape ? `${undertone} · ${faceShape} Face` : 'Complete your AI scan to see your profile'}</p>
              <div className={styles.heroBadges}>
                <span className={styles.heroBadge}>✦ AI Skin Matched</span>
                <span className={styles.heroBadge}>◈ Profile Active</span>
              </div>
            </div>
          </div>
          <div className={styles.heroRight}>
            {user ? (
              <button onClick={handleSignOut} className={styles.signOutBtn}>Sign Out</button>
            ) : (
              <button onClick={() => navigate('/auth')} className={styles.signInHeroBtn}>Sign In to Save</button>
            )}
          </div>
        </div>
      </div>

      {/* No scan banner */}
      {noScan && (
        <div className={styles.noScanBanner}>
          <div className={styles.noScanIcon}>✦</div>
          <div>
            <div className={styles.noScanTitle}>You haven't done your AI scan yet</div>
            <div className={styles.noScanSub}>Run your skin analysis to unlock your personalized profile, glow score, and product matches.</div>
          </div>
          <button onClick={() => navigate('/scan')} className={styles.noScanBtn}>Start AI Scan →</button>
        </div>
      )}

      {/* Stats Row */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <CircleProgress pct={glowScore ?? 0} size={72} stroke={6} color={theme.accent} label="Glow" />
          <div className={styles.statInfo}>
            <div className={styles.statLabel}>Glow Score</div>
            <div className={styles.statValue}>{glowScore ?? '—'}{glowScore != null && <span>/100</span>}</div>
            <div className={styles.statSub}>
              {glowScore == null ? 'Scan to reveal' : glowScore >= 85 ? 'Excellent ✨' : glowScore >= 70 ? 'Great 🌸' : 'Good 💪'}
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.undertoneOrb} style={{ background: undertoneGradient }} />
          <div className={styles.statInfo}>
            <div className={styles.statLabel}>Undertone</div>
            <div className={styles.statValue} style={{ fontSize: 20 }}>{undertone ?? '—'}</div>
            <div className={styles.statSub}>{undertone ? 'Foundation match key' : 'Scan to reveal'}</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.miniStats}>
            <div className={styles.miniStat}>
              <div className={styles.miniBar}>
                <div className={styles.miniBarFill} style={{ width: `${hydration ?? 0}%`, background: '#7BAFD4' }} />
              </div>
              <span>Hydration {hydration != null ? `${hydration}%` : '—'}</span>
            </div>
            <div className={styles.miniStat}>
              <div className={styles.miniBar}>
                <div className={styles.miniBarFill} style={{ width: `${oiliness ?? 0}%`, background: '#B88A76' }} />
              </div>
              <span>Oiliness {oiliness != null ? `${oiliness}%` : '—'}</span>
            </div>
          </div>
          <div className={styles.statInfo}>
            <div className={styles.statLabel}>Skin Stats</div>
            <div className={styles.statValue} style={{ fontSize: 18 }}>{faceShape ? `${faceShape} Face` : '—'}</div>
            <div className={styles.statSub}>{faceShape ? 'Shape analysis' : 'Scan to reveal'}</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.routineRingWrap}>
            <svg viewBox="0 0 60 60" width={72} height={72}>
              <circle cx="30" cy="30" r="24" fill="none" stroke="#E8D5C8" strokeWidth="5" />
              <circle cx="30" cy="30" r="24" fill="none" stroke="#B88A76" strokeWidth="5"
                strokeDasharray={`${routine.length ? (doneCount / routine.length) * 150.8 : 0} 150.8`}
                strokeLinecap="round" transform="rotate(-90 30 30)" />
            </svg>
            <span className={styles.routineRingText}>{doneCount}/{routine.length}</span>
          </div>
          <div className={styles.statInfo}>
            <div className={styles.statLabel}>Today's Routine</div>
            <div className={styles.statValue} style={{ fontSize: 18 }}>
              {doneCount === routine.length ? 'Complete!' : `${routine.length - doneCount} left`}
            </div>
            <div className={styles.statSub}>{doneCount === routine.length ? 'Great work 🎉' : 'Keep going'}</div>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className={styles.grid}>
        {/* Collection */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>My Collection</div>
            <button onClick={() => navigate('/shop')} className={styles.cardAction}>+ Add more</button>
          </div>
          {collection.length === 0 ? (
            <button onClick={() => navigate('/shop')} className={styles.emptyState}>
              <div className={styles.emptyIcon}>🛍</div>
              <div className={styles.emptyText}>Browse AI-matched products</div>
              <div className={styles.emptySubtext}>Your saved products will appear here</div>
            </button>
          ) : (
            <div className={styles.productGrid}>
              {collection.slice(0, 6).map((c) => {
                const p = c.products ?? c
                return (
                  <div key={c.product_id ?? c.id} className={styles.productThumb}>
                    <div className={styles.thumbImg}>
                      {p.image_url && <img src={p.image_url} alt={p.name} />}
                    </div>
                    <div className={styles.thumbName}>{p.name}</div>
                    <div className={styles.thumbBrand}>{p.brand}</div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Routine */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>Daily Routine</div>
            <div className={styles.cardBadge}>{doneCount}/{routine.length} done</div>
          </div>
          <div className={styles.routineList}>
            {routine.map((r, i) => (
              <button key={i} onClick={() => toggleStep(i)} className={`${styles.routineItem} ${r.done ? styles.routineDone : ''}`}>
                <div className={styles.routineTime}>{r.time}</div>
                <div className={styles.routineCheck}>
                  {r.done ? '✓' : <div className={styles.routineDot} />}
                </div>
                <div className={styles.routineLabel}>{r.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {!user && (
        <div className={styles.authBanner}>
          <div>
            <div className={styles.authBannerTitle}>Save your profile</div>
            <div className={styles.authBannerSub}>Sign in to sync your routine and collection across devices.</div>
          </div>
          <button onClick={() => navigate('/auth')} className={styles.authBannerBtn}>Create Account →</button>
        </div>
      )}
    </div>
  )
}
