import Link from "next/link";

export const metadata = {
  title: "Return, Refund & Cancellation Policy | Amoohaa Farms",
  description:
    "Amoohaa Farms return, refund and cancellation policy — eligibility, timelines, and how to raise a claim.",
};

const LAST_UPDATED = "24 May 2026";
const COMPANY = "Amoohaa Farms Agro Business";
const EMAIL = "partnerships@amoohaa.com";
const ADDRESS = "Agra-Mathura Highway, Agra, Uttar Pradesh, India";

export default function ReturnsPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .policy-hero {
          background: #1a4a2e;
          padding: 5rem 1.5rem 4rem;
          box-sizing: border-box;
          text-align: center;
        }
        .policy-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: .6rem; font-weight: 700;
          letter-spacing: .28em; text-transform: uppercase;
          color: rgba(212,168,83,.8); display: block; margin-bottom: 1rem;
        }
        .policy-hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 5vw, 3.2rem);
          font-weight: 400; font-style: italic; color: #fff; line-height: 1.12; margin: 0;
        }
        .policy-updated {
          font-family: 'DM Sans', sans-serif;
          font-size: .7rem; color: rgba(255,255,255,.45); margin-top: 1rem; letter-spacing: .1em;
        }

        .policy-body {
          max-width: 820px; margin: 0 auto;
          padding: 4rem 1.5rem 7rem;
          font-family: 'DM Sans', sans-serif; box-sizing: border-box;
        }
        .policy-intro {
          font-size: 1rem; color: #3d3d36; line-height: 1.85;
          margin-bottom: 3rem; padding-bottom: 2rem;
          border-bottom: 1px solid rgba(26,74,46,.1);
        }
        .policy-section { margin-bottom: 2.75rem; }
        .policy-section-num {
          font-size: .58rem; font-weight: 700; letter-spacing: .24em;
          text-transform: uppercase; color: #b8893a; display: block; margin-bottom: .5rem;
        }
        .policy-section-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.35rem; font-weight: 500; color: #1a4a2e; margin: 0 0 1rem;
        }
        .policy-text {
          font-size: .92rem; color: #3d3d36; line-height: 1.85; margin: 0 0 .85rem;
        }
        .policy-text:last-child { margin-bottom: 0; }
        .policy-list {
          margin: .5rem 0 .85rem 1.25rem; padding: 0;
          font-size: .92rem; color: #3d3d36; line-height: 1.85;
        }
        .policy-list li { margin-bottom: .5rem; }
        .policy-link {
          color: #1a4a2e; font-weight: 600;
          text-decoration: underline; text-underline-offset: 3px;
        }
        .policy-rule { border: none; border-top: 1px solid rgba(26,74,46,.1); margin: 3rem 0; }
        .policy-contact-box {
          background: #f2ede4; padding: 2rem;
          border: 1px solid rgba(26,74,46,.1);
          font-size: .88rem; color: #3d3d36; line-height: 1.8;
        }
        .policy-contact-box strong { color: #1a4a2e; }

        /* highlight box */
        .policy-highlight {
          background: #f0ede6; border-left: 3px solid #d4a853;
          padding: 1.1rem 1.4rem; margin: 1.25rem 0;
          font-size: .88rem; color: #3d3d36; line-height: 1.75;
        }
        .policy-highlight strong { color: #1a4a2e; }

        /* steps */
        .policy-steps { margin: 1rem 0; display: flex; flex-direction: column; gap: 1px; }
        .policy-step {
          display: flex; gap: 1.25rem; align-items: flex-start;
          background: #f7f3ec; padding: 1.1rem 1.25rem;
          border: 1px solid rgba(26,74,46,.09);
        }
        .policy-step-num {
          width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
          background: #1a4a2e; color: #fff;
          font-size: .7rem; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
        }
        .policy-step-body { flex: 1; }
        .policy-step-title {
          font-size: .82rem; font-weight: 700; color: #1a4a2e; margin-bottom: .3rem;
        }
        .policy-step-text { font-size: .85rem; color: #5a5550; line-height: 1.65; }

        /* timeline table */
        .policy-table {
          width: 100%; border-collapse: collapse;
          font-size: .85rem; margin: 1rem 0;
        }
        .policy-table th {
          background: #1a4a2e; color: #fff;
          padding: .75rem 1rem; text-align: left;
          font-weight: 700; letter-spacing: .1em;
          font-size: .72rem; text-transform: uppercase;
        }
        .policy-table td {
          padding: .75rem 1rem;
          border-bottom: 1px solid rgba(26,74,46,.08);
          color: #3d3d36; vertical-align: top;
        }
        .policy-table tr:last-child td { border-bottom: none; }
        .policy-table tr:nth-child(even) td { background: rgba(26,74,46,.03); }

        .policy-breadcrumb {
          display: flex; align-items: center; gap: .4rem;
          font-family: 'DM Sans', sans-serif; font-size: .62rem;
          font-weight: 700; letter-spacing: .16em; text-transform: uppercase;
          color: #5a5550; max-width: 820px; margin: 1.5rem auto 0; padding: 0 1.5rem;
        }
        .policy-breadcrumb a { color: #1a4a2e; text-decoration: none; }
        .policy-breadcrumb a:hover { color: #b8893a; }
        .policy-breadcrumb-sep { opacity: .35; }

        .policy-footer-links {
          margin-top: 2rem;
          font-family: 'DM Sans', sans-serif; font-size: .8rem; color: #5a5550;
          display: flex; gap: 1.5rem; flex-wrap: wrap;
        }
      `}</style>

      <div style={{ background: "#faf6ef" }}>
        {/* Hero */}
        <div className="policy-hero">
          <span className="policy-eyebrow">Legal · Compliance</span>
          <h1 className="policy-hero-title">Return, Refund &amp; Cancellation Policy</h1>
          <p className="policy-updated">Last updated: {LAST_UPDATED}</p>
        </div>

        {/* Breadcrumb */}
        <nav className="policy-breadcrumb">
          <Link href="/">Home</Link>
          <span className="policy-breadcrumb-sep">/</span>
          <span>Returns &amp; Refunds</span>
        </nav>

        {/* Body */}
        <div className="policy-body">
          <p className="policy-intro">
            At <strong>{COMPANY}</strong>, we take pride in the quality of every product we
            dispatch. If something goes wrong, we want to make it right. This policy explains
            your rights and options when it comes to returns, refunds, and cancellations for
            orders placed on our website.
          </p>

          {/* ── SECTION 1: CANCELLATION ── */}
          <div className="policy-section">
            <span className="policy-section-num">01</span>
            <h2 className="policy-section-title">Order Cancellation</h2>

            <div className="policy-highlight">
              <strong>Before dispatch:</strong> You may cancel your order at no charge by
              contacting us within <strong>12 hours</strong> of placing it.
            </div>

            <p className="policy-text">
              Since we operate on <strong>Cash on Delivery (COD)</strong>, no payment is
              collected until delivery. If you cancel before dispatch, there is nothing to refund
              — your order is simply not processed.
            </p>
            <p className="policy-text">
              <strong>After dispatch:</strong> Once an order has been handed to our logistics
              partner, it cannot be cancelled. You may refuse delivery at the door — in that
              case, the shipment will be returned to us and no COD payment is owed. Please note
              that repeated refusals may result in us being unable to process future orders.
            </p>

            <p className="policy-text">
              To cancel, contact us at{" "}
              <a href={`mailto:${EMAIL}`} className="policy-link">{EMAIL}</a> with your Order ID
              and reason.
            </p>
          </div>

          {/* ── SECTION 2: RETURN ELIGIBILITY ── */}
          <div className="policy-section">
            <span className="policy-section-num">02</span>
            <h2 className="policy-section-title">Return Eligibility</h2>

            <p className="policy-text">
              We accept returns in the following situations:
            </p>
            <ul className="policy-list">
              <li><strong>Wrong product delivered</strong> — you received an item different from what you ordered</li>
              <li><strong>Damaged in transit</strong> — the packaging or product was visibly damaged at the time of delivery</li>
              <li><strong>Defective or spoiled product</strong> — the product is unfit for consumption on arrival (e.g., unusual smell, visible contamination)</li>
              <li><strong>Missing item</strong> — your order was incomplete (an item was missing from the package)</li>
            </ul>

            <p className="policy-text">
              We do <strong>not</strong> accept returns for:
            </p>
            <ul className="policy-list">
              <li>Products that have been opened, partially consumed, or tampered with after delivery</li>
              <li>Products returned beyond 7 days of the delivery date</li>
              <li>Change of mind or personal preference (flavour, taste, etc.)</li>
              <li>Products purchased during clearance or special discounted sales (unless damaged/defective)</li>
              <li>Damage caused by improper storage after delivery</li>
            </ul>
          </div>

          {/* ── SECTION 3: RETURN WINDOW ── */}
          <div className="policy-section">
            <span className="policy-section-num">03</span>
            <h2 className="policy-section-title">Return Window</h2>
            <table className="policy-table">
              <thead>
                <tr>
                  <th>Issue Type</th>
                  <th>Return / Claim Window</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Damaged or defective product</td>
                  <td><strong>Within 48 hours</strong> of delivery</td>
                </tr>
                <tr>
                  <td>Wrong product delivered</td>
                  <td><strong>Within 48 hours</strong> of delivery</td>
                </tr>
                <tr>
                  <td>Missing item in order</td>
                  <td><strong>Within 48 hours</strong> of delivery</td>
                </tr>
                <tr>
                  <td>Quality concerns (unopened)</td>
                  <td><strong>Within 7 days</strong> of delivery</td>
                </tr>
              </tbody>
            </table>
            <p className="policy-text">
              Claims raised after these windows cannot be processed. We strongly recommend
              inspecting your package at the time of delivery and photographing any damage before
              accepting.
            </p>
          </div>

          {/* ── SECTION 4: HOW TO RAISE A RETURN ── */}
          <div className="policy-section">
            <span className="policy-section-num">04</span>
            <h2 className="policy-section-title">How to Raise a Return or Claim</h2>

            <div className="policy-steps">
              <div className="policy-step">
                <div className="policy-step-num">1</div>
                <div className="policy-step-body">
                  <p className="policy-step-title">Contact Us</p>
                  <p className="policy-step-text">
                    Email <a href={`mailto:${EMAIL}`} className="policy-link">{EMAIL}</a> with the
                    subject line <em>&ldquo;Return Request — [Your Order ID]&rdquo;</em>.
                  </p>
                </div>
              </div>
              <div className="policy-step">
                <div className="policy-step-num">2</div>
                <div className="policy-step-body">
                  <p className="policy-step-title">Provide Details</p>
                  <p className="policy-step-text">
                    Include your Order ID, the item(s) affected, a clear description of the issue,
                    and photographs of the product and packaging (required for damage/defect claims).
                  </p>
                </div>
              </div>
              <div className="policy-step">
                <div className="policy-step-num">3</div>
                <div className="policy-step-body">
                  <p className="policy-step-title">We Review Your Claim</p>
                  <p className="policy-step-text">
                    Our team will review your request within <strong>2 business days</strong> and
                    confirm whether your return is approved. We may ask follow-up questions.
                  </p>
                </div>
              </div>
              <div className="policy-step">
                <div className="policy-step-num">4</div>
                <div className="policy-step-body">
                  <p className="policy-step-title">Return Pickup or Replacement</p>
                  <p className="policy-step-text">
                    If approved, we will arrange a reverse pickup (free of charge) or send a
                    replacement, at our discretion and subject to stock availability. Please keep
                    the original packaging intact.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── SECTION 5: REFUNDS ── */}
          <div className="policy-section">
            <span className="policy-section-num">05</span>
            <h2 className="policy-section-title">Refunds</h2>

            <p className="policy-text">
              Since we currently operate on <strong>Cash on Delivery (COD)</strong> only, no
              online payment is taken from you. Therefore, refunds are applicable only in limited
              scenarios:
            </p>
            <ul className="policy-list">
              <li>
                <strong>Replacement unavailable:</strong> If we cannot provide a replacement for an
                approved return claim (due to stock shortage or discontinuation), we will issue a
                refund via bank transfer (NEFT/IMPS) or UPI to the account details you provide.
              </li>
              <li>
                <strong>Prepaid orders (future):</strong> Should we introduce online payment options
                in the future, refunds will be credited to the original payment method within 5–7
                business days of return approval.
              </li>
            </ul>

            <div className="policy-highlight">
              Refunds (where applicable) are processed within <strong>7–10 business days</strong>{" "}
              of the return being received and verified at our facility.
            </div>

            <p className="policy-text">
              We do not offer cash refunds at the doorstep. All refund transactions are processed
              through digital bank transfer only.
            </p>
          </div>

          {/* ── SECTION 6: NON-RETURNABLE ── */}
          <div className="policy-section">
            <span className="policy-section-num">06</span>
            <h2 className="policy-section-title">Non-Returnable Conditions</h2>
            <p className="policy-text">
              For food safety and hygiene reasons, we are unable to accept returns of products that:
            </p>
            <ul className="policy-list">
              <li>Have been opened or the seal has been broken (unless reporting a defect)</li>
              <li>Show signs of use, consumption, or tampering after delivery</li>
              <li>Are past their best-before date due to delayed reporting by the customer</li>
              <li>Were stored incorrectly after delivery (e.g., exposed to moisture or heat)</li>
            </ul>
            <p className="policy-text">
              These restrictions are necessary to maintain food safety standards and protect all
              our customers. We appreciate your understanding.
            </p>
          </div>

          {/* ── SECTION 7: DAMAGED IN TRANSIT ── */}
          <div className="policy-section">
            <span className="policy-section-num">07</span>
            <h2 className="policy-section-title">Damaged in Transit</h2>
            <p className="policy-text">
              If your order arrives with visible damage to the outer packaging, we strongly
              recommend:
            </p>
            <ul className="policy-list">
              <li>Do <strong>not</strong> accept the delivery if the product inside appears damaged</li>
              <li>If you do accept, <strong>photograph the package and product immediately</strong></li>
              <li>Report the damage to us within <strong>48 hours</strong> with photos</li>
            </ul>
            <p className="policy-text">
              We will arrange a replacement at no additional cost for confirmed transit damage
              claims. Accepting a damaged package without reporting it within 48 hours may
              affect your ability to claim a replacement.
            </p>
          </div>

          {/* ── SECTION 8: CONSUMER RIGHTS ── */}
          <div className="policy-section">
            <span className="policy-section-num">08</span>
            <h2 className="policy-section-title">Consumer Rights (India)</h2>
            <p className="policy-text">
              This policy is in addition to — and does not limit — your statutory rights under
              the <strong>Consumer Protection Act, 2019</strong> and applicable Indian consumer
              protection regulations. If you believe your consumer rights have not been honoured,
              you may contact the National Consumer Helpline (1800-11-4000) or approach the
              appropriate Consumer Forum.
            </p>
          </div>

          <hr className="policy-rule" />

          <div className="policy-contact-box">
            <strong>Return &amp; Refund Queries</strong><br />
            Email: <a href={`mailto:${EMAIL}`} className="policy-link">{EMAIL}</a><br />
            {COMPANY} · {ADDRESS}
          </div>

          <div className="policy-footer-links">
            <Link href="/terms" className="policy-link">Terms &amp; Conditions</Link>
            <Link href="/privacy" className="policy-link">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </>
  );
}
