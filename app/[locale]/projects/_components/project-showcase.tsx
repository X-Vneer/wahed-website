"use client"

import { useTranslations } from "next-intl"
import type { PublicProject } from "@/lib/website-cms"
import ProjectCard from "./project-card"

type Props = {
  projects: PublicProject[]
}

export default function ProjectShowcase({ projects }: Props) {
  const t = useTranslations("ProjectShowcase")

  if (projects.length === 0) {
    return (
      <section className="bg-white py-20 md:py-28">
        <div className="container text-center">
          <p className="text-text-secondary text-lg">{t("empty")}</p>
        </div>
      </section>
    )
  }

  return (
    <>
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          index={index}
          project={project}
          gallerySide={index % 2 === 0 ? "left" : "right"}
        />
      ))}
    </>
  )
}
