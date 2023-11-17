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
import { useState } from "react";
import { styled as muiStyled } from "@mui/material/styles";
import { Rating } from "@mui/material";
import styled from "styled-components";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import Image from "@/components/atoms/image";

const StyledRating = muiStyled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "var(--color-green)",
  },
  "& .MuiRating-iconHover": {
    color: "var(--color-green)",
  },
});

// Function to count the number of lines in a text
const getLineCount = (text: string): number => {
  // Split the text into lines
  const lines = text.split("\n");
  // Filter out empty lines
  const nonEmptyLines = lines.filter((line) => line.trim() !== "");
  // Return the number of lines
  return nonEmptyLines.length;
};

// STYLES
const FadedText = styled.p.attrs<{ showAll: boolean; lineCount: number }>(
  (props) => ({
    showAll: props.showAll || false,
    lineCount: props.lineCount || 0,
  })
)`
  position: relative;
  font-size: 15px;
  line-height: 1.5;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: ${({ showAll }) => (showAll ? "unset" : 3)};
  -webkit-box-orient: vertical;

  &:after {
    content: ${({ showAll, lineCount }) =>
      showAll && lineCount > 3 ? '""' : "none"};
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3em; /* Adjust the height according to your design */
    background: linear-gradient(transparent, white);
    mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
  }

  &.hidden {
    -webkit-line-clamp: unset; /* Show all lines when hidden */
  }
`;

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

  //=======================
  // SHOW MORE REVIEW METHOD
  //=======================
  const [displayedReviews, setDisplayedReviews] = useState(5);
  const remainingReviews = Math.max(0, reviews.length - displayedReviews);

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

  //PERCENTAGE
  const averageCleanliness =
    reviews.length > 0
      ? (reviews.reduce((sum, review) => sum + review.cleanliness, 0) /
          (reviews.length * 10)) *
        100
      : 0;

  const averageService =
    reviews.length > 0
      ? (reviews.reduce((sum, review) => sum + review.service, 0) /
          (reviews.length * 10)) *
        100
      : 0;

  const averageSleepQuality =
    reviews.length > 0
      ? (reviews.reduce((sum, review) => sum + review.sleepQuality, 0) /
          (reviews.length * 10)) *
        100
      : 0;

  const averageValue =
    reviews.length > 0
      ? (reviews.reduce((sum, review) => sum + review.value, 0) /
          (reviews.length * 10)) *
        100
      : 0;

  const averageLocation =
    reviews.length > 0
      ? (reviews.reduce((sum, review) => sum + review.location, 0) /
          (reviews.length * 10)) *
        100
      : 0;

  const averageRooms =
    reviews.length > 0
      ? (reviews.reduce((sum, review) => sum + review.rooms, 0) /
          (reviews.length * 10)) *
        100
      : 0;

  return (
    <>
      <Container>
        <Header style={{ width: "100%", marginBottom: "30px" }}>
          <Flex justify="space-between" align="center" className="review_header">
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
            <Flex styles={{ gap: "10px" }} className="flex_start" justify="flex-end"  align="center">
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
              <select
                name="filter"
                className="select"
                style={{
                  padding: "9px",
                  borderRadius: "6px",
                  width: "200px",
                  borderColor: ttColors.gray,
                  outline: "none",
                }}
              >
                <option value="recommended">Recommended</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
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
                <Text
                  type="p"
                  weight={600}
                  size={13}
                  text={`${averageCleanliness.toFixed(0)}%`}
                ></Text>
              </Flex>
              <LineProgressBar
                percent={averageCleanliness}
                rounded={36}
                className="LineProgressBar"
                height={8}
                progressColor={ttColors.primary}
              />
            </Flex>
            <Flex direction="column">
              <Flex justify="space-between">
                <Text type="p" text="Service" size={13}></Text>
                <Text
                  type="p"
                  weight={600}
                  size={13}
                  text={`${averageService.toFixed(0)}%`}
                ></Text>
              </Flex>
              <LineProgressBar
                percent={averageService}
                rounded={36}
                className="LineProgressBar"
                height={8}
                progressColor={ttColors.primary}
              />
            </Flex>
            <Flex direction="column">
              <Flex justify="space-between">
                <Text type="p" text="Sleep Quality" size={13}></Text>
                <Text
                  type="p"
                  weight={600}
                  size={13}
                  text={`${averageSleepQuality.toFixed(0)}%`}
                ></Text>
              </Flex>
              <LineProgressBar
                percent={averageSleepQuality}
                rounded={36}
                className="LineProgressBar"
                height={8}
                progressColor={ttColors.primary}
              />
            </Flex>
            <Flex direction="column">
              <Flex justify="space-between">
                <Text type="p" text="Value" size={13}></Text>
                <Text
                  type="p"
                  weight={600}
                  size={13}
                  text={`${averageValue.toFixed(0)}%`}
                ></Text>
              </Flex>
              <LineProgressBar
                percent={averageValue}
                rounded={36}
                className="LineProgressBar"
                height={8}
                progressColor={ttColors.primary}
              />
            </Flex>
            <Flex direction="column">
              <Flex justify="space-between">
                <Text type="p" text="Location" size={13}></Text>
                <Text
                  type="p"
                  weight={600}
                  size={13}
                  text={`${averageLocation.toFixed(0)}%`}
                ></Text>
              </Flex>
              <LineProgressBar
                percent={averageLocation}
                rounded={36}
                className="LineProgressBar"
                height={8}
                progressColor={ttColors.primary}
              />
            </Flex>
            <Flex direction="column">
              <Flex justify="space-between">
                <Text type="p" text="Rooms" size={13}></Text>
                <Text
                  type="p"
                  weight={600}
                  size={13}
                  text={`${averageRooms.toFixed(0)}%`}
                ></Text>
              </Flex>
              <LineProgressBar
                percent={averageRooms}
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

                  console.log(`COUNT: ${getLineCount(review.comment)}`);

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
                            <FadedText
                              showAll={hiddenReviews.includes(index)}
                              onClick={() => toggleReviewVisibility(index)}
                              lineCount={getLineCount(review.comment)}
                            >
                              {review.comment}
                            </FadedText>

                            <ul
                              style={{ fontSize: "13px", margin: "15px 0px" }}
                            >
                              <Flex gap="30px">
                                <li style={{ listStyle: "none" }}>
                                  <Text
                                    type="p"
                                    text={`Comment: ${commentDate}`}
                                  ></Text>
                                </li>
                                <li style={{ listStyle: "" }}>
                                  <Text
                                    type="p"
                                    text={`Stayed in: ${stayedIn}`}
                                  ></Text>
                                </li>
                              </Flex>
                            </ul>
                          </Flex>

                          <Span>
                            <Flex
                              className="hide_btn"
                              align="center"
                              gap="8px"
                              styles={{
                                color: ttColors.primary,
                                cursor: "pointer",
                                width: "fit-content",
                              }}
                              onClick={() => toggleReviewVisibility(index)}
                            >
                              {!hiddenReviews.includes(index) ? (
                                <KeyboardArrowDownIcon />
                              ) : (
                                <KeyboardArrowUpIcon />
                              )}
                              <Text
                                type="p"
                                size={13}
                                text={
                                  !hiddenReviews.includes(index)
                                    ? "Show Review"
                                    : "Hide Review"
                                }
                              ></Text>
                            </Flex>
                          </Span>

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
                {reviews.slice(0, displayedReviews).map((review, index) => {
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

                  console.log(`COUNT: ${getLineCount(review.comment)}`);

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
                            <FadedText
                              showAll={hiddenReviews.includes(index)}
                              onClick={() => toggleReviewVisibility(index)}
                              lineCount={getLineCount(review.comment)}
                            >
                              {review.comment}
                            </FadedText>

                            <ul
                              style={{ fontSize: "13px", margin: "15px 0px" }}
                            >
                              <Flex gap="30px" className="date_wrap">
                                <li style={{ listStyle: "none" }}>
                                  <Text
                                    type="p"
                                    text={`Comment: ${commentDate}`}
                                  ></Text>
                                </li>
                                <li style={{ listStyle: "" }}>
                                  <Text
                                    type="p"
                                    text={`Stayed in: ${stayedIn}`}
                                  ></Text>
                                </li>
                              </Flex>
                            </ul>
                          </Flex>

                          <Span>
                            <Flex
                              className="hide_btn"
                              align="center"
                              gap="8px"
                              styles={{
                                color: ttColors.primary,
                                cursor: "pointer",
                                width: "fit-content",
                              }}
                              onClick={() => toggleReviewVisibility(index)}
                            >
                              {!hiddenReviews.includes(index) ? (
                                <KeyboardArrowDownIcon />
                              ) : (
                                <KeyboardArrowUpIcon />
                              )}
                              <Text
                                type="p"
                                size={13}
                                text={
                                  !hiddenReviews.includes(index)
                                    ? "Show Review"
                                    : "Hide Review"
                                }
                              ></Text>
                            </Flex>
                          </Span>

                          <Flex
                            align="center"
                            gap="20px"
                            className="radio_wrap date_wrap"
                          >
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
                <Span style={{ marginTop: "20px" }}>
                  <ButtonBtn
                    className={remainingReviews === 0 ? "btn_disable" : ""}
                    onClick={() => {
                      const newDisplayedReviews = displayedReviews + 5;
                      setDisplayedReviews(
                        Math.min(reviews.length, newDisplayedReviews)
                      );
                    }}
                  >
                    <BtnText>Read Review ({remainingReviews})</BtnText>
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
