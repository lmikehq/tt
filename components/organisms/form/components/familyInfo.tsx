import Section from "@molecule/section";
import { FormikValues } from "formik";
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

interface formProps {
  formik: FormikValues;
  steps: string[];
  index: number;
}

function FamilyInfo({ formik, steps, index }: formProps) {
  const { isMobile } = useScreenResolution();
  const [familyInfo, setFamilyInfo] = useState<any[]>([{}, {}, {}]);

  const addNewForm = () => {
    setFamilyInfo([...familyInfo, {}]);
  };
  const removeForm = (indexToRemove: number) => {
    setFamilyInfo((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <Section>
      <Flex justify="space-between" align="flex-start">
        <FormStepTitle steps={steps} index={index} />
        <AddButton
          onClick={() => addNewForm()}
          disabled={familyInfo.length >= 5}
        />
      </Flex>
      {familyInfo.map((form, index) => (
        <Section key={`family-${index}`} height="unset">
          <FamilyForm formik={formik} count={index + 1} />

          {familyInfo.length > 1 && (
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
                text="Delete Family"
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

export default FamilyInfo;
