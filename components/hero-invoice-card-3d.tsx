"use client"

import { Canvas } from "@react-three/fiber"
import { useScroll, useTransform } from "framer-motion"
import { Suspense, useRef } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"
import HeroInvoiceCard from "./hero-invoice-card"
import HeroInvoiceScene from "./hero-invoice-scene"
import type {
  HeroInvoiceCard3DProps,
  ScrollMotionValues,
} from "./hero-invoice-types"

const CARD_BOX = "absolute top-0 left-0 w-[85%] h-[80%]"

export default function HeroInvoiceCard3D({ className }: HeroInvoiceCard3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const prefersReducedMotion = usePrefersReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const rotationX = useTransform(
    scrollYProgress,
    [0, 1],
    [-Math.PI / 16, Math.PI / 16],
  )
  const rotationY = useTransform(
    scrollYProgress,
    [0, 1],
    [-Math.PI / 12, Math.PI / 12],
  )
  const separation = useTransform(scrollYProgress, [0, 1], [1, 3])

  const motionValues: ScrollMotionValues = {
    progress: scrollYProgress,
    rotationX,
    rotationY,
    separation,
  }

  if (isMobile || prefersReducedMotion) {
    return <HeroInvoiceCard className={cn(CARD_BOX, className)} />
  }

  return (
    <div ref={containerRef} className={cn(CARD_BOX, className)}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 32 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <HeroInvoiceScene motion={motionValues} />
        </Suspense>
      </Canvas>
    </div>
  )
}
