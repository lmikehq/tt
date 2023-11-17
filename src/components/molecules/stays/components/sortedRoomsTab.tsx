import Flex from "@components/templates/flex";
import Text from "@atom/text";
import React, { Dispatch, SetStateAction } from "react";
import { BsInfoCircle, BsSortUp } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { styled } from "styled-components";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { ttColors } from "@/lib/theme/colors";

export const RoomContainer = styled.div`
  box-shadow: 0px 4px 16px 0px #8dd3bb1a;
  border: 1px solid #e7e7e7;
  background: linear-gradient(0deg, #ffffff, #ffffff);
  margin-bottom: 2rem;
  padding: 0.5rem;
  border-radius: 12.5px;
  width: 100%;
  overflow: hidden;
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

const DivTag = styled.div`
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

type sortProps = {
  bestPrice: number;
  topReviews: number;
  lowestPrice: number;
  starRatings: number;
  distance: string;
  setSortType: Dispatch<SetStateAction<string>>;
  sortType: string;
};

function SortedRoomsTab(props: sortProps) {
  const { isMobile } = useScreenResolution();

  return (
    <>
      <Flex
        gap="10px"
        align="center"
        justify={isMobile ? "center" : "flex-start"}
        styles={{ marginBottom: "30px" }}
      >
        <Text
          type="p"
          text={`${1178} hotels found in london`}
          styles={{ fontWeight: "600" }}
        ></Text>
        <BsInfoCircle size={20} style={{ color: "var(--primary-color)" }} />
      </Flex>
      <RoomContainer>
        <DivTag>
          <Flex
            justify={isMobile ? "center" : "space-between"}
            styles={{ width: "100%" }}
          >
            <ButtonBox
              active={props.sortType === "best"}
              onClick={() => props.setSortType("best")}
            >
              <Flex
                direction="column"
                align="center"
                justify={isMobile ? "center" : "flex-start"}
                padding=".05rem 1.25rem"
              >
                <Flex
                  gap="10px"
                  align="center"
                  justify={isMobile ? "center" : "flex-start"}
                >
                  <Text type="p" text="Best" />
                  {props.sortType === "best" && <BsInfoCircle size={20} />}
                </Flex>
              </Flex>
            </ButtonBox>
            <ButtonBox
              active={props.sortType === "top"}
              onClick={() => props.setSortType("top")}
            >
              <Flex
                direction="column"
                justify={isMobile ? "center" : "flex-start"}
                padding=".05rem 1.25rem"
              >
                <Flex
                  gap="10px"
                  align="center"
                  justify={isMobile ? "center" : "flex-start"}
                >
                  <Text
                    type="p"
                    text="Top Reviews"
                    styles={{ whiteSpace: "nowrap" }}
                  />
                  {props.sortType === "top" && <BsInfoCircle size={20} />}
                </Flex>
              </Flex>
            </ButtonBox>
            <ButtonBox
              active={props.sortType === "lowest"}
              onClick={() => props.setSortType("lowest")}
            >
              <Flex
                direction="column"
                justify={isMobile ? "center" : "flex-start"}
                padding=".05rem 1.25rem"
              >
                <Flex
                  gap="10px"
                  align="center"
                  justify={isMobile ? "center" : "flex-start"}
                >
                  <Text
                    type="p"
                    text="Lowest Prices"
                    styles={{ whiteSpace: "nowrap" }}
                  />
                  {props.sortType === "lowest" && <BsInfoCircle size={20} />}
                </Flex>
              </Flex>
            </ButtonBox>
            <ButtonBox
              active={props.sortType === "star"}
              onClick={() => props.setSortType("star")}
            >
              <Flex
                direction="column"
                justify={isMobile ? "center" : "flex-start"}
                padding=".05rem 1.25rem"
              >
                <Flex
                  gap="10px"
                  align="center"
                  justify={isMobile ? "center" : "flex-start"}
                >
                  <Text
                    type="p"
                    text="Star Rating"
                    styles={{ whiteSpace: "nowrap" }}
                  />
                  {props.sortType === "star" && <BsInfoCircle size={20} />}
                </Flex>
              </Flex>
            </ButtonBox>
            <ButtonBox
              active={props.sortType === "distance"}
              onClick={() => props.setSortType("distance")}
            >
              <Flex
                direction="column"
                justify={isMobile ? "center" : "flex-start"}
                padding=".05rem 1.25rem"
              >
                <Flex
                  gap="10px"
                  align="center"
                  justify={isMobile ? "center" : "flex-start"}
                >
                  <Text type="p" text="Distance" />
                  {props.sortType === "distance" && <BsInfoCircle size={20} />}
                </Flex>
              </Flex>
            </ButtonBox>
            {isMobile && (
              <ButtonBox
                active={props.sortType === "best"}
                onClick={() => props.setSortType("best")}
              >
                <Flex
                  direction="column"
                  justify="center"
                  gap=".5rem"
                  padding=".5rem 1.25rem"
                >
                  <Flex gap="10px" align="center" justify="center">
                    <Text type="p" text="Best" />
                    {props.sortType === "best" && <BsInfoCircle size={20} />}
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
            )}
          </Flex>
        </DivTag>
      </RoomContainer>
    </>
  );
}

export default SortedRoomsTab;
