import { Check, Infinity, Calendar, Star, TrendingUp, Search } from "lucide-react";
import { Reveal, Phone } from "../../shared";
import "../../styles/FeaturesWidget.scss";

const Feature = ({ flip, eyebrow, title, body, points, src, icon, accent }) => (
  <div className="feature-row">
    <Reveal style={{ order: flip ? 2 : 1 }}>
      <div className="feature-copy">
        <div className="feature-icon">{icon}</div>
        <div className="feature-eyebrow">{eyebrow}</div>
        <h2 className="feature-h2">{title}</h2>
        <p className="feature-body">{body}</p>
        {points && (
          <div className="feature-points">
            {points.map((p, i) => (
              <div key={i} className="feature-point">
                <span className="feature-check">
                  <Check size={13} strokeWidth={2.4} />
                </span>
                <span className="feature-point-text">{p}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Reveal>
    <Reveal delay={100} y={36} style={{ order: flip ? 1 : 2 }}>
      <div className="feature-visual">
        <div
          className="feature-glow"
          style={{ background: `radial-gradient(circle, ${accent || "rgba(242,98,65,0.16)"} 0%, transparent 65%)` }}
        />
        <div className="feature-visual-inner">
          <Phone src={src} w={266} glow />
        </div>
      </div>
    </Reveal>
  </div>
);

const FeaturesWidget = () => (
  <section id="features" className="features-section">
    <div className="features-inner">
      <Reveal>
        <div className="features-header">
          <div className="features-eyebrow">Built for the real ones</div>
          <h2 className="features-h2">
            Everything you watch, <span>finally organized.</span>
          </h2>
          <p className="features-desc">
            Showdex remembers every episode so you don't have to. Pick up exactly where you left off, rate as you go,
            and watch your taste take shape.
          </p>
        </div>
      </Reveal>

      <div className="features-list">
        <Feature
          icon={<Infinity size={23} />}
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
          icon={<Calendar size={23} />}
          eyebrow="Calendar"
          title="Never miss a return date."
          body="A clean weekly calendar shows exactly when new episodes of your shows drop. Showdex nudges you the moment something you track is out."
          points={["Weekly airing schedule", "New-episode notifications", "Plan your binges ahead"]}
          src="/screens/calendar.png"
          accent="rgba(120,160,255,0.14)"
        />
        <Feature
          icon={<Star size={23} />}
          eyebrow="Rate as you watch"
          title="A rating for every single episode."
          body="Not just shows — episodes. Give each one a score, build a richer picture of your taste, and look back on the moments that hit hardest."
          points={["1–5 star episode ratings", "See community averages", "Mark as watched whenever you want"]}
          src="/screens/episode.png"
        />
        <Feature
          flip
          icon={<TrendingUp size={23} />}
          eyebrow="Statistics"
          title="Your year in review, all year long."
          body="Days watched, streaks, a heatmap of your habits. Showdex turns your watch history into stats you'll actually want to share."
          points={[
            "Activity heatmap & streaks",
            "Episodes per month and totals",
            "Days-watched leaderboard for yourself",
          ]}
          src="/screens/activity.png"
          accent="rgba(242,98,65,0.18)"
        />
        <Feature
          icon={<Search size={23} />}
          eyebrow="Discover"
          title="Find your next favorite."
          body="Staff picks, trending series, and recommendations tuned to what you already love. Search any title and add it to your watchlist in a tap."
          points={["Trending series & films", "Personalized recommendations", "Instant search across everything"]}
          src="/screens/discover.png"
        />
      </div>
    </div>
  </section>
);

export default FeaturesWidget;
