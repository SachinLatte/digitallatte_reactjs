<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Guidelines & Rules

1. **Component Architecture & Reuse**:
   - Do not duplicate components.
   - Reuse existing components whenever possible.
   - Avoid unnecessary abstractions and keep components composable.
   - Preserve existing functionality when modifying components.

2. **React & Next.js Best Practices**:
   - Prefer Server Components.
   - Use `"use client"` only when required.
   - Use `next/image` for images and optimize video assets.

3. **Data Management & Content**:
   - Do not hardcode repeated content.
   - Store repeated content in `/data` (or `src/data`).

4. **Styling & Design System**:
   - Maintain responsive layouts across all screen sizes.
   - Maintain established design tokens and consistency.

5. **Code Quality, Safety & Dependencies**:
   - Do not install packages without explaining why.
   - Do not modify unrelated files.
   - Run lint and type checking after significant changes.
   - Prioritize performance and accessibility.

6. **Performance Budget & Core Web Vitals (Mandatory Before Launch)**:
   - **LCP (Largest Contentful Paint)**: < 2.5s
   - **CLS (Cumulative Layout Shift)**: < 0.1
   - **INP (Interaction to Next Paint)**: < 200ms
   - **Images**: Always use `next/image` with explicit aspect ratios/dimensions, responsive `sizes`, WebP/AVIF format, and `priority` on above-the-fold hero images only.
   - **Videos**: Use `preload="metadata"` (or `"none"` below-the-fold), compressed H.264/WebM, `muted playsInline autoPlay loop`, with explicit aspect ratio containers to eliminate CLS.
   - **Fonts**: Use `next/font/google` exclusively (`display: 'swap'`). Never use render-blocking `@import` font links in CSS.
   - **JavaScript & Client Components**: Keep pages as Server Components by default; isolate `"use client"` to leaf nodes. Lazy-load heavy libraries (e.g. Swiper, Lenis, modals) with `next/dynamic`. Initial JS per route must remain under 100 KB.
   - **Third-Party Scripts**: Load asynchronously with `next/script` (`strategy="lazyOnload"` or `"afterInteractive"`). Zero render-blocking scripts.
   - **Animations**: Use only GPU-accelerated CSS properties (`transform`, `opacity`). Never animate layout properties (`top`, `left`, `width`, `height`, `margin`). Cleanup Lenis and RAF listeners on unmount.
   - Full specification in [PERFORMANCE_BUDGET.md](file:///c:/xampp/htdocs/sachin/NextJs/digitallatte/PERFORMANCE_BUDGET.md).

7. **Testing & Completion Verification**:
   - Verify important pages in the browser.
   - Check performance budget and CWV indicators.
   - Do not mark a task complete until it has been visually tested.

