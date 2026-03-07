"use client"

import { useRef } from "react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { blackLogo } from "@/assets"
import { BasicLineAnimation } from "@/components/common/text-lines-animation"

export default function Wahed() {
  const t = useTranslations("About")
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  // Parallax: logo and text move at different rates for depth (logo slightly slower)
  const logoY = useTransform(
    scrollYProgress,
    [0, 0.4, 0.8, 1],
    ["0%", "-8%", "-16%", "-20%"]
  )
  const textY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["0%", "-12%", "-24%"]
  )

  return (
    <section ref={sectionRef} className="text-primary py-16 md:py-24 lg:py-32">
      <div className="container">
        <div className="relative flex flex-col items-center justify-between gap-10 lg:flex-row">
          <motion.div
            className=""
            style={{ y: logoY }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Image
              src={blackLogo}
              alt={t("logoAlt")}
              className="w-44 md:w-72"
              priority={false}
            />
          </motion.div>
          <motion.div
            aria-hidden
            className="text-secondary mt-10 block lg:hidden"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <svg
              width="20"
              height="64"
              viewBox="0 0 20 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 2V58"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M4 52L10 60L16 52"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>

          <motion.div
            className="relative flex w-full max-w-lg items-start gap-2"
            style={{ y: textY }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <motion.div
              className="mt-2 hidden items-center justify-center md:justify-start lg:flex"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20px" }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.08, delayChildren: 0.2 },
                },
              }}
            >
              <svg
                width="46"
                height="12"
                viewBox="0 0 46 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-secondary rtl:rotate-180"
                aria-hidden
              >
                <motion.path
                  d="M1 6H40"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={{
                    hidden: { pathLength: 0, opacity: 0.6 },
                    visible: {
                      pathLength: 1,
                      opacity: 1,
                      transition: {
                        duration: 0.4,
                        delay: 0.5,
                        ease: "easeOut",
                      },
                    },
                  }}
                />
                <motion.path
                  d="M35 1L40.5 6L35 11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={{
                    hidden: { pathLength: 0, opacity: 0.6 },
                    visible: {
                      pathLength: 1,
                      opacity: 1,
                      transition: { duration: 0.35, ease: "easeOut" },
                    },
                  }}
                />
              </svg>
            </motion.div>

            <BasicLineAnimation
              delay={1}
              as="p"
              className="w-full text-[#4B5563] max-lg:text-center lg:text-lg"
            >
              {t("description")}
            </BasicLineAnimation>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
