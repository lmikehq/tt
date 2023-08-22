import Section from "@molecule/section";
import { FieldArray, Formik, FormikValues } from "formik";
import FormStepTitle from "./formStepsTitle";
import { useScreenResolution } from "hook/useScreenResolution";
import Flex from "@atom/flex";
import { ttColors } from "theme/colors";
import EducationForm from "@molecule/forms/educationForm";
import { RiDeleteBin6Line } from "react-icons/ri";
import Text from "@atom/text";
import AddButton from "@atom/addButton";
import { educationArraySchema, educationKeys } from "@lib/application/schema";

interface formProps {
  formik: FormikValues;
  steps: string[];
  index: number;
}

function EducationInfo({ formik, steps, index }: formProps) {
  const { isMobile } = useScreenResolution();
  return (
    <Formik
      initialValues={{
        education: [{ ...educationKeys }],
      }}
      validationSchema={educationArraySchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values }) => (
        <Section width={isMobile ? "100%" : "75%"}>
          <form>
            <FieldArray
              name="education"
              render={(arrayHelpers) => (
                <div>
                  <Flex justify="space-between" padding="0 0 2rem 0">
                    <FormStepTitle steps={steps} index={index} />
                    <AddButton
                      disabled={values.education.length === 3}
                      onClick={() => {
                        if (values.education.length < 3) {
                          arrayHelpers.insert(index + 1, educationKeys);
                        }
                      }}
                    />
                  </Flex>
                  {values.education.map((education, index) => (
                    <div key={index}>
                      <EducationForm
                        formik={formik}
                        education={education}
                        count={index}
                      />
                      {values.education.length > 1 && (
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
          </form>
        </Section>
      )}
    </Formik>
  );
}

export default EducationInfo;
