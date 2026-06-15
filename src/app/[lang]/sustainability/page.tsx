import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, BadgeCheck, Leaf, Recycle, ScanSearch,
  Sprout, TreePine, Users, Handshake, TrendingUp,
} from "lucide-react";

type LangKey = "en" | "fr" | "es";

const strings: Record<LangKey, {
  kicker: string; heroTitle: string; heroSub: string; partnerCta: string; storyCta: string;
  commitmentsHint: string; positionKicker: string; positionQuote: string;
  positionText1: string; positionText2: string;
  frameworkKicker: string; frameworkTitle: string;
  principlesKicker: string; impactKicker: string; impactTitle: string; impactBody: string;
  fssaiTitle: string; fssaiSub: string; standardTitle: string; standardSub: string;
  farmQuote: string; workKicker: string; workTitle: string; workBody: string;
  getInTouch: string; readStory: string;
  contactHref: string; introHref: string;
}> = {
  en: {
    kicker: "Stewardship", heroTitle: "Growth that keeps the farm, family, and future in view.",
    heroSub: "Amoohaa Farms treats sustainability as a business discipline: better sourcing, smarter packaging, clearer communication, and long-term value for farmers, partners, and customers.",
    partnerCta: "Partner with us", storyCta: "Our story", commitmentsHint: "Our commitments",
    positionKicker: "Our Position",
    positionQuote: '"Sustainability isn\'t a campaign for us. It\'s the operating standard that connects every farm decision to every product on shelf."',
    positionText1: "From the soil our ingredients grow in, to the packaging that reaches a household, every step is a deliberate choice — and one we're accountable for.",
    positionText2: "We share this framework publicly because we believe responsible businesses should be legible ones.",
    frameworkKicker: "Framework", frameworkTitle: "Four commitments.\nOne standard.",
    principlesKicker: "Guiding Principles", impactKicker: "Impact", impactTitle: "Accountability in numbers",
    impactBody: "These aren't aspirational targets — they reflect where Amoohaa Farms stands today, and the standard we hold ourselves to as we grow.",
    fssaiTitle: "FSSAI aligned — every product, every batch", fssaiSub: "No exceptions to our ingredient and labelling standard.",
    standardTitle: "One shared farm standard across all brands", standardSub: "Power Pulz and future lines all trace back to the same origin benchmark.",
    farmQuote: '"From the soil to the shelf — traceable, honest, responsible."',
    workKicker: "Work with us", workTitle: "Interested in responsible sourcing?",
    workBody: "If you're a farmer, distributor, or brand looking to work with an ingredient-led business, we'd like to hear from you.",
    getInTouch: "Get in touch", readStory: "Read our story",
    contactHref: "contact", introHref: "introduction",
  },
  fr: {
    kicker: "Intendance", heroTitle: "Une croissance qui garde la ferme, la famille et l'avenir en vue.",
    heroSub: "Amoohaa Farms traite la durabilité comme une discipline commerciale : un meilleur approvisionnement, un emballage plus intelligent, une communication plus claire et une valeur à long terme pour les agriculteurs, les partenaires et les clients.",
    partnerCta: "Devenir partenaire", storyCta: "Notre histoire", commitmentsHint: "Nos engagements",
    positionKicker: "Notre position",
    positionQuote: "« La durabilité n'est pas une campagne pour nous. C'est le standard opérationnel qui relie chaque décision agricole à chaque produit en rayon. »",
    positionText1: "Du sol où poussent nos ingrédients à l'emballage qui arrive dans un foyer, chaque étape est un choix délibéré — et nous en sommes responsables.",
    positionText2: "Nous partageons ce cadre publiquement parce que nous croyons que les entreprises responsables doivent être lisibles.",
    frameworkKicker: "Cadre", frameworkTitle: "Quatre engagements.\nUn standard.",
    principlesKicker: "Principes directeurs", impactKicker: "Impact", impactTitle: "Responsabilité en chiffres",
    impactBody: "Ce ne sont pas des objectifs ambitieux — ils reflètent où se situe Amoohaa Farms aujourd'hui et le standard auquel nous nous tenons en grandissant.",
    fssaiTitle: "Aligné FSSAI — chaque produit, chaque lot", fssaiSub: "Aucune exception à notre standard d'ingrédients et d'étiquetage.",
    standardTitle: "Un standard agricole partagé sur toutes les marques", standardSub: "Power Pulz et les futures gammes tracent tous au même benchmark d'origine.",
    farmQuote: "« Du sol à l'étagère — traçable, honnête, responsable. »",
    workKicker: "Travailler avec nous", workTitle: "Intéressé par un approvisionnement responsable ?",
    workBody: "Si vous êtes agriculteur, distributeur ou marque cherchant à travailler avec une entreprise axée sur les ingrédients, nous aimerions vous entendre.",
    getInTouch: "Nous contacter", readStory: "Lire notre histoire",
    contactHref: "contact", introHref: "introduction",
  },
  es: {
    kicker: "Gestión responsable", heroTitle: "Un crecimiento que mantiene la granja, la familia y el futuro en la mira.",
    heroSub: "Amoohaa Farms trata la sostenibilidad como una disciplina empresarial: mejor abastecimiento, envases más inteligentes, comunicación más clara y valor a largo plazo para agricultores, socios y clientes.",
    partnerCta: "Sé nuestro socio", storyCta: "Nuestra historia", commitmentsHint: "Nuestros compromisos",
    positionKicker: "Nuestra posición",
    positionQuote: '"La sostenibilidad no es una campaña para nosotros. Es el estándar operativo que conecta cada decisión agrícola con cada producto en el estante."',
    positionText1: "Desde el suelo donde crecen nuestros ingredientes hasta el envase que llega a un hogar, cada paso es una elección deliberada — y somos responsables de ella.",
    positionText2: "Compartimos este marco públicamente porque creemos que las empresas responsables deben ser legibles.",
    frameworkKicker: "Marco", frameworkTitle: "Cuatro compromisos.\nUn estándar.",
    principlesKicker: "Principios rectores", impactKicker: "Impacto", impactTitle: "Responsabilidad en números",
    impactBody: "No son objetivos aspiracionales — reflejan dónde está Amoohaa Farms hoy y el estándar al que nos medimos mientras crecemos.",
    fssaiTitle: "Alineado con FSSAI — cada producto, cada lote", fssaiSub: "Sin excepciones a nuestro estándar de ingredientes y etiquetado.",
    standardTitle: "Un estándar agrícola compartido en todas las marcas", standardSub: "Power Pulz y las futuras líneas se remontan al mismo benchmark de origen.",
    farmQuote: '"Del suelo al estante — trazable, honesto, responsable."',
    workKicker: "Trabaja con nosotros", workTitle: "¿Interesado en el abastecimiento responsable?",
    workBody: "Si eres agricultor, distribuidor o marca que busca trabajar con un negocio orientado a los ingredientes, nos gustaría escucharte.",
    getInTouch: "Contactar", readStory: "Leer nuestra historia",
    contactHref: "contact", introHref: "introduction",
  },
};

