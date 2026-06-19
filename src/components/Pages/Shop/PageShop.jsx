import { useState } from 'react'
import { Icon } from '../../Icon/Icon'
import { Toast } from '../../Toast/Toast'
import { useProducts } from '../../../hooks/useProducts'
import { useBag } from '../../../context/BagContext'
import { useApp } from '../../../context/AppContext'
import { theme } from '../../../constants/theme'
import styles from './PageShop.module.css'

const FILTERS = ['All', 'Luxury', 'Drugstore']

export const PageShop = () => {
  const { user } = useApp()
  const { products, loading } = useProducts()
  const { collection, addToCollection, removeFromCollection, setIsOpen } = useBag()
  const [filter, setFilter] = useState('All')
  const [toast, setToast] = useState(null)

  const filtered = filter === 'All' ? products : products.filter(p => p.category === filter)

  const isInCollection = (productId) =>
    collection.some(c => c.product_id === productId || c.id === productId)

  const toggleProduct = async (p) => {
    const id = p.id
    const inCollection = isInCollection(id)
    if (inCollection) {
      await removeFromCollection(user?.id, id)
      setToast({ message: 'Removed from bag', type: 'success' })
    } else {
      await addToCollection(user?.id, id, p.match_score ?? null, p)
      setToast({ message: 'Added to bag ✓', type: 'success' })
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <div className={styles.label}>Curated For You</div>
          <h2 className={styles.title}>
            Your Perfect<br />
            <span>Matches</span>
          </h2>
        </div>
        {collection.length > 0 && (
          <button className={styles.bagBadge} onClick={() => setIsOpen(true)}>
            <Icon name="shop" size={14} color={theme.bg} />
            {collection.length} in bag — View →
          </button>
        )}
      </div>

      <div className={styles.filters}>
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`${styles.filterButton} ${filter === f ? styles.active : ''}`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <div className={styles.loadingState}>Loading your matches…</div>
      ) : (
        <div className={styles.productGrid}>
          {filtered.map((p) => {
            const added = isInCollection(p.id)
            return (
              <div key={p.id} className={styles.productCard}>
                <div className={styles.productImage}>
                  <img src={p.image_url || p.img} alt={p.name} />
                  {(p.match_score || p.match) && (
                    <div className={styles.matchBadge}>{p.match_score || p.match}% Match</div>
                  )}
                </div>
                <div className={styles.productInfo}>
                  <div className={styles.category}>{p.category?.toUpperCase()}</div>
                  <div className={styles.productName}>{p.name}</div>
                  <div className={styles.brandRow}>
                    <span className={styles.brand}>{p.brand}</span>
                    {p.price && <span className={styles.price}>${parseFloat(p.price).toFixed(2)}</span>}
                  </div>
                  <button
                    onClick={() => toggleProduct(p)}
                    className={`${styles.addButton} ${added ? styles.added : ''}`}
                  >
                    {added ? (
                      <><Icon name="check" size={13} color={theme.bg} /> Added</>
                    ) : (
                      <><Icon name="plus" size={13} color={theme.bg} /> Add to Bag</>
                    )}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
