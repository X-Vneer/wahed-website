import { cache } from "react"

/** Base URL of the internal-system app (no trailing slash), e.g. https://dashboard.example.com */
const REVALIDATE_SECONDS = 60

export type HomeHeroSection = {
  title: string
  description: string
  ctaLabel: string
  backgroundImage: string
}

export type HomeBriefSection = {
  content: string
  image: string
}

export type HomeAboutSection = {
  titlePartOne: string
  titlePartTwo: string
  description: string
  ctaLabel: string
  image: string
}

export type HomePartnersSection = {
  eyebrowTitle: string
  title: string
  description: string
  logos: string[]
  content: string
}

export type HomeContactSection = {
  eyebrowTitle: string
  title: string
  description: string
  ctaLabel: string
  content: string
}

export type HomeCtaSection = {
  title: string
  content: string
  ctaLabel: string
  description: string
  eyebrowTitle: string
}

/** CMS JSON shape for the `home` page (`slug === "home"`). */
export type HomePageContent = {
  heroSection: HomeHeroSection
  briefSection: HomeBriefSection
  aboutSection: HomeAboutSection
  partnersSection: HomePartnersSection
  contactSection: HomeContactSection
  ctaSection: HomeCtaSection
}

export const emptyHomeHeroSection: HomeHeroSection = {
  title: "",
  description: "",
  ctaLabel: "",
  backgroundImage: "",
}

export type WebsiteContentApiResponse = {
  slug: string
  locale: string
  content: Record<string, unknown>
}

const fetchWebsitePageContent = cache(
  async (
    slug: string,
    locale: string
  ): Promise<Record<string, unknown> | null> => {
    const base = process.env.WEBSITE_CMS_API_BASE
    if (!base) return null

    const url = `${base}/api/website/content/${encodeURIComponent(slug)}?locale=${encodeURIComponent(locale)}`

    try {
      const res = await fetch(url, {
        next: { revalidate: REVALIDATE_SECONDS },
        headers: { Accept: "application/json" },
      })

      if (!res.ok) return null

      const data = (await res.json()) as WebsiteContentApiResponse
      if (!data.content || typeof data.content !== "object") return null
      return data.content as Record<string, unknown>
    } catch {
      return null
    }
  }
)

export async function getWebsitePageContent(
  slug: string,
  locale: string
): Promise<Record<string, unknown> | null> {
  return fetchWebsitePageContent(slug, locale)
}

export async function getHomePageContent(
  locale: string
): Promise<HomePageContent | null> {
  const content = await fetchWebsitePageContent("home", locale)
  return content as HomePageContent | null
}
