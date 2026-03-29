"use client"

import { useRef } from "react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { MapPin } from "lucide-react"
import { projectImage, heroImage, projectsHero } from "@/assets"
import { Link } from "@/i18n/navigation"

export default function Projects() {
  const t = useTranslations("ProjectsSection")
  const lineTrackRef = useRef<HTMLDivElement>(null)

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
        className="pointer-events-none absolute top-64 right-16 bottom-0 z-0 w-px md:w-0.5"
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
        <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:gap-10">
          <div className="space-y-4 max-md:px-4 md:ps-6 md:pt-4 lg:ps-10 xl:ps-16">
            <h2 className="text-2xl font-medium text-black md:text-3xl lg:text-4xl">
              مجمع الرحمانية السكني
            </h2>
            <p className="leading-sung text-text-secondary text-sm font-medium md:text-base lg:text-lg">
              مجمع سكني متكامل صُمم ليمنحك أسلوب حياة أكثر راحة وجودة
            </p>
            <div className="mt-6 max-w-sm space-y-5 pt-1 md:mt-9 md:ps-12 lg:mt-20 lg:ps-20">
              <p className="text-text-secondary flex items-center gap-2 text-sm font-medium md:text-base">
                <MapPin
                  className="text-secondary size-5 shrink-0"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <span>{t("featuredLocation")}</span>
              </p>
              <p className="border-secondary text-start text-base leading-[1.7] text-black max-md:border-s-2 max-md:ps-6 lg:text-lg">
                {t("featuredDetailDescription")}
              </p>
              <Link
                href="/projects/al-rahmaniyah"
                className="mt-6 inline-block bg-black px-10 py-2.5 text-center text-sm font-medium text-white hover:bg-black/90 md:text-base lg:mt-12"
              >
                {t("exploreProject")}
              </Link>
            </div>
          </div>
          <div className="relative aspect-square w-full md:aspect-4/6 md:max-w-md lg:max-w-lg xl:aspect-4/5 xl:max-w-xl">
            <div
              dir="ltr"
              className="absolute top-5 right-5 z-10 flex flex-wrap items-center gap-2"
            >
              <span className="bg-[#6C9FB8] px-3 py-1 text-sm font-medium text-white md:text-base">
                {t("projectOneAccentBadge")}
              </span>
              <span className="bg-secondary px-3 py-1 text-sm font-medium text-white md:text-base">
                {t("projectOneTopBadge")}
              </span>
            </div>
            <Image
              src={projectsHero}
              alt={t("projectAlt", { name: t("projectName") })}
              fill
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-e-4/6 top-5/6 z-1 hidden aspect-5/4 w-full max-w-sm bg-red-500 md:block lg:max-w-md">
              <div className="bg-secondary absolute inset-e-0 top-0 z-1 size-10 -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
              <Image
                src={heroImage}
                alt={t("projectAlt", { name: t("projectName") })}
                fill
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="h-12 md:h-70 lg:h-80" aria-hidden />

        <div className="flex flex-col gap-8 md:gap-10 md:ps-18 md:pe-10 lg:ps-30 xl:ps-36">
          <header className="hidden space-y-4 pe-6 pt-4 md:block md:pe-10">
            <h2 className="text-2xl font-medium text-black md:text-3xl lg:text-4xl">
              {t("projectTwoTitle")}
            </h2>
            <p className="text-text-secondary text-sm leading-snug font-medium md:text-base lg:text-lg">
              {t("projectTwoTagline")}
            </p>
          </header>

          <div className="flex flex-col gap-6 md:flex-row md:gap-10 lg:items-center lg:gap-16">
            <div className="relative aspect-square w-full md:aspect-5/4 md:max-w-sm md:shrink-0 lg:max-w-xl xl:max-w-2xl">
              <Image
                src={projectImage}
                alt={t("projectAlt", { name: t("projectTwoTitle") })}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 42rem, 100vw"
              />
              <div
                dir="ltr"
                className="absolute top-4 right-4 z-1 flex flex-wrap items-center gap-2"
              >
                <span className="rounded-md bg-[#00d2be] px-3 py-1 text-xs font-medium text-white md:text-sm">
                  {t("projectTwoAccentBadge")}
                </span>
                <span className="rounded-md bg-[#2ecc71] px-3 py-1 text-xs font-medium text-white md:text-sm">
                  {t("projectTwoTopBadge")}
                </span>
              </div>
            </div>
            <header className="space-y-4 px-4 md:hidden">
              <h2 className="text-2xl font-medium text-black md:text-3xl lg:text-4xl">
                {t("projectTwoTitle")}
              </h2>
              <p className="text-text-secondary text-sm leading-snug font-medium md:text-base lg:text-lg">
                {t("projectTwoTagline")}
              </p>
            </header>

            <div className="flex flex-col gap-4 max-md:px-4 md:max-w-sm lg:max-w-md">
              <p className="text-text-secondary flex items-center gap-2 text-sm font-medium md:text-base">
                <MapPin
                  className="size-5 shrink-0 text-[#FF8C42]"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <span>{t("featuredLocation")}</span>
              </p>
              <p className="border-secondary text-justify text-base leading-[1.7] text-black max-md:border-s-2 max-md:ps-6 lg:text-lg">
                {t("featuredTwoDetailDescription")}
              </p>
              <Link
                href="/projects"
                className="mt-6 inline-block w-fit bg-[#222222] px-10 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-black/90 md:text-base lg:mt-12"
              >
                {t("exploreProject")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
