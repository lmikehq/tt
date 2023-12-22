import Section from "@/components/molecules/section";
import { GridLayout } from "../../view/styles";
import Text from "@/components/atoms/text";
import { Input } from "@mui/material";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { FieldInput } from "@/components/organisms/fieldInput";
import { FormikProps } from "formik";
import { GuestRoomsFormDataInterface } from "@/lib/types/request-models/stay/booking.type";

interface FirstAndLastNameInputProps {
    namePrefix: string;
    formik: FormikProps<GuestRoomsFormDataInterface>;
}
const FirstAndLastNameInput = ({
    namePrefix,
    formik,
}: FirstAndLastNameInputProps) => {
    const { isMobile } = useScreenResolution();

    return (
        <GridLayout>
            <Section>
                <Text
                    type="p"
                    text="First Name"
                    margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                    size={isMobile ? "14.5px" : "16px"}
                />
                <FieldInput
                    name={`${namePrefix}.first_name`}
                    formik={formik}
                    placeholder="Enter First Name"
                />
            </Section>
            <Section>
                <Text
                    type="p"
                    text="Last Name"
                    margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                    size={isMobile ? "14.5px" : "16px"}
                />
                <FieldInput
                    name={`${namePrefix}.last_name`}
                    formik={formik}
                    placeholder="Enter Last Name"
                />
            </Section>
        </GridLayout>
    );
};

export default FirstAndLastNameInput;
