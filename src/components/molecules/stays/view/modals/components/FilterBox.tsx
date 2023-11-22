import React, { useState } from "react";
import { BtnDetails, GridLayout, Span } from "../../styles";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { Grid } from "@/components/templates/grid";
import Flex from "@/components/templates/flex";
import Text from "@/components/atoms/text";
import { ttColors } from "@/lib/theme/colors";
import Dropdown from "@/components/organisms/dropdown";
import CheckboxDropdown from "@/components/organisms/checkboxDropdown";
import Button from "@/components/atoms/button";
import Spinner from "@/components/molecules/icons/spinner";

function FilterBox() {
  const { isMobile } = useScreenResolution();

  // BEDS
  const [beds, setBeds] = useState("all options");
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
  const [cancellation, setCancellation] = useState("all options");
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
  const handleSubmit = () => {};

  return (
    <Span>
      <GridLayout
        className="grid_select"
        // columns={isMobile ? 1 : 4}
        // gap={isMobile ? "0.3rem" : "1rem"}
      >
        <Flex
          direction="column"
          gap=".5rem"
          styles={{ marginBottom: "1.2rem" }}
        >
          <Text type="label" size={16} text="Beds" weight={400} />
          <Dropdown
            options={bedsOptions}
            className="mui_select"
            width="100%"
            height="45px"
            selectedValue={beds}
            setSelectedValue={setBeds}
          />
        </Flex>
        <Flex
          direction="column"
          gap=".5rem"
          width="100%"
          styles={{ marginBottom: "1.2rem" }}
        >
          <Text type="label" size={16} text="Meals" weight={400} />
          <CheckboxDropdown
            className="mui_select"
            width="100%"
            height="45px"
            options={mealOptions}
            selectedValues={selectedMealCheckboxValues}
            setSelectedValues={setSelectedMealCheckboxValues}
          />
        </Flex>{" "}
        <Flex
          direction="column"
          gap=".5rem"
          styles={{ marginBottom: "1.2rem" }}
        >
          <Text type="label" size={16} text="Cancellation" weight={400} />
          <Dropdown
            options={cancellationOptions}
            className="mui_select"
            width="100%"
            height="45px"
            selectedValue={cancellation}
            setSelectedValue={setCancellation}
          />
        </Flex>
        <Flex
          direction="column"
          gap=".5rem"
          styles={{ marginBottom: "1.2rem" }}
        >
          <Text type="label" size={16} text="Payment" weight={400} />
          <CheckboxDropdown
            className="mui_select"
            width="100%"
            height="45px"
            options={paymentOptions}
            selectedValues={selectedPaymentCheckboxValues}
            setSelectedValues={setSelectedPaymentCheckboxValues}
          />
        </Flex>
      </GridLayout>
      {isMobile && (
        <Span>
          <Span style={{ width: "100%" }}>
            <Flex styles={{ margin: "8px 0px", width: "100%" }}>
              <BtnDetails
                className="reset_filters"
                style={{
                  padding: "15px",
                  width: "100%",
                  textAlign: "center",
                  cursor: "default",
                }}
              >
                <Flex
                  align="center"
                  direction="column"
                  justify="center"
                  gap="5px"
                >
                  <Text
                    weight={500}
                    size={15}
                    type="p"
                    color={ttColors.dark}
                    text="There is No Result"
                  ></Text>
                  <Flex width="fit-content" styles={{ cursor: "pointer" }}>
                    <Text
                      weight={500}
                      size={15}
                      type="p"
                      text="Reset All Filters"
                    ></Text>
                  </Flex>
                </Flex>
              </BtnDetails>
            </Flex>
          </Span>
          <Span>
            <Button
              width="100%"
              margin=".5rem 0"
              color="white"
              padding="10px"
              background={
                submissionState.loading ? ttColors.dark : ttColors.dark
              }
              onClick={handleSubmit}
            >
              {submissionState.loading ? (
                <Spinner size="40px" fill={"white"} />
              ) : (
                <Text
                  type="p"
                  text={`Show ${30} Options`}
                  color={"white"}
                  size="16px"
                />
              )}
            </Button>
          </Span>
        </Span>
      )}
    </Span>
  );
}

export default FilterBox;
