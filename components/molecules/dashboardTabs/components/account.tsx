import styled from "styled-components";
import Text from "@atom/text";
import Flex from "@atom/flex";
import Button from "@atom/button";
import { ttColors } from "theme/colors";
import { AiFillPlusCircle } from "react-icons/ai";
import {RiEditBoxFill} from "react-icons/ri"

const AccountWrapper = styled.div``;
const AccountLeft = styled.div``;
const AccountRight = styled.div`
display: flex;
gap: 10px;
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
    /* identical to box height */

    color: ${ttColors.dark};
  }
`;

const AccountDetails = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(17, 34, 17, 0.05);
  border-radius: 16px;
  padding: 32px 24px;
  `;


const Account = () => {
    const AccountInformation = [
      {
        title: "Name",
        description: "John Deo",
        icon: <RiEditBoxFill size="1rem" style={{ borderRadius: "4px" }} />,
        change: "Change",
      },

      {
        title: "Email",
        description: "john.deo@gmail.com",
        icon: <AiFillPlusCircle size="1rem" />,
        edit: "Add another email",
        change: "Change",
      },

      {
        title: "Password",
        description: "********",
        icon: <RiEditBoxFill size="1rem" style={{ borderRadius: "4px" }} />,
        change: "Change",
      },

      {
        title: "Phone Number",
        description: "+1 000-000-0000",
        icon: <RiEditBoxFill size="1rem" style={{ borderRadius: "4px" }} />,
        change: "Change",
      },

      {
        title: "Address",
        description: "St 32, main downtown, Los Angeles, California, USA",
        icon: <RiEditBoxFill size="1rem" style={{ borderRadius: "4px" }} />,
        change: "Change",
      },

      {
        title: "Date of Birth",
        description: "01/01/1992",
        icon: <RiEditBoxFill size="1rem" style={{ borderRadius: "4px" }} />,
        change: "Change",
      },
    ];
  return (
    <AccountWrapper>
      <SectionTitle>
        <Text type="h2" size="25px" text="Account" />
      </SectionTitle>
      <AccountDetails>
        {AccountInformation.map((detail) => (
          <Flex justify="space-between" key={detail.title} gap="10px">
            <AccountLeft>
              <Text type="p" text={detail.title} />
              <Text type="h5" text={detail.description} weight="400" size="19px" />
            </AccountLeft>
            <AccountRight>
              {detail.edit && (
                <Button
                  background="transparent"
                  border="1px solid var(--primary-color)"
                  color="var(--secondary-color)"
                  height="48px"
                  width="175px"
                  fontSize="14px"
                  lineHeight="14px"
                  styles={{ gap: "10px" }}
                >
                  {detail.icon}
                  <Text type="p" text={"Add another email"} />
                </Button>
              )}
              <Button
                background="transparent"
                border="1px solid var(--primary-color)"
                color="var(--secondary-color)"
                height="48px"
                width="114px"
                fontSize="14px"
                lineHeight="14px"
                styles={{ gap: "10px", marginBottom: "35px" }}
              >
                {detail.icon}
                <Text type="p" text={detail.change} />
              </Button>
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
    </AccountWrapper>
  );
};

export default Account;
