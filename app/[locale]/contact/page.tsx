import PageShadow from "@/components/common/page-shadow"
import Header from "../_components/header"
import Contact from "./_components/contact"
import ContactHero from "./_components/hero"

const Page = () => {
  return (
    <>
      <Header variant="dark" />
      <PageShadow />
      <ContactHero />
      <Contact />
    </>
  )
}

export default Page
