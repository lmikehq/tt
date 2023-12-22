import React, { useState } from "react";
import { BtnDetails, GridLayout, Span } from "../../styles";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import Flex from "@/components/templates/flex";
import Text from "@/components/atoms/text";
import { ttColors } from "@/lib/theme/colors";
import Button from "@/components/atoms/button";
import Spinner from "@/components/molecules/icons/spinner";
import Select, { components, GroupBase, Props } from "react-select";
import { Rate } from "@/lib/types/response-models/stay/search.type";

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
{/* <CustomSelect
    myCustomProp="customValue"
    options={options}
    onChange={(selectedOptions, actionMeta) => {}}
/> */}

interface FilterBoxProps {
    beds: string;
    setBeds: React.Dispatch<React.SetStateAction<string>>;
    bedsOptions: { value: string; label: string }[];
    selectedMeals: string;
    setSelectedMeals: React.Dispatch<React.SetStateAction<string>>;
    mealOptions: { value: string; label: string }[];
    cancellation: string;
    setCancellation: React.Dispatch<React.SetStateAction<string>>;
    cancellationOptions: { value: string; label: string }[];
    selectedPayment: string;
    setSelectedPayment: React.Dispatch<React.SetStateAction<string>>;
    paymentOptions: { value: string; label: string }[];
    submissionState: {
        loading: boolean;
    };
    setSubmissionState: React.Dispatch<
        React.SetStateAction<{loading: boolean;}>
    >;
    handleSubmit: () => void;
    // resetAllFilters: () => void;
    // totalSelectedOptions: number;
    items: Rate[];
}

function FilterBox({
    beds,
    setBeds,
    bedsOptions,
    selectedMeals,
    setSelectedMeals,
    mealOptions,
    cancellation,
    setCancellation,
    cancellationOptions,
    selectedPayment,
    setSelectedPayment,
    paymentOptions,
    submissionState,
    setSubmissionState,
    handleSubmit,
    // resetAllFilters,
    // totalSelectedOptions,
    items,
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
                    <Select styles={customStyles} options={bedsOptions} onChange={val => setBeds(val?.value ?? "")} />
                </Flex>
                <Flex
                    direction="column"
                    gap=".5rem"
                    width="100%"
                    styles={{ marginBottom: "1.2rem" }}
                >
                    <Text type="label" size={16} text="Meals" weight={400} />
                    <Select styles={customStyles} options={mealOptions} onChange={val => setSelectedMeals(val?.value ?? "")} />
                    
                </Flex>{" "}
                <Flex
                    direction="column"
                    gap=".5rem"
                    styles={{ marginBottom: "1.2rem" }}
                >
                    <Text type="label" size={16} text="Cancellation" weight={400} />
                    <Select styles={customStyles} options={cancellationOptions} onChange={val => setCancellation(val?.value ?? "")} />
                </Flex>
                <Flex
                    direction="column"
                    gap=".5rem"
                    styles={{ marginBottom: "1.2rem" }}
                >
                    <Text type="label" size={16} text="Payment" weight={400} />
                    <Select styles={customStyles} options={paymentOptions} onChange={val => setSelectedPayment(val?.value ?? "")} />
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
                                <Text
                                    weight={500}
                                    size={15}
                                    type="p"
                                    text="Reset All Filters"
                                />
                            </BtnDetails>
                        </Flex>
                    </Span>
                    <Span>
                        <Button
                            width="100%"
                            margin=".5rem 0"
                            color="white"
                            padding="10px"
                            background={ttColors.dark}
                            onClick={handleSubmit}
                            disabled={submissionState.loading}
                        >
                            {submissionState.loading ? (
                                <Spinner size="40px" fill={"white"} />
                            ) : (
                                <Text
                                    type="p"
                                    text={`Search`}
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
