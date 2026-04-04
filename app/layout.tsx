import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Elevate Studio — UX/UI & Product Design Studio",
  description:
    "AI, SaaS болон дижитал платформ багуудад зориулсан бүтээгч дизайны студио. Ulaanbaatar, Mongolia.",
};

const css = `
  :root {
    --bg: #0c0c0c;
    --surface: #161616;
    --border: #222;
    --text: #f0f0f0;
    --muted: #777;
    --accent: #e8ff4d;
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
  ::selection { background: var(--accent); color: #000; }
  nav a:hover { color: var(--text) !important; }
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mn">
      <head>
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
