import { Locale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import About from "./_components/about"
import Gallery from "./_components/gallery"
import Header from "./_components/header"
import Hero from "./_components/hero"
import Partners from "./_components/partners"
import Projects from "./_components/projects"
import Wahed from "./_components/wahed"

type Props = { params: Promise<{ locale: Locale }> }

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Header />
      <Hero />
      <Wahed />
      <About />
      <Projects />
      <Gallery />
      <Partners />
    </>
  )
}
