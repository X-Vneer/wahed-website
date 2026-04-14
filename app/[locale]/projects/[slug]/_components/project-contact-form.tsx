"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react"
import { useForm } from "react-hook-form"

const WHATSAPP_URL = "https://wa.me/96658241563"

type Status = "idle" | "success" | "error"
type ContactFormValues = {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
}

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M3 21l1.6-4.6A9 9 0 1 1 12 21a8.9 8.9 0 0 1-4.2-1.1L3 21z" />
      <path d="M8.3 9.1c.2-.5.4-.5.8-.5h.6c.2 0 .4 0 .5.3.2.4.6 1.3.6 1.4s.1.3 0 .5c-.1.2-.2.3-.4.5l-.3.3c-.1.1-.2.2-.1.4.2.4.7 1.1 1.5 1.8 1 .9 1.8 1.2 2.2 1.4.2.1.3 0 .4-.1l.6-.8c.1-.2.3-.2.5-.1.2.1 1.3.6 1.5.7.2.1.4.2.4.3 0 .2 0 1-.4 1.4-.4.4-.9.7-1.5.8-.4.1-.9.1-1.5 0-.4-.1-1-.3-1.7-.6-.4-.2-1.1-.6-1.7-1.1-.6-.5-1.1-1-1.4-1.4-.4-.5-.8-1.1-1.1-1.6-.3-.6-.5-1.1-.6-1.5-.2-.6-.2-1.1-.1-1.5.1-.5.3-1 .7-1.3z" />
    </svg>
  )
}

function ContactMark({ title }: { title: string }) {
  return (
    <div
      className="bg-secondary flex size-16 shrink-0 items-center justify-center rounded-full"
      role="img"
      aria-label={title}
    >
      <svg
        viewBox="0 0 32 32"
        className="size-8 text-white"
        fill="currentColor"
        aria-hidden
      >
        <rect x="8" y="9" width="5" height="5" rx="0.75" />
        <rect x="19" y="9" width="5" height="5" rx="0.75" />
        <rect x="9" y="21" width="14" height="2.5" rx="0.5" />
      </svg>
    </div>
  )
}

const fieldClass =
  "rounded border border-[#e0e0e0] bg-white shadow-none [&::placeholder]:text-[#9ca3af]"

export default function ProjectContactForm({
  projectSlug,
}: {
  projectSlug?: string
}) {
  const t = useTranslations("ProjectContactForm")
  const [status, setStatus] = useState<Status>("idle")
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    mode: "onSubmit",
  })

  const onSubmit = async (data: ContactFormValues) => {
    setStatus("idle")

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_WEBSITE_CMS_API_BASE}/api/public/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            source: "project",
            ...(projectSlug ? { projectSlug } : {}),
          }),
        }
      )

      if (!res.ok) throw new Error("Failed to submit")

      reset()
      setStatus("success")
    } catch (error) {
      console.error(error)
      setStatus("error")
    }
  }

  return (
    <div className="w-full">
      <div className="mb-8 flex gap-4">
        <div>
          <ContactMark title={t("logoAlt")} />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-black md:text-2xl">
            {t("title")}
          </h2>
          <p className="text-text-secondary text-sm md:text-base">
            {t("subtitle")}
          </p>
        </div>
      </div>

      <Form
        onSubmit={handleSubmit(onSubmit)}
        validationBehavior="aria"
        className="w-full space-y-6 bg-white"
      >
        <TextField
          name="email"
          type="email"
          isRequired
          fullWidth
          isInvalid={Boolean(errors.email)}
          className="w-full"
        >
          <Label className="mb-1.5 block text-start text-sm font-medium text-black">
            {t("emailLabel")}
          </Label>
          <Input
            className={`text-black ${fieldClass}`}
            placeholder={t("emailPlaceholder")}
            variant="secondary"
            {...register("email", {
              required: t("errors.emailRequired"),
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: t("errors.emailInvalid"),
              },
            })}
          />
          <FieldError className="mt-1 text-start text-sm text-red-600">
            {errors.email?.message}
          </FieldError>
        </TextField>

        <div className="grid w-full gap-6 sm:grid-cols-2">
          <TextField
            name="firstName"
            isRequired
            fullWidth
            isInvalid={Boolean(errors.firstName)}
            className="w-full"
          >
            <Label className="mb-1.5 block text-start text-sm font-medium text-black">
              {t("firstNameLabel")}
            </Label>
            <Input
              className={`text-black ${fieldClass}`}
              placeholder={t("firstNamePlaceholder")}
              variant="secondary"
              {...register("firstName", {
                required: t("errors.firstNameRequired"),
              })}
            />
            <FieldError className="mt-1 text-start text-sm text-red-600">
              {errors.firstName?.message}
            </FieldError>
          </TextField>
          <TextField
            name="lastName"
            isRequired
            fullWidth
            isInvalid={Boolean(errors.lastName)}
            className="w-full"
          >
            <Label className="mb-1.5 block text-start text-sm font-medium text-black">
              {t("lastNameLabel")}
            </Label>
            <Input
              className={`text-black ${fieldClass}`}
              placeholder={t("lastNamePlaceholder")}
              variant="secondary"
              {...register("lastName", {
                required: t("errors.lastNameRequired"),
              })}
            />
            <FieldError className="mt-1 text-start text-sm text-red-600">
              {errors.lastName?.message}
            </FieldError>
          </TextField>
        </div>

        <TextField
          name="phone"
          type="tel"
          isRequired
          fullWidth
          isInvalid={Boolean(errors.phone)}
          className="w-full"
        >
          <Label className="mb-1.5 block text-start text-sm font-medium text-black">
            {t("phoneLabel")}
          </Label>
          <Input
            className={`text-black ${fieldClass}`}
            placeholder={t("phonePlaceholder")}
            variant="secondary"
            {...register("phone", {
              required: t("errors.phoneRequired"),
              minLength: {
                value: 8,
                message: t("errors.phoneInvalid"),
              },
            })}
          />
          <FieldError className="mt-1 text-start text-sm text-red-600">
            {errors.phone?.message}
          </FieldError>
        </TextField>

        <TextField
          name="message"
          isRequired
          fullWidth
          isInvalid={Boolean(errors.message)}
          className="w-full"
        >
          <Label className="mb-1.5 block text-start text-sm font-medium text-black">
            {t("messageLabel")}
          </Label>
          <TextArea
            id="project-contact-message"
            className={`min-h-36 text-black ${fieldClass}`}
            placeholder={t("messagePlaceholder")}
            variant="secondary"
            rows={6}
            {...register("message", {
              required: t("errors.messageRequired"),
              minLength: {
                value: 10,
                message: t("errors.messageMinLength"),
              },
            })}
          />
          <FieldError className="mt-1 text-start text-sm text-red-600">
            {errors.message?.message}
          </FieldError>
        </TextField>

        <div className="w-full space-y-4 pt-2">
          <Button
            type="submit"
            size="lg"
            fullWidth
            className="bg-primary font-medium text-white"
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

      <div
        className="text-text-secondary relative my-6 flex items-center gap-3"
        role="separator"
      >
        <div className="grow border-t border-[#b8d4e8]" />
        <span className="shrink-0 px-1 text-sm">{t("divider")}</span>
        <div className="grow border-t border-[#b8d4e8]" />
      </div>

      <Button
        size="lg"
        fullWidth
        type="button"
        variant="outline"
        className="border-secondary text-secondary"
        onPress={() => window.open(WHATSAPP_URL, "_blank")}
      >
        <WhatsAppGlyph />
        {t("whatsapp")}
      </Button>
    </div>
  )
}
