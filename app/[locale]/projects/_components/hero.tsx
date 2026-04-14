"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { noise } from "@/assets"
import { TextLinesAnimation } from "@/components/common/text-lines-animation"
import { type ProjectsHeroSection } from "@/lib/website-cms"

const easeOut = [0.25, 0.46, 0.45, 0.94] as const

type Props = {
  content: ProjectsHeroSection
}

export default function ProjectsHero({ content }: Props) {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  // Noise layer moves at a different rate for layered depth
  const noiseY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"])
  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src={content.backgroundImage}
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(12, 12, 12, 0.5) 20.21%, rgba(12, 12, 12, 0.5) 85.93%)",
          }}
          className="absolute inset-0"
          aria-hidden
        />
      </div>
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

      <div className="relative z-10 container flex items-center">
        <div className="flex w-full">
          <div className="w-full max-w-2xl">
            <motion.div
              className="text-secondary flex items-center gap-3 text-center text-lg font-medium md:text-2xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOut }}
            >
              <span>{content.eyebrow}</span>
              <span className="block w-16 md:w-20" aria-hidden>
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
                    initial={{ pathLength: 0, opacity: 0.6 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                  />
                  <motion.path
                    d="M9 6 L90 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0.8 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      duration: 0.55,
                      ease: "easeOut",
                      delay: 0.25,
                    }}
                  />
                </svg>
              </span>
            </motion.div>
            <TextLinesAnimation
              as="h1"
              text={content.title}
              className="text-2xl leading-snug font-medium text-white md:text-3xl lg:text-4xl lg:leading-snug"
              delay={0.35}
              duration={0.6}
              stagger={0.12}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
