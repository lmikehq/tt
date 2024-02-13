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
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Pagination } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { styled as muiStyled } from "@mui/material/styles";
import { Rating } from "@mui/material";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import Image from "@/components/atoms/image";
import { ReviewModal } from "./modals/Modals";
import Select from "react-select";
import { ViewTripAdvisorStayDetailsResponse, ViewTripAdvisorStayNearbyResponse, ViewTripAdvisorStayReviewsResponse } from "@/lib/types/request-models/stay/search.type";
import { numSort } from "@/lib/utilFns";

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

interface HotelReviewsProps {
    reviews?: ViewTripAdvisorStayReviewsResponse['data'];
    stayDetails: ViewTripAdvisorStayDetailsResponse
}
const HotelReviews = ({ reviews = [], stayDetails }: HotelReviewsProps) => {
    const { isMobile } = useScreenResolution();

    // FILTERS
    const [sort, setSort] = useState({ value: "high-low", label: "High to Low" });
    const options = [
        { value: "high-low", label: "High to Low" },
        { value: "low-high", label: "Low to High" },
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
    // PERCENTAGE & SUM RATING
    //==================
    const averageRating =
        reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
        : 0;
    const displayRating =
        averageRating > 5 ? averageRating.toFixed(2) : averageRating.toFixed(1);
    const displayRatingNumber = parseFloat(displayRating);

    const [open, setOpen] = useState({
            review: false,
    });

    const sortedReviews = () => {
        return numSort(reviews, "rating", sort.value === 'high-low' ? 'desc' : "asc")
    }

    const subRatings = Object.values(stayDetails?.subratings ?? {})
    // console.log('sub', subRatings)

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
                text="Sort by Ratings"
                whiteSpace="nowrap"
                size={14}
                styles={{
                    whiteSpace: "nowrap",
                    textOverflow: "unset",
                }}
              ></Text>
                <Select
                    className="react_select"
                    options={options}
                    value={sort}
                    //@ts-ignore
                    onChange={(v) => setSort(v)}
                />
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
                text={`${stayDetails?.rating}`}
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
                      text={`${stayDetails?.num_reviews} reviews`}
                    ></Text>
                  </Flex>
                </Flex>
              </ReviewsText>
            </Flex>
            </Flex>
            {subRatings.length > 0 && 
                <ProgressBars>
                    {subRatings.map((sub, index) => 
                        <Flex direction="column" key={`main-rev-${index}`}>
                            <Flex justify="space-between">
                                <Text type="p" text={sub.localized_name} size={13}></Text>
                                <Text type="p" weight={600} size={13} text={`${Number(sub.value) * 20}%`}></Text>
                            </Flex>
                            <LineProgressBar
                                percent={Number(sub.value) * 20}
                                rounded={36}
                                className="LineProgressBar"
                                height={8}
                                progressColor={ttColors.primary}
                            />
                        </Flex>
                    )}
                </ProgressBars>
            }
        </GridBox>
        <ReviewList>
          <>
            {!isMobile ? (
              <Span>
                {sortedReviews()?.map((review, index) => {
                  // Format commentDate
                  const commentDate = new Intl.DateTimeFormat("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(review.published_date));

                  // Format stayedIn
                const stayedIn = new Intl.DateTimeFormat("en-US", {
                    month: "long",
                    year: "numeric",
                  }).format(new Date(review.travel_date));

                  return (
                    <Span key={index}>
                      <ReviewHeader
                        style={{ backgroundColor: ttColors.grayishAsh }}
                      >
                        <Flex justify="space-between" align="center">
                          <Text
                            weight={"bold"}
                            type="h5"
                            text={review?.user?.user_location?.name ?? review?.user?.username ?? 'User'}
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
                                    value={review.rating}
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
                              text={review.text}
                              maxLines={3}
                              commentDate={commentDate}
                              stayedIn={stayedIn}
                            />
                          </Flex>

                          {/* <Flex align="center" gap="20px">
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
                          </Flex> */}
                        </Flex>
                      </Content>
                    </Span>
                  );
                })}
                {/* <Flex justify="center" styles={{ marginTop: "40px" }}>
                  <span className="pagination">
                    <Pagination
                      className="paginationItemStyle"
                      count={10}
                      color="primary"
                      variant="outlined"
                      shape="rounded"
                    />
                  </span>
                </Flex>{" "} */}
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
