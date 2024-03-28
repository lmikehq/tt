import Box from "@/components/molecules/section/box";

import Text from "@/components/atoms/text";

import BlogReusableModal from "./blog-reusable-modal";
import Input from "@/components/atoms/input";
import Button from "@/components/atoms/button";
import { useEffect, useState } from "react";
import Spinner from "@/components/molecules/icons/spinner";
import { ttColors } from "@/lib/theme/colors";
import styled from "styled-components";
import BlogFeedbackModal from "./feedback-reaction";
import Image from "@/components/atoms/image";
import { useBlogStore } from "@/lib/store/blog.store";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { rateHawkResourceClient } from "@/lib/axios/axios-client";
import { useSearchParams } from "next/navigation";
import { useUserStore } from "@/lib/store/useStore";
import apiService from "@/lib/extensions/hook/apiService";
import { checkIfFieldHasError, validateEmail } from "@/lib/utilFns";
import toast from "react-hot-toast";
import { AiFillCheckCircle } from "react-icons/ai";
import Section from "@/components/molecules/section";

const FieldLabel = styled.p`
     & span {
    color: red;
    margin-left:8px;
  }
`;

interface Props {
  open: boolean;
  onClose: () => void;
}
const LikeModal = ({ open, onClose}: Props) => {

  const [createForm, setCreateForm]= useState(false)
   const { isMobile } = useScreenResolution();
 const {setFeedbackModal} = useBlogStore(
        (state) => state);
         const [submitClicked, setSubmitClicked] = useState(false);
  const [errmessage, setErrorMessage]=useState("");
 const { setUser } = useUserStore((state) => state);
const searchParams = useSearchParams();

  const referrer = searchParams.get('refCode');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

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
    const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
   const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    referrer: typeof referrer === 'string' ? searchParams.get('refCode') : "",
    consent: true,
  });

      const [submissionState, setSubmissionState] = useState({
    loading: false,
    loadingGoogleAuth: false,
    error: [] as any,
    success: false,
  });

      useEffect(() => {
  setRegisterData({
    ...registerData,
    firstName:"",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: ""})
    if (submissionState.error.length > 0) {
      setSubmissionState({
        ...submissionState,
        error: [],
        loading:false
      });

    }
    setErrorMessage("")
    setSubmitClicked(false);
  }, [loginData, loginData]);

     async function handleLogin(): Promise<any> {
    return await apiService("/auth/login", "POST", {
      ...loginData,
      email: loginData.email.toLowerCase(),
    });
  }
