"use client";

import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const projects = [
  {
    name: "ProhostAI",
    category: "AI · SaaS",
    description: "YC W24 — Full product design from zero to launch.",
    href: "#",
  },
  {
    name: "Atlas",
    category: "Web App",
    description: "End-to-end UX/UI for a data-driven platform.",
    href: "#",
  },
  {
    name: "Iron Health",
    category: "Mobile App",
    description: "Health & wellness app — user flows to design system.",
    href: "#",
  },
  {
    name: "Lanndy",
    category: "Brand · Web",
    description: "Brand identity and Framer website sprint.",
    href: "#",
  },
];

const services = [
  {
    title: "Strategy & Research",
    items: ["Product strategy", "User research", "UX audit"],
  },
  {
    title: "Product Design",
    items: ["UX/UI design", "Prototypes", "Design systems"],
  },
  {
    title: "Brand & Web",
    items: ["Web design", "Framer development", "Visual identity"],
  },
  {
    title: "Collaboration",
    items: ["Workshops", "Embedded designer", "Long-term partnership"],
  },
];

const principles = [
  {
    number: "01",
    mn: "Бид шийдлийг бус, асуудлыг түрүүлж хардаг",
    en: "Problems before solutions",
  },
  {
    number: "02",
    mn: "Шийдвэрийг 'Би'-гээр биш, 'Дата'-гаар",
    en: "Data over opinion",
  },
  {
    number: "03",
    mn: "Бид зураг биш, систем бүтээдэг",
    en: "Systems, not just screens",
  },
];

const team = [
  { name: "Билгүүн", role: "Lead Designer" },
  { name: "Дөлгөөн", role: "Visual Designer" },
  { name: "Тайвнаа", role: "Experience Designer" },
];

const pricing = [
  {
    name: "UX Audit",
    price: "₮1,500,000",
    duration: "3 хоног",
    features: [
      "Бүрэн аудит",
      "Нарийвчилсан тайлан",
      "Тэргүүлэх эрэмбэт шийдлүүд",
      "1 цагийн презентаци",
      "Хөгжлийн төлөвлөгөө",
    ],
    highlight: false,
  },
  {
    name: "Web Sprint",
    price: "₮2,500,000",
    duration: "5–7 хоног",
    features: [
      "5–7 хуудас",
      "Responsive дизайн",
      "Үндсэн анимэйшн",
      "SEO тохиргоо",
      "2 засварын давтамж",
    ],
    highlight: true,
  },
  {
    name: "Mobile App Sprint",
    price: "₮3,000,000",
    duration: "7 хоног",
    features: [
      "Хэрэглэгчийн урсгал",
      "12 үндсэн дэлгэц",
      "Дизайн систем",
      "Интерактив төлөв",
      "Хөгжүүлэгчид хүлээлгэх",
    ],
    highlight: false,
  },
  {
    name: "Product Partner",
    price: "₮7,000,000",
    duration: "сар бүр",
    features: [
      "Сар бүр 2–3 feature",
      "7 хоног тутмын хянан үзэлт",
      "Хязгааргүй засвар",
      "48 цагийн хариу",
      "Бүх файл хандах эрх",
    ],
    highlight: false,
  },
];

const faqs = [
  {
    q: "Elevate Studio ямар багуудад тохирох вэ?",
    a: "AI бүтээгдэхүүн, SaaS болон брэнд-чиглэлтэй дижитал туршлага бүтээж буй, хүн-төвт дизайны хандлагыг хүсдэг багуудад.",
  },
  {
    q: "Ажлын дундаас хамтрал зогсоох боломжтой юу?",
    a: "Тийм. Хамтын ажиллагааг хүссэн үедээ түр зогсоох эсвэл дуусгах боломжтой — торгуулгүй.",
  },
  {
    q: "AI бүтээгдэхүүний дизайн хийж чадах уу?",
    a: "Тийм. AI болон SaaS бүтээгдэхүүн бол бидний голлох чиглэл. ProhostAI (YC W24) зэрэг төслүүдэд туршлагатай.",
  },
  {
    q: "Хүлээлгэж өгөх материал юу байдаг вэ?",
    a: "Figma файлууд, дизайн систем, прототип, хөгжүүлэгчид зориулсан бэлэн spec — төслийн хэлбэрээс хамааран.",
  },
];

