"use client"

import type { StaticImageData } from "next/image"
import Image from "next/image"
import { motion } from "framer-motion"
import { shape } from "@/assets"
import { BasicLineAnimation } from "@/components/common/text-lines-animation"
import type { AboutStorySection } from "@/lib/website-cms"

const easeOut = [0.25, 0.46, 0.45, 0.94] as const

type OurStoryProps = {
  content: AboutStorySection
}

function DecorativeImage({ src }: { src: string | StaticImageData }) {
  if (typeof src === "string") {
    return (
      <div className="relative h-[200px] w-48 md:h-[220px] md:w-64 lg:h-[240px] lg:w-72">
        <Image
          src={src}
          alt=""
          fill
          sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 288px"
          className="object-contain object-center opacity-90"
        />
      </div>
    )
  }
  return (
    <Image
      src={src}
      alt=""
      width={302}
      height={250}
      sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 288px"
      className="h-auto w-48 opacity-90 md:w-64 lg:w-72"
    />
  )
}

export default function OurStory({ content }: OurStoryProps) {
  const { eyebrow, title, description, decorativeImage } = content
  const imageSrc = decorativeImage?.trim() ? decorativeImage : shape

  return (
    <section className="relative bg-white py-16 md:py-24">
      <div className="relative container">
        <div
          className="absolute inset-0 flex items-center justify-center"
          aria-hidden
        >
          <DecorativeImage src={imageSrc} />
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
            <span>{eyebrow}</span>
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
              {title}
            </h2>
          </motion.div>

          <BasicLineAnimation
            as="p"
            text={description}
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
