"use client";

import Link from "next/link";
import { ArrowRight, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, removeItem, updateQty, total } = useCart();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .cart-page { background: #faf6ef; min-height: 60vh; padding: 3.5rem 1.5rem 7rem; box-sizing: border-box; }
        .cart-inner { max-width: 1100px; margin: 0 auto; display: grid; gap: 2.5rem; align-items: start; }
        @media (min-width: 900px) { .cart-inner { grid-template-columns: 1fr 360px; } }

        .cart-heading {
          font-family: 'Playfair Display', serif; font-size: clamp(1.9rem, 4vw, 2.8rem);
          font-weight: 400; font-style: italic; color: #1a4a2e; margin-bottom: 2rem;
        }
        .cart-heading span { font-style: normal; color: #b8893a; }

        /* empty state */
        .cart-empty {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 6rem 2rem; text-align: center;
          font-family: 'DM Sans', sans-serif;
        }
        .cart-empty-icon { color: rgba(26,74,46,.18); margin-bottom: 1.5rem; }
        .cart-empty-title { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-style: italic; color: #1a4a2e; }
        .cart-empty-sub { font-size: .9rem; color: #5a5550; margin-top: .75rem; line-height: 1.7; }
        .cart-empty-cta {
          display: inline-flex; align-items: center; gap: .6rem; margin-top: 2rem;
          background: #1a4a2e; color: #fff;
          font-family: 'DM Sans', sans-serif; font-size: .65rem; font-weight: 700;
          letter-spacing: .2em; text-transform: uppercase;
          padding: 1rem 2rem; text-decoration: none; transition: background .22s;
        }
        .cart-empty-cta:hover { background: #0c3320; }

        /* items list */
        .cart-items { display: flex; flex-direction: column; gap: 1px; background: rgba(26,74,46,.1); }

        .cart-item {
          background: #faf6ef; display: grid; gap: 1rem; align-items: center;
          padding: 1.5rem 1.25rem;
        }
        @media (min-width: 480px) { .cart-item { grid-template-columns: 80px 1fr auto; } }

        .cart-item-img {
          width: 80px; height: 80px; object-fit: cover; display: block;
          border: 1px solid rgba(26,74,46,.1);
          flex-shrink: 0;
        }

        .cart-item-info { min-width: 0; }
        .cart-item-cat {
          font-family: 'DM Sans', sans-serif; font-size: .58rem; font-weight: 700;
          letter-spacing: .2em; text-transform: uppercase; color: #b8893a;
        }
        .cart-item-name {
          font-family: 'Playfair Display', serif; font-size: 1.05rem; font-weight: 500;
          color: #1a4a2e; margin-top: .25rem; line-height: 1.2;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .cart-item-weight {
          font-family: 'DM Sans', sans-serif; font-size: .7rem; color: #5a5550; margin-top: .25rem;
        }
        .cart-item-price {
          font-family: 'DM Sans', sans-serif; font-size: .9rem; font-weight: 700; color: #1a4a2e;
          margin-top: .5rem;
        }

        .cart-item-controls { display: flex; flex-direction: column; align-items: flex-end; gap: .75rem; }
        .cart-qty-row { display: flex; align-items: center; gap: 0; border: 1px solid rgba(26,74,46,.18); }
        .cart-qty-btn {
          display: flex; align-items: center; justify-content: center;
          width: 32px; height: 32px; background: none; border: none; cursor: pointer;
          color: #1a4a2e; transition: background .18s;
        }
        .cart-qty-btn:hover { background: rgba(26,74,46,.07); }
        .cart-qty-num {
          width: 36px; text-align: center;
          font-family: 'DM Sans', sans-serif; font-size: .82rem; font-weight: 700; color: #1a4a2e;
          border-left: 1px solid rgba(26,74,46,.12); border-right: 1px solid rgba(26,74,46,.12);
          line-height: 32px;
        }
        .cart-remove-btn {
          background: none; border: none; cursor: pointer; color: #9a8c7a;
          display: flex; align-items: center; gap: .35rem;
          font-family: 'DM Sans', sans-serif; font-size: .6rem; font-weight: 700;
          letter-spacing: .14em; text-transform: uppercase; transition: color .18s;
        }
        .cart-remove-btn:hover { color: #c0392b; }

        /* summary panel */
        .cart-summary {
          background: #f2ede4; padding: 2rem;
          border: 1px solid rgba(26,74,46,.1); box-sizing: border-box;
        }
        .cart-summary-title {
          font-family: 'DM Sans', sans-serif; font-size: .65rem; font-weight: 700;
          letter-spacing: .24em; text-transform: uppercase; color: #1a4a2e;
          margin-bottom: 1.5rem;
        }
        .cart-summary-row {
          display: flex; justify-content: space-between; align-items: center;
          font-family: 'DM Sans', sans-serif; font-size: .85rem; color: #3d3d36;
          padding: .75rem 0; border-bottom: 1px solid rgba(26,74,46,.08);
        }
        .cart-summary-row:last-of-type { border-bottom: none; }
        .cart-summary-row.total-row {
          font-weight: 700; font-size: 1.05rem; color: #1a4a2e;
          margin-top: .5rem; padding-top: 1rem;
          border-top: 1.5px solid rgba(26,74,46,.15); border-bottom: none;
        }
        .cart-summary-note {
          font-family: 'DM Sans', sans-serif; font-size: .72rem; color: #5a5550;
          line-height: 1.65; margin-top: 1.25rem;
        }
        .cart-checkout-btn {
          display: flex; align-items: center; justify-content: center; gap: .6rem;
          width: 100%; margin-top: 1.5rem;
          background: #1a4a2e; color: #fff; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-size: .65rem; font-weight: 700;
          letter-spacing: .2em; text-transform: uppercase; padding: 1.1rem 2rem;
          text-decoration: none; transition: background .22s;
        }
        .cart-checkout-btn:hover { background: #0c3320; }
        .cart-continue-link {
          display: flex; align-items: center; justify-content: center; gap: .5rem;
          margin-top: 1rem; width: 100%;
          font-family: 'DM Sans', sans-serif; font-size: .62rem; font-weight: 700;
          letter-spacing: .18em; text-transform: uppercase; color: #5a5550;
          text-decoration: none; transition: color .2s;
        }
        .cart-continue-link:hover { color: #1a4a2e; }
      `}</style>

      <main className="cart-page">
        <h1 className="cart-heading">
          Your <span>Cart</span>
        </h1>

        {items.length === 0 ? (
          <div className="cart-empty">
            <ShoppingCart size={64} className="cart-empty-icon" />
            <p className="cart-empty-title">Your cart is empty.</p>
            <p className="cart-empty-sub">
              Browse our farm-fresh products and add something you love.
            </p>
            <Link href="/products" className="cart-empty-cta">
              Shop Products <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="cart-inner">
            {/* Items */}
            <div>
              <div className="cart-items">
                {items.map((item) => (
                  <div className="cart-item" key={item.slug}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-img"
                    />
                    <div className="cart-item-info">
                      <span className="cart-item-cat">{item.weight}</span>
                      <p className="cart-item-name">{item.name}</p>
                      <p className="cart-item-weight">Per pack</p>
                      <p className="cart-item-price">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        {item.quantity > 1 && (
                          <span style={{ fontWeight: 400, color: "#5a5550", fontSize: ".72rem" }}>
                            {" "}(₹{item.price} × {item.quantity})
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="cart-item-controls">
                      <div className="cart-qty-row">
                        <button
                          className="cart-qty-btn"
                          onClick={() => updateQty(item.slug, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="cart-qty-num">{item.quantity}</span>
                        <button
                          className="cart-qty-btn"
                          onClick={() => updateQty(item.slug, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <button
                        className="cart-remove-btn"
                        onClick={() => removeItem(item.slug)}
                      >
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="cart-summary">
              <p className="cart-summary-title">Order Summary</p>
              {items.map((item) => (
                <div className="cart-summary-row" key={item.slug}>
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                </div>
              ))}
              <div className="cart-summary-row">
                <span>Shipping</span>
                <span style={{ color: "#2d6a46", fontWeight: 600 }}>Free</span>
              </div>
              <div className="cart-summary-row total-row">
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
              <p className="cart-summary-note">
                Inclusive of all taxes. Cash on Delivery available at checkout.
              </p>
              <Link href="/checkout" className="cart-checkout-btn">
                Proceed to Checkout <ArrowRight size={14} />
              </Link>
              <Link href="/products" className="cart-continue-link">
                ← Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
