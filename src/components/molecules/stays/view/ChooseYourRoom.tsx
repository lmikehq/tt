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
import { FlexBox } from "../components/styles";
import { useMemo, useState } from "react";
import { ChangeSearchModal, FilterModal } from "./modals/Modals";
import FilterBox from "./modals/components/FilterBox";
import { isNull } from "util";
import { Rate, ViewSingleStayResponse } from "@/lib/types/response-models/stay/search.type";
import Dropdown from "@/components/organisms/dropdown";
import { capCase } from "@/lib/utilFns";


interface Metapolicy {
  meal: string[];
  extra_bed: string[];
}
interface Hotel {
  name: string;
  images: string[];
  price: number;
  metapolicy_struct: Metapolicy;
}

const hotels: Hotel[] = [
    {
        name: "The Ritz London, 1 King Bed",
        images: ["/assets/images/stays/image1.jpg"],
        price: 105000,
        metapolicy_struct: {
        meal: [],
        extra_bed: [],
        },
    },
];


interface ChooseYourRoomProps {
    stayResponse: ViewSingleStayResponse;
}

const ChooseYourRoom = ({ stayResponse } : ChooseYourRoomProps) => {
    const { isMobile } = useScreenResolution();

    const [open, setOpen] = useState({
        search: false,
        filter: false,
    });

    // FILTERED ITEMS
    const [filteredItems, setFilteredItems] = useState<Rate[]>(stayResponse.rates ?? []);

    type OptionsType = { value: string; label: string; }[] 
    // BEDS
    const [beds, setBeds] = useState("");
    const bedsOptions = useMemo(() => {
        const res = stayResponse.rates?.map((r, ind, arr) => ({
            value: r.room_data_trans?.bedding_type,
            label: capCase(r.room_data_trans?.bedding_type)
        })).reduce((prev, curr) =>
            !prev.some(e => e?.value === curr.value) ? [...prev, curr] : prev, [] as OptionsType) ?? []
        return [{ value: '', label: 'All Options' }, ...res]
    }
    , [stayResponse.rates])
    
    
    // MEALS
    const [selectedMeals, setSelectedMeals] = useState("");
    const mealOptions = useMemo(() => {
        const res = stayResponse.rates.map(r => ({
            value: r.meal,
            label: capCase(r.meal)
        })).reduce((prev, curr) =>
            !prev.some(e => e?.value === curr.value) ? [...prev, curr] : prev, [] as OptionsType) ?? []
        return [{ value: '', label: 'All Options' }, ...res]
    } 
    , [stayResponse.rates])
    
    // CANCELLATION
    const [cancellation, setCancellation] = useState("");
    const cancellationOptions = [
        { value: "", label: "All Options" },
        { value: "free cancellation", label: "With Free Cancellation" },
    ];

    // PAYMENT
    const [selectedPayment, setSelectedPayment] = useState("");
    const paymentOptions = [
        { value: "", label: "All Options" },
        { value: "now", label: "Pay Now" },
        { value: "deposit", label: "Deposit" },
    ];

    const [submissionState, setSubmissionState] = useState({
        loading: false,
        //properties needed
    });
    
    const options = [
        { value: "", label: "Select Guest" },
        { value: "2 adult", label: "2 Adult" },
        { value: "3 children", label: "3 Children" },
        { value: "all inclusive", label: "All Inclusive" },
    ];
    const [guest, setGuest] = useState("");

    const filterItems = () => {
        const newItems = stayResponse.rates.filter(r => 
            (!!beds ? r.room_data_trans.bedding_type === beds : true) &&
            (!!selectedMeals ? r.meal === selectedMeals : true) &&
            (!!cancellation ? r.payment_options.payment_types[0]?.cancellation_penalties.free_cancellation_before : true) &&
            (!!selectedPayment ? r.payment_options.payment_types[0]?.type === selectedPayment : true)
        )
        console.log(newItems)
        setFilteredItems(prev => newItems)
    }

    const activeFilters = useMemo(() => 
        ({
            beds: !!beds ? true : false,  
            meals: !!selectedMeals ? true : false,
            cancellation: !!cancellation ? true : false,  
            payment: !!selectedPayment ? true : false,  
        })
    , [beds, selectedMeals, cancellation, selectedPayment])
    
    console.log(beds, selectedMeals, selectedPayment, cancellation)

    const handleSubmit = () => {
        setOpen((prev) => ({
            ...prev,
            filter: false,
        }));
        filterItems()
    };

  return (
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
            />
          </Flex>{" "}
          <Flex
            direction="column"
            gap=".5rem"
            styles={{ marginBottom: "1.2rem" }}
          >
            <Text type="label" size={16} text="Guest & Rooms" weight={400} />
            <Dropdown
                options={options}
                className="mui_select"
                width="100%"
                minHeight="45px"
                height="45px"
                selectedValue={guest}
                setSelectedValue={setGuest}
                disabled  
            />
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
              beds={beds}
              setBeds={setBeds}
              bedsOptions={bedsOptions}
              selectedMeals={selectedMeals}
              setSelectedMeals={setSelectedMeals}
              mealOptions={mealOptions}
              cancellation={cancellation}
              setCancellation={setCancellation}
              cancellationOptions={cancellationOptions}
              selectedPayment={selectedPayment}
              setSelectedPayment={setSelectedPayment}
              paymentOptions={paymentOptions}
              submissionState={submissionState}
              setSubmissionState={setSubmissionState}
              handleSubmit={handleSubmit}
              items={filteredItems}
            />
          )}
          {isMobile && (
            <Span>
              {/* FILTER MODAL*/}
              <FilterModal
                open={open.filter}
                beds={beds}
                setBeds={setBeds}
                bedsOptions={bedsOptions}
                selectedMeals={selectedMeals}
                setSelectedMeals={setSelectedMeals}
                mealOptions={mealOptions}
                cancellation={cancellation}
                setCancellation={setCancellation}
                cancellationOptions={cancellationOptions}
                selectedPayment={selectedPayment}
                setSelectedPayment={setSelectedPayment}
                paymentOptions={paymentOptions}
                submissionState={submissionState}
                setSubmissionState={setSubmissionState}
                handleSubmit={handleSubmit}
                items={filteredItems}
                handleClose={() =>
                  setOpen((prev) => ({
                    ...prev,
                    filter: false,
                  }))
                }
              />
            </Span>
          )}
        </Span>
        {isMobile && (
          <>
            <Span>
              <Flex direction="column">
                <Span>
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
                </Span>
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
                    {Object.keys(activeFilters).map((opt) => 
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
                                //onClick={() => removeOptionHandler(option)}
                                style={{ fontSize: "17px", cursor: "pointer" }}
                            />
                        </BtnDetails>
                    )}
                  </Flex>
                  <Flex styles={{ marginTop: "8px" }}>
                    <BtnDetails
                      // onClick={resetAllFilters}
                      className="reset_filters"
                    >
                      <Flex align="center" gap="5px" justify="center">
                        <Text
                          weight={500}
                          size={15}
                          type="p"
                          text="Reset All Filters"
                        ></Text>
                      </Flex>
                    </BtnDetails>
                  </Flex>
                  {/* )} */}
                </Span>
                <Span>
                    <Button
                      background="transparent"
                      color={ttColors.dark}
                      border={`1px solid ${ttColors.dark}`}
                      padding="7px 10px"
                      width="100%"
                      styles={{ background: "transparent !important" }}
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
            </Span>
            <Span style={{ marginTop: "20px" }}>
                <Flex direction="column">
                    <Text
                        type="p"
                        weight={500}
                        text="There is no hotel available with the selected filters"
                    />
                    <Text
                        type="p"
                        size={14}
                        text="Remove some of the selected filters to get results"
                    />
                </Flex>
              {/* <Flex direction="column" gap="8px" styles={{ marginTop: "10px" }}>
                <BtnDetails
                  // key={index}
                  className="reset_filters chosen_filter"
                >
                  <Flex align="center" justify="space-between" gap="5px">
                    <Flex align="center" gap="5px">
                      <Text
                        weight={500}
                        size={15}
                        type="p"
                        text=""
                        // text={getLabelForOption(option)}
                      ></Text>
                      <Text
                        color={"var(--text-gray-color)"}
                        size={15}
                        type="p"
                        text=""
                        // text={option}
                      ></Text>
                    </Flex>
                    <CloseIcon
                      //onClick={() => removeOptionHandler(option)}
                      style={{
                        fontSize: "17px",
                        cursor: "pointer",
                        color: "var(--color-rating)",
                      }}
                    />
                  </Flex>
                </BtnDetails>
              </Flex> */}
            </Span>
            {/* <Span style={{ marginTop: "10px" }}>
              <Text
                type="p"
                color={ttColors.primary}
                cursor="pointer"
                text="Show all options available"
              ></Text>
            </Span> */}
          </>
        )}
      </Section>
      <Section>
        <Button background={ttColors.dark} width="100%" height="45px" onClick={handleSubmit}>
          <Text type="p" text="Search" size={16} weight={600} />
        </Button>
      </Section>
      <Span>
        <ChooseYourRoomList hotels={filteredItems} />
      </Span>
    </Container>
  );
};

export default ChooseYourRoom;
