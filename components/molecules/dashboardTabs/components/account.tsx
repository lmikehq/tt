import styled from "styled-components";
import Text from "@atom/text";
import Flex from "@atom/flex";
import Button from "@atom/button";
import { ttColors } from "theme/colors";
import { AiFillPlusCircle } from "react-icons/ai";
import { RiEditBoxFill } from "react-icons/ri";
import { useScreenResolution } from "hook/useScreenResolution";
import ReusableModal from "./dashboardModal";
import { useState } from "react";
import Section from "@molecule/section";
import Input from "@atom/input";

const AccountLeft = styled.div``;
const AccountRight = styled.div`
  display: flex;
  gap: 20px;
`;


const AccountDetails = styled.div`
  background: #ffffff;
  border-radius: 16px;
`;

const AccountWrapper = styled.div`
  background: ${ttColors.defaultColor};
  align-items: center;
  margin-top: 15px;

  @media screen and (max-width: 900px) {
    height: fit-content;
    padding: 20px 16px;
  }
`;

const Account = () => {
  const { isMobile } = useScreenResolution();

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  // from here
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddEmailModal, setOpenAddEmailModal] = useState(false);
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleOpenAddAddressModal = () => {
    setOpenAddAddressModal(true);
    setOpenModal(true);
  };

  const handleCloseAddEmailModal = () => {
    setOpenAddEmailModal(false);
  };

  const handleOpenChangePasswordModal = () => {
    setOpenChangePasswordModal(true);
    setOpenModal(true);
  };

  const handleCloseChangePasswordModal = () => {
    setOpenChangePasswordModal(false);
  };
  // To here

  const AccountInformation = [
    {
      title: "Name",
      description: "John Deo",
      icon: (
        <RiEditBoxFill
          size={isMobile ? ".8rem" : "1rem"}
          style={{ borderRadius: "4px" }}
        />
      ),
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
      icon: (
        <RiEditBoxFill
          size={isMobile ? ".8rem" : "1rem"}
          style={{ borderRadius: "4px" }}
        />
      ),
      editable: true,
    },

    {
      title: "Phone Number",
      description: "+1 000-000-0000",
      icon: (
        <RiEditBoxFill
          size={isMobile ? ".8rem" : "1rem"}
          style={{ borderRadius: "4px" }}
        />
      ),
      editable: true,
    },

    {
      title: "Address",
      description: "St 32, main downtown, Los Angeles, California, USA",
      icon: (
        <RiEditBoxFill
          size={isMobile ? ".8rem" : "1rem"}
          style={{ borderRadius: "4px" }}
        />
      ),
      editable: true,
    },

    {
      title: "Date of Birth",
      description: "01/01/1992",
      icon: (
        <RiEditBoxFill
          size={isMobile ? ".8rem" : "1rem"}
          style={{ borderRadius: "4px" }}
        />
      ),

      editable: false,
    },
  ];
  return (
    <Section
      margin="2rem 0"
      styles={{
        background: "#fff",
        borderRadius: "14px",
        padding: ".25rem 1.5rem",
      }}
    >
      <Section margin="2.5rem 0px 0px">
        <Text type="h1" text="Account" size={24} weight={600} />
      </Section>

      <AccountWrapper>
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
                  size={isMobile ? "13px" : "16px"}
                  color="#112211"
                  weight="400"
                />
                <Text
                  type="h5"
                  text={detail.description}
                  weight="600"
                  size={isMobile ? "14px" : "20px"}
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
                    onClick={
                      detail.title === "Name"
                        ? undefined // Disable the "Edit" button for Name
                        : detail.title === "Address"
                        ? handleOpenAddAddressModal
                        : detail.title === "Password"
                        ? handleOpenChangePasswordModal
                        : undefined // Handle other modals
                    }
                  >
                    {detail.icon}
                    <Text type="p" text={detail.edit} />
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
                    onClick={
                      detail.title === "Name"
                        ? undefined // Disable the "Edit" button for Name
                        : detail.title === "Address"
                        ? handleOpenAddAddressModal
                        : detail.title === "Password"
                        ? handleOpenChangePasswordModal
                        : undefined // Handle other modals
                    }
                    styles={{
                      gap: "10px",
                      marginBottom: isMobile ? "1.4rem" : "",
                    }}
                  >
                    {detail.icon}
                    <Text type="p" text={"Edit"} />
                  </Button>
                )}
              </AccountRight>
            </Flex>
          ))}

          <ReusableModal
            open={openModal}
            onClose={handleCloseModal}
            headerText="Upload Document"
            description="Secure your account: Change your password"
          >
            {/* Additional content goes here */}
            <Section>
              <Text
                type="p"
                text="Enter Current Password"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
              />
              <Input placeholder="******" height="3rem" type="password" />
            </Section>
            <Section>
              <Text
                type="p"
                text="Enter New Password"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
              />
              <Input placeholder="******" height="3rem" type="password" />
            </Section>
            <Section margin="1rem 0px 1.5rem">
              <Text
                type="p"
                text="Confirm New Password"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
              />
              <Input placeholder="******" height="3rem" type="password" />
            </Section>
          </ReusableModal>
        </AccountDetails>
      </AccountWrapper>
    </Section>
  );
};

export default Account;