const commitmentsData: Record<LangKey, { number: string; title: string; body: string }[]> = {
  en: [
    { number: "01", title: "Responsible Sourcing", body: "We build long-term relationships with farmers and suppliers, ensuring every ingredient is grown and traded with honesty, fairness, and care." },
    { number: "02", title: "Waste Discipline", body: "From product formulation to packaging decisions, we ask hard questions about what is necessary — and reduce what isn't." },
    { number: "03", title: "Transparent Communication", body: "Our farm-to-brand journey is something we openly share — so customers and partners understand exactly what they're buying and why." },
    { number: "04", title: "Long-Term Value", body: "Growth that respects people, land, and future opportunity. We measure success not just in revenue, but in lasting relationships." },
  ],
  fr: [
    { number: "01", title: "Approvisionnement responsable", body: "Nous établissons des relations à long terme avec les agriculteurs et les fournisseurs, garantissant que chaque ingrédient est cultivé et commercialisé avec honnêteté, équité et soin." },
    { number: "02", title: "Discipline des déchets", body: "De la formulation des produits aux décisions d'emballage, nous posons des questions difficiles sur ce qui est nécessaire — et réduisons ce qui ne l'est pas." },
    { number: "03", title: "Communication transparente", body: "Notre parcours de la ferme à la marque est quelque chose que nous partageons ouvertement — pour que les clients et partenaires comprennent exactement ce qu'ils achètent et pourquoi." },
    { number: "04", title: "Valeur à long terme", body: "Une croissance qui respecte les personnes, la terre et les opportunités futures. Nous mesurons le succès non seulement en revenus, mais en relations durables." },
  ],
  es: [
    { number: "01", title: "Abastecimiento responsable", body: "Construimos relaciones a largo plazo con agricultores y proveedores, asegurando que cada ingrediente se cultive y comercialice con honestidad, equidad y cuidado." },
    { number: "02", title: "Disciplina de residuos", body: "Desde la formulación de productos hasta las decisiones de envasado, hacemos preguntas difíciles sobre lo que es necesario — y reducimos lo que no lo es." },
    { number: "03", title: "Comunicación transparente", body: "Nuestro viaje de la granja a la marca es algo que compartimos abiertamente — para que clientes y socios entiendan exactamente qué compran y por qué." },
    { number: "04", title: "Valor a largo plazo", body: "Crecimiento que respeta a las personas, la tierra y las oportunidades futuras. Medimos el éxito no solo en ingresos, sino en relaciones duraderas." },
  ],
};

