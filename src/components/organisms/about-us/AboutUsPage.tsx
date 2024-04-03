'use client'

import Text from '@/components/atoms/text';
import Flex, { FlexProps } from '@/components/templates/flex';
import { useScreenResolution } from '@/lib/extensions/hook/useScreenResolution';
import React, { ReactNode, forwardRef, useEffect } from 'react';
import styled from "styled-components";
import PostCard from './components/PostCard';
import { Box } from '@mui/material';
import { FaUser } from 'react-icons/fa6';
import { ttColors } from '@/lib/theme/colors';
import BulletCard from './components/BulletCard';
import { TbTargetArrow } from 'react-icons/tb';
import { BiTargetLock } from 'react-icons/bi';
import ValuesCarousel from './components/ValuesCarousel';
import { BsArrowRight } from 'react-icons/bs';
import Image from '@/components/atoms/image';
import Link from 'next/link';
import BlogCarousel from './components/BlogCarousel';
import dayjs from 'dayjs';
import Timeline from './components/Timeline';
import { useBlogStore } from '@/lib/store/blog.store';

const postCard = {
    heading: 'Embark on Unforgettable Journeys with Thrillers Travels:  Your Passport to Limitless Exploration',
    text: "At Thrillers Travels, we believe that travel isn't just about reaching a destination; it's an odyssey that shapes perspectives, creates lifelong memories, and fosters connections beyond borders. With a relentless pursuit of excellence, we craft journeys that transcend the ordinary, offering tailored experiences designed to ignite your sense of adventure and curiosity. From seamless travel arrangements to personalized stays and streamlined visa solutions, we're dedicated to curating every aspect of your voyage. Join us on a quest to discover new horizons, forge global connections, and create moments that linger as stories for a lifetime. Let Thrillers Travels be your companion on the path to exceptional exploration."
}
export const coreValues = [
    { heading: 'Excellence', text: 'Striving for exceptional quality in every aspect of our services.' },
    { heading: 'Customer-Centric', text: 'Putting our clients first by understanding their needs.' },
    { heading: 'Integrity', text: 'Being honest and transparent in all of our operations.' },
    { heading: 'Innovation', text: 'Embracing creativity and forward-thinking.' },
]
const bulletPoints = [
    { 
        heading: 'About Us',
        text: "Thrillers Travel is more than a travel agency; we're architects of unforgettable experiences, curating journeys that transcend expectations. With a passion for seamless travel, streamlined visa services, and exceptional hotel stays, we redefine the art of exploration.",
        icon: <FaUser color={ttColors.primary600} size={32} />,
    },
    { 
        heading: 'Our Vision',
        text: "Guided by innovation and a commitment to excellence, we strive to be the foremost catalyst in unlocking travel standards, ensuring every journey embodies seamless perfection and leaves an enduring imprint of unforgettable discovery",
        icon: <TbTargetArrow color={ttColors.primary600} size={40} />,
    },
    { 
        heading: 'Our Mission',
        text: "Our mission is to curate personalized travel solutions, streamline visa facilitation, and elevate hotel experiences, empowering individuals and businesses to navigate the world with ease while fostering cultural exchange and enhancing travel possibilities.",
        icon: <BiTargetLock color={ttColors.primary600} size={42} />,
    },
]
const blogPages = [
    { 
        title: '10 Essential Travel Tips for a Stress-Free Vacation',
        content: "Traveling can be a breeze with the right preparation. From packing also a breeze ....",
        subject: "Travel Trips",
        headerImg: '/assets/images/about-us/blog-img.png',
        userImg: '/assets/images/about-us/blog-user.png',
        user: 'Seun Adebayo',
        position: 'Admin Thrillers',
        createdDate: dayjs().date(4).month(8).format(),
        length: '6 mins',
        likes: 1300,
        dislikes: 0,
    },
    { 
        title: '10 Essential Travel Tips for a Stress-Free Vacation',
        content: "Traveling can be a breeze with the right preparation. From packing also a breeze ....",
        subject: "Travel Trips",
        headerImg: '/assets/images/about-us/blog-img.png',
        userImg: '/assets/images/about-us/blog-user.png',
        user: 'Seun Adebayo',
        position: 'Admin Thrillers',
        createdDate: dayjs().date(4).month(8).format(),
        length: '6 mins',
        likes: 1300,
        dislikes: 0,
    },
    { 
        title: '10 Essential Travel Tips for a Stress-Free Vacation',
        content: "Traveling can be a breeze with the right preparation. From packing also a breeze ....",
        subject: "Travel Trips",
        headerImg: '/assets/images/about-us/blog-img.png',
        userImg: '/assets/images/about-us/blog-user.png',
        user: 'Seun Adebayo',
        position: 'Admin Thrillers',
        createdDate: dayjs().date(4).month(8).format(),
        length: '6 mins',
        likes: 1300,
        dislikes: 0,
    },
    { 
        title: '10 Essential Travel Tips for a Stress-Free Vacation',
        content: "Traveling can be a breeze with the right preparation. From packing also a breeze ....",
        subject: "Travel Trips",
        headerImg: '/assets/images/about-us/blog-img.png',
        userImg: '/assets/images/about-us/blog-user.png',
        user: 'Seun Adebayo',
        position: 'Admin Thrillers',
        createdDate: dayjs().date(4).month(8).format(),
        length: '6 mins',
        likes: 1300,
        dislikes: 0,
    },
]
const timeline = [
    {
        startDate: '2020/01/01',
        endDate: '2021/04/01',
        title: 'Visa Facilitation Services',
        content: 'Thrillers Travels begins operations by offering expert visa facilitation services, becoming a trusted advisor in navigating intricate visa processes.',
    },
    {
        startDate: '2021/05/01',
        endDate: '2022/11/01',
        title: 'Travel Solutions Development',
        content: 'Over a year and a half, Thrillers Travels meticulously crafts and hones its suite of travel solutions, including personalized itineraries, accommodations, and streamlined visa services, refining its offerings to meet the diverse needs of travelers.',
    },
    {
        startDate: '2022/12/01',
        endDate: '2023/08/01',
        title: 'Market Penetration and Partnerships',
        content: 'Thrillers Travels focuses on establishing strategic partnerships with accommodation providers, expanding its reach, and conducting thorough market research to prepare',
    },
    {
        startDate: '2023/09/02',
        endDate: '2023/12/01',
        title: 'Thrillers Travels Launch',
        content: 'A monumental day as Thrillers Travels officially launches its platform, marking a significant milestone in its journey to redefine travel experiences. The platform goes live, offering travelers a seamless and curated approach to travel, stays, and visa solutions.',
    },
    {
        startDate: '2023/09/03',
        endDate: 'Now',
        title: 'Thrillers Travels Fully Operating',
        content: 'Following the successful launch, Thrillers Travels focuses on enhancing user experiences, gathering feedback, and initiating strategic marketing campaigns. The company witnesses substantial growth in its user base, solidifying its presence in the travel industry as it closes the year with aspirations for continued success and innovation.',
    },
]

