import Section from "@molecule/section";
import { FormikValues } from "formik";
import FormStepTitle from "./formStepsTitle";
import { useScreenResolution } from "hook/useScreenResolution";
import Flex from "@atom/flex";
import { AiFillPlusCircle } from "react-icons/ai";
import { ttColors } from "theme/colors";
import { useState } from "react";
import EducationForm from "@molecule/forms/educationForm";
import { RiDeleteBack2Line, RiDeleteBin6Line } from "react-icons/ri";
import Text from "@atom/text";
import AddButton from "@atom/addButton";

interface formProps {
  formik: FormikValues;
  steps: string[];
  index: number;
}

function EducationInfo({ formik, steps, index }: formProps) {
  const { isMobile } = useScreenResolution();
  const [educationInfo, setEducationInfo] = useState<any[]>([{}, {}, {}]);

  const addNewForm = () => {
    setEducationInfo([...educationInfo, {}]);
  };
  const removeForm = (indexToRemove: number) => {
    setEducationInfo((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <Section>
      <Flex justify="space-between">
        <FormStepTitle steps={steps} index={index} />
        <AddButton
          onClick={() => addNewForm()}
          disabled={educationInfo.length >= 5}
        />
      </Flex>
      {educationInfo.map((form, index) => (
        <Section key={`education-${index}`} height="unset">
          <EducationForm formik={formik} count={index + 1} />

          {educationInfo.length > 1 && (
            <Flex
              justify="flex-end"
              gap="0.5rem"
              align="center"
              onClick={() => removeForm(index)}
              cursor="pointer"
            >
              <RiDeleteBin6Line color={ttColors.red} size={24} />
              <Text
                type="p"
                text="Delete Experience"
                color={ttColors.red}
                size={16}
                weight="500"
              />
            </Flex>
          )}
        </Section>
      ))}
    </Section>
  );
}

export default EducationInfo;
