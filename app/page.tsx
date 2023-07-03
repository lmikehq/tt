import ChatAlert from "@atom/chatAlert";
import Flex from "@atom/flex";
import Link from "@atom/link";
import Text from "@atom/text";
import FooterSection from "@organism/Footer";
import FrameCard from "@organism/FrameCard";
import PopularCountry from "@organism/PopularCountry";
import ReviewSec from "@organism/Review";
import HeroSection from "@organism/hero/home";
import PopularDestination from "@organism/popularDestination";
import { ttColors } from "theme/colors";

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
