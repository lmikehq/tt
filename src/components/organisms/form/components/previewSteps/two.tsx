import React, { useState } from 'react'
import { MyAccordion } from '../applicationPreview';
import { Stack } from '@mui/material';
import Text from '@/components/atoms/text';
import { Detail } from '../applicationPreview';
import { EducationDetailsInterface } from '@/lib/types';
import Flex from '@/components/templates/flex';


interface TwoProps{
    educationInfo: EducationDetailsInterface[];
}

function Two({ educationInfo = [] }: TwoProps) {
    const [isOpenAcc, setOpenAcc] = useState<number | null>(0)

    const toggleAcc = (index: number) => {
        setOpenAcc(prev => prev === index ? null : index)
    }

    return (
        <Flex direction='column' padding='1rem 0' gap="1rem" height='77%'>
            <Stack direction="row">
                <Text
                    text={`Visa Application Preview (2/5)`}
                    type="h2"
                    size={18}
                    weight={600}
                />
            </Stack>

            <Flex direction='column' overflowX="hidden" overflowY="scroll" className='scroll-custom'>
                {educationInfo.map((education, index) =>
                    <MyAccordion
                        heading={`Education Details ${index + 1}`}
                        toggle={() => toggleAcc(index)}
                        isOpen={isOpenAcc === index}
                        key={`education-${index}`}
                    >
                        <Flex width='100%' wrap="wrap" gap="1rem">
                            <Detail name="School Name" value={education?.school} width='45%' />
                            <Detail name="Where to?" value={education?.degree} width='45%' />
                            <Detail name="Visa Type" value={education?.fieldOfStudy} width='45%' />
                            <Detail name="CGPA" value={education?.cgpa} width='45%' />
                            <Detail name="Location" value={education?.location} width='45%' />
                            <Detail name="Start Year" value={education?.startYear} width='45%' />
                            <Detail name="End Year" value={education?.endYear} width='45%' />
                            <Detail name="I am currently in school" value={Boolean(education?.stillAtSchool) ? "Yes" : "No"} width='45%' />
                        </Flex>
                    </MyAccordion>
                )}
            </Flex>

        </Flex>
    )
}

export default Two