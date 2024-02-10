import { Box, Dialog } from "@mui/material";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import Flex from "@/components/templates/flex";
import { IoMdClose } from "react-icons/io";
import { ttColors } from "@/lib/theme/colors";
import Text from "@/components/atoms/text";
import { FieldArray, FormikProps, FormikProvider } from "formik";
import Button from "@/components/atoms/button";
import { accompanyVal } from "@/lib/types/schema";
import AccompanyComponent from "./visa/accompany";

import { IAccompany } from "@/lib/types";
import ReusableModal from "./dashboardModal";
import CustomizedAccordions from "../../faq/components/customizedAccordion";
import AddButton from "../../addButton";
import toast from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";

interface Props {
  open: boolean;
  setState: React.Dispatch<React.SetStateAction<{ open: boolean, type: string; }>>;
  steps: string[],
  index: number;
  persistForm: () => void;
  formik: FormikProps<{ dependants: IAccompany[]; }>;
}


export const AddVisaAccompanyModal = ({ open, index, setState, formik }: Props) => {
  const { isMobile } = useScreenResolution();

  const handleClose = () => {
    setState((prev) => {
      return {
        ...prev,
        open: false,
        type: 'add-accompany'
      };
    });
  };

  return (
    <ReusableModal
      headerText="Add Accompanies"
      description="Enter details of people you want to travel with."
      open={open}
      onClose={() => {
        handleClose();
      }}
      maxWidth="827px"
      maxHeight="500px"
      // height="500px"
      width={isMobile ? "90%" : "827px"}
      showButton={false}
    >
      <FormikProvider value={formik}>
        <Box>
          <form onSubmit={formik?.handleSubmit}>
            <FieldArray
              name="dependants"
              render={(arrayHelpers) => {
                return (
                  <div>
                    <CustomizedAccordions
                      items={formik.values.dependants.map((dependant, index) => ({
                        flexDirection: "row",
                        header: `Dependant ${index + 1}`,
                        border: 'none',
                        headerFontWeight: 600,
                        backgroundColor: "transparent",
                        detailsBorderTop: "none",
                        detailsPadding: 0,
                        headerLeftMargin: 0,
                        headerPadding: "0",
                        description: (
                          <AccompanyComponent
                            formik={formik}
                            values={dependant}
                            count={index + 1}
                            length={formik.values.dependants.length}
                            step={index}
                          />
                        )
                      }))}
                    />
                    <Flex align="center" justify="space-between">
                      <Flex justify="space-between">
                        {/* <FormStepTitle steps={steps} index={index} /> */}
                        <Button
                          width="max-content"
                          padding="0 10px"
                          background="transparent"
                          border={`1px solid ${ttColors.lightestGray}`}
                          disabled={formik.values.dependants.length === 5}
                          onClick={() => {
                            if (!formik.isValid || !formik.dirty) {
                              return toast.error("Please validate all inputs");
                            }
                            if (formik.values.dependants.length < 5) {
                              arrayHelpers.insert(index + 1, accompanyVal);
                            }
                          }}
                        >
                          <Flex align="center" gap="10px">
                            <Text type="p" text="Add Dependant" color={ttColors.dark} weight={500} />
                            <AddButton
                              onClick={() => ''}
                              disabled={false}
                            />
                          </Flex>
                        </Button>
                      </Flex>

                      {formik.values.dependants.length > 1 && (
                        <Flex
                          justify="flex-end"
                          gap="0.25rem"
                          align="center"
                          onClick={() => arrayHelpers.remove(index)}
                          cursor="pointer"
                        >
                          <RiDeleteBin6Line color={ttColors.red} size={25} />
                          <Text
                            type="p"
                            text="Delete Dependant"
                            color={ttColors.red}
                            weight="500"
                            size={15}
                          />
                        </Flex>
                      )}
                    </Flex>
                  </div>
                );
              }} />
            {/* render the button to submit */}
            <Button
              background={ttColors.blackishBlue}
              width="100%"
              type="submit"
              margin="40px 0 0"
            >
              <Text type="p" text="Continue" weight={500} />
            </Button>
            {/* render the form here */}
          </form>
        </Box>
      </FormikProvider>
    </ReusableModal >
  );
};
