import React, { useState } from 'react'
import { MyAccordion } from '../applicationPreview';
import { Stack } from '@mui/material';
import Text from '@/components/atoms/text';
import { Detail } from '../applicationPreview';
import { DocumentInterface, FamilyInfoInterface } from '@/lib/types';
import Flex from '@/components/templates/flex';


interface FiveProps{
    documentsInfo: DocumentInterface[];
}

function Five({ documentsInfo = [] }: FiveProps) {
    const [isOpenAcc, setOpenAcc] = useState<number | null>(0)

    const toggleAcc = (index: number) => {
        setOpenAcc(prev => prev === index ? null : index)
    }

    return (
        <Flex direction='column' padding='1rem 0' gap="1rem" height='77%'>
            <Stack direction="row">
                <Text
                    text={`Visa Application Preview (5/5)`}
                    type="h2"
                    size={18}
                    weight={600}
                />
            </Stack>

            <Flex direction='column' overflowX="hidden" overflowY="scroll" className='scroll-custom'>
                {documentsInfo.map((document, index) =>
                    <MyAccordion
                        heading={`Documents ${index + 1}`}
                        toggle={() => toggleAcc(index)}
                        isOpen={isOpenAcc === index}
                        key={`document-${index}`}
                    >
                        <Flex width='100%' wrap="wrap" gap="1rem">
                            <Detail name="Document Name" value={document?.name} width='45%' />
                            {/* <Detail name="Expiry Year" value={member?.expiryYear} width='45%' /> */}
                        </Flex>
                    </MyAccordion>
                )}
            </Flex>

        </Flex>
    )
}

export default Five