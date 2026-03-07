/* eslint-disable @next/next/no-img-element */
"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { Button } from "@heroui/button"
import { ctaBg } from "@/assets"

export default function Cta() {
  const t = useTranslations("CtaSection")

  return (
    <section
      className="bg-primary relative py-14 md:py-20"
      aria-labelledby="cta-title"
    >
      <img
        src={ctaBg.src}
        alt="shape"
        aria-hidden
        className="absolute inset-e-0 top-0 h-full"
      />

      <div className="relative container">
        <div className="flex flex-col items-stretch gap-10 md:flex-row md:items-center md:justify-between md:gap-12">
          {/* Right column (heading) – appears first in DOM for RTL */}
          <div className="flex flex-1 flex-col">
            <div className="mb-3 flex items-center gap-3">
              <span className="text-secondary text-lg font-medium md:text-xl">
                {t("subtitle")}
              </span>
              <span className="text-secondary block w-16 md:w-20" aria-hidden>
                <svg
                  viewBox="0 0 90 12"
                  className="h-3 w-full ltr:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                >
                  <polygon points="1,6 6,1 11,6 6,11" fill="currentColor" />
                  <line
                    x1="9"
                    y1="6"
                    x2="90"
                    y2="6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </span>
            </div>
            <h2
              id="cta-title"
              className="text-4xl leading-tight font-bold text-white md:text-5xl lg:text-6xl"
            >
              {t("title")}
            </h2>
          </div>

          {/* Left column (description + CTA) */}
          <div className="flex flex-1 flex-col md:max-w-lg">
            <p className="text-sm leading-7 md:text-base md:leading-8">
              {t("description")}
            </p>
            <Button
              radius="sm"
              className="mt-6 max-w-48 bg-white px-8 text-black"
            >
              {t("cta")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
