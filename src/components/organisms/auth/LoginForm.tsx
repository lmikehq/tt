import Text from "@/components/atoms/text";
import CheckBox from "@/components/molecules/checkbox";
import Spinner from "@/components/molecules/icons/spinner";
import Section from "@/components/molecules/section";
import SideBtn from "@/components/molecules/sideBtn";
import Flex from "@/components/templates/flex";
import Button from "@atom/button";

import { ttColors } from "@/lib/theme/colors";
import { checkIfFieldHasError } from "@/lib/utilFns";
import { Divider } from "@mui/material";
import Link from "next/link";
import router from "next/router";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { useUserStore } from "@/lib/store/useStore";
import { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import apiService from "@/lib/extensions/hook/apiService";
import toast from "react-hot-toast";
import Input from "@/components/atoms/input";
import { rateHawkResourceClient } from "@/lib/axios/axios-client";

interface AuthFormProps {
    setLoginView: (value: boolean) => void;
    handleClose: () => void;
}
const LoginForm = ({ setLoginView, handleClose }: AuthFormProps) => {
    const { isMobile } = useScreenResolution();
    const { setUser } = useUserStore((state) => state);
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    const [inputType, setInputType] = useState('password')

    const [submissionState, setSubmissionState] = useState({
        loading: false,
        loadingGoogleAuth: false,
        error: [] as any,
        success: false,
    });
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

    async function handleLogin(): Promise<any> {
        return await apiService("/auth/login", "POST", {
            ...loginData,
            email: loginData.email.toLowerCase(),
        });
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (submissionState.loading) return;
        setSubmissionState({ ...submissionState, loading: true });
        const res = await handleLogin();

        if (res?.statusCode === 401) {
            return setSubmissionState({
                ...submissionState,
                error: [
                    {
                        constraints: "Invalid email or password",
                        property: "email",
                    },
                    {
                        constraints: "Invalid email or password",
                        property: "password",
                    },
                ],
                loading: false,
            });
        } else if (res?.token) {
            setSubmissionState({
                ...submissionState,
                loading: true,
            });
            
            setUser(res?.user);
            window.localStorage.setItem('user', res?.token)
            rateHawkResourceClient.defaults.headers.common['Authorization'] = `Bearer ${res?.token}`

            toast.success("You have successfully logged in!");
            handleClose();
        } else {
            setSubmissionState({
                ...submissionState,
                error: [
                    { constraints: "something went wrong", property: "email" },
                    {
                        constraints: "something went wrong",
                        property: "password",
                    },
                ],
                loading: false,
            });
        }
    }
    useEffect(() => {
        if (submissionState.error.length > 0) {
            setSubmissionState({
                ...submissionState,
                error: [],
            });
        }
    }, [loginData, loginData]);

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
                text="Log Into your Account"
                margin={isMobile ? "1rem 0" : "1.75rem 0 0.75rem"}
                size={isMobile ? "18px" : "24px"}
                weight={600}
            />
            <Text
                type="p"
                text="Log into your account to explore the world with Thrillers Travels"
                size={isMobile ? "14px" : "16px"}
                weight={isMobile ? 300 : 400}
            />
            <Section
                margin={isMobile ? "1rem 0 0" : "3rem 0 0"}
                width={isMobile ? "100%" : "100%"}
            >
                <Section styles={{ marginBottom: "20px" }}>
                    <Text
                        type="p"
                        text="Email Address"
                        size={isMobile ? "14px" : "16px"}
                        styles={{ marginBottom: "18px" }}
                        weight={400}
                    />
                    <Input
                        placeholder="Enter your email address"
                        height="3rem"
                        border={
                            checkIfFieldHasError(
                                submissionState?.error,
                                "email"
                            )
                                ? "1px solid #FF8682"
                                : ""
                        }
                        onChange={(e) =>
                            setLoginData({
                                ...loginData,
                                email: e.target.value,
                            })
                        }
                        value={loginData.email}
                    />
                </Section>
                <Section styles={{ marginBottom: "1.5rem" }}>
                    <Text
                        type="p"
                        text="Password"
                        styles={{ marginBottom: "18px" }}
                        size={isMobile ? "14px" : "16px"}
                        weight={400}
                    />
                    <Input
                        placeholder="******"
                        height="3rem"
                        type="password"
                        border={
                            checkIfFieldHasError(
                                submissionState?.error,
                                "password"
                            )
                                ? "1px solid #FF8682"
                                : ""
                        }
                        onChange={(e) =>
                            setLoginData({
                                ...loginData,
                                password: e.target.value,
                            })
                        }
                        value={loginData.password}
                    />
                    {checkIfFieldHasError(submissionState?.error, "email") && (
                        <Text
                            type="p"
                            text={submissionState.error[0].constraints}
                            color="#FF8682"
                            margin={"0.5rem 0 0"}
                        />
                    )}
                </Section>
                <Flex align="center" justify="space-between" wrap="wrap" gap='1rem'>
                    <Flex align="center">
                        <CheckBox
                            checked={loginData.rememberMe}
                            onChange={() => {
                                setLoginData({
                                    ...loginData,
                                    rememberMe: !loginData.rememberMe,
                                });
                            }}
                        >
                            <Text
                                type="p"
                                text="Remember me"
                                size={isMobile ? "14px" : "14px"}
                            />
                        </CheckBox>
                    </Flex>
                    <Link
                        href="/auth/forgot-password"
                        style={{ textDecoration: "none" }}
                    >
                        <Text
                            type="p"
                            text="Forgot password?"
                            color={ttColors.red}
                            whiteSpace="nowrap"
                            cursor="pointer"
                            size={isMobile ? "14px" : "14px"}
                            weight={500}
                        />
                    </Link>
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
                            text="Login"
                            color={ttColors.dark}
                            size={isMobile ? "16px" : "14px"}
                            weight={600}
                        />
                    )}
                </Button>
                <Flex align="center" gap=".5rem" justify="center">
                    <Text
                        type="p"
                        text="Do not have an account?"
                        size={isMobile ? "14px" : "14px"}
                    />

                    <Button
                        onClick={() => setLoginView(false)}
                        background="transparent"
                        width="fit-content"
                    >
                        <Text
                            type="p"
                            text="Sign up"
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
                                text="Login With Google"
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

export default LoginForm;
