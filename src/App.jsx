// App.jsx — Showdex marketing landing page (single-file, drop into a Vite React project)
// Fonts + global CSS are injected by <GlobalStyles/> so this file is self-contained.
// Put your screenshots in  public/screens/  (home.png, calendar.png, …).

import { useState, useEffect, useRef } from "react";

// ─── Global CSS + fonts (injected once, keeps everything in this file) ──
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap');

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; padding: 0; background: #0B0908; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }

.gallery-rail::-webkit-scrollbar { display: none; }
.gallery-rail { scrollbar-width: none; }

.cta-btn:hover { transform: translateY(-2px); filter: brightness(1.06); }
.cta-btn:active { transform: translateY(0); }
.nav-link:hover { color: #F4EFEA !important; }

@media (max-width: 920px) {
  .hero-grid { grid-template-columns: 1fr !important; }
  .hero-grid > div:last-child { height: 460px !important; }
  .feature-row { grid-template-columns: 1fr !important; gap: 36px !important; }
  .feature-row > div { order: unset !important; }
  .feature-copy { max-width: none !important; margin: 0 auto; text-align: center; }
  .feature-copy > div:first-child { margin-left: auto; margin-right: auto; }
  .pricing-grid { grid-template-columns: 1fr !important; }
  .perks-grid { grid-template-columns: 1fr 1fr !important; }
  .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
  .nav-links { display: none !important; }
  .stat-strip { grid-template-columns: 1fr 1fr !important; }
  .stat-strip > div:nth-child(3) { border-left: none !important; }
}
@media (max-width: 520px) {
  .perks-grid { grid-template-columns: 1fr !important; }
  .footer-grid { grid-template-columns: 1fr !important; }
}
`;

const GlobalStyles = () => <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />;

// ─── Tokens ───────────────────────────────────────────────────────
const L = {
  bg: "#0B0908",
  surface: "#161310",
  surface2: "#1F1B17",
  hairline: "rgba(255,255,255,0.08)",
  hairlineStrong: "rgba(255,255,255,0.14)",
  coral: "#F26241",
  coralLight: "#FF8F6A",
  coralDeep: "#C2492D",
  coralSoft: "rgba(242,98,65,0.13)",
  coralInk: "#1A0904",
  text: "#F4EFEA",
  muted: "rgba(244,239,234,0.62)",
  faint: "rgba(244,239,234,0.40)",
  serif: '"Bricolage Grotesque","Geist",system-ui,sans-serif',
  sans: '"Geist",-apple-system,system-ui,sans-serif',
  mono: '"Geist Mono",ui-monospace,monospace',
};

// ─── Brackets logo (same geometry as the app icon) ───────────────
const Brackets = ({ size = 34 }) => (
  <svg width={size} height={size} viewBox="0 0 1024 1024" fill="none" style={{ display: "block" }}>
    <defs>
      <linearGradient id="lg-coral" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#FF8F6A" />
        <stop offset="55%" stopColor="#F26241" />
        <stop offset="100%" stopColor="#C2492D" />
      </linearGradient>
    </defs>
    <rect width="1024" height="1024" rx="232" fill="url(#lg-coral)" />
    <path
      d="M 248 408 L 248 248 L 408 248"
      stroke="#1A0904"
      strokeWidth="40"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M 616 776 L 776 776 L 776 616"
      stroke="#1A0904"
      strokeWidth="40"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M 408 380 L 408 644 L 632 512 Z" fill="#1A0904" />
  </svg>
);

// ─── Icons (line) ─────────────────────────────────────────────────
const I = ({ d, size = 20, sw = 1.7, fill = "none" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: "block" }}
  >
    {typeof d === "string" ? <path d={d} /> : d}
  </svg>
);
const IC = {
  check: "M5 12l5 5L20 7",
  star: "M12 3l2.7 5.7L21 9.4l-4.7 4.4 1.2 6.4L12 17l-5.5 3.2 1.2-6.4L3 9.4l6.3-.7L12 3z",
  calendar: "M4 7h16M7 4v3M17 4v3M5 7h14v13H5zM9 13h2M14 13h2",
  bell: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0",
  chart: "M3 17l6-6 4 4 8-8M14 7h7v7",
  search: "M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16zM21 21l-4.3-4.3",
  infinity: "M6.5 8a4 4 0 0 0 0 8c2 0 3.2-1.6 5.5-4s3.5-4 5.5-4a4 4 0 0 1 0 8c-2 0-3.2-1.6-5.5-4",
  fire: "M12 22a7 7 0 0 0 7-7c0-2-1-4-3-5l-1 2-1-9c-4 1-7 4-7 9 0 4-1 4-2 6 0 2 2 4 7 4z",
  devices: "M3 5h13v9H3zM16 9h5v9h-5M8 18h4M10 14v4",
  download: "M12 3v12M7 11l5 5 5-5M5 21h14",
  arrowR: "M5 12h14M13 6l6 6-6 6",
  apple:
    "M17 12.5a4.5 4.5 0 0 1 2.2-3.8 4.6 4.6 0 0 0-3.6-2c-1.5-.1-3 .9-3.8.9s-2-.9-3.3-.9c-1.7 0-3.3 1-4.2 2.5-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.5 1.3-.1 1.8-.8 3.3-.8s2 .8 3.3.8c1.4 0 2.3-1.3 3.1-2.4.7-.8 1.2-1.7 1.5-2.6a4.5 4.5 0 0 1-2.7-4.4zM14.6 5.1A4.4 4.4 0 0 0 15.7 2a4.5 4.5 0 0 0-2.9 1.5 4.2 4.2 0 0 0-1.1 3 3.7 3.7 0 0 0 2.9-1.4z",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
};

// ─── Reveal-on-scroll wrapper ─────────────────────────────────────
const Reveal = ({ children, delay = 0, y = 24, style }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translateY(${y}px)`,
        transition: `opacity 0.7s cubic-bezier(.2,.7,.3,1) ${delay}ms, transform 0.7s cubic-bezier(.2,.7,.3,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// ─── Phone frame holding a real screenshot ────────────────────────
const Phone = ({ src, w = 280, glow = false, style }) => {
  const h = w * (2622 / 1206);
  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: w * 0.13,
        padding: w * 0.018,
        background: "linear-gradient(155deg, #3a2a22 0%, #16110e 60%)",
        boxShadow: glow
          ? `0 40px 90px rgba(242,98,65,0.18), 0 30px 70px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,0,0.4)`
          : `0 30px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,0,0,0.4)`,
        position: "relative",
        flexShrink: 0,
        ...style,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: w * 0.115,
          overflow: "hidden",
          background: "#000",
          position: "relative",
        }}
      >
        <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        {/* notch */}
        <div
          style={{
            position: "absolute",
            top: w * 0.03,
            left: "50%",
            transform: "translateX(-50%)",
            width: w * 0.3,
            height: w * 0.085,
            borderRadius: 99,
            background: "#000",
            zIndex: 2,
          }}
        />
      </div>
    </div>
  );
};

// ─── Buttons ──────────────────────────────────────────────────────
const CTAButton = ({ children, variant = "primary", leading, href = "#", big }) => {
  const base = {
    height: big ? 56 : 48,
    padding: big ? "0 26px" : "0 20px",
    borderRadius: 14,
    fontFamily: L.sans,
    fontWeight: 600,
    fontSize: big ? 16 : 14.5,
    letterSpacing: "-0.01em",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    cursor: "pointer",
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition: "transform .15s, filter .15s, background .15s",
  };
  const v =
    variant === "primary"
      ? {
          background: `linear-gradient(180deg, ${L.coralLight}, ${L.coral})`,
          color: L.coralInk,
          border: "1px solid transparent",
        }
      : { background: L.surface2, color: L.text, border: `1px solid ${L.hairline}` };
  return (
    <a href={href} className="cta-btn" style={{ ...base, ...v }}>
      {leading}
      {children}
    </a>
  );
};

const StoreBadge = ({ icon, top, big }) => (
  <a
    href="#"
    className="cta-btn"
    style={{
      height: 56,
      padding: "0 20px",
      borderRadius: 14,
      background: L.surface2,
      border: `1px solid ${L.hairline}`,
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      textDecoration: "none",
      cursor: "pointer",
      transition: "transform .15s, filter .15s",
    }}
  >
    <span style={{ color: L.text }}>{icon}</span>
    <span style={{ textAlign: "left", lineHeight: 1.15 }}>
      <span style={{ display: "block", fontSize: 10, color: L.muted, letterSpacing: "0.04em" }}>{top}</span>
      <span
        style={{
          display: "block",
          fontSize: 16,
          color: L.text,
          fontWeight: 600,
          fontFamily: L.serif,
          letterSpacing: "-0.01em",
        }}
      >
        {big}
      </span>
    </span>
  </a>
);

// ─── NAV ──────────────────────────────────────────────────────────
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 70,
        display: "flex",
        alignItems: "center",
        background: scrolled ? "rgba(11,9,8,0.8)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
        borderBottom: `1px solid ${scrolled ? L.hairline : "transparent"}`,
        transition: "all .25s",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none" }}>
          <Brackets size={32} />
          <span style={{ fontFamily: L.serif, fontSize: 21, fontWeight: 700, color: L.text, letterSpacing: "-0.02em" }}>
            Showdex
          </span>
        </a>
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 30 }}>
          {["Features", "Screens", "Pricing", "FAQ"].map((t) => (
            <a
              key={t}
              href={`#${t.toLowerCase()}`}
              className="nav-link"
              style={{
                fontFamily: L.sans,
                fontSize: 14.5,
                fontWeight: 500,
                color: L.muted,
                textDecoration: "none",
                transition: "color .15s",
              }}
            >
              {t}
            </a>
          ))}
        </div>
        <CTAButton leading={<I d={IC.download} size={17} />}>Get the app</CTAButton>
      </div>
    </nav>
  );
};

