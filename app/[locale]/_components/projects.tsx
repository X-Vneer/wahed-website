"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { Button } from "@heroui/button"
import { cn } from "@heroui/theme"
import { projectImage } from "@/assets"

export default function Projects() {
  const t = useTranslations("ProjectsSection")

  return (
    <section className="bg-white py-16 md:py-26">
      <div className="container">
        {/* Header: description left, title right */}
        <div className="mb-10 flex flex-col gap-8 md:mb-14 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex shrink-0 flex-col">
            <div className="mb-2 flex items-center gap-2">
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
          <p className="text-text-secondary sm:border-s-text-secondary max-w-md text-sm leading-7 sm:border-s-2 sm:ps-4 md:text-base">
            {t("description")}
          </p>
        </div>

        {/* 2x2 project grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
          {[
            { id: 1, colSpan: 2 },
            { id: 2, colSpan: 3 },
            { id: 3, colSpan: 3 },
            { id: 4, colSpan: 2 },
          ].map(({ id, colSpan }) => (
            <a
              key={id}
              href="#"
              className={cn(
                "group relative h-55 overflow-hidden md:h-75",
                colSpan === 2 ? "sm:col-span-2" : "sm:col-span-3"
              )}
            >
              <Image
                src={projectImage}
                alt={t("projectAlt", { name: t("projectName") })}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute right-0 bottom-0 left-0 flex flex-col gap-3 p-4 text-white">
                <span className="text-lg font-medium md:text-2xl">
                  {t("projectName")}
                </span>
                <span className="text-secondary block w-fit" aria-hidden>
                  <svg
                    viewBox="0 0 40 12"
                    className="h-3 w-full"
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
            </a>
          ))}
        </div>

        {/* All projects CTA */}
        <div className="mt-10 flex justify-center md:mt-14">
          <Button
            radius="none"
            className="min-w-48 bg-[#1d1d1f] px-8 text-white hover:bg-black"
          >
            {t("allProjects")}
          </Button>
        </div>
      </div>
    </section>
  )
}
