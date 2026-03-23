"use client"

import { useTranslations } from "next-intl"
import { Divider } from "@heroui/divider"
import { motion } from "framer-motion"
import { TextLinesAnimation } from "@/components/common/text-lines-animation"

const easeOut = [0.25, 0.46, 0.45, 0.94] as const

export default function ContactHero() {
  const t = useTranslations("ContactHero")

  return (
    <section className="relative z-10 flex min-h-[60vh] items-center py-16 md:pt-24 md:pb-16">
      <div className="container">
        <div className="mx-auto min-h-90 max-w-2xl space-y-6 pt-26 pb-20 md:min-h-100">
          <motion.div
            className="text-secondary flex items-center justify-center gap-3 text-center text-lg font-medium md:text-2xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOut }}
          >
            <span>{t("eyebrow")}</span>
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
                  transition={{ duration: 0.55, ease: "easeOut", delay: 0.25 }}
                />
              </svg>
            </span>
          </motion.div>

          <TextLinesAnimation
            as="h1"
            className="text-primary text-center text-3xl leading-snug font-medium md:text-5xl"
            delay={0.15}
            duration={0.7}
            stagger={0.16}
          >
            <>
              {
                t.rich("title", {
                  span: (chunk) => (
                    <span className="text-secondary">{chunk}</span>
                  ),
                })
                // ensure it renders as React nodes
              }
            </>
          </TextLinesAnimation>
        </div>
        <Divider />
      </div>
    </section>
  )
}
