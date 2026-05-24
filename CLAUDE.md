# DINVBOX — Guía rápida para Claude

Landing de Dinvbox (factura electrónica VERI*FACTU, España). Esta guía está enfocada al **Hero** y a los patrones del repo que conviene respetar al modificarlo.

## Stack

- Next.js 15.2.8 (App Router) + React 19.2 + TypeScript `strict: true`
- Tailwind 3.4 + shadcn/ui (style `default`, baseColor `neutral`, CSS variables)
- Framer Motion (latest) — única librería de animación
- **3D opcional en Hero:** `three` + `@react-three/fiber` v9 + `@react-three/drei` v10 (ver sección "Hero" abajo)
- Iconos: `lucide-react`
- Package manager: **pnpm** (`pnpm-lock.yaml`)
- Idioma del contenido: español

## Comandos

```
pnpm dev          # dev server
pnpm build        # build producción
pnpm start        # serve build
pnpm lint         # next lint
pnpm tsc --noEmit # type-check (CI no falla por TS, pero el código debe pasar localmente)
```

Nota: `next.config.mjs` tiene `eslint.ignoreDuringBuilds: true` y `typescript.ignoreBuildErrors: true`. **No te apoyes en eso** — corre `pnpm lint && pnpm tsc --noEmit` antes de mergear.

## Convenciones

- **Imports:** siempre alias `@/` (`@/components/...`, `@/lib/utils`, `@/hooks/...`). Cero relativos.
- **Naming:** archivos en `components/` en kebab-case (`hero-invoice-card.tsx`, `world-map-button.tsx`). Páginas client en `app/` con sufijo `PageClient.tsx`.
- **Estructura:** `components/` plano; subdirectorios solo en `components/ui/` (primitives shadcn).
- **SC vs CC:** `app/*/page.tsx` por defecto Server Component; si hay estado/animación/scroll, o se separa a `*PageClient.tsx`, o se marca `"use client"` en el propio `page.tsx`.
- **Framer Motion:** patrón directo `motion.div` con `initial / animate / transition` inline. No hay `variants` reutilizadas en el repo. `useScroll/useTransform` se introduce con el Hero 3D — sigue ese patrón si añades más scroll-driven.
- **Sin tests configurados.** Validación es manual + `tsc --noEmit && lint && build`.

## Paleta DINVBOX (CSS variables)

Definida en `app/globals.css`. **Úsala vía `style={{ color: 'var(--navy)' }}` o equivalente, NO via clases Tailwind `bg-navy-500`** — esas escalas HSL legacy existen pero el Hero y el resto de secciones usan las vars hex directas.

| Token | Valor | Uso |
|---|---|---|
| `--navy` | `#002B49` (PANTONE 7463C) | fondo principal de cards y secciones oscuras |
| `--orange` | `#ff9015` (PANTONE 1495C) | acentos, CTAs, dot pulsante |
| `--teal` | `#33b2ce` | secundario |
| `--cream` | `#FFFFFF` | texto sobre navy |
| `--cream-2` | `#F9FAFB` | fondos claros (sección Calendario) |
| `--ink` | `#233046` + `--ink-70/40/20` | texto sobre fondo claro |
| `--white-80/60/40/12` | rgba | bordes y texto sutil sobre navy |
| `--line` | `rgba(0,43,73,0.08)` | bordes muy sutiles |

## Hero (`app/page.tsx` líneas 18-178)

El Hero es **inline en `app/page.tsx`** (no extraído). Lleva `"use client"`. Grid 2 columnas:

- **Izquierda:** texto + CTAs + check-items, animado con `motion.div initial={{ opacity: 0, x: -30 }}`.
- **Derecha:** tarjeta de factura, ahora extraída a componentes:
  - `components/hero-invoice-card.tsx` — versión 2D (markup original).
  - `components/hero-invoice-card-3d.tsx` — versión 3D con R3F.
  - `app/page.tsx` importa la 3D con `next/dynamic({ ssr: false, loading: () => <HeroInvoiceCard /> })`.
  - **La 2D actúa como fallback** para `prefers-reduced-motion`, viewport <768px, y Suspense `loading`.
- **Alert "Facturito"** (líneas ~158-174) NO entra al 3D. Permanece como `motion.div` 2D absolute `bottom-0 right-0`. No tocar.

### Datos hardcoded de la factura (única fuente: `components/hero-invoice-layers-data.ts`)

Factura `2026-0087`, concepto "Diseño web - Junio", cliente "Estudio Marín S.L.", NIF `B-87452910`, formato "Facturae 3.2.2", total `1.815,00 EUR`, hash `a7f3 b2c1 d4e5 f608`, badge "Enviado".

### QR

PNG local en `public/qr-invoice-demo.png`. **No referenciar la URL del blob de Vercel**.

### Stack 3D

- Versiones pinned exactas (`three@0.184.0`, `@react-three/fiber@9.6.1`, `@react-three/drei@10.7.7`, `@types/three@0.184.1` dev).
- Animación: Framer Motion `useScroll + useTransform` para mapear scroll → rotación/separación. `useFrame` con `THREE.MathUtils.lerp(current, target, 0.1)` per-frame para suavizar.
- **No usar GSAP ni Lenis.**
- Render del contenido de cada capa: drei `<Html transform occlude>` (preserva CSS vars y tipografía mono).
- Cámara: `PerspectiveCamera fov=32`, `position={[0, 0, 5]}`.
- Material: flat (`meshBasicMaterial`) por fidelidad de marca.
- Canvas background transparente.
- Tipos en `components/hero-invoice-types.ts`. Refs: `useRef<Mesh>(null)`, `useRef<Group>(null)`, motion values `MotionValue<number>`.

## Estructura relevante

```
app/
  page.tsx                    # Home, Hero inline (left col) + HeroInvoiceCard3D (right col)
  layout.tsx, globals.css
  api/{facturito,newsletter}/route.ts
  {blog,contacto,faq,...}/    # otras rutas

components/
  hero-invoice-card.tsx       # 2D fallback (extraído del inline)
  hero-invoice-card-3d.tsx    # wrapper R3F + scroll
  hero-invoice-scene.tsx      # escena R3F
  hero-invoice-layer.tsx      # capa individual (mesh + Html)
  hero-invoice-layers-data.ts # constante de capas
  hero-invoice-types.ts       # tipos compartidos
  header.tsx footer.tsx ...
  ui/                         # shadcn primitives

hooks/
  use-mobile.tsx              # useIsMobile() vía matchMedia <768px
  use-prefers-reduced-motion.ts

lib/utils.ts                  # cn() = clsx + tailwind-merge
public/qr-invoice-demo.png    # QR local del Hero
```

## CSP

`next.config.mjs` tiene CSP estricta. R3F en producción **no genera workers ni usa eval**, así que la CSP actual cubre el caso. Si más adelante entra postprocessing, web workers o `@react-three/rapier`, añadir `worker-src 'self' blob:`.
