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
  display: inline-block;
  &::after {
    content: "";
    position: absolute;
    width: 62%;
    top: 20%;
    left: 67.5%;
    opacity: ${(props) => (props.active ? "1" : "0.7")};
    border: 1px solid ${(props) => (props.isPassed ? "#6092A7" : "gray")};
  }
  &:last-child::after {
    display: none;
  }
  cursor: pointer;
  /* Responsive Styles */
  @media (max-width: 1024px) {
    width
  }

 @media (max-width:1280px) {
    &::after {
      left: 70%;
      width: 58%;
    }
 }

`;

const Container = styled.div<{ active: boolean; isPassed: boolean }>`
  display: inline-block;
  text-align: center;
  margin: 0 25px;
  color: ${(props) => (props.active || props.isPassed ? "#6092A7" : "gray")};
  opacity: ${(props) => (props.active || props.isPassed ? "1" : "0.7")};

  @media (max-width: 1440px) {
    @media (min-width: 1280px) {
      margin: 0 7.5px;
    }
  }

  @media (max-width: 1280px) {
    margin: 0;
  }
`;

const Circle = styled.span<{
  active: boolean;
  isPassed: boolean;
  disabled: boolean;
}>`
  display: flex;
  width: 1.5rem;
  height: 1.5rem;
  background: ${(props) => (props.isPassed ? "#6092A7" : "none")};
  border: 2px solid
    ${(props) => (props.active || props.isPassed ? "#6092A7" : "gray")};
  padding: 1.25rem;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border-radius: 100%;
  z-index: 9;
  position: relative;
  @media (max-width: 768px) {
    width: 2rem;
    height: 2rem;
    padding: 0rem;
  }
  &:hover {
    border: 2px solid ${(props) => (!props.disabled ? "#6092A7" : "none")};
  }
`;

const CircleText = styled.span`
  width: 100px;
  display: flex;
  @media (max-width: 768px) {
    display: none;
  }
`;

function CircleProgress(props: circleProps) {
  return (
    <CircleWrapper
      active={props.active}
      isPassed={props.isPassed}
      onClick={props.onClick}
    >
      <Container
        active={props.active}
        isPassed={props.isPassed}
        onClick={props.onClick}
      >
        <Circle
          active={props.active}
          isPassed={props.isPassed}
          disabled={props.disabled}
        >
          <Text
            type="p"
            weight="bold"
            text={props.index}
            color={
              props.isPassed
                ? "white"
                : props.active
                ? "#6092A7"
                : ttColors.gray
            }
          />
        </Circle>
        <CircleText>
          <Text
            type="h5"
            weight={props.active ? "500" : "normal"}
            text={props.title}
            textAlign="center"
            margin=".5rem 0px 0px"
            size={16}
            // color={
            //   props.isPassed
            //     ? ttColors.gray
            //     : props.active
            //     ? ttColors.primary
            //     : "#929292"
            // }
          />
        </CircleText>
      </Container>
    </CircleWrapper>
  );
}

export default CircleProgress;
