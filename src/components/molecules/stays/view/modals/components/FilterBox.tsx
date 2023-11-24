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

interface FilterItem {
  name: string;
  images: string[];
  //Other properties here
}
interface FilterBoxProps {
  beds: string;
  setBeds: React.Dispatch<React.SetStateAction<string>>;
  bedsOptions: { value: string; displayValue: string }[];
  selectedMealCheckboxValues: string[];
  setSelectedMealCheckboxValues: React.Dispatch<React.SetStateAction<string[]>>;
  mealOptions: { value: string; displayValue: string }[];
  cancellation: string;
  setCancellation: React.Dispatch<React.SetStateAction<string>>;
  cancellationOptions: { value: string; displayValue: string }[];
  selectedPaymentCheckboxValues: string[];
  setSelectedPaymentCheckboxValues: React.Dispatch<
    React.SetStateAction<string[]>
  >;
  paymentOptions: { value: string; displayValue: string }[];
  submissionState: {
    loading: boolean;
    //MORE PROPERTIES
  };
  setSubmissionState: React.Dispatch<
    React.SetStateAction<{
      loading: boolean;
      //MORE PROPERTIES
    }>
  >;
  handleSubmit: () => void;
  resetAllFilters: () => void;

  totalSelectedOptions: number;
  filterItems: FilterItem[];
}
function FilterBox({
  beds,
  setBeds,
  bedsOptions,
  selectedMealCheckboxValues,
  setSelectedMealCheckboxValues,
  mealOptions,
  cancellation,
  setCancellation,
  cancellationOptions,
  selectedPaymentCheckboxValues,
  setSelectedPaymentCheckboxValues,
  paymentOptions,
  submissionState,
  setSubmissionState,
  handleSubmit,
  resetAllFilters,
  totalSelectedOptions,
  filterItems,
}: FilterBoxProps) {
  const { isMobile } = useScreenResolution();

  return (
    <Span>
      <GridLayout className="grid_select">
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
              {filterItems?.length === 0 && totalSelectedOptions === 0 ? (
                ""
              ) : (
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
                    {filterItems?.length === 0 ? (
                      <Text
                        weight={500}
                        size={15}
                        type="p"
                        color={ttColors.dark}
                        text="There is No Result"
                      ></Text>
                    ) : (
                      ""
                    )}
                    {totalSelectedOptions > 0 && (
                      <Flex
                        onClick={resetAllFilters}
                        width="fit-content"
                        styles={{ cursor: "pointer" }}
                      >
                        <Text
                          weight={500}
                          size={15}
                          type="p"
                          text="Reset All Filters"
                        ></Text>
                      </Flex>
                    )}
                  </Flex>
                </BtnDetails>
              )}
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
                  text={`Show ${12} Options`}
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
