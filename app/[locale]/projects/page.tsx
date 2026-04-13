import type { Metadata } from "next"
import { type Locale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import {
  buildMetadataFromSeo,
  getPageSeo,
  getProjectsPageContent,
  getPublicProjects,
  getSiteSettings,
} from "@/lib/website-cms"
import Header from "../_components/header"
import ProjectsHero from "./_components/hero"
import ProjectsIntro from "./_components/intro"
import ProjectShowcase from "./_components/project-showcase"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const [seo, settings] = await Promise.all([
    getPageSeo("projects", locale),
    getSiteSettings(locale),
  ])
  return buildMetadataFromSeo(seo, settings) as Metadata
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale as Locale)

  const [projects, content] = await Promise.all([
    getPublicProjects(locale),
    getProjectsPageContent(locale),
  ])

  return (
    <>
      <Header />
      {content?.heroSection && (
        <ProjectsHero content={content.heroSection} />
      )}
      {content?.introSection && (
        <ProjectsIntro content={content.introSection} />
      )}
      <ProjectShowcase projects={projects} />
    </>
  )
}
