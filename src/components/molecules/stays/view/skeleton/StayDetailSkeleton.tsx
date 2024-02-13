import React from "react";
import { Span } from "../styles";
import Flex from "@/components/templates/flex";
import { ttColors } from "@/lib/theme/colors";
import StaySkeletonLoader from "@/components/organisms/SkeletonLoader/StaySkelecton";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { Box } from "@mui/material";


function StayDetailSkeleton() {
  const { isMobile } = useScreenResolution();

  return (
    <React.Fragment>
      <Span>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: isMobile ? "100%" : "65% auto",
            gap: "30px",
          }}
        >
          <Flex direction="column" width="100%">
            <Flex align="center" justify="space-between">
              <StaySkeletonLoader
                tabs={1}
                rectangularHeight={30}
                rectangularWidth="60%"
              />
              <Flex justify="flex-end" width="27px" styles={{ float: "right" }}>
                <StaySkeletonLoader tabs={1} text textHeight={40} />
              </Flex>
            </Flex>
            <Flex>
              {" "}
              <StaySkeletonLoader
                tabs={1}
                text
                textHeight={30}
                textWidth="100%"
              />
            </Flex>
            <Flex justify="space-between">
              <Flex justify="space-between" gap="20px">
                <StaySkeletonLoader
                  tabs={1}
                  text
                  textHeight={30}
                  textWidth="100%"
                />
                <StaySkeletonLoader
                  tabs={1}
                  text
                  textHeight={30}
                  textWidth="100%"
                />
              </Flex>
              <Flex></Flex>
            </Flex>
            <Flex margin="15px 0px" justify="space-between">
              <StaySkeletonLoader
                tabs={1}
                rectangularHeight={30}
                rectangularWidth="50%"
              />
              <StaySkeletonLoader
                tabs={1}
                rectangularHeight={30}
                rectangularWidth="100%"
              />
            </Flex>
            <Flex styles={{ marginTop: "15px" }}>
              <StaySkeletonLoader
                text
                tabs={1}
                textHeight={35}
                textWidth="35%"
              />
            </Flex>
            <Flex direction="column" margin="10px 0px">
              <Flex margin="15px 0px" gap="20%" justify="space-between">
                <StaySkeletonLoader
                  tabs={1}
                  rectangularHeight={25}
                  rectangularWidth="100%"
                />
                <StaySkeletonLoader
                  tabs={1}
                  rectangularHeight={25}
                  rectangularWidth="100%"
                />
              </Flex>
              <Flex margin="15px 0px" gap="20%" justify="space-between">
                <StaySkeletonLoader
                  tabs={1}
                  rectangularHeight={25}
                  rectangularWidth="100%"
                />
                <StaySkeletonLoader
                  tabs={1}
                  rectangularHeight={25}
                  rectangularWidth="100%"
                />
              </Flex>
              <Flex margin="15px 0px" gap="20%" justify="space-between">
                <StaySkeletonLoader
                  tabs={1}
                  rectangularHeight={25}
                  rectangularWidth="100%"
                />
                <StaySkeletonLoader
                  tabs={1}
                  rectangularHeight={25}
                  rectangularWidth="100%"
                />
              </Flex>
            </Flex>
            <Flex>
              <StaySkeletonLoader
                text
                tabs={1}
                textHeight={35}
                textWidth="20%"
              />
            </Flex>
          </Flex>
          <Flex
            width="100%"
            direction="column"
            background={ttColors.light}
            borderRadius="10px"
            gap="20px"
            styles={{ marginBottom: "20px" }}
            overflow="hidden"
          >
            {/* Left Side with Image and Favorite Icon */}
            <Flex
              width="100%"
              className="top_side"
              position="relative"
              overflow="hidden"
            >
              <StaySkeletonLoader
                tabs={1}
                textWidth="50%"
                rectangularHeight={200}
                rectangularWidth="100%"
                containerProps={{
                  sx: { borderRadius: "12px" },
                }}
              />
            </Flex>
            <Flex>
              <Flex direction="column">
                <StaySkeletonLoader
                  tabs={1}
                  rectangularHeight={40}
                  rectangularWidth="100%"
                />
                <StaySkeletonLoader
                  tabs={1}
                  text
                  textHeight={35}
                  textWidth="60%"
                />
              </Flex>
            </Flex>
            <Flex margin="0" width="100%" styles={{ marginTop: "-30px" }}>
              <StaySkeletonLoader
                text
                tabs={1}
                textHeight={45}
                textWidth="75%"
              />
            </Flex>
          </Flex>
        </Box>
      </Span>
    </React.Fragment>
  );
}

export default StayDetailSkeleton;
