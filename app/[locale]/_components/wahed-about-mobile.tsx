"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { Button } from "@heroui/react"
import { motion } from "framer-motion"
import { BasicLineAnimation } from "@/components/common/text-lines-animation"
import type { HomeAboutSection, HomeBriefSection } from "@/lib/website-cms"
import { useSiteSettings } from "./site-settings-context"

function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 21l1.6-4.6A9 9 0 1 1 12 21a8.9 8.9 0 0 1-4.2-1.1L3 21z" />
      <path d="M8.3 9.1c.2-.5.4-.5.8-.5h.6c.2 0 .4 0 .5.3.2.4.6 1.3.6 1.4s.1.3 0 .5c-.1.2-.2.3-.4.5l-.3.3c-.1.1-.2.2-.1.4.2.4.7 1.1 1.5 1.8 1 .9 1.8 1.2 2.2 1.4.2.1.3 0 .4-.1l.6-.8c.1-.2.3-.2.5-.1.2.1 1.3.6 1.5.7.2.1.4.2.4.3 0 .2 0 1-.4 1.4-.4.4-.9.7-1.5.8-.4.1-.9.1-1.5 0-.4-.1-1-.3-1.7-.6-.4-.2-1.1-.6-1.7-1.1-.6-.5-1.1-1-1.4-1.4-.4-.5-.8-1.1-1.1-1.6-.3-.6-.5-1.1-.6-1.5-.2-.6-.2-1.1-.1-1.5.1-.5.3-1 .7-1.3z" />
    </svg>
  )
}

const easeOut = [0.25, 0.46, 0.45, 0.94] as const

type Props = {
  brief: HomeBriefSection
  about: HomeAboutSection
}

export default function WahedAboutMobile({ brief, about }: Props) {
  const t = useTranslations("HomeBriefMobile")
  const { siteName } = useSiteSettings()

  return (
    <section className="relative overflow-hidden bg-[#efefef] text-black md:hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[42%] bg-gradient-to-b from-white via-white to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute start-6 top-10 bottom-10 w-px bg-black/8"
      />

      <div className="relative px-6 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 ps-6"
        >
          <span className="bg-secondary block h-px w-8" />
          <span className="text-secondary text-[10px] font-semibold tracking-[0.32em] uppercase">
            {siteName}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.05 }}
          className="relative mt-8 ms-2"
        >
          <Image
            src={brief.image}
            alt={t("logoAlt", { siteName })}
            className="w-44"
            sizes="176px"
            width={300}
            height={100}
            unoptimized
            priority={false}
          />
          <span className="text-secondary absolute end-2 -top-2 font-mono text-[10px] tracking-widest opacity-70">
            {t("indexBrief")}
          </span>
        </motion.div>

        <div className="mt-8 ps-6">
          <BasicLineAnimation
            as="p"
            className="max-w-[34ch] text-[15px] leading-[1.75] text-[#3f3f3f]"
            delay={0.2}
            duration={0.6}
            stagger={0.1}
          >
            {brief.content}
          </BasicLineAnimation>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex items-center gap-4 ps-6"
        >
          <span className="font-mono text-[10px] tracking-widest text-black/40 uppercase">
            {t("indexAbout")} — {about.titlePartOne}
          </span>
          <span className="bg-secondary h-px flex-1" />
          <span aria-hidden className="bg-secondary h-1.5 w-1.5 rotate-45" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="relative mt-8 -mr-6 -ml-6 aspect-[3/4] overflow-hidden"
        >
          <Image
            src={about.image}
            alt={t("imageAlt", { siteName })}
            className="h-full w-full object-cover"
            sizes="100vw"
            width={400}
            height={533}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent"
          />
          <span
            aria-hidden
            className="absolute start-4 top-4 h-4 w-4 border-t-2 border-s-2 border-white/80"
          />
          <span
            aria-hidden
            className="absolute end-4 bottom-4 h-4 w-4 border-e-2 border-b-2 border-white/80"
          />
          <div className="absolute inset-x-6 bottom-6 text-white">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex items-center">
                <span
                  aria-hidden
                  className="bg-secondary block h-2 w-2 rotate-45"
                />
                <span className="bg-secondary h-px w-12" />
              </div>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-90">
                {about.titlePartOne}
              </span>
            </div>
            <h2 className="text-4xl leading-[1.05] font-bold tracking-tight">
              {about.titlePartTwo}
            </h2>
          </div>
        </motion.div>

        <div className="mt-8 ps-6">
          <BasicLineAnimation
            as="p"
            className="max-w-[36ch] text-[15px] leading-[1.8] text-[#3f3f3f]"
            delay={0.2}
            duration={0.6}
            stagger={0.1}
          >
            {about.description}
          </BasicLineAnimation>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.4, ease: easeOut }}
          className="mt-10 ps-6"
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/95 group h-14 w-full max-w-xs px-8 text-white"
          >
            <WhatsAppIcon />
            <span className="font-medium tracking-wide">{about.ctaLabel}</span>
            <span
              aria-hidden
              className="ms-auto inline-flex transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
            >
              →
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
