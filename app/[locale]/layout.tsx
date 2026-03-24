import type { Metadata } from "next"
import { Locale, NextIntlClientProvider } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { cn } from "@heroui/react"
import "m3-ripple/ripple.css"
import { ibmPlexSansArabic, satoshi } from "@/assets/font"
import { routing } from "@/i18n/routing"
import "../globals.css"
import Footer from "./_components/footer"
import Providers from "./providers"

export const metadata: Metadata = {
  title: "Wahed",
  description: "Wahed",
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }
  setRequestLocale(locale as Locale)

  const messages = await getMessages()

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className="light">
      <body>
        <div
          className={cn(
            `${satoshi.variable} ${ibmPlexSansArabic.variable} text-white antialiased`,
            locale === "en" ? satoshi.className : ibmPlexSansArabic.className
          )}
        >
          <NextIntlClientProvider messages={messages}>
            <Providers>
              {children}
              <Footer />
            </Providers>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  )
}
