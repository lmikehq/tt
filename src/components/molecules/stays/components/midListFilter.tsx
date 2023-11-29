import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Box } from "@mui/material";
import styled from "styled-components";
import Flex from "@/components/templates/flex";
import Text from "@/components/atoms/text";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { ButtonBtn, FilterBox, FilterFlexBox, FilterList } from "./styles";
import { ttColors } from "@/lib/theme/colors";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import {
  formatPriceWithoutCurrency,
  getCurrency,
} from "@/lib/extensions/helpers/formatPrice";

interface Filter {
  ratings: string[];
}

const filters: Filter[] = [
  {
    ratings: ["5.0", "4+", "3+"],
  },
];

export const ButtonBox = styled.div<{ active: boolean }>`
  background: ${({ active }) => (active ? "#06062A" : "transparent")};
  color: ${({ active }) => (active ? "white" : "#606060")};
  padding: 8px 20px;
  height: 43px;
  border-radius: 20px;
  cursor: pointer;
  display:flex;
  align-items:center;
  border: 1px solid var(--color-border);

  h1 {
    color: ${({ active }) => (active ? "white" : ttColors.primary)};
  }

  @media only screen and (max-width: 992px) {
    svg {
      display: ${({ active }) => (active ? "inline-flex" : "none")};
    }
  }
};`;

type SortProps = {
  ratings: number;
  prices: number;
  setSortType: Dispatch<SetStateAction<string>>;
  sortType: string;
};

function MidListFilter(props: SortProps) {
  const { isMobile } = useScreenResolution();

  const [showFilterBox, setShowFilterBox] = useState(false);
  //==========================================
  // Load the filter option from local storage when the component mounts
  //==========================================
  useEffect(() => {
    setShowFilterBox(true);
  }, [props]);

  const handleCloseFilterBox = () => {
    setShowFilterBox(false);
  };

  //============
  // PRICE RANGE
  //============
  const [activeButtonIndex, setActiveButtonIndex] = useState<number | null>(
    null
  );
  const handleButtonClick = (index: number) => {
    setActiveButtonIndex(index);
  };
  return (
    <Box>
      {showFilterBox && (
        <FilterBox>
          <Flex justify="space-between">
            <Text type="h3" text="Show Only" weight={"bold"} />
            <CloseOutlinedIcon
              style={{ cursor: "pointer" }}
              onClick={handleCloseFilterBox}
            />
          </Flex>
          <FilterFlexBox>
            <Flex
              direction={isMobile ? "row" : "column"}
              gap={"20px"}
              margin={"10px 0px"}
              height={isMobile ? "43px" : ""}
            >
              {/* Map ratings filter options */}
              <Flex
                styles={{ flexWrap: isMobile ? "nowrap" : "wrap" }}
                gap="11.3px"
              >
                {filters[0].ratings.map((ratingOption, index) => (
                  <ButtonBox
                    key={index}
                    active={props.sortType === ratingOption}
                    onClick={() => props.setSortType(ratingOption)}
                  >
                    <Flex align="center" styles={{ whiteSpace: "nowrap" }}>
                      <Text type="p" text={ratingOption} />
                      <span>
                        <StarOutlinedIcon
                          style={{
                            color: "var(--primary-color)",
                            marginLeft: "5px",
                          }}
                        />
                      </span>
                    </Flex>
                  </ButtonBox>
                ))}
              </Flex>

              <Flex
                direction={isMobile ? "row" : "row"}
                styles={{
                  flexWrap: isMobile ? "nowrap" : "wrap",
                  marginTop: "-5px",
                }}
                gap="11.3px"
              >
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <ButtonBtn
                    key={index}
                    className={`filter_btn ${
                      index === activeButtonIndex ? "active" : ""
                    }`}
                    onClick={() => handleButtonClick(index)}
                  >
                    <Flex gap="3px" align="center">
                      <Text type="p" text={getCurrency()} />
                      <Text
                        type="p"
                        text={
                          index === 5
                            ? `${formatPriceWithoutCurrency(500000)}+`
                            : `${formatPriceWithoutCurrency(index * 100000)}`
                        }
                      />
                    </Flex>
                    {index < 5 && (
                      <>
                        <span style={{ margin: "0 3px" }}>-</span>
                        <Flex gap="3px" align="center">
                          <Text type="p" text={getCurrency()} />
                          <Text
                            type="p"
                            text={formatPriceWithoutCurrency(
                              (index + 1) * 100000
                            )}
                          />
                        </Flex>
                      </>
                    )}
                  </ButtonBtn>
                ))}
              </Flex>
            </Flex>{" "}
          </FilterFlexBox>
        </FilterBox>
      )}
    </Box>
  );
}

export default MidListFilter;
