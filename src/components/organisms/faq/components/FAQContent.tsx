'use client'

import Text from '@/components/atoms/text'
import Flex from '@/components/templates/flex'
import React from 'react'
import { FAQContentType } from './content'
import FAQAccordion from './FAQAccordion'
import { useScreenResolution } from '@/lib/extensions/hook/useScreenResolution'
import { Box } from '@mui/material'

interface FAQContentProps {
    sections: FAQContentType[]
}
function FAQContent({ sections = [] }: FAQContentProps) {
    const { isMobile } = useScreenResolution()
    
    return (
        <React.Fragment>
            {sections.map((section, index) =>
                <Flex direction='column' key={`${section.name}-section`} gap="1rem" id={section.id}>
                    <Box
                        visibility='hidden'
                        height={isMobile ? '4rem' : '2rem'}
                    />
                    <Text
                        type='h3'
                        text={section.name}
                        weight={600}
                        margin={isMobile ? '0 0 0 1rem' : ''}
                    />
                    <FAQAccordion
                        key={`acc-${section.name}-${index}`}
                        items={section.questions}
                    />
                </Flex>
            )}
        </React.Fragment>
    )
}

export default FAQContent