import { ttColors } from "theme/colors";
import Text from "./text";
import { styled } from "styled-components";

interface circleProps {
  index: string;
  title: string;
  disabled: boolean;
  active: boolean;
  isPassed: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const CircleWrapper = styled.div<{ active: boolean; isPassed: boolean }>`
  position: relative;
`;

const Circle = styled.div<{
  active: boolean;
  isPassed: boolean;
  disabled: boolean;
}>`
  cursor: pointer;

  display: flex;
  width: 3rem;
  height: 3rem;
  background: ${({ isPassed }) => (isPassed ? "#6092A7" : "none")};
  border: 1px solid
    ${({ active, isPassed }) => (active || isPassed ? "#6092A7" : "gray")};
  align-items: center;
  justify-content: center;
  align-self: center;
  margin: auto;
  border-radius: 100%;

  @media (max-width: 768px) {
    width: 2rem;
    height: 2rem;
    padding: 0rem;
  }
  &:hover {
    border: 1px solid ${(props) => (!props.disabled ? "#6092A7" : "none")};
  }
`;

const CircleText = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  transform: translateX(-50%);
  margin: auto;
  @media (max-width: 768px) {
    display: none;
  }
`;

function CircleProgress({
  active,
  isPassed,
  onClick,
  disabled,
  index,
  title,
}: circleProps) {
  return (
    <CircleWrapper active={active} isPassed={isPassed} onClick={onClick}>
      <Circle active={active} isPassed={isPassed} disabled={disabled}>
        <Text
          type="p"
          weight="600"
          text={index}
          color={isPassed ? "white" : active ? "#6092A7" : ttColors.gray}
        />
      </Circle>
      <CircleText>
        <Text
          type="h5"
          weight={active ? "500" : "normal"}
          text={title}
          textAlign="center"
          margin=".5rem 0px 0px"
          size={16}
          styles={{ position: "absolute", width: "100px" }}
          color={isPassed ? "#6092A7" : "#929292"}
        />
      </CircleText>
    </CircleWrapper>
  );
}

export default CircleProgress;
