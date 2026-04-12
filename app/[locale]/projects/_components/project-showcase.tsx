"use client"

import type { PublicProject } from "@/lib/website-cms"
import ProjectCard from "./project-card"

type Props = {
  projects: PublicProject[]
}

export default function ProjectShowcase({ projects }: Props) {
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
