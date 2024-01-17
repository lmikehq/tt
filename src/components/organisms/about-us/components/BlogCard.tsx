'use client'

import Image from '@/components/atoms/image';
import Text from '@/components/atoms/text';
import Flex from '@/components/templates/flex';
import { useScreenResolution } from '@/lib/extensions/hook/useScreenResolution';
import { ttColors } from '@/lib/theme/colors';
import { Box } from '@mui/material'
import dayjs from 'dayjs';
import React from 'react'
import { BiDislike, BiLike } from 'react-icons/bi';
import { IoShareOutline } from 'react-icons/io5';


export interface BlogCardItem {
    headerImg: string;
    userImg: string;
    user: string;
    position: string;
    createdDate: string;
    title: string;
    content: string;
    subject: string;
    length: string;
    likes: number;
    dislikes: number;
}
function BlogCard({ headerImg, userImg, user, position, createdDate, title, content, subject, length, likes, dislikes }: BlogCardItem) {
    const { isMobile } = useScreenResolution();

    return (
        <Flex
            direction='column'
            gap='1.5rem'
            padding='0 0 1.5rem'
        >
            <Image
                alt='blog-image'
                src={headerImg}
                styles={{ width: '100%', height: 'auto', borderRadius: '0.5rem' }}
                height={320}
            />

            <Flex direction='column' gap='1.5rem'>
                <Flex justify='space-between'>
                    <Flex gap='1rem'>
                        <Image
                            alt='blog-user'
                            src={userImg}
                            styles={{ borderRadius: '100%' }}
                            width={50}
                            height={50}
                        />
                        <Flex gap='.6rem' direction='column'>
                            <Text
                                type='p'
                                text={user}
                                weight={600}
                            />
                            <Flex gap='1rem'>
                                <Text
                                    type='p'
                                    text={position}
                                    size={15}
                                    color={ttColors.foundation.gray}
                                />
                                <Text
                                    type='p'
                                    text={dayjs(createdDate).format('MMM DD')}
                                    size={15}
                                    color={ttColors.foundation.gray}
                                />
                            </Flex>
                        </Flex>
                    </Flex>
                    <IoShareOutline
                        color={ttColors.foundation.gray}
                        size={22}
                        cursor='pointer'
                    />
                </Flex>

                <Flex direction='column' gap='1rem'>
                    <Text
                        type='p'
                        text={title}
                        size={20}
                        weight={600}
                    />
                    <Text
                        type='p'
                        text={content}
                        size={15}
                    />
                </Flex>

                <Box
                    display='grid'
                    gridTemplateColumns={`3fr 1fr`}
                >
                    <Flex gap='1rem'>
                        <Text
                            type='p'
                            text={subject}
                            size={15}
                            weight={500}
                            color={ttColors.successGreen}
                            styles={{ textTransform: 'uppercase' }}
                        />
                        <Text
                            type='p'
                            text={`${length} read`}
                            size={15}
                        />
                    </Flex>

                    <Flex gap='.6rem' justify='flex-end'>
                        <BiLike size={20} color={ttColors.foundation.gray} />
                        <Text
                            type='p'
                            text={likes > 1000 ? `${(likes/1000).toFixed(1)}k` : `${likes}`}
                            size={15}
                            color={ttColors.foundation.gray}
                        />
                        <BiDislike size={20} color={ttColors.foundation.gray} />
                    </Flex>
                </Box>
            </Flex>
        </Flex>
    )
}

export default BlogCard