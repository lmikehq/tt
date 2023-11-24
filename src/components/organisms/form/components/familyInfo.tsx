import AddButton from "@molecule/addButton";
import ContinueButton from "@organism/continueButton";
import Flex from "@components/templates/flex";
import Text from "@atom/text";
import { familyInfoSchema, familyInforKeys } from "@lib/types/schema";
import FamilyForm from "src/components/molecules/forms/familyForm";
import Section from "src/components/molecules/section";
import { FieldArray, FormikProps, FormikProvider, useFormik } from "formik";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ttColors } from "@lib/theme/colors";
import { FamilyInfoInterface, Mode } from "@lib/types";
import { toast } from "react-hot-toast";
import FormStepTitle from "./formStepsTitle";
import { useApplicationFormStore } from "@lib/store/application-form.store";
import { useRouter } from "next/navigation";
import ToastError from "@molecule/toastError";

interface formProps {
  steps: string[];
  index: number;
  persistForm: () => void;
  formik: FormikProps<{ familyMembers: FamilyInfoInterface[] }>;
}

function FamilyInfo({ steps, index, persistForm, formik }: formProps) {
  const { mode } = useApplicationFormStore((state) => state);
    const isLoading = mode == Mode.loading;
    
    console.log(formik.values.familyMembers)

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
                </Flex>
                {formik.values.familyMembers.map((family, index, arr) => (
                  <div key={index}>
                    <FamilyForm formik={formik} values={family} count={index} arrayHelpers={arrayHelpers} isFirst={family?.index === 0} />
                    {arr.filter(e => e.section === family.section).length > 1 && (
                        <Flex
                            justify="flex-end"
                            gap="0.25rem"
                            align="center"
                            onClick={() => arrayHelpers.remove(index)}
                            cursor="pointer"
                            margin="0"
                        >
                            <RiDeleteBin6Line color={ttColors.red} size={25} />
                            <Text
                                type="p"
                                text="Delete Family Member"
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
            onClick={() => {
              if (!formik.isValid) return ToastError();
            }}
            disabled={!formik.isValid}
            saveProgressAndContinueLater={persistForm}
          />
        </form>
      </Section>
    </FormikProvider>
  );
}

export default FamilyInfo;
