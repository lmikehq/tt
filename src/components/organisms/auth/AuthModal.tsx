import { useState } from "react";
import CustomAppModal from "../modal/CustomAppModal";
import Section from "@/components/molecules/section";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";


const AuthModal = ({
    open,
    handleClose,
}: {
    open: boolean;
    handleClose: () => void;
}) => {
    const [loginView, setLoginView] = useState(true);
    return (
        <>
            <CustomAppModal open={open} handleClose={handleClose}>
                <Section width="100%" padding={"1.25rem 2.5rem"}>
                    {loginView ? (
                        <LoginForm
                            setLoginView={(value) => setLoginView(value)}
                            handleClose={handleClose}
                        />
                    ) : (
                        <SignUpForm
                            setLoginView={(value) => setLoginView(value)}
                            handleClose={handleClose}
                        />
                    )}
                </Section>
            </CustomAppModal>
        </>
    );
};

export default AuthModal;
