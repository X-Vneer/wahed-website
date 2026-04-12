/* eslint-disable @next/next/no-img-element */
"use client"

import { useEffect, useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import Image from "next/image"
import { Button, cn, Separator } from "@heroui/react"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { blackLogo, whiteLogo } from "@/assets"
import { useRouter, usePathname, Link } from "@/i18n/navigation"
import { useSiteSettings } from "./site-settings-context"

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M2 12h20" />
    </svg>
  )
}

export default function Header({
  variant = "light",
}: {
  variant?: "light" | "dark"
}) {
  const t = useTranslations("Header")
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const { logos } = useSiteSettings()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // variant "light" = light text on dark background → use logo for dark bg (white logo)
  // variant "dark"  = dark text on light background → use logo for light bg (black logo)
  const logoSrc =
    variant === "light"
      ? logos.forDarkBackground || whiteLogo
      : logos.forLightBackground || blackLogo

  const menuItems = [
    { key: "home", href: "/" },
    { key: "ourProjects", href: "/projects" },
    { key: "aboutCompany", href: "/about" },
    { key: "contactUs", href: "/contact" },
  ] as const

  const switchLocale = () => {
    const nextLocale = locale === "ar" ? "en" : "ar"
    router.replace(pathname, { locale: nextLocale })
    setIsMenuOpen(false)
  }

  const languageLabel = locale === "ar" ? t("language") : t("languageAr")

  useEffect(() => {
    if (!isMenuOpen) return

    const scrollY = window.scrollY
    const originalStyles = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    }

    document.body.style.overflow = "hidden"
    document.body.style.position = "fixed"
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = "100%"

    return () => {
      document.body.style.overflow = originalStyles.overflow
      document.body.style.position = originalStyles.position
      document.body.style.top = originalStyles.top
      document.body.style.width = originalStyles.width
      window.scrollTo(0, scrollY)
    }
  }, [isMenuOpen])

  return (
    <header
      className={cn(
        "relative z-50 -mb-16 bg-black/30 text-white md:-mb-15 md:bg-transparent md:pt-4",
        variant === "light" ? "text-white" : "text-black"
      )}
    >
      <div className="container">
        <nav className="flex items-center justify-between py-3 md:py-0">
          <Link
            href="/"
            className="text-inherit"
            onClick={() => setIsMenuOpen(false)}
          >
            <img src={logoSrc} alt="logo" className="h-11 w-auto" />
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {menuItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  variant === "light" ? "text-white" : "text-black"
                )}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
            <Separator
              orientation="vertical"
              className={cn(variant === "light" ? "bg-white" : "bg-primary")}
            />
            <Button
              type="button"
              className={cn(
                "bg-transparent hover:bg-white/10",
                variant === "light" ? "text-white" : "text-black"
              )}
              onPress={switchLocale}
              aria-label={
                locale === "ar" ? "Switch to English" : "التبديل إلى العربية"
              }
            >
              <GlobeIcon className="shrink-0" />
              <span>{languageLabel}</span>
            </Button>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <Button
              type="button"
              className="bg-transparent text-white hover:bg-white/10"
              onPress={switchLocale}
              aria-label={
                locale === "ar" ? "Switch to English" : "التبديل إلى العربية"
              }
            >
              <span>{languageLabel}</span>
              <span className="block h-5 w-px bg-white" />
              <GlobeIcon className="shrink-0" />
            </Button>
            <Button
              type="button"
              isIconOnly
              className="bg-transparent text-white hover:bg-white/10"
              aria-label="Toggle menu"
              onPress={() => setIsMenuOpen((prev) => !prev)}
            >
              {isMenuOpen ? (
                <X size={20} aria-hidden />
              ) : (
                <Menu size={20} aria-hidden />
              )}
            </Button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            className="fixed inset-x-0 top-16 bottom-0 z-60 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="relative flex h-full flex-col bg-linear-to-b from-black via-black to-black/95 px-6 pt-6 pb-8 text-white"
              initial={{ y: "8%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "8%", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <motion.div
                className="flex flex-1 flex-col justify-center gap-3"
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
                  },
                }}
              >
                {menuItems.map((item) => (
                  <motion.div
                    key={item.key}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  >
                    <Link
                      href={item.href}
                      className="block border-b border-white/20 py-4 text-3xl font-medium tracking-tight"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t(`nav.${item.key}`)}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
