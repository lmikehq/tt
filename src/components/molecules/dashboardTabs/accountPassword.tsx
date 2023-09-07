import React, { useState } from "react"; // Import your modal component
import Text from "@atom/text"; // Import other necessary components
import Section from "src/components/molecules/section";
import { useScreenResolution } from "@lib/hook/useScreenResolution";
import ReusableModal from "./components/dashboardModal";
import Input from "@atom/input";
import Flex from "@components/templates/flex";
import Required from "@atom/required";

type PasswordModalProps = {
  open: boolean; // Change this type to match your actual type
  onClose: () => void;
};

const PasswordModal: React.FC<PasswordModalProps> = ({ open, onClose }) => {
  const { isMobile } = useScreenResolution();

  return (
    <ReusableModal
      open={open}
      onClose={onClose}
      headerText="Edit Your Password"
      description="Secure your account: Change your password"
    >
      {/* Additional content goes here */}
      <Section>
        <Flex align="center" gap="0.5rem">
          <Text
            type="p"
            text="Enter Current Password"
            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
          />
          <Required />
        </Flex>
        <Input placeholder="******" height="3rem" type="password" />
      </Section>

      <Section>
        <Flex align="center" gap="0.5rem">
          <Text
            type="p"
            text="Enter New Password"
            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
          />
          <Required />
        </Flex>
        <Input placeholder="******" height="3rem" type="password" />
      </Section>

      <Section>
        <Flex align="center" gap="0.5rem">
          <Text
            type="p"
            text="Confirm New Password"
            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
          />
          <Required />
        </Flex>
        <Input
          placeholder="******"
          height="3rem"
          type="password"
          margin="0px 0px 2.5rem"
        />
      </Section>
    </ReusableModal>
  );
};

export default PasswordModal;
