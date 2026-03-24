"use client"

import { useTranslations } from "next-intl"
import { StaticImageData } from "next/image"
import { Button, cn } from "@heroui/react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { useRouter } from "@/i18n/navigation"
import ImageGallery from "./image-gallery"

type ProjectImage = StaticImageData | string

type ProjectSpecification = {
  label: string
  value: string
}

type ProjectCardProps = {
  index: number
  id: string
  title: string
  description: string
  images: ProjectImage[]
  features: string[]
  specifications: ProjectSpecification[]
  ctaLabel?: string
  gallerySide?: "left" | "right"
}

export default function ProjectCard({
  index,
  id,
  title,
  description,
  images,
  features,
  specifications,
  ctaLabel,
  gallerySide = "right",
}: ProjectCardProps) {
  const t = useTranslations("ProjectsCard")
  const router = useRouter()

  if (images.length < 3) {
    return null
  }

  const projectNumber = String(index + 1).padStart(2, "0")
  const isGalleryLeft = gallerySide === "left"

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
          <h3 className="text-primary mb-2 text-2xl leading-tight font-bold md:mb-3 md:text-3xl">
            {title}
          </h3>
          <p className="text-text-secondary leading-sung mb-3 max-w-xl text-sm md:mb-4 md:text-base">
            {description}
          </p>

          <ul className="mb-3 grid max-w-lg grid-cols-2 gap-2 md:mb-6">
            {features.map((feature) => (
              <li
                key={feature}
                className="text-primary flex items-center gap-2 text-xs md:text-base"
              >
                <span
                  className="text-secondary flex aspect-square items-center justify-center rounded-full border border-[#E9E9E9] p-1"
                  aria-hidden
                >
                  <Check className="size-3" />
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mb-4 grid max-w-lg grid-cols-2 gap-2">
            {specifications.map((spec) => (
              <div
                key={spec.label}
                className="border-b border-[#e5e5e5] px-2 py-4"
              >
                <p className="text-text-secondary mb-2">{spec.label}</p>
                <p className="text-xs font-medium text-[#1E1E1E] md:text-sm">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>

          <div>
            {ctaLabel ? (
              <Button
                type="button"
                variant="primary"
                className="min-w-48 shrink-0 px-8 text-white max-md:w-full"
                onPress={() => router.push(`/projects/${id}`)}
              >
                {ctaLabel}
              </Button>
            ) : null}
          </div>
        </div>
        <div>
          <ImageGallery
            gallerySide={gallerySide}
            title={title}
            images={images}
          />
        </div>
      </article>
    </section>
  )
}
