'use client'

import { useScreenResolution } from '@/lib/extensions/hook/useScreenResolution';
import { Box } from '@mui/material';
import React from 'react'
import PageLinks from './components/PageLinks';
import dayjs from 'dayjs';
import Policies from './components/Policies';
export const lastUpdatedDate = dayjs().year(2023).month(9).day(10).format('MMMM DD, YYYY')
const pageLinks = [
    { name: 'Privacy Policy', url: '/privacy-policy'},
    { name: 'Terms of Service', url: '/terms-conditions'},
]


function PrivacyPolicyPage() {
    const { isMobile } = useScreenResolution();

    return (
        <Box
            width='100%'
            display='grid'
            gridTemplateColumns={isMobile ? '1fr' : '1fr 3fr'}
            columnGap='1.5rem'
            rowGap='2.5rem'
            padding={isMobile ? '0 1rem' : ''}
        >
            <PageLinks
                links={pageLinks}
            />
            <Policies />
        </Box>
    )
}

export default PrivacyPolicyPage