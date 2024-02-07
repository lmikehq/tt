import styled from "styled-components";
import Section from "../../section";
import { ttColors } from "@/lib/theme/colors";
import VisaDashboardHeader from "./visaDashboardHeader";
import { Grid } from "@/components/templates/grid";
import StaysCard from "./stays/card";
import PaginationCtrl from "../../pagination";
import { useGetAllStaysBookingHistory } from "@/lib/hooks/dashboard/stays.hook";
import { useDashboardStore } from "@/lib/store/dashboard/index.store";
import { HotelBookingHistory } from "@/lib/types/response-models/dashboard";
import Center from "@/components/templates/center";
import NoApplication from "./noApplication";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import Flex from "@/components/templates/flex";
import { mockStaysBookingHistory } from "@/lib/extensions/data/mock";

const StaysWrapper = styled.div`
   background: ${ttColors.defaultColor};
    align-items: center;
    margin-top: 15px;

    & button {
        width: 154px !important;
    }

    @media screen and (max-width: 900px) {
        height: fit-content;
        padding: 20px 16px;
    }
`;

const StaysHistory = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    // height: 311px;
    border: 1px solid #e7e7e7;
    border-radius: 14px;
`;

const TextContainer = styled.div`
    background: #f3f3ff;
    padding: 10px;
    border-radius: 20px;
    width: 88px;
    text-align: center;
    justify-content: center;
`;


function Stays() {
  const { isMobile } = useScreenResolution();
  const { search, startDate, endDate, param, limit, page, setPage } = useDashboardStore((state) => state);
  const content: { title: string, links: { text: string, url: string; }[]; } = {
    title: "You’ve got no Stays Booking - Let’s help you get Started ",
    links: [
      { text: "Apply for Visa", url: "/visa" },
      { text: "Book flight", url: "/flight" },
      { text: "Search Stays", url: "/stay" }
    ]
  };
  const { data, isLoading } = useGetAllStaysBookingHistory(
    {
      query: { status: param, search, startDate, endDate, currentPage: page, limit },
      options: { retry: 2 }
    });


  const response = data as { userStaysBookings: HotelBookingHistory[], filteredCount: number, totalCount: number; };
  const stays: HotelBookingHistory[] = response?.userStaysBookings;
  const filteredCount = response?.filteredCount;
  const totalCount = response?.totalCount;

  return (
    <StaysWrapper>
      <VisaDashboardHeader headerText="Stays" type="radio" />
      <Section>
        {mockStaysBookingHistory.length > 0 ? (
          <Flex direction="column" gap="1rem">
            {mockStaysBookingHistory.map((stay) => {
              return (
                <div key={stay._id}>
                  <StaysCard
                    hotelId={stay.hotelId}
                    name={stay.hotelPayload.name}
                    image={stay.hotelPayload.image}
                    payment={stay.paymentOptions[0].amount}
                    checkInDate={stay.checkInDate}
                    checkoutDate={stay.checkOutDate}
                    region={stay.hotelPayload.region}
                    rating={stay.hotelPayload.rating}
                  />
                </div>
              );
            })}
            <PaginationCtrl
              data={[]}
              page={page}
              setPage={setPage} filteredCount={filteredCount} totalCount={totalCount} />
          </Flex>
        ) : (
          <Center
            margin={isMobile ? "3.5rem 0px" : "10rem 0"}
            height="25rem"
          >
            <NoApplication
              noVisaImage={"/assets/images/noStays.png"}
              content={content}
            />
          </Center>
        )}
      </Section>

    </StaysWrapper>
  );
}

export default Stays;