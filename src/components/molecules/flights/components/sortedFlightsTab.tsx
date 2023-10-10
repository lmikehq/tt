import Flex from "@components/templates/flex";
import Text from "@atom/text";
import React, { Dispatch, SetStateAction } from "react";
import { BsInfoCircle, BsSortUp } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { styled } from "styled-components";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { ttColors } from "@/lib/theme/colors";

export const FlightContainer = styled.div`
  box-shadow: 0px 4px 16px 0px #8dd3bb1a;
  border: 1px solid #e7e7e7;
  background: linear-gradient(0deg, #ffffff, #ffffff);
  margin-bottom: 2rem;
  padding: 1rem;
  border-radius: 12.5px;

  @media only screen and (max-width: 992px) {
    background: none;
    border: none;
    box-shadow: none;
    margin: 0;
    padding: 0;
  }
`;

export const ButtonBox = styled.div<{ active: boolean }>`
  background: ${({ active }) => (active ? "#06062A" : "transparent")};
  color: ${({ active }) => (active ? "white" : "#606060")};
  padding: 1rem;
  border-radius: 12.5px;
  cursor: pointer;

  h1 {
    color: ${({ active }) => (active ? "white" : ttColors.primary)};
  }

  @media only screen and (max-width: 992px) {
    svg {
      display: ${({ active }) => (active ? "inline-flex" : "none")};
    }
  }
`;

type sortProps = {
  cheapPrice: number;
  bestPrice: number;
  fastPrice: number;
  sortType: string;
  setSortType: Dispatch<SetStateAction<string>>;
};

function SortedFlightsTab(props: sortProps) {
  const { isMobile } = useScreenResolution();

  return (
    <FlightContainer>
      <Flex justify="space-between" align="center">
        <Flex justify={isMobile ? "center" : "flex-start"} gap="2rem">
          <ButtonBox
            active={props.sortType === "best"}
            onClick={() => props.setSortType("best")}
          >
            <Flex
              direction="column"
              gap=".5rem"
              align="center"
              justify={isMobile ? "center" : "flex-start"}
              padding=".5rem 1.25rem"
            >
              <Flex
                gap="1rem"
                align="center"
                justify={isMobile ? "center" : "flex-start"}
              >
                <Text type="p" text="Best" />
                <BsInfoCircle size={20} />
              </Flex>
              <Flex
                direction={isMobile ? "column" : "row"}
                gap=".5rem"
                align="center"
              >
                <Text
                  type={isMobile ? "h1" : "p"}
                  text={`$${Number(
                    props.bestPrice?.toFixed(0)
                  ).toLocaleString()}`}
                  weight={600}
                />
                {!isMobile && <GoDotFill size={15} />}
                <Text type="p" text="20 h 32 m" whiteSpace="nowrap" />
              </Flex>
            </Flex>
          </ButtonBox>
          <ButtonBox
            active={props.sortType === "cheap"}
            onClick={() => props.setSortType("cheap")}
          >
            <Flex
              direction="column"
              justify={isMobile ? "center" : "flex-start"}
              gap=".5rem"
              padding=".5rem 1.25rem"
            >
              <Flex
                gap="1rem"
                align="center"
                justify={isMobile ? "center" : "flex-start"}
              >
                <Text type="p" text="Cheapest" />
                <BsInfoCircle size={20} />
              </Flex>
              <Flex
                direction={isMobile ? "column" : "row"}
                gap=".5rem"
                align="center"
              >
                <Text
                  type={isMobile ? "h1" : "p"}
                  text={`$${Number(
                    props.cheapPrice?.toFixed(0)
                  ).toLocaleString()}`}
                  weight={600}
                />
                {!isMobile && <GoDotFill size={15} />}
                <Text type="p" text="20 h 32 m" whiteSpace="nowrap" />
              </Flex>
            </Flex>
          </ButtonBox>
          {isMobile && (
            <ButtonBox
              active={props.sortType === "fast"}
              onClick={() => props.setSortType("fast")}
            >
              <Flex
                direction="column"
                justify="center"
                gap=".5rem"
                padding=".5rem 1.25rem"
              >
                <Flex gap="1rem" align="center" justify="center">
                  <Text type="p" text="Fastest" />
                  <BsInfoCircle size={20} />
                </Flex>
                <Flex
                  direction={isMobile ? "column" : "row"}
                  gap=".5rem"
                  align="center"
                >
                  <Text
                    type={isMobile ? "h1" : "p"}
                    text={`$${Number(
                      props.fastPrice?.toFixed(0)
                    ).toLocaleString()}`}
                    weight={600}
                  />
                  {!isMobile && <GoDotFill size={15} />}
                  <Text type="p" text="20 h 32 m" whiteSpace="nowrap" />
                </Flex>
              </Flex>
            </ButtonBox>
          )}
        </Flex>
        {!isMobile && (
          <Flex justify="flex-end" gap=".75rem">
            <BsSortUp size={30} color="#606060" />
            <Text type="p" text="Other Sort" color="#606060" />
          </Flex>
        )}
      </Flex>
    </FlightContainer>
  );
}

export default SortedFlightsTab;
