import Section from "src/components/molecules/section";
import { FieldArray, FormikProps, FormikProvider, useFormik } from "formik";
import FormStepTitle from "./formStepsTitle";
import Flex from "src/components/atoms/flex";
import { ttColors } from "theme/colors";
import EducationForm from "src/components/molecules/forms/educationForm";
import { RiDeleteBin6Line } from "react-icons/ri";
import Text from "src/components/atoms/text";
import AddButton from "src/components/atoms/addButton";
import {
  educationKeys,
  educationsArr,
  manyEducationSchema,
} from "src/lib/application/schema";
import { SingleFormType } from "../applicationForm";
import ContinueButton from "src/components/atoms/continueButton";
import { EducationDetailsInterface } from "types";
import { toast } from "react-hot-toast";

interface formProps {
  steps: string[];
  index: number;
  isLoading: boolean;
  formik: FormikProps<{ education: EducationDetailsInterface[] }>;
  saveProgressAndContinueLater: () => void;
}

function EducationInfo({
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
            name="education"
            render={(arrayHelpers) => (
              <div>
                <Flex justify="space-between" padding="0 0 2rem 0">
                  <FormStepTitle steps={steps} index={index} />
                  <AddButton
                    disabled={formik.values.education.length === 3}
                    onClick={() => {
                      if (!formik.isValid || !formik.dirty)
                        return toast.error("Please validate all inputs");
                      if (formik.values.education.length < 3) {
                        arrayHelpers.insert(index + 1, educationKeys);
                      }
                    }}
                  />
                </Flex>
                {formik.values.education.map((education, index) => (
                  <div key={index}>
                    <EducationForm
                      formik={formik}
                      values={education}
                      count={index}
                    />
                    {formik.values.education.length > 1 && (
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
            onClick={() => {}}
            disabled={!formik.isValid || !formik.dirty}
            saveProgressAndContinueLater={saveProgressAndContinueLater}
          />
        </form>
      </Section>
    </FormikProvider>
  );
}

export default EducationInfo;