// ─── NAV ─────────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        borderBottom: "1px solid var(--border)",
        backdropFilter: "blur(12px)",
        backgroundColor: "rgba(12,12,12,0.85)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontWeight: 600, fontSize: 18, letterSpacing: "-0.02em" }}>
          Elevate Studio
        </span>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          <a href="#projects" style={{ fontSize: 14, color: "var(--muted)" }}>
            Projects
          </a>
          <a href="#services" style={{ fontSize: 14, color: "var(--muted)" }}>
            Services
          </a>
          <a href="#pricing" style={{ fontSize: 14, color: "var(--muted)" }}>
            Pricing
          </a>
          <a
            href="https://cal.com/elevatestd/30min" target="_blank" rel="noopener noreferrer"
            style={{
              fontSize: 14,
              padding: "8px 20px",
              backgroundColor: "var(--text)",
              color: "#000",
              borderRadius: 100,
              fontWeight: 500,
            }}
          >
            Schedule Call
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 24px 80px",
        maxWidth: 1200,
        margin: "0 auto",
        width: "100%",
      }}
    >
      <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 32, letterSpacing: "0.08em", textTransform: "uppercase" }}>
        Ulaanbaatar, Mongolia · 2019 —
      </p>
      <h1
        style={{
          fontSize: "clamp(48px, 8vw, 110px)",
          fontWeight: 700,
          lineHeight: 1.0,
          letterSpacing: "-0.04em",
          marginBottom: 40,
        }}
      >
        AI болон дижитал
        <br />
        бүтээгч дизайны
        <br />
        студио
      </h1>
      <div
        style={{
          display: "flex",
          gap: 48,
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <p
          style={{
            maxWidth: 480,
            color: "var(--muted)",
            fontSize: 17,
            lineHeight: 1.7,
          }}
        >
          Бид хэвшмэл ойлголтоос цааш харж, бүтээж буй зүйлдээ утга болон
          мөн чанарыг тэргүүлж, агуулгад анхаарлаа хандуулдаг багуудтай
          хамтардаг.
        </p>
        <a
          href="https://cal.com/elevatestd/30min" target="_blank" rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "14px 28px",
            backgroundColor: "var(--accent)",
            color: "#000",
            borderRadius: 100,
            fontWeight: 600,
            fontSize: 15,
            whiteSpace: "nowrap",
          }}
        >
          Schedule a Call →
        </a>
      </div>
    </section>
  );
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────

