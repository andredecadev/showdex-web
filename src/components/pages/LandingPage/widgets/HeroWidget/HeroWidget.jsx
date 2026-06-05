import { useState, useEffect, useRef } from "react";
import { Star } from "lucide-react";
import { Reveal, Phone, StoreBadge } from "../../shared";
import "../../styles/HeroWidget.scss";

const HeroWidget = () => {
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
    <header id="top" ref={wrapRef} className="hero">
      <div className="hero-ambient" />
      <div className="hero-grain" />

      <div className="hero-container">
        <div className="hero-grid">
          <div>
            <Reveal>
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                <span className="hero-badge-text">PERSONAL SHOWS TRACKER</span>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="hero-h1">
                Every show.
                <br />
                <span>Every episode.</span>
                <br />
                Every minute.
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="hero-body">
                Track what you watch, rate every episode, and never miss a return date. Your entire watch life — series
                and films — in one beautiful app.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="hero-stores">
                <StoreBadge
                  icon={<img src="/icons/apple_logo.svg" alt="" style={{ width: 22, height: 22 }} />}
                  top="Download on the"
                  big="App Store"
                />
                <StoreBadge
                  icon={<img src="/icons/google_logo.svg" alt="" style={{ width: 22, height: 22 }} />}
                  top="Get it on"
                  big="Google Play"
                />
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div className="hero-social-proof">
                <div className="hero-stars">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <span>Loved by binge-watchers everywhere</span>
              </div>
            </Reveal>
          </div>

          <div className="hero-phones">
            <Reveal delay={150} style={{ position: "absolute", left: "4%", top: 70, zIndex: 1 }}>
              <div
                style={{
                  transform: `translate(${par.x * -18}px, ${par.y * -14}px) rotate(-7deg)`,
                  transition: "transform .3s ease-out",
                }}
              >
                <Phone src="/screens/show.png" w={210} style={{ opacity: 0.92 }} />
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

      <Reveal delay={120}>
        <div className="hero-stats-wrap">
          <div className="stat-strip">
            {[
              { n: "Series + films", s: "All in one tracker" },
              { n: "Per-episode", s: "Ratings & progress" },
              { n: "Airing alerts", s: "Never miss a drop" },
              { n: "Your stats", s: "Wrapped, all year" },
            ].map((it, i) => (
              <div key={i} className="stat-item">
                <div className="stat-label">{it.n}</div>
                <div className="stat-sub">{it.s}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </header>
  );
};

export default HeroWidget;
