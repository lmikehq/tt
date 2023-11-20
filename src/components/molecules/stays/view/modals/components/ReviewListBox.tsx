import {
  BtnText,
  ButtonBtn,
  Content,
  ReviewHeader,
  ReviewsText,
  Span,
} from "../../styles";
import Flex from "@/components/templates/flex";
import Text from "@/components/atoms/text";
import Image from "@/components/atoms/image";
import { styled as muiStyled } from "@mui/material/styles";
import { ttColors } from "@/lib/theme/colors";
import { Rating } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import React, { useState } from "react";
import styled from "styled-components";
import { ExpandableText } from "../../HotelReviews";

const StyledRating = muiStyled(Rating)({
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

interface ReviewListBoxProps {
  reviews: Reviews[];
}

const ReviewListBox: React.FC<ReviewListBoxProps> = ({ reviews }) => {
  //=======================
  // SHOW MORE REVIEW METHOD
  //=======================
  const [displayedReviews, setDisplayedReviews] = useState(5);
  const remainingReviews = Math.max(0, reviews.length - displayedReviews);

  return (
    <Span>
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

        return (
          <Span key={index}>
            <ReviewHeader style={{ backgroundColor: ttColors.grayishAsh }}>
              <Flex justify="space-between" align="center">
                <Text weight={"bold"} type="h5" text={review.name}></Text>
                <ReviewsText>
                  <Flex align="center" gap="8px">
                    <Flex>
                      <Image
                        alt="location"
                        src={"/assets/icons/stay/view/view_camera_icon.svg"}
                        width={24}
                        height={24}
                      />
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
                        emptyIcon={<CircleOutlinedIcon fontSize="inherit" />}
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
                          <Text size={14} type="p" text={`Yes (${13})`}></Text>
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
                          <Text size={14} type="p" text={`No (${2})`}></Text>
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
            setDisplayedReviews(Math.min(reviews.length, newDisplayedReviews));
          }}
        >
          <BtnText>Read Review ({remainingReviews})</BtnText>
        </ButtonBtn>
      </Span>
    </Span>
  );
};

export default ReviewListBox;
