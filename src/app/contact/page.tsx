import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Leaf,
  Mail,
  MapPin,
  Phone,
  Send,
  Sprout,
} from "lucide-react";

const estateImage =
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80";

const produceImage =
  "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80";

const details = [
  { label: "Email Us", value: "partnerships@amoohaa.com", icon: Mail },
  { label: "Call Us", value: "+91 (562) 285-0044", icon: Phone },
  { label: "Visit The Estate", value: "Agra-Mathura Highway, Agra", icon: MapPin },
];

const enquiryTypes = [
  { label: "Raw Products", icon: Sprout },
  { label: "Brand Partnership", icon: BriefcaseBusiness },
  { label: "B2B Sourcing", icon: Building2 },
];

export default function ContactPage() {
  return (
    <main className="bg-[var(--cream)] text-[var(--ink)]">
      <section className="section-shell grain-layer relative overflow-hidden py-24 lg:py-28">
        <Image
          src={estateImage}
          alt="Golden agricultural fields"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 z-0 object-cover opacity-18"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#fbf6e8_0%,rgba(251,246,232,0.88)_52%,rgba(219,233,196,0.72)_100%)]" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex flex-col justify-center">
            <span className="label-caps text-[var(--wheat-deep)]">
              Established excellence
            </span>
            <h1 className="display-serif mt-6 max-w-3xl text-6xl font-normal leading-tight sm:text-7xl lg:text-8xl">
              Start a refined farm-to-brand conversation.
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-9 text-[var(--stone)]">
              For premium sourcing, product partnerships, B2B trade, and
              agriculture collaborations, Amoohaa Farms keeps every enquiry close to
              the people who understand the land.
            </p>
            <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
              {enquiryTypes.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="border border-[var(--line)] bg-white/55 p-5 backdrop-blur"
                >
                  <Icon className="text-[var(--wheat-deep)]" size={23} />
                  <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--leaf-dark)]">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative min-h-[560px] overflow-hidden border border-white/70 bg-[var(--paper)] shadow-2xl shadow-green-950/12">
              <Image
                src={produceImage}
                alt="Premium farm produce"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,77,44,0.02),rgba(10,77,44,0.82))]" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white sm:p-10">
                <span className="label-caps text-[var(--wheat)]">
                  Partnership desk
                </span>
                <h2 className="display-serif mt-4 max-w-xl text-5xl font-normal">
                  Sourcing, trade and brand growth.
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-white/78">
                  A premium enquiry path for buyers, distributors, partners,
                  and collaborators.
                </p>
              </div>
            </div>
            <div className="absolute -bottom-8 -left-8 hidden border border-[var(--line)] bg-[var(--paper)] p-6 shadow-xl shadow-green-950/10 lg:block">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center bg-[var(--leaf-soft)] text-[var(--leaf-dark)]">
                  <BadgeCheck size={23} />
                </span>
                <div>
                  <p className="label-caps text-[var(--wheat-deep)]">Open</p>
                  <p className="font-extrabold uppercase tracking-[0.12em] text-[var(--leaf-dark)]">
                    Trade enquiries
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-[var(--paper)] py-24 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          {details.map(({ label, value, icon: Icon }) => (
            <article
              key={label}
              className="group border border-[var(--line)] bg-[var(--cream)] p-8 transition hover:border-[var(--wheat)] hover:bg-white"
            >
              <span className="flex h-14 w-14 items-center justify-center border border-[var(--wheat)] text-[var(--wheat-deep)]">
                <Icon size={23} />
              </span>
              <p className="label-caps mt-10 text-[var(--stone)]">{label}</p>
              <p className="mt-4 text-xl font-extrabold uppercase tracking-[0.08em] text-[var(--leaf-dark)]">
                {value}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell bg-[var(--cream)] pb-28">
        <div className="mx-auto grid max-w-7xl overflow-hidden border border-[var(--line)] bg-[var(--paper)] shadow-2xl shadow-green-950/10 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="relative min-h-[420px] bg-[var(--leaf-dark)] p-10 text-white">
            <Image
              src={estateImage}
              alt="Agricultural estate"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,77,44,0.16),rgba(10,77,44,0.9))]" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <span className="label-caps text-[var(--wheat)]">
                  Contact form
                </span>
                <h2 className="display-serif mt-5 text-5xl font-normal">
                  Tell us what you want to build.
                </h2>
              </div>
              <div className="grid gap-4">
                {["Premium produce", "White-label sourcing", "Retail distribution"].map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 border border-white/14 bg-white/8 px-4 py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-white/86"
                    >
                      <Leaf size={16} className="text-[var(--wheat)]" />
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          <form className="relative overflow-hidden p-8 md:p-12 lg:p-14">
            <div className="absolute right-0 top-0 h-40 w-40 bg-[var(--leaf-soft)] opacity-50" />
            <div className="absolute right-9 top-9 text-[var(--leaf-dark)]/12">
              <Send size={92} />
            </div>
            <div className="relative z-10 grid gap-10">
              <div className="grid gap-10 md:grid-cols-2">
                <Field label="Full Name" placeholder="e.g. Raghav Sharma" />
                <Field label="Company" placeholder="e.g. Heritage Foods Ltd." />
              </div>
              <div className="grid gap-10 md:grid-cols-2">
                <Field label="Email Address" placeholder="name@company.com" />
                <label className="label-caps block text-[var(--stone)]">
                  Enquiry Type
                  <select className="mt-3 w-full border-0 border-b border-[var(--line)] bg-transparent px-0 py-3 text-base font-medium normal-case tracking-normal text-[var(--ink)] outline-none focus:border-[var(--wheat)]">
                    <option>Raw Products</option>
                    <option>Brand Partnership</option>
                    <option>B2B Sourcing</option>
                    <option>Media</option>
                  </select>
                </label>
              </div>
              <label className="label-caps block text-[var(--stone)]">
                Your Message
                <textarea
                  className="mt-3 min-h-36 w-full resize-none border-0 border-b border-[var(--line)] bg-transparent px-0 py-3 text-base font-medium normal-case tracking-normal text-[var(--ink)] outline-none focus:border-[var(--wheat)]"
                  placeholder="Tell us about your requirements..."
                />
              </label>
              <button className="inline-flex w-full items-center justify-center gap-3 bg-[var(--wheat)] px-12 py-5 text-sm font-extrabold uppercase tracking-[0.18em] text-[var(--leaf-dark)] transition hover:brightness-105 md:w-fit">
                Submit Enquiry
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="relative min-h-[520px] overflow-hidden bg-[var(--leaf-dark)] text-center text-white">
        <Image
          src={estateImage}
          alt="Amoohaa Farms estate"
          fill
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,77,44,0.2),rgba(10,77,44,0.9))]" />
        <div className="section-shell relative z-10 flex min-h-[520px] items-center justify-center">
          <div>
            <span className="label-caps text-[var(--wheat)]">
              Located in the heart of Uttar Pradesh
            </span>
            <h2 className="display-serif mt-5 text-5xl font-normal sm:text-6xl">
              The Amoohaa Estate
            </h2>
            <div className="mx-auto mt-10 flex w-fit items-center gap-3 border border-white/18 bg-white/8 px-6 py-4 text-sm font-extrabold uppercase tracking-[0.18em] text-white">
              <BadgeCheck size={18} className="text-[var(--wheat)]" />
              Partnership enquiries open
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="label-caps block text-[var(--stone)]">
      {label}
      <input
        className="mt-3 w-full border-0 border-b border-[var(--line)] bg-transparent px-0 py-3 text-base font-medium normal-case tracking-normal text-[var(--ink)] outline-none focus:border-[var(--wheat)]"
        placeholder={placeholder}
      />
    </label>
  );
}
