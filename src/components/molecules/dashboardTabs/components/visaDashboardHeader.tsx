import Flex from "src/components/atoms/flex";
import { Grid } from "src/components/atoms/grid";
import Input from "src/components/atoms/input";
import Text from "src/components/atoms/text";
import Section from "src/components/molecules/section";
import { useScreenResolution } from "hook/useScreenResolution";
import React, { useState } from "react";
import { BiSort } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";
import styled from "styled-components";

const DropdownContent = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  right: 0; /* Align to the right */
  background-color: #ffffff;
  border: 1px solid #e7e7e7;
  border-top: none;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 370px;
  height: 367px;
  z-index: 09999999;
  overflow-y: scroll;
  font-size: 16px;
  line-height: 19.2px;
`;

const StyledOption = styled.div<{ hovered: boolean; lastChild: boolean }>`
  display: flex;
  align-items: center;
  padding: 24px 18px;
  cursor: pointer;
  background-color: ${({ hovered }) => (hovered ? "#F3FAFD" : "transparent")};
  border-bottom: ${({ lastChild }) =>
    lastChild ? "none" : "1px solid #dedee3"};
`;

const OptionText = styled.div<{ hovered: boolean }>`
  color: ${({ hovered }) => (hovered ? "#6092A7" : "#7C7C7A")};
  font-weight: 400;
  flex: 1;
`;

// interface VisaDashboardHeaderProps {
//   headerText: string;
// }

function VisaDashboardHeader({ headerText }: { headerText: string }) {
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const sortOptions = [
    { value: "Option 1", label: "Awaiting Embassy Decision" },
    { value: "Option 2", label: "Awaiting Confirmation" },
    { value: "Option 3", label: "Application in Progress" },
    { value: "Option 4", label: "Visa Fees Required" },
    { value: "Option 5", label: "Awaiting Passport Collection" },
    { value: "Option 6", label: "Processing Fees Required" },
    { value: "Option 7", label: "Courier Fees Required" },
    { value: "Option 8", label: "Approved" },
    { value: "Option 9", label: "Declined" },
    { value: "Option 10", label: "Passport Physically Required" },
  ];

  const { isMobile } = useScreenResolution();

  if (isMobile) return <div></div>;

  return (
    <Flex justify="space-between" margin="1.5rem 0px" gap="0px">
      <Section>
        <Text type="h1" text={headerText} size={24} weight={600} />
      </Section>
      <Grid
        columns="73%  25%"
        gap=".8rem"
        style={{
          justifySelf: "flex-end",
        }}
      >
        <Flex
          justify="flex-start"
          align="center"
          border="1px solid #E7E7E7"
          padding="0px 10px"
          borderRadius="8px"
          borderBottom="1px solid #E7E7E7"
          width="100%"
          gap="10px"
        >
          <CiSearch size="1.5rem" color="#5C5C5C" width="20%" />
          <Section width="100%">
            <Input
              padding="0px"
              placeholder="Type here to search"
              styles={{
                border: "none",
              }}
            />
          </Section>
        </Flex>

        <Flex
          justify="space-between"
          align="center"
          border="1px solid #E7E7E7"
          borderRadius="8px"
          borderBottom="1px solid #e7e7e7"
          padding="0px 16px"
          styles={{ cursor: "pointer" }}
          onClick={toggleDropdown}
        >
          <BiSort size="1.5rem" color="#606060" />
          <Text
            type="h5"
            text="Sort By"
            weight={400}
            size={14}
            color="#606060"
          />
          <MdKeyboardArrowDown size="1.5rem" color="#606060" />
        </Flex>

        {isDropdownOpen && (
          <DropdownContent>
            {sortOptions.map((option, index) => (
              <StyledOption
                key={option.value}
                hovered={hoveredOption === index}
                lastChild={index === sortOptions.length - 1}
                onMouseEnter={() => setHoveredOption(index)}
                onMouseLeave={() => setHoveredOption(null)}
              >
                <OptionText hovered={hoveredOption === index}>
                  {option.label}
                </OptionText>
              </StyledOption>
            ))}
          </DropdownContent>
        )}
      </Grid>
    </Flex>
  );
}

export default VisaDashboardHeader;
