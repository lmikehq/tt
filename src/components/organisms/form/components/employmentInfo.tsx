import Section from "src/components/molecules/section";
import {
  FieldArray,
  FormikProps,
  FormikProvider,
} from "formik";
import FormStepTitle from "./formStepsTitle";
import { useScreenResolution } from "hook/useScreenResolution";
import Flex from "@components/templates/flex";
import { ttColors } from "theme/colors";
import EmploymentForm from "src/components/molecules/forms/employmentForm";
import { RiDeleteBin6Line } from "react-icons/ri";
import Text from "@atom/text";
import AddButton from "@molecule/addButton";
import { employmentKeys } from "src/lib/application/schema";
import ContinueButton from "@organism/continueButton";
import { EmploymentDetailsInterface } from "types";
import { toast } from "react-hot-toast";
import { createRef, useEffect, useRef } from "react";

interface formProps {
  steps: string[];
  index: number;
  isLoading: boolean;
  formik: FormikProps<{ employment: EmploymentDetailsInterface[] }>;
  saveProgressAndContinueLater: () => void;
}

function EmploymentInfo({
  steps,
  index,
  isLoading,
  formik,
  saveProgressAndContinueLater,
}: formProps) {
  const employmentFormRefs = useRef(
    formik.values.employment.map(() => createRef<HTMLDivElement>())
  );

  useEffect(() => {
    employmentFormRefs.current = formik.values.employment.map(() =>
      createRef<HTMLDivElement>()
    );
  }, [formik.values.employment]);

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
                      if (!formik.isValid || !formik.dirty)
                        return toast.error("Please validate all inputs");
                      if (formik.values.employment.length < 3) {
                        arrayHelpers.insert(index + 1, employmentKeys);
                      }
                    }}
                  />
                </Flex>
                {formik.values.employment.map((employment, index) => (
                  <div key={index} ref={employmentFormRefs.current[index]}>
                    <EmploymentForm
                      formik={formik}
                      values={employment}
                      count={index}
                    />
                    {formik.values.employment.length > 1 && (
                      <Flex
                        justify="flex-end"
                        gap="0.25rem"
                        align="center"
                        onClick={() => {
                          arrayHelpers.remove(index);
                          const element =
                            employmentFormRefs.current[index - 1].current;
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

export default EmploymentInfo;
