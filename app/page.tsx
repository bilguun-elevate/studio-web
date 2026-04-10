"use client";

import { useState, useEffect, useRef, createContext, useContext } from "react";

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
      whiteSpace: "nowrap",
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

const projects = [
  {
    name: "ProhostAI",
    category: "AI · SaaS",
    description: "Y Combinator-backed AI platform for vacation rental hosts.",
    cta: "Case study →",
    href: "#",
  },
  {
    name: "Atlas",
    category: "MOBIlE App",
    description: "AI coach for intentional living.",
    cta: "Дэлгэрэнгүй →",
    href: "#",
  },
  {
    name: "Iron Health",
    category: "WEB DESIGN, BRANDING",
    description: "Health & wellness platform.",
    cta: "Дэлгэрэнгүй →",
    href: "#",
  },
  {
    name: "Lanndy",
    category: "Brand · Web",
    description: "Counter-Strike 2 server rental platform.",
    cta: "Дэлгэрэнгүй →",
    href: "#",
  },
];

const services = [
  {
    title: "Strategy & Research",
    items: ["Product strategy", "User research", "UX audit"],
    dotColor: "var(--grad-1)",
  },
  {
    title: "Product Design",
    items: ["UX/UI design", "Prototypes", "Design systems"],
    dotColor: "var(--grad-4)",
  },
  {
    title: "Brand & Web",
    items: ["Web design", "Framer development", "Visual identity"],
    dotColor: "var(--grad-2)",
  },
  {
    title: "Collaboration",
    items: ["Workshops", "Embedded designer", "Long-term partnership"],
    dotColor: "var(--grad-3)",
  },
];

const principles = [
  {
    number: "01",
    mn: "Бид шийдлийг бус, асуудлыг түрүүлж хардаг",
    en: "Асуудлаа бүрэн ойлгож \"Юу хийх\"-ээс урьтаж бизнест тань \"Юу чухал\"-ыг тодорхойлж шийдэл болгон хувиргадаг.",
  },
  {
    number: "02",
    mn: "Шийдвэрийг 'Би'-гээр биш, 'Дата'-гаар",
    en: "Хувийн бодол, албан тушаалд бус судалгаа, логик, бодит хэрэглээнд тулгуурлан шийддэг.",
  },
  {
    number: "03",
    mn: "Бид зураг биш, систем бүтээдэг",
    en: "Дуусгахыг биш, өсөхийг чухалчилна. Бүтээгдэхүүн цаг хугацаатай хамт хувьсан өөрчлөгдөхөд нурахгүй байх бат бөх суурийг тавьдаг.",
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

function GridDots({ color = "currentColor" }: { color?: string }) {
  const pos = [3, 9, 15];
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      {pos.flatMap(y => pos.map(x => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={1.8} fill={color} />
      )))}
    </svg>
  );
}

