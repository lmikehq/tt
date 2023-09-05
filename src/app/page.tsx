"use client";
import ChatAlert from "src/components/atoms/chatAlert";
import FooterSection from "src/components/organisms/Footer";
import FrameCard from "src/components/organisms/FrameCard";
import PopularCountry from "src/components/organisms/PopularCountry";
import ReviewSec from "src/components/organisms/Review";
import HeroSection from "src/components/organisms/hero/home";
import PopularDestination from "src/components/organisms/popularDestination";
import { FlightProvider } from "context";

export default function Home() {
  return (
    <FlightProvider>
      <ChatAlert />
      <HeroSection />
      <PopularCountry />
      <PopularDestination />
      <FrameCard />
      <ReviewSec />
      <FooterSection />
    </FlightProvider>
  );
}
