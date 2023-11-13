"use client";
import Section from "@/components/molecules/section";
import BreadCrumbPane from "@/components/molecules/stays/view/BreadCrumbPane";
import CompareSimilarHotels from "@/components/molecules/stays/view/CompareSimilarHotels";
import CompareSlider from "@/components/molecules/stays/view/CompareSlider";
import HeroImageGrid from "@/components/molecules/stays/view/HeroImageGrid";
import HotelReviews from "@/components/molecules/stays/view/HotelReviews";
import RecentlyViewed from "@/components/molecules/stays/view/RecentlyViewed";
import StayDetailsTab from "@/components/molecules/stays/view/StayDetailsTab";
import SectionLayout from "@/components/templates/SectionLayout";
import Flex from "@/components/templates/flex";

const StayViewPage = () => {
  return (
    <SectionLayout>
      <BreadCrumbPane />
      <HeroImageGrid />
      <Flex gap="2.25rem">
        <Section width="62%">
          <StayDetailsTab />
          <CompareSlider/>
          <HotelReviews />
          <CompareSimilarHotels />
        </Section>

        <Section width="38%">
          <RecentlyViewed />
        </Section>
      </Flex>
    </SectionLayout>
  );
};

export default StayViewPage;
