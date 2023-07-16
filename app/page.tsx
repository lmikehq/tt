import ChatAlert from "@atom/chatAlert";
import FooterSection from "@organism/Footer";
import FrameCard from "@organism/FrameCard";
import PopularCountry from "@organism/PopularCountry";
import ReviewSec from "@organism/Review";
import HeroSection from "@organism/hero/home";
import PopularDestination from "@organism/popularDestination";

export default function Home() {
  return (
    <main>
      <ChatAlert />
      <HeroSection />
      <PopularCountry />
      <PopularDestination />
      <FrameCard />
      <ReviewSec />
      <FooterSection />
    </main>
  );
}
