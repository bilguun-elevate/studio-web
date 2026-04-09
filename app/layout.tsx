import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Elevate Studio — UX/UI & Product Design Studio",
  description:
    "AI, SaaS болон дижитал платформ багуудад зориулсан бүтээгч дизайны студио. Ulaanbaatar, Mongolia.",
};

const css = `
  :root {
    --bg: #ffffff;
    --surface: #f4f4f2;
    --surface-hover: #ebebea;
    --border: #e5e4e0;
    --text: #111110;
    --muted: #8a8a85;
    --accent: #b8f542;
    --accent-text: #111110;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background-color: var(--bg);
    color: var(--text);
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    -webkit-font-smoothing: antialiased;
    line-height: 1.5;
  }
  a { color: inherit; text-decoration: none; }
  button { font-family: inherit; }
  ::selection { background: var(--accent); color: var(--accent-text); }
  nav a { transition: color 0.2s ease; }
  nav a:hover { color: var(--text) !important; }
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
    transition: background-color 0.2s ease, border-color 0.2s ease;
    border: 1px solid var(--border);
  }
  .service-card:hover {
    background-color: var(--surface-hover) !important;
    border-color: #c8c5be;
  }
  .principle-row {
    transition: background-color 0.2s ease;
    border-radius: 8px;
  }
  .principle-row:hover {
    background-color: var(--surface);
  }
  .pricing-card {
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    border: 1px solid var(--border);
  }
  .pricing-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 48px rgba(0,0,0,0.06);
  }
  .pricing-btn {
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  }
  .pricing-btn:hover {
    background-color: var(--text) !important;
    color: var(--bg) !important;
    border-color: var(--text) !important;
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
    max-height: 400px;
    opacity: 1;
  }
  .faq-row {
    transition: background-color 0.2s ease;
  }
  .faq-row:hover {
    background-color: var(--surface);
  }
  .contact-cta {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .contact-cta:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  }
  .footer-link {
    transition: color 0.2s ease;
  }
  .footer-link:hover {
    color: var(--text) !important;
  }
  .gradient-text {
    background: linear-gradient(135deg, #4a9f6e 0%, #8a5fa8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ─── SECTION INTERACTIONS ─────────────────────────────────────── */
  .project-row { transition: opacity 0.2s ease; }
  .project-row:hover { opacity: 0.7; }
  .project-row:hover img { transform: scale(1.03); }
  .project-row img { transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); }
  .pricing-row { transition: background-color 0.2s ease; }
  .pricing-row:hover { background-color: var(--surface); }

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
  .hero-meta     { animation: heroFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
  .hero-headline { animation: heroFadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.18s both; }
  .hero-divider  { animation: heroFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.45s both; }
  .hero-bottom   { animation: heroFadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.55s both; }
  .scroll-line   { animation: scrollPulse 2.4s cubic-bezier(0.76,0,0.24,1) 1.8s infinite; }
  .hero-cta {
    transition: background-color 0.2s ease, transform 0.15s ease;
  }
  .hero-cta:hover {
    background-color: #2a2a28 !important;
    transform: translateY(-1px);
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
    transition: opacity 0.15s ease;
  }
  /* Dim all, highlight hovered */
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
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mn">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
