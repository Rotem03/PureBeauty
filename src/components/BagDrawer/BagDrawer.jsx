import { useBag } from '../../context/BagContext'
import { useApp } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'
import styles from './BagDrawer.module.css'

export const BagDrawer = () => {
  const { collection, removeFromCollection, isOpen, setIsOpen } = useBag()
  const { user } = useApp()
  const navigate = useNavigate()

  const total = collection.reduce((sum, c) => {
    const p = c.products ?? c
    return sum + (parseFloat(p.price) || 0)
  }, 0)

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)} />}
      <div className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <div className={styles.title}>My Bag <span>{collection.length}</span></div>
          <button className={styles.close} onClick={() => setIsOpen(false)}>✕</button>
        </div>

        {collection.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🛍</div>
            <div className={styles.emptyTitle}>Your bag is empty</div>
            <div className={styles.emptyText}>Add products from the shop to see them here.</div>
            <button className={styles.shopBtn} onClick={() => { setIsOpen(false); navigate('/shop') }}>
              Browse Products →
            </button>
          </div>
        ) : (
          <>
            <div className={styles.items}>
              {collection.map((c) => {
                const p = c.products ?? c
                const id = c.product_id ?? c.id
                return (
                  <div key={id} className={styles.item}>
                    <div className={styles.itemImage}>
                      {p.image_url && <img src={p.image_url} alt={p.name} />}
                    </div>
                    <div className={styles.itemInfo}>
                      <div className={styles.itemName}>{p.name}</div>
                      <div className={styles.itemBrand}>{p.brand}</div>
                      {p.price && <div className={styles.itemPrice}>${parseFloat(p.price).toFixed(2)}</div>}
                    </div>
                    <button
                      className={styles.removeBtn}
                      onClick={() => removeFromCollection(user?.id, id)}
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>
                )
              })}
            </div>

            <div className={styles.footer}>
              <div className={styles.totalRow}>
                <span>Estimated Total</span>
                <span className={styles.totalAmt}>${total.toFixed(2)}</span>
              </div>
              <button className={styles.checkoutBtn} onClick={() => { setIsOpen(false); navigate('/checkout') }}>
                Proceed to Checkout
              </button>
              <button className={styles.continueBtn} onClick={() => { setIsOpen(false); navigate('/shop') }}>
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
