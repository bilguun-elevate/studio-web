import Nav from "./components/Nav";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "clamp(100px,14vh,160px) clamp(20px,5vw,80px) clamp(60px,8vw,80px)",
        maxWidth: 1280,
        margin: "0 auto",
      }}>
        <p style={{
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--muted)",
          marginBottom: 24,
        }}>
          404
        </p>

        <h1 style={{
          fontSize: "clamp(56px,10vw,140px)",
          fontWeight: 700,
          letterSpacing: "-0.045em",
          lineHeight: 0.92,
          color: "var(--text)",
          marginBottom: "clamp(24px,3vw,40px)",
        }}>
          Хуудас<br />олдсонгүй.
        </h1>

        <p style={{
          fontSize: "clamp(15px,1.6vw,18px)",
          color: "var(--muted)",
          lineHeight: 1.7,
          marginBottom: "clamp(32px,4vw,48px)",
          maxWidth: 400,
        }}>
          Таны хайж буй хуудас нүүгдсэн эсвэл байхгүй байна.
        </p>

        <a
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "14px 28px",
            backgroundColor: "var(--text)",
            color: "#fff",
            borderRadius: 100,
            fontSize: 14,
            fontWeight: 500,
            textDecoration: "none",
            letterSpacing: "-0.01em",
          }}
        >
          Нүүр хуудас руу буцах →
        </a>
      </main>
    </>
  );
}
