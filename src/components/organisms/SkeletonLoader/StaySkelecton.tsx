import Skeleton, { SkeletonProps } from "@mui/material/Skeleton";
import { CSSProperties } from "react";
import { SxProps } from "@mui/system";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (min-width: 200px) {
    width: 100%;
  }

  @media (min-width: 800px) {
    width: 100%;
  }
`;

const Parent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

interface SkeletonLoaderProps extends SkeletonProps {
  tabs?: number | 1;
  textWidth?: number | string;
  textHeight?: number | string;
  text?: boolean | true;
  rectangularWidth?: number | string;
  rectangularHeight?: number | string;

  containerProps?: {
    sx?: SxProps;
    position?: string;
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    overflow?: string;
    borderRadius?: string;
  };
}

const StaySkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  tabs,
  text,
  textWidth,
  textHeight,
  rectangularHeight,
  rectangularWidth,
  containerProps,
  ...skeletonProps
}) => {
  const tabsToMap = Array.from({ length: tabs || 0 });
  return (
    <Container>
      {tabsToMap.map((_, index) => (
        <Parent key={index}>
          {text ? (
            <Skeleton
              variant="text"
              sx={{
                fontSize: "1rem",
                ...(containerProps?.sx || {}),
                ...(containerProps?.borderRadius
                  ? { style: { borderRadius: containerProps.borderRadius } }
                  : {}),
              }}
              height={textHeight || "auto"}
              width={textWidth || "auto"}
              {...skeletonProps}
            />
          ) : (
            ""
          )}
          <Skeleton
            variant="rectangular"
            height={rectangularHeight ?? "auto"}
            width={rectangularWidth}
            sx={{
              ...(containerProps?.sx || {}),
              ...(containerProps?.borderRadius
                ? { borderRadius: containerProps.borderRadius }
                : {}),
            }}
            {...skeletonProps}
          />
        </Parent>
      ))}
    </Container>
  );
};

export default StaySkeletonLoader;
