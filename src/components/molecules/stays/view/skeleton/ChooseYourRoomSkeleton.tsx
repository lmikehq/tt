import StaySkeletonLoader from "@/components/organisms/SkeletonLoader/StaySkelecton";
import Flex from "@/components/templates/flex";
import React from "react";
import { Span } from "../styles";
import { Grid } from "@/components/templates/grid";
import { ttColors } from "@/lib/theme/colors";

function ChooseYourRoomSkeleton() {
  return (
    <React.Fragment>
      <Span>
        <Grid columns={2} className="slider_skeleton_grid">
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
                rectangularHeight={230}
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
                  rectangularWidth="80%"
                />
                <StaySkeletonLoader
                  tabs={1}
                  text
                  textHeight={35}
                  textWidth="70%"
                />
              </Flex>
            </Flex>
            <Flex
              margin="0"
              align="center"
              justify="space-between"
              gap="10%"
              width="100%"
              styles={{ marginTop: "-30px" }}
            >
              <Flex direction="column">
                <StaySkeletonLoader
                  tabs={1}
                  rectangularHeight={40}
                  rectangularWidth="100%"
                />
              </Flex>

              <StaySkeletonLoader
                text
                tabs={1}
                textHeight={60}
                textWidth="100%"
              />
            </Flex>
          </Flex>
        </Grid>
      </Span>
    </React.Fragment>
  );
}

export default ChooseYourRoomSkeleton;
