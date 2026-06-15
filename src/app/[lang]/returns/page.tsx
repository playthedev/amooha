import Link from "next/link";

type LangKey = "en" | "fr" | "es";

const LAST_UPDATED = "24 May 2026";
const COMPANY = "Amoohaa Farms Agro Business";
const EMAIL = "partnerships@amoohaa.com";
const ADDRESS = "Agra-Mathura Highway, Agra, Uttar Pradesh, India";

const strings: Record<LangKey, {
  eyebrow: string; title: string; lastUpdated: string; home: string; breadcrumb: string; intro: string;
  s01: string; s01title: string; s01highlight: string; s01text1: string; s01text2: string; s01text3: string;
  s02: string; s02title: string; s02text1: string; s02text2: string;
  s03: string; s03title: string; s03col1: string; s03col2: string; s03note: string;
  s04: string; s04title: string;
  step1title: string; step1text: string; step2title: string; step2text: string;
  step3title: string; step3text: string; step4title: string; step4text: string;
  s05: string; s05title: string; s05text: string; s05highlight: string; s05text2: string;
  s06: string; s06title: string; s06text: string;
  s07: string; s07title: string; s07text1: string; s07text2: string;
  s08: string; s08title: string; s08text: string;
  contactTitle: string; termsLink: string; privacyLink: string;
}> = {
  en: {
    eyebrow: "Legal · Compliance", title: "Return, Refund & Cancellation Policy",
    lastUpdated: "Last updated:", home: "Home", breadcrumb: "Returns & Refunds",
    intro: `At ${COMPANY}, we take pride in the quality of every product we dispatch. If something goes wrong, we want to make it right. This policy explains your rights and options when it comes to returns, refunds, and cancellations for orders placed on our website.`,
    s01: "01", s01title: "Order Cancellation",
    s01highlight: "Before dispatch: You may cancel your order at no charge by contacting us within 12 hours of placing it.",
    s01text1: "Since we operate on Cash on Delivery (COD), no payment is collected until delivery. If you cancel before dispatch, there is nothing to refund — your order is simply not processed.",
    s01text2: "After dispatch: Once an order has been handed to our logistics partner, it cannot be cancelled. You may refuse delivery at the door — in that case, the shipment will be returned to us and no COD payment is owed.",
    s01text3: "To cancel, contact us at {email} with your Order ID and reason.",
    s02: "02", s02title: "Return Eligibility",
    s02text1: "We accept returns in the following situations: wrong product delivered, damaged in transit, defective or spoiled product on arrival, or missing item in your order.",
    s02text2: "We do not accept returns for: products opened or partially consumed after delivery, returns beyond 7 days, change of mind, clearance sale items (unless damaged/defective), or damage from improper storage after delivery.",
    s03: "03", s03title: "Return Window",
    s03col1: "Issue Type", s03col2: "Return / Claim Window",
    s03note: "Claims raised after these windows cannot be processed. We strongly recommend inspecting your package at the time of delivery and photographing any damage before accepting.",
    s04: "04", s04title: "How to Raise a Return or Claim",
    step1title: "Contact Us", step1text: `Email ${EMAIL} with the subject line "Return Request — [Your Order ID]".`,
    step2title: "Provide Details", step2text: "Include your Order ID, the item(s) affected, a clear description of the issue, and photographs of the product and packaging (required for damage/defect claims).",
    step3title: "We Review Your Claim", step3text: "Our team will review your request within 2 business days and confirm whether your return is approved.",
    step4title: "Return Pickup or Replacement", step4text: "If approved, we will arrange a reverse pickup (free of charge) or send a replacement, at our discretion and subject to stock availability.",
    s05: "05", s05title: "Refunds",
    s05text: "Since we currently operate on Cash on Delivery (COD) only, no online payment is taken from you. Refunds apply only if a replacement is unavailable for an approved return claim — we will issue a bank transfer (NEFT/IMPS) or UPI refund.",
    s05highlight: "Refunds (where applicable) are processed within 7–10 business days of the return being received and verified at our facility.",
    s05text2: "We do not offer cash refunds at the doorstep. All refund transactions are processed through digital bank transfer only.",
    s06: "06", s06title: "Non-Returnable Conditions",
    s06text: "For food safety and hygiene reasons, we cannot accept returns of products that have been opened or the seal broken (unless reporting a defect), show signs of use or tampering after delivery, are past their best-before date due to delayed reporting, or were stored incorrectly after delivery.",
    s07: "07", s07title: "Damaged in Transit",
    s07text1: "If your order arrives with visible damage, do not accept the delivery if the product inside appears damaged. If you do accept, photograph the package and product immediately. Report the damage to us within 48 hours with photos.",
    s07text2: "We will arrange a replacement at no additional cost for confirmed transit damage claims.",
    s08: "08", s08title: "Consumer Rights (India)",
    s08text: "This policy is in addition to — and does not limit — your statutory rights under the Consumer Protection Act, 2019. If you believe your consumer rights have not been honoured, you may contact the National Consumer Helpline (1800-11-4000) or approach the appropriate Consumer Forum.",
    contactTitle: "Return & Refund Queries", termsLink: "Terms & Conditions", privacyLink: "Privacy Policy",
  },
  fr: {
    eyebrow: "Légal · Conformité", title: "Politique de retour, remboursement et annulation",
    lastUpdated: "Dernière mise à jour :", home: "Accueil", breadcrumb: "Retours et remboursements",
    intro: `Chez ${COMPANY}, nous sommes fiers de la qualité de chaque produit que nous expédions. Si quelque chose ne va pas, nous souhaitons y remédier. Cette politique explique vos droits et options en matière de retours, remboursements et annulations.`,
    s01: "01", s01title: "Annulation de commande",
    s01highlight: "Avant expédition : Vous pouvez annuler votre commande sans frais en nous contactant dans les 12 heures suivant la commande.",
    s01text1: "Puisque nous fonctionnons en paiement à la livraison (COD), aucun paiement n'est encaissé avant la livraison. Si vous annulez avant expédition, il n'y a rien à rembourser.",
    s01text2: "Après expédition : Une fois la commande remise à notre partenaire logistique, elle ne peut plus être annulée. Vous pouvez refuser la livraison à la porte.",
    s01text3: "Pour annuler, contactez-nous à {email} avec votre numéro de commande et la raison.",
    s02: "02", s02title: "Éligibilité au retour",
    s02text1: "Nous acceptons les retours dans les cas suivants : mauvais produit livré, endommagé lors du transport, produit défectueux ou avarié à l'arrivée, ou article manquant.",
    s02text2: "Nous n'acceptons pas les retours pour : produits ouverts ou partiellement consommés, retours après 7 jours, changement d'avis, articles soldés (sauf si endommagés/défectueux), ou dommages liés à un mauvais stockage.",
    s03: "03", s03title: "Délai de retour",
    s03col1: "Type de problème", s03col2: "Délai de retour / réclamation",
    s03note: "Les réclamations soulevées après ces délais ne peuvent pas être traitées. Nous vous recommandons vivement d'inspecter votre colis à la livraison.",
    s04: "04", s04title: "Comment effectuer un retour ou une réclamation",
    step1title: "Nous contacter", step1text: `Envoyez un e-mail à ${EMAIL} avec l'objet « Demande de retour — [Votre numéro de commande] ».`,
    step2title: "Fournir les détails", step2text: "Incluez votre numéro de commande, le(s) article(s) concerné(s), une description claire du problème et des photos du produit et de l'emballage.",
    step3title: "Nous examinons votre réclamation", step3text: "Notre équipe examinera votre demande dans un délai de 2 jours ouvrables et confirmera si votre retour est approuvé.",
    step4title: "Collecte ou remplacement", step4text: "Si approuvé, nous organiserons une collecte en retour (gratuite) ou enverrons un remplacement, selon disponibilité du stock.",
    s05: "05", s05title: "Remboursements",
    s05text: "Puisque nous fonctionnons uniquement en paiement à la livraison, les remboursements s'appliquent uniquement si un remplacement est impossible — nous émettrons un virement bancaire.",
    s05highlight: "Les remboursements (le cas échéant) sont traités dans les 7 à 10 jours ouvrables suivant la réception et la vérification du retour.",
    s05text2: "Nous n'offrons pas de remboursements en espèces à la porte. Toutes les transactions de remboursement sont effectuées par virement bancaire numérique.",
    s06: "06", s06title: "Conditions non retournables",
    s06text: "Pour des raisons de sécurité alimentaire, nous ne pouvons pas accepter les retours de produits ouverts ou descellés (sauf défaut signalé), ayant des traces d'utilisation, dont la date est dépassée suite à un signalement tardif, ou mal conservés après livraison.",
    s07: "07", s07title: "Endommagé lors du transport",
    s07text1: "Si votre commande arrive avec des dommages visibles, ne l'acceptez pas si le produit semble endommagé. Si vous l'acceptez, photographiez immédiatement le colis. Signalez-nous les dommages dans les 48 heures avec des photos.",
    s07text2: "Nous organiserons un remplacement sans frais supplémentaires pour les réclamations de dommages de transport confirmés.",
    s08: "08", s08title: "Droits des consommateurs (Inde)",
    s08text: "Cette politique s'ajoute à vos droits légaux et ne les limite pas. Si vous estimez que vos droits n'ont pas été respectés, vous pouvez contacter le National Consumer Helpline (1800-11-4000).",
    contactTitle: "Questions sur les retours et remboursements", termsLink: "Conditions générales", privacyLink: "Politique de confidentialité",
  },
  es: {
    eyebrow: "Legal · Cumplimiento", title: "Política de devoluciones, reembolsos y cancelaciones",
    lastUpdated: "Última actualización:", home: "Inicio", breadcrumb: "Devoluciones y reembolsos",
    intro: `En ${COMPANY}, nos enorgullecemos de la calidad de cada producto que enviamos. Si algo sale mal, queremos solucionarlo. Esta política explica tus derechos y opciones en materia de devoluciones, reembolsos y cancelaciones.`,
    s01: "01", s01title: "Cancelación del pedido",
    s01highlight: "Antes del envío: Puedes cancelar tu pedido sin coste contactándonos en las 12 horas siguientes a realizarlo.",
    s01text1: "Como operamos con pago contra entrega (COD), no se cobra ningún pago hasta la entrega. Si cancelas antes del envío, no hay nada que reembolsar.",
    s01text2: "Después del envío: Una vez que el pedido ha sido entregado a nuestro socio logístico, no puede cancelarse. Puedes rechazar la entrega en la puerta.",
    s01text3: "Para cancelar, contáctanos en {email} con tu ID de pedido y el motivo.",
    s02: "02", s02title: "Elegibilidad para devolución",
    s02text1: "Aceptamos devoluciones en los siguientes casos: producto incorrecto entregado, dañado durante el transporte, producto defectuoso o en mal estado a la llegada, o artículo faltante.",
    s02text2: "No aceptamos devoluciones por: productos abiertos o parcialmente consumidos, devoluciones después de 7 días, cambio de opinión, artículos en liquidación (salvo daño/defecto), o daños por almacenamiento incorrecto.",
    s03: "03", s03title: "Plazo de devolución",
    s03col1: "Tipo de problema", s03col2: "Plazo de devolución / reclamación",
    s03note: "Las reclamaciones presentadas fuera de estos plazos no pueden tramitarse. Recomendamos inspeccionar el paquete al recibirlo y fotografiar cualquier daño.",
    s04: "04", s04title: "Cómo solicitar una devolución o reclamación",
    step1title: "Contáctanos", step1text: `Envía un correo a ${EMAIL} con el asunto "Solicitud de devolución — [Tu ID de pedido]".`,
    step2title: "Proporciona los detalles", step2text: "Incluye tu ID de pedido, los artículos afectados, una descripción clara del problema y fotografías del producto y el embalaje.",
    step3title: "Revisamos tu reclamación", step3text: "Nuestro equipo revisará tu solicitud en un plazo de 2 días hábiles y confirmará si se aprueba la devolución.",
    step4title: "Recogida o reemplazo", step4text: "Si se aprueba, organizaremos una recogida en reverso (sin coste) o enviaremos un reemplazo, según disponibilidad de stock.",
    s05: "05", s05title: "Reembolsos",
    s05text: "Como operamos únicamente con pago contra entrega, los reembolsos solo se aplican si no es posible un reemplazo para una devolución aprobada — emitiremos una transferencia bancaria.",
    s05highlight: "Los reembolsos (cuando corresponda) se procesan en un plazo de 7 a 10 días hábiles tras la recepción y verificación de la devolución.",
    s05text2: "No ofrecemos reembolsos en efectivo en la puerta. Todas las transacciones de reembolso se realizan mediante transferencia bancaria digital.",
    s06: "06", s06title: "Condiciones no retornables",
    s06text: "Por razones de seguridad alimentaria, no podemos aceptar devoluciones de productos abiertos o con el precinto roto (salvo defecto), con signos de uso, cuya fecha haya vencido por reporte tardío, o mal almacenados tras la entrega.",
    s07: "07", s07title: "Daños durante el transporte",
    s07text1: "Si tu pedido llega con daños visibles, no aceptes la entrega si el producto parece dañado. Si la aceptas, fotografía el paquete de inmediato. Infórmanos del daño en un plazo de 48 horas con fotos.",
    s07text2: "Organizaremos un reemplazo sin coste adicional para reclamaciones de daños en tránsito confirmadas.",
    s08: "08", s08title: "Derechos del consumidor (India)",
    s08text: "Esta política se suma a tus derechos legales y no los limita. Si crees que tus derechos no han sido respetados, puedes contactar con la Línea Nacional del Consumidor (1800-11-4000).",
    contactTitle: "Consultas sobre devoluciones y reembolsos", termsLink: "Términos y condiciones", privacyLink: "Política de privacidad",
  },
};

