import Link from "next/link";

type LangKey = "en" | "fr" | "es";

const LAST_UPDATED = "24 May 2026";
const COMPANY = "Amoohaa Farms Agro Business";
const EMAIL = "partnerships@amoohaa.com";
const ADDRESS = "Agra-Mathura Highway, Agra, Uttar Pradesh, India";

const strings: Record<LangKey, {
  eyebrow: string; title: string; lastUpdated: string; home: string; intro: string;
  s01: string; s01title: string; s01text: string;
  s02: string; s02title: string; s02text1: string; s02text2: string;
  s03: string; s03title: string; s03text1: string; s03text2: string;
  s04: string; s04title: string; s04text1: string; s04text2: string;
  s05: string; s05title: string; s05text1: string; s05text2: string;
  s06: string; s06title: string; s06text: string; returnsLinkText: string;
  s07: string; s07title: string; s07text1: string; s07text2: string;
  s08: string; s08title: string; s08text1: string; s08text2: string;
  s09: string; s09title: string; s09text1: string; s09text2: string;
  s10: string; s10title: string; s10text1: string; s10text2: string;
  s11: string; s11title: string; s11text: string;
  contactTitle: string; privacyLink: string; returnsLink: string;
}> = {
  en: {
    eyebrow: "Legal", title: "Terms & Conditions", lastUpdated: "Last updated:", home: "Home",
    intro: `Please read these Terms and Conditions ("Terms") carefully before using the Amoohaa Farms website or purchasing any products from us. By accessing our website or placing an order, you agree to be bound by these Terms. If you do not agree, please do not use our services.`,
    s01: "01", s01title: "About Us",
    s01text: `${COMPANY} is a farm-led food and nutrition business operating under applicable Indian laws. Our registered address is ${ADDRESS}. We sell agricultural food products directly to consumers and trade partners through this website and authorised channels.`,
    s02: "02", s02title: "Acceptance of Terms",
    s02text1: "By visiting this website, creating an account, or completing a purchase, you confirm that you are at least 18 years of age (or the age of majority in your jurisdiction) and have the legal capacity to enter into a binding agreement.",
    s02text2: "We reserve the right to modify these Terms at any time. Continued use of the website after changes are posted constitutes your acceptance of the revised Terms.",
    s03: "03", s03title: "Products & Orders",
    s03text1: "All products are subject to availability. We reserve the right to limit quantities, discontinue products, or modify pricing without prior notice. Product images are for illustrative purposes; actual appearance may vary slightly.",
    s03text2: "An order confirmation does not constitute acceptance of your order. We reserve the right to cancel or refuse any order at our discretion, including in cases of pricing errors, suspected fraud, or stock unavailability. You will be notified in such cases.",
    s04: "04", s04title: "Pricing & Payment",
    s04text1: "All prices are displayed in Indian Rupees (INR) and are inclusive of applicable GST unless stated otherwise. Shipping charges (if any) are communicated at checkout.",
    s04text2: "We currently offer Cash on Delivery (COD) as our payment method. Payment is due at the time of delivery. Please keep the exact amount ready. We are not responsible for delays caused by non-availability of correct change at delivery.",
    s05: "05", s05title: "Delivery",
    s05text1: "We deliver across serviceable PIN codes in India. Estimated delivery times are 1–7 business days after dispatch and are indicative, not guaranteed. We are not liable for delays caused by third-party logistics partners, natural events, or incorrect address information provided by you.",
    s05text2: "Risk of loss and title for products pass to you upon delivery. If you are unavailable at the time of delivery, our logistics partner may attempt re-delivery or return the shipment to us. Re-delivery charges may apply.",
    s06: "06", s06title: "Returns, Refunds & Cancellations",
    s06text: "Please refer to our dedicated",
    returnsLinkText: "Return, Refund & Cancellation Policy",
    s07: "07", s07title: "Food Safety & Allergens",
    s07text1: "Our products are processed in facilities that may also handle nuts, seeds, and other allergens. While we maintain strict hygiene and FSSAI-compliant processes, we cannot guarantee a completely allergen-free environment. Please read product labels carefully before consumption.",
    s07text2: "Our products are food items intended for general consumption. They are not medicines and are not intended to diagnose, treat, cure, or prevent any disease. Consult a healthcare professional if you have specific dietary or medical concerns.",
    s08: "08", s08title: "Intellectual Property",
    s08text1: `All content on this website — including text, images, logos, brand names (including "Amoohaa Farms" and "Power Pulz"), and design — is the exclusive property of ${COMPANY} or its licensors and is protected by applicable intellectual property laws.`,
    s08text2: "You may not copy, reproduce, distribute, or use any content from this website for commercial purposes without our prior written consent.",
    s09: "09", s09title: "Limitation of Liability",
    s09text1: `To the maximum extent permitted by law, ${COMPANY} shall not be liable for any indirect, incidental, special, or consequential damages arising out of your use of our products or website, even if we have been advised of the possibility of such damages.`,
    s09text2: "Our total liability in any matter arising from or related to these Terms shall not exceed the amount you paid for the specific order giving rise to the claim.",
    s10: "10", s10title: "Governing Law & Disputes",
    s10text1: "These Terms are governed by the laws of India. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in Agra, Uttar Pradesh, India.",
    s10text2: "We encourage you to contact us first to resolve any dispute amicably before pursuing formal legal proceedings.",
    s11: "11", s11title: "Severability",
    s11text: "If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.",
    contactTitle: "Questions about these Terms?", privacyLink: "Privacy Policy", returnsLink: "Return & Refund Policy",
  },
  fr: {
    eyebrow: "Légal", title: "Conditions générales", lastUpdated: "Dernière mise à jour :", home: "Accueil",
    intro: "Veuillez lire attentivement ces Conditions générales avant d'utiliser le site Amoohaa Farms ou d'acheter nos produits. En accédant à notre site ou en passant une commande, vous acceptez ces Conditions. Si vous n'acceptez pas, veuillez ne pas utiliser nos services.",
    s01: "01", s01title: "À notre sujet",
    s01text: `${COMPANY} est une entreprise agro-alimentaire opérant conformément aux lois indiennes applicables. Notre adresse enregistrée est ${ADDRESS}.`,
    s02: "02", s02title: "Acceptation des conditions",
    s02text1: "En visitant ce site, en créant un compte ou en effectuant un achat, vous confirmez avoir au moins 18 ans et la capacité juridique de conclure un accord contraignant.",
    s02text2: "Nous nous réservons le droit de modifier ces Conditions à tout moment. L'utilisation continue du site après des modifications vaut acceptation des Conditions révisées.",
    s03: "03", s03title: "Produits et commandes",
    s03text1: "Tous les produits sont soumis à disponibilité. Nous nous réservons le droit de limiter les quantités, de discontinuer des produits ou de modifier les prix sans préavis.",
    s03text2: "Une confirmation de commande ne constitue pas une acceptation de votre commande. Nous nous réservons le droit d'annuler ou de refuser toute commande.",
    s04: "04", s04title: "Prix et paiement",
    s04text1: "Tous les prix sont en Roupies indiennes (INR) et comprennent la TPS applicable. Les frais de port (le cas échéant) sont communiqués lors du passage en caisse.",
    s04text2: "Nous proposons actuellement le paiement à la livraison (COD). Le paiement est dû à la livraison. Veuillez préparer le montant exact.",
    s05: "05", s05title: "Livraison",
    s05text1: "Nous livrons dans les codes PIN desservis en Inde. Les délais de livraison estimés sont de 1 à 7 jours ouvrables après expédition et sont indicatifs.",
    s05text2: "Le risque de perte et le titre des produits vous sont transférés à la livraison.",
    s06: "06", s06title: "Retours, remboursements et annulations",
    s06text: "Veuillez consulter notre",
    returnsLinkText: "Politique de retour et de remboursement",
    s07: "07", s07title: "Sécurité alimentaire et allergènes",
    s07text1: "Nos produits sont traités dans des installations pouvant également manipuler des noix, des graines et d'autres allergènes. Veuillez lire attentivement les étiquettes des produits avant consommation.",
    s07text2: "Nos produits sont des aliments destinés à la consommation générale. Ils ne sont pas des médicaments. Consultez un professionnel de santé en cas de préoccupations alimentaires ou médicales.",
    s08: "08", s08title: "Propriété intellectuelle",
    s08text1: `Tout le contenu de ce site — textes, images, logos, noms de marque — est la propriété exclusive de ${COMPANY} et est protégé par les lois applicables sur la propriété intellectuelle.`,
    s08text2: "Vous ne pouvez pas copier, reproduire ou distribuer le contenu de ce site à des fins commerciales sans notre consentement écrit préalable.",
    s09: "09", s09title: "Limitation de responsabilité",
    s09text1: `Dans la limite autorisée par la loi, ${COMPANY} ne sera pas responsable des dommages indirects, accessoires, spéciaux ou consécutifs découlant de l'utilisation de nos produits ou de notre site.`,
    s09text2: "Notre responsabilité totale ne dépassera pas le montant que vous avez payé pour la commande spécifique en cause.",
    s10: "10", s10title: "Loi applicable et litiges",
    s10text1: "Ces Conditions sont régies par les lois indiennes. Tout litige sera soumis à la juridiction exclusive des tribunaux d'Agra, Uttar Pradesh, Inde.",
    s10text2: "Nous vous encourageons à nous contacter d'abord pour résoudre tout litige à l'amiable.",
    s11: "11", s11title: "Divisibilité",
    s11text: "Si une disposition de ces Conditions est jugée invalide ou inapplicable, les dispositions restantes resteront en vigueur.",
    contactTitle: "Des questions sur ces Conditions ?", privacyLink: "Politique de confidentialité", returnsLink: "Politique de retour",
  },
  es: {
    eyebrow: "Legal", title: "Términos y condiciones", lastUpdated: "Última actualización:", home: "Inicio",
    intro: "Lee atentamente estos Términos y condiciones antes de usar el sitio web de Amoohaa Farms o comprar nuestros productos. Al acceder a nuestro sitio o realizar un pedido, aceptas estos Términos. Si no estás de acuerdo, no utilices nuestros servicios.",
    s01: "01", s01title: "Sobre nosotros",
    s01text: `${COMPANY} es una empresa agroalimentaria que opera conforme a las leyes indias aplicables. Nuestra dirección registrada es ${ADDRESS}.`,
    s02: "02", s02title: "Aceptación de los términos",
    s02text1: "Al visitar este sitio, crear una cuenta o completar una compra, confirmas que tienes al menos 18 años y capacidad legal para celebrar un acuerdo vinculante.",
    s02text2: "Nos reservamos el derecho de modificar estos Términos en cualquier momento. El uso continuado del sitio tras los cambios constituye la aceptación de los Términos revisados.",
    s03: "03", s03title: "Productos y pedidos",
    s03text1: "Todos los productos están sujetos a disponibilidad. Nos reservamos el derecho de limitar cantidades, descatalogar productos o modificar precios sin previo aviso.",
    s03text2: "Una confirmación de pedido no constituye la aceptación del mismo. Nos reservamos el derecho de cancelar o rechazar cualquier pedido.",
    s04: "04", s04title: "Precios y pago",
    s04text1: "Todos los precios se muestran en rupias indias (INR) e incluyen el GST aplicable. Los gastos de envío (si los hay) se informan en el proceso de pago.",
    s04text2: "Actualmente ofrecemos el pago contra entrega (COD). El pago se realiza en el momento de la entrega. Ten listo el importe exacto.",
    s05: "05", s05title: "Entrega",
    s05text1: "Realizamos entregas en los códigos PIN de la India con servicio disponible. Los plazos de entrega estimados son de 1 a 7 días hábiles tras el envío y son indicativos.",
    s05text2: "El riesgo de pérdida y la titularidad de los productos se transfieren a ti en el momento de la entrega.",
    s06: "06", s06title: "Devoluciones, reembolsos y cancelaciones",
    s06text: "Consulta nuestra",
    returnsLinkText: "Política de devoluciones y reembolsos",
    s07: "07", s07title: "Seguridad alimentaria y alérgenos",
    s07text1: "Nuestros productos se procesan en instalaciones que también pueden manipular frutos secos, semillas y otros alérgenos. Lee atentamente las etiquetas de los productos antes de consumirlos.",
    s07text2: "Nuestros productos son alimentos de consumo general. No son medicamentos. Consulta a un profesional de la salud si tienes necesidades dietéticas o médicas específicas.",
    s08: "08", s08title: "Propiedad intelectual",
    s08text1: `Todo el contenido de este sitio — textos, imágenes, logotipos, nombres de marca — es propiedad exclusiva de ${COMPANY} y está protegido por las leyes de propiedad intelectual aplicables.`,
    s08text2: "No puedes copiar, reproducir ni distribuir ningún contenido de este sitio con fines comerciales sin nuestro consentimiento previo por escrito.",
    s09: "09", s09title: "Limitación de responsabilidad",
    s09text1: `En la máxima medida permitida por la ley, ${COMPANY} no será responsable de daños indirectos, incidentales, especiales ni consecuentes derivados del uso de nuestros productos o sitio web.`,
    s09text2: "Nuestra responsabilidad total no superará el importe que pagaste por el pedido específico que origina la reclamación.",
    s10: "10", s10title: "Legislación aplicable y disputas",
    s10text1: "Estos Términos se rigen por las leyes de la India. Cualquier disputa estará sujeta a la jurisdicción exclusiva de los tribunales de Agra, Uttar Pradesh, India.",
    s10text2: "Te animamos a contactarnos primero para resolver cualquier disputa de forma amistosa.",
    s11: "11", s11title: "Divisibilidad",
    s11text: "Si alguna disposición de estos Términos es declarada inválida o inaplicable, las disposiciones restantes seguirán en plena vigencia.",
    contactTitle: "¿Preguntas sobre estos Términos?", privacyLink: "Política de privacidad", returnsLink: "Política de devoluciones",
  },
};

