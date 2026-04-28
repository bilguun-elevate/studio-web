"use client";

import { useState, useEffect, useRef, createContext, useContext } from "react";
import Nav, { ElevateLogo } from "./components/Nav";
import { projects } from "./data/projects";

// ─── EDIT MODE ────────────────────────────────────────────────────────────────

const STORAGE_KEY = "elevate-edits";
type Store = Record<string, string>;

const EditCtx = createContext<{
  editing: boolean;
  get: (id: string, fallback: string) => string;
  set: (id: string, val: string) => void;
  store: Store;
}>({ editing: false, get: (_, fb) => fb, set: () => {}, store: {} });

function EditProvider({ children }: { children: React.ReactNode }) {
  const [editing, setEditing] = useState(false);
  const [store, setStore] = useState<Store>({});

  useEffect(() => {
    setEditing(new URLSearchParams(window.location.search).has("edit"));
    try { setStore(JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")); } catch {}
  }, []);

  const set = (id: string, val: string) =>
    setStore(prev => {
      const next = { ...prev, [id]: val };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });

  const get = (id: string, fallback: string) => store[id] ?? fallback;

  return (
    <EditCtx.Provider value={{ editing, get, set, store }}>
      {children}
      {editing && <EditToolbar store={store} />}
    </EditCtx.Provider>
  );
}

function EditToolbar({ store }: { store: Store }) {
  const [copied, setCopied] = useState(false);
  const changed = Object.keys(store).length;
  const copy = () => {
    navigator.clipboard.writeText(JSON.stringify(store, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div style={{
      position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
      background: "#111110", color: "#f5f4f0", borderRadius: 100,
      display: "flex", alignItems: "center", gap: 12, padding: "10px 10px 10px 20px",
      zIndex: 9999, fontSize: 13, fontWeight: 500,
      boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
      whiteSpace: "nowrap", maxWidth: "calc(100vw - 32px)",
    }}>
      <span style={{ color: "#b8f542" }}>● Edit Mode</span>
      {changed > 0 && <span style={{ color: "rgba(245,244,240,0.4)" }}>{changed} change{changed !== 1 ? "s" : ""}</span>}
      <button onClick={copy} style={{
        background: "#b8f542", border: "none", color: "#111110",
        padding: "7px 16px", borderRadius: 100, cursor: "pointer", fontSize: 13, fontWeight: 600,
      }}>{copied ? "Copied!" : "Copy Changes"}</button>
      <button onClick={() => { localStorage.removeItem(STORAGE_KEY); window.location.reload(); }} style={{
        background: "rgba(255,255,255,0.08)", border: "none", color: "rgba(245,244,240,0.5)",
        padding: "7px 14px", borderRadius: 100, cursor: "pointer", fontSize: 12,
      }}>Reset</button>
    </div>
  );
}

// Editable text — transparent when not editing, inline contenteditable when editing
function ET({ id, children, block }: { id: string; children: string; block?: boolean }) {
  const { editing, get, set } = useContext(EditCtx);
  const val = get(id, children);
  if (!editing) return <>{val}</>;
  const Tag = block ? "div" : "span";
  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      style={{ outline: "none", cursor: "text", borderRadius: 3, boxShadow: "0 0 0 2px #b8f542" }}
      onBlur={e => set(id, e.currentTarget.textContent || "")}
      dangerouslySetInnerHTML={{ __html: val }}
    />
  );
}

// Editable image — click to swap file when editing
function EI({ id, src, alt, style }: { id: string; src: string; alt: string; style?: React.CSSProperties }) {
  const { editing, get, set } = useContext(EditCtx);
  const val = get(id, src);
  const inp = useRef<HTMLInputElement>(null);
  if (!editing) return <img src={val} alt={alt} style={style} />;
  return (
    <div style={{ position: "relative", cursor: "pointer" }} onClick={() => inp.current?.click()}>
      <img src={val} alt={alt} style={{ ...style, opacity: 0.75 }} />
      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0,0,0,0.35)", color: "#fff", fontSize: 11, fontWeight: 600,
        letterSpacing: "0.08em", textTransform: "uppercase", borderRadius: "inherit",
      }}>Replace</div>
      <input ref={inp} type="file" accept="image/*" style={{ display: "none" }}
        onChange={e => { const f = e.target.files?.[0]; if (f) set(id, URL.createObjectURL(f)); }} />
    </div>
  );
}

// ─── DATA ────────────────────────────────────────────────────────────────────
// projects imported from ./data/projects.ts

