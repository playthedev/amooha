"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, ChevronDown, ShoppingBag, Truck } from "lucide-react";
import { useCart } from "@/lib/cart-context";

type Step = "details" | "review" | "success";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string;
  notes: string;
}

const INITIAL_FORM: FormData = {
  firstName: "", lastName: "", email: "", phone: "",
  address: "", city: "", state: "", pincode: "", landmark: "", notes: "",
};

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
  "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh",
  "Uttarakhand","West Bengal","Delhi","Jammu & Kashmir","Ladakh",
];

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState<Step>("details");
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [orderId] = useState(
    () => "AMF" + Date.now().toString().slice(-7)
  );

  function change(field: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  }

  function validate(): boolean {
    const e: Partial<FormData> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!form.phone.match(/^[6-9]\d{9}$/)) e.phone = "Valid 10-digit mobile required";
    if (!form.address.trim()) e.address = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.state) e.state = "Required";
    if (!form.pincode.match(/^\d{6}$/)) e.pincode = "Valid 6-digit PIN required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handlePlaceOrder() {
    clearCart();
    setStep("success");
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .co-page { background: #faf6ef; min-height: 70vh; padding: 3rem 1.5rem 7rem; box-sizing: border-box; }
        .co-inner { max-width: 1100px; margin: 0 auto; display: grid; gap: 2.5rem; align-items: start; }
        @media (min-width: 900px) { .co-inner { grid-template-columns: 1fr 360px; } }

        .co-heading {
          font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 3.5vw, 2.5rem);
          font-weight: 400; font-style: italic; color: #1a4a2e; margin-bottom: 2rem;
        }

        /* step indicator */
        .co-steps {
          display: flex; align-items: center; gap: 0;
          margin-bottom: 2.5rem; font-family: 'DM Sans', sans-serif;
        }
        .co-step-item { display: flex; align-items: center; gap: .5rem; }
        .co-step-num {
          width: 28px; height: 28px; border-radius: 50%; display: flex;
          align-items: center; justify-content: center;
          font-size: .65rem; font-weight: 700;
        }
        .co-step-num.active { background: #1a4a2e; color: #fff; }
        .co-step-num.done { background: #2d6a46; color: #fff; }
        .co-step-num.inactive { background: rgba(26,74,46,.12); color: #5a5550; }
        .co-step-label { font-size: .62rem; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; }
        .co-step-label.active { color: #1a4a2e; }
        .co-step-label.inactive { color: #5a5550; opacity: .55; }
        .co-step-sep { width: 40px; height: 1px; background: rgba(26,74,46,.18); margin: 0 .5rem; flex-shrink: 0; }

        /* form card */
        .co-card { background: #fff; border: 1px solid rgba(26,74,46,.1); padding: 2rem; box-sizing: border-box; }
        .co-card-title {
          font-family: 'DM Sans', sans-serif; font-size: .65rem; font-weight: 700;
          letter-spacing: .24em; text-transform: uppercase; color: #1a4a2e; margin-bottom: 1.75rem;
        }

        /* form fields */
        .co-field-grid { display: grid; gap: 1.25rem; }
        .co-field-grid.two { grid-template-columns: 1fr 1fr; }
        @media (max-width: 540px) { .co-field-grid.two { grid-template-columns: 1fr; } }

        .co-field { display: flex; flex-direction: column; gap: .4rem; }
        .co-label {
          font-family: 'DM Sans', sans-serif; font-size: .6rem; font-weight: 700;
          letter-spacing: .18em; text-transform: uppercase; color: #1a4a2e;
        }
        .co-label span { color: #c0392b; margin-left: 2px; }
        .co-input, .co-select, .co-textarea {
          font-family: 'DM Sans', sans-serif; font-size: .9rem; color: #1a4a2e;
          border: 1px solid rgba(26,74,46,.2); background: #faf6ef;
          padding: .75rem 1rem; outline: none;
          transition: border-color .2s; width: 100%; box-sizing: border-box;
        }
        .co-input:focus, .co-select:focus, .co-textarea:focus {
          border-color: #1a4a2e;
        }
        .co-input.error, .co-select.error { border-color: #c0392b; }
        .co-error-msg {
          font-family: 'DM Sans', sans-serif; font-size: .62rem; color: #c0392b; margin-top: .15rem;
        }
        .co-select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%231a4a2e' stroke-width='1.5' fill='none'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 1rem center; padding-right: 2.5rem; cursor: pointer; }
        .co-textarea { resize: vertical; min-height: 80px; }

        /* payment section */
        .co-pay-section { margin-top: 2rem; }
        .co-pay-option {
          display: flex; align-items: center; gap: 1rem;
          padding: 1.25rem 1.5rem; border: 2px solid #1a4a2e;
          background: rgba(26,74,46,.04); cursor: pointer;
        }
        .co-pay-radio {
          width: 18px; height: 18px; border-radius: 50%; border: 2px solid #1a4a2e;
          background: #1a4a2e; flex-shrink: 0; display: flex; align-items: center; justify-content: center;
        }
        .co-pay-radio-dot { width: 7px; height: 7px; border-radius: 50%; background: #fff; }
        .co-pay-label-wrap { flex: 1; }
        .co-pay-label { font-family: 'DM Sans', sans-serif; font-size: .8rem; font-weight: 700; color: #1a4a2e; }
        .co-pay-sublabel { font-family: 'DM Sans', sans-serif; font-size: .72rem; color: #5a5550; margin-top: .2rem; }
        .co-pay-icon { color: #b8893a; flex-shrink: 0; }

        /* COD note */
        .co-cod-note {
          margin-top: 1rem; padding: 1rem 1.25rem;
          background: #f0ede6; border-left: 3px solid #d4a853;
          font-family: 'DM Sans', sans-serif; font-size: .8rem; color: #3d3d36; line-height: 1.65;
        }

        /* action button */
        .co-submit-btn {
          display: flex; align-items: center; justify-content: center; gap: .6rem;
          width: 100%; margin-top: 2rem;
          background: #1a4a2e; color: #fff; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-size: .65rem; font-weight: 700;
          letter-spacing: .2em; text-transform: uppercase; padding: 1.1rem 2rem;
          transition: background .22s;
        }
        .co-submit-btn:hover { background: #0c3320; }
        .co-submit-btn:disabled { opacity: .55; cursor: not-allowed; }

        .co-back-link {
          display: inline-flex; align-items: center; gap: .4rem; margin-top: .85rem;
          font-family: 'DM Sans', sans-serif; font-size: .62rem; font-weight: 700;
          letter-spacing: .16em; text-transform: uppercase; color: #5a5550;
          text-decoration: none; transition: color .2s; cursor: pointer;
          background: none; border: none;
        }
        .co-back-link:hover { color: #1a4a2e; }

        /* order summary sidebar */
        .co-summary { background: #f2ede4; padding: 2rem; border: 1px solid rgba(26,74,46,.1); box-sizing: border-box; }
        .co-summary-title { font-family: 'DM Sans', sans-serif; font-size: .65rem; font-weight: 700; letter-spacing: .24em; text-transform: uppercase; color: #1a4a2e; margin-bottom: 1.5rem; }
        .co-summary-item { display: flex; gap: 1rem; align-items: flex-start; padding: .85rem 0; border-bottom: 1px solid rgba(26,74,46,.08); }
        .co-summary-img { width: 52px; height: 52px; object-fit: cover; flex-shrink: 0; border: 1px solid rgba(26,74,46,.1); }
        .co-summary-item-name { font-family: 'DM Sans', sans-serif; font-size: .8rem; font-weight: 600; color: #1a4a2e; line-height: 1.3; }
        .co-summary-item-meta { font-family: 'DM Sans', sans-serif; font-size: .68rem; color: #5a5550; margin-top: .2rem; }
        .co-summary-item-price { font-family: 'DM Sans', sans-serif; font-size: .82rem; font-weight: 700; color: #1a4a2e; margin-left: auto; white-space: nowrap; }
        .co-summary-row { display: flex; justify-content: space-between; padding: .6rem 0; font-family: 'DM Sans', sans-serif; font-size: .82rem; color: #3d3d36; }
        .co-summary-total-row { display: flex; justify-content: space-between; padding: .9rem 0 0; margin-top: .5rem; border-top: 1.5px solid rgba(26,74,46,.15); font-family: 'DM Sans', sans-serif; font-size: 1rem; font-weight: 700; color: #1a4a2e; }

        /* review step */
        .co-review-section { margin-bottom: 1.5rem; }
        .co-review-label { font-family: 'DM Sans', sans-serif; font-size: .6rem; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: #b8893a; margin-bottom: .5rem; }
        .co-review-value { font-family: 'DM Sans', sans-serif; font-size: .88rem; color: #1a4a2e; line-height: 1.7; }

        /* success */
        .co-success {
          display: flex; flex-direction: column; align-items: center; text-align: center;
          padding: 5rem 2rem; max-width: 560px; margin: 0 auto;
        }
        .co-success-icon { color: #2d6a46; margin-bottom: 1.5rem; }
        .co-success-title { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 4vw, 2.5rem); font-style: italic; color: #1a4a2e; }
        .co-success-id { font-family: 'DM Sans', sans-serif; font-size: .75rem; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: #b8893a; margin-top: .75rem; }
        .co-success-sub { font-family: 'DM Sans', sans-serif; font-size: .92rem; color: #5a5550; line-height: 1.8; margin-top: 1.25rem; max-width: 420px; }
        .co-success-note {
          margin-top: 2rem; padding: 1.25rem 1.5rem;
          background: #f0ede6; border: 1px solid rgba(26,74,46,.12);
          font-family: 'DM Sans', sans-serif; font-size: .8rem; color: #3d3d36; line-height: 1.7;
          text-align: left; width: 100%;
        }
        .co-success-note strong { color: #1a4a2e; }
        .co-success-cta {
          display: inline-flex; align-items: center; gap: .6rem; margin-top: 2rem;
          background: #1a4a2e; color: #fff; text-decoration: none;
          font-family: 'DM Sans', sans-serif; font-size: .65rem; font-weight: 700;
          letter-spacing: .2em; text-transform: uppercase; padding: 1rem 2rem;
          transition: background .22s;
        }
        .co-success-cta:hover { background: #0c3320; }
      `}</style>

      <main className="co-page">
        {step === "success" ? (
          <div className="co-success">
            <CheckCircle size={72} className="co-success-icon" />
            <h1 className="co-success-title">Order Placed!</h1>
            <p className="co-success-id">Order ID: {orderId}</p>
            <p className="co-success-sub">
              Thank you, {form.firstName}! Your order has been received and will be
              dispatched within 1–2 business days.
            </p>
            <div className="co-success-note">
              <strong>Cash on Delivery</strong> — Please keep the exact amount ready at
              the time of delivery. Our delivery partner will collect payment at your
              doorstep.
              <br /><br />
              A confirmation message will be sent to <strong>{form.email}</strong>.
            </div>
            <Link href="/products" className="co-success-cta">
              Continue Shopping <ShoppingBag size={14} />
            </Link>
          </div>
        ) : (
          <>
            {/* Step indicator */}
            <div className="co-steps">
              <div className="co-step-item">
                <span className={`co-step-num ${step === "details" ? "active" : "done"}`}>
                  {step === "review" ? <CheckCircle size={14} /> : "1"}
                </span>
                <span className={`co-step-label ${step === "details" ? "active" : "inactive"}`}>
                  Details
                </span>
              </div>
              <div className="co-step-sep" />
              <div className="co-step-item">
                <span className={`co-step-num ${step === "review" ? "active" : "inactive"}`}>
                  2
                </span>
                <span className={`co-step-label ${step === "review" ? "active" : "inactive"}`}>
                  Review
                </span>
              </div>
            </div>

            <div className="co-inner">
              {/* Left: Form */}
              <div>
                {step === "details" && (
                  <>
                    <h1 className="co-heading">Delivery Details</h1>

                    {/* Contact info */}
                    <div className="co-card" style={{ marginBottom: "1.25rem" }}>
                      <p className="co-card-title">Contact Information</p>
                      <div className="co-field-grid two">
                        <div className="co-field">
                          <label className="co-label">First Name <span>*</span></label>
                          <input className={`co-input${errors.firstName ? " error" : ""}`} value={form.firstName} onChange={(e) => change("firstName", e.target.value)} />
                          {errors.firstName && <span className="co-error-msg">{errors.firstName}</span>}
                        </div>
                        <div className="co-field">
                          <label className="co-label">Last Name <span>*</span></label>
                          <input className={`co-input${errors.lastName ? " error" : ""}`} value={form.lastName} onChange={(e) => change("lastName", e.target.value)} />
                          {errors.lastName && <span className="co-error-msg">{errors.lastName}</span>}
                        </div>
                      </div>
                      <div className="co-field-grid two" style={{ marginTop: "1.25rem" }}>
                        <div className="co-field">
                          <label className="co-label">Email <span>*</span></label>
                          <input type="email" className={`co-input${errors.email ? " error" : ""}`} value={form.email} onChange={(e) => change("email", e.target.value)} />
                          {errors.email && <span className="co-error-msg">{errors.email}</span>}
                        </div>
                        <div className="co-field">
                          <label className="co-label">Mobile Number <span>*</span></label>
                          <input type="tel" className={`co-input${errors.phone ? " error" : ""}`} placeholder="10-digit number" value={form.phone} onChange={(e) => change("phone", e.target.value)} />
                          {errors.phone && <span className="co-error-msg">{errors.phone}</span>}
                        </div>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="co-card" style={{ marginBottom: "1.25rem" }}>
                      <p className="co-card-title">Delivery Address</p>
                      <div className="co-field-grid">
                        <div className="co-field">
                          <label className="co-label">Full Address <span>*</span></label>
                          <input className={`co-input${errors.address ? " error" : ""}`} placeholder="House no., Street, Area" value={form.address} onChange={(e) => change("address", e.target.value)} />
                          {errors.address && <span className="co-error-msg">{errors.address}</span>}
                        </div>
                        <div className="co-field">
                          <label className="co-label">Landmark (optional)</label>
                          <input className="co-input" placeholder="Near school, temple, etc." value={form.landmark} onChange={(e) => change("landmark", e.target.value)} />
                        </div>
                      </div>
                      <div className="co-field-grid two" style={{ marginTop: "1.25rem" }}>
                        <div className="co-field">
                          <label className="co-label">City <span>*</span></label>
                          <input className={`co-input${errors.city ? " error" : ""}`} value={form.city} onChange={(e) => change("city", e.target.value)} />
                          {errors.city && <span className="co-error-msg">{errors.city}</span>}
                        </div>
                        <div className="co-field">
                          <label className="co-label">PIN Code <span>*</span></label>
                          <input className={`co-input${errors.pincode ? " error" : ""}`} maxLength={6} value={form.pincode} onChange={(e) => change("pincode", e.target.value.replace(/\D/g, ""))} />
                          {errors.pincode && <span className="co-error-msg">{errors.pincode}</span>}
                        </div>
                      </div>
                      <div className="co-field-grid" style={{ marginTop: "1.25rem" }}>
                        <div className="co-field">
                          <label className="co-label">State <span>*</span></label>
                          <select className={`co-select${errors.state ? " error" : ""}`} value={form.state} onChange={(e) => change("state", e.target.value)}>
                            <option value="">Select state</option>
                            {INDIAN_STATES.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                          {errors.state && <span className="co-error-msg">{errors.state}</span>}
                        </div>
                      </div>
                    </div>

                    {/* Payment */}
                    <div className="co-card">
                      <p className="co-card-title">Payment Method</p>
                      <div className="co-pay-section">
                        <div className="co-pay-option">
                          <div className="co-pay-radio">
                            <div className="co-pay-radio-dot" />
                          </div>
                          <div className="co-pay-label-wrap">
                            <p className="co-pay-label">Cash on Delivery (COD)</p>
                            <p className="co-pay-sublabel">Pay with cash when your order arrives</p>
                          </div>
                          <Truck size={22} className="co-pay-icon" />
                        </div>
                        <div className="co-cod-note">
                          No advance payment required. Pay the full amount in cash when your
                          order is delivered to your door. Please keep the exact amount ready.
                        </div>
                      </div>

                      <div className="co-field" style={{ marginTop: "1.25rem" }}>
                        <label className="co-label">Order Notes (optional)</label>
                        <textarea className="co-textarea" placeholder="Any special instructions for delivery…" value={form.notes} onChange={(e) => change("notes", e.target.value)} />
                      </div>

                      <button
                        className="co-submit-btn"
                        disabled={items.length === 0}
                        onClick={() => {
                          if (validate()) setStep("review");
                        }}
                      >
                        Review Order
                        <ChevronDown size={15} style={{ transform: "rotate(-90deg)" }} />
                      </button>
                      {items.length === 0 && (
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: ".78rem", color: "#c0392b", marginTop: ".75rem" }}>
                          Your cart is empty. <Link href="/products" style={{ color: "#1a4a2e" }}>Add products</Link> first.
                        </p>
                      )}
                    </div>
                  </>
                )}

                {step === "review" && (
                  <>
                    <h1 className="co-heading">Review & Confirm</h1>
                    <div className="co-card">
                      <div className="co-review-section">
                        <p className="co-review-label">Contact</p>
                        <p className="co-review-value">
                          {form.firstName} {form.lastName}<br />
                          {form.email} · {form.phone}
                        </p>
                      </div>
                      <div className="co-review-section">
                        <p className="co-review-label">Delivery Address</p>
                        <p className="co-review-value">
                          {form.address}{form.landmark ? `, near ${form.landmark}` : ""}<br />
                          {form.city}, {form.state} — {form.pincode}
                        </p>
                      </div>
                      <div className="co-review-section">
                        <p className="co-review-label">Payment</p>
                        <p className="co-review-value">Cash on Delivery (COD)</p>
                      </div>
                      {form.notes && (
                        <div className="co-review-section">
                          <p className="co-review-label">Order Notes</p>
                          <p className="co-review-value">{form.notes}</p>
                        </div>
                      )}

                      <div className="co-cod-note" style={{ marginTop: "1rem" }}>
                        By placing this order you agree to our{" "}
                        <Link href="/terms" style={{ color: "#1a4a2e", fontWeight: 700 }}>Terms & Conditions</Link>,{" "}
                        <Link href="/privacy" style={{ color: "#1a4a2e", fontWeight: 700 }}>Privacy Policy</Link>, and{" "}
                        <Link href="/returns" style={{ color: "#1a4a2e", fontWeight: 700 }}>Return & Refund Policy</Link>.
                      </div>

                      <button className="co-submit-btn" onClick={handlePlaceOrder}>
                        Place Order — ₹{total.toLocaleString("en-IN")} (COD)
                        <Truck size={15} />
                      </button>
                      <button className="co-back-link" onClick={() => setStep("details")}>
                        ← Edit Details
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Right: Order Summary */}
              <div className="co-summary">
                <p className="co-summary-title">Order Summary</p>
                {items.map((item) => (
                  <div className="co-summary-item" key={item.slug}>
                    <img src={item.image} alt={item.name} className="co-summary-img" />
                    <div>
                      <p className="co-summary-item-name">{item.name}</p>
                      <p className="co-summary-item-meta">{item.weight} × {item.quantity}</p>
                    </div>
                    <span className="co-summary-item-price">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
                <div className="co-summary-row" style={{ marginTop: ".75rem" }}>
                  <span>Subtotal</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
                <div className="co-summary-row">
                  <span>Shipping</span>
                  <span style={{ color: "#2d6a46", fontWeight: 600 }}>Free</span>
                </div>
                <div className="co-summary-row">
                  <span>Payment</span>
                  <span style={{ fontWeight: 600 }}>COD</span>
                </div>
                <div className="co-summary-total-row">
                  <span>Total</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}
