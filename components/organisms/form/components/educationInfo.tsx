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
  const [count, setCount] = useState(2)
  const [components, setComponents] = useState<JSX.Element[]>([<EducationForm formik={formik} key={1} count={1}/>])

  const handleAddComponents = () => {
    setCount((prev) => prev + 1)
    setComponents((prev) => [...prev, <EducationForm formik={formik} key={count} count={count}/>])
  }

  const handleRemoveComponent = (indexToRemove: number) => {
    setComponents((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <Section width={isMobile ? "100%" : "75%"}>
      <Flex justify="space-between" margin={isMobile ? "0px" : "2.5rem 0 1rem"}>
        <FormStepTitle steps={steps} index={index} />
        <AddButton onClick={() => handleAddComponents()} />
      </Flex>
      {components.map((component, idx) => (
        <div key={idx}>
          {component}
          <Flex
            justify="flex-end"
            gap="0.25rem"
            align="center"
            onClick={() => handleRemoveComponent(idx)}
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
        </div>
      ))}
    </Section>
  );
}

export default EducationInfo;
