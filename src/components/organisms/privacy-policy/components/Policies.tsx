import Text from '@/components/atoms/text'
import Flex from '@/components/templates/flex'
import React, { ReactElement, ReactNode } from 'react'
import { lastUpdatedDate } from '../PrivacyPolicyPage'
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
            size={22}
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

function List({ children }: { children: ReactNode; large?: boolean; }) {
    return (
        <ol
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                fontSize: '15px',
                color: ttColors.darkBg,
                fontWeight: 400
            }}
        >
            {children}
        </ol>
    )
}

function Policies() {
    return (
        <Flex direction='column' gap="2rem">
            <Flex direction='column' gap="1rem" margin='.7rem 0 2rem'>
                <Text
                    type='h1'
                    text='Privacy Policy'
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
                        text='Introduction'
                    />
                    <ListText
                        margin='0 0 1.5rem'
                        text='Thrillers Travels, recognized herein as "we," "our," or "us," holds an unwavering commitment to upholding the utmost standards of confidentiality and security in preserving the privacy of both our esteemed customers and esteemed visitors to our digital platform. This Privacy Policy serves as an encompassing guide, delineating the meticulous procedures and practices governing the acquisition, utilization, disclosure, and fortification of all personal data furnished to us across the spectrum of our website, diverse services, and multifaceted interactions.'
                    />
                    <ListText
                        text='Our dedication extends beyond mere compliance with standard regulations; it forms the cornerstone of our ethos, encompassing the conscientious stewardship of the personal information entrusted to us. We diligently outline the precise modalities and rigorous measures that underscore our approach to gathering, leveraging, safeguarding, and ensuring the confidentiality of the personal data shared through our online domain, services, and various engagement touchpoints. This commitment underscores our mission to foster a culture of trust, transparency, and confidence among our valued users and website guests.'
                    />
                </ListItem>
                <ListItem>
                    <ListTitle
                        text='Information Collection and Use'
                    />
                    <List>
                        <ListItem>
                            <ListText
                                text='<b>Personal Information:</b> We may collect personal information, including names, contact details, payment information, travel preferences, and more, to provide our services effectively.'
                            />
                        </ListItem>
                        <ListItem>
                            <ListText
                                text='<b>Website Usage Data:</b> We gather data about your interactions with our website, including IP addresses, browser details, pages visited, and session duration, to enhance user experience and analyze website performance.'
                            />
                        </ListItem>
                    </List>
                </ListItem>
                <ListItem>
                    <ListTitle
                        text='Use of Information'
                    />
                    <List>
                        <ListItem>
                            <ListText
                                text='<b>Service Delivery:</b> We use collected information to deliver our services, process bookings, manage accounts, and facilitate travel arrangements.'
                            />
                        </ListItem>
                        <ListItem>
                            <ListText
                                text='<b>Communication:</b> Personal information may be used to communicate about bookings, offers, updates, and promotions related to our services.'
                            />
                        </ListItem>
                    </List>
                </ListItem>
                <ListItem>
                    <ListTitle
                        text='Information Sharing and Disclosure'
                    />
                    <List>
                        <ListItem>
                            <ListText
                                text='<b>Third-Party Service Providers:</b> We may share necessary information with third-party service providers to assist in delivering our services, such as accommodation providers, airlines, or tour operators.'
                            />
                        </ListItem>
                        <ListItem>
                            <ListText
                                text='<b>Legal Requirements:</b> Personal information may be disclosed in compliance with legal obligations or to protect the rights, property, or safety of Thrillers Travels, its users, or others.'
                            />
                        </ListItem>
                    </List>
                </ListItem>
                <ListItem>
                    <ListTitle
                        text='Data Security'
                    />
                    <List>
                        <ListItem>
                            <ListText
                                text='<b>Protection Measures:</b> We employ industry-standard security measures to safeguard personal information from unauthorized access, alteration, disclosure, or destruction.'
                            />
                        </ListItem>
                        <ListItem>
                            <ListText
                                text='<b>Data Retention:</b> We retain personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by law.'
                            />
                        </ListItem>
                    </List>
                </ListItem>
                <ListItem>
                    <ListTitle
                        text='User Rights'
                    />
                    <List>
                        <ListItem>
                            <ListText
                                text='<b>Access and Control:</b> Users have the right to access, modify, or delete their personal information held by us, subject to legal limitations.'
                            />
                        </ListItem>
                        <ListItem>
                            <ListText
                                text='<b>Opt-Out Options:</b> Users can opt-out of receiving marketing communications or update communication preferences at any time.'
                            />
                        </ListItem>
                    </List>
                </ListItem>
                <ListItem>
                    <ListTitle
                        text="Children's Privacy"
                    />
                    <ListText
                        text='We do not knowingly collect personal information from individuals under the age of 18 without parental consent.'
                    />
                </ListItem>
                <ListItem>
                    <ListTitle
                        text="Changes to Privacy Policy"
                    />
                    <ListText
                        text='We reserve the right to update this Privacy Policy, and any changes will be posted on our website with the effective date.'
                    />
                </ListItem>
            </ol>
        </Flex>
    )
}

export default Policies