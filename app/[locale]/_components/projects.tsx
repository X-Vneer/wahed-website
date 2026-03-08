"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { Button } from "@heroui/button"
import { cn } from "@heroui/theme"
import { motion } from "framer-motion"
import { projectImage } from "@/assets"
import { BasicLineAnimation } from "@/components/common/text-lines-animation"

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

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
}

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
}

export default function Projects() {
  const t = useTranslations("ProjectsSection")

  return (
    <section className="bg-white py-16 md:py-26">
      <div className="container">
        {/* Header: description left, title right */}
        <motion.div
          className="mb-10 flex flex-col gap-8 md:mb-14 lg:flex-row lg:items-center lg:justify-between"
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
          <div className="flex shrink-0 flex-col">
            <motion.div
              className="mb-2 flex items-center gap-2"
              variants={headerVariants}
            >
              <span className="text-secondary text-lg font-medium lg:text-2xl">
                {t("subtitle")}
              </span>
            </motion.div>
            <motion.h2
              className="text-4xl leading-tight font-bold text-black lg:text-6xl"
              variants={headerVariants}
            >
              {t("title")}
            </motion.h2>
          </div>
          <BasicLineAnimation
            className="text-text-secondary sm:border-s-text-secondary max-w-md text-sm leading-7 sm:border-s-2 sm:ps-4 md:text-base"
            delay={0.4}
            duration={0.7}
            stagger={0.12}
            as="p"
          >
            {t("description")}
          </BasicLineAnimation>
        </motion.div>

        {/* 2x2 project grid */}
        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {[
            { id: 1, colSpan: 2 },
            { id: 2, colSpan: 3 },
            { id: 3, colSpan: 3 },
            { id: 4, colSpan: 2 },
          ].map(({ id, colSpan }) => (
            <motion.a
              key={id}
              href="#"
              variants={cardVariants}
              className={cn(
                "group relative h-55 overflow-hidden md:h-75",
                colSpan === 2 ? "sm:col-span-2" : "sm:col-span-3"
              )}
            >
              <Image
                src={projectImage}
                alt={t("projectAlt", { name: t("projectName") })}
                className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent transition duration-300 group-hover:from-black/70 group-hover:via-black/30" />
              <div className="absolute right-0 bottom-0 left-0 flex flex-col gap-3 p-4 text-white">
                <span className="text-lg font-medium md:text-2xl">
                  {t("projectName")}
                </span>
                <span className="text-secondary block w-fit" aria-hidden>
                  <svg
                    viewBox="0 0 40 12"
                    className="h-3 w-full transition-transform duration-300 group-hover:translate-x-1 ltr:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                  >
                    <polygon points="1,6 6,1 11,6 6,11" fill="currentColor" />
                    <line
                      x1="9"
                      y1="6"
                      x2="40"
                      y2="6"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* All projects CTA */}
        <motion.div
          className="mt-10 flex justify-center md:mt-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Button
            radius="none"
            className="min-w-48 bg-[#1d1d1f] px-8 text-white hover:bg-black"
          >
            {t("allProjects")}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
