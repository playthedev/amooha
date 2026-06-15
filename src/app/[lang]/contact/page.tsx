"use client";

import {
  type CSSProperties, type ReactNode, type RefObject,
  useEffect, useRef, useState,
} from "react";
import { useParams } from "next/navigation";
import { ArrowRight, BadgeCheck, BriefcaseBusiness, Building2, Leaf, Mail, MapPin, Phone, Send, Sprout } from "lucide-react";

type LangKey = "en" | "fr" | "es";

const strings: Record<LangKey, {
  eyebrow: string; title: string; subtitle: string;
  enquiryTypes: string[]; formItems: string[];
  details: { label: string; value: string }[];
  form: { eyebrow: string; title: string; name: string; company: string; email: string; message: string; type: string; submit: string; sending: string; successTitle: string; successBody: string; another: string; types: string[]; };
  estate: { eyebrow: string; title: string; badge: string };
  partnership: string; sourcing: string; produce: string;
}> = {
  en: {
    eyebrow: "Established Excellence", title: "Start a refined farm-to-brand conversation.",
    subtitle: "For premium sourcing, product partnerships, B2B trade, and agriculture collaborations — Amoohaa Farms keeps every enquiry close to the people who understand the land.",
    enquiryTypes: ["Raw Products", "Brand Partnership", "B2B Sourcing"],
    formItems: ["Premium produce", "White-label sourcing", "Retail distribution"],
    details: [{ label: "Email Us", value: "partnerships@amoohaa.com" }, { label: "Call Us", value: "+91 (562) 285-0044" }, { label: "Visit The Estate", value: "Agra-Mathura Highway, Agra" }],
    form: { eyebrow: "Contact form", title: "Tell us what you want to build.", name: "Full Name", company: "Company", email: "Email Address", message: "Your Message", type: "Enquiry Type", submit: "Submit Enquiry", sending: "Sending…", successTitle: "Enquiry sent!", successBody: "Thank you for reaching out. Our team will get back to you within 1–2 business days.", another: "Send Another Enquiry", types: ["Raw Products", "Brand Partnership", "B2B Sourcing", "Media", "Other"] },
    estate: { eyebrow: "Located in the heart of Uttar Pradesh", title: "The Amoohaa Estate", badge: "Partnership enquiries open" },
    partnership: "Partnership desk", sourcing: "Sourcing, trade & brand growth.", produce: "A premium enquiry path for buyers, distributors, partners, and collaborators.",
  },
  fr: {
    eyebrow: "Excellence établie", title: "Démarrez une conversation raffinée de la ferme à la marque.",
    subtitle: "Pour l'approvisionnement premium, les partenariats produits et le commerce B2B — Amoohaa Farms traite chaque demande avec les personnes qui comprennent la terre.",
    enquiryTypes: ["Produits bruts", "Partenariat de marque", "Approvisionnement B2B"],
    formItems: ["Produits premium", "Sourcing marque blanche", "Distribution retail"],
    details: [{ label: "Écrivez-nous", value: "partnerships@amoohaa.com" }, { label: "Appelez-nous", value: "+91 (562) 285-0044" }, { label: "Visitez le domaine", value: "Agra-Mathura Highway, Agra" }],
    form: { eyebrow: "Formulaire de contact", title: "Dites-nous ce que vous voulez construire.", name: "Nom complet", company: "Entreprise", email: "E-mail", message: "Votre message", type: "Type de demande", submit: "Envoyer", sending: "Envoi…", successTitle: "Demande envoyée !", successBody: "Merci de nous avoir contactés. Notre équipe vous répondra sous 1-2 jours.", another: "Envoyer une autre demande", types: ["Produits bruts", "Partenariat", "B2B", "Médias", "Autre"] },
    estate: { eyebrow: "Au cœur de l'Uttar Pradesh", title: "Le Domaine Amoohaa", badge: "Demandes de partenariat ouvertes" },
    partnership: "Bureau des partenariats", sourcing: "Approvisionnement, commerce & croissance.", produce: "Un chemin d'enquête premium pour les acheteurs, distributeurs et partenaires.",
  },
  es: {
    eyebrow: "Excelencia establecida", title: "Inicia una conversación refinada de granja a marca.",
    subtitle: "Para abastecimiento premium, asociaciones de productos y comercio B2B — Amoohaa Farms mantiene cada consulta cerca de quienes entienden la tierra.",
    enquiryTypes: ["Productos brutos", "Asociación de marca", "Abastecimiento B2B"],
    formItems: ["Productos premium", "Abastecimiento marca blanca", "Distribución minorista"],
    details: [{ label: "Escríbenos", value: "partnerships@amoohaa.com" }, { label: "Llámanos", value: "+91 (562) 285-0044" }, { label: "Visita el campo", value: "Agra-Mathura Highway, Agra" }],
    form: { eyebrow: "Formulario de contacto", title: "Cuéntanos qué quieres construir.", name: "Nombre completo", company: "Empresa", email: "Correo electrónico", message: "Tu mensaje", type: "Tipo de consulta", submit: "Enviar consulta", sending: "Enviando…", successTitle: "¡Consulta enviada!", successBody: "Gracias por contactarnos. Nuestro equipo te responderá en 1-2 días.", another: "Enviar otra consulta", types: ["Productos brutos", "Asociación", "B2B", "Medios", "Otro"] },
    estate: { eyebrow: "En el corazón de Uttar Pradesh", title: "El Campo Amoohaa", badge: "Consultas de asociación abiertas" },
    partnership: "Área de asociaciones", sourcing: "Abastecimiento, comercio & crecimiento.", produce: "Una ruta de consulta premium para compradores, distribuidores y socios.",
  },
};

