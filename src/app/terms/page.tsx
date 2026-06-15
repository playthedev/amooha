import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions | Amoohaa Farms",
  description: "Terms and Conditions governing your use of the Amoohaa Farms website and purchase of our products.",
};

const LAST_UPDATED = "24 May 2026";
const COMPANY = "Amoohaa Farms Agro Business";
const EMAIL = "partnerships@amoohaa.com";
const ADDRESS = "Agra-Mathura Highway, Agra, Uttar Pradesh, India";

export default function TermsPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .policy-hero {
          background: #1a4a2e; padding: 5rem 1.5rem 4rem; box-sizing: border-box; text-align: center;
        }
        .policy-eyebrow {
          font-family: 'DM Sans', sans-serif; font-size: .6rem; font-weight: 700;
          letter-spacing: .28em; text-transform: uppercase; color: rgba(212,168,83,.8);
          display: block; margin-bottom: 1rem;
        }
        .policy-hero-title {
          font-family: 'Playfair Display', serif; font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 400; font-style: italic; color: #fff; line-height: 1.12; margin: 0;
        }
        .policy-updated {
          font-family: 'DM Sans', sans-serif; font-size: .7rem; color: rgba(255,255,255,.45);
          margin-top: 1rem; letter-spacing: .1em;
        }

        .policy-body {
          max-width: 820px; margin: 0 auto; padding: 4rem 1.5rem 7rem;
          font-family: 'DM Sans', sans-serif; box-sizing: border-box;
        }
        .policy-intro {
          font-size: 1rem; color: #3d3d36; line-height: 1.85; margin-bottom: 3rem;
          padding-bottom: 2rem; border-bottom: 1px solid rgba(26,74,46,.1);
        }
        .policy-section { margin-bottom: 2.75rem; }
        .policy-section-num {
          font-size: .58rem; font-weight: 700; letter-spacing: .24em;
          text-transform: uppercase; color: #b8893a; display: block; margin-bottom: .5rem;
        }
        .policy-section-title {
          font-family: 'Playfair Display', serif; font-size: 1.35rem; font-weight: 500;
          color: #1a4a2e; margin: 0 0 1rem;
        }
        .policy-text { font-size: .92rem; color: #3d3d36; line-height: 1.85; margin: 0 0 .85rem; }
        .policy-text:last-child { margin-bottom: 0; }
        .policy-list {
          margin: .5rem 0 .85rem 1.25rem; padding: 0;
          font-size: .92rem; color: #3d3d36; line-height: 1.85;
        }
        .policy-list li { margin-bottom: .4rem; }
        .policy-link { color: #1a4a2e; font-weight: 600; text-decoration: underline; text-underline-offset: 3px; }
        .policy-rule { border: none; border-top: 1px solid rgba(26,74,46,.1); margin: 3rem 0; }
        .policy-contact-box {
          background: #f2ede4; padding: 2rem; border: 1px solid rgba(26,74,46,.1);
          font-size: .88rem; color: #3d3d36; line-height: 1.8;
        }
        .policy-contact-box strong { color: #1a4a2e; }
        .policy-breadcrumb {
          display: flex; align-items: center; gap: .4rem;
          font-family: 'DM Sans', sans-serif; font-size: .62rem; font-weight: 700;
          letter-spacing: .16em; text-transform: uppercase; color: #5a5550;
          max-width: 820px; margin: 1.5rem auto 0; padding: 0 1.5rem;
        }
        .policy-breadcrumb a { color: #1a4a2e; text-decoration: none; }
        .policy-breadcrumb a:hover { color: #b8893a; }
        .policy-breadcrumb-sep { opacity: .35; }
      `}</style>

      <div style={{ background: "#faf6ef" }}>
        {/* Hero */}
        <div className="policy-hero">
          <span className="policy-eyebrow">Legal</span>
          <h1 className="policy-hero-title">Terms & Conditions</h1>
          <p className="policy-updated">Last updated: {LAST_UPDATED}</p>
        </div>

        {/* Breadcrumb */}
        <nav className="policy-breadcrumb">
          <Link href="/" className="">Home</Link>
          <span className="policy-breadcrumb-sep">/</span>
          <span>Terms &amp; Conditions</span>
        </nav>

        {/* Body */}
        <div className="policy-body">
          <p className="policy-intro">
            Please read these Terms and Conditions (&ldquo;Terms&rdquo;) carefully before using the
            Amoohaa Farms website or purchasing any products from us. By accessing our website
            or placing an order, you agree to be bound by these Terms. If you do not agree,
            please do not use our services.
          </p>

          <div className="policy-section">
            <span className="policy-section-num">01</span>
            <h2 className="policy-section-title">About Us</h2>
            <p className="policy-text">
              <strong>{COMPANY}</strong> is a farm-led food and nutrition business operating
              under applicable Indian laws. Our registered address is {ADDRESS}. We sell
              agricultural food products directly to consumers and trade partners through this
              website and authorised channels.
            </p>
          </div>

          <div className="policy-section">
            <span className="policy-section-num">02</span>
            <h2 className="policy-section-title">Acceptance of Terms</h2>
            <p className="policy-text">
              By visiting this website, creating an account, or completing a purchase, you
              confirm that you are at least 18 years of age (or the age of majority in your
              jurisdiction) and have the legal capacity to enter into a binding agreement.
            </p>
            <p className="policy-text">
              We reserve the right to modify these Terms at any time. Continued use of the
              website after changes are posted constitutes your acceptance of the revised Terms.
            </p>
          </div>

          <div className="policy-section">
            <span className="policy-section-num">03</span>
            <h2 className="policy-section-title">Products & Orders</h2>
            <p className="policy-text">
              All products are subject to availability. We reserve the right to limit quantities,
              discontinue products, or modify pricing without prior notice. Product images are
              for illustrative purposes; actual appearance may vary slightly.
            </p>
            <p className="policy-text">
              An order confirmation does not constitute acceptance of your order. We reserve the
              right to cancel or refuse any order at our discretion, including in cases of pricing
              errors, suspected fraud, or stock unavailability. You will be notified in such cases.
            </p>
          </div>

          <div className="policy-section">
            <span className="policy-section-num">04</span>
            <h2 className="policy-section-title">Pricing & Payment</h2>
            <p className="policy-text">
              All prices are displayed in Indian Rupees (INR) and are inclusive of applicable GST
              unless stated otherwise. Shipping charges (if any) are communicated at checkout.
            </p>
            <p className="policy-text">
              We currently offer <strong>Cash on Delivery (COD)</strong> as our payment method.
              Payment is due at the time of delivery. Please keep the exact amount ready. We are
              not responsible for delays caused by non-availability of correct change at delivery.
            </p>
          </div>

          <div className="policy-section">
            <span className="policy-section-num">05</span>
            <h2 className="policy-section-title">Delivery</h2>
            <p className="policy-text">
              We deliver across serviceable PIN codes in India. Estimated delivery times are
              1–7 business days after dispatch and are indicative, not guaranteed. We are not
              liable for delays caused by third-party logistics partners, natural events, or
              incorrect address information provided by you.
            </p>
            <p className="policy-text">
              Risk of loss and title for products pass to you upon delivery. If you are unavailable
              at the time of delivery, our logistics partner may attempt re-delivery or return the
              shipment to us. Re-delivery charges may apply.
            </p>
          </div>

          <div className="policy-section">
            <span className="policy-section-num">06</span>
            <h2 className="policy-section-title">Returns, Refunds & Cancellations</h2>
            <p className="policy-text">
              Please refer to our dedicated{" "}
              <Link href="/returns" className="policy-link">Return, Refund & Cancellation Policy</Link>{" "}
              for full details on eligibility, timelines, and the process for raising a claim.
            </p>
          </div>

          <div className="policy-section">
            <span className="policy-section-num">07</span>
            <h2 className="policy-section-title">Food Safety & Allergens</h2>
            <p className="policy-text">
              Our products are processed in facilities that may also handle nuts, seeds, and other
              allergens. While we maintain strict hygiene and FSSAI-compliant processes, we cannot
              guarantee a completely allergen-free environment. Please read product labels carefully
              before consumption.
            </p>
            <p className="policy-text">
              Our products are food items intended for general consumption. They are not medicines
              and are not intended to diagnose, treat, cure, or prevent any disease. Consult a
              healthcare professional if you have specific dietary or medical concerns.
            </p>
          </div>

          <div className="policy-section">
            <span className="policy-section-num">08</span>
            <h2 className="policy-section-title">Intellectual Property</h2>
            <p className="policy-text">
              All content on this website — including text, images, logos, brand names (including
              &ldquo;Amoohaa Farms&rdquo; and &ldquo;Power Pulz&rdquo;), and design — is the
              exclusive property of {COMPANY} or its licensors and is protected by applicable
              intellectual property laws.
            </p>
            <p className="policy-text">
              You may not copy, reproduce, distribute, or use any content from this website for
              commercial purposes without our prior written consent.
            </p>
          </div>

          <div className="policy-section">
            <span className="policy-section-num">09</span>
            <h2 className="policy-section-title">Limitation of Liability</h2>
            <p className="policy-text">
              To the maximum extent permitted by law, {COMPANY} shall not be liable for any
              indirect, incidental, special, or consequential damages arising out of your use of
              our products or website, even if we have been advised of the possibility of such
              damages.
            </p>
            <p className="policy-text">
              Our total liability in any matter arising from or related to these Terms shall not
              exceed the amount you paid for the specific order giving rise to the claim.
            </p>
          </div>

          <div className="policy-section">
            <span className="policy-section-num">10</span>
            <h2 className="policy-section-title">Governing Law & Disputes</h2>
            <p className="policy-text">
              These Terms are governed by the laws of India. Any disputes arising out of or in
              connection with these Terms shall be subject to the exclusive jurisdiction of the
              courts in Agra, Uttar Pradesh, India.
            </p>
            <p className="policy-text">
              We encourage you to contact us first to resolve any dispute amicably before pursuing
              formal legal proceedings.
            </p>
          </div>

          <div className="policy-section">
            <span className="policy-section-num">11</span>
            <h2 className="policy-section-title">Severability</h2>
            <p className="policy-text">
              If any provision of these Terms is found to be invalid or unenforceable, the
              remaining provisions shall continue in full force and effect.
            </p>
          </div>

          <hr className="policy-rule" />

          <div className="policy-contact-box">
            <strong>Questions about these Terms?</strong><br />
            Contact us at <a href={`mailto:${EMAIL}`} className="policy-link">{EMAIL}</a><br />
            {ADDRESS}
          </div>

          <div style={{ marginTop: "2rem", fontFamily: "'DM Sans', sans-serif", fontSize: ".8rem", color: "#5a5550", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <Link href="/privacy" className="policy-link">Privacy Policy</Link>
            <Link href="/returns" className="policy-link">Return & Refund Policy</Link>
          </div>
        </div>
      </div>
    </>
  );
}
