import Skeleton from "@mui/material/Skeleton";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Parent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

interface SkeletonLoader {
  tabs?: number | 1;
  textWidth: number | string;
  textHeight: number | string;
  rectangularWidth?: number | string;
  rectangularHeight: number | string;
}
const SkeletonLoader: React.FC<SkeletonLoader> = ({
  tabs,
  textWidth,
  textHeight,
  rectangularHeight,
  rectangularWidth,
}) => {
  const tabsToMap = Array.from({ length: tabs || 0 });
  return (
    <Container>
      {tabsToMap.map((_, index) => (
        <Parent key={index}>
          <Skeleton
            variant="text"
            sx={{ fontSize: "1rem" }}
            height={textHeight}
            width={textWidth}
          />
          <Skeleton
            variant="rectangular"
            height={rectangularHeight}
            width={rectangularWidth}
          />
        </Parent>
      ))}
    </Container>
  );
};

export default SkeletonLoader;
