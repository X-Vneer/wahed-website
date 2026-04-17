/* eslint-disable @next/next/no-img-element */
"use client"

import { useTranslations } from "next-intl"
import { blackLogo } from "@/assets"
import { Link } from "@/i18n/navigation"
import { useSiteSettings } from "./site-settings-context"

const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "ourProjects", href: "/projects" },
  { key: "ourServices", href: "/services" },
  { key: "aboutCompany", href: "/about" },
  { key: "contactUs", href: "/contact" },
] as const

const SOCIAL_LINKS = [
  {
    key: "instagram",
    href: "#",
    ariaKey: "instagram",
    icon: (
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
        aria-hidden
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    key: "x",
    href: "#",
    ariaKey: "x",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    key: "youtube",
    href: "#",
    ariaKey: "youtube",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    key: "facebook",
    href: "#",
    ariaKey: "facebook",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
] as const

export default function Footer() {
  const t = useTranslations("Header")
  const tFooter = useTranslations("Footer")
  const { logos } = useSiteSettings()
  // Footer has a light (white) background → use the logo for light backgrounds
  const logoSrc = logos.forLightBackground || blackLogo

  return (
    <footer className="bg-white">
      <div className="container pt-10 pb-6 md:pt-12">
        {/* Main footer: logo + tagline (right) | nav links (left) */}
        <div className="flex flex-col items-center gap-8 py-10 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col text-center max-md:items-center">
            <Link href="/" className="inline-block">
              <img
                src={logoSrc}
                alt={tFooter("logoAlt")}
                className="h-11 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm text-[#4B5563]">{tFooter("tagline")}</p>
          </div>

          <nav
            className="flex flex-wrap items-center justify-center divide-x divide-[#4B5563] text-[#4B5563]"
            aria-label={tFooter("navAriaLabel")}
          >
            {NAV_ITEMS.map((item) => (
              <span key={item.key} className="flex items-center gap-0 px-4">
                <Link
                  href={item.href}
                  className="t text-sm transition-colors hover:text-[#6B7280]"
                >
                  {t(`nav.${item.key}`)}
                </Link>
              </span>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="my-6 h-px w-full bg-[#6C9FB8]" aria-hidden />

        {/* Sub-footer: social (left) | copyright (right) */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-[#4B5563]">{tFooter("copyright")}</p>

          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ key, href, ariaKey, icon }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4B5563] transition-colors hover:text-[#6B7280]"
                aria-label={tFooter(`social.${ariaKey}`)}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
