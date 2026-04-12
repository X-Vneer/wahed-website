import type { Metadata } from "next"
import { Locale } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { SaudiRiyal } from "lucide-react"
import PageShadow from "@/components/common/page-shadow"
import {
  buildMetadataFromSeo,
  getProjectSeo,
  getPublicProject,
  getSiteSettings,
} from "@/lib/website-cms"
import Header from "../../_components/header"
import ImageGallery from "./_components/image-gallery"
import ProjectLocationMap from "./_components/map"
import ProjectContactForm from "./_components/project-contact-form"
import ProjectDetails from "./_components/project-details"
import ProjectPageIntro from "./_components/project-page-intro"

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const [seo, settings] = await Promise.all([
    getProjectSeo(slug, locale),
    getSiteSettings(locale),
  ])
  return buildMetadataFromSeo(seo, settings) as Metadata
}

export default async function ProjectDetailsPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale as Locale)

  const project = await getPublicProject(slug, locale)
  const t = await getTranslations("ProjectDetail")

  if (!project) {
    notFound()
  }

  return (
    <>
      <Header variant="dark" />
      <PageShadow />

      <ProjectPageIntro
        tag={project.category ?? ""}
        title={project.title}
        location={
          project.location ?? `${project.cityName}, ${project.regionName}`
        }
        statusLabel={t("statusLabel")}
        statusValue={t(`status.${project.status}`)}
        startingPriceLabel={t("startingPriceLabel")}
        startingPriceValue={
          project.startingPrice
            ? project.startingPrice.toLocaleString(locale)
            : ""
        }
        guideLabel={t("guideLabel")}
        badges={project.badges}
      />
      <ImageGallery title={project.title} images={project.images} />

      <section className="py-6 md:py-10">
        <div className="container">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-5 md:gap-6 lg:grid-cols-3 lg:gap-12">
            <div className="md:col-span-3 lg:col-span-2">
              <ProjectDetails
                title={project.title}
                description={project.description ?? ""}
                features={project.features}
                infoItems={[
                  {
                    label: t("developerLabel"),
                    value: t("developerValue"),
                  },

                  {
                    label: t("sectorLabel"),
                    value: project.category ?? "",
                  },
                  {
                    label: t("deedNumberLabel"),
                    value: project.deedNumber ?? "",
                  },
                  {
                    label: t("areaLabel"),
                    value: project.area
                      ? `${project.area.toLocaleString(locale)} m²`
                      : "",
                  },
                  {
                    label: t("startingPriceLabel"),
                    value: project.startingPrice
                      ? project.startingPrice.toLocaleString(locale)
                      : "",
                    icon: SaudiRiyal,
                  },
                ].filter((item) => item.value)}
              />
            </div>
            <div className="md:col-span-2 lg:col-span-1">
              <ProjectContactForm />
            </div>
          </div>
        </div>
      </section>
      {project.googleMapsAddress && (
        <section className="py-6 md:py-4">
          <div className="container">
            <ProjectLocationMap
              googleMapsAddress={project.googleMapsAddress}
              locationLabel={
                project.location ?? `${project.cityName}, ${project.regionName}`
              }
            />
          </div>
        </section>
      )}
    </>
  )
}
