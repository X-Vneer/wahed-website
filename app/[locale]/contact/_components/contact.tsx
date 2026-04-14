import React from "react"
import { type ContactInfoSection } from "@/lib/website-cms"
import ContactForm from "./contact-form"

type Props = {
  content: ContactInfoSection
}

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

const Contact = ({ content }: Props) => {
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
                <p className="text-sm text-black">
                  <a href={`tel:${content.phone}`} className="hover:underline">
                    {content.phone}
                  </a>
                </p>
                <p className="text-sm text-black">
                  <a
                    href={`mailto:${content.email}`}
                    className="hover:underline"
                  >
                    {content.email}
                  </a>
                </p>
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
                  {content.instagram && (
                    <p className="text-sm text-black">
                      <a
                        href={content.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center transition-opacity hover:opacity-70"
                        aria-label="Instagram"
                      >
                        <InstagramIcon />
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
