"use client"

import { useMemo } from "react"
import Image, { StaticImageData } from "next/image"
import { useTranslations } from "next-intl"
import {
  cn,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContainer,
  ModalDialog,
} from "@heroui/react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export type GalleryImage = StaticImageData | string

type ImageSliderModalProps = {
  title: string
  images: readonly GalleryImage[]
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  activeIndex: number
  onActiveIndexChange: (index: number) => void
}

export default function ImageSliderModal({
  title,
  images,
  isOpen,
  onOpenChange,
  activeIndex,
  onActiveIndexChange,
}: ImageSliderModalProps) {
  const t = useTranslations("ProjectGallery")
  const galleryImages = useMemo(() => images.filter(Boolean), [images])

  if (!galleryImages.length) {
    return null
  }

  const activeImageIndex = Math.min(
    Math.max(activeIndex, 0),
    Math.max(galleryImages.length - 1, 0)
  )
  const currentImage = galleryImages[activeImageIndex] ?? galleryImages[0]

  const showPrevious = () => {
    onActiveIndexChange(
      activeImageIndex === 0 ? galleryImages.length - 1 : activeImageIndex - 1
    )
  }

  const showNext = () => {
    onActiveIndexChange(
      activeImageIndex === galleryImages.length - 1 ? 0 : activeImageIndex + 1
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalBackdrop />
      <ModalContainer
        size="full"
        className="m-0 h-screen max-h-screen rounded-none bg-black"
      >
        <ModalDialog>
          <ModalBody className="p-0">
            <div className="relative flex h-screen w-full items-center justify-center">
              {currentImage ? (
                <Image
                  src={currentImage}
                  alt={t("imageAlt", { title, index: activeImageIndex + 1 })}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              ) : null}

              <button
                type="button"
                className="absolute left-4 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/35"
                onClick={showPrevious}
                aria-label={t("previousImage")}
              >
                <ChevronLeft className="size-6" />
              </button>

              <button
                type="button"
                className="absolute right-4 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/35"
                onClick={showNext}
                aria-label={t("nextImage")}
              >
                <ChevronRight className="size-6" />
              </button>

              <div className="absolute bottom-3 left-1/2 z-20 flex w-[min(92vw,980px)] -translate-x-1/2 gap-2 overflow-x-auto rounded-sm bg-black/35 p-2 backdrop-blur">
                {galleryImages.map((image, index) => (
                  <button
                    key={`${title}-thumb-${index}`}
                    type="button"
                    onClick={() => onActiveIndexChange(index)}
                    className={cn(
                      "relative h-14 w-20 shrink-0 overflow-hidden border",
                      index === activeImageIndex
                        ? "border-white"
                        : "border-white/20 opacity-75"
                    )}
                    aria-label={t("goToImage", { index: index + 1 })}
                  >
                    <Image
                      src={image}
                      alt={t("thumbnailAlt", { title, index: index + 1 })}
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="absolute right-4 top-4 z-20 rounded-full bg-white/20 px-3 py-2 text-sm text-white backdrop-blur transition hover:bg-white/35"
                onClick={() => onOpenChange(false)}
              >
                {t("close")}
              </button>
            </div>
          </ModalBody>
        </ModalDialog>
      </ModalContainer>
    </Modal>
  )
}