const principlesData: Record<LangKey, { title: string; body: string }[]> = {
  en: [
    { title: "Soil to shelf", body: "Every product decision traces back to the source — how it was grown, where, and by whom." },
    { title: "Farmer first", body: "We don't treat sourcing as a transaction. Fair pricing and long partnerships are non-negotiable." },
    { title: "Partner trust", body: "Distributors and retailers carry our products knowing the standard behind every batch." },
    { title: "Measured growth", body: "Expansion happens when it can be done responsibly — not just when it's profitable." },
  ],
  fr: [
    { title: "Du sol à l'étagère", body: "Chaque décision produit remonte à la source — comment il a été cultivé, où et par qui." },
    { title: "L'agriculteur d'abord", body: "Nous ne traitons pas l'approvisionnement comme une transaction. La fixation équitable des prix et les partenariats durables sont non négociables." },
    { title: "Confiance des partenaires", body: "Les distributeurs et détaillants portent nos produits en connaissant le standard derrière chaque lot." },
    { title: "Croissance mesurée", body: "L'expansion se fait quand elle peut être réalisée de manière responsable — pas seulement quand c'est rentable." },
  ],
  es: [
    { title: "Del suelo al estante", body: "Cada decisión de producto se remonta a la fuente — cómo se cultivó, dónde y por quién." },
    { title: "El agricultor primero", body: "No tratamos el abastecimiento como una transacción. Los precios justos y las asociaciones duraderas son innegociables." },
    { title: "Confianza del socio", body: "Distribuidores y minoristas llevan nuestros productos sabiendo el estándar detrás de cada lote." },
    { title: "Crecimiento medido", body: "La expansión ocurre cuando puede hacerse de manera responsable — no solo cuando es rentable." },
  ],
};

const principleIcons = [TreePine, Users, Handshake, TrendingUp];
const commitmentIcons = [Sprout, Recycle, ScanSearch, Leaf];

const impactMetrics = [
  { value: "100%", label: "Traceable ingredient standard" },
  { value: "500+", label: "Farm families connected" },
  { value: "3+", label: "States sourced from" },
  { value: "01", label: "Shared quality benchmark" },
];

type PageProps = { params: Promise<{ lang: string }> };

