import AddButton from "@molecule/addButton";
import ContinueButton from "@organism/continueButton";
import Flex from "@components/templates/flex";
import Text from "@atom/text";
import { familyInfoSchema, familyInforKeys } from "@lib/types/schema";
import FamilyForm from "src/components/molecules/forms/familyForm";
import Section from "src/components/molecules/section";
import { FieldArray, FormikProps, FormikProvider, useFormik } from "formik";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ttColors } from "@lib/theme/colors";
import {
    FamilyInfoInterface,
    GuarantorInfoInterface,
    Mode,
    PersonalInfoInterface,
} from "@lib/types";
import { toast } from "react-hot-toast";
import FormStepTitle from "./formStepsTitle";
import { useApplicationFormStore } from "@lib/store/application-form.store";
import { useRouter } from "next/navigation";
import ToastError from "@molecule/toastError";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import Required from "@/components/atoms/required";
import {
    ErrorText,
    FieldInput,
    FieldPhone,
    FieldString,
} from "../../fieldInput";

interface formProps {
    steps: string[];
    index: number;
    persistForm: () => void;
    formik: FormikProps<{ familyMembers: FamilyInfoInterface[] }>;
    guarantorFormik: FormikProps<GuarantorInfoInterface>;
}

function FamilyInfo({
    steps,
    index,
    persistForm,
    formik,
    guarantorFormik,
}: formProps) {
    const { mode } = useApplicationFormStore((state) => state);
    const isLoading = mode == Mode.loading;
    const { isMobile } = useScreenResolution();

    return (
        <FormikProvider value={formik}>
            <Section>
                <form onSubmit={formik.handleSubmit}>
                    <FieldArray
                        name="familyMembers"
                        render={(arrayHelpers) => (
                            <div>
                                <Flex
                                    justify="space-between"
                                    padding="0 0 2rem 0"
                                >
                                    <FormStepTitle
                                        steps={steps}
                                        index={index}
                                    />
                                </Flex>
                                {formik.values.familyMembers.map(
                                    (family, index, arr) => (
                                        <div
                                            key={index}
                                            style={{ marginBottom: "3.5rem" }}
                                        >
                                            <FamilyForm
                                                formik={formik}
                                                values={family}
                                                count={index}
                                                arrayHelpers={arrayHelpers}
                                                isFirst={family?.index === 0}
                                            />
                                            {arr.filter(
                                                (e) =>
                                                    e.section === family.section
                                            ).length > 1 &&
                                                family?.index !== 0 && (
                                                    <Flex
                                                        justify="flex-end"
                                                        gap="0.25rem"
                                                        align="center"
                                                        onClick={() =>
                                                            arrayHelpers.remove(
                                                                index
                                                            )
                                                        }
                                                        cursor="pointer"
                                                        margin="0"
                                                    >
                                                        <RiDeleteBin6Line
                                                            color={ttColors.red}
                                                            size={25}
                                                        />
                                                        <Text
                                                            type="p"
                                                            text="Delete Family Member"
                                                            color={ttColors.red}
                                                            weight="500"
                                                            size={15}
                                                        />
                                                    </Flex>
                                                )}
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                    />

                    {/* Guarantor Information */}
                    <Flex direction="column" justify="flex-start" gap="1rem">
                        <Text
                            type="h3"
                            text={`GUARANTOR DETAILS`}
                            size={20}
                            weight={600}
                        />
                        <Text
                            type="p"
                            text="Enter the following details of your guarantor"
                            size={16}
                        />
                    </Flex>
                    <Flex
                        margin="0"
                        justify="space-between"
                        direction={isMobile ? "column" : "row"}
                        gap={isMobile ? "0px" : "1.5rem"}
                    >
                        <Section>
                            <Flex align="center" gap="0.25rem">
                                <Text
                                    type="p"
                                    text="Guarantor Name"
                                    margin={
                                        isMobile
                                            ? ".7rem  0 .2rem"
                                            : "1rem 0 .5rem"
                                    }
                                    size={15}
                                />
                                <Required />
                            </Flex>
                            <FieldInput
                                name="guarantorName"
                                formik={guarantorFormik}
                                placeholder="Enter your guarantor's full name"
                            />
                        </Section>
                        <Section width="100%">
                            <Flex align="center" gap="0.25rem">
                                <Text
                                    type="p"
                                    text="Relationship to Guarantor"
                                    margin={
                                        isMobile
                                            ? ".7rem  0 .2rem"
                                            : "1rem 0 .5rem"
                                    }
                                    size={15}
                                />
                                <Required />
                            </Flex>
                            <FieldInput
                                name="relationshipToGuarantor"
                                formik={guarantorFormik}
                                placeholder="Enter your relationship to guarantor"
                            />
                        </Section>
                    </Flex>
                    <Section width="100%">
                        <Flex align="center" gap="0.25rem">
                            <Text
                                type="p"
                                text="Guarantor Address"
                                margin={
                                    isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"
                                }
                                size={15}
                            />
                            <Required />
                        </Flex>
                        <FieldInput
                            name="guarantorAddress"
                            formik={guarantorFormik}
                            placeholder="Enter your guarantor's address"
                        />
                    </Section>
                    <Flex
                        margin="0"
                        justify="space-between"
                        direction={isMobile ? "column" : "row"}
                        gap={isMobile ? "0px" : "1.5rem"}
                    >
                        <Section>
                            <Flex align="center" gap="0.25rem">
                                <Text
                                    type="p"
                                    text="Guarantor Phone Number"
                                    margin={
                                        isMobile
                                            ? ".7rem  0 .2rem"
                                            : "1rem 0 .5rem"
                                    }
                                    size={15}
                                />
                                <Required />
                            </Flex>
                            <FieldPhone
                                name="guarantorPhone"
                                formik={guarantorFormik}
                                country="ng"
                                placeholder="Enter guarantor's phone number"
                            />
                        </Section>
                        <Section width="100%">
                            <Flex align="center" gap="0.25rem">
                                <Text
                                    type="p"
                                    text="Guarantor Net Worth (₦)"
                                    margin={
                                        isMobile
                                            ? ".7rem  0 .2rem"
                                            : "1rem 0 .5rem"
                                    }
                                    size={15}
                                />
                                <Required />
                            </Flex>
                            <FieldInput
                                name="guarantorWorth"
                                formik={guarantorFormik}
                                placeholder="Enter your guarantor's net worth"
                                type="number"
                            />
                        </Section>
                    </Flex>

                    <ContinueButton
                        isLoading={isLoading}
                        onClick={() => {
                            formik.validateForm();
                            if (!formik.isValid || !guarantorFormik.isValid) {
                                guarantorFormik.validateForm().then((res) => {
                                    guarantorFormik.setTouched({
                                        guarantorName: true,
                                        relationshipToGuarantor: true,
                                        guarantorAddress: true,
                                        guarantorPhone: true,
                                        guarantorWorth: true,
                                    });
                                });
                                return ToastError();
                            } else {
                                formik.handleSubmit();
                            }
                        }}
                        type="button"
                        disabled={!formik.isValid || !guarantorFormik.isValid}
                        saveProgressAndContinueLater={persistForm}
                    />
                </form>
            </Section>
        </FormikProvider>
    );
}

export default FamilyInfo;
