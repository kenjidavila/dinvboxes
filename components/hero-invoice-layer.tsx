"use client"

import { Html } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"
import HeroInvoiceCard from "./hero-invoice-card"
import type { InvoiceLayerProps } from "./hero-invoice-types"

export default function HeroInvoiceLayer({ layer, motion }: InvoiceLayerProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    const group = groupRef.current
    if (!group) return
    const targetZ = layer.depth * motion.separation.get()
    group.position.z = THREE.MathUtils.lerp(group.position.z, targetZ, 0.1)
  })

  const isBackground = layer.content.kind === "background"

  return (
    <group ref={groupRef} position={[0, 0, layer.depth]}>
      <Html
        transform
        occlude
        distanceFactor={3}
        style={{
          width: "320px",
          aspectRatio: "1 / 1.05",
          pointerEvents: "none",
        }}
      >
        <HeroInvoiceCard
          className="w-full h-full"
          visibleLayer={layer.id}
          transparent={!isBackground}
        />
      </Html>
    </group>
  )
}
