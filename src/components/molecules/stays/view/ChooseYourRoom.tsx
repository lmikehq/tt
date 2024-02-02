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
import { useMemo, useState } from "react";
import { ChangeSearchModal, FilterModal } from "./modals/Modals";
import FilterBox from "./modals/components/FilterBox";
import { Rate, ViewSingleStayResponse } from "@/lib/types/response-models/stay/search.type";
import { capCase } from "@/lib/utilFns";
import { useStaySearchStore } from "@/lib/store/stay/search.store";
import Spinner from "../../icons/spinner";
import sleep from "@/lib/extensions/helpers/sleep";
import StaysMenu from "@organism/staysMenu";
import { ClickAwayListener } from "@mui/material";
import Input from "@atom/input";
import ChooseYourRoomSkeleton from "./skeleton/ChooseYourRoomSkeleton";
const defaultOpt = { value: '', label: 'All Options' }
const defaultGuestOpt = { value: "", label: "Select Guest" }

export type OptionType = { value: string; label: string; }
export type OptionsType = OptionType[]
export interface FiltersInterface {
    beds: OptionType,
    meals: OptionType,
    cancellation: OptionType,
    payment: OptionType,
}

interface ChooseYourRoomProps {
    stayResponse: ViewSingleStayResponse;
    refetch: () => void;
    loading: boolean;
}

