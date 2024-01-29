import Text from '@/components/atoms/text'
import Flex from '@/components/templates/flex'
import React, { ReactNode } from 'react'
import { lastUpdatedDate } from '../TermsConditionsPage'
import { ttColors } from '@/lib/theme/colors'


function ListItem({ children }: { children: ReactNode }) {
    return (
        <li>
            {children}
        </li>
    )
}

function ListTitle({ text }: { text: string;  }) {
    return (
        <Text
            type='h2'
            text={text}
            weight={600}
            size={20}
            margin=' 0 0 .8rem'
        />
    )
}

function ListText({ text, margin }: { text: string; margin?: string; }) {
    return (
        <p
            style={{
                lineHeight: 1.8,
                color: ttColors.darkBg,
                fontSize: '15px',
                margin: margin,
                fontWeight: 400
            }}
            dangerouslySetInnerHTML={{ __html: text }}
        >
        </p>
    )
}


function TermsAndConditions() {
    return (
        <Flex direction='column' gap="2rem">
            <Flex direction='column' gap="1rem" margin='.7rem 0 2rem'>
                <Text
                    type='h1'
                    text='Terms of Service'
                    weight={700}
                    size={32}
                />
                <Text
                    type='p'
                    text={`Last Updated: ${lastUpdatedDate}`}
                    color={ttColors.lighterGray}
                />
            </Flex>

            <ol style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontSize: '22px', fontWeight: 600, margin: '0 0 0 1.1rem' }}>
                <ListItem>
                    <ListTitle
                        text='Acceptance of Terms'
                    />
                    <ListText
                        text='By accessing or utilizing any service offered by Thrillers Travels, you acknowledge and agree to abide by these Terms of Service. If you disagree with any part of these terms, refrain from using our services.'
                    />
                </ListItem>
                <ListItem>
                    <ListTitle
                        text='Service Description'
                    />
                    <ListText
                        text='Thrillers Travels offers a range of travel-related services including booking accommodations, arranging transportation, travel planning, and other associated services.'
                    />
                </ListItem>
                <ListItem>
                    <ListTitle
                        text="User Conduct"
                    />
                    <ListText
                        text='Users agree not to engage in activities that could compromise the security, functionality, or accessibility of our services. This includes refraining from unauthorized access, data scraping, or any activity that violates our policies.'
                    />
                </ListItem>
                <ListItem>
                    <ListTitle
                        text="Account Registration"
                    />
                    <ListText
                        text='To access certain services, users may need to register an account. Users are responsible for maintaining the confidentiality of their account credentials and are liable for all activities conducted under their account.'
                    />
                </ListItem>
                <ListItem>
                    <ListTitle
                        text="Booking and Payment"
                    />
                    <ListText
                        text='When booking through Thrillers Travels, users agree to provide accurate and up-to-date information. Payment for services is subject to the terms and conditions outlined during the booking process.'
                    />
                </ListItem>
                <ListItem>
                    <ListTitle
                        text="User Content"
                    />
                    <ListText
                        text='Users may contribute content to our platform (reviews, comments, etc.). By submitting content, users grant Thrillers Travels a non-exclusive, royalty-free license to use, modify, and distribute said content.'
                    />
                </ListItem>
                <ListItem>
                    <ListTitle
                        text="Limitation of Liability"
                    />
                    <ListText
                        text='Thrillers Travels is not liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use our services, including but not limited to loss of data, profits, or business opportunities.'
                    />
                </ListItem>
                <ListItem>
                    <ListTitle
                        text="Modification of Services"
                    />
                    <ListText
                        text='Thrillers Travels reserves the right to modify, suspend, or discontinue any part of its services, including access to certain features or content, without prior notice or liability.'
                    />
                </ListItem>
                <ListItem>
                    <ListTitle
                        text="Governing Law"
                    />
                    <ListText
                        text='These Terms of Service are governed by and construed in accordance with the laws of Nigeria, without regard to its conflict of law provisions.'
                    />
                </ListItem>
                <ListItem>
                    <ListTitle
                        text="Contact Information"
                    />
                    <ListText
                        text='For questions or concerns regarding these Terms of Service, please contact us at support@thrillers.travel / +2349077210321.'
                    />
                </ListItem>
            </ol>
        </Flex>
    )
}

export default TermsAndConditions