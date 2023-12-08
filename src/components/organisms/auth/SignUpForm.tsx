"use client";

import Button from "@atom/button";
import CheckBox from "@molecule/checkbox";
import Flex from "@components/templates/flex";
import Input from "@atom/input";
import Link from "@atom/link";
import Text from "@atom/text";
import Spinner from "@molecule/icons/spinner";
import SectionLayout from "@components/templates/SectionLayout";

import { Grid } from "@components/templates/grid";
import SideBtn from "@molecule/sideBtn";

import sleep from "@lib/extensions/helpers/sleep";
import Section from "src/components/molecules/section";
import apiService from "@lib/extensions/hook/apiService";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { ttColors } from "@lib/theme/colors";
import { AiFillCheckCircle } from "react-icons/ai";
import { validateEmail } from "@/lib/utilFns";
import { useUserStore } from "@/lib/store/useStore";
import { useGoogleLogin } from "@react-oauth/google";
import { Divider } from "@mui/material";

interface AuthFormProps {
    setLoginView: (value: boolean) => void;
    handleClose: () => void;
}
const SignUpForm = ({ setLoginView, handleClose }: AuthFormProps) => {
    const [selectedOption, setSelectedOption] = useState("length");
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

    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const { isMobile } = useScreenResolution();

    const router = useRouter();
    const [registerData, setRegisterData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        referralCode: "",
        consent: false,
    });
    const { setUser } = useUserStore((state) => state);

    const [submissionState, setSubmissionState] = useState({
        loading: false,
        loadingGoogleAuth: false,
        error: [] as any,
        success: false,
    });
    async function handleRegister(): Promise<any> {
        const response = await apiService("/user", "POST", {
            ...registerData,
            email: registerData?.email?.toLowerCase(),
        });
        return response;
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (submissionState.loading) return;
        setSubmissionState({
            ...submissionState,
            loading: true,
        });
        if (!registerData.consent) {
            setSubmissionState({
                ...submissionState,
                loading: false,
            });
            return alert("Please agree to the terms and conditions");
        }
        if (!validateEmail(registerData.email)) {
            setSubmissionState({
                ...submissionState,
                error: [
                    {
                        constraints: "Not a valid email",
                        property: "email",
                    },
                ],
                loading: false,
            });
            return;
        }
        if (registerData.password !== registerData.confirmPassword) {
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
            });
            return;
        }

        const res = await handleRegister();
        if (res.statusCode === 400) {
            return setSubmissionState({
                ...submissionState,
                error: res.errors.message,
                loading: false,
            });
        } else if (res.statusCode === 422) {
            return setSubmissionState({
                ...submissionState,
                error: [{ property: "email", constraints: res.errors.message }],
            });
        }

        setSubmissionState({
            ...submissionState,
            loading: true,
        });
        toast.success("Your account has been created successfully!");
        handleClose();
    }
    const login = useGoogleLogin({
        onSuccess: async (credentialResponse) => {
            return await apiService("/auth/google", "POST", {
                token: credentialResponse.access_token,
            })
                .then(async (res) => {
                    if (res.statusCode === 401) return;
                    setSubmissionState({
                        ...submissionState,
                        loadingGoogleAuth: true,
                    });
                    setUser(res?.user);
                    toast.success("You have successfully logged in!");
                    handleClose();
                })
                .catch((error) => {});
        },
        onError: () => {},
    });
    function checkIfFieldHasError(field: string) {
        const error: { constraints: string } = submissionState?.error?.find(
            (err: any) => err.property.includes(field)
        );
        if (error) return error.constraints;
    }
    return (
        <Section width="100%">
            <Flex justify="space-between">
                <img
                    src={"/assets/images/brand/favicon.svg"}
                    alt="logo"
                    height={isMobile ? 45 : 60}
                    onClick={() => router.push("/")}
                    style={{ cursor: "pointer" }}
                />
            </Flex>
            <Text
                type="h1"
                text="Create your account!"
                margin={isMobile ? "1rem 0" : "1.75rem 0 0.75rem"}
                size={isMobile ? "18px" : "28px"}
                weight={600}
            />
            <Text
                type="p"
                text="Let’s get you all st up so you can access your personal account."
                size={isMobile ? "14px" : "17px"}
                weight={isMobile ? 300 : 400}
            />

            <Section
                margin={isMobile ? "1rem 0 0" : "3rem 0 0"}
                width={isMobile ? "100%" : "100%"}
            >
                <Section styles={{ marginBottom: "20px" }}>
                    <Text
                        type="p"
                        text="First Name"
                        size={isMobile ? "14.5px" : "18px"}
                        styles={{ marginBottom: "18px" }}
                        weight={400}
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
                            checkIfFieldHasError("firstName")
                                ? "1px solid #FF8682"
                                : ""
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
                <Section styles={{ marginBottom: "20px" }}>
                    <Text
                        type="p"
                        text="Last Name"
                        styles={{ marginBottom: "18px" }}
                        size={isMobile ? "14.5px" : "16px"}
                        weight={400}
                    />
                    <Input
                        placeholder="Enter your last name"
                        onChange={(e) =>
                            setRegisterData({
                                ...registerData,
                                lastName: e.target.value,
                            })
                        }
                        value={registerData.lastName}
                        border={
                            checkIfFieldHasError("lastName")
                                ? "1px solid #FF8682"
                                : ""
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

                <Section styles={{ marginBottom: "20px" }}>
                    <Text
                        type="p"
                        text="Email"
                        styles={{ marginBottom: "18px" }}
                        size={isMobile ? "14.5px" : "16px"}
                        weight={400}
                    />
                    <Input
                        placeholder="Enter you email"
                        type="email"
                        onChange={(e) => {
                            setRegisterData({
                                ...registerData,
                                email: e.target.value,
                            });
                            setSubmissionState({
                                ...submissionState,
                                error: [
                                    {
                                        constraints: "",
                                        property: "email",
                                    },
                                ],
                                loading: false,
                            });
                        }}
                        value={registerData.email}
                        border={
                            checkIfFieldHasError("email")
                                ? "1px solid #FF8682"
                                : ""
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
                <Section styles={{ marginBottom: "20px" }}>
                    <Text
                        type="p"
                        text="Phone Number"
                        styles={{ marginBottom: "18px" }}
                        size={isMobile ? "14.5px" : "16px"}
                        weight={400}
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
                            checkIfFieldHasError("phoneNumber")
                                ? "1px solid #FF8682"
                                : ""
                        }
                        height="3rem"
                        type="tel"
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

                <Section styles={{ marginBottom: "20px" }}>
                    <Text
                        type="p"
                        text="Password"
                        styles={{ marginBottom: "18px" }}
                        size={isMobile ? "14.5px" : "16px"}
                        weight={400}
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
                                checkIfFieldHasError("password")
                                    ? "1px solid #FF8682"
                                    : ""
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
                </Section>
                <Section styles={{ marginBottom: "20px" }}>
                    <Text
                        type="p"
                        text="Confirm Password"
                        styles={{ marginBottom: "18px" }}
                        size={isMobile ? "14.5px" : "16px"}
                        weight={400}
                    />
                    <Input
                        type="password"
                        placeholder="Confirm Password"
                        onChange={(e) => {
                            setRegisterData({
                                ...registerData,
                                confirmPassword: e.target.value,
                            });
                            setSubmissionState({
                                ...submissionState,
                                error: [
                                    {
                                        constraints: "",
                                        property: "confirmPassword",
                                    },
                                    {
                                        constraints: "",
                                        property: "password",
                                    },
                                    ...submissionState.error,
                                ],
                            });
                        }}
                        border={
                            checkIfFieldHasError("confirmPassword")
                                ? "1px solid #FF8682"
                                : ""
                        }
                        height="3rem"
                        value={registerData.confirmPassword}
                    />
                    {checkIfFieldHasError("confirmPassword") && (
                        <Text
                            type="p"
                            text={checkIfFieldHasError("confirmPassword") || ""}
                            color="#FF8682"
                        />
                    )}
                </Section>
                <Section styles={{ marginBottom: "24px" }}>
                    <Text
                        type="p"
                        text="Referral Code"
                        styles={{ marginBottom: "18px" }}
                        size={isMobile ? "14.5px" : "16px"}
                        weight={400}
                    />
                    <Input
                        placeholder="Enter your referral code"
                        onChange={(e) =>
                            setRegisterData({
                                ...registerData,
                                referralCode: e.target.value,
                            })
                        }
                        height="3rem"
                        value={registerData.referralCode}
                    />
                </Section>

                <Flex align="center" justify="space-between">
                    <Flex align="center">
                        <CheckBox
                            onChange={(x) =>
                                setRegisterData({
                                    ...registerData,
                                    consent: x.target.checked,
                                })
                            }
                            checked={registerData.consent}
                        >
                            <p
                                style={{
                                    fontSize: isMobile ? "14px" : "14px",
                                    color: "#1C1B1F",
                                }}
                            >
                                I agree to all the&nbsp;
                                <span
                                    style={{
                                        color: "#a0001d",
                                        fontWeight: "400",
                                    }}
                                >
                                    <Link
                                        href="/privacy-policy"
                                        text="Terms"
                                        color="#a0001d"
                                        style={{ fontWeight: "400" }}
                                    />
                                </span>
                                &nbsp;and&nbsp;
                                <span
                                    style={{
                                        color: "#a0001d",
                                        fontWeight: "400",
                                    }}
                                >
                                    <Link
                                        href="/privacy-policy"
                                        text=" Privacy Policies"
                                        color="#a0001d"
                                        style={{ fontWeight: "400" }}
                                    />
                                </span>
                            </p>
                        </CheckBox>
                    </Flex>
                </Flex>

                <Button
                    width="100%"
                    margin="3.5rem 0 1rem"
                    background={
                        submissionState.loading ? "#87ceeb36" : ttColors.primary
                    }
                    onClick={handleSubmit}
                >
                    {submissionState.loading ? (
                        <Spinner size="40px" fill={ttColors.primary} />
                    ) : (
                        <Text
                            type="p"
                            text="Create account"
                            color={ttColors.dark}
                            size={isMobile ? "16px" : "14px"}
                            weight={600}
                        />
                    )}
                </Button>
                <Flex align="center" gap=".5rem" justify="center">
                    <Text
                        type="p"
                        text="Already have an account?"
                        size={isMobile ? "14px" : "14px"}
                    />

                    <Button
                        onClick={() => setLoginView(true)}
                        background="transparent"
                        width="fit-content"
                    >
                        {" "}
                        <Text
                            type="p"
                            text="Sign in"
                            color={ttColors.red}
                            whiteSpace="nowrap"
                            cursor="pointer"
                            size={isMobile ? "14px" : "14px"}
                            weight={500}
                        />
                    </Button>
                </Flex>

                <Flex
                    justify="center"
                    align="center"
                    width="100%"
                    margin="1.5rem 0"
                    height="2rem"
                    styles={{ position: "relative" }}
                >
                    <Divider
                        sx={{
                            width: "100%",
                            color: "#112211",
                            position: "absolute",
                            zIndex: 1,
                        }}
                    />
                    <Flex
                        background={ttColors.light}
                        height={"25px"}
                        width="fit-content"
                        align="center"
                        justify="center"
                        position="absolute"
                        styles={{ zIndex: 10 }}
                    >
                        <Text
                            type="p"
                            text="or"
                            size={18}
                            margin="0 1rem"
                            color={ttColors.grey}
                        />
                    </Flex>
                </Flex>
                <Button
                    onClick={login}
                    background="transparent"
                    border={`1px solid ${ttColors.primary}`}
                    width="100%"
                >
                    {submissionState.loadingGoogleAuth ? (
                        <Spinner size="40px" fill={ttColors.primary} />
                    ) : (
                        <Flex align="center">
                            <img
                                src={"/assets/images/google.svg"}
                                alt="google"
                                height="30"
                                width={30}
                            />
                            <Text
                                type="p"
                                size={14}
                                weight={600}
                                text="Sign up With Google"
                                color="#19013b"
                                margin="0px 0px 0px .5rem"
                            />
                        </Flex>
                    )}
                </Button>
            </Section>
        </Section>
    );
};

export default SignUpForm;
