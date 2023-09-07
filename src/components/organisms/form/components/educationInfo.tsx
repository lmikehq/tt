import Section from "src/components/molecules/section";
import { FieldArray, FormikProps, FormikProvider, useFormik } from "formik";
import FormStepTitle from "./formStepsTitle";
import Flex from "@components/templates/flex";
import { ttColors } from "theme/colors";
import EducationForm from "src/components/molecules/forms/educationForm";
import { RiDeleteBin6Line } from "react-icons/ri";
import Text from "@atom/text";
import AddButton from "@molecule/addButton";
import { educationKeys } from "src/lib/application/schema";
import ContinueButton from "@organism/continueButton";
import { EducationDetailsInterface } from "types";
import { toast } from "react-hot-toast";
import { createRef, useEffect, useRef } from "react";

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
  const educationFormRefs = useRef(
    formik.values.education.map(() => createRef<HTMLDivElement>())
  );

  useEffect(() => {
    educationFormRefs.current = formik.values.education.map(() =>
      createRef<HTMLDivElement>()
    );
  }, [formik.values.education]);

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
                  <div key={index} ref={educationFormRefs.current[index]}>
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
                        onClick={() => {
                          arrayHelpers.remove(index);
                          const element =
                            educationFormRefs.current[index - 1].current;
                          if (element) {
                            element.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
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
