import Flex from '@/components/templates/flex';
import { useQueryParams } from '@/hooks/useNext';
import { AirlineInterface, FlightContext } from '@/lib/extensions/context';
import { useSearchMultiFlightStore } from '@/lib/store/flight/multi/search.store';
import { useUserPreferencesStore } from '@/lib/store/preferences.store';
import { SearchFlightsRequestQuery, defaultMultiQuery, parseMultiFlightQuery } from '@/lib/types/request-models/flight/booking.type';
import React, { ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import PriceAlerts from '../components/priceAlerts';
import { debounce } from 'debounce';
import Slider from "../../slider";
import Text from '@/components/atoms/text';
import { Panel, convertTime } from './sortingColumns';
import PlusMinusButton from '@/components/organisms/flights/PlusMinusButton';
import { CustomRadioGroup } from '../../radio';
import SearchStringInput from '../../searchInputs/searchStringInput';
import CheckBox from '../../checkbox';
import { ButtonBox } from "../components/sortedFlightsTab";
import { formatPrice } from '@/lib/extensions/helpers/formatPrice';
import { LuSearch } from 'react-icons/lu';
import { ttColors } from '@/lib/theme/colors';
import { IoCaretDown } from 'react-icons/io5';
const airlines = require("airline-iata-code");
const sortedAirlines: { [k: string]: AirlineInterface } = {};
airlines().forEach((e: AirlineInterface) => {
    sortedAirlines[e.Airline] = e;
});

const defaultQuery = {
    fly_from: '',
    fly_to: '',
    date_from: '',
    date_to: '',
    fly_days_type: '',
    fly_days: '',
    curr: '',
    stops: '',
    adults: 1,
    children: 0,
    infants: 0,
    selected_cabins: '',
    atime_from: '',
    atime_to: '',
    dtime_from: '',
    dtime_to: '',
    return_from: '',
    return_to: '',
    // ret_dtime_from: '',
    // ret_dtime_to: '',
    // ret_atime_from: '',
    // ret_atime_to: '',
    adult_hold_bag: '',
    adult_hand_bag: '',
    child_hold_bag: '',
    child_hand_bag: '',
    price_from: 0,
    price_to: 0,
    select_airlines: '',
    vehicle_type: '',
    max_stopovers: 0,
    max_fly_duration: 0,
    page: 1,
    limit: 10,
    sort: '',
}
const stopOptions = [
    { value: "", label: "Any" },
    { value: "0", label: "Non-Stop" },
    { value: "1", label: "Up to 1 stop" },
    { value: "2", label: "Up to 2 stops" },
];
const cabinOptions = [
    { value: "M", label: "Economy" },
    { value: "W", label: "Economy Premium" },
    { value: "C", label: "Business" },
    { value: "F", label: "First Class" },
];
const alliance = ["Oneworld", "SkyTeam", "Star Alliance", "Value Alliance"];

const defaultAcc = {
    bags: false,
    stops: false,
    airlines: false,
    alliance: false,
    times: false,
    duration: false,
    price: false,
    cabin: false,
}

interface AccordionProps {
    isOpen: boolean;
    onToggle: (x: number) => void;
    children: ReactNode;
    index: number;
    title: string;
}
function Accordion({ isOpen, onToggle, children, index, title }: AccordionProps) {
    return (
        <Flex border={`1px solid ${ttColors.lightestGray}`} direction='column' borderRadius='.5rem' gap='2rem'>
            <Flex justify='space-between' padding='2rem 1.5rem' onClick={onToggle}>
                <Text
                    type='p'
                    text={title}
                    weight={600}
                />
                <IoCaretDown size={20} color={ttColors.lighterGray} />
            </Flex>
            {isOpen ? (
                <Flex direction='column' padding='0 1.5rem'>
                    {children}
                </Flex>
            ) : null}
        </Flex>
    )
}

interface SortingMultiColumnsProps {
    onClose?: () => void;
}
function SortingMultiColumns({ onClose }: SortingMultiColumnsProps) {
    const { searchMultiCityQuery, updateSearchMultiCityQuery } = useSearchMultiFlightStore(s => s)
    const { preFerredCurrency, conversionRate } = useUserPreferencesStore(s => s)
    const { queryParams } = useQueryParams();
    const flightContext = useContext(FlightContext);
    const flightState = flightContext?.state;
    const flightDispatch = flightContext?.dispatch;

    const defaultMulti = {
        ...defaultMultiQuery,
        price: [0, parseInt((20000 * conversionRate).toFixed(0))] as [number, number]
    }

    const [filters, setFilters] = useState([defaultMulti])

    const [openMulti, setOpenMulti] = useState([false])

    const [openAcc, setOpenAcc] = useState([defaultAcc])

    const onToggleMulti = (index: number) => {
        setOpenMulti(prev => {
            return prev.map((e, ind) => index === ind ? !e : e)
        })
    }

    const onToggleAcc = (index: number, type: string) => {
        setOpenAcc(prev => prev.map((p, ind) => index === ind ? ({ ...p, [type]: !p[type as keyof typeof p] }) : p))
    }

    const activeFilters = useMemo(() => searchMultiCityQuery.requests.map(req => {
        const newObj: any = {}
        Object.keys(req).forEach(r => {
            if (req[r as keyof typeof req] !== defaultQuery[r as keyof typeof defaultQuery]) {
                newObj[r] = true
            }
        })
        return newObj
    }), [searchMultiCityQuery.requests])

    const removeFilter = (index: number, name: string, value: string) => {
        updateSearchMultiCityQuery({
            ...searchMultiCityQuery,
            requests: searchMultiCityQuery.requests.map((req, reqInd) => {
                if (reqInd === index) {
                    return { ...req, [name]: value }
                } return req
            })
        })
    }

    const resetFilters = () => {
        updateSearchMultiCityQuery({
            ...searchMultiCityQuery,
            requests: searchMultiCityQuery.requests.map((req, reqInd) => defaultQuery)
        })
    }

    const maxBags = useMemo(() => searchMultiCityQuery.requests.map((req, index) => {
        const adults = req.adults ?? defaultQuery.adults
        const children = req.children ?? defaultQuery.children
        return {
            cabinBags: adults + children,
            checkedBags: (adults + children) * 2,
        }
    }), [searchMultiCityQuery.requests])

    const handleBags = (index: number, type: "cabinBags" | "checkedBags", actionType: "add" | "subtract") => {
        setFilters(prev => prev.map((req, ind) => {
            if (index === ind) {
                const currentValue = req[type];
                const newValue = actionType === "add" ? Math.min(currentValue + 1, maxBags[index][type]) : Math.max(currentValue - 1, 0);
                return {
                    ...req,
                    [type]: newValue
                }
            } else {
                return req
            }
        }))
    }

    const handleRadio = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setFilters(prev => prev.map((req, ind) => {
            if (index === ind) {
                return {
                    ...req,
                    [name]: value
                }
            } else {
                return req
            }
        }))
    }

    const handleCheck = (index: number, value: string, type: "alliance" | "airlines") => {
        setFilters(prev => prev.map((req, ind) => {
            if (index === ind) {
                return {
                    ...req,
                    [type]: req[type].includes(value) ? req[type].filter((item) => item !== value) : [...req[type], value],
                }
            } else {
                return req
            }
        }))
    }

    const handleTimeChange = debounce((
        index: number,
        value: number | number[],
        type: "arrivalTime" | "departTime"
    ) => {
        setFilters(prev => prev.map((req, ind) => {
            if (index === ind) {
                const newMin = Array.isArray(value) ? convertTime(value[0]) : convertTime(value);
                const newMax = Array.isArray(value) ? convertTime(value[1]) : convertTime(value);
                return {
                    ...req,
                    [type]: [newMin, newMax]
                }
            } else {
                return req
            }
        }))
    })

    const handleSlider = debounce((
        index: number,
        value: number | number[],
        type: "travelTime" | "stopOver" | "price"
    ) => {
        setFilters(prev => prev.map((req, ind) => {
            if (index === ind) {
                const newValue = Array.isArray(value) ? value : [0, 0];
                if (type === 'price') {
                    return {
                        ...req,
                        [type]: [parseFloat(newValue[0].toFixed(0)), parseFloat(newValue[1].toFixed(0))]
                    }
                } else {
                    return {
                        ...req,
                        [type]: newValue
                    }
                }
            } else {
                return req
            }
        }))
    })

    const handleFilterResults = (params: SearchFlightsRequestQuery[]) => {
        const parsed = filters.map((filter, index) => parseMultiFlightQuery(filter, flightState?.fleet[index]))
        updateSearchMultiCityQuery({
            ...searchMultiCityQuery,
            requests: searchMultiCityQuery.requests.map((e, ind) => ({
                ...e,
                ...parsed[ind]
            }))
        })
        onClose && onClose();
    };

    useEffect(() => {
        updateSearchMultiCityQuery({
            ...searchMultiCityQuery,
            requests: searchMultiCityQuery.requests.map(() => defaultQuery) ?? [defaultQuery]
        })
        setOpenAcc(searchMultiCityQuery.requests.map(e => defaultAcc) ?? [defaultAcc])
        setOpenMulti(searchMultiCityQuery.requests.map(e => false) ?? [false])
        setFilters(searchMultiCityQuery.requests.map(e => defaultMulti) ?? [defaultMulti])
    }, [queryParams])


    return (
        <Flex direction="column">
            <PriceAlerts />

            {searchMultiCityQuery.requests.map((req, index) =>
                <Accordion
                    key={`flight-${index}-filters`}
                    isOpen={openMulti[index]}
                    onToggle={() => onToggleMulti(index)}
                    index={index}
                    title={`${flightState?.fleet[index].departureCountry?.name ?? 'SRC'} - ${flightState?.fleet[index].arrivalCountry?.name ?? 'DST'}`}
                >
                    {/* Number of Bags */}
                    <Panel
                        title="Bags"
                        toggle={() => onToggleAcc(index, "bags")}
                        isActive={openAcc[index]?.bags ?? false}
                    >
                        <Flex
                            direction="column"
                            justify="center"
                            gap="1rem"
                            padding="1rem 0"
                        >
                            <Flex align="center" justify="space-between">
                                <Text
                                    type="p"
                                    text="Cabin Baggage"
                                    size={14}
                                    whiteSpace="nowrap"
                                />
                                <Flex
                                    width="50%"
                                    gap=".5rem"
                                    align="center"
                                    justify="flex-end"
                                >
                                    <PlusMinusButton
                                        isDisabled={filters[index]?.cabinBags === 0}
                                        onClick={() => handleBags(index, "cabinBags", "subtract")}
                                    >
                                        <Text type="p" text="-" />
                                    </PlusMinusButton>
                                    <Text
                                        type="p"
                                        text={filters[index]?.cabinBags.toString()}
                                        width="1.5rem"
                                        textAlign="center"
                                    />
                                    <PlusMinusButton
                                        isDisabled={filters[index]?.cabinBags >= maxBags[index].cabinBags}
                                        onClick={() => handleBags(index, "cabinBags", "add")}
                                    >
                                        <Text type="p" text="+" />
                                    </PlusMinusButton>
                                </Flex>
                            </Flex>
                            <Flex align="center" justify="space-between">
                                <Text
                                    type="p"
                                    text="Checked Baggage"
                                    size={14}
                                    whiteSpace="nowrap"
                                />
                                <Flex
                                    width="50%"
                                    gap=".5rem"
                                    align="center"
                                    justify="flex-end"
                                >
                                    <PlusMinusButton
                                        isDisabled={filters[index]?.checkedBags === 0}
                                        onClick={() => handleBags(index, "checkedBags", "subtract")}
                                    >
                                        <Text type="p" text="-" />
                                    </PlusMinusButton>
                                    <Text
                                        type="p"
                                        text={filters[index]?.checkedBags.toString()}
                                        width="1.5rem"
                                        textAlign="center"
                                    />
                                    <PlusMinusButton
                                        isDisabled={filters[index]?.checkedBags >= maxBags[index].checkedBags}
                                        onClick={() => handleBags(index, "checkedBags", "add")}
                                    >
                                        <Text type="p" text="+" />
                                    </PlusMinusButton>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Panel>

                    {/* Number of Stops */}
                    <Panel
                        title="Stops"
                        toggle={() => onToggleAcc(index, "stops")}
                        isActive={openAcc[index]?.stops ?? false}
                    >
                        <Flex direction="column" align="flex-start" gap=".5rem">
                            <CustomRadioGroup
                                options={stopOptions}
                                name="stops"
                                value={filters[index]?.stops}
                                onChange={(ev) => handleRadio(index, ev)}
                                justifyContent="flex-end"
                                align="flex-start"
                                direction="column"
                            />
                        </Flex>
                    </Panel>

                    {/* Airlines */}
                    <Panel
                        title="Airlines"
                        toggle={() => onToggleAcc(index, "airlines")}
                        isActive={openAcc[index]?.airlines ?? false}
                    >
                        <Flex direction="column" gap=".5rem">
                            <Flex direction="column" align="space-between" gap=".5rem">
                                <SearchStringInput
                                    placeholder="Search Airlines"
                                    options={Object.keys(sortedAirlines)}
                                    onChange={(ev: any) => handleCheck(index, ev, "airlines")}
                                    icon={<LuSearch color="#929292" size={20} />}
                                />
                            </Flex>
                            <Flex direction="column" gap="0rem" margin=".5rem 0 0">
                                {filters[index]?.airlines.map((airline, index) =>
                                    <CheckBox
                                        key={index}
                                        checked={true}
                                        name={airline}
                                        onChange={() => handleCheck(index, airline, "airlines")}
                                    >
                                        <Text type="p" text={airline} size={15} />
                                    </CheckBox>
                                )}
                            </Flex>
                        </Flex>
                    </Panel>

                    {/* Times */}
                    <Panel
                        title="Times"
                        toggle={() => onToggleAcc(index, "times")}
                        isActive={openAcc[index]?.times ?? false}
                    >
                        <Flex direction="column">
                            <Flex
                                gap=".5rem"
                                align="center"
                                padding="1rem"
                                justify="space-between"
                                borderRadius="8px"
                                background={ttColors.grayishAsh}
                            >
                                <ButtonBox
                                    active={true}
                                    width="100%"
                                    onClick={() => null}
                                >
                                    <Text
                                        type="p"
                                        text="Departure"
                                        weight={500}
                                        size={16}
                                    />
                                </ButtonBox>
                                {/* <ButtonBox
                                    active={openTimes === "return"}
                                    width="50%"
                                    onClick={() => setOpenTimes("return")}
                                >
                                    <Text
                                        type="p"
                                        text="Return"
                                        weight={500}
                                        size={16}
                                    />
                                </ButtonBox> */}
                            </Flex>
                            <Flex direction="column" gap=".25rem" padding="1rem 0">
                                <Text type="p" text="Departure" weight={500} />
                                <Slider
                                    marks={[
                                        {
                                            value: 0,
                                            label: filters[index]?.departTime[0]
                                        },
                                        {
                                            value: 96,
                                            label: filters[index]?.departTime[1]
                                        },
                                    ]}
                                    defaultValue={[0, 96]}
                                    onChange={(event, value) => handleTimeChange(index, value, "departTime")}
                                    min={0}
                                    max={96}
                                />
                            </Flex>
                            <Flex direction="column" gap=".25rem" padding="1rem 0">
                                <Text type="p" text="Arrival" weight={500} />
                                <Slider
                                    marks={[
                                        {
                                            value: 0,
                                            label: filters[index]?.arrivalTime[0]
                                        },
                                        {
                                            value: 96,
                                            label: filters[index]?.arrivalTime[1]
                                        },
                                    ]}
                                    defaultValue={[0, 96]}
                                    onChange={(event, value) => handleTimeChange(index, value, "arrivalTime")}
                                    min={0}
                                    max={96}
                                />
                            </Flex>
                        </Flex>
                    </Panel>

                    {/* Alliance */}
                    <Panel
                        title="Alliance"
                        toggle={() => onToggleAcc(index, "alliance")}
                        isActive={openAcc[index]?.alliance ?? false}
                    >
                        <Flex direction="column" gap="0">
                            {alliance.map((alliance, index) => (
                                <CheckBox
                                    key={index}
                                    checked={filters[index]?.alliance.includes(alliance)}
                                    name={alliance}
                                    onChange={(e) => handleCheck(index, alliance, "alliance")}
                                >
                                    <Text type="p" text={alliance} size={16} />
                                </CheckBox>
                            ))}
                        </Flex>
                    </Panel>

                    {/* Duration */}
                    <Panel
                        title="Duration"
                        toggle={() => onToggleAcc(index, "duration")}
                        isActive={openAcc[index]?.duration ?? false}
                    >
                        <div>
                            <Flex direction="column" gap=".25rem" padding=".5rem 0">
                                <Text
                                    type="p"
                                    text="Max Travel Time"
                                    size={16}
                                    weight={500}
                                />
                                <Slider
                                    marks={[
                                        {
                                            value: 2,
                                            label: `${filters[index]?.travelTime[0]} Hours`,
                                        },
                                        {
                                            value: 48,
                                            label: `${filters[index]?.travelTime[1]} Hours`,
                                        },
                                    ]}
                                    defaultValue={[filters[index]?.travelTime[0], filters[index]?.travelTime[1]]}
                                    onChange={(event, value) => handleSlider(index, value, "travelTime")}
                                    min={2}
                                    max={48}
                                    leftOffset="20px"
                                    rightOffset="-100px"
                                />
                            </Flex>
                            <Flex direction="column" gap=".25rem" padding=".5rem 0">
                                <Text
                                    type="p"
                                    text="Stop Overs"
                                    size={16}
                                    weight={500}
                                />
                                <Slider
                                    marks={[
                                        {
                                            value: 2,
                                            label: `${filters[index]?.stopOver[0]} Hours`,
                                        },
                                        {
                                            value: 48,
                                            label: `${filters[index]?.stopOver[1]} Hours`,
                                        },
                                    ]}
                                    defaultValue={[filters[index]?.stopOver[0], filters[index]?.stopOver[1]]}
                                    onChange={(event, value) => handleSlider(index, value, "stopOver")}
                                    min={2}
                                    max={48}
                                    leftOffset="20px"
                                    rightOffset="-100px"
                                />
                            </Flex>
                        </div>
                    </Panel>

                    {/* Price */}
                    <Panel
                        title="Price"
                        toggle={() => onToggleAcc(index, "price")}
                        isActive={openAcc[index]?.price ?? false}
                    >
                        <Text
                            type="p"
                            text={`${formatPrice({
                                total: filters[index]?.price[0],
                                currency: preFerredCurrency,
                                numberOfDecimalDigits: 0,
                            })} - ${formatPrice({
                                total: filters[index]?.price[1],
                                currency: preFerredCurrency,
                                numberOfDecimalDigits: 0,
                            })}`}
                            size={16}
                            weight={500}
                            color="#7BBBD6"
                        />
                        <Slider
                            marks={[
                                {
                                    value: 0,
                                    label: formatPrice({
                                        total: filters[index]?.price[0],
                                        currency: preFerredCurrency,
                                        numberOfDecimalDigits: 0,
                                    }),
                                },
                                {
                                    value: 20000 * conversionRate,
                                    label: formatPrice({
                                        total: filters[index]?.price[1],
                                        currency: preFerredCurrency,
                                        numberOfDecimalDigits: 0,
                                    }),
                                },
                            ]}
                            defaultValue={[filters[index]?.price[0], filters[index]?.price[1]]}
                            onChange={(event, value) => handleSlider(index, value, "price")}
                            min={0}
                            max={20000 * conversionRate}
                            step={250}
                            rightOffset="-160px"
                        />
                    </Panel>

                    {/* Cabin */}
                    <Panel
                        title="Cabin"
                        toggle={() => onToggleAcc(index, "cabin")}
                        isActive={openAcc[index]?.cabin ?? false}
                        last
                    >
                        <Flex direction="column" gap=".25rem" margin="0 0 1.5rem 0">
                            <CustomRadioGroup
                                options={cabinOptions}
                                name="cabin"
                                onChange={(ev) => handleRadio(index, ev)}
                                value={filters[index]?.cabin}
                                justifyContent="flex-end"
                                align="flex-start"
                                direction="column"
                            />
                        </Flex>
                    </Panel>
                </Accordion>
            )}
        </Flex>
    )
}

export default SortingMultiColumns