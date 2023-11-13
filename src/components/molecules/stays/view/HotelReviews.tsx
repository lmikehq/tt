import Flex from "@/components/templates/flex";
import {
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
import { styled } from "@mui/material/styles";
import { Rating } from "@mui/material";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "var(--color-green)",
  },
  "& .MuiRating-iconHover": {
    color: "var(--color-green)",
  },
});

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
      "This hotel would have been a 5 if only there were tea/coffee making facilities. The bed was the comfiest I’ve ever had away from home. Very central for all the attractions and the customer service desk was excellent, particularly Christian who was very helpful",
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
];

const HotelReviews = () => {
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
          <Flex justify="space-between" align="center">
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
            <Flex styles={{ gap: "10px" }} justify="flex-end" align="center">
              <Text
                type="p"
                text="Sort by"
                size={14}
                styles={{
                  whiteSpace: "nowrap",
                  textOverflow: "unset",
                }}
              ></Text>
              <select
                name="filter"
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
              weight={600}
              text="from TripAdvisor"
              styles={{ marginBottom: "15px" }}
            ></Text>
            <Flex gap="20px" align="center">
              <Text
                type="h2"
                text={`${displayRating}`}
                weight={"bold"}
                size={35}
                styles={{
                  whiteSpace: "nowrap",
                  textOverflow: "unset",
                }}
              ></Text>
              <ReviewsText>
                <Flex align="center" gap="10px">
                  <Flex>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12.006 4.29492C9.336 4.29492 6.668 5.07892 4.361 6.64792H0L1.963 8.78292C1.06861 9.5978 0.441617 10.6642 0.1644 11.8419C-0.112816 13.0197 -0.0272945 14.2537 0.409731 15.382C0.846756 16.5103 1.61484 17.4799 2.61309 18.1637C3.61134 18.8474 4.79306 19.2131 6.003 19.2129C7.51482 19.2142 8.97095 18.6425 10.078 17.6129L12 19.7049L13.922 17.6149C15.0284 18.6434 16.4834 19.2144 17.994 19.2129C19.585 19.2129 21.1108 18.5811 22.2359 17.4563C23.3611 16.3315 23.9935 14.8059 23.994 13.2149C23.9949 12.3805 23.8213 11.5552 23.4843 10.7919C23.1472 10.0287 22.6543 9.34433 22.037 8.78292L24 6.64792H19.65C17.3962 5.11364 14.7325 4.2937 12.006 4.29492ZM12 6.25492C13.531 6.25492 15.063 6.55792 16.504 7.15792C13.943 8.13792 12 10.4299 12 13.0999C12 10.4289 10.058 8.13792 7.496 7.15792C8.92314 6.56311 10.4539 6.25556 12 6.25492ZM6.002 9.15692C6.53504 9.15692 7.06285 9.26191 7.55531 9.4659C8.04777 9.66988 8.49523 9.96886 8.87215 10.3458C9.24906 10.7227 9.54804 11.1702 9.75203 11.6626C9.95601 12.1551 10.061 12.6829 10.061 13.2159C10.061 13.749 9.95601 14.2768 9.75203 14.7692C9.54804 15.2617 9.24906 15.7092 8.87215 16.0861C8.49523 16.463 8.04777 16.762 7.55531 16.9659C7.06285 17.1699 6.53504 17.2749 6.002 17.2749C4.92549 17.2749 3.89306 16.8473 3.13185 16.0861C2.37064 15.3249 1.943 14.2924 1.943 13.2159C1.943 12.1394 2.37064 11.107 3.13185 10.3458C3.89306 9.58457 4.92549 9.15692 6.002 9.15692ZM17.994 9.15892C18.5268 9.15873 19.0545 9.26348 19.5469 9.46721C20.0392 9.67093 20.4866 9.96964 20.8635 10.3463C21.2404 10.7229 21.5395 11.1701 21.7436 11.6623C21.9477 12.1545 22.0528 12.6821 22.053 13.2149C22.0532 13.7478 21.9484 14.2754 21.7447 14.7678C21.541 15.2601 21.2423 15.7075 20.8656 16.0844C20.489 16.4614 20.0418 16.7604 19.5496 16.9645C19.0574 17.1686 18.5298 17.2737 17.997 17.2739C16.9209 17.2743 15.8887 16.8472 15.1275 16.0866C14.3663 15.3259 13.9384 14.294 13.938 13.2179C13.9376 12.1418 14.3647 11.1096 15.1254 10.3484C15.886 9.58719 16.9179 9.15932 17.994 9.15892ZM6.002 11.0889C5.43762 11.0889 4.89635 11.3131 4.49728 11.7122C4.0982 12.1113 3.874 12.6525 3.874 13.2169C3.874 13.7813 4.0982 14.3226 4.49728 14.7216C4.89635 15.1207 5.43762 15.3449 6.002 15.3449C6.56638 15.3449 7.10765 15.1207 7.50672 14.7216C7.9058 14.3226 8.13 13.7813 8.13 13.2169C8.13 12.6525 7.9058 12.1113 7.50672 11.7122C7.10765 11.3131 6.56638 11.0889 6.002 11.0889ZM17.994 11.0889C17.4296 11.0889 16.8884 11.3131 16.4893 11.7122C16.0902 12.1113 15.866 12.6525 15.866 13.2169C15.866 13.7813 16.0902 14.3226 16.4893 14.7216C16.8884 15.1207 17.4296 15.3449 17.994 15.3449C18.5584 15.3449 19.0996 15.1207 19.4987 14.7216C19.8978 14.3226 20.122 13.7813 20.122 13.2169C20.122 12.6525 19.8978 12.1113 19.4987 11.7122C19.0996 11.3131 18.5584 11.0889 17.994 11.0889Z"
                        fill="#040404"
                      />
                    </svg>
                  </Flex>
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
                <ReviewHeader style={{ backgroundColor: ttColors.grayishAsh }}>
                  <Flex justify="space-between" align="center">
                    <Text weight={"bold"} type="h5" text={review.name}></Text>
                    <ReviewsText>
                      <Flex align="center" gap="8px">
                        <Flex>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M12.006 4.29492C9.336 4.29492 6.668 5.07892 4.361 6.64792H0L1.963 8.78292C1.06861 9.5978 0.441617 10.6642 0.1644 11.8419C-0.112816 13.0197 -0.0272945 14.2537 0.409731 15.382C0.846756 16.5103 1.61484 17.4799 2.61309 18.1637C3.61134 18.8474 4.79306 19.2131 6.003 19.2129C7.51482 19.2142 8.97095 18.6425 10.078 17.6129L12 19.7049L13.922 17.6149C15.0284 18.6434 16.4834 19.2144 17.994 19.2129C19.585 19.2129 21.1108 18.5811 22.2359 17.4563C23.3611 16.3315 23.9935 14.8059 23.994 13.2149C23.9949 12.3805 23.8213 11.5552 23.4843 10.7919C23.1472 10.0287 22.6543 9.34433 22.037 8.78292L24 6.64792H19.65C17.3962 5.11364 14.7325 4.2937 12.006 4.29492ZM12 6.25492C13.531 6.25492 15.063 6.55792 16.504 7.15792C13.943 8.13792 12 10.4299 12 13.0999C12 10.4289 10.058 8.13792 7.496 7.15792C8.92314 6.56311 10.4539 6.25556 12 6.25492ZM6.002 9.15692C6.53504 9.15692 7.06285 9.26191 7.55531 9.4659C8.04777 9.66988 8.49523 9.96886 8.87215 10.3458C9.24906 10.7227 9.54804 11.1702 9.75203 11.6626C9.95601 12.1551 10.061 12.6829 10.061 13.2159C10.061 13.749 9.95601 14.2768 9.75203 14.7692C9.54804 15.2617 9.24906 15.7092 8.87215 16.0861C8.49523 16.463 8.04777 16.762 7.55531 16.9659C7.06285 17.1699 6.53504 17.2749 6.002 17.2749C4.92549 17.2749 3.89306 16.8473 3.13185 16.0861C2.37064 15.3249 1.943 14.2924 1.943 13.2159C1.943 12.1394 2.37064 11.107 3.13185 10.3458C3.89306 9.58457 4.92549 9.15692 6.002 9.15692ZM17.994 9.15892C18.5268 9.15873 19.0545 9.26348 19.5469 9.46721C20.0392 9.67093 20.4866 9.96964 20.8635 10.3463C21.2404 10.7229 21.5395 11.1701 21.7436 11.6623C21.9477 12.1545 22.0528 12.6821 22.053 13.2149C22.0532 13.7478 21.9484 14.2754 21.7447 14.7678C21.541 15.2601 21.2423 15.7075 20.8656 16.0844C20.489 16.4614 20.0418 16.7604 19.5496 16.9645C19.0574 17.1686 18.5298 17.2737 17.997 17.2739C16.9209 17.2743 15.8887 16.8472 15.1275 16.0866C14.3663 15.3259 13.9384 14.294 13.938 13.2179C13.9376 12.1418 14.3647 11.1096 15.1254 10.3484C15.886 9.58719 16.9179 9.15932 17.994 9.15892ZM6.002 11.0889C5.43762 11.0889 4.89635 11.3131 4.49728 11.7122C4.0982 12.1113 3.874 12.6525 3.874 13.2169C3.874 13.7813 4.0982 14.3226 4.49728 14.7216C4.89635 15.1207 5.43762 15.3449 6.002 15.3449C6.56638 15.3449 7.10765 15.1207 7.50672 14.7216C7.9058 14.3226 8.13 13.7813 8.13 13.2169C8.13 12.6525 7.9058 12.1113 7.50672 11.7122C7.10765 11.3131 6.56638 11.0889 6.002 11.0889ZM17.994 11.0889C17.4296 11.0889 16.8884 11.3131 16.4893 11.7122C16.0902 12.1113 15.866 12.6525 15.866 13.2169C15.866 13.7813 16.0902 14.3226 16.4893 14.7216C16.8884 15.1207 17.4296 15.3449 17.994 15.3449C18.5584 15.3449 19.0996 15.1207 19.4987 14.7216C19.8978 14.3226 20.122 13.7813 20.122 13.2169C20.122 12.6525 19.8978 12.1113 19.4987 11.7122C19.0996 11.3131 18.5584 11.0889 17.994 11.0889Z"
                              fill="#040404"
                            />
                          </svg>
                        </Flex>
                        <Flex direction="column" styles={{ fontSize: "14px" }}>
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
                    {!hiddenReviews.includes(index) && (
                      <Flex direction="column" className="main_content">
                        <Text
                          weight={"bold"}
                          type="h4"
                          size={16}
                          text={review.title}
                          styles={{ margin: "10px 0px" }}
                        ></Text>
                        <Text type="p" size={15} text={review.comment}></Text>
                        <ul style={{ fontSize: "13px", margin: "15px 0px" }}>
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
                    )}
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
                        {hiddenReviews.includes(index) ? (
                          <KeyboardArrowDownIcon />
                        ) : (
                          <KeyboardArrowUpIcon />
                        )}
                        <Text
                          type="p"
                          size={13}
                          text={
                            hiddenReviews.includes(index)
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
                                  "& .MuiSvgIcon-root": {
                                    fontSize: 20,
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
                                    fontSize: 20,
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
          </Flex>
        </ReviewList>
      </Container>
    </>
  );
};

export default HotelReviews;