const services = [
  { title: "Strategy & Research", items: ["Product strategy", "User research", "UX Audit"],               color: "#b5c7f5", bg: "/service-cards/bg-1.png" },
  { title: "Product Design",      items: ["UX/UI design", "Prototypes", "Design systems"],                color: "#a3d8ef", bg: "/service-cards/bg-2.png", illus: "/service-cards/illus-4.svg" },
  { title: "Brand & Web",         items: ["Web design", "Framer, Claude development", "Visual identity"],  color: "#d3f1d9", bg: "/service-cards/bg-3.png", illus: "/service-cards/illus-3.svg" },
  { title: "Embedded Designer",   items: ["Full-time", "Workshopper", "Long-term partner"],                color: "#f5c1b5", bg: "/service-cards/bg-4.png", illus: "/service-cards/illus-2.svg" },
];

const principles = [
  {
    number: "01",
    mn: "We See the Problem, Not Just the Solution",
    en: "Great design starts with deep listening. Before we decide \"what to build,\" we focus on \"what matters\" to your business. We dive deep into your unique challenges to ensure that the eventual solution isn't just a band-aid, but a strategic tool that solves the root cause and drives actual value.",
  },
  {
    number: "02",
    mn: "Data Over Ego",
    en: "We believe the best decisions are fueled by logic, not opinions. We set aside personal biases and hierarchy in favor of rigorous research and real-world usage patterns. By prioritizing data and user behavior, we ensure that every design choice is objective, defensible, and most importantly effective.",
  },
  {
    number: "03",
    mn: "We Build Systems, Not Just Pictures",
    en: "A product should be built to evolve, not just to be \"finished.\" Our focus is on long-term growth rather than short-term completion. We create robust design systems and scalable foundations that allow your product to grow and adapt over time without breaking, ensuring your investment remains strong as your business scales.",
  },
];

const team = [
  { name: "Bilguun", role: "Lead Designer", img: "/team/bilguun.avif" },
  { name: "Dulguun", role: "Visual Designer", img: "/team/dulguun.avif" },
  { name: "Taivnaa", role: "Experience Designer", img: "/team/taivnaa.avif" },
];

type PricingPlan = { name: string; subtitle: string; price: string; duration: string; features: string[] };

const PRICING_FEATURES = {
  webSprint: [
    "You will gain insights based on research to understand exactly what the user wants.",
    "You will break free from assumptions. You will understand what to do and what not to do.",
    "We will deliver ready files for UI/UX design, prototyping, and development.",
    "You will have a partner on the project, not just an executor.",
    "You will feel the first real results within 1-2 weeks.",
    "Collaboration can be paused or terminated at any time.",
  ],
  uxAudit: [
    "Complete UX audit of the product",
    "Detailed report of identified issues",
    "Proposed solutions (by priority)",
    "Clear recommendations for improvements",
    "1-hour meeting with the team (to present findings)",
    "Roadmap for next steps",
  ],
  mobileApp: [
    "User flow mapping + wireframe (main page)",
    "Design of core screens up to 12",
    "Mobile design system (color, font, icon, component)",
    "All interactive states",
    "Figma handoff materials for developers",
    "One-time revision + explanation meeting for developers",
  ],
  productPartner: [
    "Complete UX/UI design for 2-3 features/sections per month",
    "Weekly design review + strategic meeting",
    "Unlimited revisions and iterations",
    "Response to questions/decisions within 48 hours",
    "Full access to Figma/Framer files",
    "Collaboration can be terminated with a 30-day notice",
  ],
};

const pricingINT: PricingPlan[] = [
  { name: "Web Sprint",             subtitle: "Framer website in 5-7 days. Suitable for startups and small businesses.", price: "$1,800",  duration: "10–15 days", features: PRICING_FEATURES.webSprint },
  { name: "UX Audit",               subtitle: "Current product UX audit + detailed recommendations.",                    price: "$1,200",  duration: "4 days",     features: PRICING_FEATURES.uxAudit },
  { name: "Mobile App Design Sprint", subtitle: "For the team that urgently needs core pages. Not a long process, within a week.", price: "$2,400",  duration: "10–15 days", features: PRICING_FEATURES.mobileApp },
  { name: "Product Partner",        subtitle: "Looking for a partner to take full responsibility for product design.",    price: "$4,500",  duration: "per month",  features: PRICING_FEATURES.productPartner },
];

