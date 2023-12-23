import Button from "@atom/button"
import Flex from "@components/templates/flex"
import Text from "@atom/text"
import Section from "src/components/molecules/section"
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution"
import { useState } from "react"
import { AiFillCheckCircle, AiFillPlusCircle } from "react-icons/ai"
import { RiEditBoxFill } from "react-icons/ri"
import { useUserStore } from "@lib/store/useStore"
import styled from "styled-components"
import { ttColors } from "@lib/theme/colors"
import AddressModal from "../accountAddress"
import PasswordModal from "../accountPassword"
import PhoneModal from "../accountPhone"
import { BiSolidPencil } from "react-icons/bi"
import Input from "@atom/input"
import toast from "react-hot-toast"
import apiService from "@lib/extensions/hook/apiService"
import sleep from "@lib/extensions/helpers/sleep"
import Center from "@components/templates/center"

const AccountLeft = styled.div``
const AccountRight = styled.div`
  display: flex;
  gap: 20px;
`

const AccountDetails = styled.div`
  background: #ffffff;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const AccountWrapper = styled.div`
  background: ${ttColors.defaultColor};
  align-items: center;
  margin: 1rem 0px 2rem;

  @media screen and (max-width: 900px) {
    height: fit-content;
    padding: 20px 16px;
  }
