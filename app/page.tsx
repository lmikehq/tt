import FrameCard from "@organism/FrameCard";
import FooterSection from "@organism/Footer";
import Navbar from "@organism/Navbar";
import ReviewSec from "@organism/Review";
import PopularCountry from "@organism/PopularCountry";

export default function Home() {
  return (
    <main>
      <Navbar />
      <PopularCountry />
      <FrameCard />
      <ReviewSec />
      <FooterSection />
    </main>
  );
}
