import { useNavigate } from 'react-router-dom'
import { Icon } from '../../Icon/Icon'
import styles from './PageLanding.module.css'

const FEATURES = [
  { icon: '✦', title: 'Undertone Match', desc: 'AI reads your skin undertone from a selfie and recommends shades that work with your complexion.' },
  { icon: '◈', title: 'Skin Analysis', desc: 'Deep analysis of hydration, oiliness, and glow score to build your personalized routine.' },
  { icon: '◉', title: 'AR Tutorials', desc: 'Step-by-step guided makeup tutorials tailored to your unique face shape and features.' },
]

export const PageLanding = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>AI-POWERED BEAUTY</div>
          <h1 className={styles.heading}>
            Discover Your<br />
            <em>Natural Glow.</em>
          </h1>
          <p className={styles.subtitle}>
            Personalized makeup recommendations crafted by AI — matched to your unique skin tone, undertone, and face shape.
          </p>
          <div className={styles.ctaRow}>
            <button onClick={() => navigate('/scan')} className={styles.ctaPrimary}>
              Start AI Scan
              <Icon name="arrow" size={16} color="#F9F7F5" />
            </button>
            <button onClick={() => navigate('/shop')} className={styles.ctaSecondary}>
              Browse Products
            </button>
          </div>
          <div className={styles.stats}>
            <div className={styles.stat}><strong>10k+</strong><span>Skin profiles</span></div>
            <div className={styles.statDivider} />
            <div className={styles.stat}><strong>98%</strong><span>Match accuracy</span></div>
            <div className={styles.statDivider} />
            <div className={styles.stat}><strong>500+</strong><span>Products</span></div>
          </div>
        </div>
        <div className={styles.heroImage}>
          <div className={styles.imageBg} />
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEhRwZEgBQBE5D2RUXfEDOfQuRlz8xVHKiT2ADpfwhI05kFZK2yTFOxwTsIi82DmE5U98GbuwDbZCpeqdw_UhsOBi7ZDQWGlB41xwkpB8p0DwSjLTSATwE0uDoiQ7d_ZqCdrVrwP8JhvYi6X9VEcp90uc6IIX5Lv7nTRjKPt-Ki1I693mXXdaQHw7aFOVxOnCPxtTfqpdA_d5H-J0bM1-KS31oTZy0FyW87pHfnhIAlxK1QD9KIuhb09Hi54gkuzEUrM3Wkw03zBw"
            alt="Premium beauty products"
            className={styles.img}
          />
          <div className={styles.floatCard}>
            <div className={styles.floatDot} />
            <span>AI-Matched For You</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.features}>
        <div className={styles.featuresInner}>
          <div className={styles.featuresHeader}>
            <h2 className={styles.featuresTitle}>Everything you need for your perfect look</h2>
            <p className={styles.featuresSubtitle}>Three powerful tools, one seamless experience.</p>
          </div>
          <div className={styles.featureCards}>
            {FEATURES.map((f) => (
              <div key={f.title} className={styles.featureCard}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <h3 className={styles.featureCardTitle}>{f.title}</h3>
                <p className={styles.featureCardDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaBannerInner}>
          <h2 className={styles.ctaBannerTitle}>Ready to find your perfect match?</h2>
          <p className={styles.ctaBannerSub}>Take a quick AI scan and get personalized results in seconds.</p>
          <button onClick={() => navigate('/scan')} className={styles.ctaPrimary}>
            Get Started Free
            <Icon name="arrow" size={16} color="#F9F7F5" />
          </button>
        </div>
      </section>

      <footer className={styles.footer}>
        <span className={styles.footerLogo}>PureBeauty</span>
        <span className={styles.footerCopy}>© 2026 PureBeauty AI. All rights reserved.</span>
      </footer>
    </div>
  )
}
