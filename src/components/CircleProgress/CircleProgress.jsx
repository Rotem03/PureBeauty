import styles from "./CircleProgress.module.css";
import { theme } from "../../constants/theme";

export const CircleProgress = ({ pct, size = 90, stroke = 6, color = theme.accent, label }) => {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <div className={styles.container} style={{ width: size, height: size }}>
      <svg width={size} height={size} className={styles.svg}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={theme.card} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          className={styles.progress}
        />
      </svg>
      <div className={styles.content}>
        <div className={styles.percentage}>{pct}%</div>
        {label && <div className={styles.label}>{label}</div>}
      </div>
    </div>
  );
};
