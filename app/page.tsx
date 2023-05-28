import FrameCard from "@organism/FrameCard";
import FooterSection from "@organism/Footer";
import Navbar from "@organism/Navbar";
import ReviewSec from "@organism/Review";
import PopularCountry from "@organism/PopularCountry";
import PopularDestination from "@organism/popularDestination";

export default function Home() {
  return (
    <main>
      <Navbar />
      <PopularCountry />
      <PopularDestination />
      <FrameCard />
      <ReviewSec />
      <FooterSection />
    </main>
  );
}
