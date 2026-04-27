"use client";

import { useState, useEffect, useRef } from "react";

// ─── SHARED SVG COMPONENTS ───────────────────────────────────────────────────
// Exported so Footer in page.tsx can import ElevateLogo without duplication.

export function GridDots({ color = "currentColor" }: { color?: string }) {
  const pos = [3, 9, 15];
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      {pos.flatMap((y) =>
        pos.map((x) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={1.8} fill={color} />
        ))
      )}
    </svg>
  );
}

export function ElevateLogo({ color = "#111110" }: { color?: string }) {
  return (
    <svg width="108" height="26" viewBox="0 0 507 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0H49.0604L27.6793 26.7757C23.0305 32.5974 15.9002 36 8.34908 36H0V0Z" fill={color}/>
      <path d="M0 42.08H46.5032C54.0542 42.08 61.1845 38.6775 65.8333 32.8558L84.7041 9.22419C89.353 3.4025 96.4832 0 104.034 0H122.651V36H85.5598C78.0088 36 70.8786 39.4025 66.2297 45.2242L47.3589 68.8558C42.7101 74.6775 35.5798 78.08 28.0288 78.08L0 78.08V42.08Z" fill={color}/>
      <path d="M0 84L66.1137 84C73.6692 84 80.8031 80.5935 85.4516 74.766L104.679 50.6615C108.999 45.2458 115.629 42.08 122.651 42.08V78.08L105.022 78.08C97.467 78.08 90.3331 81.4865 85.6845 87.314L66.9772 110.766C62.3287 116.594 55.1948 120 47.6393 120L0 120V84Z" fill={color}/>
      <path d="M163.558 98.7693V19.9997H214.978V31.0767H176.964V53.7691H212.344V64.8845H176.964V87.6923H215.371V98.7693H163.558Z" fill={color}/>
      <path d="M237.275 19.9997V98.7693H224.263V19.9997H237.275Z" fill={color}/>
      <path d="M273.361 99.9616C267.359 99.9616 262.183 98.718 257.833 96.2308C253.482 93.718 250.141 90.1923 247.809 85.6538C245.476 81.0897 244.31 75.7435 244.31 69.6153C244.31 63.5384 245.476 58.1922 247.809 53.5768C250.167 48.9614 253.456 45.3716 257.676 42.8075C261.895 40.2178 266.848 38.9229 272.535 38.9229C276.126 38.9229 279.546 39.487 282.796 40.6152C286.045 41.7434 288.941 43.5127 291.483 45.9229C294.026 48.3075 296.03 51.3845 297.498 55.1537C298.992 58.923 299.739 63.4358 299.739 68.6922V72.8461H250.953V63.8461H287.12C287.12 61.0255 286.517 58.5127 285.312 56.3076C284.106 54.0768 282.416 52.3204 280.24 51.0383C278.091 49.7563 275.575 49.1152 272.693 49.1152C269.574 49.1152 266.848 49.846 264.516 51.3076C262.21 52.7691 260.414 54.6922 259.13 57.0768C257.872 59.4614 257.23 62.0512 257.204 64.8461V72.2692C257.204 75.9615 257.885 79.1153 259.248 81.7307C260.611 84.3461 262.511 86.3461 264.948 87.7308C267.386 89.0897 270.229 89.7692 273.479 89.7692C275.654 89.7692 277.62 89.4744 279.376 88.8846C281.131 88.2692 282.638 87.3718 283.896 86.1923C285.18 84.9872 286.163 83.5 286.845 81.7307L299.07 83.4615C298.206 86.7692 296.607 89.6667 294.275 92.1539C291.968 94.6154 289.033 96.5385 285.469 97.9231C281.931 99.2821 277.895 99.9616 273.361 99.9616Z" fill={color}/>
      <path d="M357.81 39.6921L336.07 98.7693H321.918L300.218 39.6921H314.095L328.68 84.3846H329.309L343.933 39.6921H357.81Z" fill={color}/>
      <path d="M378.446 100C374.62 100 371.173 99.3205 368.107 97.9616C365.041 96.6026 362.604 94.6026 360.795 91.9615C359.013 89.2949 358.122 86.0256 358.122 82.1538C358.122 78.7948 358.764 76.0384 360.048 73.8846C361.359 71.7051 363.115 69.9743 365.316 68.6922C367.517 67.4102 369.981 66.4486 372.707 65.8076C375.458 65.1409 378.289 64.6538 381.198 64.3461C384.762 63.9358 387.658 63.5897 389.886 63.3076C392.113 63.0255 393.738 62.5768 394.76 61.9614C395.782 61.3461 396.293 60.3589 396.293 58.9999V58.7307C396.293 55.6281 395.363 53.2178 393.502 51.4999C391.668 49.7819 388.981 48.9229 385.443 48.9229C381.722 48.9229 378.787 49.7178 376.638 51.3076C374.489 52.8973 373.008 54.7178 372.195 56.7691L360.048 54.6153C361.228 51.0255 363.049 48.0768 365.513 45.7691C367.976 43.4357 370.898 41.7178 374.279 40.6152C377.686 39.487 381.355 38.9229 385.286 38.9229C387.959 38.9229 390.685 39.2306 393.463 39.846C396.267 40.4614 398.862 41.5126 401.247 42.9998C403.631 44.487 405.558 46.5639 407.025 49.2306C408.519 51.8973 409.266 55.2819 409.266 59.3845V98.7693H396.686V90.6923H396.215C395.428 92.2308 394.262 93.718 392.716 95.1539C391.17 96.5898 389.217 97.7564 386.859 98.6539C384.5 99.5513 381.696 100 378.446 100ZM381.552 90.3077C384.618 90.3077 387.252 89.7179 389.453 88.5385C391.655 87.3333 393.345 85.7692 394.524 83.8461C395.73 81.8974 396.333 79.7948 396.333 77.5384V70.2307C395.887 70.6153 395.101 70.9743 393.974 71.3076C392.847 71.6153 391.576 71.8974 390.161 72.1538C388.746 72.3846 387.357 72.5897 385.994 72.7692C384.631 72.9487 383.465 73.1025 382.495 73.2307C380.32 73.5384 378.341 74.0128 376.559 74.6538C374.777 75.2948 373.362 76.2179 372.313 77.423C371.265 78.6025 370.741 80.1538 370.741 82.0769C370.741 84.7949 371.763 86.8461 373.807 88.2308C375.851 89.6154 378.433 90.3077 381.552 90.3077Z" fill={color}/>
      <path d="M447.976 39.6921V49.6922H414.129V39.6921H447.976ZM422.817 25.5382H435.829V81.2307C435.829 83.2564 436.143 84.8077 436.772 85.8846C437.401 86.9359 438.227 87.6538 439.249 88.0385C440.297 88.3974 441.437 88.5769 442.669 88.5769C443.586 88.5769 444.399 88.5128 445.106 88.3846C445.84 88.2564 446.404 88.1538 446.797 88.0769L449.077 98.2693C448.343 98.5 447.308 98.7564 445.971 99.0385C444.634 99.3462 442.997 99.5257 441.057 99.577C437.729 99.6539 434.676 99.1154 431.898 97.9616C429.146 96.8077 426.931 95.0257 425.254 92.6154C423.603 90.2051 422.79 87.1795 422.817 83.5384V25.5382Z" fill={color}/>
      <path d="M480.622 99.9616C474.621 99.9616 469.445 98.718 465.094 96.2308C460.744 93.718 457.402 90.1923 455.07 85.6538C452.737 81.0897 451.571 75.7435 451.571 69.6153C451.571 63.5384 452.737 58.1922 455.07 53.5768C457.428 48.9614 460.717 45.3716 464.937 42.8075C469.156 40.2178 474.109 38.9229 479.797 38.9229C483.387 38.9229 486.807 39.487 490.057 40.6152C493.307 41.7434 496.202 43.5127 498.745 45.9229C501.287 48.3075 503.292 51.3845 504.759 55.1537C506.253 58.923 507 63.4358 507 68.6922V72.8461H458.215V63.8461H494.381C494.381 61.0255 493.778 58.5127 492.573 56.3076C491.367 54.0768 489.677 52.3204 487.502 51.0383C485.353 49.7563 482.837 49.1152 479.954 49.1152C476.835 49.1152 474.109 49.846 471.777 51.3076C469.471 52.7691 467.676 54.6922 466.391 57.0768C465.133 59.4614 464.491 62.0512 464.465 64.8461V72.2692C464.465 75.9615 465.146 79.1153 466.509 81.7307C467.872 84.3461 469.772 86.3461 472.209 87.7308C474.647 89.0897 477.49 89.7692 480.74 89.7692C482.915 89.7692 484.881 89.4744 486.637 88.8846C488.393 88.2692 489.9 87.3718 491.157 86.1923C492.442 84.9872 493.424 83.5 494.106 81.7307L506.332 83.4615C505.467 86.7692 503.868 89.6667 501.536 92.1539C499.229 94.6154 496.294 96.5385 492.73 97.9231C489.192 99.2821 485.156 99.9616 480.622 99.9616Z" fill={color}/>
    </svg>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
// Links use /#section so they work from any page (homepage or case study).

export default function Nav() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when menu is open (important on mobile full-screen overlay)
  useEffect(() => {
    document.body.style.overflowY = open ? "scroll" : "";
    return () => { document.body.style.overflowY = ""; };
  }, [open]);

  // Click-outside to close (desktop only — on mobile the overlay is full-screen)
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const links = [
    { label: "Work", href: "/#projects" },
    { label: "Services", href: "/#services" },
    { label: "Approach", href: "/#principles" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Book a call", href: "https://cal.com/elevatestd/30min" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0,
      zIndex: 300,
      display: "flex", alignItems: "flex-start", justifyContent: "center",
      padding: "32px clamp(20px, 4vw, 60px) 0",
      background: "transparent",
      pointerEvents: "none",
    }}>
      <div style={{
        pointerEvents: "auto",
        display: "flex", alignItems: "center",
        gap: "clamp(40px, 13vw, 192px)",
        height: 56,
        paddingLeft: 24, paddingRight: 8,
        borderRadius: 100,
        background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.46) 100%)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "0px 8px 16px rgba(0,0,0,0.08), inset 0px 2px 6px rgba(255,255,255,0.35), inset 0px -2px 6px rgba(255,255,255,0.4)",
      }}>
        <a href="/" aria-label="Elevate Studio" style={{ lineHeight: 0 }}>
          <ElevateLogo color="#0f172a" />
        </a>
        <div ref={wrapRef} style={{ position: "relative" }}>
          <button
            className="menu-btn"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Цэс хаах" : "Цэс нээх"}
            style={{
              position: "relative", zIndex: 2,
              width: 40, height: 40, borderRadius: 80,
              backgroundColor: "#111110",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: 0,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 10H17.5M2.5 5H17.5M2.5 15H17.5" stroke="white" strokeOpacity="0.9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

        <div className={`menu-overlay${open ? " open" : ""}`}>
          {/* Close button — visible on mobile only via CSS */}
          <button
            className="menu-close-btn"
            onClick={() => setOpen(false)}
            aria-label="Цэс хаах"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>

          <div className="menu-links" style={{
            flex: 1, display: "flex", flexDirection: "column", justifyContent: "center",
            padding: "32px 28px 24px", gap: 6,
          }}>
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="menu-nav-link"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div style={{
            padding: "20px 28px 28px",
            borderTop: "1px solid rgba(245,244,240,0.1)",
          }}>
            <p style={{
              fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase",
              color: "rgba(245,244,240,0.3)", marginBottom: 12, fontWeight: 500,
            }}>
              Links
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { label: "LinkedIn", href: "https://linkedin.com" },
                { label: "Instagram", href: "https://instagram.com" },
              ].map((r) => (
                <a
                  key={r.label}
                  href={r.href}
                  className="menu-resource-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {r.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </nav>
  );
}
