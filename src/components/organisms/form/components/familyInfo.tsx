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
                    disabled={formik.values.familyMembers.length === 6}
                    onClick={() => {
                      if (!formik.isValid || !formik.dirty)
                        return toast.error("Please fill this form first");
                      if (formik.values.familyMembers.length < 6) {
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
            onClick={() => {
              if (!formik.isValid || !formik.dirty)
                return ToastError()
            }}
            disabled={!formik.isValid}
          />
        </form>
      </Section>
    </FormikProvider>
  );
}

export default FamilyInfo;
