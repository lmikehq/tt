import Button from "@/components/atoms/button";
import Required from "@/components/atoms/required";
import Text from "@/components/atoms/text";
import Section from "@/components/molecules/section";
import { ErrorText, FieldAsDate, FieldAsString, FieldInput, FieldString } from "@/components/organisms/fieldInput";
import Flex from "@/components/templates/flex";
import { Grid } from "@/components/templates/grid";
import { COUNTRY_FLAGS } from "@/lib/extensions/data/COUNTRY_FLAGS";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { accompanyStore } from "@/lib/store/dashboard/accompany.store";
import { ttColors } from "@/lib/theme/colors";
import { IAccompany } from "@/lib/types";
import { accompanySchema, accompanyVal } from "@/lib/types/schema";
import { FormikProps, useFormik } from "formik";
import { useState } from "react";
import { AiFillMinusCircle } from "react-icons/ai";
import PhoneInput from "react-phone-input-2";
import styled from "styled-components";


const PhoneInputStyle = styled.div`
  .react-tel-input .form-control {
    height: 45px !important;
  }

  :hover {
   border-color: ${ttColors.primary};
   border-radius: 6px;
  }
`;

const SectionContainer = styled.div`
  position: relative;
  z-index: 99999;

  .css-gbi5t6-MuiPopper-root {
    display: block;
    z-index: 99999;
  }
`;

interface Props {
  index: number;
  formik?: FormikProps<typeof accompanyVal>;
  handleRemove: (index: number) => void;
  initialValues?: typeof accompanyVal;
  handleNextPage: () => void;
  handlePrevPage: () => void;
  setDependentsData: React.Dispatch<React.SetStateAction<IAccompany[]>>;
}

