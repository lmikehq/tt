"use client";

import Flex from "@components/templates/flex";
import Text from "@atom/text";
import {
    detailsSchema,
    documentsSchema,
    familyInfoSchema,
    guarantorSchema,
    manyEducationSchema,
    manyEmploymentSchema,
    personalInfoSchema,
} from "@lib/types/schema";
import { getSteps } from "src/lib/application/steps";
import Section from "src/components/molecules/section";
import SectionTitle from "src/components/molecules/sectionTitle";
import VisaProgress from "@/components/molecules/FormProgress/VisaProgress";
import AllCountryHead from "@organism/AllCountry/allCountryHead";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import Button from "@atom/button";
import CustomDrawer from "src/components/molecules/drawers/customDrawer";
import { FormikProps, useFormik } from "formik";
import { styled } from "styled-components";
import { ttColors } from "@lib/theme/colors";
import FormSideMenu from "./components/sideMenu/formSideMenu";
import { useApplicationFormStore } from "@lib/store/application-form.store";
import { DetailsKeys, GuarantorInfoInterface, Mode, PersonalInfoInterface } from "@lib/types";
import toast from "react-hot-toast";
import SectionLayout from "@components/templates/SectionLayout";
import CustomConfirmationModal from "../visaApplicationModal";
import Image from "@/components/atoms/image";
import testPayload from '@/constants/payload.json'


const PromoInput = styled.div`
    display: flex;
    margin: 1rem 0;

    & input {
        border: 1px solid #bdbdbd;
        border-bottom-right-radius: 0 !important;
        border-top-right-radius: 0 !important;
        border-right: 0 !important;
    }

    & button {
        border-bottom-left-radius: 0 !important;
        border-top-left-radius: 0 !important;
        height: 40px !important;
    }
`;

const ErrorToastComponent = styled.div`
    width: 100%;
    max-height: 50vh;
    overflow-y: scroll;
    background: white;
    // width: 500px;
    max-width: 90vw;
    p {
        color: ${ttColors.red};
        padding: 0.5rem 0;
    }

    button {
        display: block;
        margin: 20px auto;
        padding: 1rem 1.5rem;
        border: none;
        border-radius: 4px;
        background: ${ttColors.primary};
        cursor: pointer;
    }
`;

export interface UploadedDoc {
    name: string;
    type: string;
    size: string;
    title: string;
}
interface ErrorInterface {
    property: string;
    constraints: string;
}

