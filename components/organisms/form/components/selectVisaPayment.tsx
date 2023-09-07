import Text from "@atom/text";
import VisaApplicationTypeTile from "@molecule/payment/VisaApplicationTypeTile";
import Section from "@molecule/section";
import { useScreenResolution } from "hook/useScreenResolution";
import { SingleFormType } from "../applicationForm";
import Spinner from "@components/icons/spinner";
import Flex from "@atom/flex";
import Button from "@atom/button";
import { ttColors } from "theme/colors";

interface SelectVisaPaymentProps {
  nextStep: ({ form }: { form: SingleFormType }) => void;
  isLoading: boolean;
}
const SelectVisaPayment = ({ nextStep, isLoading }: SelectVisaPaymentProps) => {
  const { isMobile } = useScreenResolution();

  return (
    <Section height="unset">
      <Section margin="0 0 3.5rem 0">
        <Text
          text={"Select Visa Payment"}
          type={"h3"}
          weight={600}
          size={24}
          margin={""}
        />
      </Section>
      <Section className="">
        <VisaApplicationTypeTile
          title={"Family Visa"}
          subTitle={"Maximum of 6 persons"}
          fee="# 500"
        />
      </Section>
      <Section
        height="unset"
        styles={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
      >
        <Button width="100%" height={"3.5rem"} type="submit" onClick={nextStep}>
          <Flex align="center" width="100%" height="100%" justify="center">
            {isLoading ? (
              <Spinner size="40px" fill={ttColors.primary} />
            ) : (
              <Text
                type="span"
                text={"Save & Continue"}
                weight={600}
                size={20}
                color={ttColors.light}
              />
            )}
          </Flex>
        </Button>
      </Section>
    </Section>
  );
};

export default SelectVisaPayment;
