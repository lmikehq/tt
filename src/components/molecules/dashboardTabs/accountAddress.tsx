import Text from "src/components/atoms/text";
import Section from "src/components/molecules/section";
import { useScreenResolution } from "hook/useScreenResolution";
import ReusableModal from "./components/dashboardModal";
import Input from "src/components/atoms/input";
import Flex from "src/components/atoms/flex";
import Required from "src/components/atoms/required";

type AddressModalProps = {
  open: boolean;
  onClose: () => void;
};

const AddressModal: React.FC<AddressModalProps> = ({ open, onClose }) => {
  const { isMobile } = useScreenResolution();

  return (
    <ReusableModal
      open={open}
      onClose={onClose}
      headerText="Edit Your Address"
      description="Keep us informed: Edit your address"
    >
      {/* Additional content goes here */}
      <Section>
        <Flex align="center" gap="0.5rem">
          <Text
            type="p"
            text="Address"
            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
          />
          <Required />
        </Flex>
        <Input
          placeholder="St 32 main downtown, Los Angeles, California, USA"
          height="3rem"
          type="text"
          margin="0px 0px 2.5rem"
        />
      </Section>
    </ReusableModal>
  );
};

export default AddressModal;
