import { Icon } from "../../Icon/Icon";
import styles from "./PageLanding.module.css";

export const PageLanding = ({ onNav }) => {
  return (
    <div className={styles.container}>
      {/* Decorative blobs */}
      <div className={styles.blobTop} />
      <div className={styles.blobBottom} />

      {/* Logo */}
      <div className={styles.logoContainer}>
        <div className={styles.logo}>PureBeauty</div>
      </div>

      {/* Hero image area */}
      <div className={styles.heroImage}>
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEhRwZEgBQBE5D2RUXfEDOfQuRlz8xVHKiT2ADpfwhI05kFZK2yTFOxwTsIi82DmE5U98GbuwDbZCpeqdw_UhsOBi7ZDQWGlB41xwkpB8p0DwSjLTSATwE0uDoiQ7d_ZqCdrVrwP8JhvYi6X9VEcp90uc6IIX5Lv7nTRjKPt-Ki1I693mXXdaQHw7aFOVxOnCPxtTfqpdA_d5H-J0bM1-KS31oTZy0FyW87pHfnhIAlxK1QD9KIuhb09Hi54gkuzEUrM3Wkw03zBw"
          alt="Premium beauty products"
        />
        {/* Elegant tag */}
        <div className={styles.tag}>
          <div className={styles.tagText}>AI-MATCHED FOR YOU</div>
        </div>
      </div>

      {/* Copy */}
      <h1 className={styles.heading}>
        Discover Your<br />
        <em>Natural Glow.</em>
      </h1>
      <p className={styles.subtitle}>
        AI-powered personalized makeup, crafted just for you.
      </p>

      {/* CTA */}
      <button onClick={() => onNav("scan")} className={styles.ctaButton}>
        Start AI Scan
        <Icon name="arrow" size={16} color="#F9F7F5" />
      </button>

      {/* Feature pills */}
      <div className={styles.featurePills}>
        {["Undertone Match", "Skin Analysis", "AR Tutorials"].map((f) => (
          <div key={f} className={styles.pill}>
            {f}
          </div>
        ))}
      </div>
    </div>
  );
};
