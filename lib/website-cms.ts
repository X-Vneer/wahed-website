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

export type AboutHeroSection = {
  eyebrow: string
  title: string
  backgroundImage: string
}

export type AboutStorySection = {
  eyebrow: string
  title: string
  description: string
  /** Optional CMS image URL; falls back to local asset in the component when empty. */
  decorativeImage?: string
}

export type AboutVisionSection = {
  visionTitle: string
  visionDescription: string
  missionTitle: string
  missionDescription: string
  centerImage: string
  workerAlt?: string
}

export type AboutValuesSection = {
  eyebrow: string
  title: string
  qualityTitle: string
  qualityDescription: string
  innovationTitle: string
  innovationDescription: string
  sustainabilityTitle: string
  sustainabilityDescription: string
}

export type AboutBoardMember = {
  image: string
  name?: string
}

export type AboutBoardSection = {
  eyebrow: string
  title: string
  members: AboutBoardMember[]
}

/** CMS JSON shape for the `about` page (`slug === "about"`). */
export type AboutPageContent = {
  heroSection: AboutHeroSection
  storySection: AboutStorySection
  visionSection: AboutVisionSection
  valuesSection: AboutValuesSection
  boardSection: AboutBoardSection
}

function aboutStr(v: unknown): string {
  return typeof v === "string" ? v : ""
}

function aboutEyebrow(obj: Record<string, unknown> | undefined): string {
  if (!obj) return ""
  return aboutStr(obj.eyebrow ?? obj.eyebrowTitle)
}

function asRecord(v: unknown): Record<string, unknown> | undefined {
  return v && typeof v === "object" && !Array.isArray(v)
    ? (v as Record<string, unknown>)
    : undefined
}

/** Maps CMS field names (e.g. visionMissionSection, eyebrowTitle) to the app shape. */
function normalizeAboutPageContent(
  raw: Record<string, unknown> | null
): AboutPageContent | null {
  if (!raw) return null

  const heroRaw = asRecord(raw.heroSection)
  const heroSection: AboutHeroSection = {
    eyebrow: aboutEyebrow(heroRaw),
    title: aboutStr(heroRaw?.title),
    backgroundImage: aboutStr(heroRaw?.backgroundImage),
  }

  const storyRaw = asRecord(raw.storySection)
  const decorative = aboutStr(storyRaw?.decorativeImage)
  const storySection: AboutStorySection = {
    eyebrow: aboutEyebrow(storyRaw),
    title: aboutStr(storyRaw?.title),
    description: aboutStr(storyRaw?.description ?? storyRaw?.content),
    ...(decorative ? { decorativeImage: decorative } : {}),
  }

  const visionRaw =
    asRecord(raw.visionSection) ?? asRecord(raw.visionMissionSection)
  const workerAlt = aboutStr(visionRaw?.workerAlt)
  const visionSection: AboutVisionSection = {
    visionTitle: aboutStr(visionRaw?.visionTitle),
    visionDescription: aboutStr(
      visionRaw?.visionDescription ?? visionRaw?.visionContent
    ),
    missionTitle: aboutStr(visionRaw?.missionTitle),
    missionDescription: aboutStr(
      visionRaw?.missionDescription ?? visionRaw?.missionContent
    ),
    centerImage: aboutStr(visionRaw?.centerImage ?? visionRaw?.image),
    ...(workerAlt ? { workerAlt } : {}),
  }

  const valuesRaw = asRecord(raw.valuesSection)
  const valuesSection: AboutValuesSection = {
    eyebrow: aboutEyebrow(valuesRaw),
    title: aboutStr(valuesRaw?.title),
    qualityTitle: aboutStr(
      valuesRaw?.qualityTitle ?? valuesRaw?.firstTitle
    ),
    qualityDescription: aboutStr(
      valuesRaw?.qualityDescription ?? valuesRaw?.firstContent
    ),
    innovationTitle: aboutStr(
      valuesRaw?.innovationTitle ?? valuesRaw?.secondTitle
    ),
    innovationDescription: aboutStr(
      valuesRaw?.innovationDescription ?? valuesRaw?.secondContent
    ),
    sustainabilityTitle: aboutStr(
      valuesRaw?.sustainabilityTitle ?? valuesRaw?.thirdTitle
    ),
    sustainabilityDescription: aboutStr(
      valuesRaw?.sustainabilityDescription ?? valuesRaw?.thirdContent
    ),
  }

  const boardRaw = asRecord(raw.boardSection)
  let members: AboutBoardMember[] = []
  const membersRaw = boardRaw?.members
  if (Array.isArray(membersRaw)) {
    members = membersRaw
      .map((m) => {
        if (typeof m === "string") return { image: m }
        const row = asRecord(m)
        if (!row) return { image: "" }
        const name = aboutStr(row.name)
        return {
          image: aboutStr(row.image),
          ...(name ? { name } : {}),
        }
      })
      .filter((m) => m.image.length > 0)
  }

  const boardSection: AboutBoardSection = {
    eyebrow: aboutEyebrow(boardRaw),
    title: aboutStr(boardRaw?.title),
    members,
  }

  return {
    heroSection,
    storySection,
    visionSection,
    valuesSection,
    boardSection,
  }
}

export async function getAboutPageContent(
  locale: string
): Promise<AboutPageContent | null> {
  const raw = await fetchWebsitePageContent("about", locale)
  return normalizeAboutPageContent(raw)
}
