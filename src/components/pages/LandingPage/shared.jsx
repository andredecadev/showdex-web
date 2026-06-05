import { useState, useEffect, useRef } from "react";
import './styles/shared.scss';

export const L = {
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

export const Reveal = ({ children, delay = 0, y = 24, style }) => {
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

export const Phone = ({ src, w = 280, glow = false, style }) => {
  const h = w * (2622 / 1206);
  return (
    <div
      className="phone-frame"
      style={{
        width: w,
        height: h,
        borderRadius: w * 0.13,
        padding: w * 0.018,
        boxShadow: glow
          ? `0 40px 90px rgba(242,98,65,0.18), 0 30px 70px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,0,0.4)`
          : `0 30px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,0,0,0.4)`,
        ...style,
      }}
    >
      <div className="phone-screen" style={{ borderRadius: w * 0.115 }}>
        <img src={src} alt="" />
        <div
          className="phone-notch"
          style={{
            top: w * 0.03,
            width: w * 0.3,
            height: w * 0.085,
            borderRadius: 99,
          }}
        />
      </div>
    </div>
  );
};

export const CTAButton = ({ children, variant = "primary", leading, href = "#", big }) => (
  <a href={href} className={`btn cta-btn btn--${variant}${big ? " btn--big" : ""}`}>
    {leading}
    {children}
  </a>
);

export const StoreBadge = ({ icon, top, big }) => (
  <a href="#" className="store-badge cta-btn">
    <span className="store-badge-icon">{icon}</span>
    <span className="store-badge-text">
      <span className="store-badge-top">{top}</span>
      <span className="store-badge-name">{big}</span>
    </span>
  </a>
);
