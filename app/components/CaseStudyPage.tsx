"use client";

import { useEffect, useRef, useState } from "react";
import Nav from "./Nav";
import type { Project, MediaItem } from "../data/projects";

// ─── SITE FOOTER ─────────────────────────────────────────────────────────────

function SiteFooter() {
  return (
    <footer style={{ background: "var(--bg)", padding: "0 clamp(16px, 2vw, 32px) clamp(24px, 3vw, 40px)" }}>
      <div style={{
        background: "#111110", borderRadius: 24,
        padding: "clamp(40px, 6vw, 72px) clamp(32px, 5vw, 72px) clamp(32px, 4vw, 48px)",
        maxWidth: 1400, margin: "0 auto",
      }}>
        <div style={{ marginBottom: "clamp(40px, 6vw, 72px)" }}>
          <h2 style={{
            fontFamily: "var(--font-display)", fontWeight: 400,
            fontSize: "clamp(36px, 5.5vw, 72px)", lineHeight: 1.05,
            letterSpacing: "-0.04em", color: "#f5f4f0",
            maxWidth: 640, marginBottom: 32,
          }}>
            Let's create something meaningful together.
          </h2>
          <a href="https://cal.com/elevatestd/30min" target="_blank" rel="noopener noreferrer" className="footer-book-btn" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#f5f4f0", color: "#111110",
            borderRadius: 100, padding: "13px 24px",
            fontWeight: 500, fontSize: 15, letterSpacing: "-0.01em",
          }}>
            Book a call →
          </a>
        </div>
        <div className="footer-contact-grid" style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: "clamp(28px, 4vw, 48px)",
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32,
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={{ fontSize: 11, color: "rgba(245,244,240,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 500 }}>Write to us</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <a href="mailto:bilguun@elevatestudio.xyz" className="footer-link" style={{ fontSize: 15, fontWeight: 600, color: "#f5f4f0" }}>bilguun@elevatestudio.xyz</a>
              <a href="tel:+97695902191" className="footer-link" style={{ fontSize: 15, fontWeight: 600, color: "#f5f4f0" }}>+976 95902191</a>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={{ fontSize: 11, color: "rgba(245,244,240,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 500 }}>Social</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {[
                { label: "Behance", href: "https://behance.net" },
                { label: "Instagram", href: "https://instagram.com" },
                { label: "X", href: "https://x.com" },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="footer-link" style={{ fontSize: 15, fontWeight: 600, color: "#f5f4f0" }}>{s.label}</a>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-end" }}>
            <a href="#" className="footer-link" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 500, color: "#f5f4f0" }}>
              <img src="/figma.svg" alt="" width={20} height={20} style={{ display: "block" }} />
              See Introduction
            </a>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: "clamp(28px, 4vw, 48px)", paddingTop: 20 }}>
          <p style={{ fontSize: 11, color: "rgba(245,244,240,0.35)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 500 }}>
            {new Date().getFullYear()} Elevate Studio
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────

function useReveal(threshold = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = () => setVisible(true);
    // Fallback: always show after 600ms regardless of observer
    const t = setTimeout(show, 600);
    const el = ref.current;
    if (!el) return () => clearTimeout(t);
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { show(); obs.disconnect(); clearTimeout(t); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => { obs.disconnect(); clearTimeout(t); };
  }, []);

  return { ref, visible };
}

function reveal(visible: boolean, delay = 0): React.CSSProperties {
  return {
    willChange: "opacity, transform",
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  };
}

// Videos default to full-width; images default to half (2-per-row).
function resolveSpan(item: MediaItem): "full" | "half" {
  if (item.span) return item.span;
  if (item.type === "video") return "full";
  return "half";
}

// ─── YC BADGE ────────────────────────────────────────────────────────────────

function YCBadge() {
  return (
    <span style={{
      fontSize: 9,
      fontWeight: 700,
      letterSpacing: "0.08em",
      color: "rgba(194,80,26,0.8)",
      border: "1px solid rgba(194,80,26,0.28)",
      borderRadius: 4,
      padding: "2px 6px",
      lineHeight: 1,
      textTransform: "uppercase" as const,
      flexShrink: 0,
    }}>
      YC W24
    </span>
  );
}

// ─── MEDIA ITEM WITH SCROLL REVEAL ───────────────────────────────────────────

function RevealMediaItem({ item, delay = 0 }: { item: MediaItem; delay?: number }) {
  const { ref, visible } = useReveal(0);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const span = resolveSpan(item);

  // Cropped mode: explicit aspect ratio set → object-fit: cover fills the frame.
  // Natural mode: no aspect → full image/video visible at its natural dimensions.
  const hasCrop = !!item.aspect;

  // Cached images won't fire onLoad — check .complete on mount.
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <div
      ref={ref}
      className={`cs-media-item${loaded ? "" : " cs-media-loading"}`}
      style={{
        gridColumn: span === "full" ? "1 / -1" : undefined,
        borderRadius: 14,
        overflow: "hidden",
        backgroundColor: "var(--surface)",
        border: "0.5px solid rgba(255,255,255,1)",
        aspectRatio: item.aspect ?? undefined,
        // Natural-height items: reserve space while loading so skeleton is visible
        minHeight: !loaded && !item.aspect ? 240 : undefined,
        ...reveal(visible, delay),
      }}
    >
      {item.type === "image" ? (
        <img
          ref={imgRef}
          src={item.src}
          alt={item.alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          style={{
            width: "100%",
            height: hasCrop ? "100%" : "auto",
            objectFit: hasCrop ? "cover" : undefined,
            objectPosition: hasCrop ? (item.objectPosition ?? "center") : undefined,
            display: "block",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />
      ) : (
        <video
          src={item.src}
          poster={item.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setLoaded(true)}
          style={{
            width: "100%",
            height: hasCrop ? "100%" : "auto",
            objectFit: hasCrop ? "cover" : undefined,
            display: "block",
          }}
        />
      )}
    </div>
  );
}

// ─── BACK LINK ────────────────────────────────────────────────────────────────

function BackLink() {
  return (
    <a
      href="/#projects"
      className="cs-back"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 48,
        height: 48,
        borderRadius: "50%",
        background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.46) 100%)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "0px 8px 16px rgba(0,0,0,0.08), inset 0px 2px 6px rgba(255,255,255,0.35), inset 0px -2px 6px rgba(255,255,255,0.4)",
        textDecoration: "none",
        marginBottom: 48,
        flexShrink: 0,
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M15 10H5M9 5l-5 5 5 5" stroke="#1e2a3a" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
  );
}

// ─── REGULAR CASE STUDY ───────────────────────────────────────────────────────

function RegularCaseStudy({ project }: { project: Project }) {
  const overviewReveal = useReveal(0.1);

  return (
    <>
      <Nav />
      <main>
        {/* ── PAGE HEADER ──────────────────────────────── */}
        <section style={{
          maxWidth: 1280, margin: "0 auto",
          padding: "clamp(100px,12vh,140px) clamp(20px,5vw,80px) clamp(40px,6vw,64px)",
        }}>
          <BackLink />

          {/* Category · Year · YC badge */}
          <div
            className="cs-fade-up cs-d1"
            style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20, flexWrap: "wrap" }}
          >
            <span style={{
              fontSize: 11, fontWeight: 500, letterSpacing: "0.12em",
              textTransform: "uppercase", color: "var(--muted)",
            }}>
              {project.category}
            </span>
            <span style={{ width: 1, height: 12, backgroundColor: "var(--border)", flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.08em" }}>
              {project.year}
            </span>
            {project.tag === "YC" && <YCBadge />}
          </div>

          {/* Title */}
          <h1
            className="cs-fade-up cs-d2"
            style={{
              fontSize: "clamp(40px,6vw,88px)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 0.96,
              color: "var(--text)",
              marginBottom: "clamp(16px,2vw,24px)",
            }}
          >
            {project.name}
          </h1>

          {/* Tagline */}
          <p
            className="cs-fade-up cs-d3"
            style={{
              fontSize: "clamp(15px,1.8vw,19px)",
              color: "var(--muted)",
              lineHeight: 1.65,
              letterSpacing: "-0.01em",
              maxWidth: 540,
            }}
          >
            {project.tagline}
          </p>
        </section>

        {/* ── HERO IMAGE ───────────────────────────────── */}
        <div
          className="cs-fade-up cs-d4"
          style={{
            maxWidth: 1280, margin: "0 auto",
            padding: "0 clamp(20px,5vw,80px)",
          }}
        >
          <div style={{
            borderRadius: 16, overflow: "hidden",
            border: "1px solid var(--border)",
            aspectRatio: "16/10",
            backgroundColor: "var(--surface)",
          }}>
            <img
              src={project.img}
              alt={project.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        </div>

        {/* ── SCOPE + OVERVIEW ─────────────────────────── */}
        <section
          ref={overviewReveal.ref}
          style={{
            maxWidth: 1280, margin: "0 auto",
            padding: "clamp(48px,8vw,96px) clamp(20px,5vw,80px)",
            ...reveal(overviewReveal.visible),
          }}
        >
          {/* Scope tags */}
          <div
            className="cs-meta-row"
            style={{
              display: "flex", alignItems: "center", gap: 10,
              flexWrap: "wrap",
              marginBottom: "clamp(32px,5vw,56px)",
              paddingBottom: "clamp(24px,3vw,36px)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            {project.scope.map((s) => (
              <span key={s} style={{
                fontSize: 11, fontWeight: 500, letterSpacing: "0.1em",
                textTransform: "uppercase", color: "var(--muted)",
                border: "1px solid var(--border)",
                borderRadius: 100,
                padding: "5px 12px",
                whiteSpace: "nowrap",
              }}>
                {s}
              </span>
            ))}
          </div>

          {/* Overview paragraph */}
          {project.overview && (
            <p style={{
              fontSize: "clamp(15px,1.6vw,18px)",
              lineHeight: 1.9,
              color: "var(--text)",
              maxWidth: 640,
              letterSpacing: "-0.005em",
            }}>
              {project.overview}
            </p>
          )}
        </section>

        {/* ── MEDIA GRID ───────────────────────────────── */}
        {project.media.length > 0 && (
          <section style={{
            maxWidth: 1280, margin: "0 auto",
            padding: "0 clamp(20px,5vw,80px) clamp(80px,12vw,140px)",
          }}>
            <div
              className="cs-media-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
              }}
            >
              {project.media.map((item, i) => (
                <RevealMediaItem
                  key={i}
                  item={item}
                  delay={i < 4 ? i * 60 : 0}
                />
              ))}
            </div>
          </section>
        )}

        <SiteFooter />
      </main>
    </>
  );
}

