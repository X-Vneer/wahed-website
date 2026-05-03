import type { ProjectBadge, PublicProjectStatus } from "@/lib/website-cms"
import { Button } from "@heroui/react"
import { BookOpenText, MapPin, SaudiRiyal } from "lucide-react"

type ProjectPageIntroProps = {
  tag: string
  title: string
  location: string
  statusLabel: string
  status: PublicProjectStatus | null
  startingPriceLabel: string
  startingPriceValue: string
  guideLabel: string
  guideUrl?: string | null
  badges?: ProjectBadge[]
}

export default function ProjectPageIntro({
  tag,
  title,
  location,
  statusLabel,
  status,
  startingPriceLabel,
  startingPriceValue,
  guideLabel,
  guideUrl,
  badges,
}: ProjectPageIntroProps) {
  const hasMeta = Boolean(startingPriceValue || status?.name || guideUrl)

  return (
    <section className="relative pt-6 md:pt-10">
      <div className="h-16 md:h-30"></div>
      <div className="container">
        <div className="flex w-full flex-col justify-between gap-6 md:flex-row md:items-center md:gap-10">
          <div className="flex flex-col gap-3 md:gap-4">
            <div className="flex flex-wrap gap-2 md:mb-1">
              {tag && (
                <span className="bg-secondary px-4 py-1.5 text-sm font-medium text-white md:px-5 md:py-2 md:text-base">
                  {tag}
                </span>
              )}
              {badges?.map((badge) => (
                <span
                  key={badge.id}
                  className="px-4 py-1.5 text-sm font-medium text-white md:px-5 md:py-2 md:text-base"
                  style={{ backgroundColor: badge.color }}
                >
                  {badge.name}
                </span>
              ))}
            </div>

            <h1 className="text-3xl font-bold text-black md:text-5xl">
              {title}
            </h1>

            <p className="text-text-secondary flex items-center gap-2 text-sm font-medium md:text-lg">
              <MapPin className="size-4 md:size-5" />
              <span>{location}</span>
            </p>
          </div>

          {hasMeta && (
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 max-md:border-t max-md:border-black/10 max-md:pt-5 md:gap-10">
              {startingPriceValue && (
                <div className="flex flex-col gap-1 md:gap-2">
                  <p className="text-text-secondary text-xs font-semibold tracking-wide uppercase md:text-lg md:tracking-normal md:normal-case">
                    {startingPriceLabel}
                  </p>
                  <p className="flex items-center gap-1 text-lg font-semibold text-black md:text-xl">
                    {startingPriceValue} <SaudiRiyal />
                  </p>
                </div>
              )}
              {status?.name && (
                <div className="flex flex-col gap-1 md:gap-2">
                  <p className="text-text-secondary text-xs font-semibold tracking-wide uppercase md:text-lg md:tracking-normal md:normal-case">
                    {statusLabel}
                  </p>
                  <p
                    className="text-lg font-semibold md:text-xl"
                    style={
                      status.color ? { color: status.color } : undefined
                    }
                  >
                    {status.name}
                  </p>
                </div>
              )}

              {guideUrl && (
                <div className="flex items-center justify-center max-md:order-last max-md:w-full md:ms-auto">
                  <a
                    href={guideUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="max-md:w-full"
                  >
                    <Button
                      size="lg"
                      variant="primary"
                      className="bg-primary hover:bg-primary/90 text-white max-md:w-full"
                    >
                      <BookOpenText className="size-5" />
                      {guideLabel}
                    </Button>
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
