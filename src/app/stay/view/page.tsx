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

const StayViewPage = () => {
  return (
    <SectionLayout>
      <BreadCrumbPane />
      <HeroImageGrid />
      <Flex gap="2.25rem" align="flex-start">
        <Section width="62%">
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

        <Section width="38%">
          <RecentlyViewedList />
        </Section>
      </Flex>
    </SectionLayout>
  );
};

export default StayViewPage;
