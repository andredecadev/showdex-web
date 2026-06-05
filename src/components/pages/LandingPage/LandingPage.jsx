import './styles/global.scss';
import NavWidget from "./widgets/NavWidget/NavWidget";
import HeroWidget from "./widgets/HeroWidget/HeroWidget";
import FeaturesWidget from "./widgets/FeaturesWidget/FeaturesWidget";
import GalleryWidget from "./widgets/GalleryWidget/GalleryWidget";
import FAQWidget from "./widgets/FAQWidget/FAQWidget";
import FinalCTAWidget from "./widgets/FinalCTAWidget/FinalCTAWidget";
import FooterWidget from "./widgets/FooterWidget/FooterWidget";

const LandingPage = () => (
  <>
    <NavWidget />
    <HeroWidget />
    <FeaturesWidget />
    <GalleryWidget />
    <FAQWidget />
    <FinalCTAWidget />
    <FooterWidget />
  </>
);

export default LandingPage;
