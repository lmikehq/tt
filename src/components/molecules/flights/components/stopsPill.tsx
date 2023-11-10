import Text from "@/components/atoms/text";
import { ttColors } from "@/lib/theme/colors";
import { Box } from "@mui/material";

export default function StopsPill({
    numberOfStops,
    isMobile
}: {
  numberOfStops: number;
  isMobile?: boolean;
}) {
  return (
    <Box
      borderRadius={"20px"}
      padding={"0.5rem 1rem"}
      bgcolor={ttColors.grayishAsh}
    >
      <Text type="p" size={isMobile ? 14 : 15} text={`${numberOfStops} ${numberOfStops > 1 ? 'Stops' : 'Stop'}`} weight={500} />
    </Box>
  );
}
