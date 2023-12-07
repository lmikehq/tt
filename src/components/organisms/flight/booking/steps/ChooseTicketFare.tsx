import Text from "@/components/atoms/text";
import TicketFareTable from "@/components/organisms/flights/TicketFareTable";
import Flex from "@/components/templates/flex";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { useFlightBookingStore } from "@/lib/store/flight/booking.store";
import { ttColors } from "@/lib/theme/colors";
import { Box } from "@mui/material";

const ChooseTicketFare = () => {
    const { isMobile } = useScreenResolution()

    return (
        <Box>
            <Flex direction="column" padding="1rem 0 0" margin="0 0 2rem" gap=".5rem">
                <Text type="h2" text="Choose Ticket Fare" weight={600} />
                <Text
                    type="p"
                    text="Switch to the Advanced level now to feel secure in case your plans end up changing."
                    size={isMobile ? 14 : 15}
                    color={ttColors.foundation.gray}
                />
            </Flex>

            <TicketFareTable />
        </Box>
    );
};

export default ChooseTicketFare;
