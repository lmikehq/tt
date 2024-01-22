'use client'

import Flex from '@/components/templates/flex'
import React, { useState } from 'react'
import { FAQContentType } from './content'
import Text from '@/components/atoms/text'
import { LuUser2 } from 'react-icons/lu'
import { ttColors } from '@/lib/theme/colors'
import { useScreenResolution } from '@/lib/extensions/hook/useScreenResolution'
import styled from 'styled-components'
import Link from 'next/link'

const FlexWrapper = styled(Flex)<{ isActive: boolean; isHovered: boolean; }>`
    & svg {
        fill: ${({isActive, isHovered }) => isActive ? 'white' : ''};
        stroke: ${({isActive, isHovered }) => isActive ? 'white' : ''};
    }
`
const LinkWrapper = styled(Link)<{ isActive: boolean; isHovered: boolean; }>`
    & p {
        color: ${({ isActive }) => isActive ? 'white !important' : `${ttColors.dark} !important`}
    };
`

interface FAQHeadingsProps {
    sections: FAQContentType[];
    active: string;
    onSelect: (x: string) => void;
}
function FAQHeadings({ sections = [], active, onSelect }: FAQHeadingsProps) {
    const { isMobile } = useScreenResolution()
    const [hover, setHover] = useState<number | null>(null)
    
    const goToSection = (id: string) => {
        onSelect(id)
    }


    return (
        <Flex
            direction={isMobile ? 'row' : 'column'}
            margin="0 0 1rem"
            overflowX='auto'
            className='scroll-custom'
            position='sticky'
            styles={{
                top: 0,
                alignSelf: 'start',
                zIndex: 1,
            }}
            background='#fafbfc'
        >
            {sections.map((section, index) => 
                <LinkWrapper
                    key={`${section.name}-heading`}
                    href={`#${section.id}`}
                    onClick={() => goToSection(section.id)}
                    style={{ textDecoration: 'none' }}
                    isActive={active === section.id}
                    isHovered={hover === index}
                >
                    <FlexWrapper
                        gap="1rem"
                        align='center'
                        cursor='pointer'
                        borderRadius='.5rem'
                        padding='1.4rem 1rem'
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(null)}
                        background={active === section.id ? ttColors.dark : hover === index ? ttColors.primary300 : ''}
                        isActive={active === section.id}
                        isHovered={hover === index}
                    >
                        {section.icon ??
                            <LuUser2
                                color={active === section.id ? 'white' : hover === index ? ttColors.dark : ''}
                                size={22}
                            />
                        }
                        <Text
                            type="p"
                            text={section.name}
                            size={15}
                            width='max-content'
                            color={active === section.id ? 'white' : hover === index ? ttColors.dark : ''}
                        />
                    </FlexWrapper>
                </LinkWrapper>
            )}
        </Flex>
    )
}

export default FAQHeadings