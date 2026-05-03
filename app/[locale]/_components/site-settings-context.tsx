"use client"

import { createContext, useContext } from "react"
import type {
  SiteContact,
  SiteLogos,
  SiteSocialMedia,
  SiteTheme,
} from "@/lib/website-cms"
import { DEFAULT_THEME } from "@/lib/website-cms"

export type SiteSettingsContextValue = {
  siteName: string
  footerDescription: string
  theme: SiteTheme
  logos: SiteLogos
  contact: SiteContact
  socialMedia: SiteSocialMedia
}

const DEFAULT_VALUE: SiteSettingsContextValue = {
  siteName: "",
  footerDescription: "",
  theme: DEFAULT_THEME,
  logos: { forDarkBackground: "", forLightBackground: "" },
  contact: { email: "", phone: "" },
  socialMedia: { facebook: "", instagram: "", youtube: "", x: "", whatsapp: "" },
}

const SiteSettingsContext =
  createContext<SiteSettingsContextValue>(DEFAULT_VALUE)

export function SiteSettingsProvider({
  value,
  children,
}: {
  value: SiteSettingsContextValue
  children: React.ReactNode
}) {
  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  )
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext)
}
