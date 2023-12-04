import { Divider } from "@atom/divider";
import Flex from "@components/templates/flex";
import Text from "@atom/text";
import React, { useState } from "react";
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
    HotelMealEnum,
    HotelPopularTypes,
    HotelPropertyTypes,
    HotelRoomEnum,
    StaySearchFilters,
} from "@/lib/types/request-models/stay/search.type";
import { debounce } from "debounce";

const marks = [
    {
        value: 0,
        label: "$0",
    },
    {
        value: 100,
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
        rating: 5,
    },
    {
        text: "4 Stars",
        rating: 4,
    },
    {
        text: "3 Stars",
        rating: 3,
    },
    {
        text: "2 Stars",
        rating: 2,
    },
    {
        text: "1 Stars",
        rating: 1,
    },
    {
        text: "No rating",
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

    const { staySearchFilters, updateStaySearchFilters } = useStaySearchStore(
        (state) => state
    );

    const {
        meals,
        popularTypes,
        propertyTypes,
        starRating,
        guestRating,
        cancellationPolicy,
        amenity,
        room,
        bedType,
    } = staySearchFilters;

    const handleUpdateStaySearchFilters = (params: StaySearchFilters) => {
        updateStaySearchFilters({
            ...staySearchFilters,
            ...params,
        });
    };
    const handleMealPlanChanged = (value: string) => {
        // Check if the value is already in the array
        const isSelected = meals?.includes(value);
        if (isSelected) {
            // If the value is already selected, remove it
            handleUpdateStaySearchFilters({
                meals: meals?.filter((item) => item !== value),
            });
        } else {
            // If the value is not selected, add it
            handleUpdateStaySearchFilters({
                meals: [...(meals ?? []), value],
            });
        }
    };
    const handlePropertyTypeChanged = (value: string) => {
        const isSelected = propertyTypes?.includes(value);
        if (isSelected) {
            handleUpdateStaySearchFilters({
                propertyTypes: propertyTypes?.filter((item) => item !== value),
            });
        } else {
            handleUpdateStaySearchFilters({
                propertyTypes: [...(propertyTypes ?? []), value],
            });
        }
    };

    const handlePopularTypeChanged = (value: string) => {
        const isSelected = popularTypes?.includes(value);
        if (isSelected) {
            handleUpdateStaySearchFilters({
                popularTypes: popularTypes?.filter((item) => item !== value),
            });
        } else {
            handleUpdateStaySearchFilters({
                popularTypes: [...(popularTypes ?? []), value],
            });
        }
    };
    const handleStarRatingChanged = (value: string) => {
        const isSelected = starRating?.includes(value);
        if (isSelected) {
            handleUpdateStaySearchFilters({
                starRating: starRating?.filter((item) => item !== value),
            });
        } else {
            handleUpdateStaySearchFilters({
                starRating: [...(starRating ?? []), value],
            });
        }
    };
    const handleGuestRatingChanged = (value: string) => {
        const isSelected = guestRating?.includes(value);
        if (isSelected) {
            handleUpdateStaySearchFilters({
                guestRating: guestRating?.filter((item) => item !== value),
            });
        } else {
            handleUpdateStaySearchFilters({
                guestRating: [...(guestRating ?? []), value],
            });
        }
    };
    const handleCancellationPolicyChanged = (value: string) => {
        const isSelected = cancellationPolicy?.includes(value);
        if (isSelected) {
            handleUpdateStaySearchFilters({
                cancellationPolicy: cancellationPolicy?.filter(
                    (item) => item !== value
                ),
            });
        } else {
            handleUpdateStaySearchFilters({
                cancellationPolicy: [...(cancellationPolicy ?? []), value],
            });
        }
    };
    const handleAmenityChanged = (value: string) => {
        const isSelected = amenity?.includes(value);
        if (isSelected) {
            handleUpdateStaySearchFilters({
                amenity: amenity?.filter((item) => item !== value),
            });
        } else {
            handleUpdateStaySearchFilters({
                amenity: [...(amenity ?? []), value],
            });
        }
    };

    const handleRoomChanged = (value: string) => {
        const isSelected = room?.includes(value);
        if (isSelected) {
            handleUpdateStaySearchFilters({
                room: room?.filter((item) => item !== value),
            });
        } else {
            handleUpdateStaySearchFilters({
                room: [...(room ?? []), value],
            });
        }
    };
    const handleBedTypeChanged = (value: string) => {
        const isSelected = bedType?.includes(value);
        if (isSelected) {
            handleUpdateStaySearchFilters({
                bedType: bedType?.filter((item) => item !== value),
            });
        } else {
            handleUpdateStaySearchFilters({
                bedType: [...(bedType ?? []), value],
            });
        }
    };
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
                <div style={{ marginBottom: "10px" }}>
                    <span style={{ position: "relative" }}>
                        <Input placeholder="Search for hotels" />
                        <LuSearch
                            color="#929292"
                            size={20}
                            style={{
                                float: "right",
                                position: "absolute",
                                right: "10px",
                                top: "12px",
                            }}
                        />
                    </span>
                </div>

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
                                            value={
                                                HotelPopularTypes[
                                                    popularTypeKey as keyof typeof HotelPopularTypes
                                                ]
                                            }
                                            onChange={(e) =>
                                                handleEnumCheckBoxGroupChanged({
                                                    value: HotelPopularTypes[
                                                        popularTypeKey as keyof typeof HotelPopularTypes
                                                    ],
                                                    field: "popularTypes",
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
                                                    field: "propertyTypes",
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
                                    marks={marks}
                                    min={0}
                                    max={20000000}
                                    onChange={(e, v) =>
                                        debounce(() => {
                                            handleUpdateStaySearchFilters({
                                                minAmount: Array.isArray(v)
                                                    ? v[0]
                                                    : 0,
                                                maxAmount: Array.isArray(v)
                                                    ? v[1]
                                                    : 0,
                                            });
                                        }, 800)
                                    }
                                />
                                <Flex gap="20px" align="center">
                                    <input
                                        type="number"
                                        defaultValue={
                                            staySearchFilters.minAmount ?? 0
                                        }
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
                                        defaultValue={
                                            staySearchFilters.maxAmount ??
                                            20000000
                                        }
                                        value={staySearchFilters.maxAmount}
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
                <Flex direction="column" gap=".5rem">
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
                                            value={
                                                HotelMealEnum[
                                                    item as keyof typeof HotelMealEnum
                                                ]
                                            }
                                            onChange={(e) =>
                                                handleEnumCheckBoxGroupChanged({
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
                            text="Number of Rooms"
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
                                    (item, index) => (
                                        <FormControlLabel
                                            key={index}
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
                                            value={
                                                HotelBedTypeEnum[
                                                    item as keyof typeof HotelBedTypeEnum
                                                ]
                                            }
                                            onChange={(e) =>
                                                handleCancellationPolicyChanged(
                                                    HotelBedTypeEnum[
                                                        item as keyof typeof HotelBedTypeEnum
                                                    ]
                                                )
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
                                                    text={item}
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
