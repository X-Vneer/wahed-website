"use client"

import { useRef } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@heroui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import { ctaBg } from "@/assets"
import { BasicLineAnimation } from "@/components/common/text-lines-animation"

const easeOut = [0.25, 0.46, 0.45, 0.94] as const

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
}

export default function Cta() {
  const t = useTranslations("CtaSection")
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const bgY = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "10%", "38%"])

  return (
    <section
      ref={sectionRef}
      className="bg-primary relative overflow-hidden py-14 md:py-20"
      aria-labelledby="cta-title"
    >
      <motion.img
        src={ctaBg.src}
        alt=""
        aria-hidden
        className="absolute inset-e-0 top-0 h-full object-cover object-left"
        style={{ y: bgY }}
      />

      <div className="relative container">
        <div className="flex flex-col items-stretch gap-10 md:flex-row md:items-center md:justify-between md:gap-12">
          {/* Right column (heading) – appears first in DOM for RTL */}
          <motion.div
            className="flex flex-1 flex-col"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.12, delayChildren: 0.1 },
              },
            }}
          >
            <div className="mb-3 flex items-center gap-3">
              <motion.span
                className="text-secondary text-lg font-medium md:text-xl"
                variants={headerVariants}
              >
                {t("subtitle")}
              </motion.span>
              <motion.span
                className="text-secondary block w-16 md:w-20"
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
            </div>
            <motion.h2
              id="cta-title"
              className="text-4xl leading-tight font-bold text-white md:text-5xl lg:text-6xl"
              variants={headerVariants}
            >
              {t("title")}
            </motion.h2>
          </motion.div>

          {/* Left column (description + CTA) */}
          <motion.div
            className="flex flex-1 flex-col md:max-w-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.1, delayChildren: 0.2 },
              },
            }}
          >
            <BasicLineAnimation
              as="p"
              className="text-sm leading-7 text-white/90 md:text-base md:leading-8"
              delay={0.2}
              duration={0.6}
              stagger={0.1}
            >
              {t("description")}
            </BasicLineAnimation>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.4,
                    ease: easeOut,
                  },
                },
              }}
              className="mt-6"
            >
              <Button
                radius="sm"
                className="max-w-48 bg-white px-8 text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {t("cta")}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
