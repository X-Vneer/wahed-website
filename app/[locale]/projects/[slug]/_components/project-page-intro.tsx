import { Button } from "@heroui/react"
import { BookOpenText, MapPin } from "lucide-react"

type ProjectPageIntroProps = {
  tag: string
  title: string
  location: string
  statusLabel: string
  statusValue: string
  startingPriceLabel: string
  startingPriceValue: string
  guideLabel: string
}

export default function ProjectPageIntro({
  tag,
  title,
  location,
  statusLabel,
  statusValue,
  startingPriceLabel,
  startingPriceValue,
  guideLabel,
}: ProjectPageIntroProps) {
  return (
    <section className="relative py-8 md:py-10">
      <div className="h-30"></div>
      <div className="container">
        <div className="flex w-full flex-col justify-between max-md:gap-10 md:flex-row md:items-center">
          <div className="flex flex-col gap-2 md:gap-4">
            <div className="mb-1 flex md:mb-4">
              <span className="bg-secondary px-5 py-2 font-medium text-white">
                {tag}
              </span>
            </div>

            <h1 className="text-primary mb-2 text-3xl font-bold md:mb-3 md:text-5xl">
              {title}
            </h1>

            <p className="text-text-secondary flex items-center gap-2 text-sm font-medium md:text-lg">
              <MapPin className="size-4 md:size-5" />
              <span>{location}</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-6">
            <div className="flex flex-col">
              <p className="mb-2 text-lg font-bold text-[#A8A8A8]">
                {statusLabel}
              </p>
              <p className="text-success text-base font-medium md:text-xl">
                {statusValue}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="mb-2 text-lg font-bold text-[#A8A8A8]">
                {startingPriceLabel}
              </p>
              <p className="text-base font-medium text-black md:text-xl">
                {startingPriceValue}
              </p>
            </div>

            <div className="flex items-center justify-center max-sm:col-span-2">
              <Button
                size="lg"
                variant="primary"
                className={
                  "bg-primary hover:bg-primary/90 text-white max-md:w-full"
                }
              >
                <BookOpenText className="size-5" />
                {guideLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
