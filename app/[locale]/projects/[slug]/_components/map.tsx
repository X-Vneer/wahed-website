"use client"

import { useLocale, useTranslations } from "next-intl"

type ProjectLocationMapProps = {
  googleMapsAddress: string
  locationLabel: string
}

export default function ProjectLocationMap({
  googleMapsAddress,
  locationLabel,
}: ProjectLocationMapProps) {
  const t = useTranslations("ProjectLocationMap")
  const locale = useLocale()
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(googleMapsAddress)}&z=15&hl=${locale}&output=embed`

  return (
    <div>
      <h2 className="text-2xl font-bold text-black md:text-3xl lg:text-4xl">
        {t("title")}
      </h2>
      <div className="mt-6 aspect-video w-full overflow-hidden rounded-sm bg-[#F4F4F4]">
        <iframe
          title={t("iframeTitle", { location: locationLabel })}
          src={src}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </div>
  )
}
