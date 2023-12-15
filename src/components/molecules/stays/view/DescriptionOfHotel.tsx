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
import OutletIcon from "@mui/icons-material/Outlet";
import { ttColors } from "@/lib/theme/colors";
import { ViewSingleStayResponse } from "@/lib/types/response-models/stay/search.type";

export const BootstrapTooltip = styled(
  ({ className, ...props }: TooltipProps) => (
    <Tooltip
      placement="top-start"
      {...props}
      arrow
      classes={{ popper: className }}
    />
  )
)(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

interface ExpandableTextProps {
  text: string | string[];
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
    color: ttColors.foundation.gray,
    fontSize: '14px',
    marginBottom: '.5rem'
  };

  return (
      <div>
          {Array.isArray(text) ? text.map((t, index, arr) => 
            <p style={textStyle} ref={index === arr.length - 1 ? textRef : undefined} key={`txt-${index}`}>
                {t}
            </p>
          ) : (
            <p style={textStyle} ref={textRef}>
                {text}
            </p>  
        )}

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


interface DescriptionOfHotelProps {
    stayResponse: ViewSingleStayResponse;
}

const DescriptionOfHotel = ({ stayResponse }: DescriptionOfHotelProps) => {
    const { isMobile } = useScreenResolution();
    
    const facts = {
        constructYear: String(stayResponse.facts.year_built) ?? null,
        renovateYear: String(stayResponse.facts.year_renovated) ?? null,
        roomsNumber: String(stayResponse.facts.rooms_number) ?? null,
        floorsNumber: String(stayResponse.facts.floors_number) ?? null,
        electricity: stayResponse.facts.electricity?.voltage ? stayResponse.facts.electricity : null
    }

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
            {/* <Span style={{ marginBottom: "25px" }}>
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
            </Span> */}
            {stayResponse.description_struct.map((desc, index) => 
                <Span key={`desc-${index}`} style={{ display: 'flex', flexDirection: 'column', margin: '0 0 1rem' }}>
                    <Flex gap="10px" align="center" styles={{ marginBottom: "10px" }}>
                        <BedIcon style={{ fontSize: "19px" }} />
                        <Text type="h5" weight={"bold"} size={15} text={desc.title}></Text>
                    </Flex>
                    <ExpandableTextTag
                        text={desc.paragraphs}
                        maxLines={5}
                    />
                </Span>
            )}
          </Span>
          <Span>
            <Flex direction="column">
            <Text
                type="h4"
                weight={"bold"}
                text="Facts about the Hotel"
            />
            {facts.constructYear && 
              <Flex direction="column" styles={{ margin: "10px 0px" }}>
                <Text
                  type="p"
                  size={14}
                  color="var(--text-gray-color)"
                  text="Year of construction"
                ></Text>
                <Text type="h5" weight={"bold"} text={facts.constructYear}></Text>
              </Flex>
            }
            {facts.renovateYear && 
                <Flex direction="column" styles={{ margin: "10px 0px" }}>
                    <Text
                    type="p"
                    size={14}
                    color="var(--text-gray-color)"
                    text="Year of renovation"
                    ></Text>
                    <Text type="h5" weight={"bold"} text={facts.renovateYear}></Text>
                </Flex>
            }
              <Flex direction="column" styles={{ margin: "10px 0px" }}>
                <Flex align="center" gap="8px" styles={{ marginBottom: "5px" }}>
                  <Text
                    type="p"
                    size={14}
                    color="var(--text-gray-color)"
                    text="Socket Type"
                  ></Text>
                  <BootstrapTooltip
                    title={<OutletIcon style={{ color: "white" }} />}
                  >
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
