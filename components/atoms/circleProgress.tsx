import { ttColors } from "theme/colors";
import Text from "./text";
import { styled } from "styled-components";

interface circleProps {
  index: string;
  title: string;
  active: boolean;
  isPassed: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const CircleWrapper = styled.div<{ active: boolean, isPassed: boolean }>`
  position: relative;
  display: inline-block;
 &::after {
  content: "";
  position: absolute;
  width: 70%;
  top: 25%;
  left: 64%;
  opacity: ${props => (props.active ? "1" : "0.7")};
  border: 1px solid ${props => (props.isPassed ? "#6092A7" : "gray")};
 }
 &:last-child::after {
  display: none;
 }
`;

const Container = styled.div<{ active: boolean, isPassed: boolean }>`
  display: inline-block;
  text-align: center;
  margin: 0 25px;
  color: ${props => (props.active || props.isPassed ? "#6092A7" : "gray")};
  opacity: ${props => (props.active || props.isPassed ? "1" : "0.7")};
`;

const Circle = styled.span<{ active: boolean, isPassed: boolean }>`
  display: flex;
  width: 1.5rem;
  height: 1.5rem;
  background: ${props => (props.isPassed ? "#6092A7" : "none")};
  border: 2px solid ${props => (props.active || props.isPassed ? "#6092A7" : "gray")};
  padding: 1.25rem;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border-radius: 100%;
  z-index: 9;
  position: relative;
`;

const CircleText = styled.span`
 width: 100px;
 display: flex;
`

function CircleProgress(props: circleProps) {
  return (
    <CircleWrapper active={props.active} isPassed={props.isPassed}>
      <Container active={props.active} isPassed={props.isPassed}>
        <Circle active={props.active} isPassed={props.isPassed}>
          <Text type="p" weight="bold" text={props.index} color={props.isPassed ? "white" : (props.active ? "#6092A7" : ttColors.gray)} />
        </Circle>
        <CircleText>
          <Text type="h5" weight={props.active ? "bold" : "normal"} text={props.title} textAlign="center" />
        </CircleText>
      </Container>
    </CircleWrapper>
  );
}

export default CircleProgress;
