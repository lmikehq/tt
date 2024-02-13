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
import { FiltersInterface, OptionType } from "../../ChooseYourRoom";

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

// interface CustomSelectProps extends Props<MyOption, true, MyGroup> {
//     myCustomProp: string;
// }
// const CheckboxOption = (props: any) => (
//     <components.Option {...props}>
//         <Flex gap="8px">
//             <input
//                 type="checkbox"
//                 checked={props.isSelected}
//                 onChange={() => null}
//             />{" "}
//             <label>{props.label}</label>
//         </Flex>
//     </components.Option>
// );

// const MultiValue = (props: any) => (
//     <components.MultiValue {...props}>
//         <span
//             style={{
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//                 whiteSpace: "nowrap",
//             }}
//         >
//             {props.data.label}
//         </span>
//     </components.MultiValue>
// );


interface FilterBoxProps {
    filters: FiltersInterface;
    setFilters: React.Dispatch<React.SetStateAction<FiltersInterface>>;
    bedsOptions: OptionType[];
    mealOptions: OptionType[];
    cancellationOptions: OptionType[];
    paymentOptions: OptionType[];
    handleSubmit: () => void;
    resetFilters: () => void;
    loading: boolean;
    items: Rate[];
}

function FilterBox({
    filters,
    setFilters,
    bedsOptions,
    mealOptions,
    cancellationOptions,
    paymentOptions,
    handleSubmit,
    resetFilters,
    loading,
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
                    <Select 
                        styles={customStyles}
                        options={bedsOptions}
                        onChange={val => setFilters(prev => ({ ...prev, beds: val! }))}
                        value={filters.beds}
                    />
                </Flex>
                <Flex
                    direction="column"
                    gap=".5rem"
                    width="100%"
                    styles={{ marginBottom: "1.2rem" }}
                >
                    <Text type="label" size={16} text="Meals" weight={400} />
                    <Select 
                        styles={customStyles}
                        options={mealOptions}
                        onChange={val => setFilters(prev => ({ ...prev, meals: val! }))}
                        value={filters.meals}
                    />
                    
                </Flex>{" "}
                <Flex
                    direction="column"
                    gap=".5rem"
                    styles={{ marginBottom: "1.2rem" }}
                >
                    <Text type="label" size={16} text="Cancellation" weight={400} />
                    <Select 
                        styles={customStyles}
                        options={cancellationOptions}
                        onChange={val => setFilters(prev => ({ ...prev, cancellation: val! }))}
                        value={filters.cancellation}
                    />
                </Flex>
                <Flex
                    direction="column"
                    gap=".5rem"
                    styles={{ marginBottom: "1.2rem" }}
                >
                    <Text type="label" size={16} text="Payment" weight={400} />
                    <Select 
                        styles={customStyles}
                        options={paymentOptions}
                        onChange={val => setFilters(prev => ({ ...prev, payment: val! }))}
                        value={filters.payment}
                    />
                </Flex>
            </GridLayout>
            {isMobile && (
                <Flex direction="column" gap="1rem">
                    <BtnDetails
                        className="reset_filters"
                        style={{
                            padding: "15px",
                            width: "100%",
                            textAlign: "center",
                            cursor: "default",
                            margin: "0px 0px",
                        }}
                        onClick={resetFilters}
                    >
                        <Text
                            weight={500}
                            size={15}
                            type="p"
                            text="Reset All Filters"
                        />
                    </BtnDetails>
                    <Span>
                        <Button
                            width="100%"
                            margin=".5rem 0"
                            color="white"
                            padding="10px"
                            background={ttColors.dark}
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? (
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
                </Flex>
            )}
        </Span>
    );
}

export default FilterBox;
