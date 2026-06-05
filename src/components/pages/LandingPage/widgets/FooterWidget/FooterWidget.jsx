import '../../styles/FooterWidget.scss';

const FooterWidget = () => (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-grid">
        <div>
          <div className="footer-brand">
            <img src="/icon-coral.png" alt="Showdex" style={{ width: 30, height: 30, borderRadius: 7 }} />
            <span className="footer-brand-name">Showdex</span>
          </div>
          <p className="footer-tagline">
            The personal shows tracker for people who take their watchlist seriously.
          </p>
        </div>
        <span className="footer-copy">
          © 2026 Showdex. All rights reserved.{' '}
          <a href="/privacy.html" className="footer-privacy">Privacy Policy</a>
        </span>
      </div>
    </div>
  </footer>
);

export default FooterWidget;
