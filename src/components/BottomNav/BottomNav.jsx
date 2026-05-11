import { Icon } from "../Icon/Icon";
import { NAV_ITEMS } from "../../constants/data";
import { theme } from "../../constants/theme";
import styles from "./BottomNav.module.css";

export const BottomNav = ({ page, onNav }) => {
  return (
    <nav className={styles.nav}>
      {NAV_ITEMS.map(({ id, icon, label }) => {
        const active = page === id;
        return (
          <button
            key={id}
            onClick={() => onNav(id)}
            className={styles.navButton}
          >
            <Icon
              name={icon}
              size={22}
              color={active ? theme.accent : theme.muted}
            />
            <span className={`${styles.label} ${active ? styles.active : ""}`}>
              {label}
            </span>
            {active && <div className={styles.dot} />}
          </button>
        );
      })}
    </nav>
  );
};
