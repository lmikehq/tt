import Section from "@molecule/section";
import {
  FieldArray,
  Formik,
  FormikProps,
  FormikProvider,
  FormikValues,
  useFormik,
} from "formik";
import FormStepTitle from "./formStepsTitle";
import { useScreenResolution } from "hook/useScreenResolution";
import Flex from "@atom/flex";
import { ttColors } from "theme/colors";
import EmploymentForm from "@molecule/forms/employmentForm";
import { RiDeleteBin6Line } from "react-icons/ri";
import Text from "@atom/text";
import AddButton from "@atom/addButton";
import {
  employmentKeys,
  employmentsArr,
  manyEmploymentSchema,
} from "@lib/application/schema";
import { SingleFormType } from "../applicationForm";
import ContinueButton from "@atom/continueButton";
import { EmploymentDetailsInterface } from "types";

interface formProps {
  steps: string[];
  index: number;
  isLoading: boolean;
  formik: FormikProps<{ employment: EmploymentDetailsInterface[] }>;
}

function EmploymentInfo({ steps, index, isLoading, formik }: formProps) {
  return (
    <FormikProvider value={formik}>
      <Section>
        <form onSubmit={formik.handleSubmit}>
          <FieldArray
            name="employment"
            render={(arrayHelpers) => (
              <div>
                <Flex justify="space-between" padding="0 0 2rem 0">
                  <FormStepTitle steps={steps} index={index} />
                  <AddButton
                    disabled={formik.values.employment.length === 3}
                    onClick={() => {
                      if (formik.values.employment.length < 3) {
                        arrayHelpers.insert(index + 1, employmentKeys);
                      }
                    }}
                  />
                </Flex>
                {formik.values.employment.map((_, index) => (
                  <div key={index}>
                    <EmploymentForm formik={formik} count={index} />
                    {formik.values.employment.length > 1 && (
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
                          text="Delete Experience"
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

export default EmploymentInfo;
