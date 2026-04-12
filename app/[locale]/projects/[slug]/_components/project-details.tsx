/* eslint-disable @next/next/no-img-element */
/** eslint-disable @next/next/no-img-element */
import type { ProjectFeature } from "@/lib/website-cms"

type InfoItem = {
  label: string
  value: string
}

type ProjectDetailsProps = {
  title: string
  description: string
  features: ProjectFeature[]
  infoItems: InfoItem[]
}

export default function ProjectDetails({
  title,
  description,
  features,
  infoItems,
}: ProjectDetailsProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-black md:text-3xl lg:text-4xl">
        {title}
      </h2>
      <p className="leading-sung text-text-secondary mt-6 text-sm font-medium md:text-base lg:text-lg">
        {description}
      </p>

      {infoItems.length > 0 && (
        <div className="mx-auto grid max-w-2xl grid-cols-2 py-6 md:py-12">
          {infoItems.map((item) => (
            <div
              key={item.label}
              className="border-b border-[#E9E9E9] p-3 md:p-6"
            >
              <p className="text-text-secondary mb-2 text-base font-medium">
                {item.label}
              </p>
              <p className="text-base font-medium text-black md:text-xl lg:text-2xl">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {features.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
          {features.map((feature) => {
            return (
              <article
                key={feature.id}
                className="flex flex-col bg-[#F4F4F4] px-4 py-5"
              >
                <div>
                  <div className="mb-3 aspect-square w-fit rounded-full bg-white p-2">
                    <img
                      src={feature.icon}
                      alt={feature.label}
                      className="size-4 text-black"
                    />
                  </div>
                </div>
                <p className="text-text-secondary text-sm md:text-base lg:text-lg">
                  {feature.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-black md:text-base lg:text-lg">
                  {feature.value}
                </p>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
