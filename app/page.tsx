import FrameCard from "@organism/FrameCard";
import PopularCountry from "@organism/PopularCountry";
import ReviewSec from "@organism/Review";
import PopularDestination from "@organism/popularDestination";
import Dashboard from "@organism/Dashboard";

export default function Home() {
  return (
    <main>
      <Dashboard />
      <PopularCountry />
      <PopularDestination />
      <FrameCard />
      <ReviewSec />
    </main>
  );
}
