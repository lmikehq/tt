"use client";
import Text from "@/components/atoms/text";
import Section from "../../section";
import { Grid } from "@/components/templates/grid";
import Flex from "@/components/templates/flex";
import { DatePicker } from "@/components/organisms/customDatePicker";
import Button from "@/components/atoms/button";
import { ttColors } from "@/lib/theme/colors";
import { BtnDetails, ButtonBtn, Container, Header, Span } from "./styles";
import ChooseYourRoomList from "./ChooseYourRoomList";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import TuneIcon from "@mui/icons-material/Tune";
import CachedIcon from "@mui/icons-material/Cached";
import CloseIcon from "@mui/icons-material/Close";
import { FlexBox } from "../components/styles";
import { useState } from "react";
import { ChangeSearchModal, FilterModal } from "./modals/Modals";
import FilterBox from "./modals/components/FilterBox";

const ChooseYourRoom = () => {
  const { isMobile } = useScreenResolution();

  const [open, setOpen] = useState({
    search: false,
    filter: false,
  });

  // BEDS
  const [beds, setBeds] = useState("");
  const bedsOptions = [
    { value: "all options", displayValue: "All Options" },
    { value: "double bed", displayValue: "Double Bed" },
    { value: "separate bed", displayValue: "Separate Bed" },
  ];

  // MEALS
  const [selectedMealCheckboxValues, setSelectedMealCheckboxValues] = useState<
    string[]
  >([]);
  const mealOptions = [
    { value: "no meal", displayValue: "No Meal" },
    { value: "breakfast", displayValue: "Breakfast" },
    {
      value: "breakfast + lunch or dinner",
      displayValue: "Breakfast + Lunch or Dinner",
    },
    {
      value: "breakfast, lunch and dinner",
      displayValue: "Breakfast, Lunch and Dinner",
    },
    { value: "all inclusive", displayValue: "All Inclusive" },
  ];

  // CANCELLATION
  const [cancellation, setCancellation] = useState("");
  const cancellationOptions = [
    { value: "all options", displayValue: "All Options" },
    { value: "with free cancellation", displayValue: "With Free Cancellation" },
  ];

  // PAYMENT
  const [selectedPaymentCheckboxValues, setSelectedPaymentCheckboxValues] =
    useState<string[]>([]);
  const paymentOptions = [
    { value: "pay now", displayValue: "Pay Now" },
    { value: "pay at the hotel", displayValue: "Pay at the Hotel" },
  ];

  const [submissionState, setSubmissionState] = useState({
    loading: false,
    //properties needed
  });

  const [allMappedOptions, setAllMappedOptions] = useState<string[]>([]);

  // Map the selected options
  const mapSelectedOptionsToDisplayValues = (
    selectedOptions: string[],
    options: { value: string; displayValue: string }[]
  ) => {
    return selectedOptions.map((option) => {
      const selectedOption = options.find((o) => o.value === option);
      return selectedOption ? selectedOption.displayValue : "";
    });
  };

  const [totalSelectedOptions, setTotalSelectedOptions] = useState<number>(0);

  // SUBMIT HANDLER
  const handleSubmit = () => {
    setOpen((prev) => ({
      ...prev,
      filter: false,
    }));

    // Map the selected options to their display values
    const mappedBeds = mapSelectedOptionsToDisplayValues([beds], bedsOptions);
    const mappedMeals = mapSelectedOptionsToDisplayValues(
      selectedMealCheckboxValues,
      mealOptions
    );
    const mappedCancellation = mapSelectedOptionsToDisplayValues(
      [cancellation],
      cancellationOptions
    );
    const mappedPayment = mapSelectedOptionsToDisplayValues(
      selectedPaymentCheckboxValues,
      paymentOptions
    );

    // Combine all the mapped options
    const combinedOptions: string[] = [
      ...mappedBeds,
      ...mappedMeals,
      ...mappedCancellation,
      ...mappedPayment,
    ].flat();

    setAllMappedOptions(combinedOptions);

    // Recalculate totalSelectedOptions
    const updatedTotalSelectedOptions =
      (beds === "" ? 0 : 1) +
      (cancellation === "" ? 0 : 1) +
      selectedMealCheckboxValues.length +
      selectedPaymentCheckboxValues.length;

    setTotalSelectedOptions(updatedTotalSelectedOptions);
  };

  const resetAllFilters = () => {
    setBeds("");
    setSelectedMealCheckboxValues([]);
    setCancellation("");
    setSelectedPaymentCheckboxValues([]);
    setAllMappedOptions([]);
    setTotalSelectedOptions(0);
  };

  // Remove an option from allMappedOptions
  const removeOption = (optionToRemove: string) => {
    setAllMappedOptions((prevOptions) => {
      return prevOptions.filter((option) => option !== optionToRemove);
    });
  };

  // Remove a specific option from the list
  const removeOptionHandler = (optionToRemove: string) => {
    console.log("Before removeOption:", allMappedOptions);

    removeOption(optionToRemove);

    console.log("After removeOption:", allMappedOptions);

    if (bedsOptions.some((option) => option.value === optionToRemove)) {
      setBeds("");
    } else if (mealOptions.some((option) => option.value === optionToRemove)) {
      setSelectedMealCheckboxValues((prev) =>
        prev.filter((value) => value !== optionToRemove)
      );
    } else if (
      cancellationOptions.some((option) => option.value === optionToRemove)
    ) {
      setCancellation("");
    } else if (
      paymentOptions.some((option) => option.value === optionToRemove)
    ) {
      setSelectedPaymentCheckboxValues((prev) =>
        prev.filter((value) => value !== optionToRemove)
      );
    }

    setTotalSelectedOptions((prev) => prev - 1);
  };

  // Function to get the label for a given option
  const getLabelForOption = (option: string): string => {
    if (bedsOptions.some((bedOption) => bedOption.displayValue === option)) {
      return "Beds:";
    } else if (
      mealOptions.some((mealOption) => mealOption.displayValue === option)
    ) {
      return "Meals:";
    } else if (
      cancellationOptions.some(
        (cancelOption) => cancelOption.displayValue === option
      )
    ) {
      return "Cancellation:";
    } else if (
      paymentOptions.some(
        (paymentOption) => paymentOption.displayValue === option
      )
    ) {
      return "Payment:";
    }

    // Default label if the option doesn't match any category
    return "Options:";
  };

  return (
    <Container>
      <Header id="rooms">
        <Flex justify="space-between">
          <Text type="h1" size={24} weight={600} text="Choose Your Room" />
          <Button
            background="transparent"
            color={ttColors.dark}
            border={`1px solid ${ttColors.dark}`}
            padding="7px 10px"
            styles={{ background: "transparent !important" }}
            onClick={() =>
              setOpen((prev) => ({
                ...prev,
                search: true,
              }))
            }
          >
            <Text type="p" weight={"bold"} size={15} text="Change"></Text>
          </Button>
        </Flex>

        {/* SEARCH MODAL*/}
        <ChangeSearchModal
          open={open.search}
          handleClose={() =>
            setOpen((prev) => ({
              ...prev,
              search: false,
            }))
          }
        />
      </Header>
      <Section margin="0 0 2rem 0">
        <Grid columns={!isMobile ? "3" : "1"} gap="1rem">
          <Flex
            direction="column"
            gap=".5rem"
            styles={{ marginBottom: "1.2rem" }}
          >
            <Text type="label" size={16} text="Check-In" weight={400} />
            <DatePicker
              placeholder="Select Date"
              // position="relative"
              onChange={(e) => {}}
            />
          </Flex>
          <Flex
            direction="column"
            gap=".5rem"
            styles={{ marginBottom: "1.2rem" }}
          >
            <Text type="label" size={16} text="Check-Out" weight={400} />
            <DatePicker
              placeholder="Select Date"
              // position="relative"
              onChange={(e) => {}}
            />
          </Flex>{" "}
          <Flex
            direction="column"
            gap=".5rem"
            styles={{ marginBottom: "1.2rem" }}
          >
            <Text type="label" size={16} text="Guest & Rooms" weight={400} />
            <DatePicker
              placeholder="Select Date"
              // position="relative"
              onChange={(e) => {}}
            />
          </Flex>
        </Grid>
      </Section>
      <Section margin="0 0 2.5rem 0">
        <Text
          type="h1"
          size={24}
          weight={600}
          text="Available Rooms"
          margin={"0 0 1.75rem 0"}
        />

        {/* FILTER */}
        <Span>
          {!isMobile && (
            <FilterBox
              // BEDS
              beds={beds}
              setBeds={setBeds}
              bedsOptions={bedsOptions}
              // MEALS
              selectedMealCheckboxValues={selectedMealCheckboxValues}
              setSelectedMealCheckboxValues={setSelectedMealCheckboxValues}
              mealOptions={mealOptions}
              // CANCELLATION
              cancellation={cancellation}
              setCancellation={setCancellation}
              cancellationOptions={cancellationOptions}
              // PAYMENT
              selectedPaymentCheckboxValues={selectedPaymentCheckboxValues}
              setSelectedPaymentCheckboxValues={
                setSelectedPaymentCheckboxValues
              }
              paymentOptions={paymentOptions}
              //SUBMIT
              submissionState={submissionState}
              setSubmissionState={setSubmissionState}
              handleSubmit={handleSubmit}
              resetAllFilters={resetAllFilters}
            />
          )}
          {isMobile && (
            <Span>
              {/* FILTER MODAL*/}
              <FilterModal
                open={open.filter}
                // BEDS
                beds={beds}
                setBeds={setBeds}
                bedsOptions={bedsOptions}
                // MEALS
                selectedMealCheckboxValues={selectedMealCheckboxValues}
                setSelectedMealCheckboxValues={setSelectedMealCheckboxValues}
                mealOptions={mealOptions}
                // CANCELLATION
                cancellation={cancellation}
                setCancellation={setCancellation}
                cancellationOptions={cancellationOptions}
                // PAYMENT
                selectedPaymentCheckboxValues={selectedPaymentCheckboxValues}
                setSelectedPaymentCheckboxValues={
                  setSelectedPaymentCheckboxValues
                }
                paymentOptions={paymentOptions}
                //SUBMIT
                submissionState={submissionState}
                setSubmissionState={setSubmissionState}
                handleSubmit={handleSubmit}
                // totalSelectedOptions={totalSelectedOptions}

                resetAllFilters={resetAllFilters}
                handleClose={() =>
                  setOpen((prev) => ({
                    ...prev,
                    filter: false,
                  }))
                }
              />
            </Span>
          )}
        </Span>
        {isMobile && (
          <>
            <Span>
              <Flex direction="column">
                <Span>
                  <ButtonBtn
                    className="filter_button"
                    onClick={() =>
                      setOpen((prev) => ({
                        ...prev,
                        filter: true,
                      }))
                    }
                  >
                    <Flex
                      align="center"
                      gap="5px"
                      justify={
                        totalSelectedOptions === 0 ? "center" : "flex-start"
                      }
                    >
                      <TuneIcon />
                      <Text
                        type="p"
                        weight={"bold"}
                        size={15}
                        text="Filter"
                      ></Text>
                    </Flex>
                    {totalSelectedOptions === 0 ? (
                      " "
                    ) : (
                      <Flex align="center" justify="center" className="badge">
                        <Text type="p" text={`${totalSelectedOptions}`}></Text>
                      </Flex>
                    )}
                  </ButtonBtn>
                </Span>
                <Span style={{ margin: "10px 0px" }}>
                  <Flex
                    styles={{
                      overflowX: "scroll",
                      whiteSpace: "nowrap",
                      width: "100%",
                    }}
                    gap="8px"
                    align="center"
                  >
                    {allMappedOptions.map((option) => (
                      <BtnDetails
                        key={option}
                        className="filter_btn"
                        style={{ backgroundColor: ttColors.grayishAsh }}
                      >
                        <Flex align="center" gap="5px">
                          <Text
                            weight={500}
                            size={15}
                            type="p"
                            text={option}
                          ></Text>

                          <CloseIcon
                            onClick={() => removeOptionHandler(option)}
                            style={{ fontSize: "17px", cursor: "pointer" }}
                          />
                        </Flex>
                      </BtnDetails>
                    ))}
                  </Flex>
                  {totalSelectedOptions === 0 ? (
                    ""
                  ) : (
                    <Flex styles={{ marginTop: "8px" }}>
                      <BtnDetails
                        onClick={resetAllFilters}
                        className="reset_filters"
                      >
                        <Flex align="center" gap="5px" justify="center">
                          <Text
                            weight={500}
                            size={15}
                            type="p"
                            text="Reset All Filters"
                          ></Text>
                        </Flex>
                      </BtnDetails>
                    </Flex>
                  )}
                </Span>
                <Span>
                  <Span>
                    <Button
                      background="transparent"
                      color={ttColors.dark}
                      border={`1px solid ${ttColors.dark}`}
                      padding="7px 10px"
                      width="100%"
                      styles={{ background: "transparent !important" }}
                    >
                      <CachedIcon />
                      <Text
                        type="p"
                        weight={"bold"}
                        size={15}
                        text="Reload Rates"
                      ></Text>
                    </Button>
                  </Span>
                </Span>{" "}
              </Flex>
            </Span>
            <Span style={{ marginTop: "20px" }}>
              <Flex direction="column">
                <Text
                  type="p"
                  weight={500}
                  text="There is no hotel available with the selected filters"
                ></Text>
                <Text
                  type="p"
                  size={14}
                  text="Remove some of the selected filters to get results"
                ></Text>
              </Flex>
              <Flex direction="column" gap="8px" styles={{ marginTop: "10px" }}>
                {allMappedOptions.map((option, index) => (
                  <BtnDetails
                    key={index}
                    className="reset_filters chosen_filter"
                  >
                    <Flex align="center" justify="space-between" gap="5px">
                      <Flex align="center" gap="5px">
                        <Text
                          weight={500}
                          size={15}
                          type="p"
                          text={getLabelForOption(option)}
                        ></Text>
                        <Text
                          color={"var(--text-gray-color)"}
                          size={15}
                          type="p"
                          text={option}
                        ></Text>
                      </Flex>
                      <CloseIcon
                        onClick={() => removeOptionHandler(option)}
                        style={{
                          fontSize: "17px",
                          cursor: "pointer",
                          color: "var(--color-rating)",
                        }}
                      />
                    </Flex>
                  </BtnDetails>
                ))}
              </Flex>
            </Span>
            <Span style={{ marginTop: "10px" }}>
              <Text
                type="p"
                color={ttColors.primary}
                cursor="pointer"
                text="Show all options available"
              ></Text>
            </Span>
          </>
        )}
      </Section>
      <Section>
        <Button background={ttColors.dark} width="100%" height="45px">
          <Text type="p" text="Search Again" size={16} weight={600} />
        </Button>
      </Section>
      <Span>
        <ChooseYourRoomList />
      </Span>
    </Container>
  );
};

export default ChooseYourRoom;
