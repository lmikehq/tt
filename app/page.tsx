import FrameCard from "@organism/FrameCard";
import ReviewSec from "@organism/Review";
import PopularCountry from "@organism/PopularCountry";
import PopularDestination from "@organism/popularDestination";
import AllCountry from "@organism/AllCountry";
import HeroSection from "@organism/hero/HeroSection";

export default function Home() {
  return (
    <main>
      <AllCountry />
      <PopularCountry />
      <PopularDestination />
      <FrameCard />
      <ReviewSec />
    </main>
  );
}
