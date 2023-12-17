import React, { useState } from 'react'
import { MyAccordion } from '../applicationPreview';
import { Divider, Stack } from '@mui/material';
import Text from '@/components/atoms/text';
import { Detail } from '../applicationPreview';
import { DetailsKeys, PersonalInfoInterface } from '@/lib/types';
import Flex from '@/components/templates/flex';
import { formatDateString } from '@/lib/utilFns';
import { useScreenResolution } from '@/lib/extensions/hook/useScreenResolution';

const MyBoolean = (x: boolean | null | undefined) => {
    return String(x) === 'true' ? true : false
}

interface OneProps{
    personalInfo: PersonalInfoInterface;
    applicationInfo: DetailsKeys;
    goToStep: (step: number) => void;
}

function One({ applicationInfo, personalInfo, goToStep }: OneProps) {
    const { isMobile } = useScreenResolution()
    const [isOpenAcc, setOpenAcc] = useState<number | null>(null)
    const toggleAcc = (index: number) => {
        setOpenAcc(prev => prev === index ? null : index)
    }

    return (
        <Flex direction='column' padding='1rem 0' gap="1rem" height={isMobile ? '65%' : '80%'}>
            <Stack direction="row">
                <Text
                    text={`Visa Application Preview (1/5)`}
                    type="h2"
                    size={18}
                    weight={600}
                />
            </Stack>

            <Flex direction='column'overflowX="hidden" overflowY="scroll" className='scroll-custom'>
                <MyAccordion
                    heading="Trip Details"
                    toggle={() => toggleAcc(0)}
                    isOpen={isOpenAcc === 0}
                    onEdit={() => goToStep(1)}
                >
                    <Flex width='100%' wrap="wrap" gap="1.4rem">
                        <Detail name="Where are you?" value={applicationInfo?.homeCountry?.name} width={isMobile ? '45%' :'23%'} />
                        <Detail name="Where to?" value={applicationInfo?.destination?.name} width={isMobile ? '45%' :'23%'} />
                        <Detail name="Visa Type" value={applicationInfo?.visaType} width={isMobile ? '45%' :'23%'} />
                        <Detail name="Application Type" value={applicationInfo?.applicationType} width={isMobile ? '45%' :'23%'} />
                    </Flex>
                </MyAccordion>

                <MyAccordion
                    heading="Personal Details"
                    subHeading="Please ensure the Information you are providing is as shown on your passport or Travel Document"
                    toggle={() => toggleAcc(1)}
                    isOpen={isOpenAcc === 1}
                    onEdit={() => goToStep(2)}
                >
                    <Flex width='100%' direction='row' wrap="wrap" gap="1.4rem">
                        <Detail name="Last Name" value={personalInfo?.lastName} width='45%' />
                        <Detail name="First Name" value={personalInfo?.firstName} width='45%' />
                        <Detail name="Have you previously changed or used any surname or given names apart from the one provided above?" value={personalInfo?.changeOfName ? "Yes" : "No"} width='100%' />
                        {MyBoolean(personalInfo?.changeOfName) && <Detail name="Changed Name" value={personalInfo?.changedName} width='45%' />}
                        <Detail name="Middle Name" value={personalInfo?.firstName} width='45%' />
                        <Detail name="State of Origin" value={personalInfo?.stateOfOrigin} width='45%' />
                        <Detail name="Place of Origin" value={personalInfo?.placeOfOrigin} width='45%' />
                        <Detail name="Native Language" value={personalInfo?.nativeLanguage} width='45%' />
                        <Detail name="Email Address" value={personalInfo?.email} width='45%' />
                        <Detail name="Phone Number" value={personalInfo?.phoneNumber} width='45%' />
                        <Detail name="Date Of Birth" value={personalInfo?.dateOfBirth} width='45%' />
                        <Detail name="Current Occupation" value={personalInfo?.occupation} width='45%' />
                        <Detail name="Means of ID" value={personalInfo?.meansOfId} width='45%' />
                        <Detail name="ID Number" value={personalInfo?.idNumber} width='45%' />
                        <Detail name="Issue Date" value={personalInfo?.issueDate} width='45%' />
                        <Detail name="Expiry Date" value={personalInfo?.expiryDate} width='45%' />

                        <Divider sx={{ width: '100%' }} />
                        <Detail name="Country of Citizenship" value={personalInfo?.countryOfCitizen?.name} width='45%' />
                        <Detail name="Place of Birth" value={personalInfo?.placeOfBirth?.name} width='45%' />
                        <Detail name="Country of Residence" value={personalInfo?.countryOfResidence?.name} width='45%' />
                        <Detail name="Country where Applying" value={personalInfo?.countryOfApply?.name} width='45%' />
                        <Detail name="Status of Current Residence" value={personalInfo?.statusOfResidence} width='45%' />
                        <Detail name="Start Date of Current Residence" value={formatDateString(personalInfo?.startDateOfResidence ?? '')} width='45%' />
                        {!!personalInfo?.prevResidence1?.name &&
                            <React.Fragment>
                                <Detail name="Previous Country of Residence 1" value={personalInfo?.prevResidence1?.name} width='45%' />
                                <Detail name="Since When?" value={formatDateString(personalInfo?.startDatePrevResidence1 ?? '')} width='45%' />
                                <Detail name="Till When?" value={formatDateString(personalInfo?.endDatePrevResidence1 ?? '')} width='45%' />
                            </React.Fragment>
                        }
                        {!!personalInfo?.prevResidence2?.name &&
                            <React.Fragment>
                                <Detail name="Previous Country of Residence 2" value={personalInfo?.prevResidence2?.name} width='45%' />
                                <Detail name="Since When?" value={formatDateString(personalInfo?.startDatePrevResidence2 ?? '')} width='45%' />
                                <Detail name="Till When?" value={formatDateString(personalInfo?.endDatePrevResidence2 ?? '')} width='45%' />
                            </React.Fragment>
                        }
                        {!!personalInfo?.prevResidence3?.name &&
                            <React.Fragment>
                                <Detail name="Previous Country of Residence 3" value={personalInfo?.prevResidence3?.name} width='45%' />
                                <Detail name="Since When?" value={formatDateString(personalInfo?.startDatePrevResidence3 ?? '')} width='45%' />
                                <Detail name="Till When?" value={formatDateString(personalInfo?.endDatePrevResidence3 ?? '')} width='45%' />
                            </React.Fragment>
                        }
                        {!!personalInfo?.prevResidence4?.name &&
                            <React.Fragment>
                                <Detail name="Previous Country of Residence 4" value={personalInfo?.prevResidence4?.name} width='45%' />
                                <Detail name="Since When?" value={formatDateString(personalInfo?.startDatePrevResidence4 ?? '')} width='45%' />
                                <Detail name="Till When?" value={formatDateString(personalInfo?.endDatePrevResidence4 ?? '')} width='45%' />
                            </React.Fragment>
                        }
                        {!!personalInfo?.prevResidence5?.name &&
                            <React.Fragment>
                                <Detail name="Previous Country of Residence 5" value={personalInfo?.prevResidence5?.name} width='45%' />
                                <Detail name="Since When?" value={formatDateString(personalInfo?.startDatePrevResidence5 ?? '')} width='45%' />
                                <Detail name="Till When?" value={formatDateString(personalInfo?.endDatePrevResidence5 ?? '')} width='45%' />
                            </React.Fragment>
                        }
                        
                        <Divider sx={{ width: '100%' }} />
                        <Detail name="Gender" value={personalInfo?.gender} width='45%' />
                        <Detail name="Passport Number" value={personalInfo?.passportNumber} width='45%' />
                        <Detail name="Issued Country" value={personalInfo?.passportIssuedCountry?.name} width='45%' />
                        <Detail name="Issued Date" value={formatDateString(personalInfo?.passportIssuedDate ?? '')} width='45%' />
                        <Detail name="Expiry Date" value={formatDateString(personalInfo?.passportExpiryDate ?? '')} width='45%' />
                        
                        <Divider sx={{ width: '100%' }} />
                        <Detail name="Are you a lawful permanent Resident of the United States with a valid alien registration card (Green Card)?" value={MyBoolean(personalInfo?.hasGreenCard) ? "Yes" : "No"} width='45%' />
                        <Detail name="Document Number" value={personalInfo?.greenCardNumber} width='45%' />
                        <Detail name="Expiry Date" value={formatDateString(personalInfo?.greenCardExpiryDate ?? '')} width='45%' />
                        
                        <Divider sx={{ width: '100%' }} />
                        <Detail name="Marital Status" value={personalInfo?.maritalStatus} width='45%' />
                        {personalInfo.maritalStatus === "Married" && <Detail name="Marriage Start Date" value={formatDateString(personalInfo?.marriageStartDate ?? '')} width='45%' />}
                        {personalInfo.maritalStatus === "Married" && <Detail name="Marriage End Date" value={formatDateString(personalInfo?.marriageEndDate ?? '')} width='45%' />}
                        
                        <Divider sx={{ width: '100%' }} />
                        <Detail name="Main Purpose of your Trip" value={personalInfo?.tripPurpose} width='100%' />
                        <Detail name="Start Duration" value={formatDateString(personalInfo?.tripDurationStartDate ?? '')} width='45%' />
                        <Detail name="End Duration" value={formatDateString(personalInfo?.tripDurationEndDate ?? '')} width='45%' />
                        <Detail name="Where do you intend to work or stay?" value={personalInfo?.tripDurationLocation} width='45%' />
                        <Detail name="Do you know anybody there?" value={MyBoolean(personalInfo?.hasContactInLocation) ? 'Yes' : 'No'} width='45%' />
                        {MyBoolean(personalInfo?.hasContactInLocation) && <Detail name="Contact Last Name" value={personalInfo?.contactInLocationLastName} width='45%' />}
                        {MyBoolean(personalInfo?.hasContactInLocation) && <Detail name="Contact First Name" value={personalInfo?.contactInLocationFirstName} width='45%' />}
                        {MyBoolean(personalInfo?.hasContactInLocation) && <Detail name="Contact Residential Address" value={personalInfo?.contactInLocationAddress} width='45%' />}
                        {MyBoolean(personalInfo?.hasContactInLocation) && <Detail name="Contact Relationship" value={personalInfo?.contactInLocationRelationship} width='45%' />}
                        {MyBoolean(personalInfo?.hasContactInLocation) && <Detail name="Contact Phone Number" value={personalInfo?.contactInLocationPhoneNumber} width='45%' />}
                        
                        <Divider sx={{ width: '100%' }} />
                        <Detail name={`Within the past two years, have you or a family member ever had tuberculosis of the lungs or been in close contact with a person with tuberculosis?`} value={MyBoolean(personalInfo?.tuberculosis) ? 'Yes' : 'No'} width='100%' />
                        {MyBoolean(personalInfo?.tuberculosis) && <Detail name="Details" value={personalInfo?.tuberculosisDetails} width='100%' />}
                        <Detail name={`Do you have any physical or mental disorder that would require social and/or health services, other than medication, during a stay in ${applicationInfo?.destination?.name}?`} value={MyBoolean(personalInfo?.mentalDisorder) ? 'Yes' : 'No'} width='100%' />
                        {MyBoolean(personalInfo?.mentalDisorder) && <Detail name="Details" value={personalInfo?.mentalDisorderDetails} width='100%' />}
                        <Detail name={`Have you ever remained beyond the validity of your status, attended school without authorization or worked without authorization in ${applicationInfo?.destination?.name}?`} value={MyBoolean(personalInfo?.remainbeyondValidity) ? 'Yes' : 'No'} width='100%' />
                        {MyBoolean(personalInfo?.remainbeyondValidity) && <Detail name="Details" value={personalInfo?.remainbeyondValidityDetails} width='100%' />}
                        <Detail name={`Have you ever been refused a visa or permit, denied entry or ordered to leave ${applicationInfo?.destination?.name} or any other country?`} value={MyBoolean(personalInfo?.refusedBefore) ? 'Yes' : 'No'} width='100%' />
                        {MyBoolean(personalInfo?.refusedBefore) && <Detail name="Details" value={personalInfo?.refusedBeforeDetails} width='100%' />}
                        <Detail name={`Have you ever committed, been arrested for, been charged with or convicted of any criminal offense?`} value={MyBoolean(personalInfo?.arrestedBefore) ? 'Yes' : 'No'} width='100%' />
                        {MyBoolean(personalInfo?.arrestedBefore) && <Detail name="Details" value={personalInfo?.arrestedBeforeDetails} width='100%' />}
                        <Detail name={`Did you serve in any military, militia, or defense unit or serve in a security organization or police force (including non-obligatory national service, reserve or volunteer units)?`} value={MyBoolean(personalInfo?.servedInMilitary) ? 'Yes' : 'No'} width='100%' />
                        {MyBoolean(personalInfo?.servedInMilitary) && <Detail name="Details" value={personalInfo?.servedInMilitaryDetails} width='100%' />}
                        <Detail name={`Are you, or have you ever been a member or associated with any political party, or other group or organization which has engaged in or advocated violence as a means to achieving a political or religious objective, or which has been associated with criminal activity at any time?`} value={MyBoolean(personalInfo?.memberOfViolentGroup) ? 'Yes' : 'No'} width='100%' />
                        {MyBoolean(personalInfo?.memberOfViolentGroup) && <Detail name="Details" value={personalInfo?.memberOfViolentGroupDetails} width='100%' />}
                        <Detail name={`Have you ever witnessed or participated in the ill treatment of prisoners or civilians, looting or desecration of religious buildings?`} value={MyBoolean(personalInfo?.participatedInViolentActivities) ? 'Yes' : 'No'} width='100%' />
                        {MyBoolean(personalInfo?.participatedInViolentActivities) && <Detail name="Details" value={personalInfo?.participatedInViolentActivitiesDetails} width='100%' />}
                    </Flex>
                </MyAccordion>
            </Flex>

        </Flex>
    )
}

export default One