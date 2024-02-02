import { Divider } from "@atom/divider";
import Flex from "@components/templates/flex";
import Text from "@atom/text";
import React, { useEffect, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { LuSearch } from "react-icons/lu";
import Button from "@/components/atoms/button";
import Slider from "../../slider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Rating } from "@mui/material";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { ttColors } from "@/lib/theme/colors";
import styled from "styled-components";
import PriceAlerts from "../components/priceAlerts";
import FavoriteHotels from "../components/favoriteHotels";
import Input from "@/components/atoms/input";
import { useStaySearchStore } from "@/lib/store/stay/search.store";
import {
    HotelAmenityEnum,
    HotelBedTypeEnum,
    HotelCancellationPolicy,
    HotelGuestRating,
    HotelMealEnum,
    HotelPopularTypes,
    HotelPropertyTypes,
    HotelRoomEnum,
    HotelStarRating,
    StaySearchFilters,
} from "@/lib/types/request-models/stay/search.type";
import { debounce } from "debounce";
import { useDebounce } from 'use-debounce';
import { capCase } from "@/lib/utilFns";
import RateHawkLocationSearchInput from "@/components/organisms/locationInputs/RateHawkLocationSearchSelectInput";
import { RateHawkRegionType } from "@/lib/types/response-models/stay/location.type";


const marks = [
    {
        value: 0,
        label: "0",
    },
    {
        value: 20000000,
        label: "Max",
    },
];

//POPULAR
const PopularItems = [
    "Free Cancellation",
    "Guest Rating 4.0+",
    "Breakfast Included",
    "Pet Friendly",
    "Ocean Views",
];

//PROPERTY
const PropertyItems = [
    "Apartment",
    "Hotel",
    "Resort",
    "Holiday Renters",
    "Unique Stays",
    "Residence",
    "Private Home",
];

//RATINGS
const ratings = [
    {
        text: "5 Stars",
        value: HotelStarRating._5_stars,
        rating: 5,
    },
    {
        text: "4 Stars",
        value: HotelStarRating._4_stars,
        rating: 4,
    },
    {
        text: "3 Stars",
        value: HotelStarRating._3_stars,
        rating: 3,
    },
    {
        text: "2 Stars",
        value: HotelStarRating._2_stars,
        rating: 2,
    },
    {
        text: "1 Stars",
        value: HotelStarRating._1_stars,
        rating: 1,
    },
    {
        text: "No rating",
        value: HotelStarRating.no_rating,
        rating: 0,
    },
];

//POLICY
const Policies = ["Free cancellation", "No cancellation"];

//PROPERTY
const Facilities = [
    "Ocean Views",
    "Pet Friendly",
    "Pool",
    "Hot Tub",
    "Wifi Included",
    "Spa",
    "Kitchen",
    "Electric or charging",
    "Casino",
    "Airport Shuttle",
    "Air Condition",
    "Restaurants",
    "Gym",
    "Water and Dryer",
    "Outdoor Space",
    "Parking",
];

//MEAL
const Meal = ["Breakfast included", "Breakfast not included"];

//ROOMS
const Rooms = ["Studio", "1 Room", "2 Room", "3 Room", "4+ Room"];

//BED TYPE
const BedType = [
    "King Bed",
    "Queen Bed",
    "Double Bed",
    "Twin Bed",
    "Twin XL Bed",
    "Bunk Bed",
    "Sofa Bed",
];

const ScrollBox = styled.div`
    padding-right: 8px;
    position: relative;
`;
function SortingColumns() {
    const { isMobile } = useScreenResolution();
    const threshold = 5;

    type ColumnName = keyof typeof columnState;

    interface ColumnState {
        popular: boolean;
        property: boolean;
        price: boolean;
        rating: boolean;
        guestRating: boolean;
        policy: boolean;
        services: boolean;
        plan: boolean;
        rooms: boolean;
        bed: boolean;
    }

    const [columnState, setColumnState] = useState<ColumnState>({
        popular: false,
        property: false,
        price: false,
        rating: false,
        guestRating: false,
        policy: false,
        services: false,
        plan: false,
        rooms: false,
        bed: false,
    });

    const [displayedPopularItems, setDisplayedPopularItems] = useState<number>(
        PopularItems.length > threshold ? threshold : PopularItems.length
    );

    const [displayedPropertyItems, setDisplayedPropertyItems] =
        useState<number>(
            PropertyItems.length > threshold ? threshold : PropertyItems.length
        );
    const [displayedPoliciesItems, setDisplayedPoliciesItems] =
        useState<number>(
            Policies.length > threshold ? threshold : Policies.length
        );

    const [displayedServicesItems, setDisplayedServicesItems] =
        useState<number>(
            Facilities.length > threshold ? threshold : Facilities.length
        );

    const [displayedMealItems, setDisplayedMealItems] = useState<number>(
        Meal.length > threshold ? threshold : Meal.length
    );
    const [displayedRoomsItems, setDisplayedRoomsItems] = useState<number>(
        Rooms.length > threshold ? threshold : Rooms.length
    );
    const [displayedBedTypeItems, setDisplayedBedTypeItems] = useState<number>(
        BedType.length > threshold ? threshold : BedType.length
    );

    const [prices, setPrices] = useState([0, 20000000])
    const [debouncedPrices] = useDebounce(prices, 1000)

    const toggleColumn = (columnName: ColumnName) => {
        setColumnState((prevState) => ({
            ...prevState,
            [columnName]: !prevState[columnName],
        }));
    };

    const handleToggleItems = (
        items: any[],
        displayedItems: number,
        setDisplayedItems: (count: number) => void
    ) => {
        if (displayedItems === threshold) {
            setDisplayedItems(items.length);
        } else {
            setDisplayedItems(threshold);
        }
    };

    const { staySearchFilters, updateStaySearchFilters, updateStayTabInitialQuery, stayTabInitialSearchQuery } = useStaySearchStore(
        (state) => state
    );

    const handleUpdateStaySearchFilters = (params: StaySearchFilters) => {
        updateStaySearchFilters({
            ...staySearchFilters,
            ...params,
        });
    };

    const handlePriceChangeDebounce = debounce(
        ({
            minAmount,
            maxAmount,
        }: {
            minAmount: number;
            maxAmount: number;
        }) => {
            handleUpdateStaySearchFilters({ minAmount, maxAmount });
        },
        800
    );

    const handleEnumCheckBoxGroupChanged = ({
        value,
        field,
    }: {
        value: string;
        field: string;
    }) => {
        const values = staySearchFilters[field] as string[];
        const isSelected = values?.includes(value);
        if (isSelected) {
            handleUpdateStaySearchFilters({
                [field]: values?.filter((item) => item !== value),
            });
        } else {
            handleUpdateStaySearchFilters({
                [field]: [...(values ?? []), value],
            });
        }
    };

    const handleEnumCheckBoxSingleChanged = ({
        value,
        field,
    }: {
        value: string;
        field: string;
    }) => {
        const prevValue = staySearchFilters[field] as string;
        const isSelected = prevValue === value;
        if (!isSelected) {
            handleUpdateStaySearchFilters({
                [field]: value,
            });
        } else {
            handleUpdateStaySearchFilters({
                [field]: undefined,
            });
        }
    };

    const handleEnumCheckBoxMultipleChanged = ({
        value,
        field,
    }: {
        value: string;
        field: string;
    }) => {
        if (['amenity', 'cancellationPolicy'].includes(field)) {
            handleEnumCheckBoxGroupChanged({
                value,
                field: field
            })
        } else if (['meals'].includes(field)) {
            handleEnumCheckBoxSingleChanged({
                value,
                field: field
            })
        }
    };

    useEffect(() => {
        handleUpdateStaySearchFilters({
            minAmount: debouncedPrices[0],
            maxAmount: debouncedPrices[1],
        })
    }, [debouncedPrices])

    useEffect(() => {
        setPrices(prev => [staySearchFilters?.minAmount ?? 0, staySearchFilters?.maxAmount ?? 20000000])
    }, [staySearchFilters?.minAmount, staySearchFilters?.maxAmount])


    return (
        <ScrollBox
            style={{
                height: isMobile ? "100%" : "1070px",
                overflowY: isMobile ? "hidden" : "scroll",
            }}
        >
            <Flex
                direction="column"
                styles={{
                    minWidth: "200px",
                }}
            >
                <PriceAlerts />
                <FavoriteHotels />
                <Flex
                    direction="column"
                    gap=".5rem"
                    styles={{ marginBottom: "1.2rem" }}
                >
                    <Text type="p" text="Where do you want to stay?"></Text>
                    <RateHawkLocationSearchInput
                        onChange={(x: RateHawkRegionType) => {
                            updateStayTabInitialQuery({
                                ...stayTabInitialSearchQuery,
                                location: x,
                            })
                            handleUpdateStaySearchFilters({
                                regionId: String(x.id)
                            })
                        }}
                        value={stayTabInitialSearchQuery.location}
                        placeholder="Enter Destination or Hotel Name"
                        showHotels={false}
                    />
                </Flex>

                <Flex direction="column">
                    <Flex
                        align="center"
                        justify="space-between"
                        padding="0.8rem 0"
                        onClick={() => toggleColumn("popular")}
                        styles={{ cursor: "pointer" }}
                    >
                        <Text
                            type="p"
                            text="Popular Type"
                            weight={500}
                            color="#06062A"
                        />
                        {columnState.popular ? (
                            <BsChevronUp
                                color="var(--color-light-gray)"
                                size={20}
                            />
                        ) : (
                            <BsChevronDown
                                color="var(--color-light-gray)"
                                size={20}
                            />
                        )}
                    </Flex>
                    {columnState.popular && (
                        <>
                            <Flex direction="column" width="fit-content">
                                {Object.keys(HotelPopularTypes).map(
                                    (popularTypeKey, index) => (
                                        <FormControlLabel
                                            key={index}
                                            checked={staySearchFilters.popularTypes?.includes(
                                                HotelPopularTypes[
                                                    popularTypeKey as keyof typeof HotelPopularTypes
                                                ]
                                            )}
                                            value={
                                                HotelPopularTypes[
                                                    popularTypeKey as keyof typeof HotelPopularTypes
                                                ]
                                            }
                                            onChange={(e) =>
                                                handleEnumCheckBoxMultipleChanged({
                                                    value: HotelPopularTypes[
                                                        popularTypeKey as keyof typeof HotelPopularTypes
                                                    ],
                                                    field: ['free_cancellation'].includes(popularTypeKey) ? 'cancellationPolicy' :
                                                        ['breakfast_included'].includes(popularTypeKey) ? 'meals' :
                                                        ['has_internet', 'pet_friendly', 'has_fitness', 'has_parking'].includes(popularTypeKey) ? 'amenity' : ''
                                                })
                                            }
                                            control={
                                                <Checkbox
                                                    className="mui-checked"
                                                    disableFocusRipple
                                                    disableRipple
                                                />
                                            }
                                            label={
                                                <Text
                                                    type="p"
                                                    text={popularTypeKey.replaceAll(
                                                        "_",
                                                        " "
                                                    )}
                                                    transform="capitalize"
                                                    styles={{
                                                        fontSize: "15px",
                                                        width: "fit-content",
                                                    }}
                                                />
                                            }
                                        />
                                    )
                                )}
                            </Flex>
                            {PopularItems.length > threshold && (
                                <Button
                                    variant="link"
                                    styles={{
                                        position: "relative",
                                        left: "17px",
                                        padding: 0,
                                    }}
                                    onClick={() =>
                                        handleToggleItems(
                                            PopularItems,
                                            displayedPopularItems,
                                            setDisplayedPopularItems
                                        )
                                    }
                                >
                                    {displayedPopularItems === threshold
                                        ? "See more"
                                        : "See less"}
                                </Button>
                            )}
                        </>
                    )}
                </Flex>
                <Divider
                    direction="horizontal"
                    style={{ display: isMobile ? "none" : "flex" }}
                />

                <Flex direction="column">
                    <Flex
                        align="center"
                        justify="space-between"
                        padding=".8rem 0"
                        onClick={() => toggleColumn("property")}
                        styles={{ cursor: "pointer" }}
                    >
                        <Text
                            type="p"
                            text="Property Type"
                            weight={500}
                            color="#06062A"
                        />
                        {columnState.property ? (
                            <BsChevronUp
                                color="var(--color-light-gray)"
                                size={20}
                            />
                        ) : (
                            <BsChevronDown
                                color="var(--color-light-gray)"
                                size={20}
                            />
                        )}
                    </Flex>
                    {columnState.property && (
                        <>
                            <Flex direction="column" width="fit-content">
                                {Object.keys(HotelPropertyTypes).map(
                                    (propertyTypeKey, index) => (
                                        <FormControlLabel
                                            key={index}
                                            checked={staySearchFilters.apartmentType?.includes(
                                                HotelPropertyTypes[propertyTypeKey as keyof typeof HotelPropertyTypes]
                                            )}
                                            value={
                                                HotelPropertyTypes[
                                                    propertyTypeKey as keyof typeof HotelPropertyTypes
                                                ]
                                            }
                                            onChange={(e) =>
                                                handleEnumCheckBoxGroupChanged({
                                                    value: HotelPropertyTypes[
                                                        propertyTypeKey as keyof typeof HotelPropertyTypes
                                                    ],
                                                    field: "apartmentType",
                                                })
                                            }
                                            control={
                                                <Checkbox
                                                    className="mui-checked"
                                                    disableFocusRipple
                                                    disableRipple
                                                />
                                            }
                                            label={
                                                <Text
                                                    type="p"
                                                    transform="capitalize"
                                                    text={propertyTypeKey.replaceAll(
                                                        "_",
                                                        " "
                                                    )}
                                                    styles={{
                                                        fontSize: "15px",
                                                        width: "fit-content",
                                                    }}
                                                />
                                            }
                                        />
                                    )
                                )}
                            </Flex>
                            {PropertyItems.length > threshold && (
                                <Button
                                    variant="link"
                                    styles={{
                                        position: "relative",
                                        left: "15px",
                                        padding: 0,
                                    }}
                                    onClick={() =>
                                        handleToggleItems(
                                            PropertyItems,
                                            displayedPropertyItems,
                                            setDisplayedPropertyItems
                                        )
                                    }
                                >
                                    {displayedPropertyItems === threshold
                                        ? "See more"
                                        : "See less"}
                                </Button>
                            )}
                        </>
                    )}
                </Flex>
                <Divider
                    direction="horizontal"
                    style={{ display: isMobile ? "none" : "flex" }}
                />
                <Flex direction="column">
                    <Flex
                        align="center"
                        justify="space-between"
                        padding=".8rem 0"
                        onClick={() => toggleColumn("price")}
                        cursor="pointer"
                    >
                        <Text
                            type="p"
                            text="Price"
                            weight={500}
                            color="#06062A"
                        />
                        {columnState.price ? (
                            <BsChevronUp
                                color="var(--color-light-gray)"
                                size={20}
                            />
                        ) : (
                            <BsChevronDown
                                color="var(--color-light-gray)"
                                size={20}
                            />
                        )}
                    </Flex>
                    <div style={{ padding: "0px 14px" }}>
                        {columnState.price && (
                            <>
                                <Slider
                                    defaultValue={[0, 20000000]}
                                    // value={[staySearchFilters.minAmount ?? 0, staySearchFilters.maxAmount ?? 20000000]}
                                    marks={marks}
                                    min={0}
                                    max={20000000}
                                    onChange={(e, v) => {
                                        const values = v as number[];
                                        handlePriceChangeDebounce({
                                            minAmount: values[0] || 0,
                                            maxAmount: values[1] || 0,
                                        });
                                    }}
                                />
                                <Flex gap="20px" align="center">
                                    <input
                                        type="number"
                                        value={prices[0]}
                                        onChange={({ target }) => setPrices(prev => [parseInt(target.value), prev[1]])}
                                        min={0}
                                        max={20000000}
                                        style={{
                                            width: "100%",
                                            padding: "11px",
                                            border: `1px solid ${ttColors.gray}`,
                                            borderRadius: "15px",
                                            outline: "none",
                                            fontSize: "16px",
                                            background: "transparent",
                                        }}
                                    />
                                    -
                                    <input
                                        type="number"
                                        value={prices[1]}
                                        onChange={({ target }) => setPrices(prev => [prev[0], parseInt(target.value)])}
                                        min={prices[0]}
                                        max={20000000}
                                        style={{
                                            width: "100%",
                                            padding: "11px",
                                            border: `1px solid ${ttColors.gray}`,
                                            borderRadius: "15px",
                                            outline: "none",
                                            fontSize: "16px",
                                            background: "transparent",
                                        }}
                                    />
                                </Flex>
                            </>
                        )}
                    </div>
                </Flex>
                <Divider
                    direction="horizontal"
                    style={{ display: isMobile ? "none" : "flex" }}
                />
                <Flex direction="column">
                    <Flex
                        align="center"
                        justify="space-between"
                        padding=".8rem 0"
                        onClick={() => toggleColumn("rating")}
                        cursor="pointer"
                    >
                        <Text
                            type="p"
                            text="Star Rating"
                            weight={500}
                            color="#06062A"
                        />
                        {columnState.rating ? (
                            <BsChevronUp
                                color="var(--color-light-gray)"
                                size={20}
                            />
                        ) : (
                            <BsChevronDown
                                color="var(--color-light-gray)"
                                size={20}
                            />
                        )}
                    </Flex>
                    {columnState.rating && (
                        <Flex direction="column" width="fit-content">
                            {ratings.map((item, index) => (
                                <FormControlLabel
                                    key={index}
                                    checked={staySearchFilters?.star === String(item.rating)}
                                    value={
                                        String(item.rating)
                                    }
                                    onChange={(e) =>
                                        handleEnumCheckBoxSingleChanged({
                                            value: String(item.rating),
                                            field: "star",
                                        })
                                    }
                                    control={
                                        <Checkbox
                                            className="mui-checked"
                                            disableFocusRipple
                                            disableRipple
                                        />
                                    }
                                    label={
                                        <Flex gap="50px">
                                            <Text
                                                type="p"
                                                text={item.text}
                                                styles={{
                                                    fontSize: "15px",
                                                    width: "fit-content",
                                                }}
                                            />
                                            <Rating
                                                name="customized-10"
                                                readOnly
                                                defaultValue={item.rating}
                                                max={item.rating}
                                            />
                                        </Flex>
                                    }
                                />
                            ))}
                        </Flex>
                    )}
                </Flex>
                <Divider
                    direction="horizontal"
                    style={{ display: isMobile ? "none" : "flex" }}
                />
                {/* <Flex direction="column" gap=".5rem">
                    <Flex
                        align="center"
                        justify="space-between"
                        padding=".8rem 0"
                        onClick={() => toggleColumn("guestRating")}
                        cursor="pointer"
                    >
                        <Text
                            type="p"
                            text="Guest Rating"
                            weight={500}
                            color="#06062A"
                        />
                        {columnState.guestRating ? (
                            <BsChevronUp
                                color="var(--color-light-gray)"
                                size={20}
                            />
                        ) : (
                            <BsChevronDown
                                color="var(--color-light-gray)"
                                size={20}
                            />
                        )}
                    </Flex>
                    {columnState.guestRating && (
                        <Flex direction="column" width="fit-content">
                            {ratings.map((item, index) => (
                                <FormControlLabel
                                    key={index}
                                    checked={staySearchFilters.guestRating?.includes(
                                        HotelGuestRating[item.value]
                                    )}
                                    value={
                                        HotelGuestRating[item.value]
                                    }
                                    onChange={(e) =>
                                        handleEnumCheckBoxGroupChanged({
                                            value: HotelGuestRating[item.value],
                                            field: "guestRating",
                                        })
                                    }
                                    control={
                                        <Checkbox
                                            className="mui-checked"
                                            disableFocusRipple
                                            disableRipple
                                        />
                                    }
                                    label={
                                        <Flex gap="50px">
                                            <Text
                                                type="p"
                                                text={item.text}
                                                styles={{
                                                    fontSize: "15px",
                                                    width: "fit-content",
                                                }}
                                            />
                                            <Rating
                                                name="customized-10"
                                                readOnly
                                                defaultValue={item.rating}
                                                max={item.rating}
                                            />
                                        </Flex>
                                    }
                                />
                            ))}
                        </Flex>
                    )}
                </Flex> */}
                {/* <Divider
                    direction="horizontal"
                    style={{ display: isMobile ? "none" : "flex" }}
                /> */}
                <Flex direction="column">
                    <Flex
                        align="center"
                        justify="space-between"
                        padding=".8rem 0"
                        onClick={() => toggleColumn("policy")}
                        cursor="pointer"
                    >
                        <Text
                            type="p"
                            text="Cancellation Policy"
                            weight={500}
                            color="#06062A"
                        />
                        {columnState.policy ? (
                            <BsChevronUp
                                color="var(--color-light-gray)"
                                size={20}
                            />
                        ) : (
                            <BsChevronDown
                                color="var(--color-light-gray)"
                                size={20}
                            />
                        )}
                    </Flex>
                    {columnState.policy && (
                        <>
                            <Flex direction="column" width="fit-content">
                                {Object.keys(HotelCancellationPolicy).map(
                                    (cancellationPolicyKey, index) => (
                                        <FormControlLabel
                                            key={index}
                                            checked={staySearchFilters.cancellationPolicy?.includes(
                                                HotelCancellationPolicy[
                                                    cancellationPolicyKey as keyof typeof HotelCancellationPolicy
                                                ]
                                            )}
                                            value={
                                                HotelCancellationPolicy[
                                                    cancellationPolicyKey as keyof typeof HotelCancellationPolicy
                                                ]
                                            }
                                            onChange={(e) =>
                                                handleEnumCheckBoxGroupChanged({
                                                    value: HotelCancellationPolicy[
                                                        cancellationPolicyKey as keyof typeof HotelCancellationPolicy
                                                    ],
                                                    field: "cancellationPolicy",
                                                })
                                            }
                                            control={
                                                <Checkbox
                                                    className="mui-checked"
                                                    disableFocusRipple
                                                    disableRipple
                                                />
                                            }
                                            label={
                                                <Text
                                                    type="p"
                                                    transform="capitalize"
                                                    text={cancellationPolicyKey.replaceAll(
                                                        "_",
                                                        " "
                                                    )}
                                                    styles={{
                                                        fontSize: "15px",
                                                        width: "fit-content",
                                                    }}
                                                />
                                            }
                                        />
                                    )
                                )}
                            </Flex>
                            {Policies.length > threshold && (
                                <Button
                                    variant="link"
                                    styles={{
                                        position: "relative",
                                        left: "15px",
                                        padding: 0,
                                    }}
                                    onClick={() =>
                                        handleToggleItems(
                                            Policies,
                                            displayedPoliciesItems,
                                            setDisplayedPoliciesItems
                                        )
                                    }
                                >
                                    {displayedPoliciesItems === threshold
                                        ? "See more"
                                        : "See less"}
                                </Button>
                            )}
                        </>
                    )}
                </Flex>
                <Divider
                    direction="horizontal"
                    style={{ display: isMobile ? "none" : "flex" }}
                />
                <Flex direction="column">
                    <Flex
                        align="center"
                        justify="space-between"
                        padding=".8rem 0"
                        onClick={() => toggleColumn("services")}
                        cursor="pointer"
                    >
                        <Text
                            type="p"
                            text="Facilities & Services"
                            weight={500}
                            color="#06062A"
                        />
                        {columnState.services ? (
                            <BsChevronUp
                                color="var(--color-light-gray)"
                                size={20}
                            />
                        ) : (
                            <BsChevronDown
                                color="var(--color-light-gray)"
                                size={20}
                            />
                        )}
                    </Flex>
                    {columnState.services && (
                        <>
                            <Flex direction="column" width="fit-content">
                                {Object.keys(HotelAmenityEnum).map(
                                    (item, index) => (
                                        <FormControlLabel
                                            key={index}
                                            checked={staySearchFilters.amenity?.includes(
                                                HotelAmenityEnum[
                                                    item as keyof typeof HotelAmenityEnum
                                                ]
                                            )}
                                            value={
                                                HotelAmenityEnum[
                                                    item as keyof typeof HotelAmenityEnum
                                                ]
                                            }
                                            onChange={(e) =>
                                                handleEnumCheckBoxGroupChanged({
                                                    value: HotelAmenityEnum[
                                                        item as keyof typeof HotelAmenityEnum
                                                    ],
                                                    field: "amenity",
                                                })
                                            }
                                            control={
                                                <Checkbox
                                                    className="mui-checked"
                                                    disableFocusRipple
                                                    disableRipple
                                                />
                                            }
                                            label={
                                                <Text
                                                    type="p"
                                                    transform="capitalize"
                                                    text={item.replaceAll(
                                                        "_",
                                                        " "
                                                    )}
                                                    styles={{
                                                        fontSize: "15px",
                                                        width: "fit-content",
                                                    }}
                                                />
                                            }
                                        />
                                    )
                                )}
                            </Flex>
                            {Facilities.length > threshold && (
                                <Button
                                    variant="link"
                                    styles={{
                                        position: "relative",
                                        left: "15px",
                                        padding: 0,
                                    }}
                                    onClick={() =>
                                        handleToggleItems(
                                            Facilities,
                                            displayedServicesItems,
                                            setDisplayedServicesItems
                                        )
                                    }
                                >
                                    {displayedServicesItems === threshold
                                        ? "See more"
                                        : "See less"}
                                </Button>
                            )}
                        </>
                    )}
                </Flex>

                <Divider
                    direction="horizontal"
                    style={{ display: isMobile ? "none" : "flex" }}
                />
                <Flex direction="column">
                    <Flex
                        align="center"
                        justify="space-between"
                        padding=".8rem 0"
                        onClick={() => toggleColumn("plan")}
                        cursor="pointer"
                    >
                        <Text
                            type="p"
                            text="Meal Plan"
                            weight={500}
                            color="#06062A"
                        />
                        {columnState.plan ? (
                            <BsChevronUp
                                color="var(--color-light-gray)"
                                size={20}
                            />
                        ) : (
                            <BsChevronDown
                                color="var(--color-light-gray)"
                                size={20}
                            />
                        )}
                    </Flex>
                    {columnState.plan && (
                        <>
                            <Flex direction="column" width="fit-content">
                                {Object.keys(HotelMealEnum).map(
                                    (item, index) => (
                                        <FormControlLabel
                                            key={index}
                                            checked={staySearchFilters.meals === HotelMealEnum[
                                                    item as keyof typeof HotelMealEnum
                                                ]
                                            }
                                            value={
                                                HotelMealEnum[
                                                    item as keyof typeof HotelMealEnum
                                                ]
                                            }
                                            onChange={(e) =>
                                                handleEnumCheckBoxSingleChanged({
                                                    value: HotelMealEnum[
                                                        item as keyof typeof HotelMealEnum
                                                    ],
                                                    field: "meals",
                                                })
                                            }
                                            control={
                                                <Checkbox
                                                    className="mui-checked"
                                                    disableFocusRipple
                                                    disableRipple
                                                />
                                            }
                                            label={
                                                <Text
                                                    type="p"
                                                    transform="capitalize"
                                                    text={item.replaceAll(
                                                        "_",
                                                        " "
                                                    )}
                                                    styles={{
                                                        fontSize: "15px",
                                                        width: "fit-content",
                                                    }}
                                                />
                                            }
                                        />
                                    )
                                )}
                            </Flex>
                            {Meal.length > threshold && (
                                <Button
                                    variant="link"
                                    styles={{
                                        position: "relative",
                                        left: "15px",
                                        padding: 0,
                                    }}
                                    onClick={() =>
                                        handleToggleItems(
                                            Meal,
                                            displayedMealItems,
                                            setDisplayedMealItems
                                        )
                                    }
                                >
                                    {displayedMealItems === threshold
                                        ? "See more"
                                        : "See less"}
                                </Button>
                            )}
                        </>
                    )}
                </Flex>
                <Divider
                    direction="horizontal"
                    style={{ display: isMobile ? "none" : "flex" }}
                />
                <Flex direction="column">
                    <Flex
                        align="center"
                        justify="space-between"
                        padding=".8rem 0"
                        onClick={() => toggleColumn("rooms")}
                        cursor="pointer"
                    >
                        <Text
                            type="p"
                            text="Rooms"
                            weight={500}
                            color="#06062A"
                        />
                        {columnState.rooms ? (
                            <BsChevronUp
                                color="var(--color-light-gray)"
                                size={20}
                            />
                        ) : (
                            <BsChevronDown
                                color="var(--color-light-gray)"
                                size={20}
                            />
                        )}
                    </Flex>
                    {columnState.rooms && (
                        <>
                            <Flex direction="column" width="fit-content">
                                {Object.keys(HotelRoomEnum).map(
                                    (item, index, arr) => (
                                        <FormControlLabel
                                            key={index}
                                            checked={staySearchFilters.room?.includes(
                                                HotelRoomEnum[
                                                    item as keyof typeof HotelRoomEnum
                                                ]
                                            )}
                                            value={
                                                HotelRoomEnum[
                                                    item as keyof typeof HotelRoomEnum
                                                ]
                                            }
                                            onChange={(e) =>
                                                handleEnumCheckBoxGroupChanged({
                                                    value: HotelRoomEnum[
                                                        item as keyof typeof HotelRoomEnum
                                                    ],
                                                    field: "room",
                                                })
                                            }
                                            control={
                                                <Checkbox
                                                    className="mui-checked"
                                                    disableFocusRipple
                                                    disableRipple
                                                />
                                            }
                                            label={
                                                <Text
                                                    type="p"
                                                    transform="capitalize"
                                                    text={HotelRoomEnum[item as keyof typeof HotelRoomEnum]}
                                                    styles={{
                                                        fontSize: "15px",
                                                        width: "fit-content",
                                                    }}
                                                />
                                            }
                                        />
                                    )
                                )}
                            </Flex>
                            {Rooms.length > threshold && (
                                <Button
                                    variant="link"
                                    styles={{
                                        position: "relative",
                                        left: "15px",
                                        padding: 0,
                                    }}
                                    onClick={() =>
                                        handleToggleItems(
                                            Rooms,
                                            displayedRoomsItems,
                                            setDisplayedRoomsItems
                                        )
                                    }
                                >
                                    {displayedRoomsItems === threshold
                                        ? "See more"
                                        : "See less"}
                                </Button>
                            )}
                        </>
                    )}
                </Flex>
                <Divider
                    direction="horizontal"
                    style={{ display: isMobile ? "none" : "flex" }}
                />
                <Flex direction="column">
                    <Flex
                        align="center"
                        justify="space-between"
                        padding=".8rem 0"
                        onClick={() => toggleColumn("bed")}
                        cursor="pointer"
                    >
                        <Text
                            type="p"
                            text="Bed Type"
                            weight={500}
                            color="#06062A"
                        />
                        {columnState.bed ? (
                            <BsChevronUp
                                color="var(--color-light-gray)"
                                size={20}
                            />
                        ) : (
                            <BsChevronDown
                                color="var(--color-light-gray)"
                                size={20}
                            />
                        )}
                    </Flex>
                    {columnState.bed && (
                        <>
                            <Flex direction="column" width="fit-content">
                                {Object.keys(HotelBedTypeEnum).map(
                                    (item, index) => (
                                        <FormControlLabel
                                            key={index}
                                            checked={staySearchFilters.bedType?.includes(
                                                HotelBedTypeEnum[
                                                    item as keyof typeof HotelBedTypeEnum
                                                ]
                                            )}
                                            value={
                                                HotelBedTypeEnum[
                                                    item as keyof typeof HotelBedTypeEnum
                                                ]
                                            }
                                            onChange={(e) =>
                                                handleEnumCheckBoxGroupChanged({
                                                    value: HotelBedTypeEnum[
                                                        item as keyof typeof HotelBedTypeEnum
                                                    ],
                                                    field: "bedType",
                                                })
                                            }
                                            control={
                                                <Checkbox
                                                    className="mui-checked"
                                                    disableFocusRipple
                                                    disableRipple
                                                />
                                            }
                                            label={
                                                <Text
                                                    type="p"
                                                    text={capCase(item, '_')}
                                                    styles={{
                                                        fontSize: "15px",
                                                        width: "fit-content",
                                                    }}
                                                />
                                            }
                                        />
                                    )
                                )}
                            </Flex>
                            {BedType.length > threshold && (
                                <Button
                                    variant="link"
                                    styles={{
                                        position: "relative",
                                        left: "15px",
                                        padding: 0,
                                    }}
                                    onClick={() =>
                                        handleToggleItems(
                                            BedType,
                                            displayedBedTypeItems,
                                            setDisplayedBedTypeItems
                                        )
                                    }
                                >
                                    {displayedBedTypeItems === threshold
                                        ? "See more"
                                        : "See less"}
                                </Button>
                            )}
                        </>
                    )}
                </Flex>
            </Flex>
        </ScrollBox>
    );
}

export default SortingColumns;