const detailIcons = [Mail, Phone, MapPin];
const enquiryIcons = [Sprout, BriefcaseBusiness, Building2];
const estateImage = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80";
const produceImage = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80";

function useInView(threshold = 0.1): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, style = {} }: { children: ReactNode; delay?: number; style?: CSSProperties }) {
  const [ref, visible] = useInView();
  return <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(22px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, ...style }}>{children}</div>;
}

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactPage() {
  const params = useParams<{ lang: string }>();
  const lang = params.lang ?? "en";
  const t = strings[(lang as LangKey)] ?? strings.en;

  const [heroImg, setHeroImg] = useState(false);
  const [produceImg, setProduceImg] = useState(false);
  const [formImg, setFormImg] = useState(false);
  const [footerImg, setFooterImg] = useState(false);

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [enquiryType, setEnquiryType] = useState(t.form.types[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company, email, enquiryType, message }),
      });
      const data = await res.json() as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setStatus("success");
      setName(""); setCompany(""); setEmail(""); setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send.");
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .cp-hero{position:relative;overflow:hidden;padding:6rem 1.5rem 7rem;background:#fbf6e8;box-sizing:border-box}
        @media(min-width:640px){.cp-hero{padding:8rem 2rem 9rem}}
        .cp-hero-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity 1s ease}
        .cp-hero-bg.loaded{opacity:.14}
        .cp-hero-overlay{position:absolute;inset:0;background:linear-gradient(100deg,rgba(251,246,232,.97)0%,rgba(251,246,232,.88)52%,rgba(219,233,196,.72)100%)}
        .cp-hero-grain{position:absolute;inset:0;opacity:.025;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:180px;pointer-events:none}
        .cp-hero-inner{position:relative;z-index:2;max-width:1200px;margin:0 auto;display:grid;gap:4rem;align-items:center}
        @media(min-width:1024px){.cp-hero-inner{grid-template-columns:1fr 1fr}}
        .cp-hero-eyebrow{font-family:'DM Sans',sans-serif;font-size:.62rem;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:#b8893a;display:block}
        .cp-hero-title{font-family:'Playfair Display',Georgia,serif;font-size:clamp(2.4rem,6vw,5rem);font-weight:400;font-style:italic;line-height:1.1;color:#1a4a2e;margin-top:1.25rem;max-width:640px}
        .cp-hero-title em{font-style:normal;color:#b8893a}
        .cp-hero-sub{font-family:'DM Sans',sans-serif;font-size:clamp(.9rem,1.6vw,1.05rem);font-weight:300;color:#5a5550;line-height:1.85;margin-top:1.5rem;max-width:540px}
        .cp-enq-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:.75rem;margin-top:2.5rem;max-width:520px}
        @media(max-width:480px){.cp-enq-grid{grid-template-columns:1fr;max-width:260px}}
        .cp-enq-card{border:1px solid rgba(26,74,46,.13);background:rgba(255,255,255,.6);backdrop-filter:blur(8px);padding:1.25rem 1rem;box-sizing:border-box}
        .cp-enq-card svg{color:#b8893a}
        .cp-enq-label{font-family:'DM Sans',sans-serif;font-size:.6rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#1a4a2e;display:block;margin-top:1rem}
        .cp-produce-wrap{position:relative;min-height:520px;overflow:hidden;box-shadow:0 32px 80px rgba(10,40,22,.18)}
        .cp-produce-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .9s ease}
        .cp-produce-img.loaded{opacity:1}
        .cp-produce-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,42,22,.04)0%,rgba(10,42,22,.86)100%)}
        .cp-produce-text{position:absolute;inset-x:0;bottom:0;padding:2.5rem;color:#fff;box-sizing:border-box}
        .cp-produce-eyebrow{font-family:'DM Sans',sans-serif;font-size:.6rem;font-weight:700;letter-spacing:.26em;text-transform:uppercase;color:#d4a853;display:block}
        .cp-produce-title{font-family:'Playfair Display',Georgia,serif;font-size:clamp(1.8rem,3.5vw,3rem);font-weight:400;font-style:italic;line-height:1.15;margin-top:.75rem}
        .cp-produce-sub{font-family:'DM Sans',sans-serif;font-size:.95rem;font-weight:300;color:rgba(255,255,255,.72);line-height:1.75;margin-top:.75rem;max-width:420px}
        .cp-details-section{background:#f7f3ec;padding:5rem 1.5rem;box-sizing:border-box}
        .cp-details-grid{max-width:1200px;margin:0 auto;display:grid;gap:1px;background:rgba(26,74,46,.08)}
        @media(min-width:768px){.cp-details-grid{grid-template-columns:repeat(3,1fr)}}
        .cp-detail-card{background:#faf6ef;padding:2.5rem 2.25rem;box-sizing:border-box;transition:background .28s;cursor:default}
        .cp-detail-card:hover{background:#fff}
        .cp-detail-card::before{content:'';display:block;width:100%;height:3px;background:linear-gradient(to right,#d4a853,#4a9163);transform:scaleX(0);transform-origin:left;transition:transform .4s ease;margin-bottom:2rem}
        .cp-detail-card:hover::before{transform:scaleX(1)}
        .cp-detail-icon{display:flex;align-items:center;justify-content:center;width:52px;height:52px;border:1px solid rgba(212,168,83,.5);color:#b8893a}
        .cp-detail-label{font-family:'DM Sans',sans-serif;font-size:.6rem;font-weight:700;letter-spacing:.26em;text-transform:uppercase;color:#5a5550;opacity:.7;display:block;margin-top:1.75rem}
        .cp-detail-value{font-family:'DM Sans',sans-serif;font-size:clamp(.95rem,1.5vw,1.1rem);font-weight:600;color:#1a4a2e;display:block;margin-top:.6rem;line-height:1.45;letter-spacing:.02em}
        .cp-form-section{background:#faf6ef;padding:0 1.5rem 6rem;box-sizing:border-box}
        .cp-form-wrap{max-width:1200px;margin:0 auto;overflow:hidden;display:grid;box-shadow:0 24px 80px rgba(10,40,22,.1);border:1px solid rgba(26,74,46,.1)}
        @media(min-width:1024px){.cp-form-wrap{grid-template-columns:.82fr 1.18fr}}
        .cp-form-left{position:relative;min-height:420px;background:#1a4a2e;padding:3rem 2.5rem;color:#fff;display:flex;flex-direction:column;justify-content:space-between;gap:3rem;box-sizing:border-box;overflow:hidden}
        .cp-form-estate-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity 1s ease}
        .cp-form-estate-img.loaded{opacity:.38}
        .cp-form-left-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,42,22,.18)0%,rgba(8,33,17,.92)100%)}
        .cp-form-left-top{position:relative;z-index:2}
        .cp-form-left-eyebrow{font-family:'DM Sans',sans-serif;font-size:.6rem;font-weight:700;letter-spacing:.26em;text-transform:uppercase;color:#d4a853;display:block}
        .cp-form-left-title{font-family:'Playfair Display',Georgia,serif;font-size:clamp(1.8rem,3vw,2.8rem);font-weight:400;font-style:italic;line-height:1.2;margin-top:1rem}
        .cp-form-left-items{position:relative;z-index:2;display:grid;gap:.6rem}
        .cp-form-left-item{display:flex;align-items:center;gap:.75rem;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.06);padding:.85rem 1.1rem;font-family:'DM Sans',sans-serif;font-size:.65rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.82)}
        .cp-form-left-item svg{color:#d4a853;flex-shrink:0}
        .cp-form-right{position:relative;background:#fff;padding:3rem 2.5rem;box-sizing:border-box;overflow:hidden}
        @media(min-width:640px){.cp-form-right{padding:4rem 3.5rem}}
        .cp-form-deco{position:absolute;top:2rem;right:2rem;color:rgba(26,74,46,.06);pointer-events:none}
        .cp-form-corner{position:absolute;top:0;right:0;width:120px;height:120px;background:rgba(45,106,70,.05)}
        .cp-form-grid{position:relative;z-index:2;display:grid;gap:2.5rem}
        .cp-form-row{display:grid;gap:2.5rem}
        @media(min-width:640px){.cp-form-row{grid-template-columns:1fr 1fr}}
        .cp-field{display:block}
        .cp-field-label,.cp-select-label,.cp-textarea-label{font-family:'DM Sans',sans-serif;font-size:.6rem;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:#5a5550;opacity:.75;display:block}
        .cp-field-input,.cp-select,.cp-textarea{display:block;width:100%;margin-top:.75rem;border:none;border-bottom:1.5px solid rgba(26,74,46,.15);background:transparent;padding:.65rem 0;font-family:'DM Sans',sans-serif;font-size:.97rem;font-weight:400;color:#1c1a17;outline:none;transition:border-color .22s;box-sizing:border-box;-webkit-appearance:none;appearance:none}
        .cp-field-input:focus,.cp-select:focus,.cp-textarea:focus{border-color:#d4a853}
        .cp-field-input::placeholder,.cp-textarea::placeholder{color:rgba(90,85,80,.35);font-weight:300}
        .cp-textarea{min-height:120px;resize:none}
        .cp-select-wrap{position:relative}
        .cp-select-wrap::after{content:'▾';position:absolute;right:0;top:50%;transform:translateY(-50%);font-size:.7rem;color:#b8893a;pointer-events:none}
        .cp-submit{display:inline-flex;align-items:center;gap:.75rem;background:#1a4a2e;color:#fff;border:none;cursor:pointer;padding:1.1rem 2.5rem;font-family:'DM Sans',sans-serif;font-size:.65rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;transition:background .22s}
        .cp-submit:hover{background:#d4a853;color:#1a4a2e}
        .cp-submit svg{transition:transform .2s}
        .cp-submit:hover svg{transform:translateX(4px)}
        .cp-estate{position:relative;min-height:480px;background:#1a4a2e;display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden}
        .cp-estate-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity 1s ease}
        .cp-estate-img.loaded{opacity:.5}
        .cp-estate-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,42,22,.25)0%,rgba(8,33,17,.88)100%)}
        .cp-estate-content{position:relative;z-index:2;padding:5rem 1.5rem;box-sizing:border-box}
        .cp-estate-eyebrow{font-family:'DM Sans',sans-serif;font-size:.6rem;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:#d4a853;display:block}
        .cp-estate-title{font-family:'Playfair Display',Georgia,serif;font-size:clamp(2.5rem,6vw,4.5rem);font-weight:400;font-style:italic;color:#fff;margin-top:1.25rem;line-height:1.1}
        .cp-estate-pill{display:inline-flex;align-items:center;gap:.75rem;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.07);padding:.9rem 1.6rem;margin-top:2.5rem;font-family:'DM Sans',sans-serif;font-size:.62rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#fff}
        .cp-estate-pill svg{color:#d4a853}
      `}</style>

      <main>
        <section className="cp-hero">
          <img src={estateImage} alt="Golden agricultural fields" className={`cp-hero-bg${heroImg ? " loaded" : ""}`} onLoad={() => setHeroImg(true)} />
          <div className="cp-hero-overlay" />
          <div className="cp-hero-grain" />
          <div className="cp-hero-inner">
            <FadeIn>
              <div>
                <span className="cp-hero-eyebrow">{t.eyebrow}</span>
                <h1 className="cp-hero-title">{t.title}</h1>
                <p className="cp-hero-sub">{t.subtitle}</p>
                <div className="cp-enq-grid">
                  {t.enquiryTypes.map((label, i) => {
                    const Icon = enquiryIcons[i];
                    return (
                      <div key={label} className="cp-enq-card">
                        <Icon size={22} />
                        <span className="cp-enq-label">{label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div style={{ position: "relative" }}>
                <div className="cp-produce-wrap">
                  <img src={produceImage} alt="Premium farm produce" className={`cp-produce-img${produceImg ? " loaded" : ""}`} onLoad={() => setProduceImg(true)} />
                  <div className="cp-produce-overlay" />
                  <div className="cp-produce-text">
                    <span className="cp-produce-eyebrow">{t.partnership}</span>
                    <h2 className="cp-produce-title">{t.sourcing}</h2>
                    <p className="cp-produce-sub">{t.produce}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <FadeIn>
          <section className="cp-details-section">
            <div className="cp-details-grid">
              {t.details.map(({ label, value }, i) => {
                const Icon = detailIcons[i];
                return (
                  <article key={label} className="cp-detail-card">
                    <div className="cp-detail-icon"><Icon size={22} /></div>
                    <span className="cp-detail-label">{label}</span>
                    <span className="cp-detail-value">{value}</span>
                  </article>
                );
              })}
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section className="cp-form-section">
            <div className="cp-form-wrap">
              <div className="cp-form-left">
                <img src={estateImage} alt="Agricultural estate" className={`cp-form-estate-img${formImg ? " loaded" : ""}`} onLoad={() => setFormImg(true)} />
                <div className="cp-form-left-overlay" />
                <div className="cp-form-left-top">
                  <span className="cp-form-left-eyebrow">{t.form.eyebrow}</span>
                  <h2 className="cp-form-left-title">{t.form.title}</h2>
                </div>
                <div className="cp-form-left-items">
                  {t.formItems.map((item) => (
                    <div key={item} className="cp-form-left-item"><Leaf size={15} />{item}</div>
                  ))}
                </div>
              </div>

              <div className="cp-form-right">
                <div className="cp-form-corner" />
                <div className="cp-form-deco"><Send size={88} /></div>
                {status === "success" ? (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 340, textAlign: "center", position: "relative", zIndex: 2 }}>
                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#e8f5e9", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2d6a46" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontStyle: "italic", color: "#1a4a2e", margin: 0 }}>{t.form.successTitle}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: ".92rem", color: "#5a5550", marginTop: ".75rem", lineHeight: 1.7, maxWidth: 340 }}>{t.form.successBody}</p>
                    <button onClick={() => setStatus("idle")} className="cp-submit" style={{ marginTop: "2rem" }}>{t.form.another}</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="cp-form-grid">
                      <div className="cp-form-row">
                        <label className="cp-field">
                          <span className="cp-field-label">{t.form.name}<span style={{ color: "#c0392b", marginLeft: 2 }}>*</span></span>
                          <input type="text" className="cp-field-input" placeholder="e.g. Raghav Sharma" value={name} onChange={(e) => setName(e.target.value)} required />
                        </label>
                        <label className="cp-field">
                          <span className="cp-field-label">{t.form.company}</span>
                          <input type="text" className="cp-field-input" placeholder="e.g. Heritage Foods Ltd." value={company} onChange={(e) => setCompany(e.target.value)} />
                        </label>
                      </div>
                      <div className="cp-form-row">
                        <label className="cp-field">
                          <span className="cp-field-label">{t.form.email}<span style={{ color: "#c0392b", marginLeft: 2 }}>*</span></span>
                          <input type="email" className="cp-field-input" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </label>
                        <div>
                          <span className="cp-select-label">{t.form.type}</span>
                          <div className="cp-select-wrap">
                            <select className="cp-select" value={enquiryType} onChange={(e) => setEnquiryType(e.target.value)}>
                              {t.form.types.map((opt) => <option key={opt}>{opt}</option>)}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div>
                        <span className="cp-textarea-label">{t.form.message}<span style={{ color: "#c0392b", marginLeft: 2 }}>*</span></span>
                        <textarea className="cp-textarea" placeholder="Tell us about your requirements…" value={message} onChange={(e) => setMessage(e.target.value)} required />
                      </div>
                      {status === "error" && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: ".82rem", color: "#c0392b", marginTop: "-.5rem" }}>{errorMsg}</p>}
                      <div>
                        <button className="cp-submit" type="submit" disabled={status === "sending"} style={{ opacity: status === "sending" ? 0.65 : 1, cursor: status === "sending" ? "not-allowed" : "pointer" }}>
                          {status === "sending" ? t.form.sending : t.form.submit}
                          {status !== "sending" && <ArrowRight size={15} />}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section className="cp-estate">
            <img src={estateImage} alt="Amoohaa Farms estate" className={`cp-estate-img${footerImg ? " loaded" : ""}`} onLoad={() => setFooterImg(true)} />
            <div className="cp-estate-overlay" />
            <div className="cp-estate-content">
              <span className="cp-estate-eyebrow">{t.estate.eyebrow}</span>
              <h2 className="cp-estate-title">{t.estate.title}</h2>
              <div><span className="cp-estate-pill"><BadgeCheck size={17} />{t.estate.badge}</span></div>
            </div>
          </section>
        </FadeIn>
      </main>
    </>
  );
}