// ─── LANNDY UPCOMING PAGE ─────────────────────────────────────────────────────

function LanndyCaseStudy({ project }: { project: Project }) {
  const upcomingReveal = useReveal(0.08);

  return (
    <>
      <Nav />
      <main>
        {/* ── HEADER ───────────────────────────────────── */}
        <section style={{
          maxWidth: 1280, margin: "0 auto",
          padding: "clamp(100px,12vh,140px) clamp(20px,5vw,80px) clamp(48px,7vw,72px)",
        }}>
          <BackLink />

          <div
            className="cs-fade-up cs-d1"
            style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}
          >
            <span style={{
              fontSize: 11, fontWeight: 500, letterSpacing: "0.12em",
              textTransform: "uppercase", color: "var(--muted)",
            }}>
              {project.category}
            </span>
            <span style={{ width: 1, height: 12, backgroundColor: "var(--border)" }} />
            <span style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.08em" }}>{project.year}</span>
          </div>

          <h1
            className="cs-fade-up cs-d2"
            style={{
              fontSize: "clamp(40px,6vw,88px)",
              fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 0.96,
              color: "var(--text)", marginBottom: "clamp(16px,2vw,24px)",
            }}
          >
            {project.name}
          </h1>

          {/* 1–2 sentences from overview */}
          <p
            className="cs-fade-up cs-d3"
            style={{
              fontSize: "clamp(15px,1.8vw,19px)",
              color: "var(--muted)", lineHeight: 1.65,
              letterSpacing: "-0.01em", maxWidth: 520,
            }}
          >
            {project.overview}
          </p>
        </section>

        {/* ── UPCOMING SECTION ─────────────────────────── */}
        <section style={{
          maxWidth: 1280, margin: "0 auto",
          padding: "0 clamp(20px,5vw,80px) clamp(80px,12vw,140px)",
        }}>
          <div
            ref={upcomingReveal.ref}
            style={{
              position: "relative",
              borderRadius: 20,
              overflow: "hidden",
              minHeight: "clamp(360px,40vw,520px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              ...reveal(upcomingReveal.visible),
            }}
          >
            {/* Blurred background — project image heavily treated */}
            <img
              src={project.img}
              alt=""
              aria-hidden="true"
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: "cover",
                filter: "blur(48px) saturate(0.25) brightness(1.15)",
                transform: "scale(1.15)",
                pointerEvents: "none",
              }}
            />

            {/* Frosted glass card */}
            <div style={{
              position: "relative", zIndex: 1,
              background: "rgba(255,255,255,0.84)",
              border: "1px solid rgba(255,255,255,0.65)",
              backdropFilter: "blur(1px)",
              WebkitBackdropFilter: "blur(1px)",
              borderRadius: 16,
              padding: "clamp(40px,6vw,72px) clamp(32px,5vw,64px)",
              margin: "clamp(20px,3vw,40px)",
              textAlign: "center",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 20,
              maxWidth: 520, width: "100%",
            }}>
              <span style={{
                fontSize: 9, fontWeight: 700, letterSpacing: "0.2em",
                textTransform: "uppercase", color: "var(--muted)",
              }}>
                Бэлтгэлийн шатанд
              </span>

              <h2 style={{
                fontSize: "clamp(22px,3.5vw,38px)",
                fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.15,
                color: "var(--text)", margin: 0,
              }}>
                Кейс судалгаа<br />удахгүй нийтлэгдэнэ
              </h2>

              <p style={{
                fontSize: 14, color: "var(--muted)",
                lineHeight: 1.85, maxWidth: 340,
                margin: 0,
              }}>
                Энэхүү бүтээл одоогоор боловсруулагдаж байгаа бөгөөд тун удахгүй дэлгэрэнгүйгээр танилцуулагдана.
              </p>

              <a
                href="https://cal.com/elevatestd/30min"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginTop: 4,
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "10px 22px",
                  backgroundColor: "var(--text)", color: "#fff",
                  borderRadius: 100, fontSize: 13, fontWeight: 500,
                  textDecoration: "none", letterSpacing: "-0.01em",
                }}
              >
                Уулзалт товлох →
              </a>
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}

// ─── EXPORT ───────────────────────────────────────────────────────────────────

export default function CaseStudyPage({ project }: { project: Project }) {
  if (project.upcoming) return <LanndyCaseStudy project={project} />;
  return <RegularCaseStudy project={project} />;
}
