import React, { ReactNode, useState } from "react";
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
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Two from "./previewSteps/two";
import Three from "./previewSteps/three";
import Four from "./previewSteps/four";
import Five from "./previewSteps/five";
import { UploadedDoc } from "../applicationForm";


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
        // borderTop: `2px dotted ${ttColors.lightestGray}`,
        backgroundColor: "transparent",
    },
    ".MuiButtonBase-root": {
        // borderTop: `1px dotted ${ttColors.lightestGray}`,
        borderBottom: `1px dotted ${ttColors.lightestGray}`,
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
    value?: string | number | null;
    width?: string;
}
export function Detail({ name, value, width }: DetailProps) {
    return (
        <Flex direction="column" width={width ?? "25%"} gap="0.5rem">
            <Text text={name} type="p" size={13} color={ttColors.gray} />
            <Text text={!!value ? String(value) : 'None'} type="p" size={14} weight={600} />
        </Flex>
    );
}

interface MyAccordionProps {
    toggle: VoidFunction,
    isOpen: boolean,
    heading: string,
    subHeading?: string,
    children: ReactNode
}
export function MyAccordion({ toggle, isOpen, heading, subHeading, children }: MyAccordionProps) {
    return (
        <StyledAccordion
            onChange={toggle}
            expanded={isOpen}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="flight-details-content"
                id="flight-details-header"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', paddingY: isOpen ? "0" : ".5rem"  }}
            >
                <Flex direction='column' gap=".5rem">
                    <Text
                        type="p"
                        weight={600}
                        size={16}
                        text={heading}
                    />
                    {subHeading && 
                        <Text
                            type="p"
                            size={13}
                            text={subHeading}
                        />
                    }
                </Flex>
            </AccordionSummary>
            <AccordionDetails sx={{ paddingY: "1rem", paddingX: '0' }}>
                {children}
            </AccordionDetails>
        </StyledAccordion>
    )
}

interface ApplicationPreviewProps {
    isOpen: boolean;
    onClose: () => void;
    applicationDetails: DetailsKeys;
    personalInfo: PersonalInfoInterface;
    familyMembers: FamilyInfoInterface[];
    employment: EmploymentDetailsInterface[];
    education: EducationDetailsInterface[];
    documents: UploadedDoc[];
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
        setStep((prev) => Math.min(5, prev + 1));
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
                padding="1rem 2rem"
                gap="2rem"
                width={isMobile ? "95vw" : "45vw"}
                height={isMobile ? "95vh" : "95vh"}
                borderRadius="16px"
                position="relative"
                justify="space-between"
            >
                {step === 1 && (
                    <One
                        applicationInfo={applicationDetails}
                        personalInfo={personalInfo}
                    />
                )}
                {step === 2 && (
                    <Two
                        educationInfo={education.filter(e => e?.school)}
                    />
                )}
                {step === 3 && (
                    <Three
                        employmentInfo={employment.filter(e => e?.companyName)}
                    />
                )}
                {step === 4 && (
                    <Four
                        familyInfo={familyMembers.filter(e => e?.membersName)}
                    />
                )}
                {step === 5 && (
                    <Five
                        documentsInfo={documents}
                    />
                )}
                
                <Flex
                    direction="column"
                    gap="1rem"
                    width="calc(100% - 4rem)"
                    position="fixed"
                    padding="1rem 0 0"
                    styles={{ bottom: "1rem", borderTop: `1px solid ${ttColors.lightestGray}` }}
                >
                    <Flex align="flex-start">
                        <CheckBox
                            onChange={(x) => setAgree(x.target.checked)}
                            checked={agree}
                            style={{ width: "97%" }}
                        >
                            <Text
                                text="I certify that the information contained on this document is complete, accurate and factual. I also realize that once this document has been completed and signed that it will form part of my immigration record and will be used to verify my family details on future applications.“"
                                type="p"
                                size={13}
                            />
                        </CheckBox>
                    </Flex>

                    <Flex
                        justify="space-between"
                        align="center"
                    >
                        <Flex
                            direction="row"
                            width="100%"
                            gap="2rem"
                        >
                            <Button
                                variant="link"
                                onClick={prevStep}
                                disabled={step === 1}
                                width="fit-content"
                                height="fit-content"
                            >
                                <Text
                                    text="Back"
                                    type="p"
                                    color={step === 1 ? ttColors.gray : ttColors.foundation.gray}
                                    weight={500}
                                    size={14}
                                />
                            </Button>
                            <Button
                                variant="link"
                                onClick={nextStep}
                                width="fit-content"
                                height="fit-content"
                            >
                                <Text
                                    text="Next"
                                    type="p"
                                    color={step === 5 ? ttColors.gray : ttColors.primary}
                                    weight={500}
                                    size={14}
                                />
                            </Button>
                        </Flex>
                        <Button
                            disabled={!agree}
                            onClick={finalSubmit}
                            background={ttColors.dark}
                            width="100%"
                        >
                            <Text
                                text="Proceed To Payment"
                                type="p"
                                color="white"
                                weight={500}
                                width="max-content"
                                size={14}
                            />
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Modal>
    );
}

export default ApplicationPreview;
