import { useState } from "react";
import { Icon } from "../../Icon/Icon";
import { PRODUCTS } from "../../../constants/data";
import { theme } from "../../../constants/theme";
import styles from "./PageShop.module.css";

export const PageShop = () => {
  const [filter, setFilter] = useState("All");
  const [bag, setBag] = useState([]);
  const FILTERS = ["All", "Luxury", "Drugstore"];

  const filtered =
    filter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);
  const toggle = (p) =>
    setBag((b) =>
      b.find((x) => x.id === p.id) ? b.filter((x) => x.id !== p.id) : [...b, p]
    );

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <div className={styles.label}>Curated For You</div>
          <h2 className={styles.title}>
            Your Perfect<br />
            <span>Matches</span>
          </h2>
        </div>
        {bag.length > 0 && (
          <div className={styles.bagBadge}>
            <Icon name="shop" size={14} color={theme.bg} />
            {bag.length}
          </div>
        )}
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`${styles.filterButton} ${
              filter === f ? styles.active : ""
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* 2-col grid */}
      <div className={styles.productGrid}>
        {filtered.map((p) => {
          const added = bag.some((x) => x.id === p.id);
          return (
            <div key={p.id} className={styles.productCard}>
              <div className={styles.productImage}>
                <img src={p.img} alt={p.name} />
                <div className={styles.matchBadge}>{p.match}% Match</div>
              </div>
              <div className={styles.productInfo}>
                <div className={styles.category}>{p.category.toUpperCase()}</div>
                <div className={styles.productName}>{p.name}</div>
                <div className={styles.brand}>{p.brand}</div>
                <button
                  onClick={() => toggle(p)}
                  className={`${styles.addButton} ${added ? styles.added : ""}`}
                >
                  {added ? (
                    <>
                      <Icon name="check" size={13} color={theme.bg} />
                      Added
                    </>
                  ) : (
                    <>
                      <Icon name="plus" size={13} color={theme.bg} />
                      Add to Bag
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
