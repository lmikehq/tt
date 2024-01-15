"use client"

import Section from "@/components/molecules/section"
import BreadCrumbPane from "@/components/molecules/stays/view/BreadCrumbPane"
import ChooseYourRoom from "@/components/molecules/stays/view/ChooseYourRoom"
import CompareSimilarHotels from "@/components/molecules/stays/view/CompareSimilarHotels"
import CompareSlider from "@/components/molecules/stays/view/CompareSlider"
import DescriptionOfHotel from "@/components/molecules/stays/view/DescriptionOfHotel"
import HeroImageGrid from "@/components/molecules/stays/view/HeroImageGrid"
import HotelAmenities from "@/components/molecules/stays/view/HotelAmenities"
import HotelReviews from "@/components/molecules/stays/view/HotelReviews"
import LikeSimilarHotels from "@/components/molecules/stays/view/LikeSimilarHotels"
import Location from "@/components/molecules/stays/view/Location"
import Policies from "@/components/molecules/stays/view/Policies"
import StayDetails from "@/components/molecules/stays/view/StayDetails"
import RecentlyViewedList from "@/components/molecules/stays/view/recently-viewed/RecentlyViewedList"
import { Span } from "@/components/molecules/stays/view/styles"
import SectionLayout from "@/components/templates/SectionLayout"
import Flex from "@/components/templates/flex"
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution"
import Favorite from "@mui/icons-material/Favorite"
import FavoriteBorder from "@mui/icons-material/FavoriteBorder"
import { Box, Checkbox } from "@mui/material"
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined"
import { useRouter, useSearchParams } from "next/navigation"
import { useViewSingleStay } from "@/lib/hooks/stay/search.hook"
import { extractSearchParamsFromUrl } from "@/lib/extensions/helpers/constructQuery"
import {
  ViewSingleStayRequestInput,
  convertRoomForGuestsToString,
  extractRoomForGuestsFromString,
} from "@/lib/types/request-models/stay/search.type"
import { useUserPreferencesStore } from "@/lib/store/preferences.store"

const label = { inputProps: { "aria-label": "Checkbox demo" } }

const StayViewPage = () => {
  const router = useRouter()
  const { isMobile } = useScreenResolution()
  const searchParams = useSearchParams()

  const id = searchParams.get("id")
  const checkIn = searchParams.get("checkIn")
  const checkOut = searchParams.get("checkOut")
  const guests = searchParams.get("guests")
  const { preFerredCurrency, preferredLanguage } = useUserPreferencesStore(
    (state) => state
  )

  const requestParams = (): ViewSingleStayRequestInput => ({
    id: "transcorp_hilton_abuja" ?? id ?? "",
    checkin: checkIn ?? "",
    checkout: checkOut ?? "",
    residency: "ng",
    language: preferredLanguage,
    guests: extractRoomForGuestsFromString(guests ?? ""),
    currency: preFerredCurrency,
  })

  const { data: stayResponse, isFetching } = useViewSingleStay(requestParams(), {
    enabled: id ? true : false,
  })

  const handleGoBack = () => {
    router.back()
  }

  // console.log(stayResponse)

  return (
    <SectionLayout>
      {!isMobile ? (
        <BreadCrumbPane />
      ) : (
        <Span style={{ margin: "10px 0px" }}>
          <Flex justify="space-between" align="center">
            <Span>
              <ArrowBackIosOutlinedIcon
                onClick={handleGoBack}
                style={{ cursor: "pointer", fontSize: "24px" }}
              />
            </Span>
            <Span>
              <Checkbox
                {...label}
                icon={<FavoriteBorder />}
                checkedIcon={
                  <Favorite
                    style={{
                      color: "var(--color-favorite)",
                    }}
                  />
                }
                disableRipple
                disableTouchRipple
                disableFocusRipple
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: 28,
                    padding: 0,
                  },
                }}
                id="favorite-hotels-checkbox"
              />
            </Span>
          </Flex>
        </Span>
      )}
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
  )
}

export default StayViewPage
