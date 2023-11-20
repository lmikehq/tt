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
import Filter from "./modals/components/FilterBox";
import { useState } from "react";
import { ChangeSearchModal } from "./modals/Modals";

const ChooseYourRoom = () => {
  const { isMobile } = useScreenResolution();

  const [open, setOpen] = useState({
    search: false,
  });
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
              // position="relative"
              onChange={(e) => {}}
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
              // position="relative"
              onChange={(e) => {}}
            />
          </Flex>{" "}
          <Flex
            direction="column"
            gap=".5rem"
            styles={{ marginBottom: "1.2rem" }}
          >
            <Text type="label" size={16} text="Guest & Rooms" weight={400} />
            <DatePicker
              placeholder="Select Date"
              // position="relative"
              onChange={(e) => {}}
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
        <Span>
          <Filter />
        </Span>
        {isMobile && (
          <>
            <Span>
              <Flex direction="column">
                <Span>
                  <ButtonBtn className="filter_button">
                    <Flex align="center" gap="5px">
                      <TuneIcon />
                      <Text
                        type="p"
                        weight={"bold"}
                        size={15}
                        text="Filter"
                      ></Text>
                    </Flex>
                    <Flex align="center" justify="center" className="badge">
                      <Text type="p" text={`${2}`}></Text>
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
                    <BtnDetails
                      className="filter_btn"
                      style={{ backgroundColor: ttColors.grayishAsh }}
                    >
                      <Flex align="center" gap="5px">
                        <Text
                          weight={500}
                          size={15}
                          type="p"
                          text="Double Bed"
                        ></Text>
                        <CloseIcon
                          style={{ fontSize: "17px", cursor: "pointer" }}
                        />
                      </Flex>
                    </BtnDetails>
                    <BtnDetails
                      className="filter_btn"
                      style={{ backgroundColor: ttColors.grayishAsh }}
                    >
                      <Flex align="center" gap="5px">
                        <Text
                          weight={500}
                          size={15}
                          type="p"
                          text="No Meal"
                        ></Text>
                        <CloseIcon
                          style={{ fontSize: "17px", cursor: "pointer" }}
                        />
                      </Flex>
                    </BtnDetails>
                    <BtnDetails
                      className="filter_btn"
                      style={{ backgroundColor: ttColors.grayishAsh }}
                    >
                      <Flex align="center" gap="5px">
                        <Text
                          weight={500}
                          size={15}
                          type="p"
                          text="With Free Cancellation"
                        ></Text>
                        <CloseIcon
                          style={{ fontSize: "17px", cursor: "pointer" }}
                        />
                      </Flex>
                    </BtnDetails>
                  </Flex>
                  <Flex styles={{ marginTop: "8px" }}>
                    <BtnDetails className="reset_filters">
                      <Flex align="center" gap="5px">
                        <Text
                          weight={500}
                          size={15}
                          type="p"
                          text="Reset All Filters"
                        ></Text>
                      </Flex>
                    </BtnDetails>
                  </Flex>
                </Span>
                <Span>
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
                </Span>{" "}
              </Flex>
            </Span>
            <Span style={{ marginTop: "20px" }}>
              <Flex direction="column">
                <Text
                  type="p"
                  weight={500}
                  text="There is no hotel available with the selected filters"
                ></Text>
                <Text
                  type="p"
                  size={14}
                  text="Remove some of the selected filters to get results"
                ></Text>
              </Flex>
              <Flex direction="column" gap="8px" styles={{ marginTop: "10px" }}>
                <BtnDetails className="reset_filters chosen_filter">
                  <Flex align="center" justify="space-between" gap="5px">
                    <Flex align="center" gap="5px">
                      <Text weight={500} size={15} type="p" text="Beds:"></Text>
                      <Text
                        color={"var(--text-gray-color)"}
                        size={15}
                        type="p"
                        text="Double Beds"
                      ></Text>
                    </Flex>
                    <CloseIcon
                      style={{
                        fontSize: "17px",
                        cursor: "pointer",
                        color: "var(--color-rating)",
                      }}
                    />
                  </Flex>
                </BtnDetails>
                <BtnDetails className="reset_filters chosen_filter">
                  <Flex align="center" justify="space-between" gap="5px">
                    <Flex align="center" gap="5px">
                      <Text
                        weight={500}
                        size={15}
                        type="p"
                        text="Meals:"
                      ></Text>
                      <Text
                        color={"var(--text-gray-color)"}
                        size={15}
                        type="p"
                        text="No meals"
                      ></Text>
                    </Flex>
                    <CloseIcon
                      style={{
                        fontSize: "17px",
                        cursor: "pointer",
                        color: "var(--color-rating)",
                      }}
                    />
                  </Flex>
                </BtnDetails>{" "}
                <BtnDetails className="reset_filters chosen_filter">
                  <Flex align="center" justify="space-between" gap="5px">
                    <Flex align="center" gap="5px">
                      <Text
                        weight={500}
                        size={15}
                        type="p"
                        text="Cancellation policy:"
                      ></Text>
                      <Text
                        color={"var(--text-gray-color)"}
                        size={15}
                        type="p"
                        text="With free cancellation"
                      ></Text>
                    </Flex>
                    <CloseIcon
                      style={{
                        fontSize: "17px",
                        cursor: "pointer",
                        color: "var(--color-rating)",
                      }}
                    />
                  </Flex>
                </BtnDetails>
              </Flex>
            </Span>
            <Span style={{ marginTop: "10px" }}>
              <Text
                type="p"
                color={ttColors.primary}
                cursor="pointer"
                text="Show all options available"
              ></Text>
            </Span>
          </>
        )}
      </Section>
      <Section>
        <Button background={ttColors.dark} width="100%" height="45px">
          <Text type="p" text="Search Again" size={16} weight={600} />
        </Button>
      </Section>
      <Span>
        <ChooseYourRoomList />
      </Span>
    </Container>
  );
};

export default ChooseYourRoom;
