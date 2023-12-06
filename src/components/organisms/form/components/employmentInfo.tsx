import Section from "src/components/molecules/section";
import {
  FieldArray,
  Formik,
  FormikProps,
  FormikProvider,
  FormikValues,
  useFormik,
} from "formik";
import FormStepTitle from "./formStepsTitle";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import Flex from "@components/templates/flex";
import { ttColors } from "@lib/theme/colors";
import EmploymentForm from "src/components/molecules/forms/employmentForm";
import { RiDeleteBin6Line } from "react-icons/ri";
import Text from "@atom/text";
import AddButton from "@molecule/addButton";
import {
  employmentKeys,
  employmentsArr,
  manyEmploymentSchema,
} from "@lib/types/schema";
import ContinueButton from "@organism/continueButton";
import { EmploymentDetailsInterface, Mode } from "@lib/types";
import { toast } from "react-hot-toast";
import { useApplicationFormStore } from "@lib/store/application-form.store";
import ToastError from "@molecule/toastError";

interface formProps {
  steps: string[];
  index: number;
  persistForm: () => void;
  formik: FormikProps<{ employment: EmploymentDetailsInterface[] }>;
}

function EmploymentInfo({ steps, index, persistForm, formik }: formProps) {
  const { mode } = useApplicationFormStore((state) => state);
  const isLoading = mode == Mode.loading;

  return (
    <FormikProvider value={formik}>
      <Section>
        <form onSubmit={formik.handleSubmit}>
          <FieldArray
            name="employment"
            render={(arrayHelpers) => (
              <div>
                <Flex justify="space-between" padding="0 0 2rem 0" align="flex-start">
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
                {formik.values.employment.map((employment, index, arr) => (
                  <div key={index} style={{ marginBottom: '3.5rem' }}>
                    <EmploymentForm
                      formik={formik}
                      values={employment}
                        count={index}
                        length={arr.length}
                    />
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
                            size={15}
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
                saveProgressAndContinueLater={persistForm}
                onClick={() => {
                    formik.validateForm().then(res => {
                        if (!formik.isValid) return ToastError();
                    })
                }}
                disabled={!formik.isValid}
          />
        </form>
      </Section>
    </FormikProvider>
  );
}

export default EmploymentInfo;
