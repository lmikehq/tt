import React from "react";
import PropTypes from "prop-types";
import Flex from "@components/templates/flex";
import Image from "../atoms/image";
import Text from "../atoms/text";
import { GoDotFill } from "react-icons/go";
import Button from "../atoms/button";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { ttColors } from "theme/colors";
import styled from "styled-components";
import { StaticImageData } from "next/image";

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
            <Text type="h3" text={title} margin="0px 0px .8rem" />
            <Flex gap=".8rem">
              <Text
                type="p"
                text={date}
                color="#606060"
                weight={600}
                size={16}
                styles={{
                  letterSpacing: "0.1rem",
                }}
              />
              <Text
                type="p"
                text={time}
                color="#606060"
                weight={600}
                size={16}
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
        >
          <BiDotsVerticalRounded color="#040404" />
        </Button>
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