function AccompanyComponent({ index, handleRemove, initialValues, handleNextPage, handlePrevPage, setDependentsData }: Props) {
  const { isMobile } = useScreenResolution();
  const { numberOfDependants } = accompanyStore((state) => state);
  // const [formData, setFormData] = useState<typeof accompanyVal>(initialValues);

  const formik = useFormik({
    initialValues: accompanyVal,
    validationSchema: accompanySchema,
    onSubmit: (values) => {
      // console.log({ values });
      // setDependentsData((prev) => {
      //   return [
      //     ...prev,
      //     { ...formik.values }
      //   ];
      // });
      // handleNextPage();
      // submit the dependants to the api
      // console.log('you can submit the dependants data to the api');

      // clear the global state for the dependants

    }
  });

  // console.log({ index });

  return (
    <Section margin="20px 0">
      <Flex align="center" justify="space-between" margin="0 0 20px">
        <Text type="p" text={`DEPENDANT ${index}`} size={20} weight={600} />
        {/* <AiFillMinusCircle
          size={32}
          cursor="pointer"
          style={{ display: index === 0 ? 'none' : 'block' }}
          color={ttColors.primaryLight}
          onClick={() => handleRemove(index)}
        /> */}
      </Flex>
      <form>
        <Flex direction="column" gap="29px">
          <Grid columns="" style={{ gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }} align="center" gap="18px">
            <Flex direction="column" gap="14px">
              <Flex direction="row" align="center" gap="0.25rem">
                <Text type="label" text="Family Member's Name" />
                <Required margin="0 0" />
              </Flex>
              <FieldInput
                name="memberName"
                formik={formik}
                placeholder="Enter Member's Name"
              />
            </Flex>

            <Flex direction="column" gap="14px">
              <Flex direction="row" align="center" gap="0.25rem">
                <Text type="label" text="Relationship to you" />
                <Required margin="0 0" />
              </Flex>
              <FieldString
                formik={formik}
                name="relationship"
                placeholder="Enter Relationship to you"
                options={['Spouse', 'Son', 'Daughter', 'Father', 'Mother', 'Brother', 'Sister']}
                onChange={(e) => {
                  formik.setFieldValue('relationship', e);
                }}
                value={formik.values.relationship}
              />
            </Flex>
          </Grid>

          <Flex direction="column" gap='14px'>
            <Text type="label" text="Member's Address" />
            <FieldInput
              name='memberAddress'
              formik={formik}
              placeholder="Enter Member's Residential Address"
            />
          </Flex>

          <Grid columns={''} style={{ gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', alignItems: 'center' }} gap="18px">
            <Flex direction="column" gap='14px'>
              <Text type="label" text="Member's Occupation" />
              <FieldInput placeholder="Enter Guarantor's Occupation" name="memberOccupation" formik={formik} />
            </Flex>

            <Flex direction="column" gap="14px">
              <Text type="label" text="Member's Email Address" />
              <FieldInput
                name="memberEmail"
                formik={formik}
                placeholder="Enter Member's Email Address"
              />
            </Flex>
          </Grid>

          <Grid columns={''} style={{ gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', alignItems: 'center' }} gap="18px">
            <Flex direction="column" gap="14px">
              <Flex align="center" gap="0.25rem">
                <Text
                  type="label"
                  text="Phone Number"
                  // margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                  size={15}
                />
                <Required margin="0 0" />
              </Flex>
              <PhoneInputStyle>
                <PhoneInput
                  country={"ng"}
                  autoFormat={true}
                  // inputProps={{
                  //   name: "phoneNumber",
                  // }}
                  inputStyle={{ border: Object.keys(formik.touched).includes('phoneNumber') && Object.keys(formik.errors).includes('phoneNumber') ? `1px solid crimson` : '' }}
                  onChange={(e) => {
                    formik.setFieldValue("phoneNumber", e);
                  }}
                  inputClass="w"
                  placeholder="Enter phone numbers"
                // containerStyle={{ height: '56px' }}
                />
              </PhoneInputStyle>

              {Object.keys(formik.touched).includes('phoneNumber') && Object.keys(formik.errors).includes('phoneNumber') ? <ErrorText text={formik.errors?.phoneNumber ?? 'Required'} /> : null}
            </Flex>

            <Flex direction="column" gap="14px">
              <Flex>
                <Text type='label' text="Member's Worth" />
                <Required margin="0 0" />
              </Flex>
              <FieldInput name="memberWorth" formik={formik} placeholder="Enter Guarantor's Worth" />
            </Flex>
          </Grid>

          <Grid columns={''} style={{ gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', alignItems: 'flex-start' }} gap="18px">
            <Flex direction="column" gap="14px">
              <Flex align="center" gap="0.25rem">
                <Text type="label" text='Gender' />
                <Required margin="0 0" />
              </Flex>
              <FieldString
                name="gender"
                formik={formik}
                placeholder="Select Gender"
                options={['Male', 'Female']}
                onChange={(e) => {
                  formik.setFieldValue('gender', e);
                }}
                value={formik.values.gender}
              />
            </Flex>
            <Flex direction="column" gap="14px">
              <Flex direction="row" align="center" gap="0.25rem">
                <Text type="label" text='Date of Birth' />
                <Required margin="0 0" />
              </Flex>
              <FieldAsDate
                name="dateOfBirth"
                placeholder="Select your DOB"
                formik={formik}
                padding="0 0 0 0"
                // maxDate={dayjs(formik.values.expiryDate)}
                format="DD/MM/YYYY"
              />
            </Flex>
          </Grid>

          <Grid columns={''} style={{ gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', alignItems: 'center' }} gap="18px">
            <Flex direction="column" gap="14px">
              <Flex direction="row" align="center" gap="0.25rem">
                <Text type="label" text='Passport Number' margin={0} />
                <Required margin="0 0" />
              </Flex>
              <FieldInput
                name="passportNumber"
                formik={formik}
                placeholder="Enter Passport Number"
              />
            </Flex>

            <Flex direction="column" gap="14px" position="relative">
              <Flex direction="row" align="center" gap="0.25rem">
                <Text
                  type="p"
                  text="Issued Country"
                  margin={0}
                  // margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                  size={15}
                />
                <Required margin="0 0" />
              </Flex>
              <SectionContainer>
                <FieldAsString
                  options={COUNTRY_FLAGS.map((x) => ({
                    name: x.name,
                    flag: x.flag,
                    code: x.code,
                  }))}
                  formik={formik}
                  name="passportIssuedCountry"
                  placeholder="Select the country"
                  // onChange={formik.handleChange}
                  type="text"
                  value={formik.values.passportIssuedCountry}
                />
              </SectionContainer>
            </Flex>
          </Grid>

          <Grid columns={''} style={{ gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', alignItems: 'center' }} gap="18px">
            <Flex direction="column" gap="14px">
              <Flex direction="row" align="center" gap="0.25rem">
                <Text type="label" text='Issue Date' />
                <Required margin="0 0" />
              </Flex>
              <FieldAsDate
                name="issueDate"
                placeholder="Select Issue Date"
                formik={formik}
                padding="0 0 0 0"
                // maxDate={dayjs(formik.values.expiryDate)}
                format="DD/MM/YYYY"
              />
            </Flex>

            <Flex direction="column" gap="14px">
              <Flex direction="row" align="center" gap="0.25rem">
                <Text type="label" text='Expiry Date' />
                <Required margin="0 0" />
              </Flex>
              <FieldAsDate
                name="expiryDate"
                placeholder="Expiry Date"
                formik={formik}
                padding="0 0 0 0"
                // maxDate={dayjs(formik.values.expiryDate)}
                format="DD/MM/YYYY"
              />
            </Flex>
          </Grid>

          <Flex align="center" gap="18px">
            {/* <Button background="transparent" border={`1px solid ${ttColors.dark}`} width="50%" onClick={() => handlePrevPage()}>
              <Text type="p" text="Previous Dependent" color={index === 1 ? ttColors.lighterGray : ttColors.dark} />
            </Button> */}

            {index === numberOfDependants ? (
              <Button background={ttColors.blackishBlue} width="100%" type="submit" onClick={(e) => {
                e.preventDefault();
                if (formik.isValid === true) {
                  // console.log('formik is valid because the code went through');
                  // PUSH VALUES SOMEWHERE AND RESET THE FORM
                  setDependentsData((prev) => {
                    return [
                      ...prev,
                      { ...formik.values }
                    ];
                  });
                  formik.setFieldValue('phoneNumber', '');
                  // formik.resetForm();
                }
                formik.handleSubmit();
                // SUBMIT THE DEPENDANTS TO THE API

                // CLEAR THE DEPENDANTS ARRAY

              }}>
                <Text type="p" text='Continue' weight={500} />
              </Button>
            ) : (
              <Button background={ttColors.dark} type="button" width="100%" onClick={(e) => {
                e.preventDefault();
                formik.handleSubmit();
                // setDependentsData([]);
                // console.log(formik.isValidating, formik.errors);

                if (formik.isValid === true) {
                  // console.log('formik is valid because the code went through');
                  // PUSH VALUES SOMEWHERE AND RESET THE FORM
                  setDependentsData((prev) => {
                    return [
                      ...prev,
                      { ...formik.values }
                    ];
                  });
                  handleNextPage();
                  formik.setFieldValue('phoneNumber', '');
                  // formik.resetForm();
                }
              }}>
                <Text type="p" text="Next Dependent" />
              </Button>
            )}
          </Flex>
        </Flex>
      </form>
    </Section >
  );
}

export default AccompanyComponent;