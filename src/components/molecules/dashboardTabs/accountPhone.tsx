import React, { useState } from "react"; // Import your modal component
import Text from "@atom/text"; // Import other necessary components
import Section from "src/components/molecules/section";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import ReusableModal from "./components/dashboardModal";
import Flex from "@components/templates/flex";
import Required from "@atom/required";
import PhoneInput from "react-phone-input-2";

type PhoneModalProps = {
  open: boolean; // Change this type to match your actual type
  onClose: () => void;
};

const PhoneModal: React.FC<PhoneModalProps> = ({ open, onClose }) => {
  const { isMobile } = useScreenResolution();

  return (
    <ReusableModal
      open={open}
      onClose={onClose}
      headerText="Edit Your Phone Number"
      description="Stay connected always: Update your phone number"
    >
      {/* Additional content goes here */}
      <Section styles={{ margin: "0px 0px 2.5rem" }}>
        <Flex align="center" gap="0.25rem">
          <Text
            type="p"
            text="Phone Number"
            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
          />
          <Required />
        </Flex>
        <PhoneInput
          country={"ng"}
          autoFormat={true}
          inputProps={{
            name: "phoneNumber",
          }}
          inputClass="w"
          placeholder="Enter phone number"
        />
      </Section>
    </ReusableModal>
  );
};

export default PhoneModal;
