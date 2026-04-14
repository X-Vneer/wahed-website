"use client"
import * as React from "react"
import LenisScroll from "@/components/common/lenis-scroll"
import {
  SiteSettingsProvider,
  type SiteSettingsContextValue,
} from "./_components/site-settings-context"

function Providers({
  children,
  siteSettings,
}: {
  children: React.ReactNode
  siteSettings: SiteSettingsContextValue
}) {
  return (
    <SiteSettingsProvider value={siteSettings}>
      {children}
      <LenisScroll />
    </SiteSettingsProvider>
  )
}

export default Providers
