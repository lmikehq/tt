"use client";
import Text from "@/components/atoms/text";
import Section from "../../section";
import { Grid } from "@/components/templates/grid";
import Flex from "@/components/templates/flex";
import { DatePicker } from "@/components/organisms/customDatePicker";
import Button from "@/components/atoms/button";
import { ttColors } from "@/lib/theme/colors";
import { Container, Header, Span } from "./styles";
import ChooseYourRoomList from "./ChooseYourRoomList";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";

const ChooseYourRoom = () => {
  const { isMobile } = useScreenResolution();

  return (
    <Container>
      <Header id="rooms">
        <Flex justify="space-between">
          <Text type="h1" size={24} weight={600} text="Choose Your Room" />
          <Button
            background="transparent"
            color={ttColors.dark}
            border={`1px solid ${ttColors.dark}`}
            padding="8px 10px"
            styles={{ background: "transparent !important" }}
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
              position="start"
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
              position="start"
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
              position="start"
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
        {!isMobile && (
          <Grid columns={4} gap="1rem">
            <Flex
              direction="column"
              gap=".5rem"
              styles={{ marginBottom: "1.2rem" }}
            >
              <Text type="label" size={16} text="Beds" weight={400} />
              <select
                name="filter"
                style={{
                  padding: "10px",
                  borderRadius: "6px",
                  width: "100%",
                  borderColor: ttColors.gray,
                  outline: "none",
                }}
              >
                <option value="option">All Option</option>
              </select>
            </Flex>
            <Flex
              direction="column"
              gap=".5rem"
              styles={{ marginBottom: "1.2rem" }}
            >
              <Text type="label" size={16} text="Meals" weight={400} />
              <select
                name="filter"
                style={{
                  padding: "10px",
                  borderRadius: "6px",
                  width: "100%",
                  borderColor: ttColors.gray,
                  outline: "none",
                }}
              >
                <option value="option">All Option</option>
              </select>
            </Flex>{" "}
            <Flex
              direction="column"
              gap=".5rem"
              styles={{ marginBottom: "1.2rem" }}
            >
              <Text type="label" size={16} text="Cancellation" weight={400} />
              <select
                name="filter"
                style={{
                  padding: "10px",
                  borderRadius: "6px",
                  width: "100%",
                  borderColor: ttColors.gray,
                  outline: "none",
                }}
              >
                <option value="option">All Option</option>
              </select>
            </Flex>
            <Flex
              direction="column"
              gap=".5rem"
              styles={{ marginBottom: "1.2rem" }}
            >
              <Text type="label" size={16} text="Payment" weight={400} />
              <select
                name="filter"
                style={{
                  padding: "10px",
                  borderRadius: "6px",
                  width: "100%",
                  borderColor: ttColors.gray,
                  outline: "none",
                }}
              >
                <option value="option">All Option</option>
              </select>
            </Flex>
          </Grid>
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