const pricingMN: PricingPlan[] = [
  { name: "Web Sprint",             subtitle: "Framer website in 5-7 days. Suitable for startups and small businesses.", price: "₮2,800,000", duration: "7–10 days",  features: PRICING_FEATURES.webSprint },
  { name: "UX Audit",               subtitle: "Current product UX audit + detailed recommendations.",                    price: "₮1,700,000", duration: "4 days",     features: PRICING_FEATURES.uxAudit },
  { name: "Mobile App Design Sprint", subtitle: "For the team that urgently needs core pages. Not a long process, within a week.", price: "₮3,500,000", duration: "10–15 days", features: PRICING_FEATURES.mobileApp },
  { name: "Product Partner",        subtitle: "Looking for a partner to take full responsibility for product design.",    price: "₮7,000,000", duration: "per month",  features: PRICING_FEATURES.productPartner },
];

function usePricingLocale(): "mn" | "intl" {
  const [locale, setLocale] = useState<"mn" | "intl">("intl");
  useEffect(() => {
    const country = document.cookie
      .split("; ")
      .find(r => r.startsWith("geo_country="))
      ?.split("=")[1];
    if (country === "MN") setLocale("mn");
  }, []);
  return locale;
}

const faqs = [
  {
    q: "Who is Elevate Studio best suited for?",
    a: "Teams building AI products, SaaS, and brand-driven digital experiences who value a human-centered design approach.",
  },
  {
    q: "Can we pause the collaboration mid-project?",
    a: "Yes. You can pause or end the collaboration at any time — no penalties.",
  },
  {
    q: "Can you design AI products?",
    a: "Yes. AI and SaaS products are our core focus. We have experience with products like ProhostAI (YC W24).",
  },
  {
    q: "What deliverables can we expect?",
    a: "Figma files, design system, prototype, and developer-ready specs — depending on the project scope.",
  },
];

// ─── NAV ─────────────────────────────────────────────────────────────────────
// Nav, ElevateLogo imported from ./components/Nav

// ─── HERO ────────────────────────────────────────────────────────────────────

// CSS noise data URI — no image export needed
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// Tape strip — washi tape approximation using CSS
function Tape() {
  return (
    <div style={{
      position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
      width: 72, zIndex: 2, pointerEvents: "none",
      backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" as string,
    }}>
      <img src="/tape.png" alt="" style={{ display: "block", width: "100%", height: "auto" }} />
    </div>
  );
}

// Thumbtack pin
function Pin() {
  return (
    <div style={{
      position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 14, height: 14,
      borderRadius: "50%",
      background: "radial-gradient(circle at 35% 30%, #ff8c5a, #c93800)",
      boxShadow: "0 2px 5px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.3)",
      zIndex: 2,
    }} />
  );
}

// Mono badge label
function MonoBadge({ children }: { children: string }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", alignSelf: "flex-start",
      background: "rgba(255,255,255,0.72)", borderRadius: 4,
      padding: "2px 8px",
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11, fontWeight: 500, letterSpacing: "0.24em",
      color: "rgba(15,23,42,0.9)", whiteSpace: "nowrap",
    }}>{children}</div>
  );
}

