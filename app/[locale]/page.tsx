import { Locale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import AboutSection from "./components/about-section"
import Hero from "./components/hero"
import PreviewSection from "./components/preview-section"

type Props = { params: Promise<{ locale: Locale }> }

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Hero />
      <PreviewSection />
      <AboutSection />
    </>
  )
}
