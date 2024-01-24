import Section from "src/components/molecules/section";
import SortingColumns from "../listings/sortingColumns";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import Flex from "@/components/templates/flex";
import Text from "@/components/atoms/text";
import { ttColors } from "@/lib/theme/colors";
import React, { useState } from "react";
import { FilterModal, SortModal } from "../listings/flightModal";
import Button from "@/components/atoms/button";
import { useFlightBookingStore } from "@/lib/store/flight/booking.store";
import { useQueryParams } from "@/hooks/useNext";
import SortingMultiColumns from "../listings/sortingMultiColumns";

type sortProps = {
    results: number;
    sortType: string;
};

function SortedColumn({ results, sortType }: sortProps) {
    const { searchFlightsResults } = useFlightBookingStore((state) => state);
    const { isMobile } = useScreenResolution();
    const { queryParams } = useQueryParams()
    const sorted = sortType.charAt(0).toUpperCase() + sortType.slice(1);
    const [open, setOpen] = useState({
        filter: false,
        sort: false,
    });

    return (
        <Section>
            {isMobile ? (
                <Flex
                    justify="space-between"
                    align="center"
                    padding="0 1.5rem 2rem"
                >
                    <Flex direction="column">
                        <Text type="h1" text="Tickets" weight={500} size={20} />
                        {!!sorted && (
                            <Text
                                type="p"
                                text={`${searchFlightsResults.length} results sorted by ${sorted}`}
                                size={14}
                            />
                        )}
                    </Flex>
                    <Flex align="center" justify="flex-end" gap="2rem">
                        <Button
                            width="max-content"
                            onClick={() =>
                                setOpen((prev) => ({
                                    ...prev,
                                    filter: true,
                                }))
                            }
                            background="none"
                        >
                            <Text
                                type="p"
                                text="Filter"
                                color={ttColors.primary}
                                weight={600}
                                size={18}
                            />
                        </Button>
                        {/* <Button
              width="max-content"
              onClick={() =>
                setOpen((prev) => ({
                  ...prev,
                  sort: true,
                }))
              }
              background="none"
            >
              <Text
                type="p"
                text="Sort"
                color={ttColors.primary}
                weight={600}
                size={18}
              />
            </Button> */}
                    </Flex>
                    <FilterModal
                        open={open.filter}
                        handleClose={() =>
                            setOpen((prev) => ({
                                ...prev,
                                filter: false,
                            }))
                        }
                    />
                    <SortModal
                        open={open.sort}
                        handleClose={() =>
                            setOpen((prev) => ({
                                ...prev,
                                sort: false,
                            }))
                        }
                    />
                </Flex>
            ) : (
                <React.Fragment>
                    {queryParams?.multi == 'true' ? (
                        <SortingMultiColumns />
                    ) : (    
                        <SortingColumns />
                    )}
                </React.Fragment>
            )}
        </Section>
    );
}

export default SortedColumn;
