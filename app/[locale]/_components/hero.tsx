"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { buttonVariants } from "@heroui/react"
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion"
import { Ripple } from "m3-ripple"
import { noise } from "@/assets"
import { TextLinesAnimation } from "@/components/common/text-lines-animation"
import { Link } from "@/i18n/navigation"
import type { HomeHeroSection } from "@/lib/website-cms"

type HeroProps = {
  content: HomeHeroSection
}

export default function Hero({ content }: HeroProps) {
  const { title, description, ctaLabel, backgroundImage } = content
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
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.02])
  // Noise layer moves at a different rate for layered depth
  const noiseY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"])
  // Content and arrow move slower than scroll = feel in front of background
  const contentY = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    ["0%", "-5%", "-12%"]
  )
  const arrowY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"])
  // Hide arrow once user scrolls past tiny threshold
  const [scrolled, setScrolled] = useState(false)
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setScrolled(v > 0.02)
  })

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
            src={backgroundImage}
            alt="background"
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
            alt="noise"
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
                text={title}
                className="text-3xl leading-tight font-medium md:text-4xl lg:text-5xl"
              />
              <TextLinesAnimation
                delay={0.75}
                as="p"
                className="mt-4 max-w-md font-medium max-md:mx-auto lg:text-lg"
              >
                {description}
              </TextLinesAnimation>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="mt-8 md:mt-12"
              >
                <Link
                  href="/about"
                  className={buttonVariants({
                    size: "lg",
                    variant: "secondary",
                    className: "w-full max-w-63 text-black",
                  })}
                >
                  {ctaLabel}
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
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ delay: scrolled ? 0 : 2, duration: 0.3 }}
        style={{ y: arrowY }}
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
