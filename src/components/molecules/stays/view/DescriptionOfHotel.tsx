import Flex from "@/components/templates/flex";
import { Container, GridLayout, Header, Span } from "./styles";
import Text from "@/components/atoms/text";
import PinDropIcon from "@mui/icons-material/PinDrop";
import BedIcon from "@mui/icons-material/Bed";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";


export const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

interface ExpandableTextProps {
  text: string;
  maxLines: number;
}

//=============================
// EXPANDABLE DESCRIPTION COMPONENT
//=============================
export const ExpandableTextTag: React.FC<ExpandableTextProps> = ({
  text,
  maxLines,
}) => {
  const [expanded, setExpanded] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const isOverflowed = textRef.current
      ? (textRef.current.scrollHeight ?? 0) >
        (textRef.current.clientHeight ?? 0)
      : false;

    const numberOfLines = textRef.current
      ? Math.floor(
          textRef.current.clientHeight /
            parseFloat(getComputedStyle(textRef.current).lineHeight)
        )
      : 0;

    if (!isOverflowed || numberOfLines <= maxLines) {
      setExpanded(true);
    }
  }, [text, maxLines]);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const hideText = () => {
    setExpanded(false);
  };

  const textStyle: React.CSSProperties = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    whiteSpace: "pre-line",
    WebkitLineClamp: expanded ? "unset" : maxLines,
  };

  return (
    <div>
      <p style={textStyle} ref={textRef}>
        {text}
      </p>

      {!expanded && (
        <Flex
          align="center"
          gap="5px"
          cursor="pointer"
          styles={{ color: "#7bbbd6" }}
          onClick={toggleExpansion}
        >
          <KeyboardArrowDownIcon />
          <Text type="p" size={13} text="Show Description"></Text>
        </Flex>
      )}
      {expanded && (
        <Flex onClick={hideText}>
          {(textRef.current?.scrollHeight ?? 0) >
          (textRef.current?.clientHeight ?? 0) ? (
            <Flex
              onClick={hideText}
              gap="5px"
              align="center"
              cursor="pointer"
              styles={{ color: "#7bbbd6" }}
            >
              <KeyboardArrowUpIcon />
              <Text type="p" size={13} text="Hide Description"></Text>
            </Flex>
          ) : (
            ""
          )}
        </Flex>
      )}
    </div>
  );
};
const DescriptionOfHotel = () => {
  const { isMobile } = useScreenResolution();

  return (
    <>
      <Container style={{ width: "100%" }}>
        <Header
          id="descriptions"
          style={{ width: "100%", marginBottom: "30px" }}
        >
          <Flex direction="column">
            <Text
              type="h4"
              size={17}
              text="Description of the Hotel"
              weight={600}
              styles={{
                whiteSpace: "nowrap",
                textOverflow: "unset",
                width: "100%",
                marginBottom: "10px",
              }}
            ></Text>
            <Text
              type="p"
              size={14}
              color="var(--text-gray-color)"
              text="Discover all you need to know about the hotel"
            ></Text>
          </Flex>
        </Header>
        <GridLayout className="description_grid">
          <Span>
            <Span style={{ marginBottom: "25px" }}>
              <Flex gap="10px" align="center" styles={{ marginBottom: "10px" }}>
                <PinDropIcon style={{ fontSize: "19px" }} />
                <Text
                  type="h5"
                  weight={"bold"}
                  size={15}
                  text="Location"
                ></Text>
              </Flex>
              <Text
                type="p"
                size={14}
                color="var(--text-gray-color)"
                text="Want to take a rest and explore the city? Hotel «New York Marriott Marquis» is located in New York. This hotel is located in 3 km from the city center. You can take a walk and explore the neighbourhood area of the hotel — Broadway, Times Square and Times Square – 42nd Street."
              ></Text>
            </Span>
            <Span>
              <Flex gap="10px" align="center" styles={{ marginBottom: "10px" }}>
                <BedIcon style={{ fontSize: "19px" }} />
                <Text type="h5" weight={"bold"} size={15} text="Hotel"></Text>
              </Flex>
              <ExpandableTextTag
                text="You can stop by the bar. You can stop by the restaurant. Have a cup of coffee in the cafe and, who knows, maybe it’s going to be the best one in the city. Want to be always on-line? Wi-Fi is available. If you travel by car, there’s a paid parking zone at the hotel. The following services are also available for the guests: a massage room, a spa center and a recreation club. Guests who love doing sports will be able to enjoy a fitness center and a gym. To book an excursion, consult the tour assistance desk of the hotel."
                maxLines={4}
              />
            </Span>
          </Span>
          <Span>
            <Flex direction="column">
              <Text
                type="h4"
                weight={"bold"}
                text="Facts about the Hotel"
              ></Text>
              <Flex direction="column" styles={{ margin: "10px 0px" }}>
                <Text
                  type="p"
                  size={14}
                  color="var(--text-gray-color)"
                  text="Year of construction"
                ></Text>
                <Text type="h5" weight={"bold"} text={`${2001}`}></Text>
              </Flex>
              <Flex direction="column" styles={{ margin: "10px 0px" }}>
                <Text
                  type="p"
                  size={14}
                  color="var(--text-gray-color)"
                  text="Year of renovation"
                ></Text>
                <Text type="h5" weight={"bold"} text={`${2020}`}></Text>
              </Flex>
              <Flex direction="column" styles={{ margin: "10px 0px" }}>
                <Flex align="center" gap="8px" styles={{ marginBottom: "5px" }}>
                  <Text
                    type="p"
                    size={14}
                    color="var(--text-gray-color)"
                    text="Socket Type"
                  ></Text>
                  <BootstrapTooltip title="Add">
                    <ErrorOutlineOutlinedIcon
                      style={{
                        fontSize: "19px",
                        color: "var(--text-gray-color)",
                      }}
                    />
                  </BootstrapTooltip>
                </Flex>
                <Text
                  type="h5"
                  weight={"bold"}
                  text="North American 120 V / 60 Hz"
                ></Text>
                <Text
                  type="h5"
                  weight={"bold"}
                  styles={{ marginTop: "10px" }}
                  text="North American (grounded) 120 V / 60 Hz"
                ></Text>
              </Flex>
              <Flex direction="column" styles={{ margin: "10px 0px" }}>
                <Text
                  type="p"
                  size={14}
                  color="var(--text-gray-color)"
                  text="Rooms and floors number"
                ></Text>
                <Text
                  type="h5"
                  weight={"bold"}
                  text="1957 rooms 49 floors"
                ></Text>
              </Flex>
            </Flex>
          </Span>
        </GridLayout>
      </Container>
    </>
  );
};

export default DescriptionOfHotel;
