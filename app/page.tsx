import FrameCard from "@organism/FrameCard";
import FooterSection from "@organism/Footer";
import Navbar from "@organism/Navbar";
import ReviewSec from "@organism/Review";
import PopularCountry from "@organism/PopularCountry";
import PopularDestination from "@organism/popularDestination";
import AllCountry from "@organism/AllCountry";

export default function Home() {
  return (
    <main>
      <Navbar />
      <AllCountry />
      <PopularCountry />
      <PopularDestination />
      <FrameCard />
      <ReviewSec />
      <FooterSection />
    </main>
  );
}
