'use client'

import Button from '@/components/atoms/button';
import Text from '@/components/atoms/text';
import Flex from '@/components/templates/flex'
import { useScreenResolution } from '@/lib/extensions/hook/useScreenResolution';
import { ttColors } from '@/lib/theme/colors';
import React from 'react'
import { RiCustomerService2Fill } from "react-icons/ri";


function ReachOut() {
    const { isMobile } = useScreenResolution()
    return (
        <Flex
            borderRadius='1rem'
            background={ttColors.primary300}
            padding='1.5rem'
            gap={isMobile ? ".2rem" : "1rem"}
            direction={isMobile ? 'column' : 'row'}
            align={isMobile ? 'flex-start' : 'center'}
        >
            <Flex width='max-content' padding='1rem' margin="0 0 0 -1rem">
                <RiCustomerService2Fill
                    color={ttColors.dark}
                    size={isMobile ? 50 : 60}
                />
            </Flex>
            <Flex
                direction={isMobile ? 'column' : 'row'}
                justify='space-between'
                align={isMobile ? 'flex-start' : 'center'}
                gap={isMobile ? '1.5rem' : '2.5rem' }
            >
                <Flex direction='column' gap=".4rem">
                    <Text
                        text='Reach out to us'
                        type='p'
                        weight={600}
                        size={isMobile ? 18 : 20}
                    />
                    <Text
                        text='Access instant responses, and utilize our self-help functionalities for prompt assistance.'
                        type='p'
                        weight={500}
                        size={isMobile ? 13 : 13}
                    />
                </Flex>
                <Button
                    background={ttColors.dark}
                    color='white'
                    padding='1rem 1.5rem'
                    width='max-content'
                >
                    <Text
                        text='Contact Customer Service'
                        type='p'
                        size={14}
                        weight={500}
                        width='max-content'
                    />
                </Button>
            </Flex>

        </Flex>
    )
}

export default ReachOut