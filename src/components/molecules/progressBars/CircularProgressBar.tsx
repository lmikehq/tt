import Text from "@atom/text";
import { styled } from "styled-components";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Center from "@components/templates/center";

interface CircularProgressBarProps {
  fontWeight?: number;
  textColor?: string;
  fontSize?: string;
  progress: number;
  progressBarColor?: string;
  size?: string;
  thickness?: number;
}

const Wrapper = styled.div`
  width: 85px;
  heigh: 85px;
`;
const CircularProgress = ({
  fontSize = "1.25rem",
  fontWeight = 600,
  textColor = "#414141",
  progress,
  progressBarColor = "#6092A7",
  size = "85px",
  thickness = 4,
}: CircularProgressBarProps) => {
  return (
    <Wrapper>
      <CircularProgressbarWithChildren
        value={progress}
        styles={buildStyles({
          // Rotation of path and trail, in number of turns (0-1)
          rotation: 0,

          strokeLinecap: "butt",

          textSize: fontSize,

          pathTransitionDuration: 0.5,

          pathColor: `rgba(96, 146, 167 ${progress / 100})`,
          textColor: textColor,
          trailColor: "#d6d6d6",
          backgroundColor: "#3e98c7",
        })}
      >
        <Center>
          <Text
            text={`${progress}`}
            size={fontSize}
            weight={fontWeight}
            type={"span"}
          />{" "}
          <Text text={`%`} size={fontSize} type={"span"} />
        </Center>
      </CircularProgressbarWithChildren>
    </Wrapper>
  );
};

export default CircularProgress;
