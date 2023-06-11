import Flex from "@atom/flex";
import Text from "@atom/text";
import React from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

function FormStepTitle({ steps, index }: { steps: string[]; index: number }) {
  return (
    <Flex align="center" gap="1rem">
      <Text
        type="p"
        text={steps[0]}
        size="18px"
        color={index > 0 ? "#3BB98E" : "#000000"}
      />
      {steps.length > 1 && (
        <>
          {index === 1 ? <HiOutlineArrowNarrowRight /> : "..."}
          <Text type="p" text={steps[index]} size="18px" />
        </>
      )}
    </Flex>
  );
}

export default FormStepTitle;
