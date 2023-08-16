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

interface formProps {
  formik: any;
  steps: string[];
  index: number;
}

function EducationAndEmploymentInfo({ formik, steps, index }: formProps) {
  const { isMobile } = useScreenResolution();
  const [components, setComponents] = useState<JSX.Element[]>([<EducationForm/>])

  const handleAddComponents = () => {
    setComponents((prev) => [...prev, <EducationForm handleClick={() => handleRemoveComponent} formik={formik} isMobile={isMobile}/>])
  }

  const handleRemoveComponent = (indexToRemove: number) => {
    setComponents((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <Section width={isMobile ? "100%" : "75%"}>
      <Flex justify="space-between">
        <FormStepTitle steps={steps} index={index} />
        <AiFillPlusCircle size={30} onClick={handleAddComponents} cursor="pointer"/>
      </Flex>
      {components.map((component, idx) => (
        <div key={idx}>
          {component}
          <Flex justify="flex-end" gap="0.25rem" align="center" onClick={() => handleRemoveComponent(idx)} cursor="pointer">
            <RiDeleteBin6Line color={ttColors.red} size={30}/>
            <Text type="p" text="Delete Experience" color={ttColors.red} weight="500"/>
          </Flex>
        </div>
      ))}
    </Section>
  );
}

export default EducationAndEmploymentInfo;
