import Flex from "@/components/templates/flex";
import {
  BtnText,
  ButtonBtn,
  Container,
  Content,
  GridBox,
  Header,
  ProgressBars,
  ReviewHeader,
  ReviewList,
  ReviewsText,
  Span,
} from "./styles";
import Text from "@/components/atoms/text";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { ttColors } from "@/lib/theme/colors";
import { LineProgressBar } from "@frogress/line";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Pagination } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { styled as muiStyled } from "@mui/material/styles";
import { Rating } from "@mui/material";
import styled from "styled-components";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import Image from "@/components/atoms/image";
import { ReviewModal } from "./modals/Modals";
import Dropdown from "@/components/organisms/dropdown";
import Select from "react-select";

const StyledRating = muiStyled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "var(--color-green)",
  },
  "& .MuiRating-iconHover": {
    color: "var(--color-green)",
  },
});

interface ExpandableTextProps {
  text: string;
  maxLines: number;
  commentDate?: string;
  stayedIn?: string;
}

//=============================
// EXPANDABLE COMMENT COMPONENT
//=============================
export const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
  maxLines,
  commentDate,
  stayedIn,
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

      <ul style={{ fontSize: "13px", margin: "15px 0px" }}>
        <Flex gap="30px">
          <li style={{ listStyle: "none" }}>
            <Text type="p" text={`Comment: ${commentDate}`}></Text>
          </li>
          <li style={{ listStyle: "" }}>
            <Text type="p" text={`Stayed in: ${stayedIn}`}></Text>
          </li>
        </Flex>
      </ul>
      {!expanded && (
        <Flex
          align="center"
          gap="5px"
          cursor="pointer"
          styles={{ color: "#7bbbd6" }}
          onClick={toggleExpansion}
        >
          <KeyboardArrowDownIcon />
          <Text type="p" size={13} text="Show Review"></Text>
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
              <Text type="p" size={13} text="Hide Review"></Text>
            </Flex>
          ) : (
            ""
          )}
        </Flex>
      )}
    </div>
  );
};

interface Reviews {
  name: string;
  rating: number;
  title: string;
  comment: string;
  cleanliness: number;
  service: number;
  sleepQuality: number;
  value: number;
  location: number;
  commentDate: string;
  stayedIn: string;
  rooms: number;
}

