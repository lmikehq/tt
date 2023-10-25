import Text from "@/components/atoms/text";
import FormTitleAndSubtitle from "@/components/molecules/forms/FormTitleAndSubtitle";
import Flex from "@/components/templates/flex";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { ttColors } from "@/lib/theme/colors";
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

    return (
        <Flex gap="1rem" justify={isMobile ? "space-between" : "flex-start"} align="center" padding={isMobile ? "0 0 0 1.5rem" : "0"}>
            <Text text="Trip Summary" size={isMobile ? 20 : 20} type="h2" weight={600} />
            <Flex borderRadius="50%" background={ttColors.primary100} padding="5px" width="max-content">
                <FaPlane color={ttColors.primary600} size={isMobile ? 30 : 20} />
            </Flex>
        </Flex>
    );
};
