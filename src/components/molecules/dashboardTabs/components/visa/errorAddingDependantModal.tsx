import Box from "@/components/molecules/section/box";
import ReusableModal from "../dashboardModal";
import Text from "@/components/atoms/text";
import { useRouter } from "next/navigation";

interface Props {
  open: boolean;
  onClose: () => void;
}
const ErrorAddingDependant = ({ open, onClose }: Props) => {
  const router = useRouter();

  return (
    <ReusableModal
      open={open}
      onClose={onClose}
      headerText="Unable to Add Dependent"
      description=""
      maxWidth="600px"
      width="600px"
      buttonProps={{
        text: "Try Again",
        onClick: () => {
          onClose();
          router.push('/dashboard');
        }
      }}
    >
      <Box>
        <Text type="p" text="It seems there was an issue with the submission. Please review your information and try again. If the problem persists, feel free to contact our support team for assistance. We apologize for any inconvenience." />
      </Box>
    </ReusableModal >
  );
};

export default ErrorAddingDependant;