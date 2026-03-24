"use client"

import React, { useState } from "react"
import { useTranslations } from "next-intl"
import {
  Button,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react"

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
        <TextField name="firstName" isRequired fullWidth>
          <Label className="text-primary">{t("firstNameLabel")}</Label>
          <Input
            className="text-primary"
            placeholder={t("firstNamePlaceholder")}
            variant="secondary"
          />
        </TextField>
        <TextField name="lastName" isRequired fullWidth>
          <Label className="text-primary">{t("lastNameLabel")}</Label>
          <Input
            className="text-primary"
            placeholder={t("lastNamePlaceholder")}
            variant="secondary"
          />
        </TextField>
      </div>

      <div className="grid w-full gap-6 md:grid-cols-2">
        <TextField name="email" type="email" isRequired fullWidth>
          <Label className="text-primary">{t("emailLabel")}</Label>
          <Input
            className="text-primary"
            placeholder={t("emailPlaceholder")}
            variant="secondary"
          />
        </TextField>
        <TextField name="phone" type="tel" isRequired fullWidth>
          <Label className="text-primary">{t("phoneLabel")}</Label>
          <Input
            className="text-primary"
            placeholder={t("phonePlaceholder")}
            variant="secondary"
          />
        </TextField>
      </div>

      <TextField name="message" isRequired fullWidth>
        <Label className="text-primary">{t("messageLabel")}</Label>
        <TextArea
          id="message"
          className="text-primary"
          placeholder={t("messagePlaceholder")}
          variant="secondary"
          rows={5}
        />
      </TextField>

      <div className="w-full space-y-3 pt-2">
        <Button
          type="submit"
          size="lg"
          fullWidth
          className="h-12 bg-black text-base font-medium text-white"
          isPending={isSubmitting}
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
