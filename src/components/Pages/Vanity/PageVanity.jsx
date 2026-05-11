import { Icon } from "../../Icon/Icon";
import { CircleProgress } from "../../CircleProgress/CircleProgress";
import { PRODUCTS, ROUTINE } from "../../../constants/data";
import { theme } from "../../../constants/theme";
import styles from "./PageVanity.module.css";

export const PageVanity = () => {
  return (
    <div className={styles.container}>
      {/* Profile header */}
      <div className={styles.profileHeader}>
        <div className={styles.avatar}>
          <Icon name="vanity" size={26} color={theme.accent} />
        </div>
        <div>
          <div className={styles.name}>Maya Cohen</div>
          <div className={styles.subtitle}>Warm Neutral · Oval Face</div>
        </div>
      </div>

      {/* Glow Score */}
      <div className={styles.glowCard}>
        <CircleProgress pct={87} size={90} stroke={7} color={theme.accent} label="Glow" />
        <div>
          <div className={styles.glowLabel}>Glow Score</div>
          <div className={styles.glowScore}>
            87<span>/100</span>
          </div>
          <div className={styles.glowText}>Excellent skin health 🌟</div>
        </div>
      </div>

      {/* My products */}
      <div className={styles.collectionCard}>
        <div className={styles.cardLabel}>My Collection</div>
        <div className={styles.productScroll}>
          {PRODUCTS.slice(0, 4).map((p) => (
            <div key={p.id} className={styles.productThumb}>
              <div className={styles.thumbImage}>
                <img src={p.img} alt={p.name} />
              </div>
              <div className={styles.thumbBrand}>{p.brand}</div>
            </div>
          ))}
          <div className={styles.addMore}>
            <Icon name="plus" size={20} color={theme.muted} />
          </div>
        </div>
      </div>

      {/* Daily routine */}
      <div className={styles.routineCard}>
        <div className={styles.cardLabel}>Daily Routine</div>
        {ROUTINE.map((r, i) => (
          <div key={i} className={styles.routineItem}>
            <div className={`${styles.routineCheck} ${r.done ? styles.done : ""}`}>
              {r.done ? (
                <Icon name="check" size={16} color={theme.white} />
              ) : (
                <div className={styles.dot} />
              )}
            </div>
            <div className={styles.routineContent}>
              <div className={`${styles.routineLabel} ${r.done ? styles.done : ""}`}>
                {r.label}
              </div>
              <div className={styles.routineTime}>{r.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
