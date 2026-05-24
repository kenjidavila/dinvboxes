"use client"

import { useEffect, useState } from "react"

export function usePrefersReducedMotion(): boolean {
  const [prefers, setPrefers] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefers(mq.matches)
    const onChange = (e: MediaQueryListEvent): void => setPrefers(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  return prefers
}
