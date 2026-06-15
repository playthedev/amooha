import Link from "next/link";

type LangKey = "en" | "fr" | "es";

const LAST_UPDATED = "24 May 2026";
const COMPANY = "Amoohaa Farms Agro Business";
const EMAIL = "partnerships@amoohaa.com";
const ADDRESS = "Agra-Mathura Highway, Agra, Uttar Pradesh, India";

const strings: Record<LangKey, {
  eyebrow: string; title: string; lastUpdated: string; home: string;
  intro: string;
  s01: string; s01title: string; s01text1: string; s01text2: string;
  tCategory: string; tExamples: string;
  s02: string; s02title: string; s02text: string;
  s03: string; s03title: string; s03text: string;
  s04: string; s04title: string; s04text1: string; s04text2: string;
  s05: string; s05title: string; s05text1: string; s05text2: string;
  s06: string; s06title: string; s06text: string;
  s07: string; s07title: string; s07text1: string; s07text2: string;
  s08: string; s08title: string; s08text1: string; s08text2: string;
  s09: string; s09title: string; s09text: string;
  s10: string; s10title: string; s10text: string;
  contactTitle: string; termsLink: string; returnsLink: string;
  respondNote: string;
}> = {
  en: {
    eyebrow: "Legal", title: "Privacy Policy", lastUpdated: "Last updated:", home: "Home",
    intro: `${COMPANY} ("we", "us", or "our") is committed to protecting your personal information. This Privacy Policy explains what data we collect, how we use it, with whom we share it, and your rights under applicable Indian law, including the Information Technology Act 2000 and the Digital Personal Data Protection Act 2023 (DPDPA).`,
    s01: "01", s01title: "Information We Collect",
    s01text1: "We collect information you provide directly to us when you place an order, fill out a contact form, or communicate with us:",
    s01text2: `We do not collect payment card numbers or UPI credentials as we operate on a Cash on Delivery (COD) basis.`,
    tCategory: "Category", tExamples: "Examples",
    s02: "02", s02title: "How We Use Your Information",
    s02text: "We use the information we collect to:",
    s03: "03", s03title: "Legal Basis for Processing",
    s03text: "Under the DPDPA 2023, we process your personal data on the following bases:",
    s04: "04", s04title: "Sharing Your Information",
    s04text1: "We do not sell your personal information. We may share it only with:",
    s04text2: "All third parties who receive your data are bound by confidentiality and data protection obligations consistent with this Policy.",
    s05: "05", s05title: "Cookies",
    s05text1: "We use cookies and similar technologies to operate our website, remember your cart, and understand usage patterns. Essential cookies are required for the website to function. Analytics cookies are used only with your consent.",
    s05text2: "You can control cookies through your browser settings. Disabling essential cookies may affect the functionality of the website (e.g., your cart may not persist).",
    s06: "06", s06title: "Data Retention",
    s06text: "We retain your personal data for as long as necessary to fulfil the purposes described in this Policy:",
    s07: "07", s07title: "Your Rights",
    s07text1: "Under the DPDPA 2023, you have the right to:",
    s07text2: "To exercise any of these rights, contact us at {email}. We will respond within 30 days.",
    s08: "08", s08title: "Data Security",
    s08text1: "We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. These include HTTPS encryption, access controls, and regular security reviews.",
    s08text2: "No method of transmission over the internet is completely secure. While we strive to protect your data, we cannot guarantee absolute security.",
    s09: "09", s09title: "Children's Privacy",
    s09text: "Our website is not directed at children under 18. We do not knowingly collect personal data from minors. If you believe a child has provided us with personal data, please contact us and we will delete it promptly.",
    s10: "10", s10title: "Changes to This Policy",
    s10text: `We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date at the top of this page. We encourage you to review this Policy periodically. Continued use of our website after changes constitutes acceptance of the revised Policy.`,
    contactTitle: "Grievance Officer / Data Protection Enquiries",
    termsLink: "Terms & Conditions", returnsLink: "Return & Refund Policy",
    respondNote: "We will respond within 30 days.",
  },
  fr: {
    eyebrow: "Légal", title: "Politique de confidentialité", lastUpdated: "Dernière mise à jour :", home: "Accueil",
    intro: `${COMPANY} (« nous ») s'engage à protéger vos informations personnelles. Cette politique de confidentialité explique les données que nous collectons, comment nous les utilisons, avec qui nous les partageons, et vos droits en vertu du droit indien applicable, notamment la loi sur les technologies de l'information de 2000 et la loi DPDPA de 2023.`,
    s01: "01", s01title: "Informations collectées",
    s01text1: "Nous collectons les informations que vous nous fournissez directement lors d'une commande, d'un formulaire de contact ou de toute communication :",
    s01text2: "Nous ne collectons pas de numéros de carte bancaire ni d'identifiants UPI, car nous fonctionnons uniquement en paiement à la livraison (COD).",
    tCategory: "Catégorie", tExamples: "Exemples",
    s02: "02", s02title: "Utilisation de vos informations",
    s02text: "Nous utilisons les informations collectées pour :",
    s03: "03", s03title: "Base légale du traitement",
    s03text: "Conformément au DPDPA 2023, nous traitons vos données personnelles sur les bases suivantes :",
    s04: "04", s04title: "Partage de vos informations",
    s04text1: "Nous ne vendons pas vos informations personnelles. Nous pouvons les partager uniquement avec :",
    s04text2: "Tous les tiers qui reçoivent vos données sont soumis à des obligations de confidentialité et de protection des données conformes à cette politique.",
    s05: "05", s05title: "Cookies",
    s05text1: "Nous utilisons des cookies pour faire fonctionner notre site, mémoriser votre panier et comprendre les habitudes d'utilisation. Les cookies essentiels sont nécessaires au bon fonctionnement du site. Les cookies analytiques ne sont utilisés qu'avec votre consentement.",
    s05text2: "Vous pouvez gérer les cookies via les paramètres de votre navigateur. La désactivation des cookies essentiels peut affecter le fonctionnement du site.",
    s06: "06", s06title: "Conservation des données",
    s06text: "Nous conservons vos données personnelles aussi longtemps que nécessaire pour les finalités décrites dans cette politique :",
    s07: "07", s07title: "Vos droits",
    s07text1: "Conformément au DPDPA 2023, vous avez le droit de :",
    s07text2: "Pour exercer ces droits, contactez-nous à {email}. Nous répondrons dans un délai de 30 jours.",
    s08: "08", s08title: "Sécurité des données",
    s08text1: "Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction.",
    s08text2: "Aucune méthode de transmission sur Internet n'est entièrement sécurisée. Bien que nous nous efforcions de protéger vos données, nous ne pouvons garantir une sécurité absolue.",
    s09: "09", s09title: "Confidentialité des enfants",
    s09text: "Notre site n'est pas destiné aux enfants de moins de 18 ans. Si vous pensez qu'un mineur nous a fourni des données personnelles, veuillez nous contacter et nous les supprimerons rapidement.",
    s10: "10", s10title: "Modifications de cette politique",
    s10text: "Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Nous vous encourageons à la consulter régulièrement. L'utilisation continue du site après des modifications vaut acceptation de la politique révisée.",
    contactTitle: "Délégué à la protection des données / Responsable des réclamations",
    termsLink: "Conditions générales", returnsLink: "Politique de retour",
    respondNote: "Nous répondrons dans un délai de 30 jours.",
  },
  es: {
    eyebrow: "Legal", title: "Política de privacidad", lastUpdated: "Última actualización:", home: "Inicio",
    intro: `${COMPANY} ("nosotros") se compromete a proteger tu información personal. Esta Política de privacidad explica qué datos recopilamos, cómo los usamos, con quién los compartimos y tus derechos conforme a la legislación india aplicable, incluida la Ley de Tecnología de la Información de 2000 y la DPDPA de 2023.`,
    s01: "01", s01title: "Información que recopilamos",
    s01text1: "Recopilamos la información que nos proporcionas directamente al realizar un pedido, rellenar un formulario de contacto o comunicarte con nosotros:",
    s01text2: "No recopilamos números de tarjeta de pago ni credenciales UPI, ya que operamos exclusivamente con pago contra entrega (COD).",
    tCategory: "Categoría", tExamples: "Ejemplos",
    s02: "02", s02title: "Cómo usamos tu información",
    s02text: "Usamos la información recopilada para:",
    s03: "03", s03title: "Base legal del tratamiento",
    s03text: "Conforme a la DPDPA 2023, tratamos tus datos personales sobre las siguientes bases:",
    s04: "04", s04title: "Compartir tu información",
    s04text1: "No vendemos tu información personal. Solo podemos compartirla con:",
    s04text2: "Todos los terceros que reciben tus datos están sujetos a obligaciones de confidencialidad y protección de datos coherentes con esta política.",
    s05: "05", s05title: "Cookies",
    s05text1: "Usamos cookies para operar nuestro sitio, recordar tu carrito y comprender los patrones de uso. Las cookies esenciales son necesarias para el funcionamiento del sitio. Las cookies analíticas solo se usan con tu consentimiento.",
    s05text2: "Puedes controlar las cookies a través de la configuración de tu navegador. Desactivar las cookies esenciales puede afectar al funcionamiento del sitio.",
    s06: "06", s06title: "Conservación de datos",
    s06text: "Conservamos tus datos personales durante el tiempo necesario para cumplir con los fines descritos en esta política:",
    s07: "07", s07title: "Tus derechos",
    s07text1: "Conforme a la DPDPA 2023, tienes derecho a:",
    s07text2: "Para ejercer cualquiera de estos derechos, contáctanos en {email}. Responderemos en un plazo de 30 días.",
    s08: "08", s08title: "Seguridad de los datos",
    s08text1: "Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos personales contra el acceso no autorizado, la alteración, la divulgación o la destrucción.",
    s08text2: "Ningún método de transmisión por Internet es completamente seguro. Aunque nos esforzamos por proteger tus datos, no podemos garantizar una seguridad absoluta.",
    s09: "09", s09title: "Privacidad de los menores",
    s09text: "Nuestro sitio no está dirigido a menores de 18 años. Si crees que un menor nos ha proporcionado datos personales, contáctanos y los eliminaremos de inmediato.",
    s10: "10", s10title: "Cambios en esta política",
    s10text: "Podemos actualizar esta Política de privacidad periódicamente. Te recomendamos revisarla con regularidad. El uso continuado del sitio tras los cambios constituye la aceptación de la política revisada.",
    contactTitle: "Responsable de protección de datos / Consultas",
    termsLink: "Términos y condiciones", returnsLink: "Política de devoluciones",
    respondNote: "Responderemos en un plazo de 30 días.",
  },
};

