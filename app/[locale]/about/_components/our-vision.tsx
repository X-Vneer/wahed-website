"use client"

import Image from "next/image"
import { lineShape } from "@/assets"
import { BasicLineAnimation } from "@/components/common/text-lines-animation"
import type { AboutVisionSection } from "@/lib/website-cms"

type OurVisionProps = {
  content: AboutVisionSection
}

export default function OurVision({ content }: OurVisionProps) {
  const {
    visionTitle,
    visionDescription,
    missionTitle,
    missionDescription,
    centerImage,
    workerAlt,
  } = content
  const altText = workerAlt?.trim() || ""

  return (
    <section className="relative bg-white">
      <div className="container py-12 max-md:px-0 md:py-16 lg:py-20">
        <div className="relative h-4.5 w-full overflow-hidden" aria-hidden>
          <Image
            src={lineShape}
            alt="line shape"
            width={1280}
            height={18}
            sizes="100vw"
            className="h-full w-full object-cover object-top-left"
          />
        </div>
        <div
          className={`grid grid-cols-1 items-center gap-8 bg-[#F4F4F4] p-6 max-md:text-center md:p-14 lg:gap-12 ${
            centerImage ? "lg:grid-cols-[1fr_auto_1fr]" : "lg:grid-cols-2"
          }`}
        >
          <div className="flex flex-col justify-center">
            <h3 className="mb-3 text-2xl font-bold text-black md:text-3xl">
              {visionTitle}
            </h3>
            <BasicLineAnimation
              as="p"
              className="text-text-secondary max-w-lg text-base leading-relaxed md:text-lg"
            >
              {visionDescription}
            </BasicLineAnimation>
          </div>

          {centerImage && (
            <div className="relative flex justify-center">
              <div className="relative overflow-hidden rounded-lg px-4 py-6 md:px-6 md:py-8">
                <div className="relative aspect-square w-48 md:w-56 lg:w-64">
                  <Image
                    src={centerImage}
                    alt={altText}
                    fill
                    sizes="(max-width: 768px) 192px, (max-width: 1024px) 224px, 256px"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col justify-center">
            <h3 className="mb-3 text-2xl font-bold text-black md:text-3xl">
              {missionTitle}
            </h3>
            <BasicLineAnimation
              as="p"
              className="text-text-secondary max-w-lg text-base leading-relaxed md:text-lg"
            >
              {missionDescription}
            </BasicLineAnimation>
          </div>
        </div>
        <div className="relative h-[18px] w-full overflow-hidden" aria-hidden>
          <Image
            src={lineShape}
            alt=""
            width={1280}
            height={18}
            sizes="100vw"
            className="h-full w-full object-cover object-top-left"
          />
        </div>
      </div>
    </section>
  )
}
