"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { motion } from "framer-motion"
import { projectImage } from "@/assets"

const GALLERY_IMAGES = [
  { id: 1, src: projectImage, gridClass: "md:col-start-1 md:row-start-1" },
  { id: 2, src: projectImage, gridClass: "md:col-start-1 md:row-start-2" },
  {
    id: 3,
    src: projectImage,
    gridClass: "md:col-start-2 md:row-start-1 md:row-span-2",
  },
  { id: 4, src: projectImage, gridClass: "md:col-start-3 md:row-start-1" },
  { id: 5, src: projectImage, gridClass: "md:col-start-3 md:row-start-2" },
] as const

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

const easeOut = [0.25, 0.46, 0.45, 0.94] as const

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
}

export default function Gallery() {
  const t = useTranslations("GallerySection")

  return (
    <section className="bg-[#efefef] py-16 md:py-26">
      <div className="container">
        {/* Header: subtitle + title (same pattern as Projects) */}
        <motion.div
          className="mb-10 text-center md:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12, delayChildren: 0.1 },
            },
          }}
        >
          <motion.div
            className="mb-2 flex items-center justify-center gap-2"
            variants={headerVariants}
          >
            <span className="text-secondary text-lg font-medium lg:text-2xl">
              {t("subtitle")}
            </span>
            <motion.span
              className="text-secondary block w-16 md:w-24"
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
          </motion.div>
          <motion.h2
            className="text-4xl leading-tight font-bold text-black lg:text-6xl"
            variants={headerVariants}
          >
            {t("title")}
          </motion.h2>
        </motion.div>

        {/* Gallery grid: 2 small left, 1 large center, 2 small right; on mobile: single column stack */}
        <motion.div
          className="grid min-h-[320px] grid-cols-1 gap-4 md:grid-cols-[1fr_1.5fr_1fr] md:grid-rows-[1fr_1fr]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {GALLERY_IMAGES.map(({ id, src, gridClass }) => (
            <motion.div
              key={id}
              variants={cardVariants}
              className={`relative min-h-40 overflow-hidden md:h-full md:min-h-52 ${gridClass}`}
            >
              <Image
                src={src}
                alt={t("imageAlt", { index: id })}
                className="h-full w-full object-cover transition duration-300 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
                fill
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
