import { useTranslations } from "next-intl"
import Image from "next/image"
import { blackLogo } from "@/assets"

export default function Wahed() {
  const t = useTranslations("About")

  return (
    <section className="text-primary py-16 md:py-24">
      <div className="container">
        <div className="relative flex flex-col items-center justify-between gap-10 lg:flex-row">
          <div className="">
            <Image
              src={blackLogo}
              alt={t("logoAlt")}
              className="w-44 md:w-72"
              priority={false}
            />
          </div>
          <div aria-hidden className="text-secondary mt-10 block lg:hidden">
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

          <div className="relative flex max-w-lg items-start gap-2">
            <div className="mt-2 hidden items-center justify-center md:justify-start lg:flex">
              <svg
                width="46"
                height="12"
                viewBox="0 0 46 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-secondary rtl:rotate-180"
                aria-hidden
              >
                <path
                  d="M1 6H40"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M35 1L40.5 6L35 11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="text-[#4B5563] max-lg:text-center lg:text-lg">
              {t("description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
