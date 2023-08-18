import Section from "@molecule/section";
import { FormikValues } from "formik";
import FormStepTitle from "./formStepsTitle";
import { useScreenResolution } from "hook/useScreenResolution";
import Flex from "@atom/flex";
import { ttColors } from "theme/colors";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import Text from "@atom/text";
import AddButton from "@atom/addButton";
import FamilyForm from "@molecule/forms/familyForm";

interface formProps {
  formik: FormikValues;
  steps: string[];
  index: number;
}

function FamilyInfo({ formik, steps, index }: formProps) {
  const { isMobile } = useScreenResolution();
  const [count, setCount] = useState(2)
  const [components, setComponents] = useState<JSX.Element[]>([<FamilyForm formik={formik} key={1} count={1}/>])

  const handleAddComponents = () => {
    setCount((prev) => prev + 1)
    setComponents((prev) => [...prev, <FamilyForm formik={formik} key={count} count={count}/>])
  }

  const handleRemoveComponent = (indexToRemove: number) => {
    setComponents((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <Section width={isMobile ? "100%" : "75%"}>
      <Flex justify="space-between">
        <FormStepTitle steps={steps} index={index} />
        <AddButton onClick={() => handleAddComponents()}/>
      </Flex>
      {components.map((component, idx) => (
        <div key={idx}>
          {component}
          <Flex justify="flex-end" gap="0.25rem" align="center" onClick={() => handleRemoveComponent(idx)} cursor="pointer">
            <RiDeleteBin6Line color={ttColors.red} size={30} />
            <Text type="p" text="Delete Experience" color={ttColors.red} weight="500"/>
          </Flex>
        </div>
      ))}
    </Section>
  );
}

export default FamilyInfo;
