import React from "react"
import { useTranslations } from "next-intl"
import ContactForm from "./contact-form"

const Contact = () => {
  const t = useTranslations("ContactSection")

  return (
    <section className="relative pb-10">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="flex flex-col items-start justify-start">
            <div className="w-full max-w-md space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold text-black">
                  {t("title")}
                </h2>
                <div className="bg-secondary ml-auto h-px w-full" aria-hidden />
              </div>

              <p className="text-text-secondary text-sm leading-relaxed">
                {t("description")}
              </p>

              <div className="space-y-2 pt-4">
                <p className="text-secondary pb-2 text-sm font-semibold">
                  {t("contactMethodsTitle")}
                </p>
                <p className="text-sm text-black">
                  <a href={`tel:${t("phone")}`} className="hover:underline">
                    {t("phone")}
                  </a>
                </p>
                <p className="text-sm text-black">
                  <a href={`mailto:${t("email")}`} className="hover:underline">
                    {t("email")}
                  </a>
                </p>
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
