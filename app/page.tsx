import FrameCard from "@organism/FrameCard";
import FooterSection from "@organism/Footer";
import Navbar from "@organism/Navbar";
import ReviewSec from "@organism/Review";

export default function Home() {
  return (
    <main>
      <Navbar />
      <FrameCard />
      <ReviewSec />
      <FooterSection />
    </main>
  );
}
