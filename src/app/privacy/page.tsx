import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Amoohaa Farms",
  description: "How Amoohaa Farms collects, uses, and protects your personal information.",
};

const LAST_UPDATED = "24 May 2026";
const COMPANY = "Amoohaa Farms Agro Business";
const EMAIL = "partnerships@amoohaa.com";
const ADDRESS = "Agra-Mathura Highway, Agra, Uttar Pradesh, India";

export default function PrivacyPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .policy-hero { background: #1a4a2e; padding: 5rem 1.5rem 4rem; box-sizing: border-box; text-align: center; }
        .policy-eyebrow { font-family: 'DM Sans', sans-serif; font-size: .6rem; font-weight: 700; letter-spacing: .28em; text-transform: uppercase; color: rgba(212,168,83,.8); display: block; margin-bottom: 1rem; }
        .policy-hero-title { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 400; font-style: italic; color: #fff; line-height: 1.12; margin: 0; }
        .policy-updated { font-family: 'DM Sans', sans-serif; font-size: .7rem; color: rgba(255,255,255,.45); margin-top: 1rem; letter-spacing: .1em; }
        .policy-body { max-width: 820px; margin: 0 auto; padding: 4rem 1.5rem 7rem; font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
        .policy-intro { font-size: 1rem; color: #3d3d36; line-height: 1.85; margin-bottom: 3rem; padding-bottom: 2rem; border-bottom: 1px solid rgba(26,74,46,.1); }
        .policy-section { margin-bottom: 2.75rem; }
        .policy-section-num { font-size: .58rem; font-weight: 700; letter-spacing: .24em; text-transform: uppercase; color: #b8893a; display: block; margin-bottom: .5rem; }
        .policy-section-title { font-family: 'Playfair Display', serif; font-size: 1.35rem; font-weight: 500; color: #1a4a2e; margin: 0 0 1rem; }
        .policy-text { font-size: .92rem; color: #3d3d36; line-height: 1.85; margin: 0 0 .85rem; }
        .policy-text:last-child { margin-bottom: 0; }
        .policy-list { margin: .5rem 0 .85rem 1.25rem; padding: 0; font-size: .92rem; color: #3d3d36; line-height: 1.85; }
        .policy-list li { margin-bottom: .4rem; }
        .policy-link { color: #1a4a2e; font-weight: 600; text-decoration: underline; text-underline-offset: 3px; }
        .policy-rule { border: none; border-top: 1px solid rgba(26,74,46,.1); margin: 3rem 0; }
        .policy-contact-box { background: #f2ede4; padding: 2rem; border: 1px solid rgba(26,74,46,.1); font-size: .88rem; color: #3d3d36; line-height: 1.8; }
        .policy-contact-box strong { color: #1a4a2e; }
        .policy-breadcrumb { display: flex; align-items: center; gap: .4rem; font-family: 'DM Sans', sans-serif; font-size: .62rem; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: #5a5550; max-width: 820px; margin: 1.5rem auto 0; padding: 0 1.5rem; }
        .policy-breadcrumb a { color: #1a4a2e; text-decoration: none; }
        .policy-breadcrumb a:hover { color: #b8893a; }
        .policy-breadcrumb-sep { opacity: .35; }
        .policy-table { width: 100%; border-collapse: collapse; font-size: .85rem; margin: 1rem 0; }
        .policy-table th { background: #1a4a2e; color: #fff; padding: .75rem 1rem; text-align: left; font-weight: 700; letter-spacing: .1em; font-size: .72rem; text-transform: uppercase; }
        .policy-table td { padding: .75rem 1rem; border-bottom: 1px solid rgba(26,74,46,.08); color: #3d3d36; vertical-align: top; }
        .policy-table tr:last-child td { border-bottom: none; }
        .policy-table tr:nth-child(even) td { background: rgba(26,74,46,.03); }
      `}</style>

      <div style={{ background: "#faf6ef" }}>
        <div className="policy-hero">
          <span className="policy-eyebrow">Legal</span>
          <h1 className="policy-hero-title">Privacy Policy</h1>
          <p className="policy-updated">Last updated: {LAST_UPDATED}</p>
        </div>

        <nav className="policy-breadcrumb">
          <Link href="/">Home</Link>
          <span className="policy-breadcrumb-sep">/</span>
          <span>Privacy Policy</span>
        </nav>

        <div className="policy-body">
          <p className="policy-intro">
            {COMPANY} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed
            to protecting your personal information. This Privacy Policy explains what data we
            collect, how we use it, with whom we share it, and your rights under applicable Indian
            law, including the Information Technology Act 2000 and the Digital Personal Data
            Protection Act 2023 (DPDPA).
          </p>

          <div className="policy-section">
            <span className="policy-section-num">01</span>
            <h2 className="policy-section-title">Information We Collect</h2>
            <p className="policy-text">
              We collect information you provide directly to us when you place an order, fill
              out a contact form, or communicate with us:
            </p>
            <table className="policy-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Examples</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Identity</strong></td>
                  <td>First name, last name</td>
                </tr>
                <tr>
                  <td><strong>Contact</strong></td>
                  <td>Email address, mobile number</td>
                </tr>
                <tr>
                  <td><strong>Delivery</strong></td>
                  <td>Delivery address, PIN code, state</td>
                </tr>
                <tr>
                  <td><strong>Transaction</strong></td>
                  <td>Order details, amounts, COD confirmation</td>
                </tr>
                <tr>
                  <td><strong>Technical</strong></td>
                  <td>IP address, browser type, pages visited (via cookies)</td>
                </tr>
              </tbody>
            </table>
            <p className="policy-text">
              We do <strong>not</strong> collect payment card numbers or UPI credentials as we
              operate on a Cash on Delivery (COD) basis.
            </p>
          </div>

          <div className="policy-section">
            <span className="policy-section-num">02</span>
            <h2 className="policy-section-title">How We Use Your Information</h2>
            <p className="policy-text">We use the information we collect to:</p>
            <ul className="policy-list">
              <li>Process and fulfil your orders, including coordinating delivery</li>
              <li>Send order confirmations and delivery updates via email or SMS</li>
              <li>Respond to your enquiries and provide customer support</li>
              <li>Prevent fraud and ensure the security of our platform</li>
              <li>Comply with legal obligations under Indian law</li>
              <li>Improve our website, products, and services (in anonymised/aggregated form)</li>
              <li>Send you promotional communications — only with your explicit consent, and you can opt out at any time</li>
            </ul>
          </div>

          <div className="policy-section">
            <span className="policy-section-num">03</span>
            <h2 className="policy-section-title">Legal Basis for Processing</h2>
            <p className="policy-text">Under the DPDPA 2023, we process your personal data on the following bases:</p>
            <ul className="policy-list">
              <li><strong>Contractual necessity</strong> — to fulfil your order and deliver products</li>
              <li><strong>Legitimate interests</strong> — fraud prevention, security, website improvement</li>
              <li><strong>Legal obligation</strong> — maintaining records as required by tax and consumer protection laws</li>
              <li><strong>Consent</strong> — for marketing communications (you may withdraw consent at any time)</li>
            </ul>
          </div>

          <div className="policy-section">
            <span className="policy-section-num">04</span>
            <h2 className="policy-section-title">Sharing Your Information</h2>
            <p className="policy-text">
              We do not sell your personal information. We may share it only with:
            </p>
            <ul className="policy-list">
              <li><strong>Logistics partners</strong> — to deliver your order (name, address, phone only)</li>
              <li><strong>Technology service providers</strong> — for website hosting, email delivery, and analytics, under data processing agreements</li>
              <li><strong>Legal authorities</strong> — if required by law, court order, or to protect our rights</li>
            </ul>
            <p className="policy-text">
              All third parties who receive your data are bound by confidentiality and data
              protection obligations consistent with this Policy.
            </p>
          </div>

          <div className="policy-section">
            <span className="policy-section-num">05</span>
            <h2 className="policy-section-title">Cookies</h2>
            <p className="policy-text">
              We use cookies and similar technologies to operate our website, remember your cart,
              and understand usage patterns. Essential cookies are required for the website to
              function. Analytics cookies are used only with your consent.
            </p>
            <p className="policy-text">
              You can control cookies through your browser settings. Disabling essential cookies
              may affect the functionality of the website (e.g., your cart may not persist).
            </p>
          </div>

          <div className="policy-section">
            <span className="policy-section-num">06</span>
            <h2 className="policy-section-title">Data Retention</h2>
            <p className="policy-text">
              We retain your personal data for as long as necessary to fulfil the purposes
              described in this Policy:
            </p>
            <ul className="policy-list">
              <li><strong>Order data</strong> — 7 years (as required by Indian tax law)</li>
              <li><strong>Contact enquiries</strong> — 2 years from last contact</li>
              <li><strong>Marketing preferences</strong> — until you withdraw consent or we cease marketing</li>
              <li><strong>Technical/log data</strong> — 90 days</li>
            </ul>
          </div>

          <div className="policy-section">
            <span className="policy-section-num">07</span>
            <h2 className="policy-section-title">Your Rights</h2>
            <p className="policy-text">Under the DPDPA 2023, you have the right to:</p>
            <ul className="policy-list">
              <li><strong>Access</strong> — request a copy of personal data we hold about you</li>
              <li><strong>Correction</strong> — request correction of inaccurate or incomplete data</li>
              <li><strong>Erasure</strong> — request deletion of your data (subject to legal retention obligations)</li>
              <li><strong>Withdraw consent</strong> — for marketing at any time without affecting prior processing</li>
              <li><strong>Grievance redressal</strong> — raise a complaint with our Grievance Officer</li>
            </ul>
            <p className="policy-text">
              To exercise any of these rights, contact us at{" "}
              <a href={`mailto:${EMAIL}`} className="policy-link">{EMAIL}</a>. We will respond
              within 30 days.
            </p>
          </div>

          <div className="policy-section">
            <span className="policy-section-num">08</span>
            <h2 className="policy-section-title">Data Security</h2>
            <p className="policy-text">
              We implement appropriate technical and organisational measures to protect your
              personal data against unauthorised access, alteration, disclosure, or destruction.
              These include HTTPS encryption, access controls, and regular security reviews.
            </p>
            <p className="policy-text">
              No method of transmission over the internet is completely secure. While we strive to
              protect your data, we cannot guarantee absolute security.
            </p>
          </div>

          <div className="policy-section">
            <span className="policy-section-num">09</span>
            <h2 className="policy-section-title">Children&apos;s Privacy</h2>
            <p className="policy-text">
              Our website is not directed at children under 18. We do not knowingly collect
              personal data from minors. If you believe a child has provided us with personal
              data, please contact us and we will delete it promptly.
            </p>
          </div>

          <div className="policy-section">
            <span className="policy-section-num">10</span>
            <h2 className="policy-section-title">Changes to This Policy</h2>
            <p className="policy-text">
              We may update this Privacy Policy from time to time. When we do, we will revise
              the &ldquo;Last updated&rdquo; date at the top of this page. We encourage you to
              review this Policy periodically. Continued use of our website after changes
              constitutes acceptance of the revised Policy.
            </p>
          </div>

          <hr className="policy-rule" />

          <div className="policy-contact-box">
            <strong>Grievance Officer / Data Protection Enquiries</strong><br />
            {COMPANY}<br />
            <a href={`mailto:${EMAIL}`} className="policy-link">{EMAIL}</a><br />
            {ADDRESS}
          </div>

          <div style={{ marginTop: "2rem", fontFamily: "'DM Sans', sans-serif", fontSize: ".8rem", color: "#5a5550", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <Link href="/terms" className="policy-link">Terms &amp; Conditions</Link>
            <Link href="/returns" className="policy-link">Return &amp; Refund Policy</Link>
          </div>
        </div>
      </div>
    </>
  );
}
