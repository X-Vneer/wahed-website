import { type Locale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { getAboutPageContent } from "@/lib/website-cms"
import Header from "../_components/header"
import BoardOfDirectors from "./_components/board-of-directors"
import AboutHero from "./_components/hero"
import OurStory from "./_components/our-story"
import OurValues from "./_components/our-values"
import OurVision from "./_components/our-vision"

type Props = { params: Promise<{ locale: string }> }

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale as Locale)

  const aboutContent = await getAboutPageContent(locale)

  if (!aboutContent?.heroSection) {
    notFound()
  }

  return (
    <>
      <Header />
      <AboutHero content={aboutContent.heroSection} />
      <OurStory content={aboutContent.storySection} />
      <OurVision content={aboutContent.visionSection} />
      <OurValues content={aboutContent.valuesSection} />
      {aboutContent.boardSection.isActive && (
        <BoardOfDirectors content={aboutContent.boardSection} />
      )}
    </>
  )
}
