"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  partner1,
  partner2,
  partner3,
  partner4,
  partner5,
  partner6,
} from "@/assets"
import { BasicLineAnimation } from "@/components/common/text-lines-animation"

const PARTNER_LOGOS = [
  { id: 1, src: partner1 },
  { id: 2, src: partner2 },
  { id: 3, src: partner3 },
  { id: 4, src: partner4 },
  { id: 5, src: partner5 },
  { id: 6, src: partner6 },
] as const

const easeOut = [0.25, 0.46, 0.45, 0.94] as const

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

const logoVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
}

export default function Partners() {
  const t = useTranslations("PartnersSection")

  return (
    <section className="bg-[#efefef] py-14 md:py-20">
      <div className="container">
        <div
          className={`flex flex-col items-stretch gap-8 md:flex-row md:items-center md:gap-12 lg:gap-16`}
        >
          {/* Text content */}
          <motion.div
            className="text-primary flex flex-1 flex-col"
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
              className="text-4xl leading-tight font-bold md:text-5xl lg:text-6xl"
              variants={headerVariants}
            >
              {t("title")}
            </motion.h2>
            <BasicLineAnimation
              as="p"
              className="text-text-secondary mt-5 max-w-xl md:text-base"
              delay={0.4}
              duration={0.7}
              stagger={0.12}
            >
              {t("description")}
            </BasicLineAnimation>
          </motion.div>
          {/* Logo grid */}
          <motion.div
            className="flex-1 bg-[#e5e5e5] p-6 md:p-8 lg:p-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6">
              {PARTNER_LOGOS.map(({ id, src }) => (
                <motion.div
                  key={id}
                  className="flex aspect-square items-center justify-center p-3 md:p-4"
                  variants={logoVariants}
                >
                  <Image
                    src={src}
                    alt={t("logoAlt", { index: id })}
                    className="h-full w-full object-contain"
                    sizes="(max-width: 768px) 33vw, 140px"
                    width={140}
                    height={140}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
