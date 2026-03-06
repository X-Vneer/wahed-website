"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { Button } from "@heroui/button"
import { heroImage, noise } from "@/assets"
import { Link } from "@/i18n/navigation"

export default function Hero() {
  const t = useTranslations("Hero")

  return (
    <section className="relative flex min-h-svh w-full overflow-hidden">
      {/* Background image from assets */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <Image
          src={noise}
          alt=""
          fill
          className="h-full w-full object-cover object-center opacity-25"
        />

        <div className="absolute inset-0 bg-[#0c0c0c81]"></div>
      </div>

      <div className="container">
        <div className="flex min-h-svh items-center">
          {/* Content: right-aligned for RTL, left for LTR */}
          <div className="relative h-full max-md:text-center">
            <div className="max-w-3xl">
              <h1 className="text-3xl leading-tight font-medium md:text-4xl lg:text-5xl">
                {t("title")}
              </h1>
              <p className="mt-4 max-w-md font-medium max-md:mx-auto lg:text-lg">
                {t("description")}
              </p>
              <div className="mt-8 md:mt-12">
                <Button
                  radius="sm"
                  size="lg"
                  className="w-full max-w-[250px] bg-white text-lg font-medium! text-black"
                  as={Link}
                  href="/about"
                >
                  {t("cta")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-14 left-1/2 -translate-x-1/2 text-secondary"
      >
        <svg
          width="20"
          height="64"
          viewBox="0 0 20 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 2V58"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M4 52L10 60L16 52"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  )
}
