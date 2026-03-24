"use client"

import { useMemo, useState } from "react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { Button, Modal } from "@heroui/react"
import { ImageIcon, Play } from "lucide-react"
import "swiper/css"
import { Swiper, SwiperSlide } from "swiper/react"
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
    <section className="relative mt-6 mb-10 md:mt-10 md:mb-16">
      <div className="relative container">
        <div className="md:hidden">
          <Swiper slidesPerView={1} spaceBetween={12}>
            {previewImages.map((image, index) => (
              <SwiperSlide key={`${title}-mobile-preview-${index}`}>
                <button
                  type="button"
                  className="group relative h-[70svh] w-full cursor-pointer overflow-hidden bg-[#f2f2f2] text-left"
                  onClick={() => openSliderAt(index)}
                  aria-label={t("openImage", { index: index + 1 })}
                >
                  <Image
                    src={image}
                    alt={t("imageAlt", { title, index: index + 1 })}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="90vw"
                  />
                  <span
                    className="pointer-events-none absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/10"
                    aria-hidden
                  />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="hidden gap-4 md:grid lg:grid-cols-5">
          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-3">
            {previewImages.slice(0, 4).map((image, index) => (
              <button
                key={`${title}-preview-${index}`}
                type="button"
                className="group relative h-52 cursor-pointer overflow-hidden bg-[#f2f2f2] text-left md:h-64"
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
                <span
                  className="pointer-events-none absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/10"
                  aria-hidden
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
              <span
                className="pointer-events-none absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/15"
                aria-hidden
              />
            </button>
          ) : null}
        </div>

        <div className="absolute bottom-3 left-5 z-1 mt-5 flex flex-wrap gap-3 md:bottom-1">
          <Button variant="secondary" onPress={() => openSliderAt(0)}>
            <ImageIcon className="size-4" />
            {t("showAllImages")}
          </Button>

          {hasVideo ? (
            <Button variant="secondary" onPress={() => setIsVideoOpen(true)}>
              <Play className="size-4" />
              {t("showVideo")}
            </Button>
          ) : null}
        </div>
      </div>
      <ImageSliderModal
        title={title}
        images={galleryImages}
        isOpen={isSliderOpen}
        onOpenChange={setIsSliderOpen}
        activeIndex={activeImageIndex}
        onActiveIndexChange={setActiveImageIndex}
      />

      <Modal>
        <Modal.Backdrop
          isOpen={isVideoOpen}
          onOpenChange={setIsVideoOpen}
          variant="opaque"
          className="bg-black/95"
        >
          <Modal.Container
            size="full"
            placement="center"
            scroll="inside"
            className="m-0 h-dvh max-h-dvh w-screen max-w-none overflow-hidden rounded-none border-none bg-black p-0 shadow-none"
          >
            <Modal.Dialog className="h-full w-full overflow-hidden rounded-none border-none bg-black shadow-none">
              <Modal.Body className="overflow-hidden p-0">
                <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
                  {videoUrl ? (
                    <div className="aspect-video w-[min(90vw,1200px)] bg-black">
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

                  <button
                    type="button"
                    className="absolute top-4 right-4 z-20 rounded-full bg-white/20 px-3 py-2 text-sm text-white backdrop-blur transition hover:bg-white/35"
                    onClick={() => setIsVideoOpen(false)}
                  >
                    {t("close")}
                  </button>
                </div>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </section>
  )
}