function Projects() {
  return (
    <section id="projects" style={{ padding: "120px 24px", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
      <SectionLabel>Selected Work</SectionLabel>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 2,
          marginTop: 48,
        }}
      >
        {projects.map((p) => (
          <a
            key={p.name}
            href={p.href}
            style={{
              backgroundColor: "var(--surface)",
              padding: "40px 36px",
              display: "block",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = "#1e1e1e")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--surface)")
            }
          >
            <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {p.category}
            </p>
            <h3 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 12 }}>
              {p.name}
            </h3>
            <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6 }}>{p.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

// ─── SERVICES ────────────────────────────────────────────────────────────────

function Services() {
  return (
    <section
      id="services"
      style={{
        padding: "120px 24px",
        maxWidth: 1200,
        margin: "0 auto",
        width: "100%",
        borderTop: "1px solid var(--border)",
      }}
    >
      <SectionLabel>What We Do</SectionLabel>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 48,
          marginTop: 64,
        }}
      >
        {services.map((s) => (
          <div key={s.title}>
            <h3 style={{ fontWeight: 600, fontSize: 16, marginBottom: 20 }}>{s.title}</h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {s.items.map((item) => (
                <li key={item} style={{ color: "var(--muted)", fontSize: 14 }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── PRINCIPLES ──────────────────────────────────────────────────────────────

function Principles() {
  return (
    <section
      style={{
        padding: "120px 24px",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionLabel>How We Think</SectionLabel>
        <div style={{ marginTop: 64 }}>
          {principles.map((p, i) => (
            <div
              key={p.number}
              style={{
                display: "flex",
                gap: 48,
                alignItems: "baseline",
                padding: "40px 0",
                borderBottom: i < principles.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <span style={{ fontSize: 13, color: "var(--muted)", minWidth: 32 }}>{p.number}</span>
              <div>
                <p style={{ fontSize: "clamp(20px, 3vw, 32px)", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 8 }}>
                  {p.mn}
                </p>
                <p style={{ color: "var(--muted)", fontSize: 14 }}>{p.en}</p>
              </div>
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
    <section style={{ padding: "120px 24px", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
      <SectionLabel>The Team</SectionLabel>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 2,
          marginTop: 48,
        }}
      >
        {team.map((member) => (
          <div
            key={member.name}
            style={{
              backgroundColor: "var(--surface)",
              padding: "48px 36px",
              aspectRatio: "1 / 1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                backgroundColor: "var(--border)",
                marginBottom: 24,
              }}
            />
            <p style={{ fontWeight: 600, fontSize: 18 }}>{member.name}</p>
            <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── PRICING ─────────────────────────────────────────────────────────────────

function Pricing() {
  return (
    <section
      id="pricing"
      style={{
        padding: "120px 24px",
        borderTop: "1px solid var(--border)",
        maxWidth: 1200,
        margin: "0 auto",
        width: "100%",
      }}
    >
      <SectionLabel>Pricing</SectionLabel>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 2,
          marginTop: 48,
        }}
      >
        {pricing.map((plan) => (
          <div
            key={plan.name}
            style={{
              backgroundColor: plan.highlight ? "var(--accent)" : "var(--surface)",
              color: plan.highlight ? "#000" : "var(--text)",
              padding: "40px 36px",
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            <div>
              <p style={{ fontSize: 13, opacity: 0.6, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {plan.duration}
              </p>
              <p style={{ fontWeight: 700, fontSize: 22, letterSpacing: "-0.02em" }}>{plan.name}</p>
            </div>
            <p style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em" }}>{plan.price}</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
              {plan.features.map((f) => (
                <li key={f} style={{ fontSize: 14, opacity: 0.75, display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ opacity: 0.5 }}>—</span> {f}
                </li>
              ))}
            </ul>
            <a
              href="https://cal.com/elevatestd/30min" target="_blank" rel="noopener noreferrer"
              style={{
                display: "block",
                textAlign: "center",
                padding: "12px 0",
                border: `1px solid ${plan.highlight ? "#000" : "var(--border)"}`,
                borderRadius: 100,
                fontSize: 14,
                fontWeight: 500,
                color: plan.highlight ? "#000" : "var(--text)",
              }}
            >
              Get Started
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      style={{
        padding: "120px 24px",
        borderTop: "1px solid var(--border)",
        maxWidth: 1200,
        margin: "0 auto",
        width: "100%",
      }}
    >
      <SectionLabel>FAQ</SectionLabel>
      <div style={{ marginTop: 48, maxWidth: 720 }}>
        {faqs.map((faq, i) => (
          <div
            key={i}
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "24px 0",
                background: "none",
                border: "none",
                color: "var(--text)",
                fontSize: 16,
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
              }}
            >
              {faq.q}
              <span style={{ color: "var(--muted)", fontSize: 20, flexShrink: 0 }}>
                {open === i ? "−" : "+"}
              </span>
            </button>
            {open === i && (
              <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.7, paddingBottom: 24 }}>
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section
      id="contact"
      style={{
        padding: "120px 24px",
        borderTop: "1px solid var(--border)",
        backgroundColor: "var(--surface)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionLabel>Get In Touch</SectionLabel>
        <h2
          style={{
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            marginTop: 32,
            marginBottom: 64,
            lineHeight: 1.1,
          }}
        >
          Хамтран ажиллацгаая.
        </h2>
        <a
          href="https://cal.com/elevatestd/30min"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "18px 36px",
            backgroundColor: "var(--accent)",
            color: "#000",
            borderRadius: 100,
            fontWeight: 600,
            fontSize: 17,
          }}
        >
          30 минутын уулзалт товлох →
        </a>
        <p style={{ marginTop: 20, color: "var(--muted)", fontSize: 14 }}>
          Cal.com дээр нээлттэй цагийг сонгоно уу. Zoom эсвэл Google Meet-ээр уулзана.
        </p>
      </div>
    </section>
  );
}


// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "40px 24px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <span style={{ fontWeight: 600 }}>Elevate Studio</span>
        <div style={{ display: "flex", gap: 32, fontSize: 13, color: "var(--muted)" }}>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href="#projects">Projects</a>
          <a href="#pricing">Pricing</a>
          <a href="https://cal.com/elevatestd/30min" target="_blank" rel="noopener noreferrer">Contact</a>
        </div>
        <span style={{ fontSize: 13, color: "var(--muted)" }}>© {new Date().getFullYear()} Elevate Studio</span>
      </div>
    </footer>
  );
}

// ─── HELPER ──────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 12,
        color: "var(--muted)",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        marginBottom: 8,
      }}
    >
      {children}
    </p>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 64 }}>
        <Hero />
        <Projects />
        <Services />
        <Principles />
        <Team />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
