import React from "react";
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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ttColors } from "@/lib/theme/colors";
import WifiIcon from "@mui/icons-material/Wifi";
import CropFreeIcon from "@mui/icons-material/CropFree";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import BedIcon from "@mui/icons-material/Bed";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ApartmentIcon from "@mui/icons-material/Apartment";
import Link from "@/components/atoms/link";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { useRouter } from "next/navigation";
import { Checkbox } from "@mui/material";

interface Room {
  name: string;
  image: string;
  price: number;
}

const rooms: Room[] = [
  {
    name: "The Ritz London, 1 King Bed",
    image: "/assets/images/stays/image1.jpg",
    price: 105000,
  },
  {
    name: "Get Eden Life Hotel",
    image: "/assets/images/stays/image1.jpg",
    price: 105000,
  },
  {
    name: "Get Eden Life Hotel",
    image: "/assets/images/stays/image1.jpg",
    price: 105000,
  },
  {
    name: "Get Eden Life Hotel",
    image: "/assets/images/stays/image1.jpg",

    price: 105000,
  },
  {
    name: "Get Eden Life Hotel",
    image: "/assets/images/stays/image1.jpg",

    price: 105000,
  },
  {
    name: "Get Eden Life Hotel",
    image: "/assets/images/stays/image1.jpg",

    price: 105000,
  },
];
function ChooseYourRoomList() {
  const { isMobile } = useScreenResolution();

  const router = useRouter();

  const handleClick = () => {
    router.push("/stay/booking");
  };

  return (
    <>
      <Span style={{ marginTop: "60px" }}>
        {rooms.map((room, index) => (
          <Span key={index} style={{ marginBottom: "60px" }}>
            <GridLayout className="choose_room_list">
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
                          height: "100%",
                          minWidth: "260px",
                          objectFit: "cover",
                          borderRadius: "12px",
                        }}
                        src={room.image}
                        alt={room.name}
                      />
                    </ChooseRoomImg>
                    <Span>
                      {isMobile && (
                        <Text type="h2" weight={600} text={room.name}></Text>
                      )}
                      <Span>
                        <Flex align="center">
                          <Flex gap="5px" align="center">
                            <Text
                              type="p"
                              size={24}
                              whiteSpace="nowrap"
                              weight={600}
                              text={getCurrency()}
                            />{" "}
                            <Text
                              type="p"
                              size={30}
                              weight={600}
                              text={formatPriceWithoutCurrency(81500)}
                            />
                          </Flex>
                          <Flex>
                            <Text
                              type="p"
                              className="truncate"
                              color="var(--text-gray-color)"
                              text="/Per night"
                            ></Text>
                          </Flex>
                        </Flex>
                      </Span>
                      <Span>
                        <Flex gap="5px" align="center">
                          <Text
                            type="p"
                            size={20}
                            weight={600}
                            text={getCurrency()}
                          />
                          <Flex align="center">
                            <Text
                              type="p"
                              size={20}
                              weight={600}
                              text={formatPriceWithoutCurrency(815000)}
                            />
                            <Text
                              type="p"
                              color="var(--text-gray-color)"
                              text="/total"
                            ></Text>
                          </Flex>
                        </Flex>
                      </Span>
                      <Text type="p" text="2 travellers"></Text>
                      <Text type="p" text="Including taxes and fees"></Text>
                    </Span>
                  </Flex>
                  {!isMobile && (
                    <Span style={{ marginTop: "20px" }}>
                      <ButtonBtn onClick={handleClick}>
                        <BtnText>Reserve Room</BtnText>
                      </ButtonBtn>
                    </Span>
                  )}
                </Flex>
              </Span>
              <Span>
                <Flex direction="column">
                  {!isMobile && (
                    <Text type="h2" weight={600} text={room.name}></Text>
                  )}
                  <Span style={{ margin: "15px 0px" }}>
                    <Flex wrap="wrap" gap="8px" align="center">
                      <BtnDetails
                        style={{ backgroundColor: ttColors.grayishAsh }}
                      >
                        <Flex align="center" gap="5px">
                          <CropFreeIcon style={{ fontSize: "17px" }} />
                          <Text
                            weight={500}
                            size={15}
                            type="p"
                            text="300sq feet"
                          ></Text>
                        </Flex>
                      </BtnDetails>
                      <BtnDetails
                        style={{ backgroundColor: ttColors.grayishAsh }}
                      >
                        <Flex align="center" gap="5px">
                          <WifiIcon style={{ fontSize: "17px" }} />
                          <Text
                            weight={500}
                            size={15}
                            type="p"
                            text="Free Wifi"
                          ></Text>
                        </Flex>
                      </BtnDetails>
                      <BtnDetails
                        style={{ backgroundColor: ttColors.grayishAsh }}
                      >
                        <Flex align="center" gap="5px">
                          <BathtubOutlinedIcon style={{ fontSize: "17px" }} />
                          <Text
                            weight={500}
                            size={15}
                            type="p"
                            text="Bathroom"
                          ></Text>
                        </Flex>
                      </BtnDetails>
                      <BtnDetails
                        style={{ backgroundColor: ttColors.grayishAsh }}
                      >
                        <Flex align="center" gap="5px">
                          <BedIcon style={{ fontSize: "17px" }} />
                          <Text
                            weight={500}
                            size={15}
                            type="p"
                            text="1 King Bed OR 2 Twin Beds"
                          ></Text>
                        </Flex>
                      </BtnDetails>
                      <BtnDetails
                        style={{ backgroundColor: ttColors.grayishAsh }}
                      >
                        <Flex align="center" gap="5px">
                          <BathtubOutlinedIcon style={{ fontSize: "17px" }} />
                          <Text
                            weight={500}
                            size={15}
                            type="p"
                            text="Bathroom"
                          ></Text>
                        </Flex>
                      </BtnDetails>
                      <BtnDetails
                        style={{ backgroundColor: ttColors.grayishAsh }}
                      >
                        <Flex align="center" gap="5px">
                          <PeopleAltIcon style={{ fontSize: "17px" }} />
                          <Text
                            weight={500}
                            size={15}
                            type="p"
                            text="2 persons"
                          ></Text>
                        </Flex>
                      </BtnDetails>
                      <BtnDetails
                        style={{ backgroundColor: ttColors.grayishAsh }}
                      >
                        <Flex align="center" gap="5px">
                          <ApartmentIcon style={{ fontSize: "17px" }} />
                          <Text
                            weight={500}
                            size={15}
                            type="p"
                            text="City View"
                          ></Text>
                        </Flex>
                      </BtnDetails>

                      <BtnDetails
                        style={{ backgroundColor: ttColors.grayishAsh }}
                      >
                        <Flex align="center" gap="5px">
                          <PeopleAltIcon style={{ fontSize: "17px" }} />
                          <Text
                            weight={500}
                            size={15}
                            type="p"
                            text="2 persons"
                          ></Text>
                        </Flex>
                      </BtnDetails>

                      <Link
                        href="/stay/booking"
                        style={{ width: "fit-content" }}
                      >
                        <Flex
                          align="center"
                          gap="8px"
                          styles={{ color: ttColors.primary }}
                        >
                          <Text size={15} type="p" text="More Details"></Text>
                          <ArrowForwardIosIcon style={{ fontSize: "14px" }} />
                        </Flex>
                      </Link>
                    </Flex>
                  </Span>
                  <Span>
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
                      <Flex justify="space-between" align="center">
                        <FormControlLabel
                          value="non-refundable"
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
                            <Flex
                              width="100%"
                              styles={{ whiteSpace: "nowrap" }}
                              className="wrap_text"
                            >
                              <Text
                                size={14}
                                weight={500}
                                // whiteSpace="nowrap"
                                width={"100%"}
                                type="p"
                                text="Non-Refundable"
                              ></Text>
                            </Flex>
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
                          value="refundable"
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
                                  text="Fully refundable before Oct 19"
                                ></Text>
                              </Flex>
                              <Text
                                size={12}
                                type="p"
                                text="Reserve now, pay later"
                              ></Text>
                            </Flex>
                          }
                        />
                        <Flex justify="flex-end">
                          <Text
                            type="h4"
                            weight={"bold"}
                            whiteSpace="nowrap"
                            styles={{ marginLeft: "3px" }}
                            text={`+$${140}`}
                          ></Text>
                        </Flex>
                      </Flex>
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
                  </Span>
                </Flex>
              </Span>
            </GridLayout>
            {isMobile && (
              <Span style={{ marginTop: "20px" }}>
                <ButtonBtn>
                  <BtnText>Reserve Room</BtnText>
                </ButtonBtn>
              </Span>
            )}
          </Span>
        ))}
      </Span>
    </>
  );
}

export default ChooseYourRoomList;
