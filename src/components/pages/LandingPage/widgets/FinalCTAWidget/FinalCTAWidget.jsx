import { Reveal, StoreBadge } from "../../shared";
import "../../styles/FinalCTAWidget.scss";

const FinalCTAWidget = () => (
  <section className="final-cta-section">
    <div className="final-cta-inner">
      <Reveal>
        <div className="final-cta-card">
          <div className="final-cta-dots" />
          <div className="final-cta-content">
            <div className="final-cta-icon-wrap">
              <img src="/icon-coral.png" alt="Showdex" style={{ width: 64, height: 64, borderRadius: 8 }} />
            </div>
            <h2 className="final-cta-h2">
              Start your watch log
              <br />
              <span className="final-cta-highlight">now.</span>
            </h2>
            <p className="final-cta-body">Free to download. With you for ever.</p>
            <Reveal delay={180}>
              <div className="final-cta-buttons">
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
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default FinalCTAWidget;
