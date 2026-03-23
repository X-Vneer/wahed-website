"use client"

import { aboutImage, heroImage, projectImage } from "@/assets"
import ProjectCard from "./project-card"

type DummyProject = {
  id: string
  title: string
  description: string
  images: [typeof projectImage, typeof aboutImage, typeof heroImage]
  features: string[]
  specifications: ProjectSpecification[]
  ctaLabel: string
}

type ProjectSpecification = {
  label: string
  value: string
}

const DUMMY_PROJECTS: DummyProject[] = [
  {
    id: "al-rahmaniyah",
    title: "Al Rahmaniyah Residential Complex",
    description:
      "An engineering design that combines authenticity and modernity in spacious residential spaces with integrated amenities.",
    images: [projectImage, aboutImage, heroImage],
    features: [
      "Private recreational spaces",
      "Integrated smart home system",
      "Landscaped green gardens",
      "Underground parking",
    ],
    specifications: [
      { label: "Total project area", value: "25,000 m2" },
      { label: "Villas built area", value: "750 - 1,200 m2" },
      { label: "Project status", value: "Under construction (80%)" },
      { label: "Expected delivery", value: "Q4 2025" },
      { label: "Units count", value: "42 independent villas" },
      { label: "Amenities", value: "Health club and gardens" },
    ],
    ctaLabel: "Explore Project",
  },
  {
    id: "al-fayhaa",
    title: "Al Fayhaa Urban Villas",
    description:
      "A premium villa community designed for modern family living with a focus on comfort, privacy, and long-term value.",
    images: [aboutImage, heroImage, projectImage],
    features: [
      "Community club house",
      "Smart security integration",
      "Walking and cycling tracks",
      "Dedicated visitor parking",
    ],
    specifications: [
      { label: "Total project area", value: "18,000 m2" },
      { label: "Villas built area", value: "620 - 980 m2" },
      { label: "Project status", value: "Finishing works" },
      { label: "Expected delivery", value: "Q2 2026" },
      { label: "Units count", value: "30 independent villas" },
      { label: "Amenities", value: "Pool, gym, gardens" },
    ],
    ctaLabel: "Explore Project",
  },
]

export default function ProjectShowcase() {
  return (
    <>
      {DUMMY_PROJECTS.map((project, index) => (
        <ProjectCard
          key={project.id}
          index={index}
          title={project.title}
          description={project.description}
          features={project.features}
          specifications={project.specifications}
          images={project.images}
          ctaLabel={project.ctaLabel}
          gallerySide={index % 2 === 0 ? "left" : "right"}
        />
      ))}
    </>
  )
}
