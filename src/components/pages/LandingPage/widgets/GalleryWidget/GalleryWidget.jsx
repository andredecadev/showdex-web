import { Reveal, Phone } from "../../shared";
import "../../styles/GalleryWidget.scss";

const shots = [
  { src: "/screens/home.png", label: "Home" },
  { src: "/screens/calendar.png", label: "Calendar" },
  { src: "/screens/discover.png", label: "Discover" },
  { src: "/screens/trending.png", label: "Trending" },
  { src: "/screens/library.png", label: "Your library" },
  { src: "/screens/series.png", label: "Your series" },
  { src: "/screens/activity.png", label: "Your activity" },
  { src: "/screens/movie.png", label: "Movie details" },
  { src: "/screens/show.png", label: "Series details" },
  { src: "/screens/episode.png", label: "Episode details" },
];

const GalleryWidget = () => (
  <section id="screens" className="gallery-section">
    <div className="gallery-header-wrap">
      <Reveal>
        <div className="gallery-header">
          <div className="gallery-eyebrow">A look inside</div>
          <h2 className="gallery-h2">
            A beautiful design. <span>Coral is here.</span>
          </h2>
        </div>
      </Reveal>
    </div>
    <Reveal delay={80}>
      <div className="gallery-rail">
        {shots.map((s, i) => (
          <div key={i} className="gallery-item">
            <Phone src={s.src} w={228} />
            <div className="gallery-label">{s.label}</div>
          </div>
        ))}
      </div>
    </Reveal>
  </section>
);

export default GalleryWidget;
