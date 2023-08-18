import Flex from "@atom/flex";
import Text from "@atom/text";
import { useScreenResolution } from "hook/useScreenResolution";
import React from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

function FormStepTitle({ steps, index }: { steps: string[]; index: number }) {
  const { isMobile } = useScreenResolution();

  return (
    <Flex align="center" gap="1rem">
      <Text
        type="h1"
        text={steps[0]}
        size={isMobile ? "13px" : "22px"}
        weight={500}
        className="title-font"
      />
      {steps.length > 1 && (
        <>
          {index === 1 ? <HiOutlineArrowNarrowRight /> : "..."}
          <Text type="p" text={steps[index]} size={isMobile ? "14px" : "18px"} weight={500} />
        </>
      )}
    </Flex>
  );
}

export default FormStepTitle;
