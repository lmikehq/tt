import Button from "@atom/button";
import Flex from "@components/templates/flex";
import Text from "@atom/text";
import Section from "src/components/molecules/section";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { RiEditBoxFill } from "react-icons/ri";
import { useUserStore } from "@lib/store/useStore";
import styled from "styled-components";
import { ttColors } from "@lib/theme/colors";
import AddressModal from "../accountAddress";
import PasswordModal from "../accountPassword";
import PhoneModal from "../accountPhone";

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
  margin: 1rem 0px 2rem;

  @media screen and (max-width: 900px) {
    height: fit-content;
    padding: 20px 16px;
  }
`;

const Account = () => {
  const { isMobile } = useScreenResolution();

  // from here
  const [openAddAddressModal, setOpenAddAddressModal] = useState(false);
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
  const [openChangePhoneModal, setOpenChangePhoneModal] = useState(false);

  const handleOpenAddAddressModal = () => {
    setOpenAddAddressModal(true);
  };

  const handleCloseAddAddressModal = () => {
    setOpenAddAddressModal(false);
  };

  const handleOpenChangePasswordModal = () => {
    setOpenChangePasswordModal(true);
  };

  const handleCloseChangePasswordModal = () => {
    setOpenChangePasswordModal(false);
  };
  const handleOpenChangePhoneModal = () => {
    setOpenChangePhoneModal(true);
  };

  const handleCloseChangePhoneModal = () => {
    setOpenChangePhoneModal(false);
  };
  // To here

  const { user } = useUserStore((state) => state);
  const AccountInformation = [
    {
      title: "Name",
      description: user.firstName + " " + user.lastName,
      icon: (
        <RiEditBoxFill
          size={isMobile ? ".8rem" : "1rem"}
          style={{ borderRadius: "4px" }}
        />
      ),
      editable: false,
    },

    {
      title: "Email",
      description: user.email,
      icon: <AiFillPlusCircle size={isMobile ? ".8rem" : "1rem"} />,
      edit: "",
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
      description: user?.phoneNumber,
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
      description: user?.address || "No address added",
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
      description: user?.dateOfBirth ? user?.dateOfBirth : "Not set",
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
        <Text type="h1" text="Account" size={20} weight={600} />
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
                  size={isMobile ? "10px" : "15px"}
                  color="#112211"
                  weight="300"
                />
                <Text
                  type="h5"
                  text={detail.description}
                  weight="400"
                  size={isMobile ? "12px" : "18px"}
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
                        : detail.title === "Phone Number"
                        ? handleOpenChangePhoneModal
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
                        : detail.title === "Phone Number"
                        ? handleOpenChangePhoneModal
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

                {/* {detail.title === "Email" && (
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
                    onClick={
                      detail.title === "Email"
                        ? undefined 
                        : detail.title === "Address"
                        ? handleOpenAddAddressModal
                        : detail.title === "Password"
                        ? handleOpenChangePasswordModal
                        : detail.title === "Phone Number"
                        ? handleOpenChangePhoneModal
                        : undefined 
                    }
                  >
                    <RiEditBoxFill
                      size={isMobile ? ".8rem" : "1rem"}
                      style={{ borderRadius: "4px" }}
                    />
                    <Text type="p" text={"Edit"} />
                  </Button>
                )} */}
              </AccountRight>
            </Flex>
          ))}

          {/* <ReusableModal
            open={openModal}
            onClose={handleCloseModal}
            headerText="Upload Document"
            description="Secure your account: Change your password"
          >
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
          </ReusableModal> */}

          <PasswordModal
            open={openChangePasswordModal}
            onClose={handleCloseChangePasswordModal}
          />
          <AddressModal
            open={openAddAddressModal}
            onClose={handleCloseAddAddressModal}
          />
          <PhoneModal
            open={openChangePhoneModal}
            onClose={handleCloseChangePhoneModal}
          />
        </AccountDetails>
      </AccountWrapper>
    </Section>
  );
};

export default Account;
