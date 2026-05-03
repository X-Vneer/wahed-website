/* eslint-disable @next/next/no-img-element */
"use client"

import { useRef } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Button, buttonVariants } from "@heroui/react"
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { MapPin, SaudiRiyal } from "lucide-react"
import { Link } from "@/i18n/navigation"
import type { HomeProjectsSection, PublicProject } from "@/lib/website-cms"

type InfoItem = {
  label: string
  value: string
  showRiyal?: boolean
}

const easeOut = [0.25, 0.46, 0.45, 0.94] as const

const viewport = { once: true, margin: "-72px" } as const

/** Degenerate quad at inline-end × top → full rect (polygon reveal). */
const heroImageClipVisible =
  "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" as const

function heroImageClipHiddenTopEnd(isRtl: boolean): string {
  const x = isRtl ? "0%" : "100%"
  return `polygon(${x} 0%, ${x} 0%, ${x} 0%, ${x} 0%)`
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
}

const imageReveal = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: easeOut },
  },
}

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.06 },
  },
}

type ProjectsProps = {
  projects: PublicProject[]
  content: HomeProjectsSection
}

export default function Projects({ projects, content }: ProjectsProps) {
  const t = useTranslations("ProjectsSection")
  const tDetail = useTranslations("ProjectDetail")
  const locale = useLocale()
  const isRtl = locale === "ar"

  const buildInfoItems = (project: PublicProject): InfoItem[] => {
    const items: InfoItem[] = [
      {
        label: tDetail("statusLabel"),
        value: tDetail(`status.${project.status}`),
      },
    ]
    if (project.area) {
      items.push({
        label: tDetail("areaLabel"),
        value: `${project.area.toLocaleString(locale)} m²`,
      })
    }
    if (project.category) {
      items.push({
        label: tDetail("sectorLabel"),
        value: project.category,
      })
    }
    if (project.startingPrice) {
      items.push({
        label: tDetail("startingPriceLabel"),
        value: project.startingPrice.toLocaleString(locale),
        showRiyal: true,
      })
    }
    return items
  }

  const firstInfoItems = buildInfoItems(projects[0])
  const secondInfoItems = projects[1] ? buildInfoItems(projects[1]) : []
  const lineTrackRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const revealProps = prefersReducedMotion
    ? { initial: "visible" as const, animate: "visible" as const }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport,
      }

  const { scrollYProgress } = useScroll({
    target: lineTrackRef,
    offset: ["start end", "end start"],
  })
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 28,
    mass: 0.35,
  })
  const lineScaleY = useTransform(smoothProgress, [0, 1], [0, 1])

  const first = projects[0]
  const second = projects[1]

  const firstLocation =
    first.location ?? `${first.cityName}, ${first.regionName}`
  const secondLocation = second
    ? (second.location ?? `${second.cityName}, ${second.regionName}`)
    : ""

  return (
    <>
      <section className="bg-white pt-16 md:pt-20">
        <motion.header
          className="max-w-3xl px-4 md:ps-6 lg:ps-10 xl:ps-16"
          {...revealProps}
          variants={stagger}
        >
          {content.eyebrowTitle && (
            <motion.div
              className="mb-3 flex items-center gap-3"
              variants={fadeUp}
            >
              <span className="bg-secondary block h-px w-8" />
              <span className="text-secondary text-[10px] font-semibold tracking-[0.32em] uppercase md:text-xs">
                {content.eyebrowTitle}
              </span>
            </motion.div>
          )}
          {content.title && (
            <motion.h2
              className="text-3xl leading-tight font-bold text-black md:text-5xl lg:text-6xl"
              variants={fadeUp}
            >
              {content.title}
            </motion.h2>
          )}
          {content.description && (
            <motion.p
              className="text-text-secondary mt-4 max-w-2xl text-sm leading-relaxed md:mt-6 md:text-base lg:text-lg"
              variants={fadeUp}
            >
              {content.description}
            </motion.p>
          )}
        </motion.header>
      </section>
      <section className="relative overflow-x-clip bg-white py-16 md:py-20">
        <div
          ref={lineTrackRef}
          aria-hidden
          className="pointer-events-none absolute inset-s-8 bottom-0 z-0 hidden w-px md:top-56 md:block md:w-0.5 lg:top-60 lg:right-16 xl:top-64"
        >
          <span className="bg-secondary absolute top-0 right-px z-10 size-3 translate-x-1/2 rotate-45">
            {" "}
          </span>
          <motion.div
            className="bg-secondary h-full w-full origin-top"
            style={{ scaleY: lineScaleY }}
          />
        </div>
        <div className="relative z-10">
          <motion.div
            className="flex flex-col-reverse justify-between gap-6 md:flex-row md:gap-6 lg:gap-10"
            {...revealProps}
            variants={stagger}
          >
            <motion.div
              className="space-y-4 max-md:px-4 md:ps-6 md:pt-4 lg:ps-10 xl:ps-16"
              variants={stagger}
            >
              <motion.h2
                className="text-2xl font-medium text-black md:text-3xl lg:text-4xl"
                variants={fadeUp}
              >
                {first.title}
              </motion.h2>
              <motion.p
                className="leading-sung text-text-secondary text-sm font-medium md:text-base lg:text-lg"
                variants={fadeUp}
              >
                {first.shortDescription}
              </motion.p>
              <motion.div
                className="mt-6 max-w-sm space-y-5 pt-1 md:mt-9 md:ps-10 lg:mt-20 lg:ps-20"
                variants={stagger}
              >
                <motion.p
                  className="text-text-secondary flex items-center gap-2 text-sm font-medium md:text-base"
                  variants={fadeUp}
                >
                  <MapPin
                    className="text-secondary size-5 shrink-0"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <span>{firstLocation}</span>
                </motion.p>
                <motion.div
                  className="grid grid-cols-2 gap-x-6"
                  variants={stagger}
                >
                  {firstInfoItems.map((item) => (
                    <motion.div
                      key={item.label}
                      className="border-b border-[#E9E9E9] py-3"
                      variants={fadeUp}
                    >
                      <p className="text-text-secondary mb-1 text-xs font-medium md:text-sm">
                        {item.label}
                      </p>
                      <p className="inline-flex items-center gap-1 text-base font-semibold text-black md:text-lg">
                        <span>{item.value}</span>
                        {item.showRiyal && (
                          <SaudiRiyal className="size-4 shrink-0" aria-hidden />
                        )}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
                <motion.div variants={fadeUp}>
                  <Link
                    href={`/projects/${first.slug}`}
                    className="mt-6 inline-block bg-black px-10 py-2.5 text-center text-sm font-medium text-white hover:bg-black/90 md:text-base lg:mt-12"
                  >
                    {t("exploreProject")}
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              className="relative aspect-square w-full md:aspect-4/6 md:max-w-md md:max-[800px]:max-w-sm lg:max-w-lg xl:aspect-4/5 xl:max-w-xl"
              variants={imageReveal}
            >
              <motion.div
                dir="ltr"
                className="absolute top-5 right-5 z-10 flex flex-wrap items-center gap-2"
                initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
                whileInView={
                  prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={viewport}
                transition={{ duration: 0.45, ease: easeOut, delay: 0.15 }}
              >
                {first.badges.map((badge) => (
                  <span
                    key={badge.id}
                    className="px-3 py-1 text-sm font-medium text-white md:text-base"
                    style={{ backgroundColor: badge.color }}
                  >
                    {badge.name}
                  </span>
                ))}
              </motion.div>
              {first.images[0] && (
                <img
                  src={first.images[0]}
                  alt={first.title}
                  className="h-full w-full object-cover"
                />
              )}
              {first.images[1] && (
                <div className="absolute inset-e-4/6 top-7/8 z-1 hidden aspect-5/4 w-full max-w-sm md:block lg:top-5/6 lg:max-w-md">
                  <div className="bg-secondary absolute inset-e-0 top-0 z-2 size-10 translate-x-1/2 -translate-y-1/2 rotate-45 rtl:-translate-x-1/2" />
                  <motion.div
                    className="absolute inset-0 overflow-hidden"
                    initial={
                      prefersReducedMotion
                        ? false
                        : { clipPath: heroImageClipHiddenTopEnd(isRtl) }
                    }
                    whileInView={
                      prefersReducedMotion
                        ? undefined
                        : { clipPath: heroImageClipVisible }
                    }
                    viewport={viewport}
                    transition={{ duration: 0.85, ease: easeOut, delay: 0.22 }}
                  >
                    <img
                      src={first.images[1]}
                      alt={first.title}
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                </div>
              )}
            </motion.div>
          </motion.div>

          {second && (
            <>
              <div className="h-12 md:h-70 lg:h-80" aria-hidden />

              <motion.div
                className="flex flex-col gap-8 md:gap-10 md:ps-18 md:pe-10 lg:ps-30 xl:ps-36"
                {...revealProps}
                variants={stagger}
              >
                <motion.header
                  className="hidden space-y-4 pe-6 pt-4 md:block md:pe-10"
                  variants={fadeUp}
                >
                  <h2 className="text-2xl font-medium text-black md:text-3xl lg:text-4xl">
                    {second.title}
                  </h2>
                  <p className="text-text-secondary text-sm leading-snug font-medium md:text-base lg:text-lg">
                    {second.shortDescription}
                  </p>
                </motion.header>

                <motion.div
                  className="flex flex-col gap-6 md:flex-row md:gap-10 lg:items-center lg:gap-16"
                  variants={stagger}
                >
                  <motion.div
                    className="relative aspect-square w-full overflow-hidden md:aspect-5/4 md:max-w-sm md:shrink-0 lg:max-w-xl xl:max-w-2xl"
                    variants={imageReveal}
                  >
                    {second.images[0] && (
                      <img
                        src={second.images[0]}
                        alt={second.title}
                        className="h-full w-full object-cover"
                      />
                    )}
                    <motion.div
                      dir="ltr"
                      className="absolute top-4 right-4 z-1 flex flex-wrap items-center gap-2"
                      initial={
                        prefersReducedMotion ? false : { opacity: 0, y: -8 }
                      }
                      whileInView={
                        prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                      }
                      viewport={viewport}
                      transition={{
                        duration: 0.45,
                        ease: easeOut,
                        delay: 0.12,
                      }}
                    >
                      {second.badges.map((badge) => (
                        <span
                          key={badge.id}
                          className="rounded-md px-3 py-1 text-xs font-medium text-white md:text-sm"
                          style={{ backgroundColor: badge.color }}
                        >
                          {badge.name}
                        </span>
                      ))}
                    </motion.div>
                  </motion.div>
                  <motion.header
                    className="space-y-4 px-4 md:hidden"
                    variants={fadeUp}
                  >
                    <h2 className="text-2xl font-medium text-black md:text-3xl lg:text-4xl">
                      {second.title}
                    </h2>
                    <p className="text-text-secondary text-sm leading-snug font-medium md:text-base lg:text-lg">
                      {second.shortDescription}
                    </p>
                  </motion.header>

                  <motion.div
                    className="flex flex-col gap-4 max-md:px-4 md:max-w-sm lg:max-w-md"
                    variants={stagger}
                  >
                    <motion.p
                      className="text-text-secondary flex items-center gap-2 text-sm font-medium md:text-base"
                      variants={fadeUp}
                    >
                      <MapPin
                        className="size-5 shrink-0 text-[#FF8C42]"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      <span>{secondLocation}</span>
                    </motion.p>
                    <motion.div
                      className="grid grid-cols-2 gap-x-6"
                      variants={stagger}
                    >
                      {secondInfoItems.map((item) => (
                        <motion.div
                          key={item.label}
                          className="border-b border-[#E9E9E9] py-3"
                          variants={fadeUp}
                        >
                          <p className="text-text-secondary mb-1 text-xs font-medium md:text-sm">
                            {item.label}
                          </p>
                          <p className="inline-flex items-center gap-1 text-base font-semibold text-black md:text-lg">
                            <span>{item.value}</span>
                            {item.showRiyal && (
                              <SaudiRiyal
                                className="size-4 shrink-0"
                                aria-hidden
                              />
                            )}
                          </p>
                        </motion.div>
                      ))}
                    </motion.div>
                    <motion.div variants={fadeUp}>
                      <Link
                        href={`/projects/${second.slug}`}
                        className={buttonVariants({
                          size: "lg",
                          // variant: "secondary",
                          className:
                            "mt-6 w-full bg-black text-white hover:bg-black/90",
                        })}
                      >
                        {t("exploreProject")}
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </>
          )}

          <motion.div
            className="mt-14 flex justify-center px-4 md:mt-20"
            {...revealProps}
            variants={fadeUp}
          >
            <Link
              href="/projects"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className:
                  "group min-w-56 border-black px-10 text-black hover:bg-black hover:text-white",
              })}
            >
              <span>{t("allProjects")}</span>
              <span
                aria-hidden
                className="inline-flex transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
              >
                →
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
