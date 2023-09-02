"use client";

import CoverDesktopImg from "@image/visaDesktopCover.jpg";
import CoverImg from "@image/visaPageCover.jpg";

import Flex from "@atom/flex";
import Text from "@atom/text";
import SectionLayout from "@components/layouts/sectionLayout";
import {
  detailsKeys,
  detailsSchema,
  documentsArr,
  documentsSchema,
  educationsArr,
  employmentsArr,
  familyInfoArr,
  familyInfoSchema,
  manyEducationSchema,
  manyEmploymentSchema,
  personalInfoKeys,
  personalInfoSchema,
  visaInitVals,
} from "@lib/application/schema";
import { getSteps } from "@lib/application/steps";
import Section from "@molecule/section";
import SectionTitle from "@molecule/sectionTitle";
import VisaProgress from "@molecule/visaProgress";
import AllCountryHead from "@organism/AllCountry/allCountryHead";
import apiService from "hook/apiService";
import { useScreenResolution } from "hook/useScreenResolution";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { BsArrowLeft } from "react-icons/bs";
// import { useUserStore } from "store/useStore";
import Button from "@atom/button";
import sleep from "@lib/sleep";
import { safelyConvertToNumber } from "@lib/utilFns";
import CustomDrawer from "@molecule/drawers/customDrawer";
import { FormikProps, useFormik } from "formik";
import { useUserStore } from "store/useStore";
import { styled } from "styled-components";
import { ttColors } from "theme/colors";
import {
  ApplicationFormRequestInput,
  DetailsKeys,
  DocumentInterface,
  EducationDetailsInterface,
  EmploymentDetailsInterface,
  FamilyInfoInterface,
  PersonalInfoInterface,
  VisaApplicationFormInterface,
} from "types";
import FormSideMenu from "./components/sideMenu/formSideMenu";

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

