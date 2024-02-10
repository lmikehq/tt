import Flex from "@/components/templates/flex";
import ReusableModal from "./components/dashboardModal";
import Section from "../section";
import Text from "@/components/atoms/text";
import currencyFormatter from "@/lib/extensions/data/currencyFormatter";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { FieldString } from "@/components/organisms/fieldInput";
import { useFormik } from "formik";
import { useState } from "react";
import { BsExclamationCircleFill } from "react-icons/bs";
import toast from "react-hot-toast";

interface Props {
  headerText?: string;
  description?: string;
  onClose: () => void;
  open: boolean;
  price: number;
  koraLink: string;
  reference: string;
}

const AccompanyPaymentModal = ({ headerText, description, onClose, open, price, koraLink, reference }: Props) => {
  const { isMobile } = useScreenResolution();
  const [currency, setCurrency] = useState("NGN - Nigerian Naira");
  const [loading, setLoading] = useState(false);

  const handleDependantsPayment = async () => {
    setLoading(true);
    try {
      // setLoading(false);
      const koraPay = window.open(koraLink, "_self");
      // const koraPay = window.open(koraLink, 'KorapayWindow', 'width=400,height=400');
      console.log(koraPay);
    } catch (err) {
      setLoading(false);
      toast.error('Error Initializing payment');
    }
  };

  const formik = useFormik({
    initialValues: { amount: 0 },
    onSubmit: () => { },
  });

  return (
    <ReusableModal
      headerText={headerText ?? "Make Payment"}
      description={description ?? "Kindly make payment for required Visa Application Process"}
      onClose={onClose}
      open={open}
      buttonProps={{
        text: "Continue",
        onClick: () => {
          handleDependantsPayment();
        }
      }}
      loading={loading}
    >
      <Section margin="2rem 0">
        <Section margin="1.75rem 0px 1.1rem">
          <Flex align="center" gap="0rem" justify="center">
            <Text
              type="h1"
              size={38}
              weight={600}
              text={currencyFormatter(price)}
            />
          </Flex>
          <Text
            type="p"
            margin={0}
            size={16}
            weight={400}
            color="#929292"
            textAlign="center"
            text={"Visa application Dependent Payment"}
          />
        </Section>

        <Flex align="center" gap="0.25rem">
          <Text
            type="p"
            text="Select Currency"
            margin={
              isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"
            }
          />
        </Flex>
        {/* <SearchStringInput
              options={["NGN - Nigerian Naira"]}
              onChange={(e) => 
              placeholder={""}
              value={currency}
            /> */}
        <FieldString
          name="currency"
          formik={formik}
          value={currency}
          placeholder="NGN - Nigerian Naira"
          options={["NGN - Nigerian Naira"]}
          onChange={(e) => setCurrency(e)}
        />

        {!isMobile && (
          <Section margin="-10px 0px 24px">
            <Flex
              align="center"
              justify="flex-start"
              gap="10px"
            >
              <BsExclamationCircleFill
                color="#6092A7"
                size="2.5rem"
                style={{
                  position: "relative",
                  top: "-10px",
                }}
              />
              <Text
                type="p"
                text="Only the Nigerian currency naira (Naira) is active for now. Other currencies will be made available soon."
                styles={{ textAlign: "left" }}
              />
            </Flex>
          </Section>
        )}
      </Section>

    </ReusableModal>
  );
};

export default AccompanyPaymentModal;