import React, { useMemo, useState } from "react";
import {
  BtnDetails,
  BtnText,
  ButtonBtn,
  ChooseRoomImg,
  GridLayout,
  Span,
} from "./styles";
import Flex from "@/components/templates/flex";
import Text from "@/components/atoms/text";
import {
  formatPriceWithoutCurrency,
  getCurrency,
} from "@/lib/extensions/helpers/formatPrice";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ttColors } from "@/lib/theme/colors";
// import WifiIcon from "@mui/icons-material/Wifi";
// import CropFreeIcon from "@mui/icons-material/CropFree";
// import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
// import BedIcon from "@mui/icons-material/Bed";
// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import ApartmentIcon from "@mui/icons-material/Apartment";
import Link from "@/components/atoms/link";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { useRouter } from "next/navigation";
import { Checkbox } from "@mui/material";
import { Rate, ViewSingleStayResponse } from "@/lib/types/response-models/stay/search.type";
import { pickIcon } from "./modals/components/AmenitiesBox";
import { capCase } from "@/lib/utilFns";
import dayjs from "dayjs";
import { useQueryParams } from "@/hooks/useNext";
import { extractRoomForGuestsFromString } from "@/lib/types/request-models/stay/search.type";
import Button from "@/components/atoms/button";
import { useUserPreferencesStore } from "@/lib/store/preferences.store";
import { useConversionRate } from "@/hooks/useConversionRate";

interface OneOptionProps {
    label: string,
    subLabel?: string,
    price: string,
    name: string,
    value: string,
    active: boolean,
    onChange: (name: string, val: string) => void;
}
function OneOption({ label, subLabel, price, name, value, onChange, active }: OneOptionProps) {
    return (
        <Flex justify="space-between" align="center">
            <FormControlLabel
                value="refundable"
                control={
                    <Checkbox
                        disableFocusRipple
                        disableRipple
                        onChange={(e, val) => onChange(name, value)}
                        checked={active}
                        sx={{
                            color: ttColors.gray,
                            "&.Mui-checked": {
                                color: ttColors.primary,
                            },
                            "&.MuiSvgIcon-root": {
                                // fontSize: 20,
                            },
                        }}
                    />
                }
                label={
                    <Flex direction="column" width="100%">
                        <Flex
                            width="100%"
                            styles={{ whiteSpace: "nowrap" }}
                            className="wrap_text"
                        >
                            <Text
                                size={14}
                                weight={500}
                                type="p"
                                // styles={{ minWidth: "210px" }}
                                // whiteSpace="nowrap"
                                text={label}
                            ></Text>
                        </Flex>
                        {subLabel && 
                            <Text
                                size={12}
                                type="p"
                                text={subLabel}
                            ></Text>
                        }
                    </Flex>
                }
            />
            <Flex justify="flex-end">
                <Text
                type="h4"
                weight={"bold"}
                whiteSpace="nowrap"
                styles={{ marginLeft: "3px" }}
                text={`+${getCurrency()}${formatPriceWithoutCurrency(parseInt(price))}`}
                ></Text>
            </Flex>
        </Flex>
    )
}

interface OneHotelProps {
    stayImages: string[];
    hotel: Rate;
    index: number;
    onClick: VoidFunction;
    cancelOptions: { value: string; label: string; price: string; }[]
}