const ChooseYourRoom = ({ stayResponse, refetch, loading } : ChooseYourRoomProps) => {
    const { isMobile } = useScreenResolution();
    const { stayTabInitialSearchQuery, updateStayTabInitialQuery } = useStaySearchStore((state) => state);
    const { roomForGuests } = stayTabInitialSearchQuery

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);

    const computeGuestsAndRoomsString = () => {
        const rooms = roomForGuests.length;
        let guests = 0;

        for (let index = 0; index < roomForGuests.length; index++) {
            const room = roomForGuests[index];
            guests += room.adults + room.children.length;
        }
        return `${rooms} room${rooms == 1 ? "" : "s"} for ${guests} guest${guests == 1 ? "" : "s"}`;
    };


    const [open, setOpen] = useState({
        search: false,
        filter: false,
    });

    const [filteredItems, setFilteredItems] = useState<Rate[]>(stayResponse.rates ?? []);

    const [filters, setFilters] = useState<FiltersInterface>({
        beds: defaultOpt,
        meals: defaultOpt,
        cancellation: defaultOpt,
        payment: defaultOpt,
    })

    const bedsOptions = useMemo(() => {
        const res = stayResponse.rates?.map((r, ind, arr) => ({
            value: r.room_data_trans?.bedding_type,
            label: capCase(r.room_data_trans?.bedding_type)
        })).reduce((prev, curr) =>
            !prev.some(e => e?.value === curr.value) ? [...prev, curr] : prev, [] as OptionsType) ?? []
        return [{ value: '', label: 'All Options' }, ...res]
    }
    , [stayResponse.rates])
    const mealOptions = useMemo(() => {
        const res = stayResponse.rates.map(r => ({
            value: r.meal,
            label: capCase(r.meal)
        })).reduce((prev, curr) =>
            !prev.some(e => e?.value === curr.value) ? [...prev, curr] : prev, [] as OptionsType) ?? []
        return [{ value: '', label: 'All Options' }, ...res]
    } 
    , [stayResponse.rates])
    const cancellationOptions = [
        { value: "", label: "All Options" },
        { value: "free cancellation", label: "With Free Cancellation" },
    ];
    const paymentOptions = [
        { value: "", label: "All Options" },
        { value: "now", label: "Pay Now" },
        { value: "deposit", label: "Deposit" },
    ];

    const [state, setState] = useState({
        loading: false,
    });
    
    const filterItems = (filters: FiltersInterface) => {
        const newItems = stayResponse.rates.filter(r =>
            (!!filters.beds.value ? r.room_data_trans.bedding_type === filters.beds.value : true) &&
            (!!filters.meals.value ? r.meal === filters.meals.value : true) &&
            (!!filters.cancellation.value ? r.payment_options.payment_types[0]?.cancellation_penalties.free_cancellation_before : true) &&
            (!!filters.payment.value ? r.payment_options.payment_types[0]?.type === filters.payment.value : true)
        )
        // console.log(newItems)
        // console.log('rates', stayResponse.rates)
        setFilteredItems(newItems)
    }

    const activeFilters = useMemo(() =>
        ({
            beds: !!filters.beds.value ? true : false,  
            meals: !!filters.meals.value ? true : false,
            cancellation: !!filters.cancellation.value ? true : false,  
            payment: !!filters.payment.value ? true : false,  
        })
    , [filters])
    
    const handleSubmit = async () => {
        setState(prev => ({ ...prev, loading: true }))
        await sleep(500)
        setState(prev => ({ ...prev, loading: false }))
        setOpen((prev) => ({
            ...prev,
            filter: false,
        }));
        filterItems(filters)
    };

    const resetAllFilters = () => {
        const newFilters = {
            beds: defaultOpt,
            meals: defaultOpt,
            cancellation: defaultOpt,
            payment: defaultOpt,
        }
        setFilters(prev => ({ 
            ...prev,
            ...newFilters
        }))
        filterItems(newFilters)
        setOpen((prev) => ({
            ...prev,
            filter: false,
        }));
    }

    const removeFilter = (x: string) => {
        let start = { ...filters }
        switch (x) {
            case 'beds': {
                start['beds'] = defaultOpt
                break;
            };
            case 'meals': {
                start['meals'] = defaultOpt
                break;
            };
            case 'cancellation': {
                start['cancellation'] = defaultOpt
                break;
            };
            case 'payment': {
                start['payment'] = defaultOpt
                break;
            };
            default: return
        }
        setFilters(start)
        filterItems(start)
    }

  
    return (loading ? (
        <ChooseYourRoomSkeleton />
    ): (
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
                            onChange={(e) => { }}
                            disabled
                            styles={{ background: '#f2f2f2' }}
                            value={stayTabInitialSearchQuery?.checkInDate ? new Date(stayTabInitialSearchQuery?.checkInDate?.toString() ?? '') : undefined}
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
                            onChange={(e) => { }}
                            disabled
                            styles={{ background: '#f2f2f2' }}
                            value={stayTabInitialSearchQuery?.checkOutDate ? new Date(stayTabInitialSearchQuery?.checkOutDate?.toString() ?? '') : undefined}
                        />
                    </Flex>
                    <Flex
                        direction="column"
                        gap=".5rem"
                        styles={{ marginBottom: "1.2rem" }}
                    >
                        <Text type="label" size={16} text="Guest & Rooms" weight={400} />
                        <ClickAwayListener onClickAway={() => null}>
                            <div style={{ opacity: 0.6 }}>
                                <Input
                                    placeholder="Click me to open dropdown"
                                    value={computeGuestsAndRoomsString()}
                                    readOnly
                                    styles={{
                                        fontFamily: "poppins",
                                        cursor: "pointer",
                                        fontSize: "14px",
                                    }}
                                />
                                {menuOpen && <StaysMenu />}
                            </div>
                        </ClickAwayListener>
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
                        filters={filters}
                        setFilters={setFilters}
                        bedsOptions={bedsOptions}
                        mealOptions={mealOptions}
                        cancellationOptions={cancellationOptions}
                        paymentOptions={paymentOptions}
                        handleSubmit={handleSubmit}
                        resetFilters={resetAllFilters}
                        loading={state.loading}
                        items={filteredItems}
                    />
                )}
                {isMobile && (
                    <FilterModal
                        filters={filters}
                        setFilters={setFilters}
                        bedsOptions={bedsOptions}
                        mealOptions={mealOptions}
                        cancellationOptions={cancellationOptions}
                        paymentOptions={paymentOptions}
                        handleSubmit={handleSubmit}
                        resetFilters={resetAllFilters}
                        loading={state.loading}
                        items={filteredItems}
                        open={open.filter}
                        handleClose={() =>
                            setOpen((prev) => ({
                                ...prev,
                                filter: false,
                            }))
                        }
                    />
                )}
                </Span>
                {isMobile && (
                    <Span>
                        <Flex direction="column">
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
                            >
                                <TuneIcon />
                                <Text
                                    type="p"
                                    weight={"bold"}
                                    size={15}
                                    text="Filter"
                                ></Text>
                            </Flex>
                        </ButtonBtn>
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
                            {Object.keys(activeFilters).filter(x => activeFilters[x as keyof typeof activeFilters] == true).map((opt) => 
                                <BtnDetails
                                    key={opt}
                                    className="filter_btn"
                                    style={{ backgroundColor: ttColors.grayishAsh, display: 'flex', alignItems: 'center', gap: '5px' }}
                                    >
                                    <Text
                                        weight={500}
                                        size={15}
                                        type="p"
                                        text={opt}
                                    />                        
                                    <CloseIcon
                                        onClick={() => removeFilter(opt)}
                                        style={{ fontSize: "17px", cursor: "pointer" }}
                                    />
                                </BtnDetails>
                            )}
                            </Flex>
                            {Object.values(activeFilters).some(x => x) &&
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
                                        />
                                    </Flex>
                                    </BtnDetails>
                                </Flex>
                            }
                        </Span>
                        <Span>
                            <Button
                                background="transparent"
                                color={ttColors.dark}
                                border={`1px solid ${ttColors.dark}`}
                                padding="7px 10px"
                                width="100%"
                                styles={{ background: "transparent !important" }}
                                onClick={refetch}
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
                        </Flex>
                        {/* {filteredItems.length === 0 && 
                            <Span style={{ marginTop: "20px" }}>
                                <Flex direction="column">
                                    <Text
                                        type="p"
                                        weight={500}
                                        text="No hotel available with the selected filters"
                                    />
                                    <Text
                                        type="p"
                                        size={14}
                                        text="Remove some of the selected filters to get results"
                                    />
                                </Flex>
                            </Span>
                        } */}
                    </Span>
                )}
            </Section>
            <Section>
                <Button background={ttColors.dark} width="100%" height="45px" padding="1rem 0" onClick={handleSubmit}>
                    {state.loading ? (
                        <Spinner
                            fill={ttColors.primary}
                            size={"45px"}
                        />
                    ) : (
                        <Text type="p" text="Search" size={16} weight={600} />
                    )}
                </Button>
            </Section>
            <Span>
                {filteredItems.length > 0 ? (
                    <ChooseYourRoomList stayResponse={stayResponse} hotels={filteredItems} />
                ) : (
                    <Flex padding="4rem 0" justify="center">
                        <Text type="p" text="No hotel available with the selected filters" size={16} weight={600} />   
                    </Flex>
                )}
            </Span>
                
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
        </Container>
        
    )
  );
};

export default ChooseYourRoom;
