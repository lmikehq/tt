import Button from "@/components/atoms/button";
import Text from "@/components/atoms/text";
import FormTitleAndSubtitle from "@/components/molecules/forms/FormTitleAndSubtitle";
import Flex from "@/components/templates/flex";
import { FlightContext, OneFlightType } from "@/lib/extensions/context";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { ttColors } from "@/lib/theme/colors";
import { formatDate } from "@/lib/utilFns";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { FaPlane } from "react-icons/fa6";

export const OverviewHeader = () => {
  return (
    <FormTitleAndSubtitle
      title={"Trip Overview & Payment"}
      subTitle={"Make payment for your flight booking"}
    />
  );
};

export const SeatHeader = () => {
  return (
    <FormTitleAndSubtitle
      title={"Seat Selection"}
      subTitle={"Select a seat of your choice"}
    />
  );
};

export const TripHeader = () => {
    const { isMobile } = useScreenResolution()
    const { push } = useRouter()
    const flightContext = useContext(FlightContext)
    const flightState = flightContext?.state

    const formatSearchFlight = (flight?: OneFlightType) => {
		const dateFrom = formatDate(flight?.departureDate ?? dayjs());
		const dateTo = formatDate(flight?.returnDate ?? dayjs());
		const departure = flight?.departureCountry
		const arrival = flight?.arrivalCountry
		return `/flight/listings?fly_from=${departure?.code}&fly_to=${arrival?.code}&date_from=${dateFrom}&date_to=${dateTo}`
    }

    return (
        <Flex direction="column" gap="1.5rem">
            <Flex gap="1rem" justify={isMobile ? "space-between" : "flex-start"} align="center" padding={isMobile ? "0" : "0"}>
                <Text text="Trip Summary" size={isMobile ? 18 : 22} type="h2" weight={600} />
                <Flex borderRadius="50%" background={ttColors.primary100} padding="5px" width="max-content">
                    <FaPlane color={ttColors.primary600} size={isMobile ? 30 : 20} />
                </Flex>
            </Flex>
            {/* {isMobile &&
                <Button
                    width="200px"
                    color={ttColors.dark}
                    onClick={() => push(formatSearchFlight(flightState?.fleet[0]))}
                    variant="outline"
                    styles={{ fontSize: isMobile ? "14px" : "14px" }}
                >
                    Change Flight
                </Button>
            } */}
        </Flex>
    );
};
