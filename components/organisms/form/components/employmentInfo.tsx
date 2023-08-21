import Section from "@molecule/section";
import { FormikValues } from "formik";
import FormStepTitle from "./formStepsTitle";
import { useScreenResolution } from "hook/useScreenResolution";
import Flex from "@atom/flex";
import { ttColors } from "theme/colors";
import { useState } from "react";
import EmploymentForm from "@molecule/forms/employmentForm";
import { RiDeleteBin6Line } from "react-icons/ri";
import Text from "@atom/text";
import AddButton from "@atom/addButton";

interface formProps {
  formik: FormikValues;
  steps: string[];
  index: number;
}

function EmploymentInfo({ formik, steps, index }: formProps) {
  const { isMobile } = useScreenResolution();
  const [employmentInfo, setEmploymentInfo] = useState<any[]>([{}, {}, {}]);

  const addNewForm = () => {
    setEmploymentInfo([...employmentInfo, {}]);
  };
  const removeForm = (indexToRemove: number) => {
    setEmploymentInfo((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <Section>
      <Flex justify="space-between" align="flex-start">
        <FormStepTitle steps={steps} index={index} />
        <AddButton
          onClick={() => addNewForm()}
          disabled={employmentInfo.length >= 5}
        />
      </Flex>
      {employmentInfo.map((form, index) => (
        <Section key={`employment-${index}`} height="unset">
          <EmploymentForm formik={formik} count={index + 1} />

          {employmentInfo.length > 1 && (
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
    // <Section>
    //   <Flex justify="space-between">
    //     <FormStepTitle steps={steps} index={index} />
    //     <AddButton onClick={() => handleAddComponents()} />
    //   </Flex>
    //   {components.map((component, idx) => (
    //     <div key={idx}>
    //       {component}
    //       {components.length > 1 && (
    //         <Flex
    //           justify="flex-end"
    //           gap="0.25rem"
    //           align="center"
    //           onClick={() => handleRemoveComponent(idx)}
    //           cursor="pointer"
    //         >
    //           <RiDeleteBin6Line color={ttColors.red} size={30} />
    //           <Text
    //             type="p"
    //             text="Delete Experience"
    //             color={ttColors.red}
    //             weight="500"
    //           />
    //         </Flex>
    //       )}
    //     </div>
    //   ))}
    // </Section>
  );
}

export default EmploymentInfo;
