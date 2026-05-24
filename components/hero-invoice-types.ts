import type { MotionValue } from "framer-motion"

export type LayerContentKind =
  | "background"
  | "header"
  | "row"
  | "row-badge"
  | "total"
  | "qr-hash"

export type LayerContent =
  | { kind: "background" }
  | { kind: "header"; number: string; concept: string }
  | { kind: "row"; label: string; value: string; isLast?: boolean }
  | {
      kind: "row-badge"
      label: string
      badgeText: string
      isLast?: boolean
    }
  | { kind: "total"; label: string; amount: string }
  | {
      kind: "qr-hash"
      qrSrc: string
      qrAlt: string
      hashLines: readonly [string, string, string, string]
    }

export interface InvoiceLayer {
  readonly id: string
  readonly label: string
  readonly depth: number
  readonly content: LayerContent
}

export interface ScrollMotionValues {
  readonly progress: MotionValue<number>
  readonly rotationX: MotionValue<number>
  readonly rotationY: MotionValue<number>
  readonly separation: MotionValue<number>
}

export interface HeroInvoiceCard3DProps {
  readonly className?: string
}

export interface InvoiceLayerProps {
  readonly layer: InvoiceLayer
  readonly motion: ScrollMotionValues
  readonly index: number
  readonly total: number
}
