import { cn } from "@/lib/utils"

export interface HeroInvoiceCardProps {
  readonly className?: string
  readonly visibleLayer?: string
  readonly transparent?: boolean
}

export default function HeroInvoiceCard({
  className,
  visibleLayer,
  transparent,
}: HeroInvoiceCardProps) {
  const isHidden = (id: string): boolean =>
    visibleLayer != null && visibleLayer !== id

  const visibilityOf = (id: string): "hidden" | "visible" =>
    isHidden(id) ? "hidden" : "visible"

  return (
    <div
      className={cn("rounded-2xl p-7", className)}
      style={{
        background: transparent ? "transparent" : "var(--navy)",
        color: "var(--cream)",
        boxShadow: transparent
          ? "none"
          : "0 30px 80px -20px rgba(0,43,73,0.35)",
      }}
    >
      <div data-layer-id="header" style={{ visibility: visibilityOf("header") }}>
        <div
          className="font-mono text-xs uppercase tracking-widest mb-1.5"
          style={{ color: "var(--white-60)" }}
        >
          Factura 2026-0087
        </div>
        <div className="text-xl font-bold mb-5" style={{ color: "var(--cream)" }}>
          Diseño web - Junio
        </div>
      </div>

      <div
        data-layer-id="row-cliente"
        className="flex justify-between py-3 text-sm"
        style={{
          borderBottom: "1px solid var(--white-12)",
          visibility: visibilityOf("row-cliente"),
        }}
      >
        <span style={{ color: "var(--white-60)" }}>Cliente</span>
        <span className="font-semibold">Estudio Marín S.L.</span>
      </div>

      <div
        data-layer-id="row-nif"
        className="flex justify-between py-3 text-sm"
        style={{
          borderBottom: "1px solid var(--white-12)",
          visibility: visibilityOf("row-nif"),
        }}
      >
        <span style={{ color: "var(--white-60)" }}>NIF</span>
        <span className="font-semibold">B-87452910</span>
      </div>

      <div
        data-layer-id="row-verifactu"
        className="flex justify-between py-3 text-sm"
        style={{
          borderBottom: "1px solid var(--white-12)",
          visibility: visibilityOf("row-verifactu"),
        }}
      >
        <span style={{ color: "var(--white-60)" }}>Envío VERI*FACTU</span>
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold font-mono"
          style={{ background: "rgba(255,144,21,0.15)", color: "var(--orange)" }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--orange)" }}
          />
          Enviado
        </span>
      </div>

      <div
        data-layer-id="row-formato"
        className="flex justify-between py-3 text-sm"
        style={{ visibility: visibilityOf("row-formato") }}
      >
        <span style={{ color: "var(--white-60)" }}>Formato</span>
        <span className="font-semibold">Facturae 3.2.2</span>
      </div>

      <div
        data-layer-id="total"
        className="flex justify-between items-baseline mt-5 pt-4"
        style={{
          borderTop: "1px dashed var(--white-12)",
          visibility: visibilityOf("total"),
        }}
      >
        <span
          className="font-mono text-xs uppercase tracking-widest"
          style={{ color: "var(--white-60)" }}
        >
          Total con IVA
        </span>
        <span
          className="text-3xl font-extrabold"
          style={{ letterSpacing: "-0.02em" }}
        >
          1.815,00 EUR
        </span>
      </div>

      <div
        data-layer-id="qr-hash"
        className="flex justify-between items-end mt-4 pt-3"
        style={{
          borderTop: "1px solid var(--white-12)",
          visibility: visibilityOf("qr-hash"),
        }}
      >
        <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
          <img
            src="/qr-invoice-demo.png"
            alt="QR VERI*FACTU"
            className="w-full h-full object-contain"
          />
        </div>

        <div
          className="w-10 h-10 flex-shrink-0 p-1 rounded"
          style={{ background: "var(--white-12)" }}
        >
          <div
            className="w-full h-full font-mono text-[5px] leading-[1.15] break-all flex items-center justify-center text-center"
            style={{ color: "var(--white-60)" }}
          >
            a7f3<br />b2c1<br />d4e5<br />f608
          </div>
        </div>
      </div>
    </div>
  )
}
