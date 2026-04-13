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

export type HomeStatsSection = {
  isActive: boolean
  firstValue: string
  firstLabel: string
  secondValue: string
  secondLabel: string
  thirdValue: string
  thirdLabel: string
}

export type HomePartnersSection = {
  isActive: boolean
  eyebrowTitle: string
  title: string
  description: string
  logos: string[]
}

export type HomeContactSection = {
  eyebrowTitle: string
  title: string
  description: string
  ctaLabel: string
}

/** CMS JSON shape for the `home` page (`slug === "home"`). */
export type HomePageContent = {
  heroSection: HomeHeroSection
  briefSection: HomeBriefSection
  aboutSection: HomeAboutSection
  statsSection: HomeStatsSection
  partnersSection: HomePartnersSection
  contactSection: HomeContactSection
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

function str(v: unknown): string {
  return typeof v === "string" ? v : ""
}

function eyebrow(obj: Record<string, unknown> | undefined): string {
  if (!obj) return ""
  return str(obj.eyebrow ?? obj.eyebrowTitle)
}

function asRecord(v: unknown): Record<string, unknown> | undefined {
  return v && typeof v === "object" && !Array.isArray(v)
    ? (v as Record<string, unknown>)
    : undefined
}

const fetchWebsitePageContent = cache(
  async (
    slug: string,
    locale: string
  ): Promise<Record<string, unknown> | null> => {
    const base = process.env.WEBSITE_CMS_API_BASE
    if (!base) return null

    const url = `${base}/api/public/content/${encodeURIComponent(slug)}?locale=${encodeURIComponent(locale)}`

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

function normalizeHomePageContent(
  raw: Record<string, unknown> | null
): HomePageContent | null {
  if (!raw) return null

  const heroRaw = asRecord(raw.heroSection)
  const heroSection: HomeHeroSection = {
    title: str(heroRaw?.title),
    description: str(heroRaw?.description),
    ctaLabel: str(heroRaw?.ctaLabel),
    backgroundImage: str(heroRaw?.backgroundImage),
  }

  const briefRaw = asRecord(raw.briefSection)
  const briefSection: HomeBriefSection = {
    content: str(briefRaw?.content),
    image: str(briefRaw?.image),
  }

  const aboutRaw = asRecord(raw.aboutSection)
  const aboutSection: HomeAboutSection = {
    titlePartOne: str(aboutRaw?.titlePartOne),
    titlePartTwo: str(aboutRaw?.titlePartTwo),
    description: str(aboutRaw?.description),
    ctaLabel: str(aboutRaw?.ctaLabel),
    image: str(aboutRaw?.image),
  }

  const statsRaw = asRecord(raw.statsSection)
  const statsSection: HomeStatsSection = {
    isActive: statsRaw?.isActive === true,
    firstValue: str(statsRaw?.firstValue),
    firstLabel: str(statsRaw?.firstLabel),
    secondValue: str(statsRaw?.secondValue),
    secondLabel: str(statsRaw?.secondLabel),
    thirdValue: str(statsRaw?.thirdValue),
    thirdLabel: str(statsRaw?.thirdLabel),
  }

  const partnersRaw = asRecord(raw.partnersSection)
  const logosRaw = partnersRaw?.logos
  const logos = Array.isArray(logosRaw)
    ? logosRaw.filter((l): l is string => typeof l === "string")
    : []
  const partnersSection: HomePartnersSection = {
    isActive: partnersRaw?.isActive === true,
    eyebrowTitle: str(partnersRaw?.eyebrowTitle),
    title: str(partnersRaw?.title),
    description: str(partnersRaw?.description),
    logos,
  }

  const contactRaw = asRecord(raw.contactSection)
  const contactSection: HomeContactSection = {
    eyebrowTitle: str(contactRaw?.eyebrowTitle),
    title: str(contactRaw?.title),
    description: str(contactRaw?.description),
    ctaLabel: str(contactRaw?.ctaLabel),
  }

  return {
    heroSection,
    briefSection,
    aboutSection,
    statsSection,
    partnersSection,
    contactSection,
  }
}

export async function getHomePageContent(
  locale: string
): Promise<HomePageContent | null> {
  const raw = await fetchWebsitePageContent("home", locale)
  return normalizeHomePageContent(raw)
}

export type AboutHeroSection = {
  eyebrow: string
  title: string
  description: string
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
  title?: string
}

export type AboutBoardSection = {
  isActive: boolean
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

/** Maps CMS field names (e.g. visionMissionSection, eyebrowTitle) to the app shape. */
function normalizeAboutPageContent(
  raw: Record<string, unknown> | null
): AboutPageContent | null {
  if (!raw) return null

  const heroRaw = asRecord(raw.heroSection)
  const heroSection: AboutHeroSection = {
    eyebrow: eyebrow(heroRaw),
    title: str(heroRaw?.title),
    description: str(heroRaw?.description),
    backgroundImage: str(heroRaw?.backgroundImage),
  }

  const storyRaw = asRecord(raw.storySection)
  const decorative = str(storyRaw?.decorativeImage)
  const storySection: AboutStorySection = {
    eyebrow: eyebrow(storyRaw),
    title: str(storyRaw?.title),
    description: str(storyRaw?.description ?? storyRaw?.content),
    ...(decorative ? { decorativeImage: decorative } : {}),
  }

  const visionRaw =
    asRecord(raw.visionSection) ?? asRecord(raw.visionMissionSection)
  const workerAlt = str(visionRaw?.workerAlt)
  const visionSection: AboutVisionSection = {
    visionTitle: str(visionRaw?.visionTitle),
    visionDescription: str(
      visionRaw?.visionDescription ?? visionRaw?.visionContent
    ),
    missionTitle: str(visionRaw?.missionTitle),
    missionDescription: str(
      visionRaw?.missionDescription ?? visionRaw?.missionContent
    ),
    centerImage: str(visionRaw?.centerImage ?? visionRaw?.image),
    ...(workerAlt ? { workerAlt } : {}),
  }

  const valuesRaw = asRecord(raw.valuesSection)
  const valuesSection: AboutValuesSection = {
    eyebrow: eyebrow(valuesRaw),
    title: str(valuesRaw?.title),
    qualityTitle: str(valuesRaw?.qualityTitle ?? valuesRaw?.firstTitle),
    qualityDescription: str(
      valuesRaw?.qualityDescription ?? valuesRaw?.firstContent
    ),
    innovationTitle: str(valuesRaw?.innovationTitle ?? valuesRaw?.secondTitle),
    innovationDescription: str(
      valuesRaw?.innovationDescription ?? valuesRaw?.secondContent
    ),
    sustainabilityTitle: str(
      valuesRaw?.sustainabilityTitle ?? valuesRaw?.thirdTitle
    ),
    sustainabilityDescription: str(
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
        const name = str(row.name)
        const memberTitle = str(row.title)
        return {
          image: str(row.image),
          ...(name ? { name } : {}),
          ...(memberTitle ? { title: memberTitle } : {}),
        }
      })
      .filter((m) => m.image.length > 0)
  }

  const boardSection: AboutBoardSection = {
    isActive: boardRaw?.isActive === true,
    eyebrow: eyebrow(boardRaw),
    title: str(boardRaw?.title),
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

// ──────────────────────────────────────────────
// Contact page
// ──────────────────────────────────────────────

export type ContactHeroSection = {
  eyebrow: string
  title: string
}

export type ContactInfoSection = {
  title: string
  content: string
  channelsTitle: string
  phone: string
  email: string
  linkedin: string
  instagram: string
}

/** CMS JSON shape for the `contact` page (`slug === "contact"`). */
export type ContactPageContent = {
  heroSection: ContactHeroSection
  infoSection: ContactInfoSection
}

function normalizeContactPageContent(
  raw: Record<string, unknown> | null
): ContactPageContent | null {
  if (!raw) return null

  const heroRaw = asRecord(raw.heroSection)
  const heroSection: ContactHeroSection = {
    eyebrow: str(heroRaw?.eyebrow ?? heroRaw?.eyebrowTitle),
    title: str(heroRaw?.title),
  }

  const infoRaw = asRecord(raw.infoSection) ?? asRecord(raw.contactSection)
  const infoSection: ContactInfoSection = {
    title: str(infoRaw?.title),
    content: str(infoRaw?.content ?? infoRaw?.description),
    channelsTitle: str(infoRaw?.channelsTitle ?? infoRaw?.contactMethodsTitle),
    phone: str(infoRaw?.phone),
    email: str(infoRaw?.email),
    linkedin: str(infoRaw?.linkedin),
    instagram: str(infoRaw?.instagram),
  }

  return { heroSection, infoSection }
}

export async function getContactPageContent(
  locale: string
): Promise<ContactPageContent | null> {
  const raw = await fetchWebsitePageContent("contact", locale)
  return normalizeContactPageContent(raw)
}

// ──────────────────────────────────────────────
// Public Projects
// ──────────────────────────────────────────────

export type ProjectStatus =
  | "PLANNING"
  | "IN_PROGRESS"
  | "ON_HOLD"
  | "COMPLETED"
  | "CANCELLED"

export type ProjectBadge = {
  id: string
  name: string
  color: string
}

export type ProjectFeature = {
  id: string
  label: string
  value: string
  icon: string
}

export type PublicProject = {
  id: string
  slug: string
  title: string
  description: string | null
  shortDescription: string | null
  images: string[]
  isActive: boolean
  status: ProjectStatus
  location: string | null
  area: number | null
  deedNumber: string | null
  googleMapsAddress: string | null
  startingPrice: number | null
  endingPrice: number | null
  cityName: string
  regionName: string
  category: string | null
  badges: ProjectBadge[]
  features: ProjectFeature[]
  createdAt: string
}

type PublicProjectsResponse = {
  projects: PublicProject[]
}

type PublicProjectResponse = {
  project: PublicProject
}

const fetchPublicProjects = cache(
  async (locale: string): Promise<PublicProject[]> => {
    const base = process.env.WEBSITE_CMS_API_BASE
    if (!base) return []

    const url = `${base}/api/public/projects?locale=${encodeURIComponent(locale)}`

    try {
      const res = await fetch(url, {
        next: { revalidate: REVALIDATE_SECONDS },
        headers: { Accept: "application/json" },
      })

      if (!res.ok) return []

      const data = (await res.json()) as PublicProjectsResponse
      if (!Array.isArray(data.projects)) return []
      return data.projects.filter((p) => p.isActive)
    } catch {
      return []
    }
  }
)

const fetchPublicProjectBySlug = cache(
  async (slug: string, locale: string): Promise<PublicProject | null> => {
    const base = process.env.WEBSITE_CMS_API_BASE
    if (!base) return null

    const url = `${base}/api/public/projects/${encodeURIComponent(slug)}?locale=${encodeURIComponent(locale)}`

    try {
      const res = await fetch(url, {
        next: { revalidate: REVALIDATE_SECONDS },
        headers: { Accept: "application/json" },
      })

      if (!res.ok) return null

      const data = (await res.json()) as PublicProjectResponse
      if (!data.project) return null
      return data.project
    } catch {
      return null
    }
  }
)

export async function getPublicProjects(
  locale: string
): Promise<PublicProject[]> {
  return fetchPublicProjects(locale)
}

export async function getPublicProject(
  slug: string,
  locale: string
): Promise<PublicProject | null> {
  return fetchPublicProjectBySlug(slug, locale)
}

// ──────────────────────────────────────────────
// SEO & Site Settings
// ──────────────────────────────────────────────

export type PageSeo = {
  metaTitle: string
  metaDescription: string
  keywords: string
  canonicalUrl: string
  ogImageUrl: string
  twitterHandle: string
  robotsAllowIndex: boolean
}

export type SiteTheme = {
  primaryColor: string
  accentColor: string
  blackColor: string
  secondaryTextColor: string
}

export type SiteLogos = {
  forDarkBackground: string
  forLightBackground: string
}

export type SiteSettings = {
  seo: {
    defaultMetaTitle: string
    defaultMetaDescription: string
    ogImageUrl: string
    siteUrl: string
    twitterSite: string
    robotsAllowIndex: boolean
    keywords: string
  }
  theme: SiteTheme
  logos: SiteLogos
  faviconUrl: string
  googleAnalyticsMeasurementId: string
}

export const DEFAULT_THEME: SiteTheme = {
  primaryColor: "#1e1e1e",
  accentColor: "#fe5f27",
  blackColor: "#171717",
  secondaryTextColor: "#4b5563",
}

function normalizeSeo(raw: unknown): PageSeo | null {
  const obj = asRecord(raw)
  if (!obj) return null
  return {
    metaTitle: str(obj.metaTitle),
    metaDescription: str(obj.metaDescription),
    keywords: str(obj.keywords),
    canonicalUrl: str(obj.canonicalUrl),
    ogImageUrl: str(obj.ogImageUrl),
    twitterHandle: str(obj.twitterHandle),
    robotsAllowIndex: obj.robotsAllowIndex !== false,
  }
}

const fetchPageSeo = cache(
  async (slug: string, locale: string): Promise<PageSeo | null> => {
    const base = process.env.WEBSITE_CMS_API_BASE
    if (!base) return null

    const url = `${base}/api/public/seo/${encodeURIComponent(slug)}?locale=${encodeURIComponent(locale)}`

    try {
      const res = await fetch(url, {
        next: { revalidate: REVALIDATE_SECONDS },
        headers: { Accept: "application/json" },
      })
      if (!res.ok) return null
      const data = (await res.json()) as { seo?: unknown }
      return normalizeSeo(data.seo)
    } catch {
      return null
    }
  }
)

const fetchProjectSeo = cache(
  async (slug: string, locale: string): Promise<PageSeo | null> => {
    const base = process.env.WEBSITE_CMS_API_BASE
    if (!base) return null

    const url = `${base}/api/public/projects/${encodeURIComponent(slug)}/seo?locale=${encodeURIComponent(locale)}`

    try {
      const res = await fetch(url, {
        next: { revalidate: REVALIDATE_SECONDS },
        headers: { Accept: "application/json" },
      })
      if (!res.ok) return null
      const data = (await res.json()) as { seo?: unknown }
      return normalizeSeo(data.seo)
    } catch {
      return null
    }
  }
)

const fetchSiteSettings = cache(
  async (locale: string): Promise<SiteSettings | null> => {
    const base = process.env.WEBSITE_CMS_API_BASE
    if (!base) return null

    const url = `${base}/api/public/settings?locale=${encodeURIComponent(locale)}`

    try {
      const res = await fetch(url, {
        next: { revalidate: REVALIDATE_SECONDS },
        headers: { Accept: "application/json" },
      })
      if (!res.ok) return null
      const data = (await res.json()) as Record<string, unknown>
      const seoRaw = asRecord(data.seo) ?? {}
      const themeRaw = asRecord(data.theme) ?? {}
      const logosRaw = asRecord(data.logos) ?? {}
      return {
        seo: {
          defaultMetaTitle: str(seoRaw.defaultMetaTitle),
          defaultMetaDescription: str(seoRaw.defaultMetaDescription),
          ogImageUrl: str(seoRaw.ogImageUrl),
          siteUrl: str(seoRaw.siteUrl),
          twitterSite: str(seoRaw.twitterSite),
          robotsAllowIndex: seoRaw.robotsAllowIndex !== false,
          keywords: str(seoRaw.keywords),
        },
        theme: {
          primaryColor:
            str(themeRaw.primaryColor) || DEFAULT_THEME.primaryColor,
          accentColor: str(themeRaw.accentColor) || DEFAULT_THEME.accentColor,
          blackColor: str(themeRaw.blackColor) || DEFAULT_THEME.blackColor,
          secondaryTextColor:
            str(themeRaw.secondaryTextColor) ||
            DEFAULT_THEME.secondaryTextColor,
        },
        logos: {
          forDarkBackground: str(logosRaw.forDarkBackground),
          forLightBackground: str(logosRaw.forLightBackground),
        },
        faviconUrl: str(data.faviconUrl),
        googleAnalyticsMeasurementId: str(data.googleAnalyticsMeasurementId),
      }
    } catch {
      return null
    }
  }
)

export async function getPageSeo(
  slug: string,
  locale: string
): Promise<PageSeo | null> {
  return fetchPageSeo(slug, locale)
}

export async function getProjectSeo(
  slug: string,
  locale: string
): Promise<PageSeo | null> {
  return fetchProjectSeo(slug, locale)
}

export async function getSiteSettings(
  locale: string
): Promise<SiteSettings | null> {
  return fetchSiteSettings(locale)
}

type MetadataLike = {
  title?: string
  description?: string
  keywords?: string
  alternates?: { canonical?: string }
  openGraph?: {
    title?: string
    description?: string
    url?: string
    images?: string[]
  }
  twitter?: {
    card: "summary_large_image"
    site?: string
    title?: string
    description?: string
    images?: string[]
  }
  robots?: { index: boolean; follow: boolean }
  icons?: { icon: string }
}

export function buildMetadataFromSeo(
  seo: PageSeo | null,
  settings: SiteSettings | null
): MetadataLike {
  const title = seo?.metaTitle || settings?.seo.defaultMetaTitle || undefined
  const description =
    seo?.metaDescription || settings?.seo.defaultMetaDescription || undefined
  const keywords = seo?.keywords || settings?.seo.keywords || undefined
  const canonical = seo?.canonicalUrl || settings?.seo.siteUrl || undefined
  const ogImage = seo?.ogImageUrl || settings?.seo.ogImageUrl || undefined
  const twitterSite =
    seo?.twitterHandle || settings?.seo.twitterSite || undefined
  const allowIndex =
    seo?.robotsAllowIndex !== false && settings?.seo.robotsAllowIndex !== false

  const metadata: MetadataLike = {}
  if (title) metadata.title = title
  if (description) metadata.description = description
  if (keywords) metadata.keywords = keywords
  if (canonical) metadata.alternates = { canonical }

  const og: NonNullable<MetadataLike["openGraph"]> = {}
  if (title) og.title = title
  if (description) og.description = description
  if (canonical) og.url = canonical
  if (ogImage) og.images = [ogImage]
  if (Object.keys(og).length > 0) metadata.openGraph = og

  const twitter: NonNullable<MetadataLike["twitter"]> = {
    card: "summary_large_image",
  }
  if (twitterSite) twitter.site = twitterSite
  if (title) twitter.title = title
  if (description) twitter.description = description
  if (ogImage) twitter.images = [ogImage]
  metadata.twitter = twitter

  metadata.robots = allowIndex
    ? { index: true, follow: true }
    : { index: false, follow: false }

  if (settings?.faviconUrl) metadata.icons = { icon: settings.faviconUrl }

  return metadata
}
