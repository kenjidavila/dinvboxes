import type { InvoiceLayer } from "./hero-invoice-types"

export const INVOICE_LAYERS: readonly InvoiceLayer[] = [
  {
    id: "card-bg",
    label: "Fondo de la tarjeta",
    depth: 0,
    content: { kind: "background" },
  },
  {
    id: "header",
    label: "Cabecera de la factura",
    depth: 0.05,
    content: {
      kind: "header",
      number: "Factura 2026-0087",
      concept: "Diseño web - Junio",
    },
  },
  {
    id: "row-cliente",
    label: "Fila Cliente",
    depth: 0.1,
    content: { kind: "row", label: "Cliente", value: "Estudio Marín S.L." },
  },
  {
    id: "row-nif",
    label: "Fila NIF",
    depth: 0.15,
    content: { kind: "row", label: "NIF", value: "B-87452910" },
  },
  {
    id: "row-verifactu",
    label: "Fila Envío VERI*FACTU",
    depth: 0.2,
    content: {
      kind: "row-badge",
      label: "Envío VERI*FACTU",
      badgeText: "Enviado",
    },
  },
  {
    id: "row-formato",
    label: "Fila Formato",
    depth: 0.25,
    content: {
      kind: "row",
      label: "Formato",
      value: "Facturae 3.2.2",
      isLast: true,
    },
  },
  {
    id: "total",
    label: "Total con IVA",
    depth: 0.3,
    content: { kind: "total", label: "Total con IVA", amount: "1.815,00 EUR" },
  },
  {
    id: "qr-hash",
    label: "QR y hash SHA-256",
    depth: 0.38,
    content: {
      kind: "qr-hash",
      qrSrc: "/qr-invoice-demo.png",
      qrAlt: "QR VERI*FACTU",
      hashLines: ["a7f3", "b2c1", "d4e5", "f608"],
    },
  },
] as const
