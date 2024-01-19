'use client'

import Button from '@/components/atoms/button';
import Text from '@/components/atoms/text';
import Flex from '@/components/templates/flex';
import { useScreenResolution } from '@/lib/extensions/hook/useScreenResolution';
import { ttColors } from '@/lib/theme/colors';
import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react';
import styled from "styled-components";
import ImageGrid from './components/ImageGrid';
import dayjs from 'dayjs';
import PositionCard from './components/PositionCard';
import PostCard from '../about-us/components/PostCard';
import ValuesCarousel from '../about-us/components/ValuesCarousel';
import { coreValues, postCard } from '../about-us/AboutUsPage';
const gridImages = Array.from({ length: 6 }).map(e => '/assets/images/empty-img.png')
const openPositions = [
    {
        position: 'Product Design',
        description: 'Are you passionate about crafting exceptional user experiences that elevate travel? Thrillers Travels is seeking a creative Product Designer to reimagine and shape intuitive interfaces that redefine how travelers explore the world.',
        tags: ['Design', 'Full Time', 'Remote'],
        status: 'Ongoing',
        deadline: dayjs().format(),
    },
    {
        position: 'Front-End Engineer',
        description: 'Join Thrillers Travels as a Frontend Developer and be at the forefront of shaping our digital footprint. Collaborate with a dynamic team to build immersive web experiences, ensuring seamless functionality and stunning visuals.',
        tags: ['Design', 'Full Time', 'Remote'],
        status: 'Ongoing',
        deadline: dayjs().format(),
    },
    {
        position: 'Back-End Engineer',
        description: "Thrillers Travels is on the lookout for a Backend Developer to power our platform's foundation. Join our team in architecting robust and scalable systems that fuel seamless travel experiences.",
        tags: ['Design', 'Full Time', 'Remote'],
        status: 'Ongoing',
        deadline: dayjs().format(),
    },
]

const Wrapper = styled.div`
    margin-top: 1rem;
`;

function Section({ children, id }: { children: ReactNode; id?: string; }) {
    return (
        <Flex direction='column' id={id} padding='1.5rem 0' gap='2rem' position='relative'>
            {children}
        </Flex>
    )
}
function SubHeading({ title, text }: { title: string; text: string; }) {
    return (
        <Flex direction='column' width='max-content' gap="1rem">
            <Text
                type='h2'
                text={title}
                size={26}
                weight={600}
            />
            <Text
                type='p'
                text={text}
                size={15}
            />
        </Flex>
    )
}

function CareersPage() {
    const { isMobile } = useScreenResolution();
    const { push } = useRouter()

    return (
        <Wrapper style={{ padding: isMobile ? '0 .5rem 4rem' : '0 0 4rem' }}>
            <Flex
                direction="column"
                justify="center"
                align="center"
                background={`url(/assets/images/faq/faq-bg.png)`}
                padding={isMobile ? '7rem 2rem 6rem' : '10rem 7rem'}
                margin="0 0 2rem"
                gap="2rem"
                borderRadius=".5rem"
                styles={{ backgroundSize: 'contain' }}
            >
                <Flex direction='column' align="center" gap="1rem">
                    <Text
                        type="h1"
                        text="Come work with us at Thrillers Travels"
                        weight={700}
                        size={isMobile ? 26 : 36}
                        textAlign='center'
                        width={isMobile ? '' : '50%'}
                    />
                    <Text
                        type="p"
                        text="Embark on a journey with Thrillers Travels and unlock boundless adventures, connecting travelers to unforgettable experiences."
                        size={isMobile ? 15 : 15}
                        textAlign='center'
                        width={isMobile ? '' : '50%'}
                    />
                </Flex>
                <Button
                    background={ttColors.dark}
                    onClick={() => push(`#open-positions`)}
                    padding='1rem 6rem'
                >
                    <Text
                        type='p'
                        text='See Job Openings'
                        size={15}
                        color='white'
                        width='max-content'
                    />
                </Button>
            </Flex>

            
            <Flex direction='column' gap="4.5rem" margin='3rem 0' padding="0 0 3rem">
                <PostCard
                    {...postCard}
                />
                
                <ImageGrid
                    images={gridImages}
                />

                <Section>
                    <SubHeading
                        title='Our Core Values'
                        text='Guiding Principles That Define Us to success'
                    />
                    <ValuesCarousel
                        items={coreValues}
                    />
                </Section>

                <Section id='open-positions'>
                    <SubHeading
                        title={`Open Positions (${openPositions.length})`}
                        text='Come Join the Team'
                    />
                    {openPositions.length > 0 ? openPositions.map((position, index) =>
                        <PositionCard
                            key={`position-${index}`}
                            {...position}
                        />
                    ) : (
                        <Flex padding='5rem 5rem' justify='center'>
                            <Text
                                type='p'
                                text='No positions are currently open, please check back.'
                                textAlign='center'
                            />
                        </Flex>
                    )}
                </Section>
            </Flex>
        </Wrapper>
    )
}

export default CareersPage