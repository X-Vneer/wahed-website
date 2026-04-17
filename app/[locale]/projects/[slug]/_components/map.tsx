import { getLocale, getTranslations } from "next-intl/server"

type ProjectLocationMapProps = {
  googleMapsAddress: string
  locationLabel: string
}

function extractCoords(url: string): { lat: string; lng: string } | null {
  const patterns = [
    /!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/,
    /@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/,
    /[?&]q=(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/,
    /[?&]ll=(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return { lat: match[1], lng: match[2] }
  }
  return null
}

async function resolveShortUrl(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: { "User-Agent": "Mozilla/5.0" },
      next: { revalidate: 60 * 60 * 24 * 7 },
    })
    return res.url || url
  } catch {
    return url
  }
}

async function toEmbedSrc(input: string, locale: string): Promise<string> {
  let value = input.trim()

  if (value.includes("/maps/embed")) {
    return value
  }

  if (/(?:maps\.app\.goo\.gl|goo\.gl\/maps)/.test(value)) {
    value = await resolveShortUrl(value)
  }

  const coords = extractCoords(value)
  if (coords) {
    return `https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=15&hl=${locale}&output=embed`
  }

  return `https://maps.google.com/maps?q=${encodeURIComponent(value)}&z=15&hl=${locale}&output=embed`
}

export default async function ProjectLocationMap({
  googleMapsAddress,
  locationLabel,
}: ProjectLocationMapProps) {
  const t = await getTranslations("ProjectLocationMap")
  const locale = await getLocale()
  const src = await toEmbedSrc(googleMapsAddress, locale)

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
