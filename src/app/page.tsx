"use client";
import ChatAlert from "@molecule/chatAlert";
import FooterSection from "@organism/Footer";
import FrameCard from "@organism/FrameCard";
import PopularCountry from "@organism/popularCountry";
import ReviewSec from "@organism/review";
import HeroSection from "@organism/hero/home";
import PopularDestination from "@organism/popularDestination";
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
