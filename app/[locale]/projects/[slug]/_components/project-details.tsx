import {
  Bath,
  BedSingle,
  CarFront,
  Compass,
  Expand,
  MapPin,
} from "lucide-react"

type ProjectDetailItem = {
  label: string
  value: string
}

type ProjectFeature = {
  icon: "location" | "price" | "bedrooms" | "bathrooms" | "parking" | "size"
  title: string
  value: string
}

type ProjectDetailsProps = {
  title: string
  description: string
  infoItems: ProjectDetailItem[]
  featuresTitle: string
  features: ProjectFeature[]
}

const ICON_MAP = {
  location: MapPin,
  price: Compass,
  bedrooms: BedSingle,
  bathrooms: Bath,
  parking: CarFront,
  size: Expand,
} as const

export type { ProjectDetailItem, ProjectFeature, ProjectDetailsProps }

export default function ProjectDetails({
  title,
  description,
  infoItems,
  featuresTitle,
  features,
}: ProjectDetailsProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-black md:text-3xl lg:text-4xl">
        {title}
      </h2>
      <p className="leading-sung text-text-secondary mt-6 text-sm font-medium md:text-base lg:text-lg">
        {description}
      </p>

      <div className="mx-auto grid max-w-4xl grid-cols-2 py-6 md:py-12">
        {infoItems.map((item) => (
          <div key={item.label} className="p-3 md:p-6">
            <p className="text-text-secondary mb-2 text-base font-medium">
              {item.label}
            </p>
            <p className="text-base font-medium text-black md:text-xl lg:text-2xl">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <h3 className="text-2xl font-semibold text-black md:text-3xl lg:text-4xl">
        {featuresTitle}
      </h3>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
        {features.map((feature) => {
          const Icon = ICON_MAP[feature.icon]
          return (
            <article
              key={`${feature.title}-${feature.value}`}
              className="flex flex-col bg-[#F4F4F4] px-4 py-5"
            >
              <div>
                <div className="mb-3 aspect-square w-fit rounded-full bg-white p-2">
                  <Icon className="size-4 text-black" />
                </div>
              </div>
              <p className="text-text-secondary text-sm md:text-base lg:text-lg">
                {feature.title}
              </p>
              <p className="mt-1 text-sm font-semibold text-black md:text-base lg:text-lg">
                {feature.value}
              </p>
            </article>
          )
        })}
      </div>
    </div>
  )
}
