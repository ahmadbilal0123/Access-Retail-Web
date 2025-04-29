"use client"

import { useEffect, useRef } from "react"

export default function HeroCounter() {
  const counterRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    counterRefs.current.forEach((el) => {
      if (!el) return

      const value = Number.parseInt(el.getAttribute("data-value") || "0", 10)
      let startTime: number | null = null
      const duration = 2000 // 2 seconds

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        const currentValue = Math.floor(progress * value)

        el.textContent = `${currentValue}${el.getAttribute("data-suffix") || ""}`

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          el.textContent = `${value}${el.getAttribute("data-suffix") || ""}`
        }
      }

      requestAnimationFrame(animate)
    })
  }, [])

  return {
    counterRefs,
  }
}

