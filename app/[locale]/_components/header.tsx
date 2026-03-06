"use client"

import { useTranslations, useLocale } from "next-intl"
import Image from "next/image"
import { Button } from "@heroui/button"
import { Divider } from "@heroui/divider"
import { Link as HeroUILink } from "@heroui/link"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar"
import { whiteLogo } from "@/assets"
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

export default function Header() {
  const t = useTranslations("Header")
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const menuItems = [
    { key: "home", href: "/" },
    { key: "ourProjects", href: "/projects" },
    { key: "ourServices", href: "/services" },
    { key: "aboutCompany", href: "/about" },
    { key: "contactUs", href: "/contact" },
  ] as const

  const switchLocale = () => {
    const nextLocale = locale === "ar" ? "en" : "ar"
    router.replace(pathname, { locale: nextLocale })
  }

  const languageLabel = locale === "ar" ? t("language") : t("languageAr")

  return (
    <Navbar
      isBlurred={false}
      isBordered={false}
      className="-mb-16 bg-black/30 text-white md:-mb-20 md:bg-transparent md:pt-4"
      maxWidth="xl"
      position="static"
    >
      {/* Start: logo (right in RTL, left in LTR) */}
      <NavbarContent justify="start">
        <NavbarBrand>
          <Link href="/" className="text-inherit">
            <Image
              src={whiteLogo}
              alt="Raad"
              className="w-20 lg:w-26"
              priority
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Center: nav links */}
      <NavbarContent justify="end" className="hidden gap-6 md:flex">
        {menuItems.map((item) => (
          <NavbarItem key={item.key}>
            <HeroUILink
              as={Link}
              href={item.href}
              className="text-white/90 transition-colors hover:text-white"
            >
              {t(`nav.${item.key}`)}
            </HeroUILink>
          </NavbarItem>
        ))}
        <div className="h-8">
          <Divider orientation="vertical" className="bg-white" />
        </div>
        <NavbarItem className="flex">
          <Button
            type="button"
            variant="light"
            radius="sm"
            className="text-white"
            onPress={switchLocale}
            aria-label={
              locale === "ar" ? "Switch to English" : "التبديل إلى العربية"
            }
          >
            <GlobeIcon className="shrink-0" />
            <span>{languageLabel}</span>
          </Button>
        </NavbarItem>
      </NavbarContent>
      {/* Center: nav links */}
      <NavbarContent justify="end" className="flex gap-3 md:hidden">
        <NavbarItem className="flex">
          <Button
            type="button"
            variant="light"
            radius="sm"
            className="text-white"
            onPress={switchLocale}
            aria-label={
              locale === "ar" ? "Switch to English" : "التبديل إلى العربية"
            }
          >
            <span>{languageLabel}</span>
            <span className="block h-5 w-px bg-white"></span>
            <GlobeIcon className="shrink-0" />
          </Button>
        </NavbarItem>
        <NavbarMenuToggle className="text-white" aria-label="Toggle menu" />
      </NavbarContent>

      <NavbarMenu className="bg-black/95 pt-6">
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.key}>
            <HeroUILink
              as={Link}
              href={item.href}
              className="w-full text-white"
              size="lg"
            >
              {t(`nav.${item.key}`)}
            </HeroUILink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
