'use client'

import Button from '@/components/atoms/button';
import Text from '@/components/atoms/text';
import Flex from '@/components/templates/flex';
import { useScreenResolution } from '@/lib/extensions/hook/useScreenResolution';
import { ttColors } from '@/lib/theme/colors';
import { Box } from '@mui/material'
import dayjs from 'dayjs';
import React from 'react'

export interface PositionCardProps {
    position: string;
    description: string;
    tags: string[];
    status: string;
    deadline: string;
}
function PositionCard({ position, description, tags, status, deadline }: PositionCardProps) {
    const { isMobile } = useScreenResolution();

    return (
        <Box
            display='grid'
            gridTemplateColumns={isMobile ? '1fr' : '4fr 1fr'}
            columnGap={isMobile ? '' : '3rem'}
            rowGap={isMobile ? '2.5rem' : ''}
            border={`1px solid ${ttColors.lightestGray}`}
            borderRadius='.5rem'
            padding='2.5rem 2rem'
            alignItems='center'
        >
            <Flex direction='column' gap="1rem">
                <Text
                    type='p'
                    text={position}
                    size={18}
                    weight={600}
                />
                <Text
                    type='p'
                    text={description}
                    size={15}
                />
                <Flex align='center' gap="1rem">
                    {tags.map((tag, index, arr) => 
                        <React.Fragment key={`tag-${tag}-${index}`}>
                            <Text
                                key={`tag-${index}`}
                                type='p'
                                text={tag}
                                size={13}
                                color={ttColors.foundation.gray}
                            />
                            {index !== (arr.length - 1) &&
                                <Flex
                                    width='.5rem'
                                    height='.5rem'
                                    background={ttColors.lighterGray}
                                    borderRadius='100%'
                                />
                            }
                        </React.Fragment>
                    )}
                </Flex>
            </Flex>

            <Flex direction='column' align={isMobile ? '' : 'center'} gap="1rem">
                <Button
                    background={ttColors.dark}
                    padding='0 5rem'
                >
                    <Text
                        type='p'
                        text='Apply Here'
                        size={15}
                        color='white'
                        width='max-content'
                    />
                </Button>
                <Text
                    type='p'
                    text={`Deadline: ${dayjs(deadline).format('Do MMM, YYYY')}`}
                    size={14}
                    color={ttColors.foundation.gray}
                />
            </Flex>
        </Box>
    )
}

export default PositionCard