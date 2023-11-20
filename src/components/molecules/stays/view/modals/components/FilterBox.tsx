import React, { useState } from "react";
import { Span } from "../../styles";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { Grid } from "@/components/templates/grid";
import Flex from "@/components/templates/flex";
import Text from "@/components/atoms/text";
import { ttColors } from "@/lib/theme/colors";
import Dropdown from "@/components/organisms/dropdown";
import CheckboxDropdown from "@/components/organisms/checkboxDropdown";

function FilterBox() {
  const { isMobile } = useScreenResolution();
  const [meal, setMeal] = useState("meal");
  const options = [
    { value: "meal", displayValue: "Select Meal" },
    { value: "half board", displayValue: "Half Board" },
    { value: "full board", displayValue: "Full Board" },
    { value: "all inclusive", displayValue: "All Inclusive" },
  ];

  const checkboxOptions = [
    { value: "option1", displayValue: "Option 1" },
    { value: "option2", displayValue: "Option 2" },
    { value: "option3", displayValue: "Option 3" },
  ];
  const [selectedCheckboxValues, setSelectedCheckboxValues] = useState<
    string[]
  >([]);

  return (
    <Span>
      {!isMobile && (
        <Grid columns={4} gap="1rem">
          <Flex
            direction="column"
            gap=".5rem"
            styles={{ marginBottom: "1.2rem" }}
          >
            <Text type="label" size={16} text="Beds" weight={400} />
            <Dropdown
              options={options}
              className="mui_select"
              width="100%"
              height="40px"
              selectedValue={meal}
              setSelectedValue={setMeal}
            />
          </Flex>
          <Flex
            direction="column"
            gap=".5rem"
            styles={{ marginBottom: "1.2rem" }}
          >
            <Text type="label" size={16} text="Meals" weight={400} />
            <CheckboxDropdown
              className="mui_select"
              width="100%"
              height="40px"
              options={checkboxOptions}
              selectedValues={selectedCheckboxValues}
              setSelectedValues={setSelectedCheckboxValues}
            />
          </Flex>{" "}
          <Flex
            direction="column"
            gap=".5rem"
            styles={{ marginBottom: "1.2rem" }}
          >
            <Text type="label" size={16} text="Cancellation" weight={400} />
            <select
              name="filterBox"
              style={{
                padding: "10px",
                borderRadius: "6px",
                width: "100%",
                borderColor: ttColors.gray,
                outline: "none",
              }}
            >
              <option value="option">All Option</option>
            </select>
          </Flex>
          <Flex
            direction="column"
            gap=".5rem"
            styles={{ marginBottom: "1.2rem" }}
          >
            <Text type="label" size={16} text="Payment" weight={400} />
            <select
              name="filter"
              style={{
                padding: "10px",
                borderRadius: "6px",
                width: "100%",
                borderColor: ttColors.gray,
                outline: "none",
              }}
            >
              <option value="option">All Option</option>
            </select>
          </Flex>
        </Grid>
      )}
    </Span>
  );
}

export default FilterBox;
