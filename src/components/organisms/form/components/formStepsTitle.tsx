import Flex from "src/components/atoms/flex";
import Text from "src/components/atoms/text";
import { useScreenResolution } from "hook/useScreenResolution";
import React from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

function FormStepTitle({
  steps,
  index,
  padding,
}: {
  steps: string[];
  index: number;
  padding?: string;
}) {
  const { isMobile } = useScreenResolution();

  return (
    <Flex align="center" gap="1rem" padding={padding}>
      <Text
        type="h1"
        text={steps[0]}
        size={isMobile ? "24px" : "24px"}
        weight={600}
        className="title-font"
        // margin={isMobile ? "0" : "2rem 0px 0px"}
      />
      {steps.length > 1 && (
        <>
          {index === 1 ? <HiOutlineArrowNarrowRight /> : "..."}
          <Text
            type="p"
            text={steps[index]}
            size={isMobile ? "14px" : "18px"}
            weight={500}
          />
        </>
      )}
    </Flex>
  );
}

export default FormStepTitle;