function ApplicationForm() {
    const { isMobile } = useScreenResolution();
    const {
        fetchRecentProgressFromSession,
        form,
        fetchDetailsFromURL,
        prevStep,
        step,
        highestStep,
        setStep,
        nextStep,
        createVisaApplication,
        mode,
        saveProgress,
        uploadedDocuments,
    } = useApplicationFormStore((state) => state);

    const {
        tripDetails,
        personalInfo,
        education,
        employment,
        familyMembers,
        guarantorInfo,
        documents,
    } = form;

    const isLoading = mode == Mode.loading;
    const params = useSearchParams();
    const router = useRouter();
    const [showApplicationExistsModal, setShowApplicationExistsModal] =
        useState(false);
  
    const detailsFormik = useFormik({
        initialValues: tripDetails,
        enableReinitialize: true,
        validateOnMount: true,
        validationSchema: detailsSchema,
        onSubmit: (values: DetailsKeys) => {
            if (isLoading) return;
            nextStep({ data: { tripDetails: values } });
        },
    });

    const personalInfoFormik: FormikProps<PersonalInfoInterface> = useFormik({
        initialValues: personalInfo,
        enableReinitialize: true,
        validateOnMount: true,
        validationSchema: personalInfoSchema,
        onSubmit: (values: PersonalInfoInterface) => {
            if (isLoading) return;
            nextStep({ data: { personalInfo: values } });
        },
        // validateOnChange: true,
    });

  const employmentFormik = useFormik({
      initialValues: { employment },
      enableReinitialize: true,
      validateOnMount: true,
      validationSchema: manyEmploymentSchema,
        onSubmit: (values, formikHelpers) => {
        if (isLoading) return;
        nextStep({ data: { employment: values.employment } });
      },
      validateOnChange: true,
    });
  
    const educationFormik = useFormik({
        initialValues: { education },
        enableReinitialize: true,
        validateOnMount: true,
        validationSchema: manyEducationSchema,
        onSubmit: (values) => {
            if (isLoading) return;
            nextStep({ data: { education: values.education } });
        },
        validateOnChange: true,
    });
    
    const guarantorFormik: FormikProps<GuarantorInfoInterface> = useFormik({
        initialValues: guarantorInfo,
        enableReinitialize: true,
        validateOnMount: true,
        validationSchema: guarantorSchema,
        onSubmit: (values: GuarantorInfoInterface) => {
            // if (isLoading) return;
            // nextStep({ data: { guarantorInfo: values } });
        },
        validateOnChange: true,
    });

    const familyMembersFormik = useFormik({
        initialValues: { familyMembers },
        enableReinitialize: true,
        validateOnMount: true,
        validationSchema: familyInfoSchema,
        onSubmit: (values, formikHelpers) => {
            if (isLoading) return;
            nextStep({ data: { familyMembers: values.familyMembers, guarantorInfo: guarantorFormik.values } });
        },
        validateOnChange: true,
    });

    const documentsFormik = useFormik({
        initialValues: { documents },
        enableReinitialize: true,
        validateOnMount: true,
        validationSchema: documentsSchema,
        onSubmit: (values) => {
        createVisaApplication({
            data: {
                // ...form,
                tripDetails: detailsFormik.values,
                personalInfo: personalInfoFormik.values,
                employment: employmentFormik.values.employment,
                education: educationFormik.values.education,
                familyMembers: familyMembersFormik.values.familyMembers,
                guarantorInfo: guarantorFormik.values,
                documents: values.documents,
            },
        })
        .then((_: any) => {
          toast.success(
            "Your application has been submitted successfully, please proceed to make payment",
            {
              duration: 15000,
            }
          );
        })
        .catch((error) => {
            console.log(error)
          const err = error.response?.data;
          if (
            err?.statusCode === 422 &&
            err?.errorMessage.includes("already exists")
          ) {
            setShowApplicationExistsModal(true);
          } else if (err?.statusCode === 400) {
            toast(
              (t) => (
                <ErrorToastComponent>
                  <p style={{ textAlign: "center" }}>
                    There are errors in your form
                  </p>{" "}
                  {/* <br /> */}
                  {err.data.map((error: ErrorInterface, index: number) => (
                    <Text
                      type="p"
                      text={error.constraints}
                      color={ttColors.red}
                      key={index}
                    />
                  ))}
                  <button onClick={() => toast.dismiss(t.id)}>Dismiss</button>
                </ErrorToastComponent>
              ),
              {
                duration: 100000,
              }
            );
          }
        });
        },
    });

    const persistForm = () => {
        saveProgress({
            data: {
                tripDetails: detailsFormik.values,
                personalInfo: personalInfoFormik.values,
                employment: employmentFormik.values.employment,
                education: educationFormik.values.education,
                familyMembers: familyMembersFormik.values.familyMembers,
                guarantorInfo: guarantorFormik.values,
                documents: documentsFormik.values.documents,
            },
            uploadedDocuments,
        });
        router.push("/");
    };

    const steps = getSteps({
        detailsFormik,
        personalInfoFormik,
        educationFormik,
        employmentFormik,
        familyMembersFormik,
        guarantorFormik,
        documentsFormik,
        persistForm,
    }).find((x) => x.id === step);

    const coverImage = isMobile
        ? "/assets/images/visaPageCover.jpg"
        : "/assets/images/visaDesktopCover.jpg";

    const [bottomDrawerOpen, setBottomDrawerOpen] = useState(false);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);

        fetchDetailsFromURL({
            homeCountry: searchParams.get("home") || "",
            destination: searchParams.get("destination") || "",
            visaType: searchParams.get("visaType") || "",
        });
        fetchRecentProgressFromSession();
    }, [params]);

    // useEffect(() => {
    //     saveProgress({ data: testPayload, uploadedDocuments: [] })
    // }, [])


    return (
        <>
            <CustomConfirmationModal
                open={showApplicationExistsModal}
                handleClose={() => setShowApplicationExistsModal(false)}
                icon={
                    <Image
                        src={"/assets/images/visaIcons/duplicate_icon.svg"}
                        alt="delete-icon"
                        width={95.5}
                        height={95.5}
                    />
                }
                title={"Duplicate Application"}
                description="There is an existing application with the same details."
                subTitle={"Continue to your dashboard to view application?"}
                buttons={
                    <>
                        <Button
                            background="transparent"
                            color={ttColors.dark}
                            border="1px solid #19013b"
                            onClick={() => setShowApplicationExistsModal(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            background={ttColors.blackishBlue}
                            color="#fff"
                            onClick={() => {
                                router.push("/dashboard");
                            }}
                        >
                            Continue
                        </Button>
                    </>
                }
            />

            <AllCountryHead
                cover={coverImage}
                title={form.tripDetails.destination.name || ""}
            />

            <SectionLayout>
                <SectionTitle
                    title={`Apply Now for ${
                        form.tripDetails.destination.name || ""
                    } Employment Visa`}
                    description="We'll Handle Your Travel Documentation Hassles, and ensure a seamless travel experience for you"
                    showButton={false}
                />

                <Button
                    onClick={() => setBottomDrawerOpen(true)}
                    styles={{ display: isMobile ? "block" : "none" }}
                    background="transparent"
                    padding="0"
                    width="fit-content"
                    height="fit-content"
                >
                    <Text
                        type="p"
                        size={14}
                        color={ttColors.primary}
                        text="View Important Documents Required"
                    />
                </Button>

                <CustomDrawer
                    anchor="bottom"
                    open={bottomDrawerOpen}
                    onClose={() => setBottomDrawerOpen(false)}
                >
                    <Section
                        height="unset"
                        padding={"1.125rem 1.125rem 3.5rem 1.125rem"}
                        styles={{
                            background: ttColors.light,
                        }}
                    >
                        <FormSideMenu
                            currentPhase={step}
                            formData={form}
                            onClose={() => setBottomDrawerOpen(false)}
                        />
                    </Section>
                </CustomDrawer>

                <Flex
                    {...(!isMobile && { background: "white" })}
                    // background='white'
                    borderRadius={isMobile ? "0px" : "16px"}
                    margin={isMobile ? "1.5rem 0" : "3rem 0px 5rem 0px"}
                    styles={{
                        boxShadow: isMobile
                            ? "none"
                            : "0px 2px 2px 0px rgba(0, 0, 0, 0.05), 2px 0px 2px 0px rgba(0, 0, 0, 0.05)",

                        marginBottom: isMobile ? "3rem" : "0px",
                        position: "relative",
                    }}
                    height="auto"
                    padding={isMobile ? "0px" : "2.5rem"}
                    gap="4.5rem"
                    direction={isMobile ? "column" : "row"}
                >
                    <Section
                        height="unset"
                        width={isMobile ? "100%" : "62%"}
                        padding={isMobile ? "0 0 1.5rem 0" : "0 0 8rem 0"}
                        styles={{ position: "relative" }}
                    >
                        <Flex
                            direction="column"
                            styles={{ flexGrow: 1 }}
                            gap={isMobile ? "2.5rem" : "2rem"}
                        >
                            {step < 7 && (
                                <Flex
                                    align="center"
                                    cursor="pointer"
                                    gap="0.3rem"
                                    onClick={prevStep}
                                >
                                    <BsArrowLeft
                                        color={
                                            step > 1
                                                ? ttColors.primary
                                                : ttColors.gray
                                        }
                                        size="22px"
                                    />
                                    <Text
                                        text="Previous"
                                        type="p"
                                        color={
                                            step > 1
                                                ? ttColors.primary
                                                : ttColors.gray
                                        }
                                        size="16px"
                                        weight="bold"
                                    />
                                </Flex>
                            )}
                            {step > 1 && step < 7 && (
                                <VisaProgress
                                    phase={step - 1}
                                    setStep={setStep}
                                    highestPhase={highestStep}
                                />
                            )}
                            <Section
                                width={isMobile ? "100%" : "100%"}
                                height="unset"
                                padding="0px 0px 2rem 0px"
                            >
                                {steps?.content}
                            </Section>
                        </Flex>
                    </Section>
                    <Section
                        width="38%"
                        height="unset"
                        styles={{ display: isMobile ? "none" : "block" }}
                    >
                        <FormSideMenu
                            currentPhase={step}
                            formData={form}
                            saveProgress={persistForm}
                        />
                    </Section>
                </Flex>
            </SectionLayout>
        </>
    );
}

export default ApplicationForm;