export default async function SustainabilityPage({ params }: PageProps) {
  const { lang } = await params;
  const t = strings[(lang as LangKey)] ?? strings.en;
  const commitments = commitmentsData[(lang as LangKey)] ?? commitmentsData.en;
  const principles = principlesData[(lang as LangKey)] ?? principlesData.en;

  return (
    <main className="bg-[var(--paper)] text-[var(--ink)]">

      <section className="relative overflow-hidden bg-[var(--leaf-dark)] py-32 text-white">
        <Image
          src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1600&q=80"
          alt="Hands holding fresh farm harvest"
          fill priority sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(10,77,44,0.97)_0%,rgba(10,77,44,0.75)_50%,rgba(10,77,44,0.15)_100%)]" />
        <div className="absolute left-0 right-0 top-0 h-px bg-white/10" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[var(--wheat)]" />
            <span className="label-caps text-[var(--wheat)] tracking-[0.24em]">{t.kicker}</span>
          </div>
          <h1 className="display-serif mt-7 max-w-4xl text-5xl font-normal leading-[1.08] sm:text-6xl lg:text-7xl">
            {t.heroTitle}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/76">{t.heroSub}</p>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Link href={`/${lang}/${t.contactHref}`} className="inline-flex h-13 items-center justify-center gap-3 bg-[var(--wheat)] px-8 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--leaf-dark)] transition hover:brightness-105">
              {t.partnerCta} <ArrowRight size={15} />
            </Link>
            <Link href={`/${lang}/${t.introHref}`} className="inline-flex h-13 items-center justify-center border border-white/28 px-8 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white transition hover:bg-white/8 hover:border-white/55">
              {t.storyCta}
            </Link>
          </div>
          <div className="mt-20 flex items-center gap-3 text-white/35">
            <div className="h-px w-10 bg-white/20" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em]">{t.commitmentsHint}</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/8" />
      </section>

      <section className="bg-[var(--cream)] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-[var(--wheat-deep)]" />
                <span className="label-caps text-[var(--wheat-deep)] tracking-[0.22em]">{t.positionKicker}</span>
              </div>
              <p className="display-serif mt-5 text-3xl font-normal leading-snug text-[var(--leaf-dark)] sm:text-4xl">
                {t.positionQuote}
              </p>
            </div>
            <div className="lg:col-span-5 lg:pl-10">
              <div className="border-l-2 border-[var(--wheat)] pl-6">
                <p className="text-[14px] leading-8 text-[var(--stone)]">{t.positionText1}</p>
                <p className="mt-4 text-[14px] leading-8 text-[var(--stone)]">{t.positionText2}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--paper)] px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14">
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-[var(--wheat-deep)]" />
              <span className="label-caps text-[var(--wheat-deep)] tracking-[0.22em]">{t.frameworkKicker}</span>
            </div>
            <h2 className="display-serif mt-3 text-4xl font-normal sm:text-5xl" style={{ whiteSpace: "pre-line" }}>
              {t.frameworkTitle}
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {commitments.map(({ number, title, body }, i) => {
              const Icon = commitmentIcons[i];
              return (
                <article key={title} className="group relative flex flex-col border border-[var(--line)] bg-[var(--cream)] p-10 transition-all duration-300 hover:border-[var(--wheat)] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-900/6">
                  <div className="absolute top-0 left-0 h-0.5 w-0 bg-[var(--wheat)] transition-all duration-500 group-hover:w-full" />
                  <div className="flex items-start justify-between">
                    <span className="display-serif text-6xl font-normal leading-none text-[var(--wheat-deep)]/50">{number}</span>
                    <div className="flex h-13 w-13 items-center justify-center border border-[var(--wheat)]/40 bg-[var(--wheat)]/8 text-[var(--leaf-dark)] transition-colors group-hover:border-[var(--wheat)] group-hover:bg-[var(--wheat)]/15">
                      <Icon size={22} />
                    </div>
                  </div>
                  <div className="my-7 h-px w-full bg-[var(--line)] transition-colors group-hover:bg-[var(--wheat)]/30" />
                  <h2 className="text-[13px] font-extrabold uppercase tracking-[0.18em] text-[var(--leaf-dark)]">{title}</h2>
                  <p className="mt-4 flex-1 text-[14px] leading-8 text-[var(--stone)]">{body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[var(--wheat)] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-center gap-3">
            <span className="h-px w-6 bg-[var(--leaf-dark)]/30" />
            <span className="label-caps text-[var(--leaf-dark)]/55 tracking-[0.22em]">{t.principlesKicker}</span>
          </div>
          <div className="grid gap-px bg-[var(--leaf-dark)]/10 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map(({ title, body }, i) => {
              const Icon = principleIcons[i];
              return (
                <div key={title} className="group flex flex-col bg-[var(--wheat)] p-8 transition-colors hover:bg-[var(--leaf-dark)]">
                  <div className="mb-6 flex h-11 w-11 items-center justify-center border border-[var(--leaf-dark)]/20 bg-[var(--leaf-dark)]/8 text-[var(--leaf-dark)] transition-colors group-hover:border-[var(--wheat)]/30 group-hover:bg-[var(--wheat)]/10 group-hover:text-[var(--wheat)]">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[var(--leaf-dark)] transition-colors group-hover:text-white">{title}</h3>
                  <p className="mt-3 text-[13px] leading-7 text-[var(--leaf-dark)]/60 transition-colors group-hover:text-white/60">{body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[var(--leaf-dark)] px-5 py-24 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-[var(--wheat)]" />
                <span className="label-caps text-[var(--wheat)] tracking-[0.22em]">{t.impactKicker}</span>
              </div>
              <h2 className="display-serif mt-3 text-4xl font-normal sm:text-5xl">{t.impactTitle}</h2>
            </div>
            <div className="lg:col-span-7 lg:pl-10">
              <p className="text-[14px] leading-8 text-white/55">{t.impactBody}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-px bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
            {impactMetrics.map(({ value, label }) => (
              <div key={label} className="flex min-h-40 flex-col justify-between bg-[var(--leaf-dark)] p-6 sm:min-h-52 sm:p-8 lg:p-10">
                <p className="display-serif text-4xl font-normal leading-none text-[var(--wheat)] sm:text-5xl lg:text-6xl">{value}</p>
                <div className="mt-6 sm:mt-8">
                  <div className="mb-3 h-px w-8 bg-[var(--wheat)]/30" />
                  <p className="label-caps max-w-[13rem] text-[10px] tracking-[0.18em] text-white/50">{label}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="flex items-center gap-6 border border-white/8 bg-white/4 p-8">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[var(--wheat)]/25 bg-[var(--wheat)]/8">
                <BadgeCheck size={22} className="text-[var(--wheat)]" />
              </div>
              <div>
                <p className="text-[13px] font-extrabold uppercase tracking-[0.16em] text-white">{t.fssaiTitle}</p>
                <p className="mt-1.5 text-[12px] leading-6 text-white/45">{t.fssaiSub}</p>
              </div>
            </div>
            <div className="flex items-center gap-6 border border-white/8 bg-white/4 p-8">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[var(--wheat)]/25 bg-[var(--wheat)]/8">
                <Sprout size={22} className="text-[var(--wheat)]" />
              </div>
              <div>
                <p className="text-[13px] font-extrabold uppercase tracking-[0.16em] text-white">{t.standardTitle}</p>
                <p className="mt-1.5 text-[12px] leading-6 text-white/45">{t.standardSub}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative h-80 overflow-hidden bg-[var(--leaf-dark)] sm:h-96 lg:h-[440px]">
        <Image
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80"
          alt="Amoohaa farm fields at dusk"
          fill sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,77,44,0.55),rgba(10,77,44,0.15),rgba(10,77,44,0.55))]" />
        <div className="relative z-10 flex h-full items-center justify-center px-5 text-center">
          <div>
            <p className="display-serif text-3xl font-normal text-white sm:text-4xl lg:text-5xl">{t.farmQuote}</p>
            <div className="mx-auto mt-5 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[var(--wheat)]/60" />
              <span className="label-caps text-[11px] text-[var(--wheat)] tracking-[0.22em]">Amoohaa Farms</span>
              <span className="h-px w-8 bg-[var(--wheat)]/60" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 border border-[var(--line)] bg-[var(--paper)] p-10 sm:flex-row sm:items-center sm:justify-between lg:p-14">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-[var(--wheat-deep)]" />
                <span className="label-caps text-[var(--wheat-deep)] tracking-[0.22em]">{t.workKicker}</span>
              </div>
              <h2 className="display-serif mt-3 text-3xl font-normal sm:text-4xl">{t.workTitle}</h2>
              <p className="mt-4 max-w-lg text-[14px] leading-7 text-[var(--stone)]">{t.workBody}</p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:items-end">
              <Link href={`/${lang}/${t.contactHref}`} className="inline-flex h-13 items-center justify-center gap-3 bg-[var(--leaf-dark)] px-8 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white transition hover:bg-[var(--leaf)]">
                {t.getInTouch} <ArrowRight size={15} />
              </Link>
              <Link href={`/${lang}/${t.introHref}`} className="inline-flex h-10 items-center justify-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[var(--leaf-dark)] transition hover:text-[var(--leaf)]">
                {t.readStory} <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
