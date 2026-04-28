import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://elevatestudio.xyz"),
  title: "Elevate Studio — Product Design Studio",
  description:
    "Product design studio for AI and SaaS companies. 40+ projects. Ulaanbaatar.",
  openGraph: {
    title: "Elevate Studio",
    description: "Product design studio for AI and SaaS companies. 40+ projects.",
    url: "https://elevatestudio.xyz",
    siteName: "Elevate Studio",
    images: [{ url: "/opengraph-image.png", width: 2400, height: 1260 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const css = `
  :root {
    --bg: #f9f1e9;
    --surface: #fbfbfb;
    --surface-hover: #f0ede6;
    --border: #e5e4e0;
    --text: #0f172a;
    --muted: #50545f;
    --accent: #f1863f;
    --accent-text: #ffffff;
    --hero-bg: #a2d7f0;
    --font-display: 'Caladea', Georgia, serif;
    --radius-card: 24px;
    --radius-btn: 100px;
    --shadow-card: 0px 106px 30px 0px rgba(38,45,61,0), 0px 68px 27px 0px rgba(38,45,61,0.01), 0px 38px 23px 0px rgba(38,45,61,0.02), 0px 17px 17px 0px rgba(38,45,61,0.03), 0px 4px 9px 0px rgba(38,45,61,0.04);
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; overflow-x: hidden; }
  body {
    background-color: var(--bg);
    color: var(--text);
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    -webkit-font-smoothing: antialiased;
    line-height: 1.5;
    overflow-x: hidden;
  }
  a { color: inherit; text-decoration: none; }
  button { font-family: inherit; }
  ::selection { background: var(--accent); color: var(--accent-text); }
  nav a { transition: color 0.2s ease; }
  nav a:not(.menu-nav-link):not(.menu-resource-link):hover { color: var(--text) !important; }
  .nav-cta {
    transition: background 0.2s ease, transform 0.15s ease !important;
  }
  .nav-cta:hover {
    background: #333 !important;
    transform: scale(1.02);
  }
  .project-card {
    transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease, border-color 0.2s ease;
    border: 1px solid var(--border);
  }
  .project-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.07);
    background-color: var(--surface-hover) !important;
    border-color: #c8c5be;
  }
  .service-card {
    transition: none;
  }
  .principle-row {
    transition: background-color 0.2s ease;
    border-radius: 8px;
  }
  .principle-row:hover {
    background-color: var(--surface);
  }
  .faq-answer {
    overflow: hidden;
    transition: max-height 0.3s ease, opacity 0.3s ease;
  }
  .faq-answer.closed {
    max-height: 0;
    opacity: 0;
  }
  .faq-answer.open {
    max-height: 800px;
    opacity: 1;
  }
  .faq-row { }
  .faq-q-text {
    transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
    display: inline-block;
  }
  .faq-row:hover .faq-q-text {
    transform: translateX(24px);
  }
  .contact-cta {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .contact-cta:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  }
  .cta-btn {
    transition: filter 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
  }
  .cta-btn:hover {
    filter: brightness(1.12);
    transform: translateY(-1px);
    box-shadow: rgba(255,255,255,0.87) 0px 0.5px 0px inset, rgba(0,0,0,0.28) 0px 6px 12px !important;
  }
  .footer-link {
    transition: opacity 0.2s ease;
    opacity: 1;
    color: #f5f4f0 !important;
  }
  .footer-link:hover {
    opacity: 0.72;
    color: #f5f4f0 !important;
  }
  .footer-book-btn {
    transition: opacity 0.18s ease, transform 0.15s ease;
  }
  .footer-book-btn:hover {
    opacity: 0.85;
    transform: scale(1.02);
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }

  /* ─── CASE STUDY ENTRY ANIMATIONS ─────────────────────────────── */
  /* Same easing as heroFadeUp — staggered via delay classes */
  .cs-fade-up {
    animation: heroFadeUp 0.85s cubic-bezier(0.16,1,0.3,1) both;
  }
  .cs-d1 { animation-delay: 0.05s; }
  .cs-d2 { animation-delay: 0.17s; }
  .cs-d3 { animation-delay: 0.28s; }
  .cs-d4 { animation-delay: 0.42s; }

  /* Back link hover */
  .cs-back { transition: color 0.2s ease; }
  .cs-back:hover { color: var(--text) !important; }

  /* ─── SECTION INTERACTIONS ─────────────────────────────────────── */
  .project-row-img { transition: opacity 0.2s ease; }
  .project-row:hover .project-row-img { opacity: 0.7; }
  .project-row-img img { transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); }
  .project-row:hover .project-row-img img { transform: scale(1.03); }
  /* ─── MEDIA SKELETON ──────────────────────────────────────────── */
  .cs-media-loading {
    background: linear-gradient(90deg, #f0f0f0 25%, #e4e4e4 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: skeleton-shimmer 1.4s ease infinite;
  }
  @keyframes skeleton-shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }


  /* ─── HERO ANIMATIONS ──────────────────────────────────────────── */
  @keyframes heroFadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes scrollPulse {
    0%   { transform: scaleY(0); transform-origin: top; opacity: 1; }
    49%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
    50%  { transform: scaleY(1); transform-origin: bottom; opacity: 1; }
    100% { transform: scaleY(0); transform-origin: bottom; opacity: 0.3; }
  }
  .hero-h1 { font-size: 88px; }
  @media (max-width: 1023px) { .hero-h1 { font-size: 60px; } }
  @media (max-width: 767px)  { .hero-h1 { font-size: 52px; } }
  .hero-meta     { animation: heroFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
  .hero-headline { animation: heroFadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.18s both; }
  .hero-divider  { animation: heroFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.45s both; }
  .hero-bottom   { animation: heroFadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.55s both; }
  .hero-cards    { animation: heroFadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.65s both; }
  .hero-card {
    position: relative;
    cursor: pointer;
    transform: rotate(var(--card-rotate, 0deg));
    box-shadow: 0px 4px 12px rgba(0,0,0,0.12);
    transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease;
  }
  .hero-card:hover {
    transform: rotate(var(--card-rotate, 0deg)) translateY(-10px);
    box-shadow: 0 20px 48px rgba(0,0,0,0.18);
  }
  .scroll-line   { animation: scrollPulse 2.4s cubic-bezier(0.76,0,0.24,1) 1.8s infinite; }
  .hero-cta {
    transition: filter 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
  }
  .hero-cta:hover {
    filter: brightness(1.12);
    transform: translateY(-1px);
    box-shadow: rgba(255,255,255,0.87) 0px 0.5px 0px inset, rgba(0,0,0,0.28) 0px 6px 12px !important;
  }

  /* ─── MENU OVERLAY ─────────────────────────────────────────────── */
  .menu-overlay {
    position: absolute; top: 0; right: 0; z-index: 1;
    width: 320px; height: 400px;
    background: #111110;
    border-radius: 16px;
    pointer-events: none;
    clip-path: inset(0 0 100% 100% round 16px);
    transition: clip-path 0.55s cubic-bezier(0.16,1,0.3,1);
    display: flex; flex-direction: column;
    overflow: hidden;
  }
  .menu-overlay.open {
    clip-path: inset(0 0 0 0 round 16px);
    pointer-events: all;
  }
  .menu-nav-link {
    display: block;
    font-size: 22px;
    font-weight: 600;
    letter-spacing: -0.03em;
    line-height: 1.2;
    color: #f5f4f0;
    opacity: 1;
    transition: opacity 0.2s ease;
  }
  /* Dim all, brighten hovered */
  .menu-links:hover .menu-nav-link { opacity: 0.35; }
  .menu-links:hover .menu-nav-link:hover { opacity: 1; }
  .menu-resource-link {
    display: block;
    font-size: 12px; color: rgba(245,244,240,0.35);
    letter-spacing: 0.01em;
    line-height: 1.8;
    transition: color 0.15s ease;
  }
  .menu-resource-link:hover { color: rgba(245,244,240,0.8); }
  .menu-btn {
    background: none; border: none; cursor: pointer;
    padding: 8px; display: flex; align-items: center; justify-content: center;
    color: inherit;
  }
  /* Close button hidden on desktop (click-outside closes it) */
  .menu-close-btn {
    display: none;
  }

  /* ─── RESPONSIVE ──────────────────────────────────────────────── */

  /* Tablet & below: stacked layouts */
  @media (max-width: 1023px) {
    .menu-overlay {
      width: min(320px, calc(100vw - 40px));
    }
    .project-row {
      grid-template-columns: 1fr !important;
      gap: 24px !important;
    }
    .project-row > div:last-child {
      order: -1;
    }
    .service-cards {
      flex-wrap: wrap;
    }
    .service-cards > div {
      flex: 1 0 calc(50% - 8px) !important;
      min-width: calc(50% - 8px) !important;
    }
    .logos-grid {
      grid-template-columns: repeat(4, 1fr) !important;
      column-gap: 32px !important;
    }
    .faq-layout {
      grid-template-columns: 1fr !important;
    }
    .contact-layout {
      grid-template-columns: 1fr !important;
    }
    .pricing-grid {
      grid-template-columns: 1fr !important;
    }
  }

  /* ─── MOBILE & CASE STUDY RESPONSIVE ─────────────────────────── */
  @media (max-width: 767px) {
    .cs-media-grid {
      grid-template-columns: 1fr !important;
    }
    .cs-media-grid > div {
      grid-column: unset !important;
    }
    .cs-meta-row {
      gap: 8px !important;
    }
    /* Full-screen overlay on mobile */
    .menu-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      width: 100vw; height: 100dvh;
      border-radius: 0;
      z-index: 5; /* above .menu-btn (z-index: 2) */
      clip-path: inset(0 0 100% 100% round 0px);
    }
    .menu-overlay.open {
      clip-path: inset(0 0 0 0 round 0px);
    }
    .menu-links {
      justify-content: center !important;
      padding: 0 40px !important;
    }
    .menu-nav-link {
      font-size: 32px !important;
    }
    /* Show close button on mobile */
    .menu-close-btn {
      display: flex;
      position: absolute;
      top: 16px; right: 16px;
      background: none; border: none; cursor: pointer;
      padding: 10px;
      color: rgba(245,244,240,0.6);
      align-items: center; justify-content: center;
      z-index: 10;
    }
    .menu-close-btn:hover { color: rgba(245,244,240,1); }
    .project-row:hover { opacity: 1; }
    .project-card:hover { transform: none; }
    .service-cards {
      flex-direction: column !important;
      flex-wrap: nowrap !important;
    }
    .service-cards > div {
      flex: none !important;
      min-width: 0 !important;
      width: 100% !important;
    }
    .service-illus { max-height: 190px; overflow: hidden; margin-top: 0 !important; }
    .service-illus-abs {
      position: relative !important;
      bottom: auto !important; left: auto !important; right: auto !important;
      width: 100% !important; height: auto !important;
      max-height: 190px; object-fit: cover; object-position: top;
      order: 2;
    }
    .logos-grid {
      grid-template-columns: repeat(3, 1fr) !important;
      column-gap: 24px !important;
      row-gap: 24px !important;
    }
    .team-grid {
      flex-direction: column !important;
      gap: 40px !important;
    }
    .team-grid > div {
      flex: none !important;
      width: 100% !important;
      align-items: center !important;
    }
    .team-grid > div > div:first-child {
      width: 200px !important;
      flex-shrink: 0;
    }
    .team-grid > div > div:last-child {
      text-align: center;
    }
    .pricing-grid {
      grid-template-columns: 1fr !important;
    }
    .footer-inner {
      flex-direction: column !important;
      align-items: flex-start !important;
    }
    .footer-contact-grid {
      grid-template-columns: 1fr !important;
      gap: 24px !important;
    }
    .footer-contact-grid > div:last-child {
      justify-content: flex-start !important;
    }
    .hero-cards { display: block !important; height: clamp(260px, 55vw, 360px) !important; }
  }
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/fav-icon-dark.png" media="(prefers-color-scheme: dark)" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Caladea:ital,wght@0,400;0,700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
