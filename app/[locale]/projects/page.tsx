import { type Locale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { getPublicProjects } from "@/lib/website-cms"
import Header from "../_components/header"
import ProjectsHero from "./_components/hero"
import ProjectsIntro from "./_components/intro"
import ProjectShowcase from "./_components/project-showcase"

type Props = { params: Promise<{ locale: string }> }

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale as Locale)

  const projects = await getPublicProjects(locale)
  console.log(projects)

  return (
    <>
      <Header />
      <ProjectsHero />
      <ProjectsIntro />
      <ProjectShowcase projects={projects} />
    </>
  )
}
