'use client'

import Text from '@/components/atoms/text';
import Flex from '@/components/templates/flex';
import { useScreenResolution } from '@/lib/extensions/hook/useScreenResolution';
import React, { useState } from 'react'
import styled from "styled-components";
import { Box } from '@mui/material';
import { accountContent, aiContent, flightContent, referralContent, staysContent, visaContent } from './components/content';
import ReachOut from './components/ReachOut';
import FAQTabs from './components/FAQTabs';
import FAQHeadings from './components/FAQHeadings';
import FAQContent from './components/FAQContent';
const contentMap = {
    'visa': visaContent,
    'flight': flightContent,
    'stays': staysContent,
    'account': accountContent,
    'ai-guide': aiContent,
    'referral': referralContent,
} as { [k: string]: any };

const Wrapper = styled.section`
    margin-top: 1rem;
`;

function FAQPage() {
    const { isMobile } = useScreenResolution();
    const [state, setState] = useState({
        activeTab: 'visa'
    })

    const onClickTab = (x: string) => {
        setState(prev => ({ 
            ...prev,
            activeTab: x
        }))
    }

    return (
        <Wrapper>
            <Flex
                direction="column"
                justify="center"
                align="center"
                background={`url(/assets/images/faq/faq-bg.png)`}
                padding={isMobile ? '6rem 2rem' : '8rem 7rem'}
                margin="0 0 2rem"
                gap="2rem"
                borderRadius=".5rem"
                styles={{ backgroundSize: 'contain' }}
            >
                <Flex direction='column' align="center" gap="1rem">
                    <Text
                        type="h1"
                        text="Explore the FAQs"
                        weight={700}
                        size={isMobile ? 24 : 32}
                        textAlign='center'
                        />
                    <Text
                        type="p"
                        text="In our FAQ section, you will find all information you are looking for. We are always happy to help out."
                        size={isMobile ? 14 : 16}
                        textAlign='center'
                    />
                </Flex>
                <FAQTabs
                    onClick={onClickTab}
                    activeTab={state.activeTab}
                />
            </Flex>

            <Box
                width='100%'
                display='grid'
                gridTemplateColumns={isMobile ? '1fr' : '1fr 3fr'}
                columnGap='1.5rem'
            >
                <FAQHeadings
                    sections={contentMap[state.activeTab]}
                />
                <Flex direction='column' gap="3rem" margin="1rem 0 0">
                    {['visa', 'flight'].includes(state.activeTab) && <ReachOut />}
                    <FAQContent
                        sections={contentMap[state.activeTab]}
                    />
                </Flex>
            </Box>
        </Wrapper>
    )
}

export default FAQPage