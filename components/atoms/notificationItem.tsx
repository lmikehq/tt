import React, { useState } from "react";
import PropTypes from "prop-types";
import Flex from "./flex";
import Image from "./image";
import Text from "./text";
import { GoDotFill } from "react-icons/go";
import Button from "./button";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { ttColors } from "theme/colors";
import styled from "styled-components";
import { StaticImageData } from "next/image";
import { IoCheckmarkSharp } from "react-icons/io5";
import { TfiBrushAlt } from "react-icons/tfi";

const History = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  width: 100%;
  height: fit-content;
  padding: 0px 10px;
  border: 1px solid #e7e7e7;
  border-radius: 14px;

  & div {
    // margin-left: 15px;

    @media screen and (max-width: 390px) {
      margin-left: 0px;
    }
  }

  & p {
    font-weight: 400;
    line-height: 20px;
    color: ${ttColors.dark};
    opacity: 0.7;
  }

  & h3 {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: ${ttColors.dark};
  }
`;

const DropdownContent = styled.div`
  position: absolute;
  top: calc(90.5% + 5px);
  right: 23px;
  background-color: #ffffff;
  border: 1px solid #e7e7e7;
  border-radius: 12px;
  // box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 306px;
  height: max-content;
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
  color: ${({ hovered }) => (hovered ? "#6092A7" : "#101010")};
  font-weight: 400;
  flex: 1;
`;


interface NotificationItemProps {
  src: StaticImageData;
  title: string;
  date: string;
  time: string;
  showDot?: boolean;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  src,
  title,
  date,
  time,
  showDot,
}) => {

  const [hoveredOption, setHoveredOption] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const sortOptions = [
    {
      value: "Option 1",
      label: "Mark all as read",
      icon: <IoCheckmarkSharp size="1rem" color="#040404" />,
    },
    {
      value: "Option 2",
      label: "Clear Notifications",
      icon: <TfiBrushAlt size="1rem" color="#040404" />,
    },
  ];
    return (
      <History>
        <Flex
          justify="space-between"
          width="100%"
          gap="20px"
          align="center"
          padding="28px 24px"
        >
          <Flex gap="1.5rem" align="center">
            <Image src={src} alt="" />
            <div>
              <Text type="h3" text={title} weight={500} size={20} margin="0px 0px .8rem" />
              <Flex gap=".8rem">
                <Text
                  type="p"
                  text={date}
                  color="#606060"
                  weight={500}
                  size={14}
                  styles={{
                    letterSpacing: "0.1rem",
                  }}
                />
                <Text
                  type="p"
                  text={time}
                  color="#606060"
                  weight={500}
                  size={14}
                  styles={{
                    letterSpacing: "0.1rem",
                  }}
                />
              </Flex>
            </div>
            {showDot && <GoDotFill color="#7BBBD6" />}
          </Flex>

          <Button
            height="43px"
            width="43px"
            styles={{ marginLeft: "55px" }}
            background="transparent"
            border="1px solid #B6B6B6"
            onClick={toggleDropdown}
          >
            <BiDotsVerticalRounded color="#040404" size="1.5rem" />
          </Button>
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
                    <Flex gap="1rem">
                      {option.icon}
                      {option.label}
                    </Flex>
                  </OptionText>
                </StyledOption>
              ))}
            </DropdownContent>
          )}
        </Flex>
      </History>
    );
};

NotificationItem.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  showDot: PropTypes.bool,
};

export default NotificationItem;