function Hero() {
  return (
    <section style={{
      height: "100vh", position: "relative", overflow: "visible",
      display: "flex", flexDirection: "column",
      background: "var(--hero-bg)",
      paddingTop: 88,
    }}>

      {/* ── NOISE OVERLAY ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        backgroundImage: NOISE_SVG, backgroundSize: "300px 300px",
        mixBlendMode: "overlay", opacity: 0.45,
      }} />

      {/* ── HEADLINE + CTA ── */}
      <div className="hero-headline" style={{
        flex: 1, position: "relative", zIndex: 3,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "0 clamp(20px, 5vw, 80px)",
        gap: 40,
      }}>
        <h1 className="hero-h1" style={{
          fontFamily: "var(--font-display)",
          lineHeight: 0.9,
          letterSpacing: "-0.05em", color: "rgba(15,23,42,0.9)",
          textAlign: "center", fontWeight: 400,
        }}>
          <span style={{ display: "block" }}><ET id="hero-1">AI and Digital Product</ET></span>
          <span style={{ display: "block" }}>
            <ET id="hero-2">Design Studio</ET>
            <span style={{ color: "rgba(241,134,63,0.9)" }}>.</span>
          </span>
        </h1>
        <a href="https://cal.com/elevatestd/30min" target="_blank" rel="noopener noreferrer" className="hero-cta" style={{
          display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px",
          backgroundImage: "linear-gradient(180deg, #000000 0%, #424242 100%)",
          boxShadow: "rgba(255,255,255,0.35) 0px 2px 6px inset, rgba(0,0,0,0.22) 0px 4px 6px",
          color: "#ffffff", borderRadius: 100, fontWeight: 500, fontSize: 16,
          whiteSpace: "nowrap", letterSpacing: "-0.01em",
        }}>
          <ET id="hero-cta">Book a call →</ET>
        </a>
      </div>

      {/* ── FLOATING CARDS ── */}
      <div className="hero-cards" style={{
        position: "relative", zIndex: 3,
        height: "42vh", width: "100%", flexShrink: 0,
      }}>
        {/* Hero background image */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: "url('/hero-bg.png')",
          backgroundSize: "cover", backgroundPosition: "center top",
          opacity: 1, mixBlendMode: "multiply",
          pointerEvents: "none",
        }} />

        {/* Card 1 — Case Study (pink) */}
        <div style={{ position: "absolute", left: "calc(50% - 370px)", top: 80, zIndex: 1, width: 220 }}>
          <div className="hero-card" style={{ "--card-rotate": "2.41deg" } as React.CSSProperties}>
            <Tape />
            <div style={{ background: "#dbb9b9", borderRadius: 0, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ background: "rgba(180,150,150,0.45)", borderRadius: 0, minHeight: 110 }} />
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 500, color: "rgba(15,23,42,0.9)", letterSpacing: "0.04em", lineHeight: 1.5 }}>
                New Case Study Published!
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 — Booking (yellow) */}
        <div style={{ position: "absolute", left: "calc(50% - 155px)", top: 60, zIndex: 2, width: 240 }}>
          <div className="hero-card" style={{ "--card-rotate": "-0.18deg" } as React.CSSProperties}>
            <Tape />
            <div style={{ background: "#fbe58c", borderRadius: 0, padding: "18px 20px 22px", display: "flex", flexDirection: "column", gap: 14, height: 150, overflow: "hidden" }}>
              <MonoBadge>NOW BOOKING</MonoBadge>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 38, color: "rgba(15,23,42,0.9)", lineHeight: 0.95, letterSpacing: "-0.04em", fontWeight: 400 }}>
                Q2 — one open slot.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 — Testimonial (blue/purple) */}
        <div style={{ position: "absolute", left: "calc(50% + 80px)", top: 88, zIndex: 3, width: 260 }}>
          <div className="hero-card" style={{ "--card-rotate": "-2.82deg" } as React.CSSProperties}>
            <Pin />
            <div style={{ background: "#a1b9f3", borderRadius: 0, padding: "18px 20px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
              <MonoBadge>LATEST FROM CLIENT</MonoBadge>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px,2vw,28px)", color: "rgba(15,23,42,0.9)", lineHeight: 1, letterSpacing: "-0.05em", fontWeight: 400 }}>
                "It's really easy to work with Elevate"
              </p>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 500, color: "rgba(15,23,42,0.9)", letterSpacing: "0.04em" }}>
                Argiun Odgerel — STC Creative
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── STATEMENT ───────────────────────────────────────────────────────────────

function Statement() {
  return (
    <section style={{ padding: "clamp(60px, 8.6vw, 120px) clamp(20px, 5vw, 80px)", maxWidth: 1400, margin: "0 auto" }}>
      <p style={{
        fontSize: "clamp(22px, 2.57vw, 36px)",
        fontWeight: 500, lineHeight: 1.2,
        letterSpacing: "-0.02em", color: "rgba(15,23,42,0.9)",
      }}>
        <ET id="statement-1">Elevate Studio is a human-led digital design studio blending intuition, strategy, and technology to build brands and products that matter.</ET>{" "}
        <span style={{ color: "inherit" }}>
          <ET id="statement-2">We help ambitious companies create brand systems, digital products, and experiences built for growth.</ET>
        </span>
      </p>
    </section>
  );
}

// ─── TRUSTED BY ──────────────────────────────────────────────────────────────

const logos = [
  { src: "/logos/02.png", alt: "1950" },
  { src: "/logos/03.png", alt: "Agula" },
  { src: "/logos/04.png", alt: "APU Company" },
  { src: "/logos/05.png", alt: "Best Computers" },
  { src: "/logos/06.png", alt: "Blindcare" },
  { src: "/logos/07.png", alt: "Hello Baby" },
  { src: "/logos/08.png", alt: "iTriip" },
  { src: "/logos/09.png", alt: "Khaan Bank" },
  { src: "/logos/10.png", alt: "Let's Read" },
  { src: "/logos/11.png", alt: "Lime" },
  { src: "/logos/12.png", alt: "MeLearn" },
  { src: "/logos/13.png", alt: "Mobicom" },
  { src: "/logos/14.png", alt: "Peak" },
  { src: "/logos/15.png", alt: "Posted" },
  { src: "/logos/16.png", alt: "ProhostAI" },
  { src: "/logos/17.png", alt: "Shunkhlai" },
  { src: "/logos/18.png", alt: "TDB Securities" },
  { src: "/logos/19.png", alt: "UPoint" },
];

