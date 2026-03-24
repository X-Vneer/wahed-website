"use client"

import { useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import Image from "next/image"
import { Button, cn, Separator } from "@heroui/react"
import { blackLogo, whiteLogo } from "@/assets"
import { useRouter, usePathname, Link } from "@/i18n/navigation"

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
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

  return (
    <header
      className={cn(
        "relative z-50 container -mb-16 bg-black/30 text-white md:-mb-20 md:bg-transparent md:pt-4",
        variant === "light" ? "text-white" : "text-primary"
      )}
    >
      <nav className="flex items-center justify-between py-3 md:py-0">
        <Link
          href="/"
          className="text-inherit"
          onClick={() => setIsMenuOpen(false)}
        >
          {variant === "light" ? (
            <Image
              src={whiteLogo}
              alt="Raad"
              className="w-20 lg:w-26"
              priority
            />
          ) : (
            <Image
              src={blackLogo}
              alt="Raad"
              className="w-20 lg:w-26"
              priority
            />
          )}
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {menuItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                variant === "light" ? "text-white" : "text-primary"
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
              variant === "light" ? "text-white" : "text-primary"
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
            variant="secondary"
            className="text-white"
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
            variant="ghost"
            className="text-white"
            aria-label="Toggle menu"
            onPress={() => setIsMenuOpen((prev) => !prev)}
          >
            <span className="text-xl leading-none">
              {isMenuOpen ? "×" : "☰"}
            </span>
          </Button>
        </div>
      </nav>

      {isMenuOpen ? (
        <div className="bg-black/95 pb-4 md:hidden">
          <div className="flex flex-col gap-2 pt-2">
            {menuItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="w-full py-2 text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
