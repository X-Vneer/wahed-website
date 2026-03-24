"use client"

import React, {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { cn } from "@heroui/react"
import { motion } from "framer-motion"
import { createRoot, type Root } from "react-dom/client"

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
type TextBlockTag = "p" | "span" | "div" | HeadingTag

type BasicLineAnimationProps = {
  /** Root element type (e.g. "p", "h1", "span"). Default: "span" */
  as?: TextBlockTag
  /** Plain text. Ignored if children is provided */
  text?: string
  /** Rich content (e.g., spans with colors). Takes precedence over text */
  children?: ReactNode
  className?: string
  /** Delay before the whole animation starts (seconds) */
  delay?: number
  /** Time for each line to animate in (seconds) */
  duration?: number
  /** Stagger between lines (seconds) */
  stagger?: number
  /** Whether to fade in lines */
  fadeIn?: boolean
}

export function BasicLineAnimation({
  as: Component = "span",
  text,
  children,
  className,
  delay = 0,
  duration = 0.8,
  stagger = 0.2,
  fadeIn = true,
}: BasicLineAnimationProps) {
  const containerRef = useRef<HTMLElement>(null)
  const [lines, setLines] = useState<ReactNode[]>([])
  const [inView, setInView] = useState(false)
  const measureRootRef = useRef<Root | null>(null)

  const content: ReactNode = children ?? text ?? ""

  // ease-out-back: subtle overshoot so lines gently "land"
  const ease = [0.34, 1.26, 0.64, 1] as const

  const getInitialValues = () => ({
    y: "1.7em",
    opacity: fadeIn ? 0 : 1,
  })

  const getAnimateValues = () => ({
    x: 0,
    y: 0,
    opacity: 1,
  })

  const splitTextIntoLines = useCallback((textContent: string): string[] => {
    if (!containerRef.current) return [textContent]

    const tempElement = document.createElement("span")
    tempElement.style.position = "absolute"
    tempElement.style.visibility = "hidden"
    tempElement.style.whiteSpace = "pre-wrap"
    tempElement.style.wordWrap = "break-word"
    tempElement.style.width = `${containerRef.current.offsetWidth}px`
    tempElement.style.font = window.getComputedStyle(containerRef.current).font
    tempElement.style.lineHeight = window.getComputedStyle(
      containerRef.current
    ).lineHeight
    tempElement.style.letterSpacing = window.getComputedStyle(
      containerRef.current
    ).letterSpacing
    tempElement.textContent = textContent

    document.body.appendChild(tempElement)

    const lines: string[] = []
    const textLines = textContent.split("\n")

    for (const line of textLines) {
      if (line.trim() === "") {
        lines.push("")
        continue
      }

      const words = line.split(" ")
      let currentLine = ""
      let currentHeight = 0

      for (let i = 0; i < words.length; i++) {
        const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i]
        const testElement = document.createElement("span")
        testElement.style.position = "absolute"
        testElement.style.visibility = "hidden"
        testElement.style.whiteSpace = "pre-wrap"
        testElement.style.wordWrap = "break-word"
        testElement.style.width = `${containerRef.current!.offsetWidth}px`
        testElement.style.font = window.getComputedStyle(
          containerRef.current!
        ).font
        testElement.style.lineHeight = window.getComputedStyle(
          containerRef.current!
        ).lineHeight
        testElement.style.letterSpacing = window.getComputedStyle(
          containerRef.current!
        ).letterSpacing
        testElement.textContent = testLine

        document.body.appendChild(testElement)
        const testHeight = testElement.offsetHeight
        document.body.removeChild(testElement)

        if (testHeight > currentHeight && currentLine) {
          lines.push(currentLine)
          currentLine = words[i]
          currentHeight = testHeight
        } else {
          currentLine = testLine
          currentHeight = testHeight
        }
      }

      if (currentLine) {
        lines.push(currentLine)
      }
    }

    document.body.removeChild(tempElement)
    return lines.length > 0 ? lines : [textContent]
  }, [])

  const splitReactNodeIntoLines = useCallback((node: ReactNode): void => {
    if (!containerRef.current) {
      queueMicrotask(() => setLines([node]))
      return
    }

    const tempContainer = document.createElement("span")
    tempContainer.style.position = "absolute"
    tempContainer.style.visibility = "hidden"
    tempContainer.style.whiteSpace = "pre-wrap"
    tempContainer.style.wordWrap = "break-word"
    tempContainer.style.width = `${containerRef.current.offsetWidth}px`

    const computedStyle = window.getComputedStyle(containerRef.current)
    tempContainer.style.font = computedStyle.font
    tempContainer.style.lineHeight = computedStyle.lineHeight
    tempContainer.style.letterSpacing = computedStyle.letterSpacing
    tempContainer.style.fontSize = computedStyle.fontSize
    tempContainer.style.fontWeight = computedStyle.fontWeight
    tempContainer.style.fontFamily = computedStyle.fontFamily
    tempContainer.className = containerRef.current.className

    document.body.appendChild(tempContainer)

    if (!measureRootRef.current) {
      measureRootRef.current = createRoot(tempContainer)
    }
    measureRootRef.current.render(<>{node}</>)

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const lines: ReactNode[] = []

        if (!tempContainer.firstChild) {
          if (measureRootRef.current) {
            measureRootRef.current.unmount()
            measureRootRef.current = null
          }
          document.body.removeChild(tempContainer)
          setLines([node])
          return
        }

        const walker = document.createTreeWalker(
          tempContainer,
          NodeFilter.SHOW_TEXT,
          null
        )

        const textNodes: Text[] = []
        let textNode: Text | null
        while ((textNode = walker.nextNode() as Text | null)) {
          if (textNode.textContent) {
            textNodes.push(textNode)
          }
        }

        if (textNodes.length === 0) {
          if (measureRootRef.current) {
            measureRootRef.current.unmount()
            measureRootRef.current = null
          }
          document.body.removeChild(tempContainer)
          setLines([node])
          return
        }

        const range = document.createRange()
        const lineRanges: Array<{
          startNode: Text
          startOffset: number
          endNode: Text
          endOffset: number
        }> = []

        let currentLineStart: { node: Text; offset: number } | null = null
        let currentLineTop = -1
        let previousTextNode: Text | null = null
        let previousTextLength = 0

        for (const textNode of textNodes) {
          const textContent = textNode.textContent || ""
          if (!textContent) continue

          for (let i = 0; i < textContent.length; i++) {
            try {
              range.setStart(textNode, i)
              range.setEnd(textNode, i)
              const rect = range.getBoundingClientRect()
              const charTop = Math.round(rect.top)

              if (currentLineTop === -1) {
                currentLineTop = charTop
                currentLineStart = { node: textNode, offset: 0 }
              } else if (charTop > currentLineTop + 2) {
                if (currentLineStart) {
                  let endNode: Text
                  let endOffset: number

                  if (i === 0) {
                    endNode = previousTextNode || currentLineStart.node
                    endOffset = previousTextLength
                  } else {
                    endNode = textNode
                    endOffset = i - 1
                  }

                  lineRanges.push({
                    startNode: currentLineStart.node,
                    startOffset: currentLineStart.offset,
                    endNode,
                    endOffset,
                  })
                }
                currentLineTop = charTop
                currentLineStart = { node: textNode, offset: i }
              }
            } catch {
              // Continue on error
            }
          }

          previousTextNode = textNode
          previousTextLength = textContent.length
        }

        if (currentLineStart && textNodes.length > 0) {
          const lastNode = textNodes[textNodes.length - 1]
          lineRanges.push({
            startNode: currentLineStart.node,
            startOffset: currentLineStart.offset,
            endNode: lastNode,
            endOffset: lastNode.textContent?.length || 0,
          })
        }

        for (let i = 0; i < lineRanges.length; i++) {
          const lineRange = lineRanges[i]
          try {
            const range = document.createRange()
            range.setStart(lineRange.startNode, lineRange.startOffset)
            range.setEnd(lineRange.endNode, lineRange.endOffset)

            const lineContent = range.cloneContents()
            const lineContainer = document.createElement("span")
            lineContainer.appendChild(lineContent)

            if (lineContainer.textContent?.trim()) {
              lines.push(
                React.createElement("span", {
                  key: `line-${i}`,
                  dangerouslySetInnerHTML: { __html: lineContainer.innerHTML },
                })
              )
            }
          } catch (e) {
            console.warn("Failed to extract line", e)
          }
        }

        if (measureRootRef.current) {
          measureRootRef.current.unmount()
          measureRootRef.current = null
        }
        document.body.removeChild(tempContainer)

        if (lines.length === 0) {
          setLines([node])
        } else {
          setLines(lines)
        }
      })
    })
  }, [])

  useEffect(() => {
    const schedule = (fn: () => void) => queueMicrotask(fn)

    if (typeof content === "string" && containerRef.current) {
      const measuredLines = splitTextIntoLines(content)
      schedule(() => setLines(measuredLines))
    } else if (containerRef.current) {
      splitReactNodeIntoLines(content)
    } else {
      schedule(() => setLines([content]))
    }
  }, [content, splitTextIntoLines, splitReactNodeIntoLines])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setInView(true)
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [lines.length])

  useEffect(() => {
    const handleResize = () => {
      if (typeof content === "string" && containerRef.current) {
        setLines(splitTextIntoLines(content))
      } else if (containerRef.current) {
        splitReactNodeIntoLines(content)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [content, splitTextIntoLines, splitReactNodeIntoLines])

  useEffect(() => {
    return () => {
      if (measureRootRef.current) {
        measureRootRef.current.unmount()
        measureRootRef.current = null
      }
    }
  }, [])

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Component ref={containerRef as any} className={cn("block", className)}>
      {lines.length > 0 &&
        lines.map((line, index) => (
          <span key={`line-${index}`} className="block overflow-hidden">
            <motion.span
              initial={getInitialValues()}
              animate={inView ? getAnimateValues() : getInitialValues()}
              transition={{
                duration,
                delay: delay + index * stagger,
                ease,
              }}
              style={{
                willChange: "transform",
              }}
              className="block"
            >
              {line}
            </motion.span>
          </span>
        ))}
    </Component>
  )
}

export const TextLinesAnimation = React.memo(BasicLineAnimation)
export default TextLinesAnimation
