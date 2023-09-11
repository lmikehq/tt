import Button from "@atom/button";
import { Divider } from "@atom/divider";
import Flex from "@components/templates/flex";
import BulletList from "@components/templates/list";
import Text from "@atom/text";
import TravelArrow from "@molecule/travelArrow";
import Section from "src/components/molecules/section";
import { ListItem } from "@mui/material";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import { BiX } from "react-icons/bi";
import { VisaApplicationFormInterface } from "@lib/types";

interface VisaApplicationFormDetailsProps {
  formData: VisaApplicationFormInterface;
  onClose?: () => void;
}
const VisApplicationFormDetails = ({
  formData,
  onClose,
}: VisaApplicationFormDetailsProps) => {
  const { isMobile } = useScreenResolution();
  return (
    <Section height="unset">
      {isMobile && (
        <Flex justify="space-between" align="center" width="100%">
          <Text type="h5" text="Required documents" size={20} weight={600} />

          <Button
            onClick={onClose}
            background="transparent"
            styles={{ padding: 0, width: "fit-content", minWidth: "auto" }}
          >
            <BiX size={32} color="#929292" />
          </Button>
        </Flex>
      )}
      {!isMobile ? null : <Divider margin={"1.125rem 0"} />}

      <Flex
        align="center"
        justify="space-between"
        // direction={isMobile ? "column" : "row"}
        gap={isMobile ? "1.5rem" : "0rem"}
        margin={isMobile ? "0 0 2rem" : "0"}
      >
        <Section width="30%" height="unset">
          <Text
            type="p"
            text={formData.tripDetails.homeCountry}
            size={20}
            weight={500}
          />
        </Section>
        <Section width="30%" height="unset">
          <TravelArrow />
        </Section>
        <Section width="30%" height="unset">
          <Text
            type="p"
            textAlign="right"
            text={formData.tripDetails.destination}
            size={20}
            weight={500}
          />
        </Section>
      </Flex>
      {isMobile ? null : <Divider margin={"1.5rem 0"} />}

      <Flex gap="2rem">
        <Flex direction="column">
          <Text
            text="Application Fee"
            type="h3"
            size={isMobile ? 16 : 18}
            weight={500}
            // whiteSpace="nowrap"
            margin="0 0 .7rem 0"
          />
          <Text
            type="p"
            size={isMobile ? 14 : 18}
            weight={400}
            text="Non-Refundable"
            whiteSpace="nowrap"
          />
        </Flex>
        <Flex direction="column">
          <Text
            text="Validity"
            type="h3"
            size={isMobile ? 16 : 18}
            weight={500}
            // whiteSpace="nowrap"
            margin="0 0 .7rem 0"
          />
          <Text
            type="p"
            size={isMobile ? 14 : 18}
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
          size={isMobile ? 16 : 18}
        />
        <BulletList>
          <ListItem>
            <Text
              type="p"
              size={isMobile ? 14 : 16}
              weight={400}
              text="Passport sized photograph"
            />
          </ListItem>
          <ListItem>
            <Text
              type="p"
              size={isMobile ? 14 : 16}
              weight={400}
              text="Valid international passport"
            />
          </ListItem>
          <ListItem>
            <Text
              type="p"
              size={isMobile ? 14 : 16}
              weight={400}
              text="All academic certificates"
            />
          </ListItem>
          <ListItem>
            <Text
              type="p"
              size={isMobile ? 14 : 16}
              weight={400}
              text="Proof of address (utility bill)"
            />
          </ListItem>
          <ListItem>
            <Text
              type="p"
              text="Marriage certificate (if applicable)"
              size={isMobile ? 14 : 16}
              weight={400}
            />
          </ListItem>
        </BulletList>
      </Section>
    </Section>
  );
};

export default VisApplicationFormDetails;
