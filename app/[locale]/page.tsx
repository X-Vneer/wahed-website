import { Locale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import About from "./_components/about"
import Cta from "./_components/cta"
import Footer from "./_components/footer"
// import Gallery from "./_components/gallery"
import Header from "./_components/header"
import Hero from "./_components/hero"
import Partners from "./_components/partners"
import Projects from "./_components/projects"
import Statics from "./_components/statics"
import Wahed from "./_components/wahed"

type Props = { params: Promise<{ locale: string }> }

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale as Locale)

  return (
    <>
      <Header />
      <Hero />
      <Wahed />
      <About />
      <Statics />
      <Projects />
      {/* <Gallery /> */}
      <Partners />
      <Cta />
      <Footer />
    </>
  )
}
