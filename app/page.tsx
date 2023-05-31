import FrameCard from "@organism/FrameCard";
import PopularCountry from "@organism/PopularCountry";
import ReviewSec from "@organism/Review";
import PopularDestination from "@organism/popularDestination";

export default function Home() {
  return (
    <main>
      <PopularCountry />
      <PopularDestination />
      <FrameCard />
      <ReviewSec />
    </main>
  );
}