`

const Account = () => {
  const { isMobile } = useScreenResolution()

  // from here
  const [openAddAddressModal, setOpenAddAddressModal] = useState(false)
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false)
  const [openChangePhoneModal, setOpenChangePhoneModal] = useState(false)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)

  const validationOptions = [
    { value: "length", label: "8 or more characters" },
    { value: "uppercaseLowercase", label: "Uppercase & Lowercase" },
    { value: "number", label: "At least one number" },
    {
      value: "specialCharacter",
      label: "Have Numbers, and Special symbols (e.g., !, @, #, $)",
    },
  ]

  function isPasswordValid(password: string, selectedOption: string) {
    switch (selectedOption) {
      case "length":
        return password.length >= 8
      case "uppercaseLowercase":
        return /[A-Z]/.test(password) && /[a-z]/.test(password)
      case "number":
        return /\d/.test(password)
      case "specialCharacter":
        return /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)
      default:
        return false
    }
  }

  const [confirmPassword, setConfirmPassword] = useState("")

  const [isMobileEdit, setIsMobileEdit] = useState(false)
  // const [editedInfo, setEditedInfo] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   phoneNumber: "",
  //   address: "",
  // });

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    address: "",
    dateOfBirth: "",
    consent: false,
  })

  const [isSaving, setIsSaving] = useState(false) // Define setIsSaving
  const [error, setError] = useState(null)

  const toggleMobileEdit = () => {
    setIsMobileEdit(!isMobileEdit)
  }

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setRegisterData({
  //     ...registerData,
  //     [name]: value,
  //   });
  // };

  const handleOpenAddAddressModal = () => {
    setOpenAddAddressModal(true)
  }

  const handleCloseAddAddressModal = () => {
    setOpenAddAddressModal(false)
  }

  const handleOpenChangePasswordModal = () => {
    setOpenChangePasswordModal(true)
  }

  const handleCloseChangePasswordModal = () => {
    setOpenChangePasswordModal(false)
  }
  const handleOpenChangePhoneModal = () => {
    setOpenChangePhoneModal(true)
  }

  const handleCloseChangePhoneModal = () => {
    setOpenChangePhoneModal(false)
  }
  // To here

  const { user } = useUserStore((state) => state)
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
      description: user.email || "No email added",
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
      description: user?.phoneNumber || "No phone number added",
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
  ]

  const [submissionState, setSubmissionState] = useState({
    loading: false,
    error: [] as any,
    success: false,
  })
  async function handleRegister(): Promise<any> {
    const response = await apiService("/user", "POST", {
      ...registerData,
      email: registerData?.email?.toLowerCase(),
    })
    return response
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (submissionState.loading) return
    setSubmissionState({
      ...submissionState,
      loading: true,
    })
    if (!registerData.consent) {
      setSubmissionState({
        ...submissionState,
        loading: false,
      })
      return alert("Please agree to the terms and conditions")
    }

    if (registerData.password !== confirmPassword) {
      setSubmissionState({
        ...submissionState,
        error: [
          {
            constraints: "Password do not match",
            property: "confirmPassword",
          },
          {
            constraints: "Password do not match",
            property: "password",
          },
        ],
        loading: false,
      })
      return
    }

    const res = await handleRegister()
    if (res.statusCode === 400) {
      return setSubmissionState({
        ...submissionState,
        error: res.errors.message,
        loading: false,
      })
    } else if (res.statusCode === 422) {
      return setSubmissionState({
        ...submissionState,
        error: [{ property: "email", constraints: res.errors.message }],
      })
    }

    setSubmissionState({
      ...submissionState,
      loading: true,
    })
    toast.success("Your details has been updated successfully!")
    await sleep(3000)
    toast.loading("Redirecting to login page...", {
      duration: 3000,
    })
  }
  function checkIfFieldHasError(field: string) {
    const error: { constraints: string } = submissionState?.error?.find(
      (err: any) => err.property.includes(field)
    )
    if (error) return error.constraints
  }
  return (
    <Section
      margin="2rem 0"
      styles={{
        background: "#fff",
        borderRadius: "14px",
        padding: ".25rem 1.5rem",
      }}
    >
      {isMobile ? (
        <Flex margin="2.5rem 0px 0px" justify="space-between" align="center">
          <Text type="h1" text="Account" size={20} weight={600} />
          <BiSolidPencil onClick={toggleMobileEdit} />
        </Flex>
      ) : null}


      {isMobileEdit ? (
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="1rem">
            <Flex gap="1rem">
              <Section>
                <Text
                  type="p"
                  text="First Name"
                  margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                  size={isMobile ? "14.5px" : "16px"}
                />
                <Input
                  placeholder="Enter your first name"
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      firstName: e.target.value,
                    })
                  }
                  value={registerData.firstName}
                  border={
                    checkIfFieldHasError("firstName") ? "1px solid #FF8682" : ""
                  }
                  height="3rem"
                />
                {checkIfFieldHasError("firstName") && (
                  <Text
                    type="p"
                    text={checkIfFieldHasError("firstName") || ""}
                    color="#FF8682"
                  />
                )}
              </Section>

              <Section>
                <Text
                  type="p"
                  text="Last Name"
                  margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                  size={isMobile ? "14.5px" : "16px"}
                />
                <Input
                  placeholder="Enter your first name"
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      lastName: e.target.value,
                    })
                  }
                  value={registerData.lastName}
                  border={
                    checkIfFieldHasError("lastName") ? "1px solid #FF8682" : ""
                  }
                  height="3rem"
                />
                {checkIfFieldHasError("lastName") && (
                  <Text
                    type="p"
                    text={checkIfFieldHasError("lastName") || ""}
                    color="#FF8682"
                  />
                )}
              </Section>
            </Flex>

            <Section>
              <Text
                type="p"
                text="Email"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                size={isMobile ? "14.5px" : "16px"}
              />
              <Input
                placeholder="Enter you email"
                type="email"
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    email: e.target.value,
                  })
                }
                value={registerData.email}
                border={
                  checkIfFieldHasError("email") ? "1px solid #FF8682" : ""
                }
                height="3rem"
              />
              {checkIfFieldHasError("email") && (
                <Text
                  type="p"
                  text={checkIfFieldHasError("email") || ""}
                  color="#FF8682"
                />
              )}
            </Section>

            <Section>
              <Text
                type="p"
                text="Password"
                margin={isMobile ? ".7rem 0 .2rem" : "1rem 0 .5rem"}
              />
              <div
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
              >
                <Input
                  placeholder="Enter your password"
                  type="password"
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      password: e.target.value,
                    })
                  }
                  border={
                    checkIfFieldHasError("password") ? "1px solid #FF8682" : ""
                  }
                  height="3rem"
                  value={registerData.password}
                />
              </div>

              {isPasswordFocused && (
                <Section margin="1rem 0px 0px">
                  <Text
                    type="h1"
                    text="Your Password must have the following."
                    size={16}
                    weight={500}
                    styles={{
                      margin: "0px 0px .9rem 0px",
                      lineHeight: "1.5rem",
                    }}
                  />
                  {validationOptions.map((option) => (
                    <Flex
                      align="center"
                      key={option.value}
                      styles={{
                        marginBottom: "0.5rem",
                        fontSize: "16px",
                        fontWeight: 400,
                        color: isPasswordValid(
                          registerData.password,
                          option.value
                        )
                          ? "#000000"
                          : "#000000",
                      }}
                    >
                      <AiFillCheckCircle
                        size="1.5rem"
                        style={{
                          color: isPasswordValid(
                            registerData.password,
                            option.value
                          )
                            ? "#7BBBD6"
                            : "#B6B6B6",
                        }}
                      />
                      <span>{option.label}</span>
                    </Flex>
                  ))}
                </Section>
              )}
            </Section>

            <Section>
              <Text
                type="p"
                text="Confirm Password"
                margin={isMobile ? ".7rem 0 .2rem" : "1rem 0 .5rem"}
              />
              <Input
                placeholder="Confirm your password"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                border={
                  checkIfFieldHasError("confirmPassword")
                    ? "1px solid #FF8682"
                    : ""
                }
                height="3rem"
                value={confirmPassword}
              />
              {checkIfFieldHasError("confirmPassword") && (
                <Text
                  type="p"
                  text={checkIfFieldHasError("confirmPassword") || ""}
                  color="#FF8682"
                />
              )}
            </Section>

            <Section>
              <Text
                type="p"
                text="Phone Number"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                size={isMobile ? "14.5px" : "16px"}
              />
              <Input
                placeholder="Enter your phone number"
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    phoneNumber: e.target.value,
                  })
                }
                border={
                  checkIfFieldHasError("phoneNumber") ? "1px solid #FF8682" : ""
                }
                height="3rem"
                type="number"
                value={registerData.phoneNumber}
              />
              {checkIfFieldHasError("phoneNumber") && (
                <Text
                  type="p"
                  text={checkIfFieldHasError("phoneNumber") || ""}
                  color="#FF8682"
                />
              )}
            </Section>

            <Section>
              <Text
                type="p"
                text="Address"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                size={isMobile ? "14.5px" : "16px"}
              />
              <Input
                placeholder="Enter your address"
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    address: e.target.value,
                  })
                }
                border={
                  checkIfFieldHasError("address") ? "1px solid #FF8682" : ""
                }
                height="3rem"
                type="text"
                value={registerData.address}
              />
              {checkIfFieldHasError("address") && (
                <Text
                  type="p"
                  text={checkIfFieldHasError("address") || ""}
                  color="#FF8682"
                />
              )}
            </Section>

            <Section>
              <Text
                type="p"
                text="Date Of Birth"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                size={isMobile ? "14.5px" : "16px"}
              />
              <Input
                placeholder="DD-MM-YYYY"
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    dateOfBirth: e.target.value,
                  })
                }
                border={
                  checkIfFieldHasError("dateOfBirth") ? "1px solid #FF8682" : ""
                }
                height="3rem"
                type="text"
                value={registerData.dateOfBirth}
              />
              {checkIfFieldHasError("dateOfBirth") && (
                <Text
                  type="p"
                  text={checkIfFieldHasError("dateOfBirth") || ""}
                  color="#FF8682"
                />
              )}
            </Section>
          </Flex>

          <Center>
            <Button
              type="submit"
              disabled={isSaving}
              margin="1rem 0px 1.5rem"
              styles={{ justifyContent: "center", alignContent: "center" }}
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </Center>
        </form>
      ) : (
        <AccountWrapper>
          <AccountDetails>
            {AccountInformation.map((detail) => (
              <Flex
                justify="space-between"
                key={detail.title}
                gap={isMobile ? "1.5rem" : "10px"}
                margin={isMobile ? "0px" : "35px 0 0"}
              >
                <AccountLeft>
                  <Text
                    type="p"
                    text={detail.title}
                    size={isMobile ? "16px" : "15px"}
                    color="#112211"
                    weight="300"
                  />
                  <Text
                    type="h5"
                    text={detail.description}
                    weight={isMobile ? "600" : "400"}
                    size={isMobile ? "16px" : "18px"}
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
                        display: isMobile ? "none" : "block",
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
                      <Text type="p" size={14} text={detail.edit} />
                    </Button>
                  )}
                  {detail.editable && (
                    <Button
                      background="transparent"
                      border="1px solid var(--primary-color)"
                      color="var(--secondary-color)"
                      height={isMobile ? "40px" : "48px"}
                      width={isMobile ? "100px" : "105px"}
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
                        display: isMobile ? "none" : "flex",
                      }}
                    >
                      {detail.icon}
                      <Text type="p" size={14} text={"Edit"} />
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
      )}
    </Section>
  )
}

export default Account
