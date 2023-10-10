import Text from "@/components/atoms/text";
import Section from "@/components/molecules/section";
import Flex from "@/components/templates/flex";
import { BiArrowToRight, BiRightArrow, BiRightArrowAlt } from "react-icons/bi";

const SeatSelectionMenu = () => {
  return (
    <Section>
      <Section>
        <Flex justify="space-between" align="center">
          <Section>
            <Text
              size={16}
              weight={500}
              type="h1"
              text="Lagos, Murtala Mohammed Airport (LOS)"
            />
          </Section>
          <Section width="fit-content" padding={"1.5rem"}>
            <BiRightArrowAlt size={24} />
          </Section>
          <Section>
            <Text
              size={16}
              weight={500}
              type="h1"
              text="Lagos, Murtala Mohammed Airport (LOS)"
            />
          </Section>
        </Flex>
      </Section>
      <Section margin="20px 0 48px 0">
        <Text
          type="p"
          text="Saturday, 26 August 2023"
          color="#606060"
          weight={400}
        />
      </Section>
      <Section>
        <Flex align="center" gap="19px">
          <Section
            height="48px"
            width="48px"
            styles={{
              backgroundColor: "#8E4400",
              flex: "none",
              borderRadius: "6px",
            }}
          >
            <></>
          </Section>
          <Flex justify="space-between" align="center" styles={{ flexGrow: 1 }}>
            <Section>
              <Text
                type="p"
                color="#101010"
                size={16}
                weight={400}
                text="Economy comfort"
              />
              <Text
                type="p"
                color="#101010"
                size={16}
                weight={400}
                text="From USD 80.00"
              />
            </Section>
            <Text
              type="p"
              size={16}
              weight={400}
              text="34 seats left"
              color="#6092A7"
            />
          </Flex>
        </Flex>
      </Section>
    </Section>
  );
};

export default SeatSelectionMenu;
