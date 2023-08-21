import Section from "@molecule/section";
import { FieldArray, Formik, FormikValues } from "formik";
import FormStepTitle from "./formStepsTitle";
import { useScreenResolution } from "hook/useScreenResolution";
import Flex from "@atom/flex";
import { ttColors } from "theme/colors";
import { useState } from "react";
import EmploymentForm from "@molecule/forms/employmentForm";
import { RiDeleteBin6Line } from "react-icons/ri";
import Text from "@atom/text";
import AddButton from "@atom/addButton";
import { employmentKeys } from "@lib/application/schema";

interface formProps {
  formik: FormikValues;
  steps: string[];
  index: number;
}

function EmploymentInfo({ formik, steps, index }: formProps) {
  const { isMobile } = useScreenResolution();

  return (
    <Formik
      initialValues={{
        employment: [{ ...employmentKeys }],
      }}
      // validationSchema={educationArraySchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values }) => (
        <Section width={isMobile ? "100%" : "75%"}>
          <FieldArray
            name="employment"
            render={(arrayHelpers) => (
              <div>
                <Flex justify="space-between">
                  <FormStepTitle steps={steps} index={index} />
                  <AddButton
                    disabled={values.employment.length === 3}
                    onClick={() => {
                      if (values.employment.length < 3) {
                        arrayHelpers.insert(index + 1, employmentKeys);
                      }
                    }}
                  />
                </Flex>
                {values.employment.map((employment, index) => (
                  <div key={index}>
                    <EmploymentForm
                      formik={formik}
                      employment={employment}
                      count={index}
                    />
                    {values.employment.length > 1 && (
                      <Flex
                        justify="flex-end"
                        gap="0.25rem"
                        align="center"
                        onClick={() => arrayHelpers.remove(index)}
                        cursor="pointer"
                      >
                        <RiDeleteBin6Line color={ttColors.red} size={30} />
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
        </Section>
      )}
    </Formik>
  );
}

export default EmploymentInfo;
