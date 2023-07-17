import styled from "styled-components";
import Text from "@atom/text";
import Flex from "@atom/flex";
import Button from "@atom/button";
import { ttColors } from "theme/colors";
import { AiFillPlusCircle } from "react-icons/ai";
import { RiEditBoxFill } from "react-icons/ri";
import { useScreenResolution } from "hook/useScreenResolution";

const AccountLeft = styled.div``;
const AccountRight = styled.div`
  display: flex;
  gap: 20px;
`;

const SectionTitle = styled.div`
  display: flex;

  & h2 {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    margin: 20px 0px 15px;
    line-height: 48px;

    color: ${ttColors.dark};
  }
`;

const AccountDetails = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(17, 34, 17, 0.05);
  border-radius: 16px;
  padding: 24px;
`;

const Account = () => {
  const { isMobile } = useScreenResolution();

  const AccountInformation = [
    {
      title: "Name",
      description: "John Deo",
      icon: <RiEditBoxFill size={isMobile ? ".8rem" : "1rem"} style={{ borderRadius: "4px" }} />,
      editable: true,
    },

    {
      title: "Email",
      description: "john.deo@gmail.com",
      icon: <AiFillPlusCircle size={isMobile ? ".8rem" : "1rem"} />,
      edit: "Add another email",
      editable: false,
    },

    {
      title: "Password",
      description: "********",
      icon: <RiEditBoxFill size={isMobile ? ".8rem" : "1rem"} style={{ borderRadius: "4px" }} />,
      editable: true,
    },

    {
      title: "Phone Number",
      description: "+1 000-000-0000",
      icon: <RiEditBoxFill size={isMobile ? ".8rem" : "1rem"} style={{ borderRadius: "4px" }} />,
      editable: true,
    },

    {
      title: "Address",
      description: "St 32, main downtown, Los Angeles, California, USA",
      icon: <RiEditBoxFill size={isMobile ? ".8rem" : "1rem"} style={{ borderRadius: "4px" }} />,
      editable: true,
    },

    {
      title: "Date of Birth",
      description: "01/01/1992",
      icon: <RiEditBoxFill size={isMobile ? ".8rem" : "1rem"} style={{ borderRadius: "4px" }} />,

      editable: false,
    },
  ];
  return (
    <>
      <SectionTitle>
        <Text type="h2" size={isMobile ? "16px" : "25px"} text="Account" />
      </SectionTitle>
      <AccountDetails>
        {AccountInformation.map((detail) => (
          <Flex
            justify="space-between"
            key={detail.title}
            gap="10px"
            margin={isMobile ? "0px" : "35px 0 0"}
          >
            <AccountLeft>
              <Text
                type="p"
                text={detail.title}
                size={isMobile ? "13px" : "25px"}
              />
              <Text
                type="h5"
                text={detail.description}
                weight="400"
                size={isMobile ? "14px" : "25px"}
              />
            </AccountLeft>

            <AccountRight>
              {detail.edit && (
                <Button
                  background="transparent"
                  border="1px solid var(--primary-color)"
                  color="var(--secondary-color)"
                  height={isMobile ? "40px" : "48px"}
                  width={isMobile ? "143px" : "175px"}
                  fontSize={isMobile ? "12px" : "14px"}
                  lineHeight="14px"
                  styles={{
                    gap: "10px",
                    marginBottom: isMobile ? "1.4rem" : "",
                  }}
                >
                  {detail.icon}
                  <Text type="p" text={"Add another email"} />
                </Button>
              )}
              {detail.editable && (
                <Button
                  background="transparent"
                  border="1px solid var(--primary-color)"
                  color="var(--secondary-color)"
                  height={isMobile ? "40px" : "48px"}
                  width={isMobile ? "100px" : "175px"}
                  fontSize={isMobile ? "12px" : "14px"}
                  lineHeight="14px"
                  styles={{
                    gap: "10px",
                    marginBottom: isMobile ? "1.4rem" : "",
                  }}
                >
                  {detail.icon}
                  <Text type="p" text={"Change"} />
                </Button>
              )}
            </AccountRight>
          </Flex>
        ))}

        {/* <Flex justify="space-between">
          <AccountLeft>
            <Text type="p" text="Email" />
            <Text type="h3" text="john.deo@gmail.com" size="20px" />
          </AccountLeft>
          <AccountRight>
            <Button
              background="transparent"
              border="1px solid var(--primary-color)"
              color="var(--secondary-color)"
              height="55px"
              width="255px"
              fontSize="17px"
              lineHeight="17px"
              styles={{ gap: "10px" }}
            >
              <AiFillPlusCircle size="1.5rem" />
              <Text type="h3" text="Add another email" />
            </Button>
            <Button
              background="transparent"
              border="1px solid var(--primary-color)"
              color="var(--secondary-color)"
              height="55px"
              width="140px"
              fontSize="17px"
              lineHeight="17px"
              styles={{ gap: "10px" }}
            >
              <RiEditBoxFill size="1.5rem" style={{ borderRadius: "4px" }} />
              <Text type="h3" text="Change" />
            </Button>
          </AccountRight>
        </Flex> */}
      </AccountDetails>
    </>
  );
};

export default Account;
