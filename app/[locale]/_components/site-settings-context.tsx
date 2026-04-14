"use client"

import { createContext, useContext } from "react"
import type { SiteLogos, SiteTheme } from "@/lib/website-cms"
import { DEFAULT_THEME } from "@/lib/website-cms"

export type SiteSettingsContextValue = {
  theme: SiteTheme
  logos: SiteLogos
}

const DEFAULT_VALUE: SiteSettingsContextValue = {
  theme: DEFAULT_THEME,
  logos: { forDarkBackground: "", forLightBackground: "" },
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
