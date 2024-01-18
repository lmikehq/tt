'use client'

import Text from '@/components/atoms/text';
import Flex from '@/components/templates/flex';
import { useScreenResolution } from '@/lib/extensions/hook/useScreenResolution';
import { Box } from '@mui/material'
import React, { ReactNode } from 'react'


interface BulletCardProps {
    heading: string;
    text: string;
    icon: ReactNode;
}
function BulletCard({ heading, text, icon }: BulletCardProps) {
    const { isMobile } = useScreenResolution();

    return (
        <Flex
            direction='column'
            gap='1.5rem'
            padding='2rem 0'
        >
            {icon}
            <Flex direction='column' gap='1rem'>
                <Text
                    type='h2'
                    text={heading}
                    size={24}
                    weight={600}
                />
                <Text
                    type='p'
                    text={text}
                    size={15}
                />
            </Flex>
        </Flex>
    )
}

export default BulletCard