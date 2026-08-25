# Digital Latte - Pre-Launch Performance Budget & Optimization Standard

> **Core Mandate**: A visually impressive website that takes 8 seconds to load is not a successful rebuild. All development must strictly adhere to the performance budgets and optimization standards outlined below.

---

## 1. Core Web Vitals (CWV) Targets

| Metric | Target (Good) | Needs Improvement | Poor | Primary Drivers |
| :--- | :---: | :---: | :---: | :--- |
| **LCP** (Largest Contentful Paint) | **< 2.5s** | 2.5s – 4.0s | > 4.0s | Hero images/videos, font loading waterfall, render-blocking CSS/JS |
| **CLS** (Cumulative Layout Shift) | **< 0.1** | 0.1 – 0.25 | > 0.25 | Images/videos without explicit dimensions, dynamic content injection, FOIT/FOUT fonts |
| **INP** (Interaction to Next Paint) | **< 200ms** | 200ms – 500ms | > 500ms | Heavy main-thread JavaScript execution, unoptimized client components, scroll/event listeners |

---

## 2. Resource Size & Payload Budgets

| Resource Type | Budget (Gzipped / Compressed) | Enforced Limit | Notes |
| :--- | :---: | :---: | :--- |
| **Initial JS (per route)** | `< 100 KB` | `130 KB max` | Server Components first, dynamic imports for heavy modules |
| **Global & Page CSS** | `< 35 KB` | `50 KB max` | Modern Tailwind v4 / modular CSS, zero unused font stylesheets |
| **Web Fonts** | `< 50 KB` | `75 KB max` | Self-hosted via `next/font/google` (`display: 'swap'`, Latin subset) |
| **Hero / Above-the-fold Image** | `< 150 KB` | `250 KB max` | WebP/AVIF format, priority preloaded |
| **Total Images per Page** | `< 800 KB` | `1.2 MB max` | Lazy loaded below fold, exact `sizes` attribute |
| **Hero Background Video** | `< 500 KB` | `1.0 MB max` | Compressed MP4/WebM, `preload="metadata"`, explicit aspect ratio |
| **Total Initial Page Weight** | `< 1.2 MB` | `1.8 MB max` | Across all assets on initial critical viewport load |

---

## 3. Seven Optimization Pillars & Implementation Rules

### 1. Images
- **Next.js Image Component**: Always use `next/image` with explicit width/height or `fill` with a sized container.
- **LCP Hero Image**: Exactly **one** above-the-fold image may use `priority={true}`. All other images must use native lazy loading (`loading="lazy"`).
- **Responsive Sizing**: Always specify the `sizes` attribute (e.g., `sizes="(max-width: 768px) 100vw, 33vw"`) to avoid downloading desktop-sized images on mobile devices.
- **Modern Formats**: Convert all raster graphics to WebP / AVIF. Avoid raw uncompressed PNG/JPG files exceeding 100 KB.
- **CLS Prevention**: Wrappers around images must have predefined CSS aspect ratios (e.g. `aspect-[16/9]`, `aspect-[4/5]`) or min-height to eliminate layout shifts when images render.

### 2. Videos
- **Compression**: Hero videos must be compressed using H.264/H.265 or WebM with reduced bitrate (under 1.5 Mbps, 30fps).
- **Preload Strategy**: Set `preload="metadata"` for hero videos and `preload="none"` for below-the-fold videos.
- **Mobile Autoplay Compliance**: Include `muted playsInline autoPlay loop` attributes.
- **Dimension Locking**: Enclose `<video>` elements in containers with explicit aspect ratios (`aspect-video` or explicit CSS height/width) to guarantee zero CLS.
- **Poster Fallback**: Provide a lightweight poster image or placeholder background color matching the first video frame.

### 3. Fonts
- **Next.js Font Optimization**: Use `next/font/google` exclusively in `layout.js` (`display: 'swap'`, `subsets: ['latin']`, preloaded by Next.js).
- **Zero CSS `@import` for Fonts**: Never use render-blocking `@import url('https://fonts.googleapis.com/...')` in CSS stylesheets.
- **Font Variable Mapping**: Pass font CSS variables (`--font-sans`, `--font-libre`) to `<html>` / `<body>` classes.
- **Layout Shift Mitigation**: `display: 'swap'` with font metric overrides to prevent FOUT (Flash of Unstyled Text) and zero CLS.

### 4. JavaScript
- **Code Splitting & Lazy Loading**: Dynamically import (`next/dynamic` with `ssr: false` where appropriate) heavy client libraries such as:
  - Swiper Carousel sliders
  - Modals & popups (JobApplicationModal, Video modals)
  - Interactive maps or rich media widgets
- **Tree-Shaking Icons**: Import icons from specific paths or ensure modern tree-shaking (avoid importing entire unpruned icon sets into the client bundle).
- **Bundle Analysis**: Keep total First Load JS shared by all chunks under 90 KB.

### 5. Client Components (`"use client"`)
- **Server Components by Default**: Keep all `page.js`, layouts, and content wrappers as Server Components.
- **Push Interactivity to the Leaves**: Only apply `"use client"` to small leaf components that directly manage state, event listeners, or hooks (e.g., button clicks, form state, dropdown toggles).
- **No Client Wrapper Bloat**: Do not wrap whole static sections in `"use client"` just to handle one hover or click state.

### 6. Third-Party Scripts
- **Strategy Management**: Load external scripts (Google Tag Manager, Google Analytics, Chat widgets, reCAPTCHA) exclusively using `next/script`:
  - `strategy="afterInteractive"` for critical analytics.
  - `strategy="lazyOnload"` for secondary widgets (chatbots, feedback widgets, social pixels).
- **Zero Blocking Scripts**: No synchronous `<script>` tags in `<head>` or body.
- **DNS Prefetch & Preconnect**: Preconnect to critical third-party domains (e.g., fonts, CDNs) with `<link rel="preconnect">`.

### 7. Animations & Smooth Scrolling
- **GPU-Accelerated CSS**: Only animate `transform` and `opacity`. Never animate layout-triggering properties (`width`, `height`, `top`, `left`, `margin`, `padding`).
- **Will-Change Control**: Apply `will-change: transform` only during active animation states to avoid excessive GPU memory allocation.
- **Lenis Smooth Scroll Optimization**:
  - Cancel `requestAnimationFrame` on unmount.
  - Throttle scroll calculations.
  - Respect `prefers-reduced-motion` accessibility preferences.
- **IntersectionObserver for Scroll Animations**: Defer triggering animations and heavy effects until elements enter the viewport.

---

## 4. Pre-Commit & Verification Checklist

Before completing any feature, pull request, or page update:

1. **Static Build Check**: Run `npm run build` — confirm all routes compile cleanly and First Load JS meets the budget.
2. **Lint & Type Check**: Run `npm run lint` — verify zero runtime errors.
3. **Lighthouse Audit**:
   - Performance Score: `>= 90` (Mobile & Desktop)
   - LCP: `< 2.5s`
   - CLS: `< 0.1`
   - INP: `< 200ms`
4. **Asset Weight Verification**:
   - No individual image file > 250 KB in `public/img`.
   - All videos compressed under 1 MB.
   - Zero render-blocking `@import` statements in CSS.
