import { Box, Checkbox } from "@mui/material";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    Icon,
    ReviewsText,
    SlideContent,
    SlideList,
    SlideCard,
    SliderContainer,
    SliderWidth,
    SliderImgBox,
    FavoriteSliderBox,
    Span,
} from "./styles";
import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { Rating } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import Link from "@/components/atoms/link";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { ttColors } from "@/lib/theme/colors";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { styled } from "@mui/material/styles";
import {
    formatPriceWithoutCurrency,
    getCurrency,
} from "@/lib/extensions/helpers/formatPrice";
import StaySkeletonLoader from "@/components/organisms/SkeletonLoader/StaySkelecton";
import { FavoriteBoxSkeleton } from "./availableRooms";
import { Grid } from "@/components/templates/grid";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { HotelBySearchInterface } from "@/lib/types/response-models/stay/search.type";

// FavoriteBoxSkeleton Component
export const ArrowBoxSkeleton: React.FC = () => (
    <Flex
        justify="flex-end"
        position="relative"
        styles={{ top: "20px", right: "20px" }}
        height="100%"
        width="100%"
        gap="20px"
    >
        <Span
            style={{
                position: "relative",
                left: "15px",
                backgroundColor: "var(--color-border)",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
            }}
        >
            <Flex justify="center" align="center" width="100%" height="100%">
                <ArrowBackIosIcon
                    style={{
                        // color: "var(--default-color)",
                        fontSize: "20px",
                        position: "relative",
                        left: "5px",
                    }}
                />
            </Flex>
        </Span>

        <Span
            style={{
                position: "relative",
                left: "15px",
                backgroundColor: "#a5a4a4",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
            }}
        >
            <Flex justify="center" align="center" width="100%" height="100%">
                <ArrowForwardIosIcon
                    style={{
                        color: "var(--default-color)",
                        fontSize: "20px",
                        position: "relative",
                        left: "2px",
                    }}
                />
            </Flex>
        </Span>
    </Flex>
);

export function HotelSliderBoxSkeleton() {
    const { isMobile } = useScreenResolution();
    const [screenWidth, setScreenWidth] = useState<number | undefined>(
        undefined
    );
    const thresholdWidth = 600;

    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleResize = () => {
                setScreenWidth(window.innerWidth);
            };

            setScreenWidth(window.innerWidth);

            window.addEventListener("resize", handleResize);

            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }
    }, []);

    const arr = Array(screenWidth && screenWidth < thresholdWidth ? 1 : 2).fill(
        0
    );
    return (
        <React.Fragment>
            <Span>
                <Grid columns={2} className="slider_skeleton_grid">
                    {arr.map((e, index) => (
                        <Flex
                            width="100%"
                            direction="column"
                            background={ttColors.light}
                            borderRadius="10px"
                            key={index}
                            gap="20px"
                            styles={{ marginBottom: "20px" }}
                            overflow="hidden"
                        >
                            {/* Left Side with Image and Favorite Icon */}
                            <Flex
                                width="100%"
                                className="top_side"
                                position="relative"
                                overflow="hidden"
                            >
                                <StaySkeletonLoader
                                    tabs={1}
                                    textWidth="50%"
                                    rectangularHeight={230}
                                    rectangularWidth="100%"
                                    containerProps={{
                                        sx: { borderRadius: "12px" },
                                    }}
                                />
                                {/* Favorite Box */}
                                <FavoriteBoxSkeleton />
                            </Flex>
                            <Flex>
                                <Flex direction="column">
                                    <StaySkeletonLoader
                                        tabs={1}
                                        rectangularHeight={40}
                                        rectangularWidth="80%"
                                    />
                                    <StaySkeletonLoader
                                        tabs={1}
                                        text
                                        textHeight={35}
                                        textWidth="70%"
                                    />
                                </Flex>
                            </Flex>
                            <Flex
                                margin="0"
                                align="center"
                                justify="space-between"
                                gap="10%"
                                width="100%"
                                styles={{ marginTop: "-30px" }}
                            >
                                <Flex direction="column">
                                    <StaySkeletonLoader
                                        tabs={1}
                                        rectangularHeight={40}
                                        rectangularWidth="100%"
                                    />
                                </Flex>

                                <StaySkeletonLoader
                                    text
                                    tabs={1}
                                    textHeight={60}
                                    textWidth="100%"
                                />
                            </Flex>
                        </Flex>
                    ))}
                </Grid>
                <Span>
                    <ArrowBoxSkeleton />
                </Span>
            </Span>
        </React.Fragment>
    );
}

const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
        color: "var(--color-green)",
    },
    "& .MuiRating-iconHover": {
        color: "var(--color-green)",
    },
});

const label = { inputProps: { "aria-label": "Checkbox demo" } };

interface Hotel {
    name: string;
    address: string;
    distance: string;
    reviews: number;
    star_rating: number;
    price: number;
    images: string[];
}

interface RoomSliderProps {
    hotels: HotelBySearchInterface[];
}

// REACT SLICK BUTTON
const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
        <div className="control_btn l_flex" onClick={onClick}>
            <button className="prev l_flex">
                <KeyboardArrowLeftIcon className="icon" />
            </button>
        </div>
    );
};

const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
        <div className="control_btn" onClick={onClick}>
            <button className="next l_flex">
                <KeyboardArrowRightIcon className="icon" />
            </button>
        </div>
    );
};

function RoomSlider(props: RoomSliderProps) {
    const { hotels } = props;

    //===========
    //REACT SLICK
    //===========
    const [slidesToShow, setSlidesToShow] = useState(1);
    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth >= 1200) {
                setSlidesToShow(Math.min(2, hotels.length));
            } else if (screenWidth >= 600) {
                setSlidesToShow(Math.min(2, hotels.length));
            } else {
                setSlidesToShow(Math.min(1, hotels.length));
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [hotels.length]);

    const SliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        autoplay: false,
        arrows: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
    };

    //=================
    //SLIDER BOX TOGGLE
    //=================
    const [showSliderBox, setShowSliderBox] = useState(false);
    // Load the Slider when the component mounts
    useEffect(() => {
        setShowSliderBox(true);
    }, [props]);

    const handleCloseSliderBox = () => {
        setShowSliderBox(false);
    };

    //========
    //FAVORITE
    //========
    const [checkedRooms, setCheckedRooms] = useState(
        Array(hotels.length).fill(false)
    );

    const handleCheckboxChange = (index: number) => {
        const newCheckedRooms = [...checkedRooms];
        newCheckedRooms[index] = !newCheckedRooms[index];
        setCheckedRooms(newCheckedRooms);
    };

    return (
        <div>
            {showSliderBox && (
                <SliderContainer style={{ paddingBottom: "60px" }}>
                    <Flex
                        justify="space-between"
                        styles={{ marginBottom: "10px" }}
                    >
                        <Text
                            type="h3"
                            text="Hotels with the most positive reviews"
                            weight={"bold"}
                        />
                        <CloseOutlinedIcon
                            style={{ cursor: "pointer" }}
                            onClick={handleCloseSliderBox}
                        />
                    </Flex>
                    <SlideContent>
                        {/* SKELETON */}
                        {/* <Span style={{ padding: "0px 10px" }}>
              <HotelSliderBoxSkeleton />
            </Span> */}
                        <SliderWidth>
                            <Slider {...SliderSettings} className="">
                                {hotels.map((hotel, index) => (
                                    <SlideCard key={index}>
                                        <SlideList>
                                            <SliderImgBox>
                                                <Link href="/stay/view">
                                                    <img
                                                        style={{
                                                            width: "100%",
                                                            height: "200px",
                                                            objectFit: "cover",
                                                        }}
                                                        src={hotel.images[0]}
                                                        alt={hotel.name}
                                                    />
                                                </Link>
                                            </SliderImgBox>
                                            <FavoriteSliderBox>
                                                <Checkbox
                                                    {...label}
                                                    icon={<FavoriteBorder />}
                                                    checkedIcon={
                                                        <Favorite
                                                            style={{
                                                                color: "var(--color-favorite)",
                                                            }}
                                                        />
                                                    }
                                                    disableRipple
                                                    disableTouchRipple
                                                    disableFocusRipple
                                                    sx={{
                                                        "& .MuiSvgIcon-root": {
                                                            fontSize: 28,
                                                            padding: 0,
                                                        },
                                                    }}
                                                    checked={
                                                        checkedRooms[index]
                                                    }
                                                    onChange={() =>
                                                        handleCheckboxChange(
                                                            index
                                                        )
                                                    }
                                                    id="favorite-hotels-checkbox"
                                                />
                                            </FavoriteSliderBox>
                                            <Link href="/stay/view">
                                                <Text
                                                    type="h2"
                                                    text={hotel.name}
                                                    weight={"bold"}
                                                    styles={{
                                                        fontSize: "22px",
                                                    }}
                                                ></Text>
                                            </Link>
                                            <Flex
                                                gap="10px"
                                                margin="10px 0px"
                                                align="center"
                                                styles={{ fontSize: "15px" }}
                                            >
                                                <Text
                                                    type="p"
                                                    text={hotel.address}
                                                ></Text>
                                                <Rating
                                                    name="rating"
                                                    readOnly
                                                    precision={0.5}
                                                    defaultValue={
                                                        hotel.star_rating
                                                    }
                                                    style={{
                                                        color: "var(--color-rating)",
                                                        fontSize: "17px",
                                                    }}
                                                />
                                            </Flex>
                                            <Flex justify="space-between">
                                                <Flex
                                                    align="center"
                                                    gap="10px"
                                                    styles={{
                                                        flexWrap: "wrap",
                                                    }}
                                                >
                                                    <Flex
                                                        gap="5px"
                                                        align="center"
                                                    >
                                                        <Text
                                                            color="var(--text-dull-color)"
                                                            type="h3"
                                                            weight={"bold"}
                                                            text={getCurrency()}
                                                        />
                                                        <Text
                                                            color="var(--text-dull-color)"
                                                            type="h3"
                                                            weight={"bold"}
                                                            text={formatPriceWithoutCurrency(
                                                                12111
                                                            )}
                                                        />
                                                    </Flex>
                                                    <Text
                                                        type="p"
                                                        text="Per night"
                                                        styles={{
                                                            fontSize: "14px",
                                                        }}
                                                    ></Text>
                                                </Flex>
                                                <ReviewsText>
                                                    <Flex
                                                        gap="8px"
                                                        align="center"
                                                    >
                                                        <Icon>
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
                                                        </Icon>
                                                        <Flex
                                                            direction="column"
                                                            styles={{
                                                                fontSize:
                                                                    "15px",
                                                            }}
                                                        >
                                                            <StyledRating
                                                                name="customized-color"
                                                                defaultValue={
                                                                    hotel.star_rating
                                                                }
                                                                getLabelText={(
                                                                    value: number
                                                                ) =>
                                                                    `${value} Heart${
                                                                        value !==
                                                                        1
                                                                            ? "s"
                                                                            : ""
                                                                    }`
                                                                }
                                                                readOnly
                                                                precision={0.5}
                                                                icon={
                                                                    <CircleIcon fontSize="inherit" />
                                                                }
                                                                emptyIcon={
                                                                    <CircleOutlinedIcon fontSize="inherit" />
                                                                }
                                                                style={{
                                                                    fontSize:
                                                                        "15px",
                                                                }}
                                                            />
                                                            <Text
                                                                type="p"
                                                                text={`${890} reviews`}
                                                            ></Text>
                                                        </Flex>
                                                    </Flex>
                                                </ReviewsText>
                                            </Flex>
                                        </SlideList>
                                    </SlideCard>
                                ))}
                            </Slider>
                        </SliderWidth>
                    </SlideContent>
                </SliderContainer>
            )}
        </div>
    );
}

export default RoomSlider;
