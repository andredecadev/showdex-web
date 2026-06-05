import { useState, useEffect } from "react";
import { L } from "../../shared";
import '../../styles/NavWidget.scss';

const NavWidget = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <nav
      className="nav"
      style={{
        background: scrolled ? "rgba(11,9,8,0.8)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
        borderBottom: `1px solid ${scrolled ? L.hairline : "transparent"}`,
      }}
    >
      <div className="nav-inner">
        <a href="#top" className="nav-brand">
          <img src="/icon-coral.png" alt="Showdex" style={{ width: 32, height: 32, borderRadius: 8 }} />
          <span className="nav-brand-name">Showdex</span>
        </a>
        <div className="nav-links">
          {["Features", "Screens", "FAQ"].map((t) => (
            <a key={t} href={`#${t.toLowerCase()}`} className="nav-link">
              {t}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavWidget;
