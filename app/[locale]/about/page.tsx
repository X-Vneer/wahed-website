import { Locale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
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

  return (
    <>
      <Header />
      <AboutHero />
      <OurStory />
      <OurVision />
      <OurValues />
      <BoardOfDirectors />
    </>
  )
}