function OneHotel({ hotel, index, onClick, cancelOptions, stayImages }: OneHotelProps) {
    const { preFerredCurrency, conversionRate } = useUserPreferencesStore((state) => state);
    const { isMobile } = useScreenResolution();
    const { convertCurrency } = useConversionRate()

    const selectedPrice = hotel.payment_options.payment_types.find(e => e.currency_code === 'USD') ?? hotel.payment_options.payment_types.find(e => e.currency_code === 'EUR') ?? hotel.payment_options.payment_types[0]
    const displayPrice = {
        currencyCode: selectedPrice?.currency_code ?? preFerredCurrency,
        amount: selectedPrice?.amount ?? convertCurrency({ convertFrom: selectedPrice?.currency_code, convertTo: preFerredCurrency, amount: selectedPrice?.amount }).amount,
    }


    return (
        <Span key={index} style={{ marginBottom: "60px" }}>
            <GridLayout className="choose_room_list" style={{ gap: '3rem' }}>
              <Span style={{ overflow: "hidden" }}>
                <Flex direction="column" gap="10px">
                  <Flex
                    direction={isMobile ? "row" : "column"}
                    gap={isMobile ? "20px" : ""}
                    className="choose_img_text"
                  >
                    <ChooseRoomImg>
                      <img
                        style={{
                            width: "100%",
                            height: "255px",
                            minWidth: "260px",
                            objectFit: "cover",
                            borderRadius: "12px",
                        }}
                        src={stayImages[0] ?? ''}
                        alt={hotel.room_name}
                      />
                    </ChooseRoomImg>
                    <Span>
                    {isMobile && (
                        <React.Fragment>
                            <Text type="h2" weight={600} text={capCase(hotel.room_data_trans?.main_name)}></Text>
                            <Text type="p" text={capCase(hotel.room_data_trans?.bedding_type)}></Text>
                        </React.Fragment>
                    )}
                      <Span style={{ margin: '1rem 0 .6rem'}}>
                        <Flex align="center" gap="0">
                          <Flex gap="5px" align="center">
                            <Text
                                type="p"
                                size={24}
                                whiteSpace="nowrap"
                                weight={600}
                                text={displayPrice?.currencyCode}
                            />{" "}
                            <Text
                                type="p"
                                whiteSpace="wrap"
                                size={30}
                                weight={600}
                                text={formatPriceWithoutCurrency(parseFloat(parseFloat(displayPrice?.amount).toFixed(2)))}
                            />
                            <Text
                              type="p"
                              className="truncate"
                              color="var(--text-gray-color)"
                              text="/per night"
                            ></Text>
                          </Flex>
                        </Flex>
                      </Span>
                      <Span style={{ margin: '0 0 .6rem'}}>
                        <Flex gap="5px" align="center">
                          <Text
                            type="p"
                            size={20}
                            weight={600}
                            text={displayPrice?.currencyCode}
                            styles={{ minWidth: 'max-content' }}
                          />
                          <Flex align="center">
                            <Text
                              type="p"
                              size={20}
                              weight={600}
                              text={formatPriceWithoutCurrency(parseFloat(parseFloat(displayPrice?.amount).toFixed(2)))}
                            />
                            <Text
                              type="p"
                              color="var(--text-gray-color)"
                              text="/total"
                            ></Text>
                          </Flex>
                        </Flex>
                      </Span>
                        <Text type="p" text={`For ${hotel.rg_ext?.capacity} travellers`} size={15} styles={{ margin: '0 0 .6rem'}}></Text>
                        <Text type="p" text="Including taxes and fees" size={15}></Text>
                    </Span>
                  </Flex>
                </Flex>
              </Span>
              <Span>
                <Flex direction="column" gap=".5rem">
                {!isMobile &&
                    <React.Fragment>
                        <Text type="h2" weight={600} size={28}  text={hotel.room_data_trans?.main_name}></Text>
                        <Text type="p" size={16} text={capCase(hotel.room_data_trans?.bedding_type)}></Text>
                    </React.Fragment>
                  }
                  <Span style={{ margin: isMobile ? "1rem 0px" : "1rem 0px 3.5rem", gap: "1rem" }}>
                    <Flex wrap="wrap" gap="8px" align="center">
                        {[...hotel.amenities_data, ...hotel.serp_filters].map((am, index) =>
                            <BtnDetails
                                style={{ backgroundColor: ttColors.grayishAsh }}
                                key={`amenity-${index}`}
                            >
                                <Flex align="center" gap="5px">
                                {pickIcon(am, { fontSize: "17px" })}
                                <Text
                                    weight={500}
                                    size={15}
                                    type="p"
                                    text={am.includes('_') ? capCase(am, '_') : capCase(am, '-')}
                                ></Text>
                                </Flex>
                            </BtnDetails>
                        )}
                    </Flex>
                    <Flex
                        align="center"
                        gap="8px"
                        styles={{ color: "#7bbbd6", margin: "1rem 0 0" }}
                        onClick={onClick}
                    >
                        <Text size={15} type="p" text="More Details"></Text>
                        <ArrowForwardIosIcon style={{ fontSize: "14px" }} />
                    </Flex>
                    </Span>
                    {!isMobile && (
                        <Span style={{ marginTop: "20px", maxWidth: isMobile ? '' : '20rem' }}>
                            <Button width='100%' padding='1.5rem 2rem' background={ttColors.dark} onClick={onClick}>
                                <BtnText>Reserve Room</BtnText>
                            </Button>
                        </Span>
                  )}
                  {/* <Span>
                    <Flex direction="column" styles={{ margin: "10px 0px" }}>
                      <Text
                        type="h5"
                        weight={"bold"}
                        size={16}
                        styles={{ marginTop: "10px" }}
                        text="Cancellation Policy"
                      ></Text>
                      <Flex
                        align="center"
                        gap="8px"
                        styles={{ marginBottom: "5px" }}
                      >
                        <Text
                          type="p"
                          size={14}
                          color="var(--text-gray-color)"
                          text="All privacy policy details"
                        ></Text>
                        <ErrorOutlineOutlinedIcon
                          style={{
                            fontSize: "19px",
                            color: "var(--text-gray-color)",
                          }}
                        />
                      </Flex>
                    </Flex>

                    <Flex direction="column">
                        {cancelOptions.map((opt, index) => 
                            <OneOption
                                key={`opt-${index}`}
                                label={opt.label}
                                value={opt.value}
                                active={selected.cancellation == index}
                                price={opt.price}
                                name="cancellation"
                                onChange={onSelectCancel}
                            />
                        )}
                    </Flex>
                  </Span>
                  <Span>
                    <Flex direction="column" styles={{ margin: "10px 0px" }}>
                      <Text
                        type="h5"
                        weight={"bold"}
                        size={16}
                        styles={{ marginTop: "10px" }}
                        text="Extras"
                      ></Text>
                      <Flex
                        align="center"
                        gap="8px"
                        styles={{ marginBottom: "5px" }}
                      >
                        <Text
                          type="p"
                          size={14}
                          color="var(--text-gray-color)"
                          text="All privacy policy details"
                        ></Text>
                        <ErrorOutlineOutlinedIcon
                          style={{
                            fontSize: "19px",
                            color: "var(--text-gray-color)",
                          }}
                        />
                      </Flex>
                    </Flex>

                    <Flex direction="column">
                      <Flex justify="space-between" align="center">
                        <FormControlLabel
                          value="no-extras"
                          control={
                            <Checkbox
                              disableFocusRipple
                              disableRipple
                              sx={{
                                color: ttColors.gray,
                                "&.Mui-checked": {
                                  color: ttColors.primary,
                                },
                                "&.MuiSvgIcon-root": {
                                  // fontSize: 20,
                                },
                              }}
                            />
                          }
                          label={
                            <Text
                              size={14}
                              type="p"
                              weight={500}
                              text="No Extras"
                            ></Text>
                          }
                        />
                        <Text
                          type="h4"
                          weight={"bold"}
                          whiteSpace="nowrap"
                          text="+$0"
                        ></Text>
                      </Flex>
                      <Flex justify="space-between" align="center">
                        <FormControlLabel
                          value="parking"
                          control={
                            <Checkbox
                              disableFocusRipple
                              disableRipple
                              sx={{
                                color: ttColors.gray,
                                "&.Mui-checked": {
                                  color: ttColors.primary,
                                },
                                "&.MuiSvgIcon-root": {
                                  // fontSize: 20,
                                },
                              }}
                            />
                          }
                          label={
                            <Text
                              size={14}
                              weight={500}
                              type="p"
                              text="Parking"
                            ></Text>
                          }
                        />
                        <Flex justify="flex-end">
                          <Text
                            type="h4"
                            weight={"bold"}
                            whiteSpace="nowrap"
                            text="+$0"
                          ></Text>
                        </Flex>
                      </Flex>
                      <Flex justify="space-between" align="center">
                        <FormControlLabel
                          value="breakfast"
                          control={
                            <Checkbox
                              disableFocusRipple
                              disableRipple
                              sx={{
                                color: ttColors.gray,
                                "&.Mui-checked": {
                                  color: ttColors.primary,
                                },
                                "&.MuiSvgIcon-root": {
                                  // fontSize: 20,
                                },
                              }}
                            />
                          }
                          label={
                            <Text
                              size={14}
                              weight={500}
                              type="p"
                              text="Breakfast"
                            ></Text>
                          }
                        />
                        <Flex justify="flex-end">
                          <Text
                            type="h4"
                            weight={"bold"}
                            whiteSpace="nowrap"
                            text={`+$${140}`}
                          ></Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Span> */}
                </Flex>
              </Span>
            </GridLayout>
            {isMobile && (
              <Span style={{ marginTop: "20px" }}>
                <Button width='100%' padding='1.5rem 2rem' background={ttColors.dark} onClick={onClick}>
                  <BtnText>Reserve Room</BtnText>
                </Button>
              </Span>
            )}
        </Span>
    )
}

