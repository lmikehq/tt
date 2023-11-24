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

// Define the Filter and filters outside of your components
interface Filter {
  ratings: string[];
  prices: { min: number; max?: number }[];
}

const filters: Filter[] = [
  {
    ratings: ["5.0", "4+", "3+"],
    prices: [
      { min: 0, max: 100000 },
      { min: 100000, max: 200000 },
      { min: 200000, max: 300000 },
      { min: 300000, max: 400000 },
      { min: 400000, max: 500000 },
      { min: 500000 },
    ],
  },
];

// Define the ButtonBox component as you did
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

const formatPrice = (price: number) => `₦${price.toLocaleString()}`;

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
                gap="10px"
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
              {/* Map price range filter options */}
              <Flex
                direction={isMobile ? "row" : "row"}
                styles={{ flexWrap: isMobile ? "nowrap" : "wrap" }}
                gap="10px"
              >
                {filters[0].prices.map((priceRangeOption, index, array) => (
                  <ButtonBox
                    key={index}
                    active={props.sortType === String(priceRangeOption.min)}
                    onClick={() => {
                      if (priceRangeOption.min !== undefined) {
                        props.setSortType(String(priceRangeOption.min));
                      }
                    }}
                  >
                    <Text
                      type="p"
                      styles={{ whiteSpace: "nowrap" }}
                      text={`${formatPrice(priceRangeOption.min)} - ${
                        index === array.length - 1
                          ? "+"
                          : priceRangeOption.max !== undefined
                          ? formatPrice(priceRangeOption.max)
                          : ""
                      }`}
                    />
                  </ButtonBox>
                ))}
                <ButtonBtn className="filter_btn">
                  <Flex gap="5px" align="center">
                    <Text
                      color="var(--text-dull-color)"
                      type="h3"
                      weight={"bold"}
                      text={getCurrency()}
                    />
                    <Text
                      color="var(--text-dull-color)"
                      type="h3"
                      weight={"bold"}
                      text={formatPriceWithoutCurrency(0)}
                    />
                  </Flex>
                  -
                  <Flex gap="5px" align="center">
                    <Text
                      color="var(--text-dull-color)"
                      type="h3"
                      weight={"bold"}
                      text={getCurrency()}
                    />
                    <Text
                      color="var(--text-dull-color)"
                      type="h3"
                      weight={"bold"}
                      text={formatPriceWithoutCurrency(0)}
                    />
                  </Flex>
                </ButtonBtn>
              </Flex>
            </Flex>{" "}
          </FilterFlexBox>
        </FilterBox>
      )}
    </Box>
  );
}

export default MidListFilter;
