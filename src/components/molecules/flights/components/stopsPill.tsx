import Text from "@/components/atoms/text";
import { ttColors } from "@/lib/theme/colors";
import { Box } from "@mui/material";

export default function StopsPill({
  numberOfStops,
}: {
  numberOfStops: number;
}) {
  return (
    <Box
      borderRadius={"20px"}
      padding={"0.5rem 1rem"}
      bgcolor={ttColors.grayishAsh}
    >
      <Text type="p" text={`${numberOfStops} Stops`} />
    </Box>
  );
}
