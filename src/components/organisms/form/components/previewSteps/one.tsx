import React, { useState } from 'react'
import { MyAccordion } from '../applicationPreview';
import { Divider, Stack } from '@mui/material';
import Text from '@/components/atoms/text';
import { Detail } from '../applicationPreview';
import { DetailsKeys, PersonalInfoInterface } from '@/lib/types';
import Flex from '@/components/templates/flex';
import dayjs from 'dayjs';
import { formatDate } from '@/lib/utilFns';


interface OneProps{
    personalInfo: PersonalInfoInterface;
    applicationInfo: DetailsKeys;
}

function One({ applicationInfo, personalInfo }: OneProps) {
    const [isOpenAcc, setOpenAcc] = useState<number | null>(0)
    const toggleAcc = (index: number) => {
        setOpenAcc(prev => prev === index ? null : index)
    }

    return (
        <Flex direction='column' padding='1rem 0' gap="1rem" height='77%'>
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
                >
                    <Flex width='100%' wrap="wrap" gap="1rem">
                        <Detail name="Where are you?" value={applicationInfo?.homeCountry?.name} />
                        <Detail name="Where to?" value={applicationInfo?.destination?.name} />
                        <Detail name="Visa Type" value={applicationInfo?.visaType} />
                        <Detail name="Application Type" value={applicationInfo?.applicationType} />
                    </Flex>
                </MyAccordion>

                <MyAccordion
                    heading="Personal Details"
                    subHeading="Please ensure the Information you are providing is as shown on your passport or Travel Document"
                    toggle={() => toggleAcc(1)}
                    isOpen={isOpenAcc === 1}
                >
                    <Flex width='100%' direction='row' wrap="wrap" gap="1rem">
                        <Detail name="Last Name" value={personalInfo?.lastName} width='45%' />
                        <Detail name="First Name" value={personalInfo?.firstName} width='45%' />
                        <Detail name="Have you previously changed or used any surname or given names apart from the one provided above?" value={personalInfo?.changeOfName ? "Yes" : "No"} width='100%' />
                        {personalInfo?.changeOfName && <Detail name="Changed Name" value={personalInfo?.changedName} width='45%' />}
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

                        <Divider sx={{ width: '100%' }}/>
                        <Detail name="Country of Citizenship" value={personalInfo?.countryOfCitizen?.name} width='45%' />
                        <Detail name="Place of Birth" value={personalInfo?.placeOfBirth?.name} width='45%' />
                        <Detail name="Country of Residence" value={personalInfo?.countryOfResidence?.name} width='45%' />
                        <Detail name="Country where Applying" value={personalInfo?.countryOfApply?.name} width='45%' />
                        <Detail name="Status of Current Residence" value={personalInfo?.statusOfResidence} width='45%' />
                        <Detail name="Start Date of Current Residence" value={formatDate(personalInfo?.startDateOfResidence ?? '')} width='45%' />
                        {/* <Detail name="Place of Birth" value={personalInfo?.placeOfBirth?.name} width='45%' />
                        <Detail name="Place of Birth" value={personalInfo?.placeOfBirth?.name} width='45%' />
                        <Detail name="Place of Birth" value={personalInfo?.placeOfBirth?.name} width='45%' />
                        <Detail name="Place of Birth" value={personalInfo?.placeOfBirth?.name} width='45%' /> */}
                    </Flex>
                </MyAccordion>
            </Flex>

        </Flex>
    )
}

export default One