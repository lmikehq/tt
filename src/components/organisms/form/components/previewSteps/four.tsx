import React, { useState } from 'react'
import { MyAccordion } from '../applicationPreview';
import { Stack } from '@mui/material';
import Text from '@/components/atoms/text';
import { Detail } from '../applicationPreview';
import { FamilyInfoInterface } from '@/lib/types';
import Flex from '@/components/templates/flex';
import { useScreenResolution } from '@/lib/extensions/hook/useScreenResolution';


interface FourProps{
    familyInfo: FamilyInfoInterface[];
    goToStep: (step: number) => void;
}

function Four({ familyInfo = [], goToStep }: FourProps) {
    const { isMobile } = useScreenResolution()
    const [isOpenAcc, setOpenAcc] = useState<number | null>(null)

    const toggleAcc = (index: number) => {
        setOpenAcc(prev => prev === index ? null : index)
    }

    return (
        <Flex direction='column' padding='1rem 0' gap="1rem" height={isMobile ? '65%' : '80%'}>
            <Stack direction="row">
                <Text
                    text={`Visa Application Preview (4/5)`}
                    type="h2"
                    size={18}
                    weight={600}
                />
            </Stack>

            <Flex direction='column' overflowX="hidden" overflowY="scroll" className='scroll-custom'>
                {familyInfo.length === 0 ? (
                    <Flex width='100%' justify='center' padding='2rem 0'>
                        <Text text='No family members' type='p' weight={500} />
                    </Flex>
                ) : familyInfo.map((member, index) =>
                    <MyAccordion
                        heading={`Family Member ${index + 1}`}
                        toggle={() => toggleAcc(index)}
                        isOpen={isOpenAcc === index}
                        onEdit={() => goToStep(5)}
                        key={`member-${index}`}
                    >
                        <Flex width='100%' wrap="wrap" gap="1.4rem">
                            <Detail name="Name" value={member?.membersName} width='45%' />
                            <Detail name="Relationship to Primary" value={member?.relationshipToPrimary} width='45%' />
                            <Detail name="Address" value={member?.address} width='45%' />
                            <Detail name="Email" value={member?.membersEmail} width='45%' />
                            <Detail name="Phone Number" value={member?.membersPhoneNumber} width='45%' />
                            <Detail name="Occupation" value={member?.membersOccupation} width='45%' />
                            <Detail name="Date of Birth" value={member?.dateOfBirth} width='45%' />
                            <Detail name="Marital Status" value={member?.maritalStatus} width='45%' />
                            <Detail name="Will you be traveling with this Family Member?" value={Boolean(member?.accompanying) ? "Yes" : "No"} width='45%' />
                            <Detail name="Gender" value={member?.gender} width='45%' />
                            <Detail name="Passport Number" value={member?.passportNumber} width='45%' />
                            <Detail name="Issued Country" value={member?.issueCountry?.name} width='45%' />
                            <Detail name="Issue Year" value={member?.issueYear} width='45%' />
                            <Detail name="Expiry Year" value={member?.expiryYear} width='45%' />
                        </Flex>
                    </MyAccordion>
                )}
            </Flex>

        </Flex>
    )
}

export default Four