'use client'

import Image from '@/components/atoms/image'
import { useScreenResolution } from '@/lib/extensions/hook/useScreenResolution'
import { Box } from '@mui/material'
import React from 'react'
const gridAreaMap = ['a', 'b', 'c', 'd', 'e', 'f']


interface ImageGridProps {
    images?: string[]
}
function ImageGrid({ images = [] }: ImageGridProps) {
    const { isMobile } = useScreenResolution();

    return (
        <Box
            display='grid'
            gridTemplateAreas={isMobile ? '' : `
                'a a b b b c c'
                'a a b b b c c'
                'a a e e e c c'
                'd d e e e f f'
                'd d e e e f f'
            `}
            gridTemplateColumns={isMobile ? '1fr' : ''}
            columnGap='1rem'
            rowGap='1rem'
        >
            {images.map((img, index) => 
                <Box key={`grid-img-${index}`} gridArea={isMobile ? '' : gridAreaMap[index]}>
                    <Image
                        alt='grid-image'
                        src={img}
                        styles={{ width: '100%', borderRadius: '0.5rem' }}
                    />
                </Box>
            )}
        </Box>
    )
}

export default ImageGrid