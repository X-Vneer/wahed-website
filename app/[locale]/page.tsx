import { Locale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import Header from "./_components/header"
import Hero from "./_components/hero"
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
    </>
  )
}