type PageProps = { params: Promise<{ lang: string }> };

export default async function TermsPage({ params }: PageProps) {
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
        .policy-link { color:#1a4a2e;font-weight:600;text-decoration:underline;text-underline-offset:3px; }
        .policy-rule { border:none;border-top:1px solid rgba(26,74,46,.1);margin:3rem 0; }
        .policy-contact-box { background:#f2ede4;padding:2rem;border:1px solid rgba(26,74,46,.1);font-size:.88rem;color:#3d3d36;line-height:1.8; }
        .policy-contact-box strong { color:#1a4a2e; }
        .policy-breadcrumb { display:flex;align-items:center;gap:.4rem;font-family:'DM Sans',sans-serif;font-size:.62rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#5a5550;max-width:820px;margin:1.5rem auto 0;padding:0 1.5rem; }
        .policy-breadcrumb a { color:#1a4a2e;text-decoration:none; }
        .policy-breadcrumb a:hover { color:#b8893a; }
        .policy-breadcrumb-sep { opacity:.35; }
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
            <p className="policy-text">{t.s01text}</p>
          </div>

          <div className="policy-section">
            <span className="policy-section-num">{t.s02}</span>
            <h2 className="policy-section-title">{t.s02title}</h2>
            <p className="policy-text">{t.s02text1}</p>
            <p className="policy-text">{t.s02text2}</p>
          </div>

          <div className="policy-section">
            <span className="policy-section-num">{t.s03}</span>
            <h2 className="policy-section-title">{t.s03title}</h2>
            <p className="policy-text">{t.s03text1}</p>
            <p className="policy-text">{t.s03text2}</p>
          </div>

          <div className="policy-section">
            <span className="policy-section-num">{t.s04}</span>
            <h2 className="policy-section-title">{t.s04title}</h2>
            <p className="policy-text">{t.s04text1}</p>
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
            <p className="policy-text">
              {t.s06text}{" "}
              <Link href={`/${lang}/returns`} className="policy-link">{t.returnsLinkText}</Link>{" "}
              for full details on eligibility, timelines, and the process for raising a claim.
            </p>
          </div>

          <div className="policy-section">
            <span className="policy-section-num">{t.s07}</span>
            <h2 className="policy-section-title">{t.s07title}</h2>
            <p className="policy-text">{t.s07text1}</p>
            <p className="policy-text">{t.s07text2}</p>
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
            <p className="policy-text">{t.s09text1}</p>
            <p className="policy-text">{t.s09text2}</p>
          </div>

          <div className="policy-section">
            <span className="policy-section-num">{t.s10}</span>
            <h2 className="policy-section-title">{t.s10title}</h2>
            <p className="policy-text">{t.s10text1}</p>
            <p className="policy-text">{t.s10text2}</p>
          </div>

          <div className="policy-section">
            <span className="policy-section-num">{t.s11}</span>
            <h2 className="policy-section-title">{t.s11title}</h2>
            <p className="policy-text">{t.s11text}</p>
          </div>

          <hr className="policy-rule" />

          <div className="policy-contact-box">
            <strong>{t.contactTitle}</strong><br />
            Contact us at <a href={`mailto:${EMAIL}`} className="policy-link">{EMAIL}</a><br />
            {ADDRESS}
          </div>

          <div style={{ marginTop: "2rem", fontFamily: "'DM Sans', sans-serif", fontSize: ".8rem", color: "#5a5550", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <Link href={`/${lang}/privacy`} className="policy-link">{t.privacyLink}</Link>
            <Link href={`/${lang}/returns`} className="policy-link">{t.returnsLink}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
