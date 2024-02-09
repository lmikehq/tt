import Button from "@atom/button";
import Flex from "@components/templates/flex";
import Text from "@atom/text";
import Section from "src/components/molecules/section";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import { useState } from "react";
import { AiFillCheckCircle, AiFillPlusCircle } from "react-icons/ai";
import { RiEditBoxFill } from "react-icons/ri";
import { useUserStore } from "@lib/store/useStore";
import styled from "styled-components";
import { ttColors } from "@lib/theme/colors";
import AddressModal from "../accountAddress";
import PasswordModal from "../accountPassword";
import PhoneModal from "../accountPhone";
import { BiSolidPencil } from "react-icons/bi";
import Input from "@atom/input";
import toast from "react-hot-toast";
import apiService from "@lib/extensions/hook/apiService";
import { useAccountDashboard } from "@/lib/hooks/dashboard/account.hook";
import { AuthUser } from "@/lib/types/response-models/auth/auth.type";
import Spinner from "../../icons/spinner";
import { useFormik } from "formik";
import * as yup from 'yup';
import { ErrorText } from "@/components/organisms/fieldInput";

const AccountLeft = styled.div``;
const AccountRight = styled.div`
    display: flex;
    gap: 20px;
`;

const AccountDetails = styled.div`
    background: #ffffff;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
  const [loading, setLoading] = useState(false);
  // from here
  const [openAddAddressModal, setOpenAddAddressModal] = useState(false);
  const [openChangePasswordModal, setOpenChangePasswordModal] =
    useState(false);
  const [openChangePhoneModal, setOpenChangePhoneModal] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  // refactor the modal here
  // const [openModal, setOpenModal] = useState();
  const [passwordBtnLoading, setPasswordBtnLoading] = useState(false);


  const validationOptions = [
    { value: "length", label: "8 or more characters" },
    { value: "uppercaseLowercase", label: "Uppercase & Lowercase" },
    { value: "number", label: "At least one number" },
    {
      value: "specialCharacter",
      label: "Have Numbers, and Special symbols (e.g., !, @, #, $)",
    },
  ];

  function isPasswordValid(password: string, selectedOption: string) {
    switch (selectedOption) {
      case "length":
        return password.length >= 8;
      case "uppercaseLowercase":
        return /[A-Z]/.test(password) && /[a-z]/.test(password);
      case "number":
        return /\d/.test(password);
      case "specialCharacter":
        return /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);
      default:
        return false;
    }
  }

  // passwordConfirmation: Yup.string()
  //   .oneOf([Yup.ref('password'), null], 'Passwords must match')
  const [confirmPassword, setConfirmPassword] = useState("");
  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    },
    validationSchema: yup.object().shape({
      currentPassword: yup.string().required("Current password is required"),
      newPassword: yup.string().required("New Password is required"),
      confirmPassword: yup.string().oneOf([yup.ref("newPassword")], 'Passwords must match').required("Field cannot be empty"),
    }),
    onSubmit(values, formikHelpers) {
      updateUserPassword();
    },
  });

  const [isMobileEdit, setIsMobileEdit] = useState(false);
  const [isPasswordEdit, setIsPasswordEdit] = useState(false);
  // const [editedInfo, setEditedInfo] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   phoneNumber: "",
  //   address: "",
  // });

  const [isSaving, setIsSaving] = useState(false); // Define setIsSaving
  const [error, setError] = useState(null);

  const toggleMobileEdit = () => {
    setIsMobileEdit(!isMobileEdit);
  };

  const togglePasswordEdit = () => {
    setIsPasswordEdit(!isPasswordEdit);
  };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setRegisterData({
  //     ...registerData,
  //     [name]: value,
  //   });
  // };

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

  const { data, isLoading, refetch } = useAccountDashboard();
  const user: AuthUser = data as AuthUser;

  const formik = useFormik({
    initialValues: {
      phoneNumber: user?.phoneNumber,
      address: user?.address
    },
    validationSchema: yup.object().shape({
      phoneNumber: yup.string().required("Phone Number is required"),
      address: yup.string().required("Address is required")
    }),
    onSubmit: async (values, formikHelpers) => {
      // console.log({ values });
    },

  });

  const [registerData, setRegisterData] = useState({
    phoneNumber: user?.phoneNumber || "",
    currentPassword: "",
    newPassword: "",
    address: user?.address || "",
    // DOB: user?.dateOfBirth || "",
    consent: false,
  });

  const AccountInformation = [
    {
      title: "Name",
      description: user?.firstName + " " + user?.lastName,
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
      description: user?.email || "No email added",
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

    // {
    //   title: "Date of Birth",
    //   description: "Not set",
    //   icon: (
    //     <RiEditBoxFill
    //       size={isMobile ? ".8rem" : "1rem"}
    //       style={{ borderRadius: "4px" }}
    //     />
    //   ),

    //   editable: false,
    // },
  ];

  const [submissionState, setSubmissionState] = useState({
    loading: false,
    error: [] as any,
    success: false,
  });
  async function handleUserUpdate(): Promise<any> {
    setLoading(true);
    const response = await apiService("/user/update", "POST", {
      phoneNumber: formik?.values?.phoneNumber?.length > 0 ? formik?.values?.phoneNumber : user?.phoneNumber,
      address: formik?.values?.address?.length > 0 ? formik?.values?.address : user?.address
    });

    refetch();

    return response;
  }

  const updateUserPassword = async () => {

    const options = ['length', 'uppercaseLowercase', 'specialCharacter', 'number'];
    const isValid = options.map((option) => {
      return isPasswordValid(passwordFormik.values.newPassword, option);
    });
    if (isValid.includes(false)) return;

    setPasswordBtnLoading(true);
    try {

      const response = await apiService("/auth/change-password", "POST", {
        currentPassword: passwordFormik?.values.currentPassword,
        newPassword: passwordFormik.values.newPassword
      });

      setPasswordBtnLoading(false);
      toast.success(response?.message || 'Password Updated');
    } catch (err) {
      setPasswordBtnLoading(false);
      toast.error("");
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await handleUserUpdate();
    if (res.statusCode === 400) {
      setLoading(false);
      return setSubmissionState({
        ...submissionState,
        error: res.errors.message,
        loading: false,
      });
    } else if (res.statusCode === 422) {
      setLoading(false);
      return setSubmissionState({
        ...submissionState,
        error: [{ property: "email", constraints: res.errors.message }],
      });
    }

    setLoading(false);
    setSubmissionState({
      ...submissionState,
      loading: true,
    });
    toast.success("Your details has been updated successfully!");

  }
  function checkIfFieldHasError(field: string) {
    const error: { constraints: string; } = submissionState?.error?.find(
      (err: any) => err.property.includes(field)
    );
    if (error) return error.constraints;
  }


  // CHECK IF USER DATA IS LOADING
  if (isLoading) {
    return (
      <Flex height="450px" align="center" justify="center">
        <Spinner size="60px" fill={ttColors.blackishBlue} />
      </Flex>
    );
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
      <Flex
        margin="2.5rem 0px 0px"
        justify="space-between"
        align="center"
      >
        <Text type="h1" text="Account" size={20} weight={600} />
        <BiSolidPencil onClick={toggleMobileEdit} style={{ display: isMobile ? 'block' : 'none' }} />
      </Flex>

      {isMobile ? (
        <>
          <form onSubmit={handleSubmit}>
            <Flex direction="column" gap="1rem">
              <Flex gap="1rem">
                <Section>
                  <Text
                    type="p"
                    text="First Name"
                    margin={
                      isMobile
                        ? ".7rem  0 .2rem"
                        : "1rem 0 .5rem"
                    }
                    size={isMobile ? "14.5px" : "16px"}
                  />
                  <Input
                    placeholder="Enter your first name"
                    readOnly={true}
                    value={user?.firstName}
                    color={ttColors.lighterGray}
                    border={
                      checkIfFieldHasError("firstName")
                        ? "1px solid #FF8682"
                        : ""
                    }
                    styles={{
                      fontFamily: 'poppins'
                    }}
                    height="3rem"
                  />
                  {checkIfFieldHasError("firstName") && (
                    <Text
                      type="p"
                      text={
                        checkIfFieldHasError("firstName") ||
                        ""
                      }
                      color="#FF8682"
                    />
                  )}
                </Section>

                <Section>
                  <Text
                    type="p"
                    text="Last Name"
                    margin={
                      isMobile
                        ? ".7rem  0 .2rem"
                        : "1rem 0 .5rem"
                    }
                    size={isMobile ? "14.5px" : "16px"}
                  />
                  <Input
                    placeholder="Enter your last name"
                    readOnly={true}
                    color={ttColors.lighterGray}
                    value={user?.lastName}
                    border={
                      checkIfFieldHasError("lastName")
                        ? "1px solid #FF8682"
                        : ""
                    }
                    styles={{
                      fontFamily: 'poppins'
                    }}
                    height="3rem"
                  />
                  {checkIfFieldHasError("lastName") && (
                    <Text
                      type="p"
                      text={
                        checkIfFieldHasError("lastName") ||
                        ""
                      }
                      color="#FF8682"
                    />
                  )}
                </Section>
              </Flex>

              <Section>
                <Text
                  type="p"
                  text="Email"
                  margin={
                    isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"
                  }
                  size={isMobile ? "14.5px" : "16px"}
                />
                <Input
                  placeholder="Enter you email"
                  type="email"
                  color={ttColors.lighterGray}
                  readOnly={true}
                  value={user?.email}
                  border={
                    checkIfFieldHasError("email")
                      ? "1px solid #FF8682"
                      : ""
                  }
                  styles={{
                    fontFamily: 'poppins'
                  }}
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

              {isMobileEdit ? (
                <Section>
                  <Text
                    type="p"
                    text="Phone Number"
                    // readOnly={true}
                    margin={
                      isMobile ? ".7rem 0 .2rem" : "1rem 0 .5rem"
                    }
                    size={isMobile ? "14.5px" : "16px"}
                  />
                  <Input
                    placeholder="Enter your phone number"
                    readOnly={isMobileEdit ? false : true}
                    onChange={formik.handleChange}
                    name="phoneNumber"
                    styles={{
                      fontFamily: 'poppins'
                    }}
                    border={
                      checkIfFieldHasError("phoneNumber")
                        ? "1px solid #FF8682"
                        : ""
                    }
                    height="3rem"
                    type="number"
                    value={formik?.values.phoneNumber}
                  />
                  {checkIfFieldHasError("phoneNumber") && (
                    <Text
                      type="p"
                      text={
                        checkIfFieldHasError("phoneNumber") ||
                        ""
                      }
                      color="#FF8682"
                    />
                  )}
                </Section>
              ) : (
                <Section>
                  <Text
                    type="p"
                    text="Phone Number"
                    // readOnly={true}
                    margin={
                      isMobile ? ".7rem 0 .2rem" : "1rem 0 .5rem"
                    }
                    size={isMobile ? "14.5px" : "16px"}
                  />
                  <Input
                    placeholder="Enter your phone number"
                    readOnly={true}
                    name="phoneNumber"
                    styles={{
                      fontFamily: 'poppins'
                    }}
                    border={
                      checkIfFieldHasError("phoneNumber")
                        ? "1px solid #FF8682"
                        : ""
                    }
                    height="3rem"
                    type="number"
                    value={user?.phoneNumber}
                  />
                  {checkIfFieldHasError("phoneNumber") && (
                    <Text
                      type="p"
                      text={
                        checkIfFieldHasError("phoneNumber") ||
                        ""
                      }
                      color="#FF8682"
                    />
                  )}
                </Section>
              )}

              {isMobileEdit ? (
                <Section>
                  <Text
                    type="p"
                    text="Address"
                    margin={
                      isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"
                    }
                    size={isMobile ? "14.5px" : "16px"}
                  />
                  <Input
                    placeholder={user?.address}
                    readOnly={isMobileEdit ? false : true}
                    name="address"
                    onChange={(e) =>
                      formik.handleChange(e)
                    }
                    border={
                      checkIfFieldHasError("address")
                        ? "1px solid #FF8682"
                        : ""
                    }
                    styles={{
                      fontFamily: 'poppins'
                    }}
                    height="3rem"
                    type="text"
                    value={isMobileEdit ? formik.values.address : user?.address}
                  />
                  {checkIfFieldHasError("address") && (
                    <Text
                      type="p"
                      text={checkIfFieldHasError("address") || ""}
                      color="#FF8682"
                    />
                  )}
                </Section>
              ) : (
                <Section>
                  <Text
                    type="p"
                    text="Address"
                    margin={
                      isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"
                    }
                    size={isMobile ? "14.5px" : "16px"}
                  />
                  <Input
                    placeholder="Enter your address"
                    readOnly={true}
                    border={
                      checkIfFieldHasError("address")
                        ? "1px solid #FF8682"
                        : ""
                    }
                    styles={{
                      fontFamily: 'poppins'
                    }}
                    height="3rem"
                    type="text"
                    value={user?.address}
                  />
                  {checkIfFieldHasError("address") && (
                    <Text
                      type="p"
                      text={checkIfFieldHasError("address") || ""}
                      color="#FF8682"
                    />
                  )}
                </Section>
              )}

              {/* <Section>
              <Text
                type="p"
                text="Date Of Birth"
                margin={
                  isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"
                }
                size={isMobile ? "14.5px" : "16px"}
              />
              <Input
                placeholder="DD-MM-YYYY"
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    DOB: e.target.value,
                  })
                }
                border={
                  checkIfFieldHasError("dateOfBirth")
                    ? "1px solid #FF8682"
                    : ""
                }
                height="3rem"
                type="text"
                value={user?.dateOfBirth ? user.dateOfBirth : registerData.DOB}
              />
              {checkIfFieldHasError("dateOfBirth") && (
                <Text
                  type="p"
                  text={
                    checkIfFieldHasError("dateOfBirth") ||
                    ""
                  }
                  color="#FF8682"
                />
              )}
            </Section> */}
            </Flex>

            {isMobileEdit ? (
              <Flex align="center" gap="12px" margin="1.5rem 0">
                <Button background="transparent" border={`1px solid ${ttColors.dark}`} width="50%" onClick={() => setIsMobileEdit(false)}>
                  <Text type="p" text="Cancel" color={ttColors.dark} />
                </Button>
                <Button
                  background={ttColors.dark}
                  type="submit"
                  disabled={isMobileEdit ? false : true}
                  width="50%"
                  styles={{
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  {loading ? (
                    <Spinner size="40px" fill={ttColors.primary} />
                  ) : (
                    <Text type="p" text={isSaving ? "Saving..." : "Save"} color="#fff" size="16px" weight={500} />
                  )}

                </Button>
              </Flex>
            ) : ''}

          </form>

          <form onSubmit={updateUserPassword}>
            <Section>
              <Flex
                margin="2.5rem 0px 0px"
                justify="space-between"
                align="center">
                <Text type="h1" text="Change Password" size={20} weight={600} />
                <BiSolidPencil onClick={togglePasswordEdit} style={{ display: isMobile ? 'block' : 'none' }} />
              </Flex>
            </Section>

            <Section margin="10px 0">
              <Text
                type="p"
                text="Current Password"
                margin={
                  isMobile ? "2rem 0 .2rem" : "1rem 0 .5rem"
                }
              />
              <Input
                placeholder="Current Password"
                type="password"
                readOnly={isPasswordEdit ? false : true}
                name="currentPassword"
                // onChange={(e) => {

                //   setConfirmPassword(e.target.value);
                //   setRegisterData({
                //     ...registerData,
                //     currentPassword: e.target.value,
                //   });
                // }}

                // border={
                //   checkIfFieldHasError("confirmPassword")
                //     ? "1px solid #FF8682"
                //     : ""
                // }
                onBlur={formik.handleBlur}
                onChange={passwordFormik.handleChange}
                height="3rem"
                // value={confirmPassword}
                value={passwordFormik.values.currentPassword}
              />
              {isPasswordEdit && passwordFormik?.touched?.currentPassword && <ErrorText text={passwordFormik && passwordFormik?.errors?.currentPassword!} />}
              {/* {checkIfFieldHasError("confirmPassword") && (
                <Text
                  type="p"
                  text={
                    checkIfFieldHasError(
                      "confirmPassword"
                    ) || ""
                  }
                  color="#FF8682"
                />
              )} */}
            </Section>

            <Section margin="10px 0">
              <Text
                type="p"
                text="New Password"
                margin={
                  isMobile ? "2rem 0 .2rem" : "1rem 0 .5rem"
                }
              />
              <div
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
              >
                <Input
                  placeholder="Enter New Password"
                  type="password"
                  readOnly={isPasswordEdit ? false : true}
                  // onChange={(e) =>
                  //   setRegisterData({
                  //     ...registerData,
                  //     newPassword: e.target.value,
                  //   })
                  // }
                  // border={
                  //   checkIfFieldHasError("password")
                  //     ? "1px solid #FF8682"
                  //     : ""
                  // }
                  height="3rem"
                  // value={registerData.newPassword}
                  onBlur={passwordFormik.handleBlur}
                  onChange={passwordFormik.handleChange}
                  name="newPassword"
                  value={passwordFormik.values.newPassword}
                />
                {isPasswordEdit && passwordFormik?.touched?.newPassword && <ErrorText text={passwordFormik && passwordFormik?.errors?.newPassword!} />}
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
                          registerData.newPassword,
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
                            registerData.newPassword,
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

            <Section margin="10px 0">
              <Text
                type="h1"
                text="Confirm New Password"
                size={16}
                margin={
                  isMobile ? "2rem 0 .2rem" : "1rem 0 .5rem"
                }
              />

              <Input
                placeholder="Current Password"
                type="password"
                readOnly={isPasswordEdit ? false : true}
                // onChange={(e) => {
                //   setConfirmPassword(e.target.value);
                //   setRegisterData({
                //     ...registerData,
                //     currentPassword: e.target.value,
                //   });
                // }}

                // border={
                //   checkIfFieldHasError("confirmPassword")
                //     ? "1px solid #FF8682"
                //     : ""
                // }
                // value={confirmPassword}
                onChange={passwordFormik.handleChange}
                name="confirmPassword"
                onBlur={passwordFormik.handleBlur}
                value={passwordFormik.values.confirmPassword}
                height="3rem"
              />
              {isPasswordEdit && passwordFormik?.touched?.confirmPassword && <ErrorText text={passwordFormik && passwordFormik?.errors?.confirmPassword!} />}
            </Section>

            {isPasswordEdit ? (
              <Flex align="center" gap="12px" margin="2.5rem 0">
                <Button background="transparent" border={`1px solid ${ttColors.dark}`} width="50%" onClick={() => {
                  setIsPasswordFocused(false);
                  setIsPasswordEdit(false);
                }}>
                  <Text type="p" text="Cancel" color={ttColors.dark} />
                </Button>
                <Button
                  width="50%"
                  background={ttColors.dark}
                  // type="submit"
                  disabled={isSaving}
                  styles={{
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                  onClick={() => passwordFormik.handleSubmit()}
                >
                  {passwordBtnLoading ? (
                    <Spinner size="40px" fill={ttColors.primary} />
                  ) : (
                    <Text type="p" text={isSaving ? "Saving..." : "Save"} color="#fff" size="16px" weight={500} />
                  )}

                </Button>
              </Flex>
            ) : ('')}

          </form>
        </>
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
                      fontSize={
                        isMobile ? "12px" : "14px"
                      }
                      lineHeight="14px"
                      styles={{
                        gap: "10px",
                        marginBottom: isMobile
                          ? "1.4rem"
                          : "",
                        display: isMobile
                          ? "none"
                          : "block",
                      }}
                      onClick={
                        detail.title === "Name"
                          ? undefined // Disable the "Edit" button for Name
                          : detail.title === "Address"
                            ? handleOpenAddAddressModal
                            : detail.title ===
                              "Password"
                              ? handleOpenChangePasswordModal
                              : detail.title ===
                                "Phone Number"
                                ? handleOpenChangePhoneModal
                                : undefined // Handle other modals
                      }
                    >
                      {detail.icon}
                      <Text
                        type="p"
                        size={14}
                        text={detail.edit}
                      />
                    </Button>
                  )}
                  {detail.editable && (
                    <Button
                      background="transparent"
                      border="1px solid var(--primary-color)"
                      color="var(--secondary-color)"
                      height={isMobile ? "40px" : "48px"}
                      width={isMobile ? "100px" : "105px"}
                      fontSize={
                        isMobile ? "12px" : "14px"
                      }
                      lineHeight="14px"
                      onClick={
                        detail.title === "Name"
                          ? undefined // Disable the "Edit" button for Name
                          : detail.title === "Address"
                            ? handleOpenAddAddressModal
                            : detail.title ===
                              "Password"
                              ? handleOpenChangePasswordModal
                              : detail.title ===
                                "Phone Number"
                                ? handleOpenChangePhoneModal
                                : undefined // Handle other modals
                      }
                      styles={{
                        gap: "10px",
                        marginBottom: isMobile
                          ? "1.4rem"
                          : "",
                        display: isMobile
                          ? "none"
                          : "flex",
                      }}
                    >
                      {detail.icon}
                      <Text
                        type="p"
                        size={14}
                        text={"Edit"}
                      />
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
              refetch={refetch}
            />
            <AddressModal
              open={openAddAddressModal}
              onClose={handleCloseAddAddressModal}
              refetch={refetch}
            />
            <PhoneModal
              open={openChangePhoneModal}
              onClose={handleCloseChangePhoneModal}
              refetch={refetch}
            />
          </AccountDetails>
        </AccountWrapper>
      )}
    </Section>
  );
};

export default Account;

