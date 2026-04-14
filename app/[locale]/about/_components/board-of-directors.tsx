"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import type { AboutBoardSection } from "@/lib/website-cms"

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
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
}

type BoardOfDirectorsProps = {
  content: AboutBoardSection
}

export default function BoardOfDirectors({ content }: BoardOfDirectorsProps) {
  const { eyebrow, title, members } = content

  return (
    <section className="relative bg-white py-16 md:py-24">
      <div className="container">
        <motion.div
          className="flex flex-col gap-2"
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
          <div className="flex items-center gap-3">
            <motion.span
              className="text-secondary text-lg font-medium md:text-2xl"
              variants={headerVariants}
            >
              {eyebrow}
            </motion.span>
            <motion.span
              className="text-secondary block w-16 shrink-0 md:w-20"
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
            className="text-3xl leading-tight font-bold text-black md:text-5xl lg:text-6xl"
            variants={headerVariants}
          >
            {title}
          </motion.h2>
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 md:mt-14 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {members.map((member, index) => (
            <motion.div
              key={`${member.image}-${index}`}
              className="group relative aspect-3/4 overflow-hidden rounded-lg"
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: easeOut }}
            >
              <Image
                src={member.image}
                alt={member.name?.trim() || `Board member ${index + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover object-top transition duration-300 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
