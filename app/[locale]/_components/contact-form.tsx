"use client"

import { useState } from "react"
import Image from "next/image"
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
import type { ContactFormSection } from "@/lib/website-cms"
import { useSiteSettings } from "./site-settings-context"

type Status = "idle" | "success" | "error"
type ContactFormValues = {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
}

const fieldClass =
  "rounded border border-[#e0e0e0] bg-white shadow-none [&::placeholder]:text-[#9ca3af]"

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

function buildWhatsAppUrl(number: string) {
  const digits = number.replace(/[^\d]/g, "")
  return digits ? `https://wa.me/${digits}` : ""
}

type ContactFormProps = {
  content: ContactFormSection
  layout?: "split" | "stacked"
  source?: string
  projectSlug?: string
  submitClassName?: string
  containerClassName?: string
}

export default function ContactForm({
  content,
  layout = "split",
  source,
  projectSlug,
  submitClassName = "h-12 bg-black text-base font-medium text-white",
  containerClassName = "mx-auto w-full max-w-xl",
}: ContactFormProps) {
  const t = useTranslations("ContactForm")
  const { contact } = useSiteSettings()
  const {
    sectionTitle,
    sectionSubtitle,
    avatarImage,
    submitLabel,
    orText,
    whatsappLabel,
    whatsappNumber,
  } = content
  const whatsappUrl = buildWhatsAppUrl(whatsappNumber || contact.whatsapp)
  const [status, setStatus] = useState<Status>("idle")
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    mode: "onBlur",
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
            ...(source ? { source } : {}),
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

  const firstNameField = (
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
  )

  const lastNameField = (
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
  )

  const emailField = (
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
  )

  const phoneField = (
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
  )

  return (
    <div className={containerClassName}>
      {(sectionTitle || sectionSubtitle || avatarImage) && (
        <div className="mb-8 flex items-center gap-4">
          {avatarImage && (
            <div className="relative size-16 shrink-0 overflow-hidden rounded-full">
              <Image
                src={avatarImage}
                alt={sectionTitle || ""}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
          )}
          <div className="space-y-1">
            {sectionTitle && (
              <h2 className="text-xl font-semibold text-black md:text-2xl">
                {sectionTitle}
              </h2>
            )}
            {sectionSubtitle && (
              <p className="text-text-secondary text-sm md:text-base">
                {sectionSubtitle}
              </p>
            )}
          </div>
        </div>
      )}

      <Form
        onSubmit={handleSubmit(onSubmit)}
        validationBehavior="aria"
        className="space-y-6 rounded-none bg-white"
      >
        {layout === "split" ? (
          <>
            <div className="grid w-full gap-6 md:grid-cols-2">
              {firstNameField}
              {lastNameField}
            </div>
            <div className="grid w-full gap-6 md:grid-cols-2">
              {emailField}
              {phoneField}
            </div>
          </>
        ) : (
          <>
            {emailField}
            <div className="grid w-full gap-6 sm:grid-cols-2">
              {firstNameField}
              {lastNameField}
            </div>
            {phoneField}
          </>
        )}

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
            id="message"
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

        <div className="w-full space-y-3 pt-2">
          <Button
            type="submit"
            size="lg"
            fullWidth
            className={submitClassName}
            isPending={isSubmitting}
          >
            {submitLabel || t("submit")}
          </Button>

          {status === "success" && (
            <p className="text-sm text-green-600">{t("success")}</p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-600">{t("error")}</p>
          )}
        </div>
      </Form>

      {whatsappUrl && (
        <>
          <div
            className="text-text-secondary relative my-6 flex items-center gap-3"
            role="separator"
          >
            <div className="grow border-t border-[#b8d4e8]" />
            {orText && <span className="shrink-0 px-1 text-sm">{orText}</span>}
            <div className="grow border-t border-[#b8d4e8]" />
          </div>

          <Button
            size="lg"
            fullWidth
            type="button"
            variant="outline"
            className="border-secondary text-secondary"
            onPress={() => window.open(whatsappUrl, "_blank")}
          >
            <WhatsAppGlyph />
            {whatsappLabel}
          </Button>
        </>
      )}
    </div>
  )
}
