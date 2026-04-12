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

export default function ContactForm() {
  const t = useTranslations("ContactForm")
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
      // TODO: wire up to backend or email service
      // Keeping this as a placeholder for now.
      console.log("Contact form submission", data)

      reset()
      setStatus("success")
    } catch (error) {
      console.error(error)
      setStatus("error")
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      validationBehavior="aria"
      className="mx-auto max-w-xl space-y-6 rounded-none bg-white"
    >
      <div className="grid w-full gap-6 md:grid-cols-2">
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

      <div className="grid w-full gap-6 md:grid-cols-2">
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
      </div>

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