// ─── HERO ─────────────────────────────────────────────────────────
const Hero = () => {
  const wrapRef = useRef(null);
  const [par, setPar] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const cx = (e.clientX - r.left - r.width / 2) / r.width;
      const cy = (e.clientY - r.top - r.height / 2) / r.height;
      setPar({ x: cx, y: cy });
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", () => setPar({ x: 0, y: 0 }));
    return () => el.removeEventListener("mousemove", move);
  }, []);

  return (
    <header id="top" ref={wrapRef} style={{ position: "relative", overflow: "hidden", paddingTop: 70 }}>
      {/* ambient glow */}
      <div
        style={{
          position: "absolute",
          top: -120,
          left: "50%",
          transform: "translateX(-50%)",
          width: 900,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(242,98,65,0.18) 0%, transparent 65%)",
          pointerEvents: "none",
          filter: "blur(20px)",
        }}
      />
      {/* film grain dots */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.4,
          pointerEvents: "none",
          backgroundImage: `radial-gradient(${L.hairline} 1px, transparent 1px)`,
          backgroundSize: "26px 26px",
          maskImage: "linear-gradient(180deg, #000, transparent 70%)",
          WebkitMaskImage: "linear-gradient(180deg, #000, transparent 70%)",
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "64px 24px 0",
          position: "relative",
        }}
      >
        <div
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr 0.95fr",
            gap: 40,
            alignItems: "center",
          }}
        >
          {/* Copy */}
          <div>
            <Reveal>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "7px 13px",
                  borderRadius: 99,
                  marginBottom: 26,
                  background: L.coralSoft,
                  border: `1px solid rgba(242,98,65,0.25)`,
                }}
              >
                <span style={{ width: 7, height: 7, borderRadius: 99, background: L.coral }} />
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    color: L.coral,
                    whiteSpace: "nowrap",
                  }}
                >
                  PERSONAL SHOWS TRACKER
                </span>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <h1
                style={{
                  fontFamily: L.serif,
                  fontWeight: 800,
                  fontSize: "clamp(48px, 6vw, 82px)",
                  lineHeight: 0.98,
                  letterSpacing: "-0.035em",
                  margin: 0,
                  color: L.text,
                }}
              >
                Every show.
                <br />
                <span style={{ color: L.coral }}>Every episode.</span>
                <br />
                Every minute.
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p
                style={{
                  fontFamily: L.sans,
                  fontSize: "clamp(16px, 1.4vw, 19px)",
                  lineHeight: 1.55,
                  color: L.muted,
                  margin: "24px 0 0",
                  maxWidth: 460,
                }}
              >
                Track what you watch, rate every episode, and never miss a return date. Your entire watch life — series
                and films — in one beautifully obsessive app.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div style={{ display: "flex", gap: 12, marginTop: 34, flexWrap: "wrap" }}>
                <StoreBadge
                  icon={<I d={IC.apple} size={22} fill="currentColor" sw={0} />}
                  top="Download on the"
                  big="App Store"
                />
                <StoreBadge
                  icon={
                    <svg width="20" height="22" viewBox="0 0 24 26" style={{ display: "block" }}>
                      <path d="M3 2l13 11L3 24z" fill="#F26241" />
                      <path d="M3 2l9.5 8L3 13z" fill="#FF8F6A" />
                      <path d="M3 13l9.5 3L3 24z" fill="#C2492D" />
                    </svg>
                  }
                  top="Get it on"
                  big="Google Play"
                />
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginTop: 28,
                  fontSize: 13.5,
                  color: L.faint,
                }}
              >
                <div style={{ display: "flex", color: L.coral, gap: 2 }}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <I key={i} d={IC.star} size={15} fill="currentColor" sw={0} />
                  ))}
                </div>
                <span>Loved by binge-watchers everywhere</span>
              </div>
            </Reveal>
          </div>

          {/* Phones */}
          <div
            style={{
              position: "relative",
              height: 620,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Reveal delay={150} style={{ position: "absolute", left: "4%", top: 70, zIndex: 1 }}>
              <div
                style={{
                  transform: `translate(${par.x * -18}px, ${par.y * -14}px) rotate(-7deg)`,
                  transition: "transform .3s ease-out",
                }}
              >
                <Phone src="/screens/calendar.png" w={210} style={{ opacity: 0.92 }} />
              </div>
            </Reveal>
            <Reveal delay={60} style={{ position: "absolute", right: "4%", top: 90, zIndex: 1 }}>
              <div
                style={{
                  transform: `translate(${par.x * 18}px, ${par.y * 14}px) rotate(7deg)`,
                  transition: "transform .3s ease-out",
                }}
              >
                <Phone src="/screens/discover.png" w={210} style={{ opacity: 0.92 }} />
              </div>
            </Reveal>
            <Reveal style={{ position: "relative", zIndex: 3 }}>
              <div
                style={{
                  transform: `translate(${par.x * 28}px, ${par.y * 20}px)`,
                  transition: "transform .3s ease-out",
                }}
              >
                <Phone src="/screens/home.png" w={262} glow />
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* stat strip */}
      <Reveal delay={120}>
        <div
          style={{
            maxWidth: 1000,
            margin: "40px auto 0",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              borderTop: `1px solid ${L.hairline}`,
              borderBottom: `1px solid ${L.hairline}`,
            }}
            className="stat-strip"
          >
            {[
              { n: "Series + films", s: "All in one tracker" },
              { n: "Per-episode", s: "Ratings & progress" },
              { n: "Airing alerts", s: "Never miss a drop" },
              { n: "Your stats", s: "Wrapped, all year" },
            ].map((it, i) => (
              <div
                key={i}
                style={{
                  padding: "22px 16px",
                  textAlign: "center",
                  borderLeft: i > 0 ? `1px solid ${L.hairline}` : "none",
                }}
              >
                <div
                  style={{
                    fontFamily: L.serif,
                    fontSize: 19,
                    fontWeight: 700,
                    color: L.text,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {it.n}
                </div>
                <div style={{ fontSize: 12.5, color: L.muted, marginTop: 4 }}>{it.s}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </header>
  );
};

// ─── FEATURE (alternating) ────────────────────────────────────────
const Feature = ({ flip, eyebrow, title, body, points, src, icon, accent }) => (
  <div
    className="feature-row"
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 60,
      alignItems: "center",
    }}
  >
    <Reveal style={{ order: flip ? 2 : 1 }}>
      <div className="feature-copy" style={{ maxWidth: 440 }}>
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 13,
            marginBottom: 20,
            background: L.coralSoft,
            color: L.coral,
            display: "grid",
            placeItems: "center",
          }}
        >
          <I d={icon} size={23} />
        </div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.14em",
            color: L.coral,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          {eyebrow}
        </div>
        <h2
          style={{
            fontFamily: L.serif,
            fontSize: "clamp(30px, 3.4vw, 42px)",
            fontWeight: 700,
            lineHeight: 1.04,
            letterSpacing: "-0.03em",
            margin: 0,
            color: L.text,
          }}
        >
          {title}
        </h2>
        <p style={{ fontFamily: L.sans, fontSize: 16.5, lineHeight: 1.6, color: L.muted, margin: "18px 0 0" }}>
          {body}
        </p>
        {points && (
          <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 12 }}>
            {points.map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 99,
                    flexShrink: 0,
                    background: L.coralSoft,
                    color: L.coral,
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <I d={IC.check} size={13} sw={2.4} />
                </span>
                <span style={{ fontSize: 15, color: L.text }}>{p}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Reveal>
    <Reveal delay={100} y={36} style={{ order: flip ? 1 : 2 }}>
      <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${accent || "rgba(242,98,65,0.16)"} 0%, transparent 65%)`,
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            pointerEvents: "none",
            filter: "blur(10px)",
          }}
        />
        <div style={{ position: "relative" }}>
          <Phone src={src} w={266} glow />
        </div>
      </div>
    </Reveal>
  </div>
);

const Features = () => (
  <section id="features" style={{ padding: "110px 24px 0" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <Reveal>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 90px" }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.14em",
              color: L.coral,
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            Built for the obsessed
          </div>
          <h2
            style={{
              fontFamily: L.serif,
              fontSize: "clamp(34px, 4.4vw, 54px)",
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              margin: 0,
              color: L.text,
            }}
          >
            Everything you watch, <span style={{ color: L.coral }}>finally organised.</span>
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: L.muted, marginTop: 18 }}>
            Showdex remembers every episode so you don't have to. Pick up exactly where you left off, rate as you go,
            and watch your taste take shape.
          </p>
        </div>
      </Reveal>

      <div style={{ display: "flex", flexDirection: "column", gap: 120 }}>
        <Feature
          icon={IC.infinity}
          eyebrow="Continue watching"
          title="Never lose your place again."
          body="Open the app and your next episode is right there — across every series you're following. One tap marks it watched and your progress updates instantly."
          points={[
            "Per-episode progress tracking",
            "Series and movies side by side",
            "Quick mark-as-watched from anywhere",
          ]}
          src="/screens/home.png"
        />
        <Feature
          flip
          icon={IC.calendar}
          eyebrow="Calendar"
          title="Never miss a return date."
          body="A clean weekly calendar shows exactly when new episodes of your shows drop. Showdex nudges you the moment something you track is out."
          points={["Weekly airing schedule", "New-episode notifications", "Plan your binges ahead"]}
          src="/screens/calendar.png"
          accent="rgba(120,160,255,0.14)"
        />
        <Feature
          icon={IC.star}
          eyebrow="Rate as you watch"
          title="A rating for every single episode."
          body="Not just shows — episodes. Give each one a score, build a richer picture of your taste, and look back on the moments that hit hardest."
          points={["1–5 star episode ratings", "See community averages", "Mark watched, loved, or dropped"]}
          src="/screens/episode.png"
        />
        <Feature
          flip
          icon={IC.chart}
          eyebrow="Statistics"
          title="Your year in review, all year long."
          body="Days watched, streaks, top genres, a heatmap of your habits. Showdex turns your watch history into stats you'll actually want to share."
          points={["Activity heatmap & streaks", "Top genres and totals", "Days-watched leaderboard for yourself"]}
          src="/screens/activity.png"
          accent="rgba(242,98,65,0.18)"
        />
        <Feature
          icon={IC.search}
          eyebrow="Discover"
          title="Find your next obsession."
          body="Staff picks, trending series, and recommendations tuned to what you already love. Search any title and add it to your watchlist in a tap."
          points={["Trending series & films", "Personalised recommendations", "Instant search across everything"]}
          src="/screens/discover.png"
        />
      </div>
    </div>
  </section>
);

// ─── SCREENS GALLERY ──────────────────────────────────────────────
const Gallery = () => {
  const shots = [
    { src: "/screens/library.png", label: "Your library" },
    { src: "/screens/series.png", label: "Your series" },
    { src: "/screens/show.png", label: "Show details" },
    { src: "/screens/movie.png", label: "Movie details" },
    { src: "/screens/trending.png", label: "Trending" },
    { src: "/screens/welcome.png", label: "Onboarding" },
  ];
  return (
    <section id="screens" style={{ padding: "130px 0 0", overflow: "hidden" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 56px" }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.14em",
                color: L.coral,
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              A look inside
            </div>
            <h2
              style={{
                fontFamily: L.serif,
                fontSize: "clamp(34px, 4.4vw, 54px)",
                fontWeight: 800,
                lineHeight: 1.02,
                letterSpacing: "-0.035em",
                margin: 0,
                color: L.text,
              }}
            >
              Dark by design. <span style={{ color: L.coral }}>Coral by heart.</span>
            </h2>
          </div>
        </Reveal>
      </div>
      <Reveal delay={80}>
        <div
          className="gallery-rail"
          style={{
            display: "flex",
            gap: 22,
            overflowX: "auto",
            padding: "12px 24px 40px",
            scrollSnapType: "x mandatory",
          }}
        >
          {shots.map((s, i) => (
            <div key={i} style={{ scrollSnapAlign: "center", textAlign: "center", flexShrink: 0 }}>
              <Phone src={s.src} w={228} />
              <div style={{ marginTop: 16, fontSize: 13.5, color: L.muted, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
};

// ─── FAQ ──────────────────────────────────────────────────────────
const FAQ = () => {
  const items = [
    {
      q: "Is Showdex free to use?",
      a: "Yes — you can track shows and movies for free. Premium unlocks unlimited tracking, full statistics, airing alerts, and import/export.",
    },
    {
      q: "Where does the data come from?",
      a: "Show and movie metadata, posters and episode info are powered by TMDB, the community movie database.",
    },
    {
      q: "Can I import my history from another app?",
      a: "Premium members can import their existing history from Trakt and TV Time, so you start exactly where you left off.",
    },
    {
      q: "Does it track movies too, or just series?",
      a: "Both. Series tracking is per-episode with progress and ratings; movies get watched status, favourites, and ratings in the same library.",
    },
    {
      q: "Will I get notified about new episodes?",
      a: "Yes. Turn on airing alerts and Showdex notifies you the moment a new episode of something you track is released.",
    },
    {
      q: "Is there a dark mode?",
      a: "Showdex is dark by design — a warm, cinematic black with coral accents, all day, every day.",
    },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" style={{ padding: "130px 24px 0" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.14em",
                color: L.coral,
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              Questions
            </div>
            <h2
              style={{
                fontFamily: L.serif,
                fontSize: "clamp(32px, 4vw, 48px)",
                fontWeight: 800,
                lineHeight: 1.04,
                letterSpacing: "-0.035em",
                margin: 0,
                color: L.text,
              }}
            >
              Good to know.
            </h2>
          </div>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={i * 40} y={16}>
                <div
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  style={{
                    padding: "20px 22px",
                    borderRadius: 16,
                    cursor: "pointer",
                    background: L.surface,
                    border: `1px solid ${isOpen ? L.hairlineStrong : L.hairline}`,
                    transition: "border .2s",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                    <span
                      style={{
                        fontFamily: L.serif,
                        fontSize: 18,
                        fontWeight: 700,
                        color: L.text,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {it.q}
                    </span>
                    <span style={{ color: isOpen ? L.coral : L.muted, flexShrink: 0, transition: "color .2s" }}>
                      <I d={isOpen ? IC.minus : IC.plus} size={20} sw={2} />
                    </span>
                  </div>
                  <div
                    style={{
                      maxHeight: isOpen ? 200 : 0,
                      overflow: "hidden",
                      transition: "max-height .3s ease, opacity .3s, margin .3s",
                      opacity: isOpen ? 1 : 0,
                      marginTop: isOpen ? 12 : 0,
                    }}
                  >
                    <p style={{ fontSize: 15, lineHeight: 1.6, color: L.muted, margin: 0 }}>{it.a}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ─── FINAL CTA ────────────────────────────────────────────────────
const FinalCTA = () => (
  <section style={{ padding: "130px 24px 0" }}>
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <Reveal>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 32,
            padding: "clamp(48px, 7vw, 90px) 40px",
            background: `linear-gradient(160deg, ${L.coralLight} 0%, ${L.coral} 50%, ${L.coralDeep} 100%)`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.5,
              pointerEvents: "none",
              backgroundImage: `radial-gradient(rgba(0,0,0,0.10) 1px, transparent 1px)`,
              backgroundSize: "22px 22px",
            }}
          />
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 18,
                  background: "rgba(26,9,4,0.18)",
                  backdropFilter: "blur(8px)",
                  display: "grid",
                  placeItems: "center",
                  border: "1px solid rgba(26,9,4,0.2)",
                }}
              >
                <svg width="36" height="36" viewBox="0 0 1024 1024" fill="none">
                  <path
                    d="M 248 408 L 248 248 L 408 248"
                    stroke="#1A0904"
                    strokeWidth="48"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 616 776 L 776 776 L 776 616"
                    stroke="#1A0904"
                    strokeWidth="48"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M 408 380 L 408 644 L 632 512 Z" fill="#1A0904" />
                </svg>
              </div>
            </div>
            <h2
              style={{
                fontFamily: L.serif,
                fontSize: "clamp(34px, 5vw, 60px)",
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: "-0.035em",
                margin: 0,
                color: L.coralInk,
              }}
            >
              Start your watch log
              <br />
              tonight.
            </h2>
            <p style={{ fontSize: 18, color: "rgba(26,9,4,0.72)", margin: "20px 0 36px", fontWeight: 500 }}>
              Free to download. Yours to obsess over.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="#"
                className="cta-btn"
                style={{
                  height: 56,
                  padding: "0 26px",
                  borderRadius: 14,
                  background: L.coralInk,
                  color: L.text,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  textDecoration: "none",
                  fontFamily: L.sans,
                  fontWeight: 600,
                  fontSize: 16,
                  transition: "transform .15s, filter .15s",
                }}
              >
                <I d={IC.apple} size={20} fill="currentColor" sw={0} /> App Store
              </a>
              <a
                href="#"
                className="cta-btn"
                style={{
                  height: 56,
                  padding: "0 26px",
                  borderRadius: 14,
                  background: "rgba(26,9,4,0.12)",
                  color: L.coralInk,
                  border: "1px solid rgba(26,9,4,0.25)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  textDecoration: "none",
                  fontFamily: L.sans,
                  fontWeight: 600,
                  fontSize: 16,
                  transition: "transform .15s, filter .15s",
                }}
              >
                <svg width="18" height="20" viewBox="0 0 24 26">
                  <path d="M3 2l13 11L3 24z" fill="#1A0904" />
                </svg>{" "}
                Google Play
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

// ─── FOOTER ───────────────────────────────────────────────────────
const Footer = () => (
  <footer style={{ padding: "90px 24px 50px", marginTop: 80, borderTop: `1px solid ${L.hairline}` }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <div
        className="footer-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
          gap: 40,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 16 }}>
            <Brackets size={30} />
            <span
              style={{ fontFamily: L.serif, fontSize: 20, fontWeight: 700, color: L.text, letterSpacing: "-0.02em" }}
            >
              Showdex
            </span>
          </div>
          <p style={{ fontSize: 14, color: L.muted, lineHeight: 1.6, maxWidth: 280, margin: 0 }}>
            The personal shows tracker for people who take their watchlist seriously.
          </p>
        </div>
        {[
          { h: "Product", links: ["Features", "Screens", "Pricing", "Download"] },
          { h: "Company", links: ["About", "Privacy", "Terms", "Contact"] },
          { h: "Follow", links: ["Instagram", "X / Twitter", "TikTok", "Reddit"] },
        ].map((col, i) => (
          <div key={i}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.1em",
                color: L.faint,
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              {col.h}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {col.links.map((l) => (
                <a
                  key={l}
                  href="#"
                  className="nav-link"
                  style={{ fontSize: 14, color: L.muted, textDecoration: "none", transition: "color .15s" }}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 50,
          paddingTop: 26,
          borderTop: `1px solid ${L.hairline}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span style={{ fontSize: 13, color: L.faint }}>© 2026 Showdex. All rights reserved.</span>
        <span style={{ fontSize: 12, color: L.faint, fontFamily: L.mono }}>Powered by TMDB · Made for movie nerds</span>
      </div>
    </div>
  </footer>
);

// ─── PAGE ─────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ background: L.bg, color: L.text, fontFamily: L.sans, overflowX: "hidden" }}>
      <GlobalStyles />
      <Nav />
      <Hero />
      <Features />
      <Gallery />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
