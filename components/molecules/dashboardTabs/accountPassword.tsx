import React, { useState } from "react"; // Import your modal component
import Text from "@atom/text"; // Import other necessary components
import Section from "@molecule/section";
import { useScreenResolution } from "hook/useScreenResolution";
import ReusableModal from "./components/dashboardModal";
import Input from "@atom/input";

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
      headerText="Upload Document"
      description="Secure your account: Change your password"
    >
      {/* Additional content goes here */}
      <Section>
        <Text
          type="p"
          text="Enter Current Password"
          margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
        />
        <Input placeholder="******" height="3rem" type="password" />
      </Section>
      <Section>
        <Text
          type="p"
          text="Enter New Password"
          margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
        />
        <Input placeholder="******" height="3rem" type="password" />
      </Section>
      <Section margin="1rem 0px 1.5rem">
        <Text
          type="p"
          text="Confirm New Password"
          margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
        />
        <Input placeholder="******" height="3rem" type="password" />
      </Section>
    </ReusableModal>
  );
};

export default PasswordModal;
