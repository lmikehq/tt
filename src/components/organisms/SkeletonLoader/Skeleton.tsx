import Skeleton from "@mui/material/Skeleton";
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

interface SkeletonLoader {
  tabs?: number | 1;
  textWidth?: number | string;
  textHeight?: number | string;
  rectangularWidth?: number | string;
  rectangularHeight: number | string;
  text?: boolean | true;
}
const SkeletonLoader: React.FC<SkeletonLoader> = ({
  tabs,
  text,
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
          {text ? (
            <Skeleton
              variant="text"
              sx={{ fontSize: "1rem" }}
              height={textHeight || "auto"}
              width={textWidth || "auto"}
            />
          ) : (
            ""
          )}
          <Skeleton
            variant="rectangular"
            height={rectangularHeight ?? "auto"}
            width={rectangularWidth}
            // maxWidth={rectangularWidth ?? 800}
          />
        </Parent>
      ))}
    </Container>
  );
};

export default SkeletonLoader;