const Wrapper = styled.section `
    margin-top: 1rem;
`;

const Section = forwardRef(function Section({ children, id, background, padding, overflow }: { children: ReactNode; id?: string; background?: string; padding?: string; overflow?: FlexProps['overflowX']; }, ref: any) {
    return (
        <Flex direction='column' id={id} padding={padding ?? '1.5rem 0'} gap='2.5rem' position='relative' background={background} overflowX={overflow ?? 'initial'} overflowY={overflow ?? 'initial'} ref={ref}>
            {children}
        </Flex>
    )
})
function SubHeading({ title, text, sub }: { title: string; text: string; sub?: ReactNode; }) {
    return (
        <Flex direction='column' gap="1rem">
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
            {sub}
        </Flex>
    )
}


function AboutUsPage() {
    const { isMobile } = useScreenResolution();
     const {getAllBlogs,blogs} = useBlogStore(
        (state) => state);
         useEffect(()=>{
      
          getAllBlogs()
    },[])
    return (
        <Wrapper style={{ padding: isMobile ? '0 .5rem 4rem' : '0 0 4rem' }}>
            <Flex
                direction="column"
                justify="center"
                align="center"
                background={`url(/assets/images/faq/faq-bg.png)`}
                padding={isMobile ? '4rem 2rem 3rem' : '9rem 7rem 8rem'}
                margin="0 0 2rem"
                gap="2rem"
                borderRadius=".5rem"
                styles={{ backgroundSize: 'contain' }}
            >
                <Text
                    type="h1"
                    text="Seamless Visas, Unforgettable Journeys, and Premier Hotel Experiences"
                    weight={700}
                    size={isMobile ? 26 : 36}
                    textAlign='center'
                    width={isMobile ? '' : '60%'}
                />
                <Text
                    type="p"
                    text="In our FAQ section, you will find all information you are looking for. We are always happy to help out."
                    size={isMobile ? 15 : 15}
                    textAlign='center'
                    width={isMobile ? '' : '50%'}
                />
            </Flex>

            <Flex direction='column' gap="3.5rem" margin='3rem 0'>
                <Box
                    display='grid'
                    gridTemplateColumns={isMobile ? '1fr' : '1fr 1fr 1fr'}
                    columnGap='5rem'
                    rowGap='2rem'
                >
                    {bulletPoints.map((bullet, index) => 
                        <BulletCard
                            key={`bullet-${index}`}
                            {...bullet}
                        />
                    )}
                </Box>

                <PostCard
                    imgSrc='/assets/images/about-us/tt-team-8.jpg'
                    {...postCard}
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

                <Section background={ttColors.primary100} padding={isMobile ? '4rem 2rem 5rem' : '4rem 3rem 5rem'} overflow='visible'>
                    <SubHeading
                        title='Our Story'
                        text='This is the Thrillers Travel story as told through milestones'
                    />
                    <Timeline
                        timeline={timeline}
                    />
                </Section>

                <Section>
                    <SubHeading
                        title='Come Work with Us'
                        text='Come redefine travel experiences in Africa.'
                        sub={
                            <Link href='/careers#open-positions' style={{ textDecoration: 'none', marginTop: '.5rem' }}>
                                <Flex gap='1rem' align='center'>
                                    <Text
                                        type="h1"
                                        text="Explore Open Positions"
                                        weight={500}
                                        size={15}
                                        color={ttColors.primary600}
                                    />
                                    <BsArrowRight color={ttColors.primary600} />
                                </Flex>
                            </Link>
                        }
                    />
                    <Box width='100%' height='700px' borderRadius='1rem' overflow='hidden'>
                        <img
                            alt='people-team'
                            src='/assets/images/about-us/tt-team-1.jpg'
                            style={{ width: '100%', objectFit: 'cover', transform: 'translateY(50px)' }}
                        />
                    </Box>

                </Section>

                <Section>
                    <SubHeading
                        title='Blog Stories'
                        text='Find very interesting stories ralting to Thrillers and Travel in general'
                    />
                    <BlogCarousel
                        items={blogs}
                    />
                </Section>
            </Flex>
        </Wrapper>
    )
}

export default AboutUsPage