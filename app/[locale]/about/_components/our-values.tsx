"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { BasicLineAnimation } from "@/components/common/text-lines-animation"

const easeOut = [0.25, 0.46, 0.45, 0.94] as const

function QualityIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      className="h-12 w-12 shrink-0 md:h-14 md:w-14"
      aria-hidden
    >
      <g clipPath="url(#quality_icon_clip_708_873)">
        <path
          d="M30.2846 30.2412C36.3358 30.2412 41.2412 25.3358 41.2412 19.2846C41.2412 13.2335 36.3358 8.32812 30.2846 8.32812C24.2335 8.32812 19.3281 13.2335 19.3281 19.2846C19.3281 25.3358 24.2335 30.2412 30.2846 30.2412Z"
          stroke="#FE5F27"
          strokeWidth="1.30437"
          strokeLinecap="round"
          fill="none"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 19.2826C12 9.1854 20.1854 1 30.2826 1C40.3798 1 48.5652 9.1854 48.5652 19.2826C48.5652 29.3798 40.3798 37.5652 30.2826 37.5652C20.1854 37.5652 12 29.3798 12 19.2826ZM30.2826 0C19.6331 0 11 8.63312 11 19.2826C11 25.6033 14.0412 31.2137 18.7401 34.7304C18.8032 34.7776 18.8281 34.8587 18.8281 34.9375V53.7185C18.8281 54.0926 19.2241 54.3342 19.5568 54.1631L29.3883 49.1065C29.9499 48.8176 30.6163 48.8176 31.1779 49.1064L41.0125 54.1631C41.3453 54.3342 41.7412 54.0926 41.7412 53.7185V34.9375C41.7412 34.8572 41.7663 34.7744 41.8306 34.7263C46.5264 31.2094 49.5652 25.6009 49.5652 19.2826C49.5652 8.63312 40.9321 0 30.2826 0ZM40.7412 39.081C40.7412 37.5305 38.9934 36.5603 37.5577 37.1456C35.3128 38.0609 32.8566 38.5652 30.2826 38.5652C27.71 38.5652 25.255 38.0614 23.011 37.1471C21.5754 36.5621 19.8281 37.5323 19.8281 39.0825V49.6926C19.8281 51.1568 21.3775 52.1022 22.6796 51.4325L30.0544 47.6394C30.1979 47.5656 30.3682 47.5656 30.5117 47.6394L37.8899 51.4331C39.192 52.1026 40.7412 51.1572 40.7412 49.6931V39.081Z"
          fill="#FE5F27"
        />
      </g>
      <defs>
        <clipPath id="quality_icon_clip_708_873">
          <rect width="60" height="60" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

function InnovationIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      className="h-12 w-12 shrink-0 md:h-14 md:w-14"
      aria-hidden
    >
      <mask id="innovation_icon_mask_708_189" fill="white">
        <path d="M11.1353 44.9542C10.8605 44.927 10.6156 45.1277 10.5884 45.4025C10.5611 45.6772 10.7618 45.9221 11.0366 45.9494L11.1353 44.9542ZM55.8088 10.1068C55.6262 9.89972 55.3102 9.87985 55.1031 10.0624L51.7276 13.0384C51.5205 13.221 51.5006 13.537 51.6833 13.7441C51.8659 13.9512 52.1818 13.9711 52.389 13.7885L55.3894 11.1432L58.0347 14.1436C58.2173 14.3508 58.5332 14.3706 58.7404 14.188C58.9475 14.0054 58.9674 13.6894 58.7848 13.4823L55.8088 10.1068ZM11.0366 45.9494C18.0895 46.6489 28.7913 45.7232 37.9975 40.6525C47.235 35.5643 54.936 26.3155 55.9328 10.4689L54.9348 10.4061C53.9605 25.8943 46.4683 34.845 37.515 39.7765C28.5303 44.7254 18.0437 45.6395 11.1353 44.9542L11.0366 45.9494Z" />
      </mask>
      <path
        d="M11.1353 44.9542C10.8605 44.927 10.6156 45.1277 10.5884 45.4025C10.5611 45.6772 10.7618 45.9221 11.0366 45.9494L11.1353 44.9542ZM55.8088 10.1068C55.6262 9.89972 55.3102 9.87985 55.1031 10.0624L51.7276 13.0384C51.5205 13.221 51.5006 13.537 51.6833 13.7441C51.8659 13.9512 52.1818 13.9711 52.389 13.7885L55.3894 11.1432L58.0347 14.1436C58.2173 14.3508 58.5332 14.3706 58.7404 14.188C58.9475 14.0054 58.9674 13.6894 58.7848 13.4823L55.8088 10.1068ZM11.0366 45.9494C18.0895 46.6489 28.7913 45.7232 37.9975 40.6525C47.235 35.5643 54.936 26.3155 55.9328 10.4689L54.9348 10.4061C53.9605 25.8943 46.4683 34.845 37.515 39.7765C28.5303 44.7254 18.0437 45.6395 11.1353 44.9542L11.0366 45.9494Z"
        fill="none"
        stroke="#FE5F27"
        strokeWidth={1.5}
        mask="url(#innovation_icon_mask_708_189)"
      />
      <path
        d="M11.0366 45.9494L11.5342 45.9988L11.6329 45.0036L11.1353 44.9542L10.6378 44.9049L10.5391 45.9001L11.0366 45.9494ZM11.1353 44.9542L11.234 43.9591L11.2338 43.9591L11.1353 44.9542ZM10.5884 45.4025L11.5835 45.5014L11.5836 45.501L10.5884 45.4025ZM11.0366 45.9494L10.9378 46.9445L10.9379 46.9445L11.0366 45.9494ZM55.8088 10.1068L56.5589 9.44549L56.5589 9.44547L55.8088 10.1068ZM55.1031 10.0624L54.4418 9.31228L54.4418 9.31232L55.1031 10.0624ZM51.7276 13.0384L51.0663 12.2883L51.0663 12.2883L51.7276 13.0384ZM51.6833 13.7441L52.4334 13.0828L52.4332 13.0826L51.6833 13.7441ZM52.389 13.7885L53.0502 14.5388L53.0503 14.5386L52.389 13.7885ZM55.3894 11.1432L56.1395 10.4819L55.4782 9.73179L54.7281 10.3931L55.3894 11.1432ZM58.0347 14.1436L58.785 13.4825L58.7848 13.4823L58.0347 14.1436ZM58.7404 14.188L59.4016 14.9383L59.4018 14.9381L58.7404 14.188ZM58.7848 13.4823L58.0347 14.1436L58.0347 14.1437L58.7848 13.4823ZM37.9975 40.6525L38.48 41.5284L38.48 41.5284L37.9975 40.6525ZM55.9328 10.4689L56.9309 10.5317L56.9936 9.53369L55.9956 9.47089L55.9328 10.4689ZM54.9348 10.4061L54.9976 9.40809L53.9996 9.34529L53.9368 10.3433L54.9348 10.4061ZM37.515 39.7765L37.0326 38.9006L37.0326 38.9006L37.515 39.7765ZM11.1353 44.9542L11.2338 43.9591C10.4097 43.8775 9.67491 44.4794 9.59329 45.304L10.5884 45.4025L11.5836 45.501C11.5563 45.7761 11.3114 45.9765 11.0368 45.9494L11.1353 44.9542ZM10.5884 45.4025L9.59333 45.3036C9.51137 46.1282 10.1137 46.8627 10.9378 46.9445L11.0366 45.9494L11.1355 44.9543C11.41 44.9816 11.6109 45.2262 11.5835 45.5014L10.5884 45.4025ZM55.8088 10.1068L56.5589 9.44547C56.0111 8.82413 55.0632 8.76452 54.4418 9.31228L55.1031 10.0624L55.7644 10.8126C55.5573 10.9952 55.2414 10.9753 55.0587 10.7682L55.8088 10.1068ZM55.1031 10.0624L54.4418 9.31232L51.0663 12.2883L51.7276 13.0384L52.3889 13.7885L55.7644 10.8125L55.1031 10.0624ZM51.7276 13.0384L51.0663 12.2883C50.445 12.8361 50.3852 13.7842 50.9334 14.4057L51.6833 13.7441L52.4332 13.0826C52.6161 13.2899 52.5961 13.6059 52.389 13.7885L51.7276 13.0384ZM51.6833 13.7441L50.9332 14.4055C51.4811 15.0268 52.4288 15.0864 53.0502 14.5388L52.389 13.7885L51.7279 13.0383C51.9349 12.8558 52.2508 12.8756 52.4334 13.0828L51.6833 13.7441ZM52.389 13.7885L53.0503 14.5386L56.0507 11.8933L55.3894 11.1432L54.7281 10.3931L51.7277 13.0384L52.389 13.7885ZM55.3894 11.1432L54.6393 11.8045L57.2846 14.8049L58.0347 14.1436L58.7848 13.4823L56.1395 10.4819L55.3894 11.1432ZM58.0347 14.1436L57.2845 14.8048C57.8326 15.4267 58.7804 15.4857 59.4016 14.9383L58.7404 14.188L58.0793 13.4378C58.286 13.2556 58.6021 13.2749 58.785 13.4825L58.0347 14.1436ZM58.7404 14.188L59.4018 14.9381C60.023 14.3903 60.0828 13.4424 59.5349 12.821L58.7848 13.4823L58.0347 14.1437C57.852 13.9364 57.872 13.6205 58.0791 13.4379L58.7404 14.188ZM58.7848 13.4823L59.5349 12.821L56.5589 9.44549L55.8088 10.1068L55.0587 10.7681L58.0347 14.1436L58.7848 13.4823ZM11.0366 45.9494L10.9379 46.9445C18.1353 47.6584 29.0524 46.7211 38.48 41.5284L37.9975 40.6525L37.5151 39.7766C28.5303 44.7253 18.0438 45.6395 11.1353 44.9543L11.0366 45.9494ZM37.9975 40.6525L38.48 41.5284C48.0018 36.2837 55.9115 26.7368 56.9309 10.5317L55.9328 10.4689L54.9348 10.4061C53.9605 25.8942 46.4683 34.845 37.5151 39.7766L37.9975 40.6525ZM55.9328 10.4689L55.9956 9.47089L54.9976 9.40809L54.9348 10.4061L54.872 11.4041L55.87 11.4669L55.9328 10.4689ZM54.9348 10.4061L53.9368 10.3433C52.985 25.4731 45.7015 34.1257 37.0326 38.9006L37.515 39.7765L37.9975 40.6524C47.2351 35.5643 54.936 26.3155 55.9328 10.4689L54.9348 10.4061ZM37.515 39.7765L37.0326 38.9006C28.2693 43.7276 17.998 44.6301 11.234 43.9591L11.1353 44.9542L11.0366 45.9493C18.0895 46.649 28.7914 45.7233 37.9975 40.6524L37.515 39.7765Z"
        fill="#FE5F27"
        mask="url(#innovation_icon_mask_708_189)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.39114 51.3594C5.47172 51.3594 6.3477 52.2353 6.3477 53.3158V54.7795C6.3477 55.0556 6.57156 55.2795 6.8477 55.2795C7.12385 55.2795 7.3477 55.0556 7.3477 54.7795V53.3158C7.3477 52.2353 8.22368 51.3594 9.30425 51.3594H57.543C57.8192 51.3594 58.043 51.1355 58.043 50.8594C58.043 50.5832 57.8192 50.3594 57.543 50.3594H9.30425C8.22368 50.3594 7.3477 49.4834 7.3477 48.4028V10.9687C7.3477 10.6926 7.12385 10.4688 6.8477 10.4688C6.57156 10.4688 6.3477 10.6926 6.3477 10.9687V48.4028C6.3477 49.4834 5.47172 50.3594 4.39114 50.3594H2.45605C2.17991 50.3594 1.95605 50.5832 1.95605 50.8594C1.95605 51.1355 2.17991 51.3594 2.45605 51.3594H4.39114Z"
        fill="#FE5F27"
      />
    </svg>
  )
}

function SustainabilityIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      className="h-14 w-14 shrink-0 md:h-16 md:w-16"
      aria-hidden
    >
      <g
        transform="translate(0.5, 0.5)"
        stroke="#FE5F27"
        strokeWidth="1"
        fill="none"
      >
        <circle cx="20" cy="29" r="16" />
        <circle cx="40" cy="29" r="16" />
      </g>
    </svg>
  )
}

const cardIcons = [QualityIcon, InnovationIcon, SustainabilityIcon]

export default function OurValues() {
  const t = useTranslations("OurValues")

  const cards = [
    { key: "quality", titleKey: "qualityTitle", descKey: "qualityDescription" },
    {
      key: "innovation",
      titleKey: "innovationTitle",
      descKey: "innovationDescription",
    },
    {
      key: "sustainability",
      titleKey: "sustainabilityTitle",
      descKey: "sustainabilityDescription",
    },
  ] as const

  return (
    <section className="relative bg-white py-16 md:py-24">
      <div className="container">
        <motion.div
          className="relative mx-auto flex max-w-3xl flex-col items-center gap-4 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12, delayChildren: 0.1 },
            },
          }}
        >
          <motion.div
            className="text-secondary flex items-center justify-center gap-3 text-center text-lg font-medium md:text-2xl"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: easeOut },
              },
            }}
          >
            <span>{t("eyebrow")}</span>
            <span className="block w-16 md:w-20" aria-hidden>
              <svg
                viewBox="0 0 90 12"
                className="h-3 w-full ltr:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <motion.path
                  d="M6 1 L11 6 L6 11 L1 6 Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="currentColor"
                  initial={{ pathLength: 0, opacity: 0.6 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                />
                <motion.path
                  d="M9 6 L90 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0.8 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.55,
                    ease: "easeOut",
                    delay: 0.25,
                  }}
                />
              </svg>
            </span>
          </motion.div>

          <motion.div
            className="relative inline-block"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.55, ease: easeOut },
              },
            }}
          >
            <h2 className="relative text-3xl font-bold text-black md:text-5xl lg:text-6xl">
              {t("title")}
            </h2>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {cards.map((card, index) => {
            const IconComponent = cardIcons[index]
            return (
              <motion.article
                key={card.key}
                className="flex flex-col rounded-xl bg-[#F4F4F4] p-4 md:p-6"
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: easeOut },
                  },
                }}
                transition={{ duration: 0.25, ease: easeOut }}
              >
                <div className="text-secondary mb-16">
                  <IconComponent />
                </div>
                <h3 className="text-secondary mb-2 text-xl font-medium md:text-2xl">
                  {t(card.titleKey)}
                </h3>
                <BasicLineAnimation
                  as="p"
                  className="text-text-secondary w-full text-sm leading-relaxed"
                  text={t(card.descKey)}
                  delay={0.1}
                  duration={0.5}
                  stagger={0.08}
                />
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
