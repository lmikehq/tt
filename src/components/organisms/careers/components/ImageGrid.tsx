import Image from '@/components/atoms/image'
import { useScreenResolution } from '@/lib/extensions/hook/useScreenResolution'
import { Box } from '@mui/material'
import React from 'react'

interface ImageGridProps {
    images?: string[]
}

function ImageGrid({ images = [] }: ImageGridProps) {
    const { isMobile } = useScreenResolution();
    return (
        <Box
            width={isMobile?'100%':"80%"}
            display='grid'
            gridTemplateColumns={isMobile ? '1fr' : '1fr'}
            columnGap='0'
            rowGap={isMobile ? '1rem' : '1rem'}
        >
            {images.map((img, index) =>
                <Box
                    key={`grid-img-${index}`}
                    overflow='hidden'
                    borderRadius='1rem'
                    width={"100%"}
                    // transform={isMobile ? '' : index === 1 ? 'translateY(50%)' : ''}
                   
                >
                    <Image
                        alt='grid-image'
                        src={img}
                        styles={{
                            width: '100%',
                            // objectFit: 'scale-down',
                            height: isMobile ? 'auto' : 'auto'}}
                    />
                </Box>
            )}
        </Box>
    )
}

export default ImageGrid