const ElevateLogo = ({ color = "#111110" }: { color?: string }) => (
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

function Nav() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

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
    { label: "Бүтээлүүд", href: "#projects" },
    { label: "Үйлчилгээ", href: "#services" },
    { label: "Арга барил", href: "#principles" },
    { label: "Үнэ", href: "#pricing" },
    { label: "Уулзалт товлох", href: "https://cal.com/elevatestd/30min" },
  ];

  return (
    <>
      {/* Transparent fixed bar */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0,
        zIndex: 300, height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 80px",
        background: "transparent",
      }}>
        <a href="/" aria-label="Elevate Studio" style={{ lineHeight: 0 }}>
          <ElevateLogo color="#111110" />
        </a>
        <div ref={wrapRef} style={{ position: "relative" }}>
          <button
            className="menu-btn"
            onClick={() => setOpen(v => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            style={{ position: "relative", zIndex: 2 }}
          >
            <GridDots color={open ? "#f5f4f0" : "#111110"} />
          </button>

          {/* Compact dropdown panel — anchored to button's top-right corner */}
          <div className={`menu-overlay${open ? " open" : ""}`}>
            {/* Nav links */}
            <div className="menu-links" style={{
              flex: 1, display: "flex", flexDirection: "column", justifyContent: "center",
              padding: "32px 28px 24px", gap: 6,
            }}>
              {links.map(l => (
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

            {/* Resources strip */}
            <div style={{
              padding: "20px 28px 28px",
              borderTop: "1px solid rgba(245,244,240,0.1)",
            }}>
              <p style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,244,240,0.3)", marginBottom: 12, fontWeight: 500 }}>
                Холбоос
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { label: "LinkedIn", href: "https://linkedin.com" },
                  { label: "Instagram", href: "https://instagram.com" },
                ].map(r => (
                  <a key={r.label} href={r.href} className="menu-resource-link" target="_blank" rel="noopener noreferrer">
                    {r.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        background: "linear-gradient(175deg, #8ab8cf 0%, #a4c8da 10%, #bdd8e7 24%, #d3e8f2 40%, #e6f3f9 58%, #f2f8fc 74%, #f9fcfe 88%, #ffffff 100%)",
      }}
    >
      {/* Depth: warm radial from top-left */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 100% 75% at 0% 0%, rgba(30,60,90,0.2) 0%, transparent 60%)",
      }} />
      {/* Soft light from right side */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 60% 80% at 100% 50%, rgba(255,255,255,0.18) 0%, transparent 70%)",
      }} />

      {/* ── TOP META ROW ── */}
      <div className="hero-meta" style={{
        position: "relative", zIndex: 1,
        padding: "clamp(80px,9vh,108px) 80px 0",
        maxWidth: 1280, margin: "0 auto", width: "100%",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{
          fontSize: 10.5, color: "rgba(17,17,16,0.38)",
          letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 500,
        }}>
          <ET id="hero-meta-left">МОНГОЛ, УЛААНБААТАР</ET>
        </span>
        <span style={{
          fontSize: 10.5, color: "rgba(17,17,16,0.38)",
          letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 500,
        }}>
          <ET id="hero-meta-right">Product Design Studio</ET>
        </span>
      </div>

      {/* ── HEADLINE ── */}
      <div className="hero-headline" style={{
        position: "relative", zIndex: 1,
        padding: "0 80px",
        maxWidth: 1280, margin: "0 auto", width: "100%",
        display: "flex", alignItems: "center",
      }}>
        <h1 style={{
          fontSize: "clamp(56px,8vw,112px)",
          lineHeight: 0.94,
          letterSpacing: "-0.045em",
          color: "var(--text)",
        }}>
          <span style={{ display: "block", fontWeight: 300 }}>
            <ET id="hero-1">AI болон дижитал бүтээгдэхүүн</ET>
          </span>
          <span style={{ display: "block", fontWeight: 700 }}>
            <ET id="hero-2">бүтээгч дизайны</ET>
          </span>
          <span style={{ display: "block", fontWeight: 700 }}>
            <ET id="hero-3">студио</ET>
            <span style={{
              display: "inline-block",
              width: "0.12em", height: "0.12em",
              minWidth: 10, minHeight: 10,
              borderRadius: "50%",
              backgroundColor: "var(--accent)",
              marginLeft: "0.18em",
              verticalAlign: "super",
              position: "relative",
              top: "0.05em",
            }} />
          </span>
        </h1>
      </div>

      {/* ── DIVIDER ── */}
      <div className="hero-divider" style={{
        position: "relative", zIndex: 1,
        maxWidth: 1280, margin: "0 auto", width: "100%",
        padding: "0 80px",
      }}>
        <div style={{ height: 1, backgroundColor: "rgba(17,17,16,0.1)", width: "100%" }} />
      </div>

      {/* ── BOTTOM ROW ── */}
      <div className="hero-bottom" style={{
        position: "relative", zIndex: 1,
        padding: "clamp(20px,3vh,32px) 80px clamp(48px,7vh,80px)",
        maxWidth: 1280, margin: "0 auto", width: "100%",
        display: "flex", alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 40, flexWrap: "wrap",
      }}>
        {/* CTA */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          <a
            href="https://cal.com/elevatestd/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "14px 28px",
              backgroundColor: "var(--text)",
              color: "#ffffff",
              borderRadius: 100,
              fontWeight: 500,
              fontSize: 14,
              whiteSpace: "nowrap",
              letterSpacing: "-0.01em",
            }}
          >
            <ET id="hero-cta">Уулзалт товлох →</ET>
          </a>

        </div>
      </div>
    </section>
  );
}

// ─── STATEMENT ───────────────────────────────────────────────────────────────

function Statement() {
  return (
    <section style={{ padding: "clamp(80px,10vw,140px) 80px", maxWidth: 1280, margin: "0 auto" }}>
      <p style={{
        fontSize: "clamp(24px,3vw,40px)",
        fontWeight: 400, lineHeight: 1.35,
        letterSpacing: "-0.025em", color: "var(--text)", maxWidth: 900,
      }}>
        <ET id="statement-1">Бид хэвшмэл ойлголтоос цааш харж, бүтээж буй зүйлдээ утга болон мөн чанарыг тэргүүлж,</ET>{" "}
        <span style={{ color: "var(--muted)" }}>
          <ET id="statement-2">агуулгад анхаарлаа хандуулдаг багуудтай хамтардаг.</ET>
        </span>
      </p>
    </section>
  );
}

