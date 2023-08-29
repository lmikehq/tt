import { Divider } from "@atom/divider";
import Flex from "@atom/flex";
import BulletList from "@atom/list";
import Text from "@atom/text";
import TravelArrow from "@atom/travelArrow";
import Section from "@molecule/section";
import { ListItem } from "@mui/material";
import { useScreenResolution } from "hook/useScreenResolution";
import { VisaApplicationFormInterface } from "types";

interface VisaApplicationFormDetailsProps {
  formData: VisaApplicationFormInterface;
}
const VisApplicationFormDetails = ({
  formData,
}: VisaApplicationFormDetailsProps) => {
  const { isMobile } = useScreenResolution();
  return (
    <Section height="unset">
      <Flex
        align="center"
        justify="space-between"
        // direction={isMobile ? "column" : "row"}
        gap={isMobile ? "1.5rem" : "0rem"}
      >
        <Section width="30%" height="unset">
          <Text type="p" text={formData.homeCountry} size={24} weight={500} />
        </Section>
        <Section width="30%" height="unset">
          <TravelArrow />
        </Section>
        <Section width="30%" height="unset">
          <Text
            type="p"
            textAlign="right"
            text={formData.destination}
            size={24}
            weight={500}
          />
        </Section>
      </Flex>
      <Divider margin={"1.5rem 0"} />

      <Flex gap="2rem">
        <Flex direction="column">
          <Text
            text="Application Fee"
            type="h3"
            size={isMobile ? 18 : 20}
            weight={500}
            // whiteSpace="nowrap"
            margin="0 0 .7rem 0"
          />
          <Text
            type="p"
            size={isMobile ? 16 : 18}
            weight={400}
            text="Non-Refundable"
            whiteSpace="nowrap"
          />
        </Flex>
        <Flex direction="column">
          <Text
            text="Validity"
            type="h3"
            size={isMobile ? 18 : 20}
            weight={500}
            // whiteSpace="nowrap"
            margin="0 0 .7rem 0"
          />
          <Text
            type="p"
            size={isMobile ? 16 : 18}
            weight={400}
            text="Passport dependent"
            whiteSpace="nowrap"
          />
        </Flex>
      </Flex>
      <Section padding="2.5rem 0">
        <Text
          type="h3"
          text="Required Documents"
          weight={500}
          size={isMobile ? 18 : 20}
        />
        <BulletList>
          <ListItem>
            <Text
              type="p"
              size={isMobile ? 16 : 18}
              weight={400}
              text="Passport sized photograph"
            />
          </ListItem>
          <ListItem>
            <Text
              type="p"
              size={isMobile ? 16 : 18}
              weight={400}
              text="Valid international passport"
            />
          </ListItem>
          <ListItem>
            <Text
              type="p"
              size={isMobile ? 16 : 18}
              weight={400}
              text="All academic certificates"
            />
          </ListItem>
          <ListItem>
            <Text
              type="p"
              size={isMobile ? 16 : 18}
              weight={400}
              text="Proof of address (utility bill)"
            />
          </ListItem>
          <ListItem>
            <Text
              type="p"
              text="Marriage certificate (if applicable)"
              size={isMobile ? 16 : 18}
              weight={400}
            />
          </ListItem>
        </BulletList>
      </Section>
    </Section>
  );
};

export default VisApplicationFormDetails;
