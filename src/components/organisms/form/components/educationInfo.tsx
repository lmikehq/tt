import Section from "src/components/molecules/section";
import { FieldArray, FormikProps, FormikProvider, useFormik } from "formik";
import FormStepTitle from "./formStepsTitle";
import Flex from "@components/templates/flex";
import { ttColors } from "@lib/theme/colors";
import EducationForm from "src/components/molecules/forms/educationForm";
import { RiDeleteBin6Line } from "react-icons/ri";
import Text from "@atom/text";
import AddButton from "@molecule/addButton";
import {
  educationKeys,
  educationsArr,
  manyEducationSchema,
} from "@lib/types/schema";
import ContinueButton from "@organism/continueButton";
import { EducationDetailsInterface, Mode } from "@lib/types";
import { toast } from "react-hot-toast";
import { useApplicationFormStore } from "@lib/store/application-form.store";
import ToastError from "@molecule/toastError";

interface formProps {
  steps: string[];
  index: number;
  persistForm: () => void;
  formik: FormikProps<{ education: EducationDetailsInterface[] }>;
}

function EducationInfo({ steps, index, persistForm, formik }: formProps) {
  const { mode } = useApplicationFormStore((state) => state);

  const isLoading = mode == Mode.loading;

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
                          text="Delete Education"
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

export default EducationInfo;
