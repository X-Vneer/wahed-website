"use client"

import { useTranslations } from "next-intl"
import { Button, cn } from "@heroui/react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Ripple } from "m3-ripple"
import { useRouter } from "@/i18n/navigation"
import type { PublicProject } from "@/lib/website-cms"
import ImageGallery from "./image-gallery"

type ProjectCardProps = {
  index: number
  project: PublicProject
  gallerySide?: "left" | "right"
}

export default function ProjectCard({
  index,
  project,
  gallerySide = "right",
}: ProjectCardProps) {
  const t = useTranslations("ProjectsCard")
  const tDetail = useTranslations("ProjectDetail")
  const router = useRouter()

  if (project.images.length < 3) {
    return null
  }

  const projectNumber = String(index + 1).padStart(2, "0")
  const isGalleryLeft = gallerySide === "left"

  const infoItems = [
    {
      label: tDetail("areaLabel"),
      value: project.area ? `${project.area.toLocaleString()} m²` : "",
    },
    {
      label: tDetail("statusLabel"),
      value: tDetail(`status.${project.status}`),
    },
    {
      label: tDetail("sectorLabel"),
      value: project.category ?? "",
    },
    {
      label: tDetail("deedNumberLabel"),
      value: project.deedNumber ?? "",
    },
  ].filter((item) => item.value)

  return (
    <section className="py-12 md:py-16">
      <article
        className={cn(
          "flex flex-col-reverse flex-nowrap justify-between gap-6 overflow-hidden lg:gap-10",
          isGalleryLeft ? "md:flex-row-reverse" : "md:flex-row"
        )}
      >
        <div
          className={cn(
            "flex h-full w-full max-w-xl flex-col justify-between gap-3 max-md:px-3 md:gap-4",
            isGalleryLeft
              ? "md:pe-5 lg:ltr:mr-auto lg:rtl:ml-auto"
              : "md:ps-5 lg:ltr:ml-auto lg:rtl:mr-auto"
          )}
        >
          <div className="relative mb-1 min-h-20 md:min-h-28">
            <p
              className="pointer-events-none absolute inset-0 text-7xl leading-none font-bold text-[#F1F1F1] md:text-9xl"
              aria-hidden
            >
              {projectNumber}
            </p>
            <div className="relative z-10 flex min-h-20 items-center gap-3 md:min-h-28">
              <motion.span
                className="text-secondary block w-16 md:w-24"
                aria-hidden
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.15,
                      delayChildren: 0.15,
                    },
                  },
                }}
              >
                <svg
                  viewBox="0 0 90 12"
                  className="h-3 w-full ltr:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                >
                  <motion.path
                    d="M6 1 L11 6 L6 11 L1 6 Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="currentColor"
                    variants={{
                      hidden: { pathLength: 0, opacity: 0.6 },
                      visible: {
                        pathLength: 1,
                        opacity: 1,
                        transition: {
                          duration: 0.4,
                          ease: "easeOut",
                        },
                      },
                    }}
                  />
                  <motion.path
                    d="M9 6 L90 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    variants={{
                      hidden: { pathLength: 0, opacity: 0.8 },
                      visible: {
                        pathLength: 1,
                        opacity: 1,
                        transition: {
                          duration: 0.55,
                          delay: 0.25,
                          ease: "easeOut",
                        },
                      },
                    }}
                  />
                </svg>
              </motion.span>
              <p className="text-secondary">{t("badge")}</p>
            </div>
          </div>
          <h3 className="mb-2 text-2xl leading-tight font-bold text-black md:mb-3 md:text-3xl">
            {project.title}
          </h3>
          <p className="text-text-secondary leading-sung mb-3 max-w-xl text-sm md:mb-4 md:text-base">
            {project.shortDescription ?? project.description}
          </p>

          {project.features.length > 0 && (
            <ul className="mb-3 grid max-w-lg grid-cols-2 gap-2 md:mb-4">
              {project.features.map((feature) => (
                <li
                  key={feature.id}
                  className="flex items-center gap-2 text-xs text-black md:text-base"
                >
                  <span
                    className="text-secondary flex aspect-square items-center justify-center rounded-full border border-[#E9E9E9] p-1"
                    aria-hidden
                  >
                    <Check className="size-3" />
                  </span>
                  <span>
                    {feature.label}: {feature.value}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {infoItems.length > 0 && (
            <div className="mb-4 grid max-w-lg grid-cols-2">
              {infoItems.map((item) => (
                <div
                  key={item.label}
                  className="border-b border-[#E9E9E9] px-2 py-3 md:px-3 md:py-4"
                >
                  <p className="text-text-secondary mb-1 text-xs md:text-sm">
                    {item.label}
                  </p>
                  <p className="text-sm font-medium text-black md:text-base lg:text-lg">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          )}
          <div>
            <Button
              type="button"
              variant="secondary"
              className="min-w-48 shrink-0 max-md:w-full"
              onPress={() => router.push(`/projects/${project.slug}`)}
            >
              {t("cta")}
              <Ripple />
            </Button>
          </div>
        </div>
        <div>
          <ImageGallery
            gallerySide={gallerySide}
            title={project.title}
            images={project.images}
          />
        </div>
      </article>
    </section>
  )
}
