import Text from '@/components/atoms/text';
import Flex from '@/components/templates/flex';
import { useScreenResolution } from '@/lib/extensions/hook/useScreenResolution';
import { ttColors } from '@/lib/theme/colors';
import dayjs from 'dayjs';
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import styled from 'styled-components';

interface OneTimeline {
    startDate: string;
    endDate: string;
    title: string;
    content: string;
}
interface RowProps {
    left?: OneTimeline;
    right?: OneTimeline;
    index: number;
    lastIndex: number;
    onSetRow?: (row: number, ratio: number) => void;
}
const Row = forwardRef(function Row({ left, right, index }: RowProps, ref: any) {
    const { isMobile } = useScreenResolution();
    const textRef = useRef<HTMLParagraphElement | null>(null)
    const height = textRef?.current?.clientHeight ?? index === 0 ? '13rem' : '18rem'


    return (
        <Flex justify='space-between' padding='.5rem 0 0' styles={{ scrollSnapAlign: 'start' }}>
            <Flex width='45%' direction='column' gap='.8rem' styles={{ display: isMobile ? 'none' : 'flex' }}>
                {left && 
                    <React.Fragment>
                        <Text
                            type="p"
                            text={`${dayjs(left.startDate).format('MMMM YYYY')} - ${left.endDate === 'Now' ? left.endDate : dayjs(left.endDate).format('MMMM YYYY')}`}
                            weight={500}
                            size={15}
                        />
                        <Text
                            type="p"
                            text={left.title}
                            weight={600}
                            size={isMobile ? 18 : 20}
                        />
                        <Text
                            type="p"
                            text={left.content}
                            size={15}
                            ref={textRef}
                        />
                    </React.Fragment>
                }
            </Flex>

            <Flex
                width='1px'
                height={isMobile ? `calc(${height} + 3rem)` : '14rem'}
                position='relative'
                background={ttColors.lightestGray}
            >
                <Flex
                    width='1rem'
                    height='1rem'
                    borderRadius='100%'
                    background={ttColors.dark}
                    position='absolute'
                    styles={{ top: '-.5rem', left: '-.4rem', zIndex: 1 }}
                />
            </Flex>

            <Flex width={isMobile ? '90%' : '45%'} direction='column' gap='.8rem'>
                {right && 
                    <React.Fragment>
                        <Text
                            type="p"
                            text={`${dayjs(right.startDate).format('MMMM YYYY')} - ${right.endDate === 'Now' ? right.endDate : dayjs(right.endDate).format('MMMM YYYY')}`}
                            weight={500}
                            size={15}
                        />
                        <Text
                            type="p"
                            text={right.title}
                            weight={600}
                            size={20}
                        />
                        <Text
                            type="p"
                            text={right.content}
                            size={15}
                        />
                    </React.Fragment>
                }
            </Flex>
        </Flex>
    )
})

interface TimelineProps {
    timeline: OneTimeline[]
}
function Timeline({ timeline = [] }: TimelineProps) {
    const { isMobile } = useScreenResolution();
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [height, setHeight] = useState('0%')

    useEffect(() => {
        const handleScroll = (ev: Event) => {
            if (containerRef.current) {
                const contHeight = containerRef.current.clientHeight
                const contDist = containerRef.current.getBoundingClientRect().top
                const startFrom = isMobile ? 200 : 200
                const ratio = (contDist > startFrom) ? 0 : (contDist < 0 && Math.abs(contDist - startFrom) > contHeight) ? 100 : (((contDist > 0 ? (startFrom - contDist) : Math.abs(contDist) + startFrom)/contHeight) * 100)
                setHeight(`${Math.min(isMobile ? 85 : 82.5, ratio)}%`)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [containerRef.current])


    return (
        <Flex>
            <Flex
                border={`1px solid ${ttColors.dark}`}
                width='1px'
                height={height}
                overflowX='visible'
                position={isMobile ? 'absolute' : 'absolute'}
                styles={{ minHeight: '', left: isMobile ? '2rem' : '50%', zIndex: 1 }}
            />
            <Flex
                direction='column'
                margin='2rem 0 0'
                overflowX='visible'
                overflowY='visible'
                className='timeline'
                onScroll={() => console.log('yeahhhh')}
                ref={containerRef}
            >
                {timeline.map((tim, index, arr) => 
                    <Row
                        key={`timeline-${index}`}
                        left={isMobile ? undefined : (index % 2) === 0 ? tim : undefined}
                        right={isMobile ? tim : (index % 2) === 0 ? undefined : tim}
                        index={index}
                        lastIndex={arr.length - 1}
                    />
                )}
            </Flex>
        </Flex>
    )
}

export default Timeline