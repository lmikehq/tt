import Flex from "@/components/templates/flex";
import ReusableModal from "./dashboardModal";
import Text from "@/components/atoms/text";
import Input from "@/components/atoms/input";

interface Props {
  open: boolean;
  setState: React.Dispatch<React.SetStateAction<{ open: boolean, type: string; }>>;
}

const SetVisaAccompanyModal = ({ open, setState }: Props) => {
  const handleClose = () => {
    setState((prev) => {
      return {
        ...prev,
        open: false,
        type: "set-visa-accompany-modal"
      };
    });
  };
  return (
    <ReusableModal
      onClose={handleClose}
      open={open}
      headerText="Add Accompanies"
      description="Enter Details of People you want to travel with."
    >
      <Flex margin="20px 0 5px" direction="column">
        <Text type="p" text="Number of Descendants" />
        <Input type="number" />
      </Flex>
    </ReusableModal>
  );
};

export default SetVisaAccompanyModal;
