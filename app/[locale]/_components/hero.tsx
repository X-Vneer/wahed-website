"use client"

import { useRef } from "react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Ripple } from "m3-ripple"
import { heroImage, noise } from "@/assets"
import { TextLinesAnimation } from "@/components/common/text-lines-animation"
import { Link } from "@/i18n/navigation"

export default function Hero() {
  const t = useTranslations("Hero")
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  // Parallax: image moves up slower (Y) and zooms out slightly (scale) for depth
  const backgroundY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["0%", "-10%", "-20%"]
  )
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  // Noise layer moves at a different rate for layered depth
  const noiseY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"])
  // Content and arrow move slower than scroll = feel in front of background
  const contentY = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    ["0%", "-5%", "-12%"]
  )
  const arrowY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"])
  // Arrow fades out as hero scrolls away (stays full until 20% scroll so initial fade-in isn’t overridden)
  const arrowOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.55, 0.85],
    [1, 1, 0.4, 0]
  )

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh w-full overflow-hidden"
    >
      {/* Background image from assets */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 min-h-[130%] w-full origin-center"
          style={{
            y: backgroundY,
            scale: backgroundScale,
          }}
        >
          <Image
            src={heroImage}
            alt=""
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 min-h-[110%] w-full"
          style={{ y: noiseY }}
        >
          <Image
            src={noise}
            alt=""
            fill
            className="h-full w-full object-cover object-center opacity-25"
          />
        </motion.div>

        <div className="absolute inset-0 bg-[#0c0c0c81]"></div>
      </div>

      <div className="container">
        <div className="flex min-h-svh items-center">
          {/* Content: right-aligned for RTL, left for LTR */}
          <motion.div
            className="relative h-full w-full max-md:text-center"
            style={{ y: contentY }}
          >
            <div className="max-w-3xl">
              <TextLinesAnimation
                as="h1"
                text={t("title")}
                className="text-3xl leading-tight font-medium md:text-4xl lg:text-5xl"
              />
              <TextLinesAnimation
                delay={0.75}
                as="p"
                className="mt-4 max-w-md font-medium max-md:mx-auto lg:text-lg"
              >
                {t("description")}
              </TextLinesAnimation>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="mt-8 md:mt-12"
              >
                <Link
                  href="/about"
                  className="relative inline-flex h-12 w-full max-w-[250px] items-center justify-center bg-white text-lg font-medium text-black transition-colors hover:bg-white/80"
                >
                  {t("cta")}
                  <Ripple />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        aria-hidden
        className="text-secondary pointer-events-none absolute bottom-14 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.3 }}
        style={{ y: arrowY, opacity: arrowOpacity }}
      >
        <svg
          width="20"
          height="64"
          viewBox="0 0 20 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M10 2V58"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 2, duration: 0.4 }}
            style={{ fill: "none" }}
          />
          <motion.path
            d="M4 52L10 60L16 52"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 2.35, duration: 0.3 }}
            style={{ fill: "none" }}
          />
        </svg>
      </motion.div>
    </section>
  )
}
