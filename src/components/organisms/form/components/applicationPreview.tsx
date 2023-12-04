import { Box, Stack } from "@mui/material";
import React, { useState } from "react";
import Modal from "../../modal";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import Text from "@/components/atoms/text";
import Accordion, { AccordionProps } from "@mui/material/Accordion";
import { styled } from "@mui/material/styles";
import { ttColors } from "@/lib/theme/colors";
import CheckBox from "@/components/molecules/checkbox";
import Button from "@/components/atoms/button";
import One from "./previewSteps/one";
import {
    DetailsKeys,
    DocumentInterface,
    EducationDetailsInterface,
    EmploymentDetailsInterface,
    FamilyInfoInterface,
    PersonalInfoInterface,
} from "@/lib/types";
import Flex from "@/components/templates/flex";

export const StyledAccordion = styled((props: AccordionProps) => (
    <Accordion
        disableGutters={false}
        elevation={0}
        className="hello-accordion"
        {...props}
    />
))(() => ({
    "&::before": {
        content: '""',
        border: "none",
        borderTop: `2px dotted ${ttColors.lightestGray}`,
        backgroundColor: "transparent",
    },
    ".MuiAccordionSummary-root": {
        paddingLeft: "0px",
        paddingRight: "0px",
        width: "100%",
    },
    ".MuiAccordion-root": {
        width: "100%",
    },
}));

interface DetailProps {
    name: string;
    value: string;
    width?: string;
}
export function Detail({ name, value, width }: DetailProps) {
    return (
        <Flex direction="column" width={width ?? "25%"} gap="0.5rem">
            <Text text={name} type="p" size={14} />
            <Text text={value} type="p" size={16} weight={600} />
        </Flex>
    );
}

interface ApplicationPreviewProps {
    isOpen: boolean;
    onClose: () => void;
    applicationDetails: DetailsKeys;
    personalInfo: PersonalInfoInterface;
    familyMembers: FamilyInfoInterface[];
    employment: EmploymentDetailsInterface[];
    education: EducationDetailsInterface[];
    documents: DocumentInterface[];
    handleSubmit: () => void;
}
function ApplicationPreview({
    isOpen,
    onClose,
    applicationDetails,
    personalInfo,
    familyMembers,
    employment,
    education,
    documents,
    handleSubmit,
}: ApplicationPreviewProps) {
    const { isMobile } = useScreenResolution();
    const [agree, setAgree] = useState(false);
    const [step, setStep] = useState(1);

    const prevStep = () => {
        setStep((prev) => Math.max(1, prev - 1));
    };
    const nextStep = () => {
        setStep((prev) => Math.min(1, prev + 1));
    };

    const finalSubmit = () => {
        handleSubmit();
        onClose();
    };

    return (
        <Modal open={isOpen} handleClose={onClose}>
            <Flex
                direction="column"
                align="flex-start"
                background="white"
                padding="2.5rem 2rem"
                gap="2rem"
                width={isMobile ? "95vw" : "35vw"}
                height={isMobile ? "95vh" : "80vh"}
                borderRadius="16px"
                position="relative"
            >
                {step === 1 && (
                    <One
                        applicationDetails={applicationDetails}
                        personalInfo={personalInfo}
                    />
                )}

                <Flex
                    direction="column"
                    // width="90%"
                    gap="1rem"
                    // position="fixed"
                    // styles={{ bottom: "40px" }}
                >
                    <CheckBox
                        onChange={(x) => setAgree(x.target.checked)}
                        checked={agree}
                        style={{
                            margin: "0px",
                            alignItems: "flex-start",
                        }}
                    >
                        <Text
                            text="I certify that the information contained on this document is complete, accurate and factual. I also realize that once this document has been completed and signed that it will form part of my immigration record and will be used to verify my family details on future applications.“"
                            type="p"
                            size={15}
                        />
                    </CheckBox>

                    <Flex
                        direction="column"
                        justify="space-between"
                        align="center"
                        gap="1rem"
                    >
                        <Flex
                            direction="row"
                            justify="space-between"
                            width="100%"
                        >
                            <Button
                                variant="link"
                                onClick={prevStep}
                                disabled={step === 1}
                            >
                                <Text
                                    text="Back"
                                    type="p"
                                    color={ttColors.foundation.gray}
                                    weight={500}
                                    size={16}
                                />
                            </Button>
                            <Button variant="link" onClick={nextStep}>
                                <Text
                                    text="Next"
                                    type="p"
                                    color={ttColors.primary}
                                    weight={500}
                                    size={16}
                                />
                            </Button>
                        </Flex>
                        <Flex direction="row" width="100%">
                            <Button
                                disabled={!agree}
                                onClick={finalSubmit}
                                background={ttColors.dark}
                                width="100%"
                                padding="1rem 2rem"
                            >
                                <Text
                                    text="Proceed To Payment"
                                    type="p"
                                    color="white"
                                    weight={500}
                                    width="max-content"
                                    size={16}
                                />
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Modal>
    );
}

export default ApplicationPreview;
