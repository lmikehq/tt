import Text from "@atom/text";
import Div from "@molecule/div";
import PaymentSummaryPane from "@molecule/payment/PaymentSummaryPane";
import VisaApplicationTypeTile from "@molecule/payment/VisaApplicationTypeTile";
import Section from "@molecule/section";
import { useScreenResolution } from "hook/useScreenResolution";

const SelectVisaPayment = () => {
  const { isMobile } = useScreenResolution();

  return (
    <Section width={isMobile ? "100%" : "50%"}>
      <Div margin="0 0 3.5rem 0">
        <Text
          text={"Select Visa Payment"}
          type={"h3"}
          weight={600}
          size={24}
          margin={""}
        />
      </Div>
      <Div className="">
        <VisaApplicationTypeTile
          title={"Family Visa"}
          subTitle={"Maximum of 5 persons"}
          fee="# 500"
        />
      </Div>
    </Section>
  );
};

export default SelectVisaPayment;
