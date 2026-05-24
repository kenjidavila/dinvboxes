"use client"

import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"
import HeroInvoiceLayer from "./hero-invoice-layer"
import { INVOICE_LAYERS } from "./hero-invoice-layers-data"
import type { ScrollMotionValues } from "./hero-invoice-types"

export interface HeroInvoiceSceneProps {
  readonly motion: ScrollMotionValues
}

export default function HeroInvoiceScene({ motion }: HeroInvoiceSceneProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    const group = groupRef.current
    if (!group) return
    group.rotation.x = THREE.MathUtils.lerp(
      group.rotation.x,
      motion.rotationX.get(),
      0.1,
    )
    group.rotation.y = THREE.MathUtils.lerp(
      group.rotation.y,
      motion.rotationY.get(),
      0.1,
    )
  })

  return (
    <>
      <ambientLight intensity={1} />
      <group ref={groupRef}>
        {INVOICE_LAYERS.map((layer, index) => (
          <HeroInvoiceLayer
            key={layer.id}
            layer={layer}
            motion={motion}
            index={index}
            total={INVOICE_LAYERS.length}
          />
        ))}
      </group>
    </>
  )
}
