"use client"

import { useRef } from "react"
import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { MapPin } from "lucide-react"
import { projectImage, heroImage, projectsHero } from "@/assets"
import { Link } from "@/i18n/navigation"

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

export default function Projects() {
  const t = useTranslations("ProjectsSection")
  const locale = useLocale()
  const isRtl = locale === "ar"
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

  return (
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
              مجمع الرحمانية السكني
            </motion.h2>
            <motion.p
              className="leading-sung text-text-secondary text-sm font-medium md:text-base lg:text-lg"
              variants={fadeUp}
            >
              مجمع سكني متكامل صُمم ليمنحك أسلوب حياة أكثر راحة وجودة
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
                <span>{t("featuredLocation")}</span>
              </motion.p>
              <motion.p
                className="border-secondary text-start text-base leading-[1.7] text-black max-md:border-s-2 max-md:ps-6 lg:text-lg"
                variants={fadeUp}
              >
                {t("featuredDetailDescription")}
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link
                  href="/projects/al-rahmaniyah"
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
              <span className="bg-[#6C9FB8] px-3 py-1 text-sm font-medium text-white md:text-base">
                {t("projectOneAccentBadge")}
              </span>
              <span className="bg-secondary px-3 py-1 text-sm font-medium text-white md:text-base">
                {t("projectOneTopBadge")}
              </span>
            </motion.div>
            <Image
              src={projectsHero}
              alt={t("projectAlt", { name: t("projectName") })}
              fill
              className="h-full w-full object-cover"
            />
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
                <Image
                  src={heroImage}
                  alt={t("projectAlt", { name: t("projectName") })}
                  fill
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
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
              {t("projectTwoTitle")}
            </h2>
            <p className="text-text-secondary text-sm leading-snug font-medium md:text-base lg:text-lg">
              {t("projectTwoTagline")}
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
              <Image
                src={projectImage}
                alt={t("projectAlt", { name: t("projectTwoTitle") })}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 42rem, 100vw"
              />
              <motion.div
                dir="ltr"
                className="absolute top-4 right-4 z-1 flex flex-wrap items-center gap-2"
                initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
                whileInView={
                  prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={viewport}
                transition={{ duration: 0.45, ease: easeOut, delay: 0.12 }}
              >
                <span className="rounded-md bg-[#00d2be] px-3 py-1 text-xs font-medium text-white md:text-sm">
                  {t("projectTwoAccentBadge")}
                </span>
                <span className="rounded-md bg-[#2ecc71] px-3 py-1 text-xs font-medium text-white md:text-sm">
                  {t("projectTwoTopBadge")}
                </span>
              </motion.div>
            </motion.div>
            <motion.header
              className="space-y-4 px-4 md:hidden"
              variants={fadeUp}
            >
              <h2 className="text-2xl font-medium text-black md:text-3xl lg:text-4xl">
                {t("projectTwoTitle")}
              </h2>
              <p className="text-text-secondary text-sm leading-snug font-medium md:text-base lg:text-lg">
                {t("projectTwoTagline")}
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
                <span>{t("featuredLocation")}</span>
              </motion.p>
              <motion.p
                className="border-secondary text-justify text-base leading-[1.7] text-black max-md:border-s-2 max-md:ps-6 lg:text-lg"
                variants={fadeUp}
              >
                {t("featuredTwoDetailDescription")}
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link
                  href="/projects"
                  className="mt-6 inline-block w-fit bg-[#222222] px-10 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-black/90 md:text-base lg:mt-12"
                >
                  {t("exploreProject")}
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
