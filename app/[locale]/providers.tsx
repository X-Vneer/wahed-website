"use client"
import * as React from "react"
import { HeroUIProvider } from "@heroui/system"
import LenisScroll from "@/components/common/lenis-scroll"

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      {children}
      <LenisScroll />
    </HeroUIProvider>
  )
}

export default Providers
