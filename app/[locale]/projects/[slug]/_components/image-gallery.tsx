"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Button } from "@heroui/button"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal"
import { ImageIcon, Play } from "lucide-react"
import ImageSliderModal, { type GalleryImage } from "./image-slider-modal"

type ImageGalleryProps = {
  title: string
  images: readonly GalleryImage[]
  videoUrl?: string
}

export default function ImageGallery({
  title,
  images,
  videoUrl,
}: ImageGalleryProps) {
  const t = useTranslations("ProjectGallery")
  const galleryImages = useMemo(() => images.filter(Boolean), [images])
  const previewImages = galleryImages.slice(0, 5)

  const [isSliderOpen, setIsSliderOpen] = useState(false)
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const hasVideo = Boolean(videoUrl)

  if (!galleryImages.length) {
    return null
  }

  const openSliderAt = (index: number) => {
    setActiveImageIndex(index)
    setIsSliderOpen(true)
  }

  return (
    <section className="container mt-6 mb-10 md:mt-10 md:mb-16">
      <div className="grid gap-4 lg:grid-cols-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-3">
          {previewImages.slice(0, 4).map((image, index) => (
            <button
              key={`${title}-preview-${index}`}
              type="button"
              className="group relative h-52 cursor-pointer overflow-hidden bg-[#f2f2f2] text-left md:h-74"
              onClick={() => openSliderAt(index)}
              aria-label={t("openImage", { index: index + 1 })}
            >
              <Image
                src={image}
                alt={t("imageAlt", { title, index: index + 1 })}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </button>
          ))}
        </div>

        {previewImages[4] ? (
          <button
            type="button"
            className="group relative h-104 cursor-pointer overflow-hidden bg-[#f2f2f2] text-left lg:col-span-2 lg:h-full"
            onClick={() => openSliderAt(4)}
            aria-label={t("openFeaturedImage")}
          >
            <Image
              src={previewImages[4]}
              alt={t("featuredImageAlt", { title })}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </button>
        ) : null}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button
          color="primary"
          radius="none"
          size="lg"
          startContent={<ImageIcon className="size-4" />}
          onPress={() => openSliderAt(0)}
        >
          {t("showAllImages")}
        </Button>

        {hasVideo ? (
          <Button
            radius="none"
            size="lg"
            variant="bordered"
            startContent={<Play className="size-4" />}
            onPress={() => setIsVideoOpen(true)}
          >
            {t("showVideo")}
          </Button>
        ) : null}
      </div>
      <ImageSliderModal
        title={title}
        images={galleryImages}
        isOpen={isSliderOpen}
        onOpenChange={setIsSliderOpen}
        activeIndex={activeImageIndex}
        onActiveIndexChange={setActiveImageIndex}
      />

      <Modal
        isOpen={isVideoOpen}
        onOpenChange={setIsVideoOpen}
        size="5xl"
        radius="none"
        classNames={{ body: "p-0", header: "pb-2", footer: "hidden" }}
      >
        <ModalContent>
          <ModalHeader className="text-primary">
            {t("videoTitle", { title })}
          </ModalHeader>
          <ModalBody>
            {videoUrl ? (
              <div className="aspect-video w-full bg-black">
                <iframe
                  src={videoUrl}
                  title={t("videoTitle", { title })}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            ) : null}
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </section>
  )
}
