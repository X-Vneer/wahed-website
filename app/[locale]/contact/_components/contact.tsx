import React from "react"
import { getLocale } from "next-intl/server"
import {
  type ContactFormSection,
  type ContactInfoSection,
  getSiteSettings,
} from "@/lib/website-cms"
import ContactForm from "../../_components/contact-form"

type Props = {
  content: ContactInfoSection
  formContent: ContactFormSection
}

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-5"
    aria-hidden
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.04 2C6.507 2 2 6.505 2 12.05c0 1.959.511 3.87 1.482 5.55L2 22l4.52-1.474A9.946 9.946 0 0 0 12.04 22c5.533 0 10.04-4.505 10.04-10.05C22.08 6.505 17.573 2 12.04 2z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-5"
    aria-hidden
  >
    <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19ZM8.34 17.34V10.34H6V17.34H8.34ZM7.17 9.37C7.92 9.37 8.41 8.85 8.41 8.21C8.4 7.55 7.92 7.06 7.18 7.06C6.44 7.06 5.95 7.55 5.95 8.21C5.95 8.85 6.42 9.37 7.15 9.37H7.17ZM18 17.34V13.33C18 11.18 16.85 10.18 15.32 10.18C14.08 10.18 13.52 10.86 13.21 11.34V10.34H10.87C10.9 11 10.87 17.34 10.87 17.34H13.21V13.43C13.21 13.22 13.22 13.01 13.29 12.86C13.46 12.43 13.85 11.98 14.5 11.98C15.35 11.98 15.69 12.63 15.69 13.58V17.34H18Z" />
  </svg>
)

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-5"
    aria-hidden
  >
    <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const Contact = async ({ content, formContent }: Props) => {
  const locale = await getLocale()
  const settings = await getSiteSettings(locale)
  const phone = content.phone || settings?.contact.phone || ""
  const email = content.email || settings?.contact.email || ""
  const whatsappUrl = settings?.socialMedia.whatsapp || ""
  const whatsappLabel = whatsappUrl
    ? whatsappUrl.replace(/^https?:\/\/(wa\.me\/|api\.whatsapp\.com\/send\?phone=)/i, "+")
    : ""
  const instagramUrl = content.instagram || settings?.socialMedia.instagram || ""

  return (
    <section className="relative pb-10">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="flex flex-col items-start justify-start">
            <div className="w-full max-w-md space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold text-black">
                  {content.title}
                </h2>
                <div className="bg-secondary ml-auto h-px w-full" aria-hidden />
              </div>

              <p className="text-text-secondary text-sm leading-relaxed">
                {content.content}
              </p>

              <div className="space-y-2 pt-4">
                <p className="text-secondary pb-2 text-sm font-semibold">
                  {content.channelsTitle}
                </p>
                {phone && (
                  <p className="text-sm text-black">
                    <a href={`tel:${phone}`} className="hover:underline">
                      {phone}
                    </a>
                  </p>
                )}
                {email && (
                  <p className="text-sm text-black">
                    <a href={`mailto:${email}`} className="hover:underline">
                      {email}
                    </a>
                  </p>
                )}
                {whatsappUrl && (
                  <p className="text-sm text-black">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {whatsappLabel}
                    </a>
                  </p>
                )}
                <div className="mt-2 flex items-center gap-2">
                  {content.linkedin && (
                    <p className="text-sm text-black">
                      <a
                        href={content.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center transition-opacity hover:opacity-70"
                        aria-label="LinkedIn"
                      >
                        <LinkedInIcon />
                      </a>
                    </p>
                  )}
                  {instagramUrl && (
                    <p className="text-sm text-black">
                      <a
                        href={instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center transition-opacity hover:opacity-70"
                        aria-label="Instagram"
                      >
                        <InstagramIcon />
                      </a>
                    </p>
                  )}
                  {whatsappUrl && (
                    <p className="text-sm text-black">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center transition-opacity hover:opacity-70"
                        aria-label="WhatsApp"
                      >
                        <WhatsAppIcon />
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            <ContactForm content={formContent} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
