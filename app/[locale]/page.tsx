import { Locale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import HeroUITest from "./hero-ui-test"

type Props = { params: Promise<{ locale: Locale }> }

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return <HeroUITest />
}
