'use client'

import Text from '@/components/atoms/text';
import Flex from '@/components/templates/flex'
import { useScreenResolution } from '@/lib/extensions/hook/useScreenResolution';
import { ttColors } from '@/lib/theme/colors';
import React from 'react'


interface OneTabProps {
    text: string;
    isActive: boolean;
    onClick: () => void;
}
function OneTab({ text, isActive, onClick }: OneTabProps) {
    const { isMobile } = useScreenResolution()
    return (
        <Flex
            padding='1.2rem 1.5rem'
            justify='center'
            onClick={onClick}
            background={isActive ? ttColors.dark : 'transparent'}
            borderRadius='.5rem'
            cursor='pointer'
        >
            <Text
                type='p'
                text={text}
                color={isActive ? 'white' : ttColors.dark}
                weight={500}
                size={isMobile ? 15 : 16}
                styles={{ minWidth: 'max-content'}}
            />
        </Flex>
    )
}

interface FAQTabsProps {
    onClick: (x: string) => void;
    activeTab: string;
}
function FAQTabs({ onClick, activeTab }: FAQTabsProps) {
    return (
        <Flex background={ttColors.primary50} borderRadius='.5rem' padding='.5rem' overflowX='auto' className='scroll-custom'>
            <OneTab
                text='Visa'
                isActive={activeTab === 'visa'}
                onClick={() => onClick('visa')}
            />
            <OneTab
                text='Flight'
                isActive={activeTab === 'flight'}
                onClick={() => onClick('flight')}
            />
            <OneTab
                text='Stays'
                isActive={activeTab === 'stays'}
                onClick={() => onClick('stays')}
            />
            <OneTab
                text='Account'
                isActive={activeTab === 'account'}
                onClick={() => onClick('account')}
            />
            <OneTab
                text='AI Guide'
                isActive={activeTab === 'ai-guide'}
                onClick={() => onClick('ai-guide')}
            />
            <OneTab
                text='Referral'
                isActive={activeTab === 'referral'}
                onClick={() => onClick('referral')}
            />
        </Flex>
    )
}

export default FAQTabs