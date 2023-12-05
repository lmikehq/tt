import React, { useState } from 'react'
import { MyAccordion } from '../applicationPreview';
import { Stack } from '@mui/material';
import Text from '@/components/atoms/text';
import { Detail } from '../applicationPreview';
import { EmploymentDetailsInterface } from '@/lib/types';
import Flex from '@/components/templates/flex';


interface ThreeProps{
    employmentInfo: EmploymentDetailsInterface[];
}

function Three({ employmentInfo = [] }: ThreeProps) {
    const [isOpenAcc, setOpenAcc] = useState<number | null>(0)

    const toggleAcc = (index: number) => {
        setOpenAcc(prev => prev === index ? null : index)
    }

    return (
        <Flex direction='column' padding='1rem 0' gap="1rem" height='77%'>
            <Stack direction="row">
                <Text
                    text={`Visa Application Preview (3/5)`}
                    type="h2"
                    size={18}
                    weight={600}
                />
            </Stack>

            <Flex direction='column' overflowX="hidden" overflowY="scroll" className='scroll-custom'>
                {employmentInfo.map((employment, index) =>
                    <MyAccordion
                        heading={`Employment Details ${index + 1}`}
                        toggle={() => toggleAcc(index)}
                        isOpen={isOpenAcc === index}
                        key={`employment-${index}`}
                    >
                        <Flex width='100%' wrap="wrap" gap="1rem">
                            <Detail name="Company Name" value={employment?.companyName} width='45%' />
                            <Detail name="Job Title" value={employment?.jobTitle} width='45%' />
                            <Detail name="Employment Type" value={employment?.employmentType} width='45%' />
                            <Detail name="Company's Location" value={employment?.companyLocation} width='45%' />
                            <Detail name="Location Type" value={employment?.locationType} width='45%' />
                            <Detail name="Start Year" value={employment?.startYear} width='45%' />
                            <Detail name="End Year" value={employment?.endYear} width='45%' />
                            <Detail name="I am currently working in this role" value={Boolean(employment?.stillWorking) ? "Yes" : "No"} width='45%' />
                        </Flex>
                    </MyAccordion>
                )}
            </Flex>

        </Flex>
    )
}

export default Three