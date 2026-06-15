"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CheckCircle, ChevronDown, ShoppingBag, Truck } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";

type LangKey = "en" | "fr" | "es";
type Step = "details" | "review" | "success";

interface FormData {
  firstName: string; lastName: string; email: string; phone: string;
  address: string; city: string; state: string; pincode: string;
  landmark: string; notes: string;
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

const strings: Record<LangKey, {
  heading: string; reviewHeading: string; successTitle: string;
  orderId: string; successSub: string; successCodNote: string; continueShopping: string;
  stepDetails: string; stepReview: string;
  contactInfo: string; firstName: string; lastName: string; email: string; phone: string;
  phonePlaceholder: string; deliveryAddress: string; fullAddress: string; addressPlaceholder: string;
  landmark: string; landmarkPlaceholder: string; city: string; pinCode: string;
  state: string; selectState: string; paymentMethod: string; cod: string; codSub: string;
  codNote: string; orderNotes: string; orderNotesPlaceholder: string; reviewOrder: string;
  emptyCart: string; addProducts: string;
  contactLabel: string; deliveryLabel: string; paymentLabel: string; notesLabel: string;
  nearLabel: string; termsNote: string; termsLink: string; privacyLink: string; returnsLink: string;
  placeOrder: string; editDetails: string;
  orderSummary: string; subtotal: string; shipping: string; free: string; payment: string;
  total: string; required: string; validEmail: string; validPhone: string; validPin: string;
}> = {
  en: {
    heading: "Delivery Details", reviewHeading: "Review & Confirm",
    successTitle: "Order Placed!", orderId: "Order ID:",
    successSub: "Your order has been received and will be dispatched within 1–2 business days.",
    successCodNote: "Cash on Delivery — Please keep the exact amount ready at the time of delivery. A confirmation message will be sent to",
    continueShopping: "Continue Shopping",
    stepDetails: "Details", stepReview: "Review",
    contactInfo: "Contact Information", firstName: "First Name", lastName: "Last Name",
    email: "Email", phone: "Mobile Number", phonePlaceholder: "10-digit number",
    deliveryAddress: "Delivery Address", fullAddress: "Full Address", addressPlaceholder: "House no., Street, Area",
    landmark: "Landmark (optional)", landmarkPlaceholder: "Near school, temple, etc.",
    city: "City", pinCode: "PIN Code", state: "State", selectState: "Select state",
    paymentMethod: "Payment Method", cod: "Cash on Delivery (COD)", codSub: "Pay with cash when your order arrives",
    codNote: "No advance payment required. Pay the full amount in cash when your order is delivered to your door.",
    orderNotes: "Order Notes (optional)", orderNotesPlaceholder: "Any special instructions for delivery…",
    reviewOrder: "Review Order", emptyCart: "Your cart is empty.", addProducts: "Add products",
    contactLabel: "Contact", deliveryLabel: "Delivery Address", paymentLabel: "Payment", notesLabel: "Order Notes",
    nearLabel: "near", termsNote: "By placing this order you agree to our",
    termsLink: "Terms & Conditions", privacyLink: "Privacy Policy", returnsLink: "Return & Refund Policy",
    placeOrder: "Place Order", editDetails: "← Edit Details",
    orderSummary: "Order Summary", subtotal: "Subtotal", shipping: "Shipping", free: "Free",
    payment: "Payment", total: "Total",
    required: "Required", validEmail: "Valid email required", validPhone: "Valid 10-digit mobile required", validPin: "Valid 6-digit PIN required",
  },
  fr: {
    heading: "Informations de livraison", reviewHeading: "Vérifier & Confirmer",
    successTitle: "Commande passée !", orderId: "N° de commande :",
    successSub: "Votre commande a été reçue et sera expédiée sous 1 à 2 jours ouvrables.",
    successCodNote: "Paiement à la livraison — Veuillez préparer le montant exact. Un message de confirmation sera envoyé à",
    continueShopping: "Continuer vos achats",
    stepDetails: "Détails", stepReview: "Vérification",
    contactInfo: "Informations de contact", firstName: "Prénom", lastName: "Nom",
    email: "E-mail", phone: "Numéro de mobile", phonePlaceholder: "Numéro à 10 chiffres",
    deliveryAddress: "Adresse de livraison", fullAddress: "Adresse complète", addressPlaceholder: "N° de maison, rue, quartier",
    landmark: "Repère (optionnel)", landmarkPlaceholder: "Près d'une école, temple, etc.",
    city: "Ville", pinCode: "Code PIN", state: "État", selectState: "Choisir un état",
    paymentMethod: "Mode de paiement", cod: "Paiement à la livraison", codSub: "Payez en espèces à la réception",
    codNote: "Aucun paiement anticipé requis. Payez en espèces à la livraison.",
    orderNotes: "Notes de commande (optionnel)", orderNotesPlaceholder: "Instructions spéciales pour la livraison…",
    reviewOrder: "Vérifier la commande", emptyCart: "Votre panier est vide.", addProducts: "Ajouter des produits",
    contactLabel: "Contact", deliveryLabel: "Adresse de livraison", paymentLabel: "Paiement", notesLabel: "Notes",
    nearLabel: "près de", termsNote: "En passant cette commande, vous acceptez nos",
    termsLink: "Conditions générales", privacyLink: "Politique de confidentialité", returnsLink: "Politique de retour",
    placeOrder: "Passer la commande", editDetails: "← Modifier les détails",
    orderSummary: "Récapitulatif", subtotal: "Sous-total", shipping: "Livraison", free: "Gratuite",
    payment: "Paiement", total: "Total",
    required: "Requis", validEmail: "E-mail valide requis", validPhone: "Numéro de mobile valide requis", validPin: "Code PIN à 6 chiffres requis",
  },
  es: {
    heading: "Datos de entrega", reviewHeading: "Revisar y Confirmar",
    successTitle: "¡Pedido realizado!", orderId: "N.º de pedido:",
    successSub: "Tu pedido ha sido recibido y será enviado en 1 o 2 días hábiles.",
    successCodNote: "Pago contra entrega — Ten el importe exacto listo. Se enviará una confirmación a",
    continueShopping: "Seguir comprando",
    stepDetails: "Detalles", stepReview: "Revisión",
    contactInfo: "Información de contacto", firstName: "Nombre", lastName: "Apellido",
    email: "Correo electrónico", phone: "Número de móvil", phonePlaceholder: "Número de 10 dígitos",
    deliveryAddress: "Dirección de entrega", fullAddress: "Dirección completa", addressPlaceholder: "N.º de casa, calle, zona",
    landmark: "Referencia (opcional)", landmarkPlaceholder: "Cerca de escuela, templo, etc.",
    city: "Ciudad", pinCode: "Código PIN", state: "Estado", selectState: "Seleccionar estado",
    paymentMethod: "Método de pago", cod: "Pago contra entrega", codSub: "Paga en efectivo al recibir tu pedido",
    codNote: "No se requiere pago anticipado. Paga en efectivo cuando llegue tu pedido.",
    orderNotes: "Notas del pedido (opcional)", orderNotesPlaceholder: "Instrucciones especiales para la entrega…",
    reviewOrder: "Revisar pedido", emptyCart: "Tu carrito está vacío.", addProducts: "Añadir productos",
    contactLabel: "Contacto", deliveryLabel: "Dirección de entrega", paymentLabel: "Pago", notesLabel: "Notas",
    nearLabel: "cerca de", termsNote: "Al realizar este pedido aceptas nuestros",
    termsLink: "Términos y condiciones", privacyLink: "Política de privacidad", returnsLink: "Política de devoluciones",
    placeOrder: "Realizar pedido", editDetails: "← Editar datos",
    orderSummary: "Resumen del pedido", subtotal: "Subtotal", shipping: "Envío", free: "Gratis",
    payment: "Pago", total: "Total",
    required: "Requerido", validEmail: "Correo válido requerido", validPhone: "Número de móvil válido requerido", validPin: "Código PIN de 6 dígitos requerido",
  },
};

export default function CheckoutPage() {
  const params = useParams<{ lang: string }>();
  const lang = (params.lang ?? "en") as LangKey;
  const t = strings[lang] ?? strings.en;
  const { items, total, clearCart } = useCart();
  const { format } = useCurrency();
  const [step, setStep] = useState<Step>("details");
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [orderId] = useState(() => "AMF" + Date.now().toString().slice(-7));

  function change(field: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  }

  function validate(): boolean {
    const e: Partial<FormData> = {};
    if (!form.firstName.trim()) e.firstName = t.required;
    if (!form.lastName.trim()) e.lastName = t.required;
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = t.validEmail;
    if (!form.phone.match(/^[6-9]\d{9}$/)) e.phone = t.validPhone;
    if (!form.address.trim()) e.address = t.required;
    if (!form.city.trim()) e.city = t.required;
    if (!form.state) e.state = t.required;
    if (!form.pincode.match(/^\d{6}$/)) e.pincode = t.validPin;
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
        .co-page { background:#faf6ef;min-height:70vh;padding:3rem 1.5rem 7rem;box-sizing:border-box; }
        .co-inner { max-width:1100px;margin:0 auto;display:grid;gap:2.5rem;align-items:start; }
        @media (min-width:900px) { .co-inner { grid-template-columns:1fr 360px; } }
        .co-heading { font-family:'Playfair Display',serif;font-size:clamp(1.8rem,3.5vw,2.5rem);font-weight:400;font-style:italic;color:#1a4a2e;margin-bottom:2rem; }
        .co-steps { display:flex;align-items:center;gap:0;margin-bottom:2.5rem;font-family:'DM Sans',sans-serif;max-width:1100px;margin-left:auto;margin-right:auto; }
        .co-step-item { display:flex;align-items:center;gap:.5rem; }
        .co-step-num { width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.65rem;font-weight:700; }
        .co-step-num.active { background:#1a4a2e;color:#fff; }
        .co-step-num.done { background:#2d6a46;color:#fff; }
        .co-step-num.inactive { background:rgba(26,74,46,.12);color:#5a5550; }
        .co-step-label { font-size:.62rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase; }
        .co-step-label.active { color:#1a4a2e; }
        .co-step-label.inactive { color:#5a5550;opacity:.55; }
        .co-step-sep { width:40px;height:1px;background:rgba(26,74,46,.18);margin:0 .5rem;flex-shrink:0; }
        .co-card { background:#fff;border:1px solid rgba(26,74,46,.1);padding:2rem;box-sizing:border-box; }
        .co-card-title { font-family:'DM Sans',sans-serif;font-size:.65rem;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:#1a4a2e;margin-bottom:1.75rem; }
        .co-field-grid { display:grid;gap:1.25rem; }
        .co-field-grid.two { grid-template-columns:1fr 1fr; }
        @media (max-width:540px) { .co-field-grid.two { grid-template-columns:1fr; } }
        .co-field { display:flex;flex-direction:column;gap:.4rem; }
        .co-label { font-family:'DM Sans',sans-serif;font-size:.6rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#1a4a2e; }
        .co-label span { color:#c0392b;margin-left:2px; }
        .co-input,.co-select,.co-textarea { font-family:'DM Sans',sans-serif;font-size:.9rem;color:#1a4a2e;border:1px solid rgba(26,74,46,.2);background:#faf6ef;padding:.75rem 1rem;outline:none;transition:border-color .2s;width:100%;box-sizing:border-box; }
        .co-input:focus,.co-select:focus,.co-textarea:focus { border-color:#1a4a2e; }
        .co-input.error,.co-select.error { border-color:#c0392b; }
        .co-error-msg { font-family:'DM Sans',sans-serif;font-size:.62rem;color:#c0392b;margin-top:.15rem; }
        .co-select { appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%231a4a2e' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 1rem center;padding-right:2.5rem;cursor:pointer; }
        .co-textarea { resize:vertical;min-height:80px; }
        .co-pay-section { margin-top:2rem; }
        .co-pay-option { display:flex;align-items:center;gap:1rem;padding:1.25rem 1.5rem;border:2px solid #1a4a2e;background:rgba(26,74,46,.04);cursor:pointer; }
        .co-pay-radio { width:18px;height:18px;border-radius:50%;border:2px solid #1a4a2e;background:#1a4a2e;flex-shrink:0;display:flex;align-items:center;justify-content:center; }
        .co-pay-radio-dot { width:7px;height:7px;border-radius:50%;background:#fff; }
        .co-pay-label-wrap { flex:1; }
        .co-pay-label { font-family:'DM Sans',sans-serif;font-size:.8rem;font-weight:700;color:#1a4a2e; }
        .co-pay-sublabel { font-family:'DM Sans',sans-serif;font-size:.72rem;color:#5a5550;margin-top:.2rem; }
        .co-pay-icon { color:#b8893a;flex-shrink:0; }
        .co-cod-note { margin-top:1rem;padding:1rem 1.25rem;background:#f0ede6;border-left:3px solid #d4a853;font-family:'DM Sans',sans-serif;font-size:.8rem;color:#3d3d36;line-height:1.65; }
        .co-submit-btn { display:flex;align-items:center;justify-content:center;gap:.6rem;width:100%;margin-top:2rem;background:#1a4a2e;color:#fff;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:.65rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;padding:1.1rem 2rem;transition:background .22s; }
        .co-submit-btn:hover { background:#0c3320; }
        .co-submit-btn:disabled { opacity:.55;cursor:not-allowed; }
        .co-back-link { display:inline-flex;align-items:center;gap:.4rem;margin-top:.85rem;font-family:'DM Sans',sans-serif;font-size:.62rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#5a5550;text-decoration:none;transition:color .2s;cursor:pointer;background:none;border:none; }
        .co-back-link:hover { color:#1a4a2e; }
        .co-summary { background:#f2ede4;padding:2rem;border:1px solid rgba(26,74,46,.1);box-sizing:border-box; }
        .co-summary-title { font-family:'DM Sans',sans-serif;font-size:.65rem;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:#1a4a2e;margin-bottom:1.5rem; }
        .co-summary-item { display:flex;gap:1rem;align-items:flex-start;padding:.85rem 0;border-bottom:1px solid rgba(26,74,46,.08); }
        .co-summary-img { width:52px;height:52px;object-fit:cover;flex-shrink:0;border:1px solid rgba(26,74,46,.1); }
        .co-summary-item-name { font-family:'DM Sans',sans-serif;font-size:.8rem;font-weight:600;color:#1a4a2e;line-height:1.3; }
        .co-summary-item-meta { font-family:'DM Sans',sans-serif;font-size:.68rem;color:#5a5550;margin-top:.2rem; }
        .co-summary-item-price { font-family:'DM Sans',sans-serif;font-size:.82rem;font-weight:700;color:#1a4a2e;margin-left:auto;white-space:nowrap; }
        .co-summary-row { display:flex;justify-content:space-between;padding:.6rem 0;font-family:'DM Sans',sans-serif;font-size:.82rem;color:#3d3d36; }
        .co-summary-total-row { display:flex;justify-content:space-between;padding:.9rem 0 0;margin-top:.5rem;border-top:1.5px solid rgba(26,74,46,.15);font-family:'DM Sans',sans-serif;font-size:1rem;font-weight:700;color:#1a4a2e; }
        .co-review-section { margin-bottom:1.5rem; }
        .co-review-label { font-family:'DM Sans',sans-serif;font-size:.6rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#b8893a;margin-bottom:.5rem; }
        .co-review-value { font-family:'DM Sans',sans-serif;font-size:.88rem;color:#1a4a2e;line-height:1.7; }
        .co-success { display:flex;flex-direction:column;align-items:center;text-align:center;padding:5rem 2rem;max-width:560px;margin:0 auto; }
        .co-success-icon { color:#2d6a46;margin-bottom:1.5rem; }
        .co-success-title { font-family:'Playfair Display',serif;font-size:clamp(1.8rem,4vw,2.5rem);font-style:italic;color:#1a4a2e; }
        .co-success-id { font-family:'DM Sans',sans-serif;font-size:.75rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#b8893a;margin-top:.75rem; }
        .co-success-sub { font-family:'DM Sans',sans-serif;font-size:.92rem;color:#5a5550;line-height:1.8;margin-top:1.25rem;max-width:420px; }
        .co-success-note { margin-top:2rem;padding:1.25rem 1.5rem;background:#f0ede6;border:1px solid rgba(26,74,46,.12);font-family:'DM Sans',sans-serif;font-size:.8rem;color:#3d3d36;line-height:1.7;text-align:left;width:100%; }
        .co-success-note strong { color:#1a4a2e; }
        .co-success-cta { display:inline-flex;align-items:center;gap:.6rem;margin-top:2rem;background:#1a4a2e;color:#fff;text-decoration:none;font-family:'DM Sans',sans-serif;font-size:.65rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;padding:1rem 2rem;transition:background .22s; }
        .co-success-cta:hover { background:#0c3320; }
      `}</style>

      <main className="co-page">
        {step === "success" ? (
          <div className="co-success">
            <CheckCircle size={72} className="co-success-icon" />
            <h1 className="co-success-title">{t.successTitle}</h1>
            <p className="co-success-id">{t.orderId} {orderId}</p>
            <p className="co-success-sub">
              {form.firstName ? `${form.firstName}! ` : ""}{t.successSub}
            </p>
            <div className="co-success-note">
              <strong>{t.cod}</strong> — {t.successCodNote}{" "}
              <strong>{form.email}</strong>.
            </div>
            <Link href={`/${lang}/products`} className="co-success-cta">
              {t.continueShopping} <ShoppingBag size={14} />
            </Link>
          </div>
        ) : (
          <>
            <div className="co-steps">
              <div className="co-step-item">
                <span className={`co-step-num ${step === "details" ? "active" : "done"}`}>
                  {step === "review" ? <CheckCircle size={14} /> : "1"}
                </span>
                <span className={`co-step-label ${step === "details" ? "active" : "inactive"}`}>
                  {t.stepDetails}
                </span>
              </div>
              <div className="co-step-sep" />
              <div className="co-step-item">
                <span className={`co-step-num ${step === "review" ? "active" : "inactive"}`}>2</span>
                <span className={`co-step-label ${step === "review" ? "active" : "inactive"}`}>
                  {t.stepReview}
                </span>
              </div>
            </div>

            <div className="co-inner">
              <div>
                {step === "details" && (
                  <>
                    <h1 className="co-heading">{t.heading}</h1>

                    <div className="co-card" style={{ marginBottom: "1.25rem" }}>
                      <p className="co-card-title">{t.contactInfo}</p>
                      <div className="co-field-grid two">
                        <div className="co-field">
                          <label className="co-label">{t.firstName} <span>*</span></label>
                          <input className={`co-input${errors.firstName ? " error" : ""}`} value={form.firstName} onChange={(e) => change("firstName", e.target.value)} />
                          {errors.firstName && <span className="co-error-msg">{errors.firstName}</span>}
                        </div>
                        <div className="co-field">
                          <label className="co-label">{t.lastName} <span>*</span></label>
                          <input className={`co-input${errors.lastName ? " error" : ""}`} value={form.lastName} onChange={(e) => change("lastName", e.target.value)} />
                          {errors.lastName && <span className="co-error-msg">{errors.lastName}</span>}
                        </div>
                      </div>
                      <div className="co-field-grid two" style={{ marginTop: "1.25rem" }}>
                        <div className="co-field">
                          <label className="co-label">{t.email} <span>*</span></label>
                          <input type="email" className={`co-input${errors.email ? " error" : ""}`} value={form.email} onChange={(e) => change("email", e.target.value)} />
                          {errors.email && <span className="co-error-msg">{errors.email}</span>}
                        </div>
                        <div className="co-field">
                          <label className="co-label">{t.phone} <span>*</span></label>
                          <input type="tel" className={`co-input${errors.phone ? " error" : ""}`} placeholder={t.phonePlaceholder} value={form.phone} onChange={(e) => change("phone", e.target.value)} />
                          {errors.phone && <span className="co-error-msg">{errors.phone}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="co-card" style={{ marginBottom: "1.25rem" }}>
                      <p className="co-card-title">{t.deliveryAddress}</p>
                      <div className="co-field-grid">
                        <div className="co-field">
                          <label className="co-label">{t.fullAddress} <span>*</span></label>
                          <input className={`co-input${errors.address ? " error" : ""}`} placeholder={t.addressPlaceholder} value={form.address} onChange={(e) => change("address", e.target.value)} />
                          {errors.address && <span className="co-error-msg">{errors.address}</span>}
                        </div>
                        <div className="co-field">
                          <label className="co-label">{t.landmark}</label>
                          <input className="co-input" placeholder={t.landmarkPlaceholder} value={form.landmark} onChange={(e) => change("landmark", e.target.value)} />
                        </div>
                      </div>
                      <div className="co-field-grid two" style={{ marginTop: "1.25rem" }}>
                        <div className="co-field">
                          <label className="co-label">{t.city} <span>*</span></label>
                          <input className={`co-input${errors.city ? " error" : ""}`} value={form.city} onChange={(e) => change("city", e.target.value)} />
                          {errors.city && <span className="co-error-msg">{errors.city}</span>}
                        </div>
                        <div className="co-field">
                          <label className="co-label">{t.pinCode} <span>*</span></label>
                          <input className={`co-input${errors.pincode ? " error" : ""}`} maxLength={6} value={form.pincode} onChange={(e) => change("pincode", e.target.value.replace(/\D/g, ""))} />
                          {errors.pincode && <span className="co-error-msg">{errors.pincode}</span>}
                        </div>
                      </div>
                      <div className="co-field-grid" style={{ marginTop: "1.25rem" }}>
                        <div className="co-field">
                          <label className="co-label">{t.state} <span>*</span></label>
                          <select className={`co-select${errors.state ? " error" : ""}`} value={form.state} onChange={(e) => change("state", e.target.value)}>
                            <option value="">{t.selectState}</option>
                            {INDIAN_STATES.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                          {errors.state && <span className="co-error-msg">{errors.state}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="co-card">
                      <p className="co-card-title">{t.paymentMethod}</p>
                      <div className="co-pay-section">
                        <div className="co-pay-option">
                          <div className="co-pay-radio"><div className="co-pay-radio-dot" /></div>
                          <div className="co-pay-label-wrap">
                            <p className="co-pay-label">{t.cod}</p>
                            <p className="co-pay-sublabel">{t.codSub}</p>
                          </div>
                          <Truck size={22} className="co-pay-icon" />
                        </div>
                        <div className="co-cod-note">{t.codNote}</div>
                      </div>
                      <div className="co-field" style={{ marginTop: "1.25rem" }}>
                        <label className="co-label">{t.orderNotes}</label>
                        <textarea className="co-textarea" placeholder={t.orderNotesPlaceholder} value={form.notes} onChange={(e) => change("notes", e.target.value)} />
                      </div>
                      <button className="co-submit-btn" disabled={items.length === 0} onClick={() => { if (validate()) setStep("review"); }}>
                        {t.reviewOrder}
                        <ChevronDown size={15} style={{ transform: "rotate(-90deg)" }} />
                      </button>
                      {items.length === 0 && (
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".78rem", color: "#c0392b", marginTop: ".75rem" }}>
                          {t.emptyCart}{" "}
                          <Link href={`/${lang}/products`} style={{ color: "#1a4a2e" }}>{t.addProducts}</Link>
                        </p>
                      )}
                    </div>
                  </>
                )}

                {step === "review" && (
                  <>
                    <h1 className="co-heading">{t.reviewHeading}</h1>
                    <div className="co-card">
                      <div className="co-review-section">
                        <p className="co-review-label">{t.contactLabel}</p>
                        <p className="co-review-value">
                          {form.firstName} {form.lastName}<br />
                          {form.email} · {form.phone}
                        </p>
                      </div>
                      <div className="co-review-section">
                        <p className="co-review-label">{t.deliveryLabel}</p>
                        <p className="co-review-value">
                          {form.address}{form.landmark ? `, ${t.nearLabel} ${form.landmark}` : ""}<br />
                          {form.city}, {form.state} — {form.pincode}
                        </p>
                      </div>
                      <div className="co-review-section">
                        <p className="co-review-label">{t.paymentLabel}</p>
                        <p className="co-review-value">{t.cod}</p>
                      </div>
                      {form.notes && (
                        <div className="co-review-section">
                          <p className="co-review-label">{t.notesLabel}</p>
                          <p className="co-review-value">{form.notes}</p>
                        </div>
                      )}
                      <div className="co-cod-note" style={{ marginTop: "1rem" }}>
                        {t.termsNote}{" "}
                        <Link href={`/${lang}/terms`} style={{ color: "#1a4a2e", fontWeight: 700 }}>{t.termsLink}</Link>,{" "}
                        <Link href={`/${lang}/privacy`} style={{ color: "#1a4a2e", fontWeight: 700 }}>{t.privacyLink}</Link>{" "}
                        &amp;{" "}
                        <Link href={`/${lang}/returns`} style={{ color: "#1a4a2e", fontWeight: 700 }}>{t.returnsLink}</Link>.
                      </div>
                      <button className="co-submit-btn" onClick={handlePlaceOrder}>
                        {t.placeOrder} — {format(total)} (COD)
                        <Truck size={15} />
                      </button>
                      <button className="co-back-link" onClick={() => setStep("details")}>
                        {t.editDetails}
                      </button>
                    </div>
                  </>
                )}
              </div>

              <div className="co-summary">
                <p className="co-summary-title">{t.orderSummary}</p>
                {items.map((item) => (
                  <div className="co-summary-item" key={item.slug}>
                    <img src={item.image} alt={item.name} className="co-summary-img" />
                    <div>
                      <p className="co-summary-item-name">{item.name}</p>
                      <p className="co-summary-item-meta">{item.weight} × {item.quantity}</p>
                    </div>
                    <span className="co-summary-item-price">{format(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="co-summary-row" style={{ marginTop: ".75rem" }}>
                  <span>{t.subtotal}</span>
                  <span>{format(total)}</span>
                </div>
                <div className="co-summary-row">
                  <span>{t.shipping}</span>
                  <span style={{ color: "#2d6a46", fontWeight: 600 }}>{t.free}</span>
                </div>
                <div className="co-summary-row">
                  <span>{t.payment}</span>
                  <span style={{ fontWeight: 600 }}>COD</span>
                </div>
                <div className="co-summary-total-row">
                  <span>{t.total}</span>
                  <span>{format(total)}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}