async function handleRegister(): Promise<any> {
    const response = await apiService("/user", "POST", {
      ...registerData,
      email: registerData?.email?.toLowerCase(),
    });

    return response;
  }

   const handleSwitchForm = () => {
        setCreateForm(!createForm)
  };

  async function handleSubmitReg(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
setErrorMessage("");
 setSubmitClicked(true);
  if (!registerData.firstName || !registerData.lastName || !registerData.email || !registerData.phoneNumber) {
    setErrorMessage("Kindly fill all required fields");
    return;
  }

  if (submissionState.loading) return;
  setSubmissionState({ ...submissionState, loading: true });

  if (!validateEmail(registerData.email)) {
    setErrorMessage("Not a valid email");
    return;
  }

  if (registerData.password !== registerData.confirmPassword) {
    setErrorMessage("Passwords do not match");
    setSubmissionState({
      ...submissionState,
      loading: false,
    });
    return;
  }
  const passwordRequirements: string[] = [];
  if (!isPasswordValid(registerData.password, "length")) {
    passwordRequirements.push("at least 8 characters");
  }
  if (!isPasswordValid(registerData.password, "uppercaseLowercase")) {
    passwordRequirements.push("at least one uppercase letter and one lowercase letter");
  }
  if (!isPasswordValid(registerData.password, "number")) {
    passwordRequirements.push("at least one number");
  }
  if (!isPasswordValid(registerData.password, "specialCharacter")) {
    passwordRequirements.push("at least one special character");
  }

  if (passwordRequirements.length > 0) {
    setErrorMessage(`Password is not strong enough. It must have ${passwordRequirements.join(", ")}.`);
    setSubmissionState({
      ...submissionState,
      loading: false,
    });
    return;
  }

  try {
    const res = await handleRegister();

    if (res.statusCode === 400) {
      setSubmissionState({ ...submissionState, error: res.errors.message, loading: false });
    } else if (res.statusCode === 422) {
      setSubmissionState({ ...submissionState, error: [{ property: "email", constraints: res.errors.message }] });
    } else {
      onClose();
      setFeedbackModal(true);
        setSubmissionState({ ...submissionState, loading: false });
      toast.success("Your account has been created successfully!");
    }

     setTimeout(() => {
      setSubmitClicked(false);
    }, 2000);
  } catch (error) {
    setSubmissionState({ ...submissionState, loading: false });
    toast.error("Failed to create your account. Please try again.");
  }
}

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submissionState.loading) return;
    setSubmissionState({ ...submissionState, loading: true });
    const res = await handleLogin();

    if (res?.statusCode === 401) {
      setErrorMessage("Invalid email or password")
      return setSubmissionState({
        ...submissionState,
      
        loading: false,
      });
    } else if (res?.token) {
      setSubmissionState({
        ...submissionState,
        loading: true,
      });
      setUser(res?.user);
      window.localStorage.setItem('user', res?.token);
      rateHawkResourceClient.defaults.headers.common['Authorization'] = `Bearer ${res?.token}`;
       onClose();

      toast.success("You have successfully logged in!");

    } else {
      setErrorMessage("Something went wrong")
      setSubmissionState({
        ...submissionState,
    
        loading: false,
      });
    
      
    }
  }
  return (
    <BlogReusableModal
      open={open}
      onClose={onClose}
      description=""
      maxWidth="600px"
      width="60%"
    
    >
      <Box styles={{ padding:isMobile?"2rem 0 0 0":"6rem 0 0 0", position:"relative"}}>


{
  isMobile?null:  <Image src={"/assets/images/blog/ttlogo.svg"} alt="" styles={{height:"auto", maxWidth:"18.7%", position:"absolute", top:"-50%", left:"0%"}}/>
}
  
        <Text type="h1" text="Sign In or Sign Up to Interact with the Blog Articles." size={isMobile?22:26} weight={600}/>
        <p style={{margin:"10px 0 40px 0"}}>We noticed you attempted to interact with a blog article. Kindly Sign In or Sign Up to Thrillers Travels to interact fully with all the Blog Articles.</p>
      


   {createForm ? (
          <form onSubmit={handleSubmitReg}>
            <FieldLabel>First Name <span>*</span></FieldLabel>
        <Input placeholder="Enter your First Name"  
        onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        firstName: e.target.value,
                      })
                    }
                    value={registerData.firstName}
                   styles = {{ borderColor: !registerData.firstName && submitClicked ? '#FF8682' : '' }}
                    height="3rem"/>
                      {/* {checkIfFieldHasErrorMod("firstName") && (
                    <Text
                      type="p"
                      text={checkIfFieldHasErrorMod("firstName") || ""}
                      color="#FF8682"
                    />
                  )} */}
        <FieldLabel>Last Name <span>*</span></FieldLabel>
        <Input placeholder="Enter your Last Name" onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        lastName: e.target.value,
                      })
                    }
                    value={registerData.lastName}
                
                               styles = {{ borderColor: !registerData.lastName && submitClicked ? '#FF8682' : '' }}
                    height="3rem"
                  />
                  {/* {checkIfFieldHasErrorMod("firstName") && (
                    <Text
                      type="p"
                      text={checkIfFieldHasErrorMod("firstName") || ""}
                      color="#FF8682"
                    />
                  )} */}
                  <FieldLabel>Phone Number <span>*</span></FieldLabel>
        <Input placeholder="Enter your Phone Number"     onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        phoneNumber: e.target.value,
                      })
                    }
                           styles = {{ borderColor: !registerData.phoneNumber && submitClicked ? '#FF8682' : '' }}
                    height="3rem"
                    type="tel"
                    value={registerData.phoneNumber}
                  />
                  {/* {checkIfFieldHasErrorMod("phoneNumber") && (
                    <Text
                      type="p"
                      text={checkIfFieldHasErrorMod("phoneNumber") || ""}
                      color="#FF8682"
                    />
                  )} */}
                    <FieldLabel>Referral Code</FieldLabel>
        <Input placeholder="Enter your Refferal Code"  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      referrer: e.target.value,
                    })
                  }
                  height="3rem"
                  value={registerData?.referrer as string}/>
       <FieldLabel>Email Address <span>*</span></FieldLabel>
        <Input placeholder="Enter your Email Address" type="email"   onChange={(e) => {
                      setRegisterData({
                        ...registerData,
                        email: e.target.value,
                      });
                    }}
                    value={registerData.email}
                            styles = {{ borderColor: !registerData.email && submitClicked ? '#FF8682' : '' }}
                    height="3rem"
                  />
                
                  <FieldLabel>Password<span>*</span></FieldLabel>
        <Input placeholder="Enter your Password"    type="password"
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        password: e.target.value,
                      })
                    }
                             styles = {{ borderColor: !registerData.password && submitClicked ? '#FF8682' : '' }}
                    height="3rem"
                    value={registerData.password}
                  />
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
                      <div
                        key={option.value}
                        style={{
                          display: "flex",
                          alignItems: "center",
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
                        <span style={{ marginLeft: "0.5rem" }}>
                          {option.label}
                        </span>
                      </div>
                    ))}
               
             
                  </Section>
                )}
             <FieldLabel>Confirm Password<span>*</span></FieldLabel>
        <Input      type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => {
                    setRegisterData({
                      ...registerData,
                      confirmPassword: e.target.value,
                    })}}

                    styles = {{ borderColor: !registerData.password && submitClicked ? '#FF8682' : '' }}
                  height="3rem"
                  value={registerData.confirmPassword}
                   margin="0 0 26px 0"
                />
                {errmessage && (
                  <Text
                    type="p"
                    text={errmessage}
                    color="#FF8682"
                    margin="0 0 20px 0"
                  />
                )}
          </form>
        ) : (
          <div>
   <FieldLabel>Email Address <span>*</span></FieldLabel>
        <Input placeholder="Enter your Email Address"   onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    email: e.target.value,
                  })
                }
                value={loginData.email}
                  border={
                  checkIfFieldHasError(
                    submissionState?.error,
                    "email"
                  )
                    ? "1px solid #FF8682"
                    : ""
                }/>
        <FieldLabel>Password<span>*</span></FieldLabel>
        <Input placeholder="Enter your Password" styles={{margin:"0 0 26px 0"}}   onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    password: e.target.value,
                  })
                }
                value={loginData.password}
                
               />
              
          </div>
        )}
          {checkIfFieldHasError(
                submissionState?.error,
                "email"
              ) && (
                  <Text
                    type="p"
                    text={submissionState.error[0].constraints}
                    color="#FF8682"
                    margin={"0 0 20px 0"}
                  />
                )}

        <Button
          type="submit"
          width="100%"
          background={ttColors.dark}
          onClick={createForm?handleSubmitReg:handleSubmit}
        >
          {submissionState.loading ? (
            <Spinner size="40px" fill={ttColors.primary} />
          ) : (
            <Text type="p" text={createForm ? "Create Account" : "Login to your Account"} color="#fff" size="16px" weight={500} />
          )}
        </Button>

        <div style={{ display: "flex", flexDirection: "row", margin: "32px 0 30px 0", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
          <div style={{ width: "100%", border: "0.5px solid #CBD4E6" }}></div>
          <p style={{ color: "#7C8DB0" }}>or</p>
          <div style={{ width: "100%", border: "0.5px solid #CBD4E6" }}></div>
        </div>

        <Button
          type="submit"
          width="100%"
          border="1px solid #06062A"
          background={ttColors.defaultColor}
          onClick={() => {
            handleSwitchForm();
          }}
        >
       
            <Text type="p" text={createForm ? "Login to your account" : "Create Account"} color="#000000" size="16px" weight={500} />
     
        </Button>
      </Box>
    </BlogReusableModal >
  );
};

export default LikeModal;