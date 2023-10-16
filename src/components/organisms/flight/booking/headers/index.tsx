import Text from "@/components/atoms/text";
import FormTitleAndSubtitle from "@/components/molecules/forms/FormTitleAndSubtitle";
import Flex from "@/components/templates/flex";
import { ttColors } from "@/lib/theme/colors";
import { Box } from "@mui/material";

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
  return (
    <Flex gap="1rem" justify="space-between" align="center">
      <Text text="Trip Summary" type="h2" weight={600} />
      <Box
        sx={{
          background: ttColors.primary100,
          padding: "5px",
          borderRadius: "100px",
          width: "40px",
          height: "40px",
          display: "flex",
        }}
      >
        <img src="/assets/icons/airplane.svg" alt="airplane" />
      </Box>
    </Flex>
  );
};