type PageProps = { params: Promise<{ lang: string }> };

export default async function PrivacyPage({ params }: PageProps) {
  const { lang } = await params;
  const t = strings[(lang as LangKey)] ?? strings.en;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .policy-hero { background:#1a4a2e;padding:5rem 1.5rem 4rem;box-sizing:border-box;text-align:center; }
        .policy-eyebrow { font-family:'DM Sans',sans-serif;font-size:.6rem;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:rgba(212,168,83,.8);display:block;margin-bottom:1rem; }
        .policy-hero-title { font-family:'Playfair Display',serif;font-size:clamp(2rem,5vw,3.5rem);font-weight:400;font-style:italic;color:#fff;line-height:1.12;margin:0; }
        .policy-updated { font-family:'DM Sans',sans-serif;font-size:.7rem;color:rgba(255,255,255,.45);margin-top:1rem;letter-spacing:.1em; }
        .policy-body { max-width:820px;margin:0 auto;padding:4rem 1.5rem 7rem;font-family:'DM Sans',sans-serif;box-sizing:border-box; }
        .policy-intro { font-size:1rem;color:#3d3d36;line-height:1.85;margin-bottom:3rem;padding-bottom:2rem;border-bottom:1px solid rgba(26,74,46,.1); }
        .policy-section { margin-bottom:2.75rem; }
        .policy-section-num { font-size:.58rem;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:#b8893a;display:block;margin-bottom:.5rem; }
        .policy-section-title { font-family:'Playfair Display',serif;font-size:1.35rem;font-weight:500;color:#1a4a2e;margin:0 0 1rem; }
        .policy-text { font-size:.92rem;color:#3d3d36;line-height:1.85;margin:0 0 .85rem; }
        .policy-text:last-child { margin-bottom:0; }
        .policy-list { margin:.5rem 0 .85rem 1.25rem;padding:0;font-size:.92rem;color:#3d3d36;line-height:1.85; }
        .policy-list li { margin-bottom:.4rem; }
        .policy-link { color:#1a4a2e;font-weight:600;text-decoration:underline;text-underline-offset:3px; }
        .policy-rule { border:none;border-top:1px solid rgba(26,74,46,.1);margin:3rem 0; }
        .policy-contact-box { background:#f2ede4;padding:2rem;border:1px solid rgba(26,74,46,.1);font-size:.88rem;color:#3d3d36;line-height:1.8; }
        .policy-contact-box strong { color:#1a4a2e; }
        .policy-breadcrumb { display:flex;align-items:center;gap:.4rem;font-family:'DM Sans',sans-serif;font-size:.62rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#5a5550;max-width:820px;margin:1.5rem auto 0;padding:0 1.5rem; }
        .policy-breadcrumb a { color:#1a4a2e;text-decoration:none; }
        .policy-breadcrumb a:hover { color:#b8893a; }
        .policy-breadcrumb-sep { opacity:.35; }
        .policy-table { width:100%;border-collapse:collapse;font-size:.85rem;margin:1rem 0; }
        .policy-table th { background:#1a4a2e;color:#fff;padding:.75rem 1rem;text-align:left;font-weight:700;letter-spacing:.1em;font-size:.72rem;text-transform:uppercase; }
        .policy-table td { padding:.75rem 1rem;border-bottom:1px solid rgba(26,74,46,.08);color:#3d3d36;vertical-align:top; }
        .policy-table tr:last-child td { border-bottom:none; }
        .policy-table tr:nth-child(even) td { background:rgba(26,74,46,.03); }
      `}</style>

      <div style={{ background: "#faf6ef" }}>
        <div className="policy-hero">
          <span className="policy-eyebrow">{t.eyebrow}</span>
          <h1 className="policy-hero-title">{t.title}</h1>
          <p className="policy-updated">{t.lastUpdated} {LAST_UPDATED}</p>
        </div>

        <nav className="policy-breadcrumb">
          <Link href={`/${lang}`}>{t.home}</Link>
          <span className="policy-breadcrumb-sep">/</span>
          <span>{t.title}</span>
        </nav>

        <div className="policy-body">
          <p className="policy-intro">{t.intro}</p>

          <div className="policy-section">
            <span className="policy-section-num">{t.s01}</span>
            <h2 className="policy-section-title">{t.s01title}</h2>
            <p className="policy-text">{t.s01text1}</p>
            <table className="policy-table">
              <thead>
                <tr><th>{t.tCategory}</th><th>{t.tExamples}</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>Identity</strong></td><td>First name, last name</td></tr>
                <tr><td><strong>Contact</strong></td><td>Email address, mobile number</td></tr>
                <tr><td><strong>Delivery</strong></td><td>Delivery address, PIN code, state</td></tr>
                <tr><td><strong>Transaction</strong></td><td>Order details, amounts, COD confirmation</td></tr>
                <tr><td><strong>Technical</strong></td><td>IP address, browser type, pages visited (via cookies)</td></tr>
              </tbody>
            </table>
            <p className="policy-text">{t.s01text2}</p>
          </div>

          <div className="policy-section">
            <span className="policy-section-num">{t.s02}</span>
            <h2 className="policy-section-title">{t.s02title}</h2>
            <p className="policy-text">{t.s02text}</p>
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
            <span className="policy-section-num">{t.s03}</span>
            <h2 className="policy-section-title">{t.s03title}</h2>
            <p className="policy-text">{t.s03text}</p>
            <ul className="policy-list">
              <li><strong>Contractual necessity</strong> — to fulfil your order and deliver products</li>
              <li><strong>Legitimate interests</strong> — fraud prevention, security, website improvement</li>
              <li><strong>Legal obligation</strong> — maintaining records as required by tax and consumer protection laws</li>
              <li><strong>Consent</strong> — for marketing communications (you may withdraw consent at any time)</li>
            </ul>
          </div>

          <div className="policy-section">
            <span className="policy-section-num">{t.s04}</span>
            <h2 className="policy-section-title">{t.s04title}</h2>
            <p className="policy-text">{t.s04text1}</p>
            <ul className="policy-list">
              <li><strong>Logistics partners</strong> — to deliver your order (name, address, phone only)</li>
              <li><strong>Technology service providers</strong> — for website hosting, email delivery, and analytics, under data processing agreements</li>
              <li><strong>Legal authorities</strong> — if required by law, court order, or to protect our rights</li>
            </ul>
            <p className="policy-text">{t.s04text2}</p>
          </div>

          <div className="policy-section">
            <span className="policy-section-num">{t.s05}</span>
            <h2 className="policy-section-title">{t.s05title}</h2>
            <p className="policy-text">{t.s05text1}</p>
            <p className="policy-text">{t.s05text2}</p>
          </div>

          <div className="policy-section">
            <span className="policy-section-num">{t.s06}</span>
            <h2 className="policy-section-title">{t.s06title}</h2>
            <p className="policy-text">{t.s06text}</p>
            <ul className="policy-list">
              <li><strong>Order data</strong> — 7 years (as required by Indian tax law)</li>
              <li><strong>Contact enquiries</strong> — 2 years from last contact</li>
              <li><strong>Marketing preferences</strong> — until you withdraw consent or we cease marketing</li>
              <li><strong>Technical/log data</strong> — 90 days</li>
            </ul>
          </div>

          <div className="policy-section">
            <span className="policy-section-num">{t.s07}</span>
            <h2 className="policy-section-title">{t.s07title}</h2>
            <p className="policy-text">{t.s07text1}</p>
            <ul className="policy-list">
              <li><strong>Access</strong> — request a copy of personal data we hold about you</li>
              <li><strong>Correction</strong> — request correction of inaccurate or incomplete data</li>
              <li><strong>Erasure</strong> — request deletion of your data (subject to legal retention obligations)</li>
              <li><strong>Withdraw consent</strong> — for marketing at any time without affecting prior processing</li>
              <li><strong>Grievance redressal</strong> — raise a complaint with our Grievance Officer</li>
            </ul>
            <p className="policy-text">
              {t.s07text2.replace("{email}", "")}<a href={`mailto:${EMAIL}`} className="policy-link">{EMAIL}</a>. {t.respondNote}
            </p>
          </div>

          <div className="policy-section">
            <span className="policy-section-num">{t.s08}</span>
            <h2 className="policy-section-title">{t.s08title}</h2>
            <p className="policy-text">{t.s08text1}</p>
            <p className="policy-text">{t.s08text2}</p>
          </div>

          <div className="policy-section">
            <span className="policy-section-num">{t.s09}</span>
            <h2 className="policy-section-title">{t.s09title}</h2>
            <p className="policy-text">{t.s09text}</p>
          </div>

          <div className="policy-section">
            <span className="policy-section-num">{t.s10}</span>
            <h2 className="policy-section-title">{t.s10title}</h2>
            <p className="policy-text">{t.s10text}</p>
          </div>

          <hr className="policy-rule" />

          <div className="policy-contact-box">
            <strong>{t.contactTitle}</strong><br />
            {COMPANY}<br />
            <a href={`mailto:${EMAIL}`} className="policy-link">{EMAIL}</a><br />
            {ADDRESS}
          </div>

          <div style={{ marginTop: "2rem", fontFamily: "'DM Sans', sans-serif", fontSize: ".8rem", color: "#5a5550", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <Link href={`/${lang}/terms`} className="policy-link">{t.termsLink}</Link>
            <Link href={`/${lang}/returns`} className="policy-link">{t.returnsLink}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
