import AddButton from "src/components/atoms/addButton";
import ContinueButton from "src/components/atoms/continueButton";
import Flex from "src/components/atoms/flex";
import Text from "src/components/atoms/text";
import { familyInforKeys } from "src/lib/application/schema";
import FamilyForm from "src/components/molecules/forms/familyForm";
import Section from "src/components/molecules/section";
import { FieldArray, FormikProps, FormikProvider } from "formik";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ttColors } from "theme/colors";
import { FamilyInfoInterface } from "types";
import { toast } from "react-hot-toast";
import FormStepTitle from "./formStepsTitle";

interface formProps {
  steps: string[];
  index: number;
  isLoading: boolean;
  formik: FormikProps<{ familyMembers: FamilyInfoInterface[] }>;
  saveProgressAndContinueLater: () => void;
}

function FamilyInfo({
  steps,
  index,
  isLoading,
  formik,
  saveProgressAndContinueLater,
}: formProps) {
  return (
    <FormikProvider value={formik}>
      <Section>
        <form onSubmit={formik.handleSubmit}>
          <FieldArray
            name="familyMembers"
            render={(arrayHelpers) => (
              <div>
                <Flex justify="space-between" padding="0 0 2rem 0">
                  <FormStepTitle steps={steps} index={index} />
                  <AddButton
                    disabled={formik.values.familyMembers.length === 3}
                    onClick={() => {
                      if (!formik.isValid || !formik.dirty)
                        return toast.error("Please validate all inputs");
                      if (formik.values.familyMembers.length < 3) {
                        arrayHelpers.insert(index + 1, familyInforKeys);
                      }
                    }}
                  />
                </Flex>
                {formik.values.familyMembers.map((family, index) => (
                  <div key={index}>
                    <FamilyForm formik={formik} values={family} count={index} />
                    {formik.values.familyMembers.length > 1 && (
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
                          text="Delete"
                          color={ttColors.red}
                          weight="500"
                        />
                      </Flex>
                    )}
                  </div>
                ))}
              </div>
            )}
          />
          <ContinueButton
            isLoading={isLoading}
            onClick={() => {}}
            disabled={!formik.isValid || !formik.dirty}
            saveProgressAndContinueLater={saveProgressAndContinueLater}
          />
        </form>
      </Section>
    </FormikProvider>
  );
}

export default FamilyInfo;
