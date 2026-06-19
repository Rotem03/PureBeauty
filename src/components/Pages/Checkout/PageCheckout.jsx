import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBag } from '../../../context/BagContext'
import styles from './PageCheckout.module.css'

const STEPS = ['Shipping', 'Payment', 'Review']

export const PageCheckout = () => {
  const { collection, setIsOpen } = useBag()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [placed, setPlaced] = useState(false)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '', country: 'United States',
    cardName: '', cardNumber: '', expiry: '', cvv: '',
  })

  const total = collection.reduce((sum, c) => {
    const p = c.products ?? c
    return sum + (parseFloat(p.price) || 0)
  }, 0)
  const tax = total * 0.08
  const shipping = total > 0 ? 4.99 : 0

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const fmtCard = (v) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  const fmtExpiry = (v) => {
    const d = v.replace(/\D/g, '').slice(0, 4)
    return d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d
  }

  if (placed) {
    return (
      <div className={styles.successPage}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>✓</div>
          <h2 className={styles.successTitle}>Order Placed!</h2>
          <p className={styles.successText}>
            Thank you, {form.firstName}. A confirmation will be sent to {form.email}.
          </p>
          <div className={styles.successOrder}>Order #{Math.floor(Math.random() * 900000 + 100000)}</div>
          <button className={styles.successBtn} onClick={() => navigate('/shop')}>
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* Left column — form */}
        <div className={styles.formCol}>
          <button className={styles.back} onClick={() => step === 0 ? navigate('/shop') : setStep(s => s - 1)}>
            ← {step === 0 ? 'Back to Shop' : 'Back'}
          </button>

          {/* Step indicator */}
          <div className={styles.steps}>
            {STEPS.map((s, i) => (
              <div key={s} className={`${styles.stepItem} ${i <= step ? styles.stepActive : ''}`}>
                <div className={styles.stepDot}>{i < step ? '✓' : i + 1}</div>
                <span>{s}</span>
                {i < STEPS.length - 1 && <div className={styles.stepLine} />}
              </div>
            ))}
          </div>

          {/* Step 0 — Shipping */}
          {step === 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Shipping Information</h2>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label>First Name</label>
                  <input value={form.firstName} onChange={set('firstName')} placeholder="Jane" />
                </div>
                <div className={styles.field}>
                  <label>Last Name</label>
                  <input value={form.lastName} onChange={set('lastName')} placeholder="Smith" />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label>Email</label>
                  <input type="email" value={form.email} onChange={set('email')} placeholder="jane@example.com" />
                </div>
                <div className={styles.field}>
                  <label>Phone</label>
                  <input value={form.phone} onChange={set('phone')} placeholder="+1 (555) 000-0000" />
                </div>
              </div>
              <div className={styles.field}>
                <label>Address</label>
                <input value={form.address} onChange={set('address')} placeholder="123 Main Street, Apt 4B" />
              </div>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label>City</label>
                  <input value={form.city} onChange={set('city')} placeholder="New York" />
                </div>
                <div className={styles.field} style={{ maxWidth: 100 }}>
                  <label>State</label>
                  <input value={form.state} onChange={set('state')} placeholder="NY" maxLength={2} />
                </div>
                <div className={styles.field} style={{ maxWidth: 120 }}>
                  <label>ZIP</label>
                  <input value={form.zip} onChange={set('zip')} placeholder="10001" maxLength={5} />
                </div>
              </div>
              <div className={styles.field}>
                <label>Country</label>
                <select value={form.country} onChange={set('country')}>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>Australia</option>
                  <option>Israel</option>
                </select>
              </div>
              <button className={styles.nextBtn} onClick={() => setStep(1)}>
                Continue to Payment →
              </button>
            </div>
          )}

          {/* Step 1 — Payment */}
          {step === 1 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Payment Details</h2>
              <div className={styles.cardIcons}>
                <span className={styles.cardBadge}>VISA</span>
                <span className={styles.cardBadge}>MC</span>
                <span className={styles.cardBadge}>AMEX</span>
              </div>
              <div className={styles.field}>
                <label>Name on Card</label>
                <input value={form.cardName} onChange={set('cardName')} placeholder="Jane Smith" />
              </div>
              <div className={styles.field}>
                <label>Card Number</label>
                <input
                  value={form.cardNumber}
                  onChange={e => setForm(f => ({ ...f, cardNumber: fmtCard(e.target.value) }))}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label>Expiry</label>
                  <input
                    value={form.expiry}
                    onChange={e => setForm(f => ({ ...f, expiry: fmtExpiry(e.target.value) }))}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
                <div className={styles.field} style={{ maxWidth: 120 }}>
                  <label>CVV</label>
                  <input
                    value={form.cvv}
                    onChange={e => setForm(f => ({ ...f, cvv: e.target.value.replace(/\D/g,'').slice(0,4) }))}
                    placeholder="•••"
                    maxLength={4}
                    type="password"
                  />
                </div>
              </div>
              <button className={styles.nextBtn} onClick={() => setStep(2)}>
                Review Order →
              </button>
            </div>
          )}

          {/* Step 2 — Review */}
          {step === 2 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Review Your Order</h2>
              <div className={styles.reviewBlock}>
                <div className={styles.reviewLabel}>Ship to</div>
                <div className={styles.reviewValue}>
                  {form.firstName} {form.lastName}<br />
                  {form.address}, {form.city} {form.state} {form.zip}<br />
                  {form.country}
                </div>
              </div>
              <div className={styles.reviewBlock}>
                <div className={styles.reviewLabel}>Payment</div>
                <div className={styles.reviewValue}>
                  Card ending in {form.cardNumber.replace(/\s/g,'').slice(-4) || '••••'}
                </div>
              </div>
              <button className={styles.placeBtn} onClick={() => setPlaced(true)}>
                Place Order · ${(total + tax + shipping).toFixed(2)}
              </button>
            </div>
          )}
        </div>

        {/* Right column — order summary */}
        <div className={styles.summaryCol}>
          <div className={styles.summaryCard}>
            <h3 className={styles.summaryTitle}>Order Summary</h3>
            <div className={styles.summaryItems}>
              {collection.map((c) => {
                const p = c.products ?? c
                const id = c.product_id ?? c.id
                return (
                  <div key={id} className={styles.summaryItem}>
                    <div className={styles.summaryImg}>
                      {p.image_url && <img src={p.image_url} alt={p.name} />}
                    </div>
                    <div className={styles.summaryInfo}>
                      <div className={styles.summaryName}>{p.name}</div>
                      <div className={styles.summaryBrand}>{p.brand}</div>
                    </div>
                    <div className={styles.summaryPrice}>${parseFloat(p.price || 0).toFixed(2)}</div>
                  </div>
                )
              })}
            </div>
            <div className={styles.divider} />
            <div className={styles.summaryRow}><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
            <div className={styles.summaryRow}><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
            <div className={styles.summaryRow}><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
            <div className={styles.divider} />
            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              <span>Total</span>
              <span>${(total + tax + shipping).toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
