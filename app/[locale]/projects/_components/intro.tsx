"use client"

import { useTranslations } from "next-intl"
import { Separator } from "@heroui/react"

export default function ProjectsIntro() {
  const t = useTranslations("ProjectsIntro")

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-2xl leading-normal font-semibold text-black lg:text-4xl">
            {t.rich("description", {
              highlight: (chunk) => (
                <span className="text-secondary underline underline-offset-8">
                  {chunk}
                </span>
              ),
              heart: () => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="41"
                  height="44"
                  viewBox="0 0 41 44"
                  fill="none"
                  className="inline"
                >
                  <path
                    d="M41 10.2334V22.5039L36.7295 26.7744L36.7383 26.7832L20.3682 43.1533L20.3604 43.1445L20.3525 43.1533L3.9834 26.7832L3.99023 26.7754L0 22.7842V9.9541L9.9541 0L20.3604 10.4053L30.7666 0L41 10.2334Z"
                    fill="#FE5F27"
                  />
                </svg>
              ),
            })}
          </p>
        </div>
        <Separator className="mt-10 md:mt-12" />
      </div>
    </section>
  )
}
