import { Locale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { aboutImage, heroImage, projectImage, projectsHero } from "@/assets"
import PageShadow from "@/components/common/page-shadow"
import Header from "../../_components/header"
import ImageGallery from "./_components/image-gallery"
import ProjectContactForm from "./_components/project-contact-form"
import ProjectDetails, {
  ProjectDetailItem,
  ProjectFeature,
} from "./_components/project-details"
import ProjectPageIntro from "./_components/project-page-intro"

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

const PROJECTS_CONTENT = {
  "al-rahmaniyah": {
    tag: "مجمع سكني",
    title: "مجمع الريحانة السكني",
    location: "مجمع الفيحاء - الدمام",
    statusLabel: "حالة المشروع",
    statusValue: "متاح للحجز",
    startingPriceLabel: "الأسعار تبدأ من",
    startingPriceValue: "20.000$",
    guideLabel: "دليل المشروع",
    images: [projectsHero, projectImage, aboutImage, heroImage, projectsHero],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    details: {
      title: "حياة بتوازن مثالي",
      description:
        "يجسد مشروع الرحمانية السكني رؤية شركة وهد للاستثمار العقاري في تقديم تجربة سكنية متكاملة تجمع بين جودة التصميم وخصوصية العيش والقيمة المستدامة. تم تطوير المشروع بعناية ليلائم احتياجات الأسرة الحديثة، مع مراعاة عناصر الراحة والهوية المعمارية التي تعزز من جودة الحياة وتضمن استثمارا طويل الأمد.",
      infoItems: [
        { label: "المطور والمستثمر", value: "شركة وهد" },
        { label: "القطاع", value: "التطوير السكني" },
        { label: "الخدمات المقدمة", value: "إشراف، تخطيط، تسويق" },
        { label: "مساحة المشروع", value: "120,000 م²" },
      ] satisfies ProjectDetailItem[],
      featuresTitle: "الميزات الرئيسية",
      features: [
        {
          icon: "location",
          title: "موقع العقار",
          value: "حي الصحابة - الدمام",
        },
        { icon: "price", title: "السعر يبدأ", value: "20000$" },
        { icon: "bedrooms", title: "غرف نوم", value: "3 غرف" },
        { icon: "bathrooms", title: "دورة مياه", value: "3 دورات" },
        { icon: "parking", title: "موقف سيارات", value: "موقف" },
        { icon: "size", title: "مسطح", value: "1 مسطح" },
      ] satisfies ProjectFeature[],
    },
  },
  "al-fayhaa": {
    tag: "مجمع سكني",
    title: "فلل الفيحاء الحضرية",
    location: "حي الفيحاء - الدمام",
    statusLabel: "حالة المشروع",
    statusValue: "متاح للحجز",
    startingPriceLabel: "الأسعار تبدأ من",
    startingPriceValue: "18.500$",
    guideLabel: "دليل المشروع",
    images: [aboutImage, heroImage, projectImage, projectsHero, aboutImage],
    details: {
      title: "تفاصيل المشروع",
      description:
        "يقدم مشروع الفيحاء تجربة سكنية عملية تجمع بين المساحات المدروسة وحلول التخطيط الذكي بما يحقق توازنا بين جودة المعيشة والعائد الاستثماري. تم تصميم وحدات المشروع لتلائم احتياجات العائلات الباحثة عن الاستقرار ضمن بيئة حضرية متكاملة.",
      infoItems: [
        { label: "المطور والمستثمر", value: "شركة وهد" },
        { label: "القطاع", value: "فلل سكنية" },
        { label: "الخدمات المقدمة", value: "تطوير، تسويق، إدارة" },
        { label: "مساحة المشروع", value: "95,000 م²" },
      ] satisfies ProjectDetailItem[],
      featuresTitle: "أبرز الميزات",
      features: [
        {
          icon: "location",
          title: "موقع العقار",
          value: "حي الفيحاء - الدمام",
        },
        { icon: "price", title: "السعر يبدأ", value: "18500$" },
        { icon: "bedrooms", title: "غرف نوم", value: "4 غرف" },
        { icon: "bathrooms", title: "دورة مياه", value: "4 دورات" },
        { icon: "parking", title: "موقف سيارات", value: "2 موقف" },
        { icon: "size", title: "مسطح", value: "2 مسطح" },
      ] satisfies ProjectFeature[],
    },
  },
} as const

export default async function ProjectDetailsPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale as Locale)

  const project = PROJECTS_CONTENT[slug as keyof typeof PROJECTS_CONTENT]

  if (!project) {
    notFound()
  }

  return (
    <>
      <Header variant="dark" />
      <PageShadow />

      <ProjectPageIntro {...project} />
      <ImageGallery
        title={project.title}
        images={project.images}
        videoUrl={"videoUrl" in project ? project.videoUrl : undefined}
      />
      <section className="py-6 md:py-10">
        <div className="container">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-5 lg:grid-cols-3 lg:gap-12">
            <div className="md:col-span-3 lg:col-span-2">
              <ProjectDetails {...project.details} />
            </div>
            <div className="md:col-span-2 lg:col-span-1">
              <ProjectContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