type PageProps = { params: Promise<{ lang: string }> };

export default async function ReturnsPage({ params }: PageProps) {
  const { lang } = await params;
  const t = strings[(lang as LangKey)] ?? strings.en;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .policy-hero { background:#1a4a2e;padding:5rem 1.5rem 4rem;box-sizing:border-box;text-align:center; }
        .policy-eyebrow { font-family:'DM Sans',sans-serif;font-size:.6rem;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:rgba(212,168,83,.8);display:block;margin-bottom:1rem; }
        .policy-hero-title { font-family:'Playfair Display',serif;font-size:clamp(1.8rem,5vw,3.2rem);font-weight:400;font-style:italic;color:#fff;line-height:1.12;margin:0; }
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
        .policy-highlight { background:#f0ede6;border-left:3px solid #d4a853;padding:1.1rem 1.4rem;margin:1.25rem 0;font-size:.88rem;color:#3d3d36;line-height:1.75; }
        .policy-highlight strong { color:#1a4a2e; }
        .policy-steps { margin:1rem 0;display:flex;flex-direction:column;gap:1px; }
        .policy-step { display:flex;gap:1.25rem;align-items:flex-start;background:#f7f3ec;padding:1.1rem 1.25rem;border:1px solid rgba(26,74,46,.09); }
        .policy-step-num { width:28px;height:28px;border-radius:50%;flex-shrink:0;background:#1a4a2e;color:#fff;font-size:.7rem;font-weight:700;display:flex;align-items:center;justify-content:center; }
        .policy-step-body { flex:1; }
        .policy-step-title { font-size:.82rem;font-weight:700;color:#1a4a2e;margin-bottom:.3rem; }
        .policy-step-text { font-size:.85rem;color:#5a5550;line-height:1.65; }
        .policy-table { width:100%;border-collapse:collapse;font-size:.85rem;margin:1rem 0; }
        .policy-table th { background:#1a4a2e;color:#fff;padding:.75rem 1rem;text-align:left;font-weight:700;letter-spacing:.1em;font-size:.72rem;text-transform:uppercase; }
        .policy-table td { padding:.75rem 1rem;border-bottom:1px solid rgba(26,74,46,.08);color:#3d3d36;vertical-align:top; }
        .policy-table tr:last-child td { border-bottom:none; }
        .policy-table tr:nth-child(even) td { background:rgba(26,74,46,.03); }
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
          <span>{t.breadcrumb}</span>
        </nav>

        <div className="policy-body">
          <p className="policy-intro">{t.intro}</p>

          <div className="policy-section">
            <span className="policy-section-num">{t.s01}</span>
            <h2 className="policy-section-title">{t.s01title}</h2>
            <div className="policy-highlight"><strong>{t.s01highlight}</strong></div>
            <p className="policy-text">{t.s01text1}</p>
            <p className="policy-text">{t.s01text2}</p>
            <p className="policy-text">
              {t.s01text3.replace("{email}", "")}<a href={`mailto:${EMAIL}`} className="policy-link">{EMAIL}</a>.
            </p>
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
            <table className="policy-table">
              <thead>
                <tr><th>{t.s03col1}</th><th>{t.s03col2}</th></tr>
              </thead>
              <tbody>
                <tr><td>Damaged or defective product</td><td><strong>Within 48 hours</strong> of delivery</td></tr>
                <tr><td>Wrong product delivered</td><td><strong>Within 48 hours</strong> of delivery</td></tr>
                <tr><td>Missing item in order</td><td><strong>Within 48 hours</strong> of delivery</td></tr>
                <tr><td>Quality concerns (unopened)</td><td><strong>Within 7 days</strong> of delivery</td></tr>
              </tbody>
            </table>
            <p className="policy-text">{t.s03note}</p>
          </div>

          <div className="policy-section">
            <span className="policy-section-num">{t.s04}</span>
            <h2 className="policy-section-title">{t.s04title}</h2>
            <div className="policy-steps">
              <div className="policy-step">
                <div className="policy-step-num">1</div>
                <div className="policy-step-body">
                  <p className="policy-step-title">{t.step1title}</p>
                  <p className="policy-step-text">{t.step1text}</p>
                </div>
              </div>
              <div className="policy-step">
                <div className="policy-step-num">2</div>
                <div className="policy-step-body">
                  <p className="policy-step-title">{t.step2title}</p>
                  <p className="policy-step-text">{t.step2text}</p>
                </div>
              </div>
              <div className="policy-step">
                <div className="policy-step-num">3</div>
                <div className="policy-step-body">
                  <p className="policy-step-title">{t.step3title}</p>
                  <p className="policy-step-text">{t.step3text}</p>
                </div>
              </div>
              <div className="policy-step">
                <div className="policy-step-num">4</div>
                <div className="policy-step-body">
                  <p className="policy-step-title">{t.step4title}</p>
                  <p className="policy-step-text">{t.step4text}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="policy-section">
            <span className="policy-section-num">{t.s05}</span>
            <h2 className="policy-section-title">{t.s05title}</h2>
            <p className="policy-text">{t.s05text}</p>
            <div className="policy-highlight">{t.s05highlight}</div>
            <p className="policy-text">{t.s05text2}</p>
          </div>

          <div className="policy-section">
            <span className="policy-section-num">{t.s06}</span>
            <h2 className="policy-section-title">{t.s06title}</h2>
            <p className="policy-text">{t.s06text}</p>
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
            <p className="policy-text">{t.s08text}</p>
          </div>

          <hr className="policy-rule" />

          <div className="policy-contact-box">
            <strong>{t.contactTitle}</strong><br />
            Email: <a href={`mailto:${EMAIL}`} className="policy-link">{EMAIL}</a><br />
            {COMPANY} · {ADDRESS}
          </div>

          <div style={{ marginTop: "2rem", fontFamily: "'DM Sans', sans-serif", fontSize: ".8rem", color: "#5a5550", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <Link href={`/${lang}/terms`} className="policy-link">{t.termsLink}</Link>
            <Link href={`/${lang}/privacy`} className="policy-link">{t.privacyLink}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
