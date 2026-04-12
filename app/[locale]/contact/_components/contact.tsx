import React from "react"
import { type ContactInfoSection } from "@/lib/website-cms"
import ContactForm from "./contact-form"

type Props = {
  content: ContactInfoSection
}

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
                {content.linkedin && (
                  <p className="text-sm text-black">
                    <a
                      href={content.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      LinkedIn
                    </a>
                  </p>
                )}
                {content.instagram && (
                  <p className="text-sm text-black">
                    <a
                      href={content.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Instagram
                    </a>
                  </p>
                )}
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
