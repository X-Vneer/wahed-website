import { type Locale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import PageShadow from "@/components/common/page-shadow"
import { getContactPageContent } from "@/lib/website-cms"
import Header from "../_components/header"
import Contact from "./_components/contact"
import ContactHero from "./_components/hero"

type Props = { params: Promise<{ locale: string }> }

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale as Locale)

  const contactContent = await getContactPageContent(locale)

  if (!contactContent?.heroSection) {
    notFound()
  }

  return (
    <>
      <Header variant="dark" />
      <PageShadow />
      <ContactHero content={contactContent.heroSection} />
      <Contact content={contactContent.infoSection} />
    </>
  )
}
