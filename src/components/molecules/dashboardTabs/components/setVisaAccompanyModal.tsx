import Flex from "@/components/templates/flex";
import ReusableModal from "./dashboardModal";
import Text from "@/components/atoms/text";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { ttColors } from "@/lib/theme/colors";
import { FaInfoCircle } from "react-icons/fa";
import Button from "@/components/atoms/button";
import { FieldString } from "@/components/organisms/fieldInput";
import { useFormik } from "formik";
import { setDependantsSchema, setDependantsVal } from "@/lib/types/schema";
import { accompanyStore } from "@/lib/store/dashboard/accompany.store";

interface Props {
  open: boolean;
  setState: React.Dispatch<React.SetStateAction<{ open: boolean, type: string; }>>;
  onClose?: () => void;
}

const SetVisaAccompanyModal = ({ open, setState, onClose }: Props) => {
  const { setNumberOfDependants } = accompanyStore((state) => state);
  const { isMobile } = useScreenResolution();
  const handleClose = () => {
    setState((prev) => {
      return {
        ...prev,
        open: false,
        type: "set-visa-accompany-modal"
      };
    });
  };

  const formik = useFormik({
    initialValues: setDependantsVal,
    validationSchema: setDependantsSchema,
    onSubmit(values, _formikHelpers) {
      // ADD THE NUMBER OF DEPENDANTS TO GLOBAL STATE 
      setNumberOfDependants(values.numberOfDependants);
      handleClose();
      setState((prev) => {
        return {
          ...prev,
          open: true,
          type: "add-accompany"
        };
      });
      formik.resetForm();
    },
  });
  return (
    <ReusableModal
      onClose={handleClose}
      open={open}
      headerText="Add Accompanies"
      description="Enter Details of People you want to travel with."
      descriptionColor={ttColors.lighterGray}
      width={isMobile ? "90%" : ""}
      maxWidth={isMobile ? "90%" : ""}
      showButton={false}
    >
      <Flex direction="column">
        <Flex margin="20px 0 15px" gap="2px" direction="column">
          <Text type="p" text="Number of Dependants" margin={0} />
          <FieldString name="numberOfDependants" placeholder="Select number of dependants" formik={formik} options={[1, 2, 3, 4, 5]} />
        </Flex>
        <Flex direction="row" gap="10px" align="flex-start">
          <FaInfoCircle color={ttColors.primaryLight} size={32} />
          <p style={{ margin: 0 }}>
            Please note that the sum of <span style={{ fontWeight: 600 }}> 500,000 Naira</span>    is assigned to each dependent that is added to your Visa Application.
          </p>
        </Flex>

        <Button onClick={formik.handleSubmit} background={ttColors.dark} width="100%" margin="40px 0 0">
          <Text type="p" text="Proceed" weight={500} />
        </Button>

      </Flex>
    </ReusableModal>
  );
};

export default SetVisaAccompanyModal;
