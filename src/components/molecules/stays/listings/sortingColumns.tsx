import { Divider } from "@atom/divider";
import Flex from "@components/templates/flex";
import { CustomRadioGroup } from "@molecule/radio";
import { SearchInputAsString } from "@organism/searchInput";
import Text from "@atom/text";
import React, { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { LuSearch } from "react-icons/lu";

import Button from "@/components/atoms/button";
import Slider from "../../slider";
import FavoriteHotels from "../components/favoriteHotels";
import PriceAlerts from "../components/priceAlerts";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Rating } from "@mui/material";

function SortingColumns() {
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

  const [displayedPropertyItems, setDisplayedPropertyItems] = useState<number>(
    PropertyItems.length > threshold ? threshold : PropertyItems.length
  );
  const [displayedPoliciesItems, setDisplayedPoliciesItems] = useState<number>(
    Policies.length > threshold ? threshold : Policies.length
  );

  const [displayedServicesItems, setDisplayedServicesItems] = useState<number>(
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

  // Create a generic function to handle item display
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
  return (
    <Flex
      direction="column"
      styles={{ minWidth: "300px", position: "sticky", top: "0", zIndex: 10 }}
    >
      <PriceAlerts />
      <FavoriteHotels />
      <div style={{ marginBottom: "10px" }}>
        <SearchInputAsString
          options={["Hey move along"]}
          onChange={(e: any) => console.log(e)}
          placeholder="Search for hotels"
        >
          <LuSearch color="#929292" size={20} />
        </SearchInputAsString>
      </div>

      <Flex direction="column">
        <Flex
          align="center"
          justify="space-between"
          padding="0.8rem 0"
          onClick={() => toggleColumn("popular")}
          styles={{ cursor: "pointer" }}
        >
          <Text type="p" text="Popular Type" weight={500} color="#06062A" />
          {columnState.popular ? (
            <BsChevronUp color="var(--color-light-gray)" size={20} />
          ) : (
            <BsChevronDown color="var(--color-light-gray)" size={20} />
          )}
        </Flex>
        {columnState.popular && (
          <>
            <Flex direction="column" width="fit-content">
              {PopularItems.slice(0, displayedPopularItems).map(
                (item, index) => (
                  <FormControlLabel
                    key={index}
                    control={<Checkbox disableFocusRipple disableRipple />}
                    label={
                      <Text
                        type="p"
                        text={item}
                        styles={{ fontSize: "15px", width: "fit-content" }}
                      />
                    }
                  />
                )
              )}
            </Flex>
            {PopularItems.length > threshold && (
              <Button
                variant="link"
                styles={{ position: "relative", left: "17px", padding: 0 }}
                onClick={() =>
                  handleToggleItems(
                    PopularItems,
                    displayedPopularItems,
                    setDisplayedPopularItems
                  )
                }
              >
                {displayedPopularItems === threshold ? "See more" : "See less"}
              </Button>
            )}
          </>
        )}
      </Flex>
      <Divider direction="horizontal" />

      <Flex direction="column">
        <Flex
          align="center"
          justify="space-between"
          padding=".8rem 0"
          onClick={() => toggleColumn("property")}
          styles={{ cursor: "pointer" }}
        >
          <Text type="p" text="Property Type" weight={500} color="#06062A" />
          {columnState.property ? (
            <BsChevronUp color="var(--color-light-gray)" size={20} />
          ) : (
            <BsChevronDown color="var(--color-light-gray)" size={20} />
          )}
        </Flex>
        {columnState.property && (
          <>
            <Flex direction="column" width="fit-content">
              {PropertyItems.slice(0, displayedPropertyItems).map(
                (item, index) => (
                  <FormControlLabel
                    key={index}
                    control={<Checkbox disableFocusRipple disableRipple />}
                    label={
                      <Text
                        type="p"
                        text={item}
                        styles={{ fontSize: "15px", width: "fit-content" }}
                      />
                    }
                  />
                )
              )}
            </Flex>
            {PropertyItems.length > threshold && (
              <Button
                variant="link"
                styles={{ position: "relative", left: "15px", padding: 0 }}
                onClick={() =>
                  handleToggleItems(
                    PropertyItems,
                    displayedPropertyItems,
                    setDisplayedPropertyItems
                  )
                }
              >
                {displayedPropertyItems === threshold ? "See more" : "See less"}
              </Button>
            )}
          </>
        )}
      </Flex>
      <Divider direction="horizontal" />
      <Flex direction="column">
        <Flex
          align="center"
          justify="space-between"
          padding=".8rem 0"
          onClick={() => toggleColumn("price")}
          cursor="pointer"
        >
          <Text type="p" text="Price" weight={500} color="#06062A" />
          {columnState.price ? (
            <BsChevronUp color="var(--color-light-gray)" size={20} />
          ) : (
            <BsChevronDown color="var(--color-light-gray)" size={20} />
          )}
        </Flex>
        <div style={{ padding: "0px 14px" }}>
          {columnState.price && (
            <Slider defaultValue={[0, 100]} marks={marks} />
          )}
        </div>
      </Flex>
      <Divider direction="horizontal" />
      <Flex direction="column">
        <Flex
          align="center"
          justify="space-between"
          padding=".8rem 0"
          onClick={() => toggleColumn("rating")}
          cursor="pointer"
        >
          <Text type="p" text="Star Rating" weight={500} color="#06062A" />
          {columnState.rating ? (
            <BsChevronUp color="var(--color-light-gray)" size={20} />
          ) : (
            <BsChevronDown color="var(--color-light-gray)" size={20} />
          )}
        </Flex>
        {columnState.rating && (
          <Flex direction="column" width="fit-content">
            {ratings.map((item, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox disableFocusRipple disableRipple />}
                label={
                  <Flex gap="50px">
                    <Text
                      type="p"
                      text={item.text}
                      styles={{ fontSize: "15px", width: "fit-content" }}
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
      <Divider direction="horizontal" />
      <Flex direction="column" gap=".5rem">
        <Flex
          align="center"
          justify="space-between"
          padding=".8rem 0"
          onClick={() => toggleColumn("guestRating")}
          cursor="pointer"
        >
          <Text type="p" text="Guest Rating" weight={500} color="#06062A" />
          {columnState.guestRating ? (
            <BsChevronUp color="var(--color-light-gray)" size={20} />
          ) : (
            <BsChevronDown color="var(--color-light-gray)" size={20} />
          )}
        </Flex>
        {columnState.guestRating && (
          <Flex direction="column" width="fit-content">
            {ratings.map((item, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox disableFocusRipple disableRipple />}
                label={
                  <Flex gap="50px">
                    <Text
                      type="p"
                      text={item.text}
                      styles={{ fontSize: "15px", width: "fit-content" }}
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
      <Divider direction="horizontal" />
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
            <BsChevronUp color="var(--color-light-gray)" size={20} />
          ) : (
            <BsChevronDown color="var(--color-light-gray)" size={20} />
          )}
        </Flex>
        {columnState.policy && (
          <>
            <Flex direction="column" width="fit-content">
              {Policies.slice(0, displayedPoliciesItems).map((item, index) => (
                <FormControlLabel
                  key={index}
                  control={<Checkbox disableFocusRipple disableRipple />}
                  label={
                    <Text
                      type="p"
                      text={item}
                      styles={{ fontSize: "15px", width: "fit-content" }}
                    />
                  }
                />
              ))}
            </Flex>
            {Policies.length > threshold && (
              <Button
                variant="link"
                styles={{ position: "relative", left: "15px", padding: 0 }}
                onClick={() =>
                  handleToggleItems(
                    Policies,
                    displayedPoliciesItems,
                    setDisplayedPoliciesItems
                  )
                }
              >
                {displayedPoliciesItems === threshold ? "See more" : "See less"}
              </Button>
            )}
          </>
        )}
      </Flex>
      <Divider direction="horizontal" />
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
            <BsChevronUp color="var(--color-light-gray)" size={20} />
          ) : (
            <BsChevronDown color="var(--color-light-gray)" size={20} />
          )}
        </Flex>
        {columnState.services && (
          <>
            <Flex direction="column" width="fit-content">
              {Facilities.slice(0, displayedServicesItems).map(
                (item, index) => (
                  <FormControlLabel
                    key={index}
                    control={<Checkbox disableFocusRipple disableRipple />}
                    label={
                      <Text
                        type="p"
                        text={item}
                        styles={{ fontSize: "15px", width: "fit-content" }}
                      />
                    }
                  />
                )
              )}
            </Flex>
            {Facilities.length > threshold && (
              <Button
                variant="link"
                styles={{ position: "relative", left: "15px", padding: 0 }}
                onClick={() =>
                  handleToggleItems(
                    Facilities,
                    displayedServicesItems,
                    setDisplayedServicesItems
                  )
                }
              >
                {displayedServicesItems === threshold ? "See more" : "See less"}
              </Button>
            )}
          </>
        )}
      </Flex>

      <Divider direction="horizontal" />
      <Flex direction="column">
        <Flex
          align="center"
          justify="space-between"
          padding=".8rem 0"
          onClick={() => toggleColumn("plan")}
          cursor="pointer"
        >
          <Text type="p" text="Meal Plan" weight={500} color="#06062A" />
          {columnState.plan ? (
            <BsChevronUp color="var(--color-light-gray)" size={20} />
          ) : (
            <BsChevronDown color="var(--color-light-gray)" size={20} />
          )}
        </Flex>
        {columnState.plan && (
          <>
            <Flex direction="column" width="fit-content">
              {Meal.slice(0, displayedMealItems).map((item, index) => (
                <FormControlLabel
                  key={index}
                  control={<Checkbox disableFocusRipple disableRipple />}
                  label={
                    <Text
                      type="p"
                      text={item}
                      styles={{ fontSize: "15px", width: "fit-content" }}
                    />
                  }
                />
              ))}
            </Flex>
            {Meal.length > threshold && (
              <Button
                variant="link"
                styles={{ position: "relative", left: "15px", padding: 0 }}
                onClick={() =>
                  handleToggleItems(
                    Meal,
                    displayedMealItems,
                    setDisplayedMealItems
                  )
                }
              >
                {displayedMealItems === threshold ? "See more" : "See less"}
              </Button>
            )}
          </>
        )}
      </Flex>
      <Divider direction="horizontal" />
      <Flex direction="column">
        <Flex
          align="center"
          justify="space-between"
          padding=".8rem 0"
          onClick={() => toggleColumn("rooms")}
          cursor="pointer"
        >
          <Text type="p" text="Number of Rooms" weight={500} color="#06062A" />
          {columnState.rooms ? (
            <BsChevronUp color="var(--color-light-gray)" size={20} />
          ) : (
            <BsChevronDown color="var(--color-light-gray)" size={20} />
          )}
        </Flex>
        {columnState.rooms && (
          <>
            <Flex direction="column" width="fit-content">
              {Rooms.slice(0, displayedRoomsItems).map((item, index) => (
                <FormControlLabel
                  key={index}
                  control={<Checkbox disableFocusRipple disableRipple />}
                  label={
                    <Text
                      type="p"
                      text={item}
                      styles={{ fontSize: "15px", width: "fit-content" }}
                    />
                  }
                />
              ))}
            </Flex>
            {Rooms.length > threshold && (
              <Button
                variant="link"
                styles={{ position: "relative", left: "15px", padding: 0 }}
                onClick={() =>
                  handleToggleItems(
                    Rooms,
                    displayedRoomsItems,
                    setDisplayedRoomsItems
                  )
                }
              >
                {displayedRoomsItems === threshold ? "See more" : "See less"}
              </Button>
            )}
          </>
        )}
      </Flex>
      <Divider direction="horizontal" />
      <Flex direction="column">
        <Flex
          align="center"
          justify="space-between"
          padding=".8rem 0"
          onClick={() => toggleColumn("bed")}
          cursor="pointer"
        >
          <Text type="p" text="Bed Type" weight={500} color="#06062A" />
          {columnState.bed ? (
            <BsChevronUp color="var(--color-light-gray)" size={20} />
          ) : (
            <BsChevronDown color="var(--color-light-gray)" size={20} />
          )}
        </Flex>
        {columnState.bed && (
          <>
            <Flex direction="column" width="fit-content">
              {BedType.slice(0, displayedBedTypeItems).map((item, index) => (
                <FormControlLabel
                  key={index}
                  control={<Checkbox disableFocusRipple disableRipple />}
                  label={
                    <Text
                      type="p"
                      text={item}
                      styles={{ fontSize: "15px", width: "fit-content" }}
                    />
                  }
                />
              ))}
            </Flex>
            {BedType.length > threshold && (
              <Button
                variant="link"
                styles={{ position: "relative", left: "15px", padding: 0 }}
                onClick={() =>
                  handleToggleItems(
                    BedType,
                    displayedBedTypeItems,
                    setDisplayedBedTypeItems
                  )
                }
              >
                {displayedBedTypeItems === threshold ? "See more" : "See less"}
              </Button>
            )}
          </>
        )}
      </Flex>
    </Flex>
  );
}

export default SortingColumns;
