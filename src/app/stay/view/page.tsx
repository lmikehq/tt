"use client";
import Section from "@/components/molecules/section";
import BreadCrumbPane from "@/components/molecules/stays/view/BreadCrumbPane";
import ChooseYourRoom from "@/components/molecules/stays/view/ChooseYourRoom";
import CompareSimilarHotels from "@/components/molecules/stays/view/CompareSimilarHotels";
import CompareSlider from "@/components/molecules/stays/view/CompareSlider";
import DescriptionOfHotel from "@/components/molecules/stays/view/DescriptionOfHotel";
import HeroImageGrid from "@/components/molecules/stays/view/HeroImageGrid";
import HotelAmenities from "@/components/molecules/stays/view/HotelAmenities";
import HotelReviews from "@/components/molecules/stays/view/HotelReviews";
import LikeSimilarHotels from "@/components/molecules/stays/view/LikeSimilarHotels";
import Location from "@/components/molecules/stays/view/Location";
import Policies from "@/components/molecules/stays/view/Policies";
import StayDetails from "@/components/molecules/stays/view/StayDetails";
import RecentlyViewedList from "@/components/molecules/stays/view/recently-viewed/RecentlyViewedList";
import SectionLayout from "@/components/templates/SectionLayout";
import Flex from "@/components/templates/flex";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { Box } from "@mui/material";

const StayViewPage = () => {
  const { isMobile } = useScreenResolution();
  return (
    <SectionLayout>
      <BreadCrumbPane />
      <HeroImageGrid />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: isMobile ? "100%" : "67.3% 30%",
          gap: "30px",
        }}
      >
        <Section>
          <StayDetails />
          <ChooseYourRoom />
          <LikeSimilarHotels />
          <Location />
          <DescriptionOfHotel />
          <HotelAmenities />
          <CompareSlider />
          <Policies />
          <HotelReviews />
          <CompareSimilarHotels />
        </Section>

        <Section>
          <RecentlyViewedList />
        </Section>
      </Box>
    </SectionLayout>
  );
};

export default StayViewPage;
