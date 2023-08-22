import Section from "@molecule/section";
import {
  FieldArray,
  Formik,
  FormikProvider,
  FormikValues,
  useFormik,
} from "formik";
import FormStepTitle from "./formStepsTitle";
import Flex from "@atom/flex";
import { ttColors } from "theme/colors";
import EducationForm from "@molecule/forms/educationForm";
import { RiDeleteBin6Line } from "react-icons/ri";
import Text from "@atom/text";
import AddButton from "@atom/addButton";
import {
  educationKeys,
  educationsArr,
  educationsSchema,
} from "@lib/application/schema";
import { SingleFormType } from "../applicationForm";
import { useState } from "react";
import ContinueButton from "@atom/continueButton";

interface formProps {
  steps: string[];
  index: number;
  nextStep: ({ form }: { form: SingleFormType }) => void;
  isLoading: boolean;
}

function EducationInfo({ steps, index, nextStep, isLoading }: formProps) {
  const formik = useFormik({
    initialValues: educationsArr,
    validationSchema: educationsSchema,
    onSubmit: (values) => {
      nextStep({ form: values.educations });
    },
    validateOnChange: false
  });
  return (
    <FormikProvider value={formik}>
      <Section>
        <form onSubmit={formik.handleSubmit}>
          <FieldArray
            name="educations"
            render={(arrayHelpers) => (
              <div>
                <Flex justify="space-between" padding="0 0 2rem 0">
                  <FormStepTitle steps={steps} index={index} />
                  <AddButton
                    disabled={formik.values.educations.length === 3}
                    onClick={() => {
                      if (formik.values.educations.length < 3) {
                        arrayHelpers.insert(index + 1, educationKeys);
                      }
                    }}
                  />
                </Flex>
                {formik.values.educations.map((education, index) => (
                  <div key={index}>
                    <EducationForm
                      formik={formik}
                      education={education}
                      count={index}
                    />
                    {formik.values.educations.length > 1 && (
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
          <ContinueButton isLoading={isLoading} disabled={!formik.isValid}/>
        </form>
      </Section>
    </FormikProvider>
  );
}

export default EducationInfo;
