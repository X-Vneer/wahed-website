"use client"

import { useRef } from "react"
import Image from "next/image"
import { Button } from "@heroui/react"
import { motion, useScroll, useTransform } from "framer-motion"
import { BasicLineAnimation } from "@/components/common/text-lines-animation"
import { HomeAboutSection } from "@/lib/website-cms"

function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 21l1.6-4.6A9 9 0 1 1 12 21a8.9 8.9 0 0 1-4.2-1.1L3 21z" />
      <path d="M8.3 9.1c.2-.5.4-.5.8-.5h.6c.2 0 .4 0 .5.3.2.4.6 1.3.6 1.4s.1.3 0 .5c-.1.2-.2.3-.4.5l-.3.3c-.1.1-.2.2-.1.4.2.4.7 1.1 1.5 1.8 1 .9 1.8 1.2 2.2 1.4.2.1.3 0 .4-.1l.6-.8c.1-.2.3-.2.5-.1.2.1 1.3.6 1.5.7.2.1.4.2.4.3 0 .2 0 1-.4 1.4-.4.4-.9.7-1.5.8-.4.1-.9.1-1.5 0-.4-.1-1-.3-1.7-.6-.4-.2-1.1-.6-1.7-1.1-.6-.5-1.1-1-1.4-1.4-.4-.5-.8-1.1-1.1-1.6-.3-.6-.5-1.1-.6-1.5-.2-.6-.2-1.1-.1-1.5.1-.5.3-1 .7-1.3z" />
    </svg>
  )
}

const easeOut = [0.25, 0.46, 0.45, 0.94] as const

type AboutProps = {
  content: HomeAboutSection
}

export default function About({ content }: AboutProps) {
  const {
    titlePartOne,
    titlePartTwo,
    description,
    ctaLabel,
    image: backgroundImage,
  } = content
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  // Parallax: image slides down and scales up on scroll
  const imageY = useTransform(
    scrollYProgress,
    [0, 0.4, 0.8, 1],
    ["0%", "6%", "14%", "16%"]
  )
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.08, 1.18])
  const contentY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["0%", "-4%", "-10%"]
  )

  return (
    <section
      ref={sectionRef}
      className="hidden overflow-hidden bg-[#efefef] py-14 md:block md:py-20"
    >
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <motion.div
            className="text-black"
            style={{ y: contentY }}
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
            <div className="mb-3 flex items-end gap-3">
              <motion.span
                className="block text-4xl leading-none font-bold lg:text-7xl"
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: easeOut },
                  },
                }}
              >
                {titlePartOne}
              </motion.span>
              <motion.span
                className="text-secondary block w-24 md:w-32"
                aria-hidden
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.15, delayChildren: 0.15 },
                  },
                }}
              >
                <svg
                  viewBox="0 0 136 12"
                  className="h-3 w-full ltr:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                >
                  {/* Diamond: draw outline then show fill */}
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
                  {/* Horizontal line: draw */}
                  <motion.path
                    d="M9 6 L136 6"
                    stroke="currentColor"
                    strokeWidth="2"
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
              className="text-4xl leading-tight font-bold lg:text-7xl"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.55, ease: easeOut },
                },
              }}
            >
              {titlePartTwo}
            </motion.h2>

            <BasicLineAnimation
              as="p"
              className="mt-5 max-w-xl text-sm leading-7 text-[#4B5563] md:text-base"
              delay={0.4}
              duration={0.7}
              stagger={0.12}
            >
              {description}
            </BasicLineAnimation>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 0.5, ease: easeOut },
                },
              }}
              className="mt-8 md:mt-20"
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/95 min-w-48 px-8 text-white"
              >
                <WhatsAppIcon />
                {ctaLabel}
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="aspect-[4/5] w-full max-w-sm origin-center overflow-hidden md:aspect-auto md:h-[85svh] md:max-w-[400px]"
            style={{ y: imageY, scale: imageScale }}
            transition={{ duration: 0.8, ease: easeOut }}
          >
            <Image
              src={backgroundImage}
              alt="about image"
              className="h-full w-full object-cover"
              sizes="(max-width: 768px) 100vw, 460px"
              width={200}
              height={500}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
