import { CircleProgress } from "../../CircleProgress/CircleProgress";
import { theme } from "../../../constants/theme";
import styles from "./PageResults.module.css";

export const PageResults = ({ onNav }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.label}>Analysis Results</div>
        <h2 className={styles.title}>
          Your Skin<br />
          <span>Profile</span>
        </h2>
      </div>

      {/* Undertone card */}
      <div className={styles.undertoneCard}>
        <div className={styles.cardLabel}>◉ Matched Undertone</div>
        <div className={styles.cardValue}>Warm Neutral</div>
        <div className={styles.cardDetail}>Golden-Peachy base tones</div>
        <div className={styles.swatches}>
          {["#D4956A", "#C87E5A", "#E8B08A", "#F5C8A4", "#E0A882"].map((c) => (
            <div
              key={c}
              className={styles.swatch}
              style={{ background: c, boxShadow: `0 2px 8px ${c}60` }}
            />
          ))}
        </div>
      </div>

      {/* Metrics row */}
      <div className={styles.metricsGrid}>
        {[
          { label: "Hydration", pct: 82, color: theme.accent },
          { label: "Oiliness", pct: 65, color: "#8A9E7B" },
          { label: "Pores", pct: 38, color: "#7B8FAE" },
        ].map((m) => (
          <div key={m.label} className={styles.metricCard}>
            <CircleProgress pct={m.pct} size={70} stroke={5} color={m.color} />
            <div className={styles.metricLabel}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Face zone card */}
      <div className={styles.zoneCard}>
        <div className={styles.cardLabel}>△ Facial Structure</div>
        <div className={styles.zoneContent}>
          {[
            ["Face Shape", "Oval"],
            ["Eye Shape", "Almond"],
            ["Symmetry", "94%"],
          ].map(([k, v]) => (
            <div key={k} className={styles.zoneItem}>
              <div className={styles.zoneValue}>{v}</div>
              <div className={styles.zoneLabel}>{k}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Skin zones */}
      <div className={styles.skinZones}>
        <div className={styles.cardLabel}>⊕ Skin Zone Map</div>
        {[
          ["T-Zone", "Sebum — oily", "#E8D5C8"],
          ["Cheeks", "Normal — well hydrated", "#D4E8D0"],
          ["Under-eye", "Slightly dry", "#D0D8E8"],
        ].map(([z, d, c]) => (
          <div key={z} className={styles.zoneMapItem}>
            <div className={styles.colorBox} style={{ background: c }} />
            <span className={styles.zoneMapName}>{z}</span>
            <span className={styles.zoneMapDesc}>{d}</span>
          </div>
        ))}
      </div>

      <button onClick={() => onNav("shop")} className={styles.ctaButton}>
        View My Matched Products →
      </button>
    </div>
  );
};
