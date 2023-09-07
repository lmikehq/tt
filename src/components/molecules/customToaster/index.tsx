import Button from "@atom/button";
import Flex from "@components/templates/flex";
import Text from "@atom/text";
import Section from "src/components/molecules/section";
import { styled as custom } from "@mui/material";
import React from "react";
import { BiInfoCircle, BiX } from "react-icons/bi";
import { styled } from "styled-components";
import { ttColors } from "@lib/theme/colors";
// import { styled } from "styled-components";

interface CustomTosterProps {
  type: "warning" | "success" | "error";
  child: string | React.ReactNode;
}
const Container = styled.div`
  padding: 20px;
  background-color: white;
  max-width: 951px;
  border-radius: 12px;
  box-shadow: rgb(0 0 0 / 25%) 4px 4px 26px;
  margin: 1rem;
`;

const IconWrapper = custom("div")(({ bgColor }: { bgColor: string }) => ({
  height: "50px",
  width: "50px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: `${bgColor}`,
  borderRadius: "50%",
}));

const CustomToaster = ({ type, child }: CustomTosterProps) => {
  return (
    <Container>
      <Flex align="center" gap="24px">
        <Section height="unset" styles={{ flex: 0 }}>
          {(() => {
            if (type == "error")
              return (
                <IconWrapper bgColor={"#FFE4E9"}>
                  <BiInfoCircle size={36.35} color={ttColors.red} />
                </IconWrapper>
              );
            if (type == "success")
              return (
                <IconWrapper bgColor={""}>
                  <BiInfoCircle size={36.35} color="green" />
                </IconWrapper>
              );
            return <></>;
          })()}
        </Section>
        {typeof child == "string" ? (
          <Text type="p" size={16} weight={400} text={child} />
        ) : (
          child
        )}
        <Button
          width="fit-content"
          height="fit-content"
          background="transparent"
          padding="14px"
        >
          <BiX size={20} color="#929292" />
        </Button>
      </Flex>
    </Container>
  );
};

export default CustomToaster;
