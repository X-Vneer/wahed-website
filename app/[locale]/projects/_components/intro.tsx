import { Separator } from "@heroui/react"
import { type ProjectsIntroSection } from "@/lib/website-cms"

type Props = {
  content: ProjectsIntroSection
}

export default function ProjectsIntro({ content }: Props) {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-2xl leading-normal font-semibold text-black lg:text-4xl">
            {content.content}
          </p>
        </div>
        <Separator className="mt-10 md:mt-12" />
      </div>
    </section>
  )
}
