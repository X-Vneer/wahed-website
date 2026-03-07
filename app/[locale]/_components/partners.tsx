"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import {
  partner1,
  partner2,
  partner3,
  partner4,
  partner5,
  partner6,
} from "@/assets"

const PARTNER_LOGOS = [
  { id: 1, src: partner1 },
  { id: 2, src: partner2 },
  { id: 3, src: partner3 },
  { id: 4, src: partner4 },
  { id: 5, src: partner5 },
  { id: 6, src: partner6 },
] as const

export default function Partners() {
  const t = useTranslations("PartnersSection")

  return (
    <section className="py-14 md:py-20">
      <div className="container">
        <div
          className={`flex flex-col items-stretch gap-8 md:flex-row md:items-center md:gap-12 lg:gap-16`}
        >
          {/* Text content */}
          <div className="text-primary flex flex-1 flex-col">
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
            <h2 className="text-3xl leading-tight font-bold md:text-4xl lg:text-6xl">
              {t("title")}
            </h2>
            <p className="text-text-secondary mt-5 max-w-xl md:text-base">
              {t("description")}
            </p>
          </div>
          {/* Logo grid */}
          <div className="flex-1 bg-[#e5e5e5] p-6 md:p-8 lg:p-10">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6">
              {PARTNER_LOGOS.map(({ id, src }) => (
                <div
                  key={id}
                  className="flex aspect-square items-center justify-center p-3 md:p-4"
                >
                  <Image
                    src={src}
                    alt={t("logoAlt", { index: id })}
                    className="h-full w-full object-contain"
                    sizes="(max-width: 768px) 33vw, 140px"
                    width={140}
                    height={140}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
