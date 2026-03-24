import { Locale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { aboutImage, heroImage, projectImage, projectsHero } from "@/assets"
import PageShadow from "@/components/common/page-shadow"
import Header from "../../_components/header"
import ImageGallery from "./_components/image-gallery"
import ProjectPageIntro from "./_components/project-page-intro"

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

const PROJECTS_CONTENT = {
  "al-rahmaniyah": {
    tag: "مجمع سكني",
    title: "مجمع الريحانة السكني",
    location: "مجمع الفيحاء - الدمام",
    statusLabel: "حالة المشروع",
    statusValue: "متاح للحجز",
    startingPriceLabel: "الأسعار تبدأ من",
    startingPriceValue: "20.000$",
    guideLabel: "دليل المشروع",
    images: [projectsHero, projectImage, aboutImage, heroImage, projectsHero],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  "al-fayhaa": {
    tag: "مجمع سكني",
    title: "فلل الفيحاء الحضرية",
    location: "حي الفيحاء - الدمام",
    statusLabel: "حالة المشروع",
    statusValue: "متاح للحجز",
    startingPriceLabel: "الأسعار تبدأ من",
    startingPriceValue: "18.500$",
    guideLabel: "دليل المشروع",
    images: [aboutImage, heroImage, projectImage, projectsHero, aboutImage],
  },
} as const

export default async function ProjectDetailsPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale as Locale)

  const project = PROJECTS_CONTENT[slug as keyof typeof PROJECTS_CONTENT]

  if (!project) {
    notFound()
  }

  return (
    <>
      <Header variant="dark" />
      <PageShadow />

      <ProjectPageIntro {...project} />
      <ImageGallery
        title={project.title}
        images={project.images}
        videoUrl={"videoUrl" in project ? project.videoUrl : undefined}
      />
    </>
  )
}
