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
            width='100%'
            display='grid'
            gridTemplateAreas={isMobile ? '' : `
                'a a a a a a'
                'b b b c c c'
                'd d d d d d'
                // 'a a b b b c c'
                // 'a a b b b c c'
                // 'a a e e e c c'
                // 'd d e e e f f'
                // 'd d e e e f f'
            `}
            gridTemplateColumns={isMobile ? '1fr' : ''}
            columnGap='0'
            rowGap='1rem'
        >
            {images.map((img, index) =>
                <Box
                    key={`grid-img-${index}`}
                    gridArea={isMobile ? '' : gridAreaMap[index]}
                    overflow='hidden'
                    height='700px'
                    borderRadius='1rem'
                >
                    <Image
                        alt='grid-image'
                        src={img}
                        styles={{
                            width: '100%',
                            objectFit: 'scale-down',
                            transform: `scale(1.6) ${[0, 3].includes(index) ? 'translateY(120px)' : [2].includes(index) ? 'translateX(-20px) translateY(80px)' : ''}`
                        }}
                    />
                </Box>
            )}
        </Box>
    )
}

export default ImageGrid