export type SingleFormType =
  | DetailsKeys
  | PersonalInfoInterface
  | { education: EducationDetailsInterface[] }
  | { employment: EmploymentDetailsInterface[] }
  | { familyMembers: FamilyInfoInterface[] }
  | { documents: DocumentInterface[] };
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
  ``;
  const [createVisaApplicationData, setCreateVisaApplicationData] = useState<{
    user: string;
    visa: string;
  }>();

  const { user } = useUserStore((state) => state);
  async function handleVisaApplication({
    payload,
  }: {
    payload: ApplicationFormRequestInput;
  }): Promise<{ user: string; visa: string }> {
    const response: any = await apiService(
      "/visa/new-application",
      "POST",
      payload
    ).then((response) => {
      if (response.statusCode == 200 || response.statusCode == 201) {
        toast.success(
          "Your application has been submitted successfully, please proceed to make payment", {
            duration: 15000
          }
        );
        return response.data;
      } else {
        toast.error(response.message);

        throw response;
        // toast.error(response);
      }
    });
    return response;
  }
  async function handlePayment({
    payload,
  }: {
    payload: { user: string; visa: string };
  }): Promise<void> {
    const response: any = await apiService(
      "/payment/create-form-fee-charge",
      "POST",
      {
        currency: "NGN",
        gateway: "Kora",
        service: "VISA",
        user: payload.user,
        serviceID: payload.visa,
        paymentIntent: "FORM FEE",
      }
    ).then((response) => {
      if (response.statusCode == 200 || response.statusCode == 201) {
        window.open(response.data.data.checkout_url, "_self");
        return response.data;
      } else {
        toast.error(response.errorMessage);
        throw response;
      }
    });
  }
  // localhost:3000/visa/apply?action=payment&type=visa-application-fee&status=success
  const params = useSearchParams();
  // const action = params.get("action"); // payment
  const type = params.get("type"); // visa-application-fee
  const status = params.get("status"); // success | fail
  const [formData, setFormData] = useState<VisaApplicationFormInterface>({
    ...visaInitVals,
    homeCountry: params.get("home") || "",
    destination: params.get("destination") || "",
  });
  const [currentPhase, setCurrentPhase] = useState(
    type !== "visa-application-fee" ? 1 : status === "success" ? 6 : 7
  );
  // const [currentPhase, setCurrentPhase] = useState(5);
  const [highestPhase, setHighestPhase] = useState(1);
  const [nextStepLoading, setNextStepLoading] = useState(false);
  const router = useRouter();

  // async function onSuccess() {
  //   // toast.success("Payment Successful, please check your email for receipt");
  //   toast.loading("Payment Successful, please wait...", {
  //     duration: 5000,
  //   });
  //   await apiService("/payment/paystack-success-callback", "POST", {
  //     visaId: applicationResponse.id,
  //     user: user?._id || applicationResponse.userId,
  //     method: "CARD",
  //     gateway: "Paystack",
  //     status: "SUCCESS",
  //     currency: "NGN",
  //     totalAmount: applicationResponse.fee.total,
  //     service: "VISA",
  //     description: "Payment Successful",
  //   });
  //   setCurrentPhase(currentPhase + 1);
  // }
  // async function onCancel() {
  //   await apiService("/payment/paystack-success-callback", "POST", {
  //     visaId: applicationResponse.id,
  //     user: user?._id || applicationResponse.userId,
  //     method: "CARD",
  //     gateway: "Paystack",
  //     status: "FAILED",
  //     currency: "NGN",
  //     totalAmount: applicationResponse.fee.total,
  //     service: "VISA",
  //     description: "Payment Cancelled",
  //   });
  //   toast.error("Payment Cancelled");
  //   setCurrentPhase(currentPhase + 2);
  // }

  const setPhase = async (number: number) => {
    setCurrentPhase(number);
    if (number > highestPhase) setHighestPhase(number);
  };

  const nextStep = async ({
    form,
  }: {
    form?: VisaApplicationFormInterface;
  }) => {
    if (nextStepLoading) return;
    setNextStepLoading(true);
    if (currentPhase <= 6) {
      if (currentPhase + 1 > highestPhase) setHighestPhase(currentPhase + 1);
    }
    if (currentPhase < 6) await sleep(2000);
    if (currentPhase == 6 && form) {
      const applicationFormRequest: ApplicationFormRequestInput = {
        applicationType: form.applicationType,
        visaType: form.visaType,
        primaryTraveller: {
          firstName: form.firstName,
          lastName: form.lastName,
          travellingBy: "Airplane",
          middleName: form.middleName,
          email: form.email,
          homeCountry: form.homeCountry,
          destination: form.destination,
          placeOfBirth: form.placeOfBirth,
          phoneNumber: form.phoneNumber,
          stateOfOrigin: form.stateOfOrigin,
          lgaOfOrigin: form.lgaOfOrigin,
          nativeLanguage: form.nativeLanguage,
          meansOfId: form.meansOfId,
          idNumber: form.idNumber,
          issueDate: form.issueDate,
          expiryDate: form.expiryDate,
          address: form.address,
          countryOfCitizen: form.countryOfCitizen,
          dateOfBirth: form.dateOfBirth,
          gender: form.gender,
          maritalStatus: form.maritalStatus,
          partnersName: form.partnersName,
          passportNumber: form.passportNumber,
          passportIssuedCountry: form.passportIssuedCountry,
          passportExpiryYear: form.passportExpiryYear,
          tripPurpose: form.tripPurpose,
          tuberculosis: form.tuberculosis,
          mentalDisorder: form.mentalDisorder,
          mentalDisorderDetails: form.mentalDisorderDetails,
          remainbeyondValidity: form.remainbeyondValidity,
          refusedBefore: form.refusedBefore,
          refusedBeforeDetails: form.refusedBeforeDetails,
          arrestedBefore: form.arrestedBefore,
          arrestedBeforeDetails: form.arrestedBeforeDetails,
          servedInMilitary: form.servedInMilitary,
          servedInMilitaryDetails: form.servedInMilitaryDetails,
          memberOfViolentGroup: form.memberOfViolentGroup,
          participatedInViolentActivities: form.participatedInViolentActivities,
          education: form.education,
          employment: form.employment,
        },
        familyMembers: form.familyMembers.map((member) => ({
          ...member,
          issueYear: safelyConvertToNumber(member?.issueYear),
          expiryYear: safelyConvertToNumber(member?.expiryYear),
        })),
        documents: form.documents,
        user: user?._id ?? undefined,
      };

      await handleVisaApplication({
        payload: applicationFormRequest,
      })
        .then((data) => {
          setCreateVisaApplicationData(data);
          setCurrentPhase(currentPhase + 1);
          setNextStepLoading(false);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        })
        .catch((err) => {
          if (
            err.statusCode === 422 &&
            err.errorMessage.includes("already exists")
          ) {
            toast.error("Please login to your account to continue");
          } else if (err.statusCode === 400) {
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
          setNextStepLoading(false);
        });
      return;
    }
    if (currentPhase == 7) {
      await handlePayment({
        payload: {
          user: createVisaApplicationData?.user ?? "",
          visa: createVisaApplicationData?.visa ?? "",
        },
      })
        .then((data) => {
          setNextStepLoading(false);
        })
        .catch((error) => {
          setNextStepLoading(false);
        });

      return;
    }

    setCurrentPhase(currentPhase + 1);
    setNextStepLoading(false);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const prevStep = async () => {
    if (nextStepLoading || currentPhase === 1) return;
    // await reloadFee();
    setCurrentPhase(currentPhase - 1);
  };

  const [formFee, setFormFee] = useState(0);
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDoc[]>();

  const handleSetUploadedDocuments = (docs: UploadedDoc[]) => {
    setUploadedDocuments([...docs]);
  };

  // async function reloadFee() {
  //   setNextStepLoading(true);
  //   setShownFees([]);
  //   await sleep(1000);
  //   setNextStepLoading(false);
  //   // setShownFees(calcFees(formFee));
  // }
  const personalInfoFormik: FormikProps<PersonalInfoInterface> = useFormik({
    initialValues: personalInfoKeys,
    validationSchema: personalInfoSchema,
    validateOnChange: true,
    onSubmit: (values: PersonalInfoInterface) => {
      const form = { ...formData, ...values };
      setFormData(form);
      nextStep({});
    },
  });

  const fetchRecentProgressFromSession = () => {
    const form = sessionStorage.getItem("visa_application_form");
    const uploadedDocuments = sessionStorage.getItem(
      "visa_application_uploaded_documents"
    );
    const recent = {
      form: form ? JSON.parse(form) : null,
      uploadedDocuments: uploadedDocuments
        ? (JSON.parse(uploadedDocuments) as UploadedDoc[])
        : null,
    };
    detailsFormik.setValues({
      ...(recent?.form?.details ?? detailsKeys),
      homeCountry: params.get("home") || detailsKeys.homeCountry,
      destination: params.get("destination") || detailsKeys.destination,
      visaType: params.get("visaType") || detailsKeys.visaType,
    });
    personalInfoFormik.setValues(
      recent?.form?.personalInfo ?? personalInfoKeys
    );
    educationFormik.setValues({
      education: recent?.form?.education ?? educationsArr.education,
    });
    employmentFormik.setValues({
      employment: recent?.form?.employment ?? employmentsArr.employment,
    });
    familyMembersFormik.setValues({
      familyMembers: recent?.form?.familyMembers ?? familyInfoArr.familyMembers,
    });
    documentsFormik.setValues({
      documents: recent?.form?.documents ?? documentsArr.documents,
    });

    setUploadedDocuments(recent?.uploadedDocuments ?? []);
  };

  const detailsFormik = useFormik({
    initialValues: {
      ...detailsKeys,
      homeCountry: params.get("home") || detailsKeys.homeCountry,
      destination: params.get("destination") || detailsKeys.destination,
      visaType: params.get("visaType") || detailsKeys.visaType,
    },
    validationSchema: detailsSchema,
    onSubmit: (values: DetailsKeys) => {
      const form = { ...formData, ...values };
      setFormData(form);
      nextStep({});
    },
  });

  const educationFormik = useFormik({
    initialValues: educationsArr,
    validationSchema: manyEducationSchema,
    onSubmit: (values) => {
      const form = { ...formData, ...values };
      setFormData(form);
      nextStep({});
    },
    validateOnChange: true,
  });

  const employmentFormik = useFormik({
    initialValues: employmentsArr,
    validationSchema: manyEmploymentSchema,
    onSubmit: (values) => {
      const form = { ...formData, ...values };
      setFormData(form);
      nextStep({});
    },
    validateOnChange: false,
  });
  const familyMembersFormik = useFormik({
    initialValues: familyInfoArr,
    validationSchema: familyInfoSchema,
    onSubmit: (values) => {
      const form = { ...formData, ...values };
      setFormData(form);
      nextStep({});
    },
    validateOnChange: true,
  });
  const documentsFormik = useFormik({
    initialValues: documentsArr,
    validationSchema: documentsSchema,
    onSubmit: (values) => {
      const completedForm = { ...formData, ...values };
      setFormData(completedForm);
      nextStep({ form: completedForm });
    },
  });
  const paymentFormik = useFormik({
    initialValues: {},
    // validationSchema: documentsSchema,
    onSubmit: (values) => {
      nextStep({});
    },
  });
  const finalStepButtonText = () => {
    let accompanies = 0;
    if (formData.familyMembers.length > 0) {
      formData.familyMembers.forEach((member) => {
        if (member.accompanying) accompanies++;
      });
    }
    return !isMobile ? 'Make Payment' : accompanies > 0 
      ? "Make Payment (NGN 30,000)"
      : "Make Payment (NGN 20,000)";
  };
  const saveProgressAndContinueLater = () => {
    const form = {
      details: detailsFormik.values,
      personalInfo: personalInfoFormik.values,
      ...educationFormik.values,
      ...employmentFormik.values,
      ...familyMembersFormik.values,
      ...documentsFormik.values,
    };

    sessionStorage.setItem("visa_application_form", JSON.stringify(form));
    sessionStorage.setItem(
      "visa_application_uploaded_documents",
      JSON.stringify(uploadedDocuments ?? [])
    );

    router.push("/");
  };

  const step = getSteps({
    setFormFee,
    setCurrentPhase,
    detailsFormik,
    personalInfoFormik,
    educationFormik,
    employmentFormik,
    familyMembersFormik,
    documentsFormik,
    paymentFormik,
    isLoading: nextStepLoading,
    handleSetUploadedDocuments,
    uploadedDocuments: uploadedDocuments ?? [],
    visaType: formData.visaType,
    lastName: formData.lastName,
    saveProgressAndContinueLater,
    finalStepButtonText: finalStepButtonText(),
  }).find((x) => x.id === currentPhase);

  const isValid: boolean = useMemo(() => {
    return formData.homeCountry !== "" && formData.destination !== "";
  }, [formData.homeCountry, formData.destination]);

  const coverImage = isMobile ? CoverImg : CoverDesktopImg;
  const [bottomDrawerOpen, setBottomDrawerOpen] = useState(false);
  useEffect(() => {
    fetchRecentProgressFromSession();
  }, []);

  return (
    <>
      <AllCountryHead cover={coverImage} title={formData.destination || ""} />
      <SectionLayout>
        <SectionTitle
          title={`Apply Now for ${formData.destination || ""} Employment Visa`}
          description="We'll Handle Your Travel Documentation Hassles, and Ensure a Seamless travel experience for you"
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
              currentPhase={currentPhase}
              formData={formData}
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
          gap="2.25rem"
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
              {currentPhase < 7 && (
                <Flex
                  align="center"
                  cursor="pointer"
                  gap="0.3rem"
                  onClick={prevStep}
                >
                  <BsArrowLeft
                    color={currentPhase > 1 ? ttColors.primary : ttColors.gray}
                    size="22px"
                  />
                  <Text
                    text="Previous"
                    type="p"
                    color={currentPhase > 1 ? ttColors.primary : ttColors.gray}
                    size="16px"
                    weight="bold"
                  />
                </Flex>
              )}
              {currentPhase > 1 && currentPhase < 7 && (
                <VisaProgress
                  phase={currentPhase - 1}
                  setPhase={setPhase}
                  highestPhase={highestPhase}
                />
              )}
              <Section
                width={isMobile ? "100%" : "100%"}
                height="unset"
                padding="0px 0px 2rem 0px"
              >
                {step?.content}
              </Section>
            </Flex>
          </Section>

          <Section
            width="38%"
            height="unset"
            styles={{ display: isMobile ? "none" : "block" }}
          >
            <FormSideMenu
              currentPhase={currentPhase}
              formData={formData}
              saveProgressAndContinueLater={saveProgressAndContinueLater}
            />
          </Section>
        </Flex>
      </SectionLayout>
    </>
  );
}

export default ApplicationForm;
