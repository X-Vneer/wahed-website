import type { Metadata } from "next"
import { type Locale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import {
  buildMetadataFromSeo,
  getFeaturedProjects,
  getHomePageContent,
  getPageSeo,
  getSiteSettings,
} from "@/lib/website-cms"
import About from "./_components/about"
import Cta from "./_components/cta"
import Header from "./_components/header"
// import Gallery from "./_components/gallery"
import Hero from "./_components/hero"
import Partners from "./_components/partners"
import Projects from "./_components/projects"
import Statics from "./_components/statics"
import Wahed from "./_components/wahed"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const [seo, settings] = await Promise.all([
    getPageSeo("home", locale),
    getSiteSettings(locale),
  ])
  return buildMetadataFromSeo(seo, settings) as Metadata
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale as Locale)

  const [homeContent, featuredProjects] = await Promise.all([
    getHomePageContent(locale),
    getFeaturedProjects(locale),
  ])

  if (!homeContent?.heroSection) {
    notFound()
  }

  return (
    <>
      <Header />
      <Hero content={homeContent.heroSection} />
      <Wahed content={homeContent.briefSection} />
      <About content={homeContent.aboutSection} />
      {homeContent.statsSection.isActive && (
        <Statics content={homeContent.statsSection} />
      )}
      {featuredProjects.length > 0 && (
        <Projects projects={featuredProjects} />
      )}
      {homeContent.partnersSection.isActive && (
        <Partners content={homeContent.partnersSection} />
      )}
      <Cta content={homeContent.contactSection} />
    </>
  )
}
