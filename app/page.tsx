"use client"
import ChatAlert from "@atom/chatAlert";
import FooterSection from "@organism/Footer";
import FrameCard from "@organism/FrameCard";
import PopularCountry from "@organism/PopularCountry";
import ReviewSec from "@organism/Review";
import HeroSection from "@organism/hero/home";
import PopularDestination from "@organism/popularDestination";
import { FlightProvider } from "context";

export default function Home() {
  return (
    <>
      <ChatAlert />
      <HeroSection />
      <PopularCountry />
      <PopularDestination />
      <FrameCard />
      <ReviewSec />
      <FooterSection />
    </>
  );
}