const reviews: Reviews[] = [
  {
    name: "Kenneth Angela",
    rating: 3,
    title: "Wonderful Stay in the Lake Side",
    cleanliness: 2,
    service: 3,
    sleepQuality: 4,
    value: 5,
    location: 5,
    rooms: 1,
    commentDate: "2023-11-12T14:18:31.520+00:00",
    stayedIn: "2023-11-12T14:18:31.520+00:00",
    comment:
      "This hotel would have been a 5 if only there were tea/coffee making facilities. The bed was the comfiest I’ve ever had away from home. Very central for all the attractions and the customer service desk was excellent, particularly Christian who was very helpful This hotel would have been a 5 if only there were tea/coffee making facilities. The bed was the comfiest I’ve ever had away from home. Very central for all the attractions and the customer service desk was excellent, particularly Christian who was very helpful",
  },
  {
    name: "Kenneth Angela",
    rating: 4,
    title: "Wonderful Stay in the Lake Side",
    cleanliness: 3,
    service: 4,
    sleepQuality: 6,
    value: 8,
    location: 8,
    rooms: 9,
    commentDate: "2023-11-12T14:18:31.520+00:00",
    stayedIn: "2023-11-12T14:18:31.520+00:00",
    comment:
      "This hotel would have been a 5 if only there were tea/coffee making facilities. The bed was the comfiest I’ve ever had away from home. Very central for all the attractions and the customer service desk was excellent, particularly Christian who was very helpful",
  },
  {
    name: "Kenneth Angela",
    rating: 2,
    title: "Wonderful Stay in the Lake Side",
    cleanliness: 8,
    service: 7,
    sleepQuality: 6,
    value: 5,
    location: 4,
    rooms: 2,
    commentDate: "2023-11-12T14:18:31.520+00:00",
    stayedIn: "2023-11-12T14:18:31.520+00:00",
    comment: "This hotel would have been a 5 if only there were tea/coffee",
  },
  {
    name: "Kenneth Angela",
    rating: 1,
    title: "Wonderful Stay in the Lake Side",
    cleanliness: 5,
    service: 8,
    sleepQuality: 1,
    value: 2,
    location: 5,
    rooms: 3,
    commentDate: "2023-11-12T14:18:31.520+00:00",
    stayedIn: "2023-11-12T14:18:31.520+00:00",
    comment:
      "This hotel would have been a 5 if only there were tea/coffee making facilities. The bed was the comfiest I’ve ever had away from home. Very central for all the attractions and the customer service desk was excellent, particularly Christian who was very helpful",
  },
  {
    name: "Kenneth Angela",
    rating: 1,
    title: "Wonderful Stay in the Lake Side",
    cleanliness: 5,
    service: 8,
    sleepQuality: 1,
    value: 2,
    location: 5,
    rooms: 3,
    commentDate: "2023-11-12T14:18:31.520+00:00",
    stayedIn: "2023-11-12T14:18:31.520+00:00",
    comment:
      "This hotel would have been a 5 if only there were tea/coffee making facilities. The bed was the comfiest I’ve ever had away from home. Very central for all the attractions and the customer service desk was excellent, particularly Christian who was very helpful",
  },
  {
    name: "Tunji Akande",
    rating: 3,
    title: "Wonderful Stay in the Lake Side",
    cleanliness: 5,
    service: 8,
    sleepQuality: 1,
    value: 2,
    location: 5,
    rooms: 3,
    commentDate: "2023-11-12T14:18:31.520+00:00",
    stayedIn: "2023-11-12T14:18:31.520+00:00",
    comment:
      "This hotel would have been a 5 if only there were tea/coffee making facilities. The bed was the comfiest I’ve ever had away from home. Very central for all the attractions and the customer service desk was excellent, particularly Christian who was very helpful",
  },
  {
    name: "Kenneth Angela",
    rating: 3,
    title: "Wonderful Stay in the Lake Side",
    cleanliness: 2,
    service: 3,
    sleepQuality: 4,
    value: 5,
    location: 5,
    rooms: 1,
    commentDate: "2023-11-12T14:18:31.520+00:00",
    stayedIn: "2023-11-12T14:18:31.520+00:00",
    comment:
      "This hotel would have been a 5 if only there were tea/coffee making facilities. The bed was the comfiest I’ve ever had away from home. Very central for all the attractions and the customer service desk was excellent, particularly Christian who was very helpful This hotel would have been a 5 if only there were tea/coffee making facilities. The bed was the comfiest I’ve ever had away from home. Very central for all the attractions and the customer service desk was excellent, particularly Christian who was very helpful",
  },
  {
    name: "Kenneth Angela",
    rating: 4,
    title: "Wonderful Stay in the Lake Side",
    cleanliness: 3,
    service: 4,
    sleepQuality: 6,
    value: 8,
    location: 8,
    rooms: 9,
    commentDate: "2023-11-12T14:18:31.520+00:00",
    stayedIn: "2023-11-12T14:18:31.520+00:00",
    comment:
      "This hotel would have been a 5 if only there were tea/coffee making facilities. The bed was the comfiest I’ve ever had away from home. Very central for all the attractions and the customer service desk was excellent, particularly Christian who was very helpful",
  },
  {
    name: "Kenneth Angela",
    rating: 2,
    title: "Wonderful Stay in the Lake Side",
    cleanliness: 8,
    service: 7,
    sleepQuality: 6,
    value: 5,
    location: 4,
    rooms: 2,
    commentDate: "2023-11-12T14:18:31.520+00:00",
    stayedIn: "2023-11-12T14:18:31.520+00:00",
    comment: "This hotel would have been a 5 if only there were tea/coffee",
  },
  {
    name: "Kenneth Angela",
    rating: 1,
    title: "Wonderful Stay in the Lake Side",
    cleanliness: 5,
    service: 8,
    sleepQuality: 1,
    value: 2,
    location: 5,
    rooms: 3,
    commentDate: "2023-11-12T14:18:31.520+00:00",
    stayedIn: "2023-11-12T14:18:31.520+00:00",
    comment:
      "This hotel would have been a 5 if only there were tea/coffee making facilities. The bed was the comfiest I’ve ever had away from home. Very central for all the attractions and the customer service desk was excellent, particularly Christian who was very helpful",
  },
  {
    name: "Kenneth Angela",
    rating: 1,
    title: "Wonderful Stay in the Lake Side",
    cleanliness: 5,
    service: 8,
    sleepQuality: 1,
    value: 2,
    location: 5,
    rooms: 3,
    commentDate: "2023-11-12T14:18:31.520+00:00",
    stayedIn: "2023-11-12T14:18:31.520+00:00",
    comment:
      "This hotel would have been a 5 if only there were tea/coffee making facilities. The bed was the comfiest I’ve ever had away from home. Very central for all the attractions and the customer service desk was excellent, particularly Christian who was very helpful",
  },
  {
    name: "Tunji Akande",
    rating: 3,
    title: "Wonderful Stay in the Lake Side",
    cleanliness: 5,
    service: 8,
    sleepQuality: 1,
    value: 2,
    location: 5,
    rooms: 3,
    commentDate: "2023-11-12T14:18:31.520+00:00",
    stayedIn: "2023-11-12T14:18:31.520+00:00",
    comment:
      "This hotel would have been a 5 if only there were tea/coffee making facilities. The bed was the comfiest I’ve ever had away from home. Very central for all the attractions and the customer service desk was excellent, particularly Christian who was very helpful",
  },
];

