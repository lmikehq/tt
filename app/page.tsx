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
      <Link href="/chat">
        <Flex
          justify="center"
          padding="1.1rem 0"
          gap="2rem"
          align="center"
          background="#132128"
        >
          <Text
            type="p"
            text="Introducing Thrillers Travels AI guide "
            size="1.2rem"
            weight={900}
            cursor="pointer"
            color="white"
          />
          <Text
            type="p"
            text="learn more "
            weight={900}
            cursor="pointer"
            size="1.2rem"
            color={ttColors.primary}
          />
        </Flex>
      </Link>
      <HeroSection />
      <PopularCountry />
      <PopularDestination />
      <FrameCard />
      <ReviewSec />
      <FooterSection />
    </main>
  );
}
