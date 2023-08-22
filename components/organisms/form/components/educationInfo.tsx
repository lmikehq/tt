import Section from "@molecule/section";
import {
  FieldArray,
  Formik,
  FormikProvider,
  FormikValues,
  useFormik,
} from "formik";
import FormStepTitle from "./formStepsTitle";
import { useScreenResolution } from "hook/useScreenResolution";
import Flex from "@atom/flex";
import { ttColors } from "theme/colors";
import EducationForm from "@molecule/forms/educationForm";
import { RiDeleteBin6Line } from "react-icons/ri";
import Text from "@atom/text";
import AddButton from "@atom/addButton";
import {
  educationArraySchema,
  educationKeys,
  educationsArr,
  educationsSchema,
  visaInitVals,
} from "@lib/application/schema";
import { SingleFormType } from "../applicationForm";
import Button from "@atom/button";
import Spinner from "@components/icons/spinner";

interface formProps {
  steps: string[];
  index: number;
  nextStep: ({ form }: { form: SingleFormType }) => void;
  isLoading: boolean;
}

function EducationInfo({ steps, index, nextStep, isLoading }: formProps) {
  const { isMobile } = useScreenResolution();
  const formik = useFormik({
    initialValues: educationsArr,
    validationSchema: educationsSchema,
    onSubmit: (values) => {
      nextStep({ form: values.educations });
    },
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
          <Section height="unset" margin="4.5rem 0 0 0">
            <Button width="100%" height={"3.5rem"} type="submit">
              <Flex align="center" width="100%" height="100%" justify="center">
                {isLoading ? (
                  <Spinner size="40px" fill={ttColors.primary} />
                ) : (
                  <Text
                    type="span"
                    text={"Save & Continue"}
                    weight={600}
                    size={20}
                    color={ttColors.light}
                  />
                )}
              </Flex>
            </Button>
          </Section>
        </form>
      </Section>
    </FormikProvider>
  );
}

export default EducationInfo;
