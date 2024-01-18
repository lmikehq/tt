import { Box, Dialog } from "@mui/material"
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution"
import Section from "../../section"
import Flex from "@/components/templates/flex"
import { IoMdClose } from "react-icons/io"
import { ttColors } from "@/lib/theme/colors"
import Text from "@/components/atoms/text"
import { Grid } from "@/components/templates/grid"
import PhoneInput from "react-phone-input-2"
import Required from "@/components/atoms/required"
import { useFormik, FormikProps } from "formik"
import { ErrorText, FieldAsDate, FieldAsString, FieldInput, FieldString } from "@/components/organisms/fieldInput"
import styled from "styled-components"
import { COUNTRY_FLAGS } from "@lib/extensions/data/COUNTRY_FLAGS"
import Button from "@/components/atoms/button"
import { accompanySchema, accompanyVal } from "@/lib/types/schema"

interface Props {
  open: boolean
  setState: React.Dispatch<React.SetStateAction<{ open: boolean, type: string }>>
}

const PhoneInputStyle = styled.div`
  .react-tel-input .form-control {
    height: 45px !important;
  }

  :hover {
   border-color: ${ttColors.primary};
   border-radius: 6px;
  }
`

const SectionContainer = styled.div`
  position: relative;
  z-index: 99999;

  .css-gbi5t6-MuiPopper-root {
    display: block;
    z-index: 99999;
    background-color: orange;
  }
`

export const AddVisaAccompanyModal = ({ open, setState }: Props) => {
  const { isMobile } = useScreenResolution()

  const handleClose = () => {
    setState((prev) => {
      return {
        ...prev,
        open: false,
        type: ''
      }
    })
  }

  const formik = useFormik({
    initialValues: accompanyVal,
    validationSchema: accompanySchema,
    onSubmit: (values) => {
      console.log('the code is in the submit')
    }
  })

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        '.css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
          width: '827px',
          borderRadius: '12px',
          maxWidth: '827px',
        }
      }}
    >
      <Flex align="center" justify="flex-end" padding={isMobile ? "20px 20px 0" : "20px 42px 0"}>
        <Flex
          align="center"
          justify="center"
          borderRadius="4px"
          styles={{ cursor: 'pointer' }}
          height="30px"
          width="30px"
          onClick={() => handleClose()}
        >
          <Flex
            background={ttColors.grayishAsh}
            height="30px"
            width="30px"
            align="center"
            justify="center"
          >
            <IoMdClose />
          </Flex>
        </Flex>
      </Flex>

      <Box sx={{ padding: isMobile ? '0 24px 20px' : '0 74px 41px' }}>
        <Flex direction="column" gap="16px" align="center" justify="center" margin="0 0 44px">
          <Text type='h1' text='Add Accompanies' weight={600} size={isMobile ? 22 : 32} />
          <Text type='p' text='Enter details of people you want to travel with.' textAlign="center" color={ttColors.lighterGray} />
        </Flex>

        <form onSubmit={formik.handleSubmit}>
          <Flex direction="column" gap="29px">
            <Grid columns="" style={{ gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }} align="center" gap="18px">
              <Flex direction="column" gap="14px">
                <Flex direction="row" align="center" gap="0.25rem">
                  <Text type="label" text="Family Member's Name" />
                  <Required />
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
                  <Required />
                </Flex>
                <FieldString
                  formik={formik}
                  name="relationship"
                  placeholder="Enter Relationship to you"
                  options={['Spouse', 'Son', 'Daughter', 'Father', 'Mother', 'Brother', 'Sister']}
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
                    type="p"
                    text="Phone Number"
                    // margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                    size={15}
                  />
                  <Required />
                </Flex>
                <PhoneInputStyle>
                  <PhoneInput
                    country={"ng"}
                    autoFormat={true}
                    inputProps={{
                      name: "phoneNumber",
                    }}
                    inputStyle={{ border: Object.keys(formik.touched).includes('phoneNumber') && Object.keys(formik.errors).includes('phoneNumber') ? `1px solid crimson` : '' }}
                    onChange={(e) => {
                      formik.setFieldValue("phoneNumber", e)
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
                  <Required />
                </Flex>
                <FieldInput name="memberWorth" formik={formik} placeholder="Enter Guarantor's Worth" />
              </Flex>
            </Grid>

            <Grid columns={''} style={{ gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', alignItems: 'center' }} gap="18px">
              <Flex direction="column" gap="14px">
                <Flex>
                  <Text type="label" text='Gender' />
                  <Required />
                </Flex>
                <FieldString
                  name="gender"
                  formik={formik}
                  placeholder="Select Gender"
                  options={['Male', 'Female']}
                />
              </Flex>
              <Flex direction="column" gap="14px">
                <Flex>
                  <Text type="label" text='Date of Birth' />
                  <Required />
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
                <Flex>
                  <Text type="label" text='Passport Number' />
                  <Required />
                </Flex>
                <FieldInput
                  name="passportNumber"
                  formik={formik}
                  placeholder="Enter Passport Number"
                />
              </Flex>

              <Flex direction="column" gap="14px" position="relative">
                <Flex>
                  <Text
                    type="p"
                    text="Issued Country"
                    // margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                    size={15}
                  />
                  <Required />
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
                  />
                </SectionContainer>
              </Flex>
            </Grid>

            <Grid columns={''} style={{ gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', alignItems: 'center' }} gap="18px">
              <Flex direction="column" gap="14px">
                <Flex>
                  <Text type="label" text='Issue Date' />
                  <Required />
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
                <Flex>
                  <Text type="label" text='Expiry Date' />
                  <Required />
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

            <Flex width="100%" justify="center" align="center">
              <Button background={ttColors.blackishBlue} width="50%" type="submit">
                <Text type="p" text='Continue' weight={500} />
              </Button>
            </Flex>
          </Flex>
        </form>
      </Box>
    </Dialog>
  )
}