const HotelReviews = () => {
  const { isMobile } = useScreenResolution();

  // FILTERS
  const [filters, setFilters] = useState("recommended");
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  //=====================
  // HIDE AND SHOW REVIEW
  //=====================
  const [hiddenReviews, setHiddenReviews] = useState<number[]>([]);
  const toggleReviewVisibility = (index: number) => {
    if (hiddenReviews.includes(index)) {
      setHiddenReviews(hiddenReviews.filter((i) => i !== index));
    } else {
      setHiddenReviews([...hiddenReviews, index]);
    }
  };

  //==================
  // PERCENTAGE & SUM
  //==================
  //RATING
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;
  const displayRating =
    averageRating > 5 ? averageRating.toFixed(2) : averageRating.toFixed(1);
  const displayRatingNumber: number = parseFloat(displayRating);

  const [open, setOpen] = useState({
    review: false,
  });

  return (
    <>
      <Container>
        <Header style={{ width: "100%", marginBottom: "30px" }}>
          <Flex
            justify="space-between"
            align="center"
            className="review_header"
          >
            <Text
              type="h4"
              text="Hotel Reviews"
              weight={600}
              styles={{
                whiteSpace: "nowrap",
                textOverflow: "unset",
                width: "100%",
              }}
            ></Text>
            <Flex
              styles={{ gap: "10px" }}
              className="flex_start"
              justify="flex-end"
              align="center"
            >
              <Text
                type="p"
                text="Sort by"
                whiteSpace="nowrap"
                size={14}
                styles={{
                  whiteSpace: "nowrap",
                  textOverflow: "unset",
                }}
              ></Text>
              <Select className="react_select" options={options} />
            </Flex>
          </Flex>
        </Header>
        <GridBox>
          <Flex direction="column">
            <Text
              type="h5"
              whiteSpace="nowrap"
              weight={600}
              text="from TripAdvisor"
              styles={{ marginBottom: "15px" }}
            ></Text>
            <Flex gap="20px" align="center" className="rating_flex_wrap">
              <Text
                type="h2"
                text={`${displayRating}`}
                weight={"bold"}
                size={35}
                whiteSpace="nowrap"
              ></Text>
              <ReviewsText>
                <Flex align="center" gap="10px">
                  <Flex>
                    <Image
                      alt="location"
                      src={"/assets/icons/stay/view/view_camera_icon.svg"}
                      width={24}
                      height={24}
                    />
                  </Flex>
                  <Flex direction="column">
                    <StyledRating
                      name="customized-color"
                      defaultValue={displayRatingNumber}
                      getLabelText={(value: number) =>
                        `${value} Heart${value !== 1 ? "s" : ""}`
                      }
                      readOnly
                      precision={0.5}
                      icon={<CircleIcon fontSize="inherit" />}
                      emptyIcon={<CircleOutlinedIcon fontSize="inherit" />}
                      style={{
                        fontSize: "15px",
                      }}
                    />
                    <Text
                      whiteSpace="nowrap"
                      type="p"
                      text={`${reviews.length} reviews`}
                    ></Text>
                  </Flex>
                </Flex>
              </ReviewsText>
            </Flex>
          </Flex>
          <ProgressBars>
            <Flex direction="column">
              <Flex justify="space-between">
                <Text type="p" text="Cleanliness" size={13}></Text>
                <Text type="p" weight={600} size={13} text={`${55}%`}></Text>
              </Flex>
              <LineProgressBar
                percent={55}
                rounded={36}
                className="LineProgressBar"
                height={8}
                progressColor={ttColors.primary}
              />
            </Flex>
            <Flex direction="column">
              <Flex justify="space-between">
                <Text type="p" text="Service" size={13}></Text>
                <Text type="p" weight={600} size={13} text={`${68}%`}></Text>
              </Flex>
              <LineProgressBar
                percent={68}
                rounded={36}
                className="LineProgressBar"
                height={8}
                progressColor={ttColors.primary}
              />
            </Flex>
            <Flex direction="column">
              <Flex justify="space-between">
                <Text type="p" text="Sleep Quality" size={13}></Text>
                <Text type="p" weight={600} size={13} text={`${20}%`}></Text>
              </Flex>
              <LineProgressBar
                percent={20}
                rounded={36}
                className="LineProgressBar"
                height={8}
                progressColor={ttColors.primary}
              />
            </Flex>
            <Flex direction="column">
              <Flex justify="space-between">
                <Text type="p" text="Value" size={13}></Text>
                <Text type="p" weight={600} size={13} text={`${35}%`}></Text>
              </Flex>
              <LineProgressBar
                percent={35}
                rounded={36}
                className="LineProgressBar"
                height={8}
                progressColor={ttColors.primary}
              />
            </Flex>
            <Flex direction="column">
              <Flex justify="space-between">
                <Text type="p" text="Location" size={13}></Text>
                <Text type="p" weight={600} size={13} text={`${45}%`}></Text>
              </Flex>
              <LineProgressBar
                percent={45}
                rounded={36}
                className="LineProgressBar"
                height={8}
                progressColor={ttColors.primary}
              />
            </Flex>
            <Flex direction="column">
              <Flex justify="space-between">
                <Text type="p" text="Rooms" size={13}></Text>
                <Text type="p" weight={600} size={13} text={`${80}%`}></Text>
              </Flex>
              <LineProgressBar
                percent={80}
                rounded={36}
                className="LineProgressBar"
                height={8}
                progressColor={ttColors.primary}
              />
            </Flex>
          </ProgressBars>
        </GridBox>
        <ReviewList>
          <>
            {!isMobile ? (
              <Span>
                {reviews?.map((review, index) => {
                  // Format commentDate
                  const commentDate = new Intl.DateTimeFormat("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(review.commentDate));

                  // Format stayedIn
                  const stayedIn = new Intl.DateTimeFormat("en-US", {
                    month: "long",
                    year: "numeric",
                  }).format(new Date(review.stayedIn));

                  return (
                    <Span key={index}>
                      <ReviewHeader
                        style={{ backgroundColor: ttColors.grayishAsh }}
                      >
                        <Flex justify="space-between" align="center">
                          <Text
                            weight={"bold"}
                            type="h5"
                            text={review.name}
                          ></Text>
                          <ReviewsText>
                            <Flex align="center" gap="8px">
                              <Flex>
                                <Image
                                  alt="location"
                                  src={
                                    "/assets/icons/stay/view/view_camera_icon.svg"
                                  }
                                  width={24}
                                  height={24}
                                />
                              </Flex>
                              <Flex
                                direction="column"
                                styles={{ fontSize: "14px" }}
                              >
                                <StyledRating
                                  name="customized-color"
                                  defaultValue={review.rating}
                                  getLabelText={(value: number) =>
                                    `${value} Heart${value !== 1 ? "s" : ""}`
                                  }
                                  readOnly
                                  precision={0.5}
                                  icon={<CircleIcon fontSize="inherit" />}
                                  emptyIcon={
                                    <CircleOutlinedIcon fontSize="inherit" />
                                  }
                                  style={{
                                    fontSize: "15px",
                                  }}
                                />
                              </Flex>
                            </Flex>
                          </ReviewsText>
                        </Flex>
                      </ReviewHeader>
                      <Content>
                        <Flex direction="column">
                          <Flex direction="column" className="main_content">
                            <Text
                              weight={"bold"}
                              type="h4"
                              size={16}
                              text={review.title}
                              styles={{ margin: "10px 0px" }}
                            ></Text>

                            <ExpandableText
                              text={review.comment}
                              maxLines={3}
                              commentDate={commentDate}
                              stayedIn={stayedIn}
                            />
                          </Flex>

                          <Flex align="center" gap="20px">
                            <Text
                              type="h5"
                              weight={"bold"}
                              text="Was this helpful?"
                            ></Text>
                            <RadioGroup
                              aria-labelledby="demo-radio-buttons-group-label"
                              name="radio-buttons-group"
                            >
                              <Flex align="center">
                                <FormControlLabel
                                  value="yes"
                                  control={
                                    <Radio
                                      disableFocusRipple
                                      disableRipple
                                      sx={{
                                        color: ttColors.gray,
                                        "&.Mui-checked": {
                                          color: ttColors.primary,
                                        },
                                        "&.MuiSvgIcon-root": {
                                          // fontSize: 20,
                                        },
                                      }}
                                    />
                                  }
                                  label={
                                    <Text
                                      size={14}
                                      type="p"
                                      text={`Yes (${13})`}
                                    ></Text>
                                  }
                                />
                                <FormControlLabel
                                  value="no"
                                  control={
                                    <Radio
                                      disableFocusRipple
                                      disableRipple
                                      sx={{
                                        color: ttColors.gray,
                                        "&.Mui-checked": {
                                          color: ttColors.primary,
                                        },
                                        "& .MuiSvgIcon-root": {
                                          // fontSize: 20,
                                        },
                                      }}
                                    />
                                  }
                                  label={
                                    <Text
                                      size={14}
                                      type="p"
                                      text={`No (${2})`}
                                    ></Text>
                                  }
                                />
                              </Flex>
                            </RadioGroup>
                          </Flex>
                        </Flex>
                      </Content>
                    </Span>
                  );
                })}
                <Flex justify="center" styles={{ marginTop: "40px" }}>
                  <span className="pagination">
                    <Pagination
                      className="paginationItemStyle"
                      count={10}
                      color="primary"
                      variant="outlined"
                      shape="rounded"
                    />
                  </span>
                </Flex>{" "}
              </Span>
            ) : (
              <>
                {/* REVIEW MODAL */}
                <ReviewModal
                  open={open.review}
                  reviews={reviews}
                  hiddenReviews={hiddenReviews}
                  toggleReviewVisibility={toggleReviewVisibility}
                  handleClose={() =>
                    setOpen((prev) => ({
                      ...prev,
                      review: false,
                    }))
                  }
                />
                <Span style={{ marginTop: "0px" }}>
                  <ButtonBtn
                    onClick={() =>
                      setOpen((prev) => ({
                        ...prev,
                        review: true,
                      }))
                    }
                  >
                    <BtnText>Read Review ({reviews.length})</BtnText>
                  </ButtonBtn>
                </Span>
              </>
            )}
          </>
        </ReviewList>
      </Container>
    </>
  );
};

export default HotelReviews;
