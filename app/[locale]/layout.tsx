import type { Metadata } from "next"
import { Locale, NextIntlClientProvider } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { cn } from "@heroui/react"
import { GoogleAnalytics } from "@next/third-parties/google"
import "m3-ripple/ripple.css"
import { ibmPlexSansArabic, satoshi } from "@/assets/font"
import { routing } from "@/i18n/routing"
import {
  buildMetadataFromSeo,
  DEFAULT_THEME,
  getSiteSettings,
} from "@/lib/website-cms"
import "../globals.css"
import Footer from "./_components/footer"
import Providers from "./providers"

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const settings = await getSiteSettings(locale)
  return buildMetadataFromSeo(null, settings) as Metadata
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }
  setRequestLocale(locale as Locale)

  const [messages, settings] = await Promise.all([
    getMessages(),
    getSiteSettings(locale),
  ])

  const theme = settings?.theme ?? DEFAULT_THEME
  const logos = settings?.logos ?? {
    forDarkBackground: "",
    forLightBackground: "",
  }
  const contact = settings?.contact ?? { email: "", phone: "", whatsapp: "" }
  const socialMedia = settings?.socialMedia ?? {
    facebook: "",
    instagram: "",
    youtube: "",
    x: "",
  }
  const siteName = settings?.siteName ?? ""
  const footerDescription = settings?.footerDescription ?? ""
  const gaId = settings?.googleAnalyticsMeasurementId || ""

  const themeCss = `:root,.light,.default,[data-theme="light"],[data-theme="default"]{--primary:${theme.primaryColor};--black:${theme.blackColor};--secondary:${theme.accentColor};--text-secondary:${theme.secondaryTextColor};--accent:${theme.accentColor};--focus:${theme.accentColor};}`

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className="light">
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeCss }} />
      </head>
      {gaId && <GoogleAnalytics gaId={gaId} />}
      <body>
        <div
          className={cn(
            `${satoshi.variable} ${ibmPlexSansArabic.variable} text-white antialiased`,
            locale === "en" ? satoshi.className : ibmPlexSansArabic.className
          )}
        >
          <NextIntlClientProvider messages={messages}>
            <Providers
              siteSettings={{
                siteName,
                footerDescription,
                theme,
                logos,
                contact,
                socialMedia,
              }}
            >
              {children}
              <Footer />
            </Providers>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  )
}
