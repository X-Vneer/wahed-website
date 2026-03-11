"use client"

import React, { useState } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@heroui/button"
import { Form } from "@heroui/form"
import { Input, Textarea } from "@heroui/input"

type Status = "idle" | "success" | "error"

export default function ContactForm() {
  const t = useTranslations("ContactForm")
  const [status, setStatus] = useState<Status>("idle")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus("idle")

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      // TODO: wire up to backend or email service
      // Keeping this as a placeholder for now.
      console.log("Contact form submission", data)

      event.currentTarget.reset()
      setStatus("success")
    } catch (error) {
      console.error(error)
      setStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form
      onSubmit={handleSubmit}
      validationBehavior="native"
      className="mx-auto max-w-xl space-y-3 rounded-none bg-white md:space-y-6"
    >
      <div className="grid w-full gap-3 md:grid-cols-2 md:gap-6">
        <Input
          className="text-primary"
          name="firstName"
          label={t("firstNameLabel")}
          fullWidth
          placeholder={t("firstNamePlaceholder")}
          variant="bordered"
          radius="none"
          isRequired
          labelPlacement="outside"
        />
        <Input
          className="text-primary"
          name="lastName"
          label={t("lastNameLabel")}
          fullWidth
          placeholder={t("lastNamePlaceholder")}
          variant="bordered"
          radius="none"
          isRequired
          labelPlacement="outside"
        />
      </div>

      <div className="grid w-full gap-6 md:grid-cols-2">
        <Input
          className="text-primary"
          type="email"
          name="email"
          label={t("emailLabel")}
          fullWidth
          placeholder={t("emailPlaceholder")}
          variant="bordered"
          radius="none"
          isRequired
          labelPlacement="outside"
        />
        <Input
          className="text-primary"
          type="tel"
          name="phone"
          label={t("phoneLabel")}
          fullWidth
          placeholder={t("phonePlaceholder")}
          variant="bordered"
          radius="none"
          isRequired
          labelPlacement="outside"
        />
      </div>

      <Textarea
        id="message"
        name="message"
        className="text-primary"
        required
        label={t("messageLabel")}
        placeholder={t("messagePlaceholder")}
        variant="bordered"
        radius="none"
        labelPlacement="outside"
      />

      <div className="w-full space-y-3 pt-2">
        <Button
          type="submit"
          size="lg"
          radius="none"
          fullWidth
          className="h-12 bg-black text-base font-medium text-white"
          isLoading={isSubmitting}
        >
          {t("submit")}
        </Button>

        {status === "success" && (
          <p className="text-sm text-green-600">{t("success")}</p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-600">{t("error")}</p>
        )}
      </div>
    </Form>
  )
}
