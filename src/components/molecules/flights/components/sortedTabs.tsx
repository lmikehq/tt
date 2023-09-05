import Button from "src/components/atoms/button";
import Flex from "src/components/atoms/flex";
import Text from "src/components/atoms/text";
import React from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { ttColors } from "theme/colors";

function sortedTabs() {
  return (
    <Flex>
      <Flex gap="1rem">
        <Button color="#F3F3FF">
          <Flex align="center" gap=".25rem">
            <Text type="p" text="Bags" weight={600} color="#06062A" />
            <BsChevronDown color="#06062A" size={20} />
          </Flex>
        </Button>
        <Button color="#F3F3FF">
          <Flex align="center" gap=".25rem">
            <Text type="p" text="Bags" weight={600} color="#06062A" />
            <BsChevronDown color="#06062A" size={20} />
          </Flex>
        </Button>
        <Button color="#F3F3FF">
          <Flex align="center" gap=".25rem">
            <Text type="p" text="Stops" weight={600} color="#06062A" />
            <BsChevronDown color="#06062A" size={20} />
          </Flex>
        </Button>
        <Button color="#F3F3FF">
          <Flex align="center" gap=".25rem">
            <Text type="p" text="Prices" weight={600} color="#06062A" />
            <BsChevronDown color="#06062A" size={20} />
          </Flex>
        </Button>
        <Button color="#F3F3FF">
          <Flex align="center" gap=".25rem">
            <Text type="p" text="Depar" weight={600} color="#06062A" />
            <BsChevronDown color="#06062A" size={20} />
          </Flex>
        </Button>
        <Button color="#F3F3FF">
          <Flex align="center" gap=".25rem">
            <Text type="p" text="Bags" weight={600} color="#06062A" />
            <BsChevronDown color="#06062A" size={20} />
          </Flex>
        </Button>
      </Flex>
      <Flex></Flex>
    </Flex>
  );
}

export default sortedTabs;
