"use client"

import { CircleDot, Expand, TrendingUp } from "lucide-react"
import CountUp from "@/components/common/count-up"
import { type HomeStatsSection } from "@/lib/website-cms"

type Props = {
  content: HomeStatsSection
}

export default function Statics({ content }: Props) {
  const stats = [
    {
      id: "first",
      value: content.firstValue,
      label: content.firstLabel,
      Icon: TrendingUp,
    },
    {
      id: "second",
      value: content.secondValue,
      label: content.secondLabel,
      Icon: Expand,
    },
    {
      id: "third",
      value: content.thirdValue,
      label: content.thirdLabel,
      Icon: CircleDot,
    },
  ]

  return (
    <section className="py-12 md:py-26">
      <div className="container">
        <div className="flex flex-col items-stretch divide-[#E9E9E9] max-md:divide-y md:flex-row md:divide-x">
          {stats.map(({ id, value, label, Icon }) => {
            const numericMatch = value.match(/[\d,]+/)
            const numericValue = numericMatch
              ? parseInt(numericMatch[0].replace(/,/g, ""), 10)
              : 0
            const prefix = value.match(/^[^\d]*/)?.[0] ?? ""
            const suffix = value.match(/[^\d]*$/)?.[0] ?? ""

            return (
              <div
                key={id}
                className="flex flex-1 flex-col gap-3 py-5 md:px-10"
              >
                <div className="flex h-10 w-10 items-center justify-center">
                  <Icon
                    className="text-secondary h-7 w-7"
                    strokeWidth={1.6}
                  />
                </div>
                <div className="text-3xl font-semibold text-black md:text-5xl">
                  <span className="text-black">
                    {prefix && (
                      <span className="text-secondary">{prefix}</span>
                    )}
                    <CountUp to={numericValue} separator="," />
                    {suffix}
                  </span>
                </div>
                <p className="text-text-secondary text-lg md:text-2xl">
                  {label}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
