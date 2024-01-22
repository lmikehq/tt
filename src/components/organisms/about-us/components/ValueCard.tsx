'use client'

import Image from '@/components/atoms/image';
import Text from '@/components/atoms/text';
import Flex from '@/components/templates/flex';
import { useScreenResolution } from '@/lib/extensions/hook/useScreenResolution';
import { ttColors } from '@/lib/theme/colors';
import React, { useState } from 'react'

interface ValueCardProps {
    heading: string;
    text: string;
    index: number;
}
function ValueCard({ heading, text, index }: ValueCardProps) {
    const { isMobile } = useScreenResolution();
    const [hover, setHover] = useState(false);

    return (
        <Flex
            direction='column'
            gap="1rem"
            padding='4rem 1.5rem 1.5rem'
            position='relative'
            overflow='hidden'
            borderRadius='0.5rem'
            background={hover ? ttColors.primary600 : '#F0F0F0'}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <Image
                alt='grid-image'
                src={hover ? '/assets/images/about-us/value-card-vector.svg' : '/assets/images/about-us/value-card-vector-blue.svg'}
                styles={{ top: '0%', right: '0%', position: 'absolute' }}
                width={100}
                height={100}
            />
            <Text
                type='p'
                text={heading}
                size={18}
                weight={600}
                color={hover ? 'white' : ''}
            />
            <Text
                type='p'
                text={text}
                size={14}
                color={hover ? 'white' : ''}
            />
        </Flex>
    )
}

export default ValueCard