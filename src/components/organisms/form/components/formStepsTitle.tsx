import Flex from "@components/templates/flex";
import Text from "@atom/text";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
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
          <Flex direction="column" gap="1rem">
            <Text
                type="h1"
                text={steps[0]}
                size={isMobile ? "24px" : "24px"}
                weight={600}
                className="title-font"
                // margin={isMobile ? "0" : "2rem 0px 0px"}
            />
            <Text
                type="p"
                text={steps[1]}
                size={isMobile ? 15 : 15}
                // margin={isMobile ? "0" : "2rem 0px 0px"}
            />
          </Flex>
      {/* {steps.length > 1 && (
        <>
          {index === 1 ? <HiOutlineArrowNarrowRight /> : "..."}
          <Text
            type="p"
            text={steps[index]}
            size={isMobile ? "14px" : "18px"}
            weight={500}
          />
        </>
      )} */}
    </Flex>
  );
}

export default FormStepTitle;
