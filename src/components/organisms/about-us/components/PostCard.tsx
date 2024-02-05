'use client'

import Image from '@/components/atoms/image';
import Text from '@/components/atoms/text';
import Flex from '@/components/templates/flex';
import { useScreenResolution } from '@/lib/extensions/hook/useScreenResolution';
import { Box } from '@mui/material'
import React from 'react'

interface PostCardProps {
    heading: string;
    text: string;
    imgSrc?: string;
}
function PostCard({ heading, text, imgSrc = '/assets/images/empty-img.png' }: PostCardProps) {
    const { isMobile } = useScreenResolution();

    return (
        <Box
            display='grid'
            gridTemplateColumns={isMobile ? '1fr' : '1fr 1fr'}
            columnGap='4rem'
            rowGap='3rem'
            padding='2rem 0'
            alignItems='center'
        >
            <Image
                alt='post-block'
                src='/assets/images/empty-img.png'
                styles={{ width: '100%', borderRadius: '.5rem' }}
                height={400}
            />
            <Flex direction='column' gap='1.5rem'>
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
                    textAlign='justify'
                />
            </Flex>
        </Box>
    )
}

export default PostCard