import Text from "@/components/atoms/text";
import SimplePopper from "@/components/organisms/SimplePopper/SimplePopper";
import Flex from "@/components/templates/flex";
import { ttColors } from "@/lib/theme/colors";
import { Box } from "@mui/material";
import { ReactElement, useState } from "react";

export default function StopsPill({
    numberOfStops,
    isMobile,
    popperContent
}: {
  numberOfStops: number;
    isMobile?: boolean;
    popperContent?: ReactElement;
    }) {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleHover = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    return (
        <Flex width="fit-content">
            <Box
                borderRadius={"20px"}
                padding={"0.5rem 1rem"}
                bgcolor={ttColors.grayishAsh}
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}
            >
                <Text type="p" size={isMobile ? 14 : 15} text={`${numberOfStops} ${numberOfStops > 1 ? 'Stops' : 'Stop'}`} weight={500} />
            </Box>
            {popperContent &&
                <SimplePopper open={open} anchorEl={anchorEl}>
                    <Box sx={{ borderRadius: '5px', bgcolor: ttColors.darkBg, color: 'white' }}>
                        {popperContent}
                    </Box>
                </SimplePopper>
            }
        </Flex>
  );
}
