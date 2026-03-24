"use client"
import * as React from "react"
import LenisScroll from "@/components/common/lenis-scroll"

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <LenisScroll />
    </>
  )
}

export default Providers
