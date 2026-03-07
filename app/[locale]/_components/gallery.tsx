"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
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

export default function Gallery() {
  const t = useTranslations("GallerySection")

  return (
    <section className="bg-[#efefef] py-16 md:py-26">
      <div className="container">
        {/* Header: subtitle + title (same pattern as Projects) */}
        <div className="mb-10 text-center md:mb-14">
          <div className="mb-2 flex items-center justify-center gap-2">
            <span className="text-secondary text-lg font-medium lg:text-2xl">
              {t("subtitle")}
            </span>
            <span className="text-secondary block w-16 md:w-24" aria-hidden>
              <svg
                viewBox="0 0 90 12"
                className="h-3 w-full"
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
                  strokeWidth="2"
                />
              </svg>
            </span>
          </div>
          <h2 className="text-4xl leading-tight font-bold text-black lg:text-6xl">
            {t("title")}
          </h2>
        </div>

        {/* Gallery grid: 2 small left, 1 large center, 2 small right; on mobile: single column stack */}
        <div className="grid min-h-[320px] grid-cols-1 gap-4 md:grid-cols-[1fr_1.5fr_1fr] md:grid-rows-[1fr_1fr]">
          {GALLERY_IMAGES.map(({ id, src, gridClass }) => (
            <div
              key={id}
              className={`relative min-h-40 overflow-hidden md:h-full md:min-h-52 ${gridClass}`}
            >
              <Image
                src={src}
                alt={t("imageAlt", { index: id })}
                className="h-full w-full object-cover transition duration-300 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
                fill
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