interface HotelListProps {
    stayResponse?: ViewSingleStayResponse;
    stayImages: string[];
    hotels: Rate[];
}

function ChooseYourRoomList(props: HotelListProps) {
    const { stayResponse, stayImages, hotels } = props;
    const { queryParams } = useQueryParams()

    const router = useRouter();

    const handleClick = (hotel: Rate) => {
        router.push(`/stay/booking?hotelId=${queryParams?.id}&bookHash=${hotel?.book_hash}&guests=${queryParams?.guests}&checkIn=${queryParams?.checkIn}&checkOut=${queryParams?.checkOut}`);
    };

    const formatPolicy = (start: string | null, end: string | null) => {
        if (start && end) {
            return `Cancel from ${dayjs(start).format('MMM DD')} to ${dayjs(end).format('MMM DD')}`
        } else if (start && !end) {
            return `Cancel from ${dayjs(start).format('MMM DD')}`
        } else if (!start && end) {
            return `Cancel before ${dayjs(end).format('MMM DD')}`
        } else return ''
    }

    return (
        <React.Fragment>
            <Span style={{ marginTop: "60px" }}>
                {hotels.map((hotel, index) => {
                    const cancelOptions = hotel.payment_options.payment_types[0].cancellation_penalties.policies.map((pol, index) => ({
                        value: `${index}`,
                        label: formatPolicy(pol.start_at, pol.end_at),
                        price: pol.amount_show,
                    }))
                    return (
                        <OneHotel
                            stayImages={stayImages}
                            key={`hotel-${index}`}
                            hotel={hotel}
                            index={index}
                            onClick={() => handleClick(hotel)}
                            cancelOptions={cancelOptions}
                        />
                    )}
                )}
            </Span>
        </React.Fragment>
  );
}

export default ChooseYourRoomList;
