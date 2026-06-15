import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { LanguageProvider } from "@/i18n/language-provider";
import { CurrencyProvider } from "@/currency/currency-provider";
import { CartProvider } from "@/commerce/cart-provider";
import { AuthProvider } from "@/auth/auth-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amoohaa Farms | Rooted in Goodness",
  description:
    "Amoohaa Farms is a farm-led food and nutrition business with trusted harvest products and Power Pulz.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <CurrencyProvider>
            <AuthProvider>
              <CartProvider>
                <SiteHeader />
                <div className="flex-1">{children}</div>
                <SiteFooter />
              </CartProvider>
            </AuthProvider>
          </CurrencyProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
