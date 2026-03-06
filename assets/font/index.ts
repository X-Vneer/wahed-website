import { IBM_Plex_Sans_Arabic } from "next/font/google"
import localFont from "next/font/local"

export const satoshi = localFont({
  src: [
    // Light
    { path: "./satoshi/Satoshi-Light.otf", weight: "300", style: "normal" },
    {
      path: "./satoshi/Satoshi-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    // Regular
    { path: "./satoshi/Satoshi-Regular.otf", weight: "400", style: "normal" },
    { path: "./satoshi/Satoshi-Italic.otf", weight: "400", style: "italic" },
    // Medium
    { path: "./satoshi/Satoshi-Medium.otf", weight: "500", style: "normal" },
    {
      path: "./satoshi/Satoshi-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    // Bold
    { path: "./satoshi/Satoshi-Bold.otf", weight: "700", style: "normal" },
    {
      path: "./satoshi/Satoshi-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    // Black
    { path: "./satoshi/Satoshi-Black.otf", weight: "900", style: "normal" },
    {
      path: "./satoshi/Satoshi-BlackItalic.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
})

export const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans-arabic",
})
