"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { Button } from "@heroui/button"
import { aboutImage } from "@/assets"

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

export default function About() {
  const t = useTranslations("AboutSection")

  return (
    <section className="bg-[#efefef] py-14 md:py-20">
      <div className="container">
        <div className="flex flex-col-reverse items-center justify-between gap-8 md:flex-row">
          <div className="text-primary">
            <div className={`mb-3 flex items-end gap-3`}>
              <span className="text-4xl leading-none font-bold lg:text-7xl">
                {t("prefix")}
              </span>
              <span className="text-secondary block w-24 md:w-32" aria-hidden>
                <svg
                  viewBox="0 0 136 12"
                  className="h-3 w-full"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                >
                  <polygon points="1,6 6,1 11,6 6,11" fill="currentColor" />
                  <line
                    x1="9"
                    y1="6"
                    x2="136"
                    y2="6"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </span>
            </div>

            <h2 className="text-4xl leading-tight font-bold lg:text-7xl">
              {t("title")}
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[#4B5563] md:text-base">
              {t("description")}
            </p>

            <Button
              size="lg"
              radius="none"
              className="bg-primary hover:bg-primary/95 mt-12 min-w-48 px-8 text-white md:mt-20"
              startContent={<WhatsAppIcon />}
            >
              {t("cta")}
            </Button>
          </div>
          <div className="h-svh w-full md:max-w-[400px]">
            <Image
              src={aboutImage}
              alt={t("imageAlt")}
              className="h-full w-full object-cover"
              sizes="(max-width: 768px) 100vw, 460px"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
