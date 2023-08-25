import Section from "@molecule/section";
import { FieldArray, FormikProvider, useFormik } from "formik";
import FormStepTitle from "./formStepsTitle";
import Flex from "@atom/flex";
import { ttColors } from "theme/colors";
import { RiDeleteBin6Line } from "react-icons/ri";
import Text from "@atom/text";
import AddButton from "@atom/addButton";
import {
  familyInfoArr,
  familyInfoSchema,
  familyInforKeys,
} from "@lib/application/schema";
import { SingleFormType } from "../applicationForm";
import FamilyForm from "@molecule/forms/familyForm";
import ContinueButton from "@atom/continueButton";

interface formProps {
  steps: string[];
  index: number;
  nextStep: ({ form }: { form: SingleFormType }) => void;
  isLoading: boolean;
}

function FamilyInfo({ steps, index, nextStep, isLoading }: formProps) {
  const formik = useFormik({
    initialValues: familyInfoArr,
    validationSchema: familyInfoSchema,
    onSubmit: (values) => {
      nextStep({ form: values });
    },
    validateOnChange: true,
  });
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
                      if (formik.values.familyMembers.length < 3) {
                        arrayHelpers.insert(index + 1, familyInforKeys);
                      }
                    }}
                  />
                </Flex>
                {formik.values.familyMembers.map((family, index) => (
                  <div key={index}>
                    <FamilyForm formik={formik} family={family} count={index} />
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
              console.log(formik);
            }}
            disabled={!formik.isValid}
          />
        </form>
      </Section>
    </FormikProvider>
  );
}

export default FamilyInfo;