function TrustedBy() {
  return (
    <section>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "clamp(60px,10vw,120px) clamp(20px, 5vw, 80px)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 24 }}>
          <div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 5.5vw, 64px)", fontWeight: 400, letterSpacing: "-0.05em", lineHeight: 0.9, color: "var(--text)" }}>
              <ET id="trusted-title">Our collective experience</ET>
            </p>
            <p style={{ marginTop: 8, fontSize: 14, color: "rgba(38,45,61,0.8)", lineHeight: 1.75 }}>
              <ET id="trusted-sub">Over 40 projects implemented across various fields, with 6 years of experience.</ET>
            </p>
          </div>
          <a href="#contact" className="cta-btn" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            height: 48, padding: "0 24px", borderRadius: 100,
            background: "linear-gradient(180deg, #000000 0%, #424242 100%)",
            color: "#ffffff", fontSize: 16, fontWeight: 500, letterSpacing: "-0.01em",
            textDecoration: "none",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.22), inset 0px 2px 6px rgba(255,255,255,0.35), inset 0px -2px 6px #000000",
          }}>
            Book a call
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
        <div className="logos-grid" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", columnGap: 16, rowGap: 20 }}>
          {logos.map((logo) => (
            <div key={logo.alt} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={logo.src} alt={logo.alt} style={{ width: "100%", height: "auto", opacity: 0.85, display: "block" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────

function Projects() {
  return (
    <section id="projects">
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "clamp(60px,10vw,140px) clamp(20px, 5vw, 80px)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "clamp(16px, 1.7vw, 24px)" }}>
          <SectionLabel id="sl-projects">FEATURED PROJECTS</SectionLabel>
          <span style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.1em", fontWeight: 500 }}>
            CURATED FROM 40+ PROJECTS
          </span>
        </div>
        {projects.map((p, i) => (
          <a key={p.name} href={p.upcoming ? `/projects/${p.slug}` : `/projects/${p.slug}`} className="project-row"
            style={{ display: "grid", gridTemplateColumns: "clamp(260px, 38.8%, 450px) 1fr", gap: "clamp(24px, 3.4vw, 48px)", padding: "clamp(32px, 3.4vw, 48px) 0", borderTop: "1px solid var(--border)", alignItems: "center", textDecoration: "none" }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
                <span style={{ fontSize: 11, color: "var(--muted)", fontWeight: 500, letterSpacing: "0.12em" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ width: 1, height: 12, backgroundColor: "var(--border)", flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 500 }}>
                  <ET id={`project-cat-${i}`}>{p.category}</ET>
                </span>
                {p.tag === "YC" && (
                  <span style={{
                    fontSize: 9, fontWeight: 700, letterSpacing: "0.08em",
                    color: "rgba(194,80,26,0.8)",
                    border: "1px solid rgba(194,80,26,0.28)",
                    borderRadius: 4, padding: "2px 6px", lineHeight: 1,
                    textTransform: "uppercase", flexShrink: 0,
                  }}>YC W24</span>
                )}
              </div>
              <h3 style={{ fontFamily: "'Inter Display', Inter, sans-serif", fontSize: "clamp(24px,3.4vw,48px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1, color: "var(--text)", marginBottom: 8 }}>
                <ET id={`project-name-${i}`}>{p.name}</ET>
              </h3>
              <p style={{ color: "#50545f", fontSize: 14, lineHeight: 1.75 }}>
                <ET id={`project-desc-${i}`}>{p.description}</ET>
              </p>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 6, marginTop: 28,
                fontSize: 13, fontWeight: 500, color: "var(--text)",
                height: 48, padding: "0 24px", borderRadius: 100,
                background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.46) 100%)",
                backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
                boxShadow: "0px 8px 16px rgba(0,0,0,0.08), inset 0px 2px 6px rgba(255,255,255,0.35), inset 0px -2px 6px rgba(255,255,255,0.4)",
              }}>
                <ET id={`project-cta-${i}`}>{p.cta}</ET>
              </span>
            </div>
            <div className="project-row-img" style={{
              aspectRatio: "710/430",
              borderRadius: 24, overflow: "hidden",
              position: "relative",
            }}>
              <EI id={`project-img-${p.name.toLowerCase()}`} src={p.img} alt={p.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block",
                  ...(p.upcoming ? { filter: "grayscale(100%)", opacity: 0.4 } : {}) }} />
              {p.upcoming && (
                <div style={{
                  position: "absolute", inset: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{
                    fontSize: 10, fontWeight: 600, letterSpacing: "0.16em",
                    textTransform: "uppercase", color: "var(--muted)",
                  }}>Coming soon</span>
                </div>
              )}
            </div>
          </a>
        ))}
        <div style={{ borderTop: "1px solid var(--border)" }} />
      </div>
    </section>
  );
}

// ─── SERVICES ────────────────────────────────────────────────────────────────

function Services() {
  return (
    <section id="services">
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "clamp(60px,10vw,120px) clamp(20px, 5vw, 80px)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 24 }}>
          <div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 5.5vw, 64px)", fontWeight: 400, letterSpacing: "-0.05em", lineHeight: 0.9, color: "var(--text)" }}>
              <ET id="services-title">Our services</ET>
            </p>
            <p style={{ marginTop: 8, fontSize: 14, color: "#50545f", lineHeight: 1.75 }}>
              <ET id="services-sub">Strategy development to market launch.</ET>
            </p>
          </div>
          <a href="#contact" className="cta-btn" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            height: 48, padding: "0 24px", borderRadius: 100,
            background: "linear-gradient(180deg, #000000 0%, #424242 100%)",
            color: "#ffffff", fontSize: 16, fontWeight: 500, letterSpacing: "-0.01em",
            textDecoration: "none",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.22), inset 0px 2px 6px rgba(255,255,255,0.35), inset 0px -2px 6px #000000",
          }}>
            <ET id="services-cta">Book a call</ET>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
        <div className="service-cards" style={{ display: "flex", gap: 16 }}>
          {services.map((s, i) => (
            <div key={s.title} style={{
              flex: "1 0 0", minWidth: 0, borderRadius: 24, overflow: "hidden",
              backgroundColor: s.color, boxShadow: "var(--shadow-card)",
              position: "relative", minHeight: 320,
              display: "flex", flexDirection: "column",
            }}>
              {/* bg texture */}
              <div aria-hidden="true" style={{
                position: "absolute", zIndex: 0,
                top: "8.9%", left: "-7.4%", right: "-33.4%", bottom: "-30.6%",
                backgroundImage: `url(${s.bg})`,
                backgroundSize: "cover", backgroundPosition: "center",
                pointerEvents: "none", mixBlendMode: "multiply",
              }} />
              {/* card 1 sticky-notes illustration */}
              {i === 0 && (
                <img src="/service-illustration.svg" alt="" aria-hidden="true" className="service-illus service-illus-abs"
                  style={{ position: "absolute", bottom: 0, left: 0, right: 0,
                    width: "100%", height: "auto", display: "block", pointerEvents: "none" }} />
              )}
              {/* text */}
              <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 8, position: "relative", zIndex: 1 }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 26, lineHeight: 1, letterSpacing: "-0.01em", color: "rgba(15,23,42,0.9)" }}>
                  <ET id={`service-title-${i}`}>{s.title}</ET>
                </p>
                <div style={{ fontSize: 14, fontWeight: 500, color: "#50545f", letterSpacing: "-0.02em", lineHeight: 1.4 }}>
                  {s.items.map((item, j) => (
                    <p key={item}><ET id={`service-item-${i}-${j}`}>{item}</ET></p>
                  ))}
                </div>
              </div>
              {/* bottom illustration for cards 2–4 */}
              {"illus" in s && (
                <div className="service-illus" style={{
                  marginTop: "auto", position: "relative", zIndex: 1,
                  backdropFilter: i >= 2 ? "blur(7px)" : undefined,
                  overflow: "hidden",
                }}>
                  <img src={(s as typeof s & { illus: string }).illus} alt="" aria-hidden="true"
                    style={{ display: "block", width: "100%", height: "auto", pointerEvents: "none" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PRINCIPLES ──────────────────────────────────────────────────────────────

function Principles() {
  return (
    <section id="principles">
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "clamp(60px,10vw,120px) clamp(20px, 5vw, 80px)" }}>
        <div style={{
          maxWidth: 800, margin: "0 auto",
          background: "#ffffff", borderRadius: 32,
          boxShadow: "var(--shadow-card)",
          padding: "clamp(32px, 5vw, 72px)",
          display: "flex", flexDirection: "column", gap: 48, alignItems: "center",
          color: "rgba(15,23,42,0.9)",
        }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5.5vw, 64px)", lineHeight: 0.9, letterSpacing: "-0.05em", textAlign: "center" }}>
            <ET id="principles-title">Our Design Principles</ET>
          </p>
          {principles.map((p, i) => (
            <div key={p.number} style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px, 2.8vw, 32px)", letterSpacing: "-0.02em", lineHeight: 1.5 }}>
                <ET id={`principle-mn-${i}`}>{p.mn}</ET>
              </p>
              <p style={{ fontSize: 16, fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1.5 }}>
                <ET id={`principle-en-${i}`}>{p.en}</ET>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TEAM ────────────────────────────────────────────────────────────────────

function Team() {
  return (
    <section>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "clamp(60px,10vw,120px) clamp(20px, 5vw, 80px)" }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 5.5vw, 64px)", lineHeight: 0.9, letterSpacing: "-0.05em", color: "rgba(15,23,42,0.9)", textAlign: "center", marginBottom: 48 }}>
          <ET id="team-title">Our Team</ET>
        </p>
        <div className="team-grid" style={{ display: "flex", gap: 16 }}>
          {team.map((member, i) => (
            <div key={member.name} style={{ flex: "1 0 0", minWidth: 0, display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{
                aspectRatio: "3/4", borderRadius: 24, overflow: "hidden",
                boxShadow: "var(--shadow-card)", flexShrink: 0,
              }}>
                <EI id={`team-img-${i}`} src={member.img} alt={member.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <p style={{ fontWeight: 600, fontSize: 20, color: "#272e3f", lineHeight: 1 }}><ET id={`team-name-${i}`}>{member.name}</ET></p>
                <p style={{ color: "#50545f", fontSize: 16, lineHeight: 1.2 }}><ET id={`team-role-${i}`}>{member.role}</ET></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PRICING ─────────────────────────────────────────────────────────────────

function Pricing() {
  const locale = usePricingLocale();
  const plans = locale === "mn" ? pricingMN : pricingINT;

  return (
    <section id="pricing" style={{ background: "var(--bg)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(60px,10vw,140px) clamp(20px, 5vw, 80px)" }}>

        <p style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(36px,5vw,64px)",
          fontWeight: 400, letterSpacing: "-0.05em", lineHeight: 0.9, color: "var(--text)",
          textAlign: "center", marginBottom: "clamp(32px, 5vw, 56px)",
        }}>
          Our Pricing
        </p>

        <div className="pricing-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16,
        }}>
          {plans.map((plan) => (
            <div key={plan.name} style={{
              background: "#fbfbfb", borderRadius: 24, boxShadow: "var(--shadow-card)",
              display: "flex", flexDirection: "column", overflow: "hidden",
            }}>
              {/* Title + subtitle */}
              <div style={{ padding: 24 }}>
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 26, letterSpacing: "-0.26px", color: "rgba(15,23,42,0.9)", lineHeight: 1 }}>{plan.name}</p>
                <p style={{ fontWeight: 500, fontSize: 14, color: "var(--muted)", marginTop: 8, lineHeight: 1.4, letterSpacing: "-0.28px", height: "calc(14px * 1.4 * 2)", overflow: "hidden" }}>{plan.subtitle}</p>
              </div>

              {/* Price + CTA */}
              <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 16, marginBottom: 2 }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 42, fontWeight: 400, letterSpacing: "-0.42px", color: "rgba(15,23,42,0.9)", lineHeight: 1 }}>
                      {plan.price}
                    </span>
                    <span style={{
                      fontSize: 14, fontWeight: 500, color: "var(--muted)",
                      border: "1px solid rgba(0,0,0,0.12)", borderRadius: 8,
                      padding: "4px 8px", whiteSpace: "nowrap", lineHeight: 1.4,
                    }}>{plan.duration}</span>
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 500, color: "var(--muted)", letterSpacing: "-0.28px" }}>Starting from</p>
                </div>
                <a href="https://cal.com/elevatestd/30min" target="_blank" rel="noopener noreferrer" className="cta-btn" style={{
                  display: "inline-flex", alignItems: "center", gap: 4,
                  height: 48, padding: "0 24px", borderRadius: 100, fontSize: 16, fontWeight: 500,
                  color: "#fff", background: "linear-gradient(180deg, #000 0%, #424242 100%)",
                  textDecoration: "none", letterSpacing: "-0.14px",
                  boxShadow: "0px 4px 6px rgba(0,0,0,0.22), inset 0px 2px 6px 0px rgba(255,255,255,0.35), inset 0px -2px 6px 0px black",
                  alignSelf: "flex-start",
                }}>Get Started →</a>
              </div>

              {/* Feature list */}
              <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 8 }}>
                {plan.features.map((f, fi) => (
                  <div key={fi} style={{ display: "flex", gap: 8, alignItems: "flex-start", paddingTop: 4, paddingBottom: 4 }}>
                    <span style={{ color: "var(--muted)", fontSize: 14, flexShrink: 0, lineHeight: 1.6, fontWeight: 500 }}>+</span>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "var(--muted)", lineHeight: 1.6 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section style={{ borderTop: "1px solid var(--border)", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(60px,10vw,140px) clamp(20px, 5vw, 80px)" }}>
        <p style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(36px,5vw,64px)",
          fontWeight: 400, letterSpacing: "-0.05em", lineHeight: 0.9, color: "var(--text)",
          textAlign: "center", marginBottom: "clamp(32px, 5vw, 56px)",
        }}>
          Frequently Asked Questions
        </p>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          {faqs.map((faq, i) => (
            <div key={i} className="faq-row" style={{ borderBottom: "1px solid var(--border)" }}>
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)}
                style={{ width: "100%", textAlign: "left", padding: "24px 0", background: "none", border: "none", color: "var(--text)", fontSize: 16, fontWeight: 500, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, letterSpacing: "-0.015em" }}>
                <span className="faq-q-text"><ET id={`faq-q-${i}`}>{faq.q}</ET></span>
                <span style={{ color: "var(--muted)", fontSize: 20, flexShrink: 0, transition: "transform 0.25s ease", transform: openIdx === i ? "rotate(45deg)" : "rotate(0deg)", lineHeight: 1 }}>+</span>
              </button>
              <div className={`faq-answer ${openIdx === i ? "open" : "closed"}`}>
                <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.85, paddingBottom: 24 }}><ET id={`faq-a-${i}`}>{faq.a}</ET></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT — removed, replaced in Figma ────────────────────────────────────

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ background: "var(--bg)", padding: "0 clamp(16px, 2vw, 32px) clamp(24px, 3vw, 40px)" }}>
      <div style={{
        background: "#111110", borderRadius: 24,
        padding: "clamp(40px, 6vw, 72px) clamp(32px, 5vw, 72px) clamp(32px, 4vw, 48px)",
        maxWidth: 1400, margin: "0 auto",
      }}>

        {/* CTA */}
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

        {/* Contact / Social / Intro */}
        <div className="footer-contact-grid" style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: "clamp(28px, 4vw, 48px)",
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
          gap: 32,
        }}>
          {/* Write to us */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={{ fontSize: 11, color: "rgba(245,244,240,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 500 }}>Write to us</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <a href="mailto:bilguun@elevatestudio.xyz" className="footer-link" style={{ fontSize: 15, fontWeight: 600, color: "#f5f4f0" }}>bilguun@elevatestudio.xyz</a>
              <a href="tel:+97695902191" className="footer-link" style={{ fontSize: 15, fontWeight: 600, color: "#f5f4f0" }}>+976 95902191</a>
            </div>
          </div>

          {/* Social */}
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

          {/* See Introduction */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-end" }}>
            <a href="#" className="footer-link" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: 15, fontWeight: 500, color: "#f5f4f0",
            }}>
              <img src="/figma.svg" alt="" width={20} height={20} style={{ display: "block" }} />
              See Introduction
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: "clamp(28px, 4vw, 48px)", paddingTop: 20 }}>
          <p style={{ fontSize: 11, color: "rgba(245,244,240,0.35)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 500 }}>
            {new Date().getFullYear()} Elevate Studio
          </p>
        </div>

      </div>
    </footer>
  );
}

// ─── HELPER ──────────────────────────────────────────────────────────────────

function SectionLabel({ children, id }: { children: string; id?: string }) {
  return (
    <p
      style={{
        fontSize: 11,
        color: "var(--muted)",
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        fontWeight: 500,
      }}
    >
      {id ? <ET id={id}>{children}</ET> : children}
    </p>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <EditProvider>
      <Nav />
      <main>
        <Hero />
        <Statement />
        <Projects />
        <Services />
        <TrustedBy />
        <Principles />
        <Team />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </EditProvider>
  );
}
