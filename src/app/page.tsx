"use client";
import ChatAlert from "@molecule/chatAlert";
import FooterSection from "@organism/Footer";
import FrameCard from "@organism/FrameCard";
import ReviewSec from "@organism/review";
import HeroSection from "@organism/hero/home";
import PopularDestination from "@organism/popularDestination";
import TopCountriesSection from "@organism/TopCountriesSection";


export default function Home() {
    return (
        <>
            <ChatAlert />
            <HeroSection />
            <TopCountriesSection />
            <PopularDestination />
            <FrameCard />
            <ReviewSec />
            <FooterSection />
        </>
    );
}
