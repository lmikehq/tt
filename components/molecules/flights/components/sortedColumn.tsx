import { Divider } from "@atom/divider";
import Flex from "@atom/flex";
import Text from "@atom/text";
import Section from "@molecule/section";
import React from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { ttColors } from "theme/colors";

function SortedColumn() {
  return (
    <Section>
      <Flex direction="column">
        <Flex direction="column">
          <Flex align="center" justify="space-between" padding="1rem 0">
            <Text type="p" text="Bags" weight={500} color="#06062A" />
            <BsChevronDown color="#06062A" size={20} />
          </Flex>
          <Flex
            direction="column"
            justify="center"
            gap="1rem"
          >
            <Flex align="center" justify="space-between">
              <Text type="p" text="Cabin Babbage" size={15} whiteSpace="nowrap" />
              <Flex gap=".75rem" align="center" justify="flex-end">
                <AiOutlineMinusCircle size={30} />
                <Text type="p" text="0" />
                <AiOutlinePlusCircle size={30} />
              </Flex>
            </Flex>
            <Flex align="center" justify="space-between">
              <Text type="p" text="Checked Baggage" size={15} whiteSpace="nowrap"/>
              <Flex gap=".75rem" align="center" justify="flex-end">
                <AiOutlineMinusCircle size={30} />
                <Text type="p" text="0" />
                <AiOutlinePlusCircle size={30} />
              </Flex>
            </Flex>
          </Flex>
          <Divider direction="horizontal" />
        </Flex>
        <Flex direction="column">
          <Flex align="center" justify="space-between" padding="1rem 0">
            <Text type="p" text="Stops" weight={500} color="#06062A" />
            <BsChevronDown color="#06062A" size={20} />
          </Flex>
          <Divider direction="horizontal" />
        </Flex>
        <Flex direction="column">
          <Flex align="center" justify="space-between" padding="1rem 0">
            <Text type="p" text="Airlines" weight={500} color="#06062A" />
            <BsChevronDown color="#06062A" size={20} />
          </Flex>
          <Divider direction="horizontal" />
        </Flex>
        <Flex direction="column">
          <Flex align="center" justify="space-between" padding="1rem 0">
            <Text type="p" text="Times" weight={500} color="#06062A" />
            <BsChevronDown color="#06062A" size={20} />
          </Flex>
          <Divider direction="horizontal" />
        </Flex>
        <Flex direction="column">
          <Flex align="center" justify="space-between" padding="1rem 0">
            <Text type="p" text="Alliance" weight={500} color="#06062A" />
            <BsChevronDown color="#06062A" size={20} />
          </Flex>
          <Divider direction="horizontal" />
        </Flex>
        <Flex direction="column">
          <Flex align="center" justify="space-between" padding="1rem 0">
            <Text type="p" text="Duration" weight={500} color="#06062A" />
            <BsChevronDown color="#06062A" size={20} />
          </Flex>
          <Divider direction="horizontal" />
        </Flex>
        <Flex direction="column">
          <Flex align="center" justify="space-between" padding="1rem 0">
            <Text type="p" text="Price" weight={500} color="#06062A" />
            <BsChevronDown color="#06062A" size={20} />
          </Flex>
          <Divider direction="horizontal" />
        </Flex>
        <Flex direction="column">
          <Flex align="center" justify="space-between" padding="1rem 0">
            <Text type="p" text="Cabin" weight={500} color="#06062A" />
            <BsChevronDown color="#06062A" size={20} />
          </Flex>
          <Divider direction="horizontal" />
        </Flex>
      </Flex>
    </Section>
  );
}

export default SortedColumn;
