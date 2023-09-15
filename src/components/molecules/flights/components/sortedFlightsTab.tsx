import Flex from "@components/templates/flex";
import Text from "@atom/text";
import React, { Dispatch, SetStateAction } from "react";
import { BsInfoCircle, BsSortUp } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { styled } from "styled-components";

export const FlightContainer = styled.div`
  box-shadow: 0px 4px 16px 0px #8dd3bb1a;
  border: 1px solid #e7e7e7;
  background: linear-gradient(0deg, #ffffff, #ffffff);
  margin: 2rem;
  padding: 1rem;
  border-radius: 12.5px;
`;

export const ButtonBox = styled.div<{ active: boolean }>`
  background: ${({ active }) => (active ? "#06062A" : "transparent")};
  color: ${({ active }) => (active ? "white" : "#606060")};
  padding: 1rem;
  border-radius: 12.5px;
  cursor: pointer;
`;

type sortProps = {
  cheapPrice: number;
  bestPrice: number;
  sortType: string;
  setSortType: Dispatch<SetStateAction<string>>;
};

function SortedFlightsTab(props: sortProps) {
  return (
    <FlightContainer>
      <Flex justify="space-between" align="center">
        <Flex gap=".5rem">
          <ButtonBox
            active={props.sortType === "best"}
            onClick={() => props.setSortType("best")}
          >
            <Flex direction="column" gap=".5rem">
              <Flex gap="1rem" align="center">
                <Text type="p" text="Best" weight={500} />
                <BsInfoCircle size={20} />
              </Flex>
              <Flex gap=".5rem" align="center">
                <Text
                  type="p"
                  text={`$${Number(
                    props.bestPrice?.toFixed(0)
                  ).toLocaleString()}`}
                  weight={500}
                />
                <GoDotFill size={15} />
                <Text
                  type="p"
                  text={`$${Number(
                    props.cheapPrice?.toFixed(0)
                  ).toLocaleString()}`}
                  weight={500}
                />
              </Flex>
            </Flex>
          </ButtonBox>
          <ButtonBox
            active={props.sortType === "cheap"}
            onClick={() => props.setSortType("cheap")}
          >
            <Flex direction="column" gap=".5rem">
              <Flex gap="1rem" align="center">
                <Text type="p" text="Cheapest" weight={500} />
                <BsInfoCircle size={20} />
              </Flex>
              <Flex gap=".5rem" align="center">
                <Text
                  type="p"
                  text={`$${Number(
                    props.cheapPrice?.toFixed(0)
                  ).toLocaleString()}`}
                  weight={500}
                />
                <GoDotFill size={15} />
                <Text
                  type="p"
                  text={`$${Number(
                    props.bestPrice?.toFixed(0)
                  ).toLocaleString()}`}
                  weight={500}
                />
              </Flex>
            </Flex>
          </ButtonBox>
        </Flex>
        <Flex justify="flex-end" gap=".75rem">
          <BsSortUp size={30} color="#606060" />
          <Text type="p" text="Other Sort" color="#606060" />
        </Flex>
      </Flex>
    </FlightContainer>
  );
}

export default SortedFlightsTab;
