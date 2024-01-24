import Flex from '@/components/templates/flex';
import { useQueryParams } from '@/hooks/useNext';
import { FlightContext } from '@/lib/extensions/context';
import { useScreenResolution } from '@/lib/extensions/hook/useScreenResolution';
import { useSearchMultiFlightStore } from '@/lib/store/flight/multi/search.store';
import { useUserPreferencesStore } from '@/lib/store/preferences.store';
import { SearchFlightsRequestQuery } from '@/lib/types/request-models/flight/booking.type';
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
import dayjs from 'dayjs';
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

   
interface AccordionProps {
    isOpen: boolean;
    onToggle: (x: number) => void;
    children: ReactNode;
}
function Accordion({ isOpen, onToggle, children }: AccordionProps) {
    return (
        <Flex>
            {children}
        </Flex>
    )
}

interface SortingMultiColumnsProps {
    onClose?: () => void;
}
function SortingMultiColumns({ onClose }: SortingMultiColumnsProps) {
    const { searchMultiCityQuery, updateSearchMultiCityQuery } = useSearchMultiFlightStore(s => s)
    const { preFerredCurrency, conversionRate } = useUserPreferencesStore(s => s)
    const flightContext = useContext(FlightContext);
    const flightState = flightContext?.state;
    const flightDispatch = flightContext?.dispatch;
    const { queryParams } = useQueryParams();
    const { isMobile } = useScreenResolution();
    const defaultFilters = {
        cabinBags: 1,
        checkedBags: 0,
        minPrice: 0,
        maxPrice: parseInt((20000 * conversionRate).toFixed(0)),
        departTime: ["0:00", "23:59"],
        // departTimeFrom: ["0:00", "23:59"],
        // departTimeTo: ["0:00", "23:59"],
        arrivalTime: ["0:00", "23:59"],
        // arrivalTimeFrom: ["0:00", "23:59"],
        // arrivalTimeTo: ["0:00", "23:59"],
        stopOver: [2, 48],
        travelTime: [2, 48],
        cabin: 'M',
        stops: 'any',
        airlines: [],
        alliances: [],
    }

    const [isOpen, setIsOpen] = useState([
        {
            bags: false,
            stops: false,
            airlines: false,
            alliance: false,
            times: false,
            duration: false,
            price: false,
            cabin: false,
        }
    ]);

    const [isOpenAcc, setIsOpenAcc] = useState([
        {
            bags: false,
            stops: false,
            airlines: false,
            alliance: false,
            times: false,
            duration: false,
            price: false,
            cabin: false,
        }
    ]);

    const [filters, setFilters] = useState([defaultFilters])

    const onToggleAcc = (index: number, type: string) => {
        setIsOpenAcc(prev => prev.map((p, ind) => index === ind ? ({ ...p, [type]: !p[type as keyof typeof p] }) : p))
    }

    const handleFilterResults = (params: SearchFlightsRequestQuery) => {
        // const parsed = parseQuery(params);
        // updateSearchQuery({ data: cleanObject(parsed) });
        // searchFlights({ data: cleanObject(parsed) }).then((res) => {
        //     setActiveFilters((prev) => ({ ...prev, active: true }))
        // })
        onClose && onClose();
    };

    const activeFilters = useMemo(() => ({
        list: searchMultiCityQuery.requests.map(req => {
            const newObj: any = {}
            Object.keys(req).forEach(r => {
                if (req[r as keyof typeof req] === defaultQuery[r as keyof typeof defaultQuery]) {
                    newObj[r] = true
                }  
            })
            return newObj
        }),
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
            cabinBaggage: adults + children,
            checkedBaggage: (adults + children) * 2,
        }
    }), [searchMultiCityQuery.requests])

    const handleBags = (index: number, bagType: "cabin" | "checked", actionType: "add" | "subtract") => {
        setFilters(prev =>
            prev.map((req, ind) => {
                const currentValue = req.ch;
                    const newValue = actionType === "add" ? Math.min(currentValue + 1, bagType === "cabin" ? maxBags.cabinBaggage : maxBags.checkedBaggage)
                        : Math.max(currentValue - 1, 0);
                if (index === ind) {
                    return {...req}
                } return req
            })
        )
    }

    const handleRadio = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    }

    const handleCheck = (index: number, value: string, checkType: "alliance" | "airlines") => {
    }

    const handleTimeChange = debounce((
        index: number,
        newValue: number | number[],
        time: "arrival" | "depart" | "travelTime" | "stopOver"
    ) => {
    })

    const handleSlider = debounce((
        index: number,
        newValue: number | number[],
        group: "duration" | "price",
        name: string
    ) => {
    })

    useEffect(() => {
        updateSearchMultiCityQuery({
            ...searchMultiCityQuery,
            requests: flightState?.fleet.map(() => defaultQuery) ?? [defaultQuery]
        })
    }, [flightState?.fleet])


    return (
        <Flex direction="column">
            <PriceAlerts />

            {searchMultiCityQuery.requests.map((req, index) => 
                <Accordion key={`flight-${index}-filters`} isOpen={isOpenAcc[index]} onToggle={onToggleAcc}>
                    {/* Number of Bags */}
                    <Panel
                        title="Bags"
                        toggle={() => onToggleAcc(index, "bags")}
                        isActive={isOpenAcc[index]?.bags ?? false}
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
                                        isDisabled={filterData.bags.cabin === 0}
                                        onClick={() => handleBags("cabin", "subtract")}
                                    >
                                        <Text type="p" text="-" />
                                    </PlusMinusButton>
                                    <Text
                                        type="p"
                                        text={filterData.bags.cabin.toString()}
                                        width="1.5rem"
                                        textAlign="center"
                                    />
                                    <PlusMinusButton
                                        isDisabled={
                                            filterData.bags.cabin >=
                                            maxBags.cabinBaggage
                                        }
                                        onClick={() => handleBags("cabin", "add")}
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
                                        isDisabled={filterData.bags.checked === 0}
                                        onClick={() =>
                                            handleBags("checked", "subtract")
                                        }
                                    >
                                        <Text type="p" text="-" />
                                    </PlusMinusButton>
                                    <Text
                                        type="p"
                                        text={filterData.bags.checked.toString()}
                                        width="1.5rem"
                                        textAlign="center"
                                    />
                                    <PlusMinusButton
                                        isDisabled={
                                            filterData.bags.checked >=
                                            maxBags.checkedBaggage
                                        }
                                        onClick={() => handleBags("checked", "add")}
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
                        isActive={isOpenAcc[index]?.stops ?? false}
                    >
                        <Flex direction="column" align="flex-start" gap=".5rem">
                            <CustomRadioGroup
                                options={stopOptions}
                                name="stops"
                                value={filterData.stops}
                                onChange={(x) => handleRadio(x)}
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
                        isActive={isOpenAcc[index]?.airlines ?? false}
                    >
                        <Flex direction="column" gap=".5rem">
                            <Flex direction="column" align="space-between" gap=".5rem">
                                <SearchStringInput
                                    placeholder="Search Airlines"
                                    options={Object.keys(sortedAirlines)}
                                    onChange={(e: any) => handleCheck(e, "airlines")}
                                    icon={<LuSearch color="#929292" size={20} />}
                                />
                            </Flex>
                            <Flex direction="column" gap="0rem" margin=".5rem 0 0">
                                {filterData.airlines.map((airline, index) => (
                                    <CheckBox
                                        key={index}
                                        checked={true}
                                        name={airline}
                                        onChange={() =>
                                            handleCheck(airline, "airlines")
                                        }
                                    >
                                        <Text type="p" text={airline} size={15} />
                                    </CheckBox>
                                ))}
                            </Flex>
                        </Flex>
                    </Panel>

                    {/* Times */}
                    <Panel
                        title="Times"
                        toggle={() => onToggleAcc(index, "times")}
                        isActive={isOpenAcc[index]?.times ?? false}
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
                                    active={activeTimes === "depart"}
                                    width="50%"
                                    onClick={() => setActiveTimes("depart")}
                                >
                                    <Text
                                        type="p"
                                        text="Departure"
                                        weight={500}
                                        size={16}
                                    />
                                </ButtonBox>
                                <ButtonBox
                                    active={activeTimes === "return"}
                                    width="50%"
                                    onClick={() => setActiveTimes("return")}
                                >
                                    <Text
                                        type="p"
                                        text="Return"
                                        weight={500}
                                        size={16}
                                    />
                                </ButtonBox>
                            </Flex>
                            <Flex direction="column" gap=".25rem" padding="1rem 0">
                                <Text type="p" text="Departure" weight={500} />
                                <Slider
                                    marks={[
                                        {
                                            value: 0,
                                            label:
                                                activeTimes === "depart"
                                                    ? filterData.departTimes.depart.min
                                                    : filterData.returnTimes.depart.min,
                                        },
                                        {
                                            value: 96,
                                            label:
                                                activeTimes === "depart"
                                                    ? filterData.departTimes.depart.max
                                                    : filterData.returnTimes.depart.max,
                                        },
                                    ]}
                                    defaultValue={[0, 96]}
                                    onChange={(event, newValue) =>
                                        handleTimeChange(newValue, "depart")
                                    }
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
                                            label:
                                                activeTimes === "depart"
                                                    ? filterData.departTimes.arrival.min
                                                    : filterData.returnTimes.arrival
                                                        .min,
                                        },
                                        {
                                            value: 96,
                                            label:
                                                activeTimes === "depart"
                                                    ? filterData.departTimes.arrival.max
                                                    : filterData.returnTimes.arrival
                                                        .max,
                                        },
                                    ]}
                                    defaultValue={[0, 96]}
                                    onChange={(event, newValue) =>
                                        handleTimeChange(newValue, "arrival")
                                    }
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
                        isActive={isOpenAcc[index]?.alliance ?? false}
                    >
                        <Flex direction="column" gap="0">
                            {alliance.map((alliance, index) => (
                                <CheckBox
                                    key={index}
                                    checked={filterData.alliance.includes(alliance)}
                                    name={alliance}
                                    onChange={(e) => handleCheck(alliance, "alliance")}
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
                        isActive={isOpenAcc[index]?.duration ?? false}
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
                                            label: `${filterData.duration.travelTime.min} Hours`,
                                        },
                                        {
                                            value: 48,
                                            label: `${filterData.duration.travelTime.max} Hours`,
                                        },
                                    ]}
                                    defaultValue={[
                                        filterData.duration.travelTime.min,
                                        filterData.duration.travelTime.max,
                                    ]}
                                    onChange={(event, newValue) =>
                                        handleSlider(newValue, "duration", "travelTime")
                                    }
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
                                            label: `${filterData.duration.stopOver.min} Hours`,
                                        },
                                        {
                                            value: 48,
                                            label: `${filterData.duration.stopOver.max} Hours`,
                                        },
                                    ]}
                                    defaultValue={[
                                        filterData.duration.stopOver.min,
                                        filterData.duration.stopOver.max,
                                    ]}
                                    onChange={(event, newValue) =>
                                        handleSlider(newValue, "duration", "stopOver")
                                    }
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
                        isActive={isOpenAcc[index]?.price ?? false}
                    >
                        <Text
                            type="p"
                            text={`${formatPrice({
                                total: filterData.price.min,
                                currency: preFerredCurrency,
                                numberOfDecimalDigits: 0,
                            })} - ${formatPrice({
                                total: filterData.price.max,
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
                                        total: filterData.price.min,
                                        currency: preFerredCurrency,
                                        numberOfDecimalDigits: 0,
                                    }),
                                },
                                {
                                    value: 20000 * conversionRate,
                                    label: formatPrice({
                                        total: filterData.price.max,
                                        currency: preFerredCurrency,
                                        numberOfDecimalDigits: 0,
                                    }),
                                },
                            ]}
                            defaultValue={[filterData.price.min, filterData.price.max]}
                            onChange={(event, newValue) =>
                                handleSlider(newValue, "price", "price")
                            }
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
                        isActive={isOpenAcc[index]?.cabin ?? false}
                        last
                    >
                        <Flex direction="column" gap=".25rem" margin="0 0 1.5rem 0">
                            <CustomRadioGroup
                                options={cabinOptions}
                                name="cabin"
                                onChange={(x) => handleRadio(x)}
                                value={filterData.cabin}
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