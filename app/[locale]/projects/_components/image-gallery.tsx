"use client"

import { useMemo, useState } from "react"
import Image, { StaticImageData } from "next/image"
import { cn } from "@heroui/theme"
import { AnimatePresence, motion } from "framer-motion"

type ProjectImage = StaticImageData | string

type ImageGalleryProps = {
  title: string
  images: ProjectImage[]
}

export default function ImageGallery({ title, images }: ImageGalleryProps) {
  const gallery = useMemo(() => images.slice(0, 3), [images])
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const selectedImage = gallery[selectedImageIndex] ?? gallery[0]
  const imageVariants = {
    enter: (currentDirection: number) => ({
      opacity: 0,
      x: currentDirection > 0 ? 22 : -22,
      scale: 1.025,
    }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (currentDirection: number) => ({
      opacity: 0,
      x: currentDirection > 0 ? -18 : 18,
      scale: 0.99,
    }),
  }

  if (gallery.length !== 3 || !selectedImage) {
    return null
  }

  return (
    <div className="relative aspect-7/9 max-h-svh ltr:ml-auto rtl:mr-auto">
      <div className="relative h-full w-full overflow-hidden bg-black">
        <AnimatePresence mode="sync">
          <motion.div
            key={selectedImageIndex}
            custom={direction}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.3, ease: "easeOut" },
              scale: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
            }}
            className="absolute inset-0"
          >
            <Image
              src={selectedImage}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={selectedImageIndex === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 grid w-[75%] grid-cols-3 gap-1 border-8 border-white bg-white">
        {gallery.map((image, index) => {
          const isActive = index === selectedImageIndex

          return (
            <button
              key={`${title}-${index}`}
              type="button"
              onClick={() => {
                if (index === selectedImageIndex) return
                setDirection(index > selectedImageIndex ? 1 : -1)
                setSelectedImageIndex(index)
              }}
              className={cn(
                "relative aspect-4/3 cursor-pointer overflow-hidden border-4 p-0 transition",
                isActive
                  ? "border-secondary"
                  : "border-transparent opacity-90 hover:opacity-100"
              )}
              aria-label={`Show image ${index + 1}`}
              aria-pressed={isActive}
            >
              <Image
                src={image}
                alt={title}
                fill
                className={cn("object-cover transition duration-300", {
                  "scale-[1.01]": isActive,
                  "scale-100": !isActive,
                })}
                sizes="(max-width: 1024px) 33vw, 15vw"
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