// ─── TRUSTED BY ──────────────────────────────────────────────────────────────

const logoSlots = Array.from({ length: 18 }, (_, i) => i);

function TrustedBy() {
  return (
    <section style={{ borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(80px,10vw,140px) 80px" }}>
        <div style={{ marginBottom: 56 }}>
          <h2 style={{
            fontSize: "clamp(32px,4vw,56px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            color: "var(--text)",
            maxWidth: 560,
            marginBottom: 16,
          }}>
            <ET id="trusted-title">Манай багийн гишүүдийн ажилласан байгууллагууд</ET>
          </h2>
          <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.75 }}>
            <ET id="trusted-sub">Олон салбарт хэрэгжсэн 40+ төсөл, 6 жилийн туршлага.</ET>
          </p>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          overflow: "hidden",
        }}>
          {logoSlots.map((i) => (
            <div
              key={i}
              style={{
                aspectRatio: "3/2",
                borderRight: (i + 1) % 6 === 0 ? "none" : "1px solid var(--border)",
                borderBottom: i < 12 ? "1px solid var(--border)" : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ffffff",
                padding: 24,
              }}
            >
              {/* Logo placeholder — replace with <img> when ready */}
              <div style={{
                width: "60%",
                height: 2,
                backgroundColor: "var(--border)",
                borderRadius: 2,
              }} />
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
    <section id="projects" style={{ borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(80px,10vw,140px) 80px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 64 }}>
          <SectionLabel id="sl-projects">ОНЦЛОХ ТӨСЛҮҮД</SectionLabel>
          <span style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.1em", fontWeight: 500 }}>
            0{projects.length} Projects
          </span>
        </div>
        {projects.map((p, i) => (
          <a key={p.name} href={p.href} className="project-row"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, padding: "48px 0", borderTop: "1px solid var(--border)", alignItems: "center", textDecoration: "none" }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}>
                <span style={{ fontSize: 11, color: "var(--muted)", fontWeight: 500, letterSpacing: "0.12em" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ width: 1, height: 12, backgroundColor: "var(--border)" }} />
                <span style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 500 }}>
                  <ET id={`project-cat-${i}`}>{p.category}</ET>
                </span>
              </div>
              <h3 style={{ fontSize: "clamp(32px,4vw,56px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.0, color: "var(--text)", marginBottom: 20 }}>
                <ET id={`project-name-${i}`}>{p.name}</ET>
              </h3>
              <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.75, maxWidth: 360 }}>
                <ET id={`project-desc-${i}`}>{p.description}</ET>
              </p>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 28, fontSize: 13, fontWeight: 500, color: "var(--text)" }}>
                <ET id={`project-cta-${i}`}>{p.cta}</ET>
              </span>
            </div>
            <div style={{
              aspectRatio: "4/3", backgroundColor: "var(--surface)",
              borderRadius: 16, overflow: "hidden", border: "1px solid var(--border)",
            }}>
              <EI id={`project-img-${p.name.toLowerCase()}`} src={`https://picsum.photos/seed/${p.name.toLowerCase()}/800/600`} alt={p.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
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
    <section id="services" style={{ borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(80px,10vw,140px) 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 80, alignItems: "start" }}>
          <div style={{ position: "sticky", top: 80 }}>
            <SectionLabel id="sl-services">Үйлчилгээ</SectionLabel>
            <p style={{ marginTop: 20, fontSize: "clamp(24px,3vw,40px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--text)" }}>
              <ET id="services-title">Бид юу хийдэг вэ</ET>
            </p>
            <p style={{ marginTop: 16, fontSize: 14, color: "var(--muted)", lineHeight: 1.75, maxWidth: 220 }}>
              <ET id="services-sub">Стратегиас эхлэн зах зээлд танилцуулагдах хүртэлх бүрэн үйлчилгээ.</ET>
            </p>
          </div>
          <div>
            {services.map((s, i) => (
              <div key={s.title} style={{
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32,
                padding: "36px 0",
                borderBottom: "1px solid var(--border)",
                alignItems: "start",
              }}>
                <h3 style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.025em", color: "var(--text)", lineHeight: 1.2 }}>
                  <ET id={`service-title-${i}`}>{s.title}</ET>
                </h3>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                  {s.items.map((item, j) => (
                    <li key={item} style={{ fontSize: 14, color: "var(--muted)", letterSpacing: "-0.005em" }}>
                      — <ET id={`service-item-${i}-${j}`}>{item}</ET>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PRINCIPLES ──────────────────────────────────────────────────────────────

function Principles() {
  return (
    <section id="principles" style={{ borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(80px,10vw,140px) 80px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 64 }}>
          <SectionLabel id="sl-principles">БИДний зарчим</SectionLabel>
        </div>
        {principles.map((p, i) => (
          <div key={p.number} style={{
            display: "grid", gridTemplateColumns: "80px 1fr",
            gap: 40, padding: "40px 0", borderTop: "1px solid var(--border)", alignItems: "start",
          }}>
            <span style={{ fontSize: 11, color: "var(--muted)", fontWeight: 500, letterSpacing: "0.12em", paddingTop: 8 }}>
              {p.number}
            </span>
            <div>
              <p style={{ fontSize: "clamp(24px,3vw,40px)", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--text)", lineHeight: 1.15 }}>
                <ET id={`principle-mn-${i}`}>{p.mn}</ET>
              </p>
              <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 10, letterSpacing: "0.01em" }}><ET id={`principle-en-${i}`}>{p.en}</ET></p>
            </div>
          </div>
        ))}
        <div style={{ borderTop: "1px solid var(--border)" }} />
      </div>
    </section>
  );
}

// ─── TEAM ────────────────────────────────────────────────────────────────────

function Team() {
  return (
    <section style={{ borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(80px,10vw,140px) 80px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 64 }}>
          <SectionLabel id="sl-team">Манай БАГ</SectionLabel>
          <span style={{ fontSize: 13, color: "var(--muted)" }}><ET id="team-location"></ET></span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {team.map((member, i) => (
            <div key={member.name}>
              <div style={{
                aspectRatio: "3/4", backgroundColor: "var(--surface)",
                borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)", marginBottom: 16,
              }}>
                <EI id={`team-img-${i}`} src={`https://picsum.photos/seed/team${i}/600/800`} alt={member.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <p style={{ fontWeight: 600, fontSize: 16, color: "var(--text)", letterSpacing: "-0.02em" }}><ET id={`team-name-${i}`}>{member.name}</ET></p>
              <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}><ET id={`team-role-${i}`}>{member.role}</ET></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PRICING ─────────────────────────────────────────────────────────────────

function Pricing() {
  return (
    <section id="pricing" style={{ borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(80px,10vw,140px) 80px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, gap: 40 }}>
          <div>
            <SectionLabel id="sl-pricing">үнийн санал</SectionLabel>
            <div style={{ marginTop: 12, fontSize: "clamp(24px,3vw,40px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--text)" }}>
              <ET id="pricing-title">Тодорхой үр дүнд чиглэсэн үнэ</ET>
            </div>
          </div>
          <p style={{ fontSize: 14, color: "var(--muted)", maxWidth: 280, textAlign: "right", lineHeight: 1.75 }}>
            <ET id="pricing-sub">Нэмэлт зардал байхгүй. Эхний уулзалт үнэгүй.</ET>
          </p>
        </div>

        {/* Table header */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 140px", gap: 24, padding: "12px 0 16px", borderBottom: "1px solid var(--border)" }}>
          {["Багц", "Хугацаа", "Үнэ", ""].map((h, i) => (
            <span key={i} style={{ fontSize: 11, color: "var(--muted)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.12em" }}>
              {h ? <ET id={`pricing-col-${i}`}>{h}</ET> : ""}
            </span>
          ))}
        </div>

        {pricing.map((plan, i) => (
          <div key={plan.name} className="pricing-row" style={{
            display: "grid", gridTemplateColumns: "2fr 1fr 1fr 140px",
            gap: 24, padding: "28px 0", borderBottom: "1px solid var(--border)", alignItems: "center",
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {plan.highlight && (
                  <span style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: "var(--accent)", flexShrink: 0, display: "inline-block" }} />
                )}
                <p style={{ fontWeight: 600, fontSize: 17, letterSpacing: "-0.025em", color: "var(--text)" }}><ET id={`price-name-${i}`}>{plan.name}</ET></p>
              </div>
              <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 5, paddingLeft: plan.highlight ? 17 : 0 }}>
                <ET id={`price-feat-${i}`}>{plan.features.slice(0, 2).join(" · ")}</ET>
              </p>
            </div>
            <span style={{ fontSize: 14, color: "var(--muted)" }}><ET id={`price-dur-${i}`}>{plan.duration}</ET></span>
            <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text)" }}><ET id={`price-price-${i}`}>{plan.price}</ET></span>
            <a href="https://cal.com/elevatestd/30min" target="_blank" rel="noopener noreferrer" className="pricing-btn"
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "10px 20px", border: "1px solid var(--border)", borderRadius: 100, fontSize: 13, fontWeight: 500, color: "var(--text)", backgroundColor: "transparent", whiteSpace: "nowrap" }}>
              <ET id={`price-cta-${i}`}>Эхлэх →</ET>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section style={{ borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(80px,10vw,140px) 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 80 }}>
          <div>
            <SectionLabel id="sl-faq">FAQ</SectionLabel>
            <p style={{ marginTop: 20, fontSize: "clamp(24px,3vw,40px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--text)" }}>
              <ET id="faq-title">Түгээмэл асуулт</ET>
            </p>
          </div>
          <div>
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                <button onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  style={{ width: "100%", textAlign: "left", padding: "24px 0", background: "none", border: "none", color: "var(--text)", fontSize: 16, fontWeight: 500, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, letterSpacing: "-0.015em" }}>
                  <ET id={`faq-q-${i}`}>{faq.q}</ET>
                  <span style={{ color: "var(--muted)", fontSize: 20, flexShrink: 0, transition: "transform 0.25s ease", transform: openIdx === i ? "rotate(45deg)" : "rotate(0deg)", lineHeight: 1 }}>+</span>
                </button>
                <div className={`faq-answer ${openIdx === i ? "open" : "closed"}`}>
                  <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.85, paddingBottom: 24 }}><ET id={`faq-a-${i}`}>{faq.a}</ET></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section id="contact" style={{ borderTop: "1px solid var(--border)", background: "linear-gradient(180deg, #ffffff 0%, #eaf3f9 100%)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(80px,10vw,140px) 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "end" }}>
          <div>
            <SectionLabel id="sl-contact">Get in touch</SectionLabel>
            <h2 style={{
              fontSize: "clamp(56px,8vw,112px)", fontWeight: 700,
              letterSpacing: "-0.045em", lineHeight: 0.95, color: "var(--text)", marginTop: 28,
            }}>
              <ET id="contact-headline">Хамтдаа утга учиртай, үр дүнтэй, дизайныг бүтээцгээе.</ET>
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 28, paddingBottom: 8 }}>
            <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.85, maxWidth: 340 }}>
              <ET id="contact-sub">Cal.com дээр нээлттэй цагийг сонгоно уу. Google Meet-ээр уулзана.</ET>
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="https://cal.com/elevatestd/30min" target="_blank" rel="noopener noreferrer" className="contact-cta"
                style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px", backgroundColor: "var(--text)", color: "#ffffff", borderRadius: 100, fontWeight: 600, fontSize: 14 }}>
                <ET id="contact-cta-1">30 минутын уулзалт →</ET>
              </a>
              <a href="mailto:hello@elevatestudio.xyz" className="contact-cta"
                style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px", backgroundColor: "transparent", color: "var(--text)", borderRadius: 100, fontWeight: 500, fontSize: 14, border: "1px solid var(--border)" }}>
                <ET id="contact-cta-2">Имэйл бичих</ET>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "40px 80px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
        <ElevateLogo color="var(--text)" />
        <div style={{ display: "flex", gap: 28 }}>
          {[
            { label: "Бүтээлүүд", href: "#projects" },
            { label: "Үйлчилгээ", href: "#services" },
            { label: "Үнэ", href: "#pricing" },
            { label: "Instagram", href: "https://instagram.com" },
          ].map((l, i) => (
            <a key={l.label} href={l.href} className="footer-link" style={{ fontSize: 13, color: "var(--muted)" }}>
              <ET id={`footer-link-${i}`}>{l.label}</ET>
            </a>
          ))}
        </div>
        <span style={{ fontSize: 12, color: "var(--muted)", letterSpacing: "0.01em" }}>
          <ET id="footer-copy">{`© ${new Date().getFullYear()} Elevate Studio`}</ET>
        </span>
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
        <TrustedBy />
        <Projects />
        <Services />
        <Principles />
        <Team />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </EditProvider>
  );
}
