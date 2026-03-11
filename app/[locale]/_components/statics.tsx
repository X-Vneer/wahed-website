"use client"

import { useTranslations } from "next-intl"
import { CircleDot, Expand, TrendingUp } from "lucide-react"
import CountUp from "@/components/common/count-up"

const STATS = [
  {
    id: "yearsExperience",
    value: 10,
    prefix: "+",
    suffix: "",
    labelKey: "yearsExperience",
    Icon: TrendingUp,
  },
  {
    id: "builtArea",
    value: 120,
    prefix: "+",
    suffix: "K",
    labelKey: "builtArea",
    Icon: Expand,
  },

  {
    id: "totalArea",
    value: 20,
    prefix: "+",
    suffix: "",
    labelKey: "totalProjectsArea",
    Icon: CircleDot,
  },
] as const

export default function Statics() {
  const t = useTranslations("AboutSection")

  return (
    <section className="py-12 md:py-26">
      <div className="container">
        <div className="flex flex-col items-stretch divide-[#E9E9E9] max-md:divide-y md:flex-row md:divide-x">
          {STATS.map(({ id, value, prefix, suffix, labelKey, Icon }) => (
            <div key={id} className="flex flex-1 flex-col gap-3 py-5 md:px-10">
              <div className="flex h-10 w-10 items-center justify-center">
                <Icon className="text-secondary h-7 w-7" strokeWidth={1.6} />
              </div>
              <div className="text-3xl font-semibold text-black md:text-5xl">
                <span className="text-primary">
                  <span className="text-secondary">{prefix}</span>
                  <CountUp to={value} separator="," />
                  {suffix}
                </span>
              </div>
              <p className="text-text-secondary text-lg md:text-2xl">
                {t(labelKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
