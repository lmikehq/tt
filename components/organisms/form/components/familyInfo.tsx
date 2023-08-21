import Section from "@molecule/section";
import { FieldArray, Formik, FormikValues } from "formik";
import FormStepTitle from "./formStepsTitle";
import { useScreenResolution } from "hook/useScreenResolution";
import Flex from "@atom/flex";
import { AiFillPlusCircle } from "react-icons/ai";
import { ttColors } from "theme/colors";
import { useState } from "react";
import FamilyForm from "@molecule/forms/familyForm";
import { RiDeleteBack2Line, RiDeleteBin6Line } from "react-icons/ri";
import Text from "@atom/text";
import AddButton from "@atom/addButton";
import { familyInforKeys } from "@lib/application/schema";

interface formProps {
  formik: FormikValues;
  steps: string[];
  index: number;
}

function FamilyInfo({ formik, steps, index }: formProps) {
  const { isMobile } = useScreenResolution();

  return (
    <Formik
      initialValues={{
        family: [{ ...familyInforKeys }],
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values }) => (
        <Section width={isMobile ? "100%" : "75%"}>
          <form>
            <FieldArray
              name="family"
              render={(arrayHelpers) => (
                <div>
                  <Flex justify="space-between" padding="0 0 2rem 0">
                    <FormStepTitle steps={steps} index={index}  />
                    <AddButton
                      disabled={values.family.length === 3}
                      onClick={() => {
                        if (values.family.length < 3) {
                          arrayHelpers.insert(index + 1, familyInforKeys);
                        }
                      }}
                    />
                  </Flex>
                  {values.family.map((family, index) => (
                    <div key={index}>
                      <FamilyForm
                        formik={formik}
                        family={family}
                        count={index}
                      />
                      {values.family.length > 1 && (
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

export default FamilyInfo;
