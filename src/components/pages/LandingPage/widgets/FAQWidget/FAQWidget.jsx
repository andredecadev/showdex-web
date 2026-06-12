import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Reveal } from "../../shared";
import "../../styles/FAQWidget.scss";

const items = [
  {
    q: "Is Showdex free to use?",
    a: "Yes, you can track unlimited shows for free.",
  },
  {
    q: "Where does the data come from?",
    a: "Show metadata, posters and episode info are powered by TMDB, the community movie database.",
  },
  {
    q: "Can I import my history from another app?",
    a: (
      <>
        <p>You can import your existing history from TV Time, so you start exactly where you left off.</p>
        <br />
        1 - Open Google Chrome and go to the Chrome Web Store, there search for "TV Time Liberator": click "Add to
        Chrome". Once installed, click the puzzle piece icon (Extensions menu) in your browser toolbar and pin "TV Time
        Liberator" for easy access.
        <br />2 - Go to TV Time official website:{" "}
        <a className="faq-link" href="https://www.tvtime.com/it" target="_blank">
          https://www.tvtime.com
        </a>{" "}
        and login with your credentials.
        <br />3 - Click on the "TV Time Liberator" icon in your browser toolbar and click the button "Liberate". Wait
        until the process is completed and save the generated .zip file on your PC.
        <br />4 - Extract the .zip file and delete everything but the "activity_history.csv" file.
        <br />5 - Open Showdex, go to Profile {"->"} Settings {"->"} Import from TVTime: select the .csv file you just
        extracted and the job is done! Your history is now synced with Showdex.
      </>
    ),
  },
  {
    q: "Will I get notified about new episodes?",
    a: "Yes, turn on alerts and Showdex will notifies you when a new episode of your shows is released.",
  },
  {
    q: "Is there a light mode?",
    a: "Showdex can be used either in light or dark mode, the choice is yours.",
  },
  {
    q: "Which language is the app available in?",
    a: "Showdex is currently available in English and Italian, but we plan to add more languages in the future.",
  },
];

const FAQWidget = () => {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="faq-section">
      <div className="faq-inner">
        <Reveal>
          <div className="faq-header">
            <div className="faq-eyebrow">Questions</div>
            <h2 className="faq-h2">Good to know.</h2>
          </div>
        </Reveal>
        <div className="faq-list">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={i * 40} y={16}>
                <div className={`faq-item${isOpen ? " faq-item--open" : ""}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                  <div className="faq-item-top">
                    <span className="faq-question">{it.q}</span>
                    <span className="faq-toggle">
                      {isOpen ? <Minus size={20} strokeWidth={2} /> : <Plus size={20} strokeWidth={2} />}
                    </span>
                  </div>
                  <div className="faq-answer">
                    <p>{it.a}</p>
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

export default FAQWidget;
