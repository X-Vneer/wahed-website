"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { motion } from "framer-motion"
import { shape } from "@/assets"
import { BasicLineAnimation } from "@/components/common/text-lines-animation"

const easeOut = [0.25, 0.46, 0.45, 0.94] as const

export default function OurStory() {
  const t = useTranslations("OurStory")

  return (
    <section className="relative bg-white py-16 md:py-24">
      <div className="relative container">
        <div
          className="absolute inset-0 flex items-center justify-center"
          aria-hidden
        >
          <Image
            src={shape}
            alt=""
            width={302}
            height={250}
            className="h-auto w-48 opacity-90 md:w-64 lg:w-72"
          />
        </div>
        <motion.div
          className="relative mx-auto flex max-w-3xl flex-col items-center gap-4 text-center"
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
          <motion.div
            className="text-secondary flex items-center gap-3 text-center text-lg font-medium md:text-2xl"
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
            </span>
          </motion.div>

          <motion.div
            className="relative inline-block"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.55, ease: easeOut },
              },
            }}
          >
            <h2 className="relative text-3xl font-bold text-black md:text-5xl lg:text-6xl">
              {t("title")}
            </h2>
          </motion.div>

          <BasicLineAnimation
            as="p"
            text={t("description")}
            className="text-text-secondary w-full max-w-2xl [text-align:inherit] text-base leading-relaxed font-medium md:text-lg lg:text-lg"
            delay={0.35}
            duration={0.6}
            stagger={0.12}
          />
        </motion.div>
      </div>
    </section>
  )
}
