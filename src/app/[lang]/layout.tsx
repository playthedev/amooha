import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { CartProvider } from "@/lib/cart-context";
import { CurrencyProvider } from "@/lib/currency-context";
import { hasLocale, getDictionary } from "@/lib/i18n";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }, { lang: "es" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const titles: Record<string, string> = {
    en: "Amoohaa Farms | Rooted in Goodness",
    fr: "Amoohaa Farms | Enraciné dans la Bonté",
    es: "Amoohaa Farms | Arraigado en la Bondad",
  };
  return {
    title: titles[lang] ?? titles.en,
    description:
      "Amoohaa Farms is a farm-led food and nutrition business with trusted harvest products and Power Pulz.",
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <CurrencyProvider>
            <SiteHeader lang={lang} dict={dict} />
            <div className="flex-1">{children}</div>
            <SiteFooter lang={lang} dict={dict} />
          </CurrencyProvider>
        </CartProvider>
      </body>
    </html>
  );
}
