"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { lineShape, workSpace } from "@/assets"
import { BasicLineAnimation } from "@/components/common/text-lines-animation"

export default function OurVision() {
  const t = useTranslations("OurVision")

  return (
    <section className="relative bg-white">
      {/* Top line shape border */}

      <div className="container py-12 max-md:px-0 md:py-16 lg:py-20">
        <div className="relative h-[18px] w-full overflow-hidden" aria-hidden>
          <Image
            src={lineShape}
            alt=""
            width={1280}
            height={18}
            className="h-full w-full object-cover object-top-left"
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-8 bg-[#F4F4F4] p-6 max-md:text-center md:p-14 lg:grid-cols-[1fr_auto_1fr] lg:gap-12">
          {/* Our Vision - first in DOM for RTL/LTR */}
          <div className="flex flex-col justify-center">
            <h3 className="text-primary mb-3 text-2xl font-bold md:text-3xl">
              {t("visionTitle")}
            </h3>
            <BasicLineAnimation
              as="p"
              className="text-text-secondary max-w-lg text-base leading-relaxed md:text-lg"
            >
              {t("visionDescription")}
            </BasicLineAnimation>
          </div>

          {/* Central worker image with orange background */}
          <div className="relative flex justify-center">
            <div className="relative overflow-hidden rounded-lg px-4 py-6 md:px-6 md:py-8">
              <div className="relative aspect-square w-48 md:w-56 lg:w-64">
                <Image
                  src={workSpace}
                  alt={t("workerAlt")}
                  fill
                  sizes="(max-width: 768px) 192px, (max-width: 1024px) 224px, 256px"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* Our Mission */}
          <div className="flex flex-col justify-center">
            <h3 className="text-primary mb-3 text-2xl font-bold md:text-3xl">
              {t("missionTitle")}
            </h3>
            <BasicLineAnimation
              as="p"
              className="text-text-secondary max-w-lg text-base leading-relaxed md:text-lg"
            >
              {t("missionDescription")}
            </BasicLineAnimation>
          </div>
        </div>
        {/* Bottom line shape border */}
        <div className="relative h-[18px] w-full overflow-hidden" aria-hidden>
          <Image
            src={lineShape}
            alt=""
            width={1280}
            height={18}
            className="h-full w-full object-cover object-top-left"
          />
        </div>
      </div>
    </section>
  )
}
