'use client'

import Flex from '@/components/templates/flex'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FAQContentType } from './content'
import Text from '@/components/atoms/text'
import { LuUser2 } from 'react-icons/lu'
import { ttColors } from '@/lib/theme/colors'
import { useScreenResolution } from '@/lib/extensions/hook/useScreenResolution'

interface FAQHeadingsProps {
    sections: FAQContentType[]
}
function FAQHeadings({ sections = [] }: FAQHeadingsProps) {
    const pathname = usePathname()
    const { push } = useRouter()
    const { isMobile } = useScreenResolution()
    const [hover, setHover] = useState<number | null>(null)
    

    const goToSection = (id: string) => {
        push(`${pathname}#${id}`)
    }

    return (
        <Flex
            direction={isMobile ? 'row' : 'column'}
            margin="0 0 1rem"
            overflowX='auto'
            className='scroll-custom'
        >
            {sections.map((section, index) => 
                <Flex
                    key={`${section.name}-heading`}
                    gap="1rem"
                    onClick={() => goToSection(section.id)}
                    align='center'
                    cursor='pointer'
                    borderRadius='.5rem'
                    padding='1.4rem 1rem'
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(null)}
                    background={hover === index ? ttColors.primary300 : ''}
                    >
                    {section.icon ?? <LuUser2 color={ttColors.dark} size={22} />}
                    <Text
                        type="p"
                        text={section.name}
                        size={15}
                        styles={{ minWidth: isMobile ? 'max-content' : 'max-content'}}
                    />
                </Flex>
            )}
        </Flex>
    )
}

export default FAQHeadings