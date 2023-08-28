import { Divider } from "@atom/divider";
import Flex from "@atom/flex";
import Text from "@atom/text";
import Section from "@molecule/section";
import React from "react";
import { BsChevronDown } from "react-icons/bs";

function SortedColumn() {
  return (
    <Section>
      <Flex direction="column">
        <Flex direction="column">
          <Flex align="center" justify="space-between" padding="1rem 0">
            <Text type="p" text="Bags" weight={500} color="#06062A" />
            <BsChevronDown color="#06062A" size={20} />
          </Flex>
          <Divider/>
        </Flex>
        <Flex direction="column">
          <Flex align="center" justify="space-between" padding="1rem 0">
            <Text type="p" text="Stops" weight={500} color="#06062A" />
            <BsChevronDown color="#06062A" size={20} />
          </Flex>
          <Divider/>
        </Flex>
        <Flex direction="column">
          <Flex align="center" justify="space-between" padding="1rem 0">
            <Text type="p" text="Airlines" weight={500} color="#06062A" />
            <BsChevronDown color="#06062A" size={20} />
          </Flex>
          <Divider/>
        </Flex>
        <Flex direction="column">
          <Flex align="center" justify="space-between" padding="1rem 0">
            <Text type="p" text="Times" weight={500} color="#06062A" />
            <BsChevronDown color="#06062A" size={20} />
          </Flex>
          <Divider/>
        </Flex>
        <Flex direction="column">
          <Flex align="center" justify="space-between" padding="1rem 0">
            <Text type="p" text="Alliance" weight={500} color="#06062A" />
            <BsChevronDown color="#06062A" size={20} />
          </Flex>
          <Divider/>
        </Flex>
        <Flex direction="column">
          <Flex align="center" justify="space-between" padding="1rem 0">
            <Text type="p" text="Duration" weight={500} color="#06062A" />
            <BsChevronDown color="#06062A" size={20} />
          </Flex>
          <Divider/>
        </Flex>
        <Flex direction="column">
          <Flex align="center" justify="space-between" padding="1rem 0">
            <Text type="p" text="Price" weight={500} color="#06062A" />
            <BsChevronDown color="#06062A" size={20} />
          </Flex>
          <Divider/>
        </Flex>
        <Flex direction="column">
          <Flex align="center" justify="space-between" padding="1rem 0">
            <Text type="p" text="Cabin" weight={500} color="#06062A" />
            <BsChevronDown color="#06062A" size={20} />
          </Flex>
          <Divider/>
        </Flex>
      </Flex>
    </Section>
  );
}

export default SortedColumn;
