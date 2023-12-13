import React, { useState } from "react";
import { BtnDetails, GridLayout, Span } from "../../styles";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import Flex from "@/components/templates/flex";
import Text from "@/components/atoms/text";
import { ttColors } from "@/lib/theme/colors";
import Button from "@/components/atoms/button";
import Spinner from "@/components/molecules/icons/spinner";
import Select, { components, GroupBase, Props } from "react-select";

const customStyles = {
    control: (base: any) => ({
        ...base,
        height: 45,
        minHeight: 45,
        overflow: "hidden",
    }),
};

interface MyOption {
    value: string;
    label: string;
}

interface MyGroup extends GroupBase<MyOption> {}

interface CustomSelectProps extends Props<MyOption, true, MyGroup> {
    myCustomProp: string;
}

const CheckboxOption = (props: any) => (
    <components.Option {...props}>
        <Flex gap="8px">
            <input
                type="checkbox"
                checked={props.isSelected}
                onChange={() => null}
            />{" "}
            <label>{props.label}</label>
        </Flex>
    </components.Option>
);

const MultiValue = (props: any) => (
    <components.MultiValue {...props}>
        <span
            style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
            }}
        >
            {props.data.label}
        </span>
    </components.MultiValue>
);

function CustomSelect({ myCustomProp, ...props }: CustomSelectProps) {
    return (
        <Select
            {...props}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            styles={customStyles}
            components={{
                Option: CheckboxOption,
                MultiValue,
            }}
            theme={(theme) => ({ ...theme, borderRadius: 0 })}
        />
    );
}

interface FilterItem {
    name: string;
    images: string[];
    //Other properties here
}
interface FilterBoxProps {
    beds: string;
    setBeds: React.Dispatch<React.SetStateAction<string>>;
    bedsOptions: { value: string; label: string }[];
    selectedMealCheckboxValues: string[];
    setSelectedMealCheckboxValues: React.Dispatch<
        React.SetStateAction<string[]>
    >;
    mealOptions: { value: string; displayValue: string }[];
    cancellation: string;
    setCancellation: React.Dispatch<React.SetStateAction<string>>;
    cancellationOptions: { value: string; label: string }[];
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
    // resetAllFilters: () => void;

    // totalSelectedOptions: number;
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
    // resetAllFilters,
    // totalSelectedOptions,
    filterItems,
}: FilterBoxProps) {
    const { isMobile } = useScreenResolution();

    const options: MyOption[] = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        // ... other options
    ];
    return (
        <Span>
            <GridLayout className="grid_select">
                <Flex
                    direction="column"
                    gap=".5rem"
                    styles={{ marginBottom: "1.2rem" }}
                >
                    <Text type="label" size={16} text="Beds" weight={400} />
                    <Select styles={customStyles} options={bedsOptions} />
                </Flex>
                <Flex
                    direction="column"
                    gap=".5rem"
                    width="100%"
                    styles={{ marginBottom: "1.2rem" }}
                >
                    <Text type="label" size={16} text="Meals" weight={400} />
                    <CustomSelect
                        myCustomProp="customValue"
                        options={options}
                        onChange={(selectedOptions, actionMeta) => {}}
                    />
                </Flex>{" "}
                <Flex
                    direction="column"
                    gap=".5rem"
                    styles={{ marginBottom: "1.2rem" }}
                >
                    <Text
                        type="label"
                        size={16}
                        text="Cancellation"
                        weight={400}
                    />
                    <Select
                        styles={customStyles}
                        options={cancellationOptions}
                    />
                </Flex>
                <Flex
                    direction="column"
                    gap=".5rem"
                    styles={{ marginBottom: "1.2rem" }}
                >
                    <Text type="label" size={16} text="Payment" weight={400} />
                    <CustomSelect
                        myCustomProp="customValue"
                        options={options}
                        onChange={(selectedOptions, actionMeta) => {}}
                    />
                </Flex>
            </GridLayout>
            {isMobile && (
                <Span>
                    <Span style={{ width: "100%" }}>
                        <Flex styles={{ margin: "8px 0px", width: "100%" }}>
                            {/* {filterItems?.length === 0 && totalSelectedOptions === 0 ? (
                ""
              ) : ( */}
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
                                    {/* {totalSelectedOptions > 0 && ( */}
                                    <Flex
                                        // onClick={resetAllFilters}
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
                                    {/* )} */}
                                </Flex>
                            </BtnDetails>
                            {/* )} */}
                        </Flex>
                    </Span>
                    <Span>
                        <Button
                            width="100%"
                            margin=".5rem 0"
                            color="white"
                            padding="10px"
                            background={
                                submissionState.loading
                                    ? ttColors.dark
                                    : ttColors.dark
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
