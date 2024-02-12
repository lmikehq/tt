import styled from "styled-components";
import Section from "../../section";
import { ttColors } from "@/lib/theme/colors";
import VisaDashboardHeader from "./visaDashboardHeader";
import { Grid } from "@/components/templates/grid";
import StaysCard from "./stays/card";
import { useGetAllStaysBookingHistory } from "@/lib/hooks/dashboard/stays.hook";
import { useDashboardStore } from "@/lib/store/dashboard/index.store";
import { HotelBookingHistory } from "@/lib/types/response-models/dashboard";
import Center from "@/components/templates/center";
import NoApplication from "./noApplication";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import Flex from "@/components/templates/flex";
import { mockStaysBookingHistory } from "@/lib/extensions/data/mock";
import CustomPagination from "../../pagination/customPagination";
import useHandlePagination from "@/lib/extensions/hook/useHandlePagination";
import { useConversionRate } from "@/hooks/useConversionRate";
import Spinner from "../../icons/spinner";

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
  const { convertCurrency } = useConversionRate();
  const content: { title: string, links: { text: string, url: string; }[]; } = {
    title: "You’ve got no Stays Booking - Let’s help you get Started ",
    links: [
      { text: "Apply for Visa", url: "/visa/apply" },
      { text: "Book flight", url: "/flight" },
      { text: "Search Stays", url: "/stay" }
    ]
  };
  // HANDLE PAGINATION
  const { onPageChange } = useHandlePagination();
  const { data, isLoading, refetch } = useGetAllStaysBookingHistory(
    {
      query: { status: param, search, startDate, endDate, currentPage: page, limit },
      options: { retry: 2 }
    });


  const response = data as { userStaysBookings: HotelBookingHistory[], filteredCount: number, totalCount: number; };
  const stays: HotelBookingHistory[] = response?.userStaysBookings;
  const filteredCount = response?.filteredCount || 1;
  // const totalCount = response?.totalCount;

  return (
    <StaysWrapper>
      <VisaDashboardHeader headerText="Stays" type="radio" />
      <Section>
        {isLoading ? (
          <Flex height="450px" align="center" justify="center">
            <Spinner size="60px" fill={ttColors.blackishBlue} />
          </Flex>
        ) : (
          <>
            {stays.length > 0 ? (
              <Flex direction="column" gap="1rem">
                {stays.map((stay) => {
                  return (
                    <div key={stay._id}>
                      <StaysCard
                        hotelId={stay.hotelId}
                        name={stay.hotelPayload.name}
                        image={stay.hotelPayload.image}
                        payment={Number(convertCurrency({ convertFrom: stay.paymentOptions[0].currency_code, convertTo: 'NGN', amount: stay.paymentOptions[0].amount }).amount)}
                        checkInDate={stay.checkInDate}
                        checkoutDate={stay.checkOutDate}
                        region={stay.hotelPayload.region}
                        rating={stay.hotelPayload.rating}
                        refetch={refetch}
                      />
                    </div>
                  );
                })}

                <Flex justify="flex-end" align="center">
                  <CustomPagination count={Math.ceil(filteredCount / limit)} onChange={onPageChange} page={page} />
                </Flex>
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
          </>
        )}

      </Section>

    </StaysWrapper>
  );
}

export default Stays;