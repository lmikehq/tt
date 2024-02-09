import React, { useState } from "react";
import { Box } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Flex from "@/components/templates/flex";
import Text from "@/components/atoms/text";
import Link from "@/components/atoms/link";
import { useRouter } from "next/navigation";
import { Grid } from "@/components/templates/grid";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { Rating } from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalParkingOutlinedIcon from "@mui/icons-material/LocalParkingOutlined";
import ChildFriendlyOutlinedIcon from "@mui/icons-material/ChildFriendlyOutlined";
import FitnessCenterOutlinedIcon from "@mui/icons-material/FitnessCenterOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import AccessibleForwardOutlinedIcon from "@mui/icons-material/AccessibleForwardOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  ItemList,
  GridLayout,
  FlexBox,
  FlexText,
  ImgBox,
  LargeImg,
  SmallImg,
  SmallSlideImg,
  MobileImageBox,
  FavoriteBox,
  FavoriteBoxMobile,
  ControlBtn,
  TextBox,
  RowOne,
  TextLocation,
  ReviewsText,
  Icon,
  RowTwo,
  RowThree,
  RowFour,
  RowFive,
  ButtonBtn,
  BtnText,
} from "./styles";
import { styled } from "@mui/material/styles";
import {
  formatPriceWithoutCurrency,
  getCurrency,
} from "@/lib/extensions/helpers/formatPrice";
import {
  constructQueryFromParams,
  extractSearchParamsFromUrl,
} from "@/lib/extensions/helpers/constructQuery";
import { AmenityGroup, HotelBySearchInterface, PaymentType, Rate } from "@/lib/types/response-models/stay/search.type";
import FavouriteCheckBox from "../../FavouriteCheckBox";
import withLikeHotel from "@/components/HOCs/withLikeHotel";
import { capCase, numSort } from "@/lib/utilFns";
import { DinnerDining } from "@mui/icons-material";
import { useUserPreferencesStore } from "@/lib/store/preferences.store";
import { ttColors } from "@/lib/theme/colors";
import { useQueryParams } from "@/hooks/useNext";
import { useConversionRate } from "@/hooks/useConversionRate";
import { extractRoomForGuestsFromString } from "@/lib/types/request-models/stay/search.type";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "var(--color-green)",
  },
  "& .MuiRating-iconHover": {
    color: "var(--color-green)",
  },
});

const label = { inputProps: { "aria-label": "Checkbox demo" } };

//SLIDER SETTINGS
const SliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: false,
};
//MOBILE SETTINGS
const MobileSliderSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
};

interface RoomBoxProps {
    hotel: HotelBySearchInterface;
    index: number;
    likedHotels?: HotelBySearchInterface[]
}

function RoomBox({ hotel, index, likedHotels = [] }: RoomBoxProps) {
    const { preFerredCurrency, conversionRate } = useUserPreferencesStore((state) => state);
    const { isMobile } = useScreenResolution();
    const { queryParams } = useQueryParams()
    const router = useRouter();
    const { convertCurrency } = useConversionRate()

    const hotelImages = hotel.images.map((el) => el.replace("{size}", "1024x768"));
    const [selectedImage, setSelectedImage] = useState(hotelImages[0]);
    const handleImageChange = (newImage: string) => {
        setSelectedImage(newImage);
    };

    const getPreviousImage = (currentImage: string) => {
        const images = hotelImages;
        const currentIndex = images.indexOf(currentImage);
        if (currentIndex > 0) {
        return images[currentIndex - 1];
        } else {
        return images[images.length - 1];
        }
    };
    const getNextImage = (currentImage: string) => {
        const images = hotelImages;
        const currentIndex = images.indexOf(currentImage);
        if (currentIndex < images.length - 1) {
        return images[currentIndex + 1];
        } else {
        return images[0];
        }
    };

    const [checked, setChecked] = useState(false);

    const handleCheckboxChange = () => {
        setChecked(!checked);
    };

    const EnhancedFavouriteCheckBox = withLikeHotel(FavouriteCheckBox);

    const amenitiesGroups = hotel.amenity_groups.reduce((prev: string[], curr: AmenityGroup) => [...prev, curr?.group_name], [])
    const displayedAmenities = amenitiesGroups.filter(e => ["Internet", "Parking", "Kids", "Sports", "Meals", "Accessibility"].includes(e))
    const roomGroups = hotel.room_groups.sort((a, b) => a.name.length > b.name.length ? -1 : a.name.length === b.name.length ? 0 : 1)
    const prices = numSort(hotel.rates.reduce((prev: PaymentType[], curr: Rate) => {
        let paymentType = curr.payment_options.payment_types.find(e => e.currency_code === 'USD') ?? curr.payment_options.payment_types.find(e => e.currency_code === 'EUR') ?? curr.payment_options.payment_types[0]
        return [...prev, paymentType]
    }, []), 'amount', 'asc')
    const selectedPrice = prices[0]
    const displayPrice = {
        currencyCode: preFerredCurrency,
        amount: convertCurrency({ convertFrom: selectedPrice?.currency_code, convertTo: preFerredCurrency, amount: selectedPrice?.amount }).amount,
    }

    const guestRooms = extractRoomForGuestsFromString(queryParams?.guests ?? "")
    const guestsCount = guestRooms.reduce((prev: number, curr) => prev + curr.adults, 0)
    console.log('gg', guestsCount)


    return (
        <Box style={{ marginBottom: "20px" }}>
            <ItemList>
                <GridLayout isMobile={isMobile}>
                    {!isMobile ? (
                        <ImgBox>
                            <LargeImg className="img_img" style={{ height: "100%" }}>
                                <img
                                    style={{
                                        width: "23rem",
                                        height: "100%",
                                        maxHeight: '23rem',
                                        objectFit: "cover",
                                        transform: 'scale(1.3)',
                                        transformOrigin: '50% 50%',
                                    }}
                                    className="img"
                                    src={selectedImage || hotelImages[0]}
                                    alt={hotel.name}
                                />
                                <FavoriteBox>
                                    <EnhancedFavouriteCheckBox
                                        id={hotel.id}
                                        liked={likedHotels.some(e => e.id === hotel.id)}
                                    />
                                </FavoriteBox>
                            </LargeImg>
                            <ControlBtn className="control_gallery room_img">
                                <Flex justify="space-between">
                                    <ArrowBackIosIcon
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            const previousImage =
                                                getPreviousImage(selectedImage);
                                            handleImageChange(previousImage);
                                        }}
                                    />
                                    <ArrowForwardIosIcon
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            const nextImage =
                                                getNextImage(selectedImage);
                                            handleImageChange(nextImage);
                                        }}
                                    />
                                </Flex>
                            </ControlBtn>

                        <SmallImg className="img_small img_img_small">
                            <Slider {...SliderSettings} className="">
                                {hotelImages.map((x) => 
                                    <SmallSlideImg
                                        className={`${
                                            x === selectedImage ? "selected_room_img" : ""}`}
                                            key={x}
                                        >
                                        <span onClick={() => setSelectedImage(x)}>
                                            <img
                                                src={x}
                                                alt=""
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    cursor: "pointer",
                                                }}
                                            />
                                        </span>
                                    </SmallSlideImg>
                                )}
                            </Slider>
                        </SmallImg>
                        </ImgBox>
                    ) : (
                        <MobileImageBox>
                            <Slider {...MobileSliderSettings} className="slick-slider stay-list-slider">
                                {hotelImages.map((x) => (
                                    <Flex
                                        key={index}
                                        className="slick-img-continuum"
                                        styles={{
                                            width: '100%',
                                            position: 'relative',
                                        }}
                                    >
                                        {/* <Link href={`/stay/view?hotelId=${hotel.id}`} style={{ width: '100%', minWidth: '100%' }}> */}
                                            <img
                                                src={x}
                                                alt=""
                                                className="slick_slider_room_img_img"
                                                style={{
                                                    minWidth: "100%",
                                                    width: "100%",
                                                    borderRadius: "12.5px",
                                                }}
                                            />
                                        {/* </Link> */}
                                        <FavoriteBoxMobile>
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
                                            checked={checked}
                                            onChange={handleCheckboxChange}
                                            id="favorite-hotels-checkbox"
                                        />
                                        </FavoriteBoxMobile>
                                </Flex>
                                ))}
                            </Slider>
                        </MobileImageBox>
                    )}
                    <TextBox>
                        <Flex direction="column">
                        <RowOne style={{ margin: '0 0 1rem' }}>
                            <FlexBox>
                            <Flex direction="column" gap='1rem'>
                                {/* <Link href="/stay/view"> */}
                                    <Text
                                        styles={{
                                            color: "var(--primary-color)",
                                            maxWidth: isMobile ? '100%' : '80%'
                                        }}
                                        type="h2"
                                        text={capCase(hotel.name)}
                                        weight={600}
                                    ></Text>
                                {/* </Link> */}

                                <FlexBox style={{ gap: "1rem" }}>
                                    <Text type="p" text={capCase(hotel.address)} color={ttColors.primary} />
                                    <Link href={`https://www.google.com/maps/search/?api=1&query=${hotel.name}-${hotel.region?.name ?? ''}-${hotel.region?.country_code ?? ''}`} target="_blank">
                                        <Text
                                            type="p"
                                            color="var(--primary-color)"
                                            text="Show in map"
                                        />
                                    </Link>
                                </FlexBox>
                            </Flex>
                            <ReviewsText>
                                {/* <Flex gap="8px" align="center">
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
                                <Flex direction="column">
                                    <StyledRating
                                    name="customized-color"
                                    defaultValue={hotel.star_rating}
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
                                    <Text type="p" text={`No reviews`}></Text>
                                </Flex>
                                </Flex> */}
                            </ReviewsText>
                            </FlexBox>
                        </RowOne>
                        <RowTwo>
                            <Flex gap={"10px"} styles={{ flexWrap: "wrap" }}>
                                {hotel.star_rating > 0 && 
                                    <Rating
                                        style={{ marginLeft: "-4px" }}
                                        name="rating"
                                        readOnly
                                        precision={0.5}
                                        defaultValue={hotel.star_rating}
                                    />
                                }
                            </Flex>
                        </RowTwo>
                        <RowThree>
                            <Flex className="row_two_wrap" align={isMobile ? 'flex-start' : 'center'} justify="space-between" direction={isMobile ? 'column' : 'row'} gap={isMobile ? '2rem' : ''}>
                                <Flex direction="column" maxWidth={isMobile ? '100%' : "70%"} gap='1rem'>
                                    <Text
                                        type="h3"
                                        weight={"bold"}
                                        text={capCase(roomGroups[0]?.name_struct?.main_name ?? roomGroups[0]?.name)}
                                        styles={{ whiteSpace: isMobile ? 'wrap' : "wrap" }}
                                    />
                                    <Text
                                        type="p"
                                        text={capCase(roomGroups[0]?.name_struct?.bedding_type ?? '')}
                                    />
                                </Flex>
                                <Grid
                                    columns={"0px"}
                                    style={{
                                        gridTemplateColumns: isMobile ? '1fr 1fr 1fr 1fr 1fr 1fr' : displayedAmenities.length > 5 ? '1fr 1fr 1fr' : `repeat(${displayedAmenities.length}, 1fr)`,
                                        gap: "20px",
                                        width: isMobile ? '100%' : 'fit-content',
                                        margin: '0 0 1rem'
                                    }}
                                >
                                    {amenitiesGroups.includes("Internet") && <WifiIcon />}
                                    {amenitiesGroups.includes("Parking") && <LocalParkingOutlinedIcon />}
                                    {amenitiesGroups.includes("Kids") && <ChildFriendlyOutlinedIcon />}
                                    {amenitiesGroups.includes("Sports") && <FitnessCenterOutlinedIcon />}
                                    {amenitiesGroups.includes("Meals") && <DinnerDining />}
                                    {amenitiesGroups.includes("Accessibility") && <AccessibleForwardOutlinedIcon />}
                                </Grid>
                            </Flex>
                        </RowThree>
                        <RowFour>
                            <FlexBox style={{ justifyContent: 'start', gap: '1.5rem' }}>
                                {hotel.rates.some(e => e.no_show) && 
                                    <FlexText>
                                        <CurrencyExchangeOutlinedIcon style={{ marginRight: "8px" }} />
                                        <Text type="p" text={`No Free Cancellation`}></Text>
                                    </FlexText>
                                }
                                {hotel.rates.some(e => e.payment_options.payment_types[0]?.by === 'credit_card') &&
                                    <FlexText>
                                        <CreditCardOutlinedIcon style={{ marginRight: "8px" }} />
                                        <Text type="p" text="Pay Online"></Text>
                                    </FlexText>
                                }
                                {hotel.rates.some(e => ['breakfast', 'lunch', 'dinner'].includes(e.meal)) &&
                                    <FlexText>
                                        <RestaurantOutlinedIcon style={{ marginRight: "8px" }} />
                                        <Text type="p" text="Meal"></Text>
                                    </FlexText>
                                }
                            </FlexBox>
                        </RowFour>
                        <RowFive>
                            <FlexBox>
                            <Flex direction="column">
                                <Flex gap="5px" align="center">
                                <Text
                                    color="var(--text-dull-color)"
                                    type="h2"
                                    weight={"bold"}
                                    text={displayPrice?.currencyCode}
                                />
                                <Text
                                    color="var(--text-dull-color)"
                                    type="h2"
                                    whiteSpace="wrap"
                                    weight={"bold"}
                                    text={formatPriceWithoutCurrency(parseFloat(displayPrice?.amount.toFixed(2)))}
                                />
                                </Flex>
                                <Text
                                type="p"
                                text={`for a night (${guestsCount} guest${guestsCount > 1 ? 's' : ''})`}
                                styles={{ whiteSpace: "nowrap" }}
                                ></Text>
                            </Flex>
                            <ButtonBtn
                                onClick={() => {
                                    const params = {
                                        regionId: queryParams.regionId,
                                        checkIn: queryParams.checkIn,
                                        checkOut: queryParams.checkOut,
                                        guests: queryParams.guests,
                                        countryCode: queryParams.countryCode,
                                        //!! change before live push
                                        id: "test_hotel_do_not_book" ?? hotel.id,
                                    };
                                    router.push(
                                        `/stay/view${constructQueryFromParams(params)}`
                                    );
                                }}
                            >
                                <BtnText style={{ fontSize: '15px' }}>Check Availability</BtnText>
                            </ButtonBtn>
                            </FlexBox>
                        </RowFive>
                        </Flex>
                    </TextBox>
                </GridLayout>
            </ItemList>
        </Box>
    );
}

export default RoomBox;
