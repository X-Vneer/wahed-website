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
    <section className="bg-white py-8 md:py-10">
      <div className="h-30"></div>
      <div className="container">
        <div className="flex flex-col justify-between md:flex-row">
          <div className="flex flex-col gap-2 md:gap-4">
            <div className="mb-4 flex">
              <span className="bg-secondary px-5 py-2 font-medium text-white">
                {tag}
              </span>
            </div>

            <h1 className="text-primary mb-3 text-3xl font-bold md:text-5xl">
              {title}
            </h1>

            <p className="text-text-secondary flex items-center gap-2 text-base font-medium md:text-lg">
              <MapPin className="size-5" />
              <span>{location}</span>
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col items-center justify-center">
              <p className="mb-2 text-lg font-bold text-[#A8A8A8]">
                {statusLabel}
              </p>
              <p className="text-success text-xl font-medium">{statusValue}</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="mb-2 text-lg font-bold text-[#A8A8A8]">
                {startingPriceLabel}
              </p>
              <p className="text-xl font-medium text-black">
                {startingPriceValue}
              </p>
            </div>

            <div className="flex items-center justify-center">
              <Button size="lg" variant="primary">
                <span className="flex items-center gap-2">
                  <BookOpenText className="size-5" />
                  {guideLabel}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
