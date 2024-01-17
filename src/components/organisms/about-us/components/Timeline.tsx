import Text from '@/components/atoms/text';
import Flex from '@/components/templates/flex';
import { useScreenResolution } from '@/lib/extensions/hook/useScreenResolution';
import { ttColors } from '@/lib/theme/colors';
import dayjs from 'dayjs';
import React from 'react'

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
}
function Row({ left, right }: RowProps) {
    const { isMobile } = useScreenResolution();

    return (
        <Flex justify='space-between'>
            <Flex width={isMobile ? '99%' : '45%'} direction='column' gap='.8rem' styles={{ display: (isMobile && !left) ? 'none' : 'flex' }}>
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
                            size={20}
                        />
                        <Text
                            type="p"
                            text={left.content}
                            size={15}
                        />
                    </React.Fragment>
                }
            </Flex>

            <Flex
                width='2px'
                height='14rem'
                overflow='visible'
                position='relative'
                background={ttColors.lightestGray}
            >
                <Flex
                    width='1rem'
                    height='1rem'
                    borderRadius='100%'
                    background={ttColors.dark}
                    position='absolute'
                    styles={{ top: '-.5rem', left: '-.4rem' }}
                />
            </Flex>

            <Flex width={isMobile ? '99%' : '45%'} direction='column' gap='.8rem' styles={{ display: (isMobile && !right) ? 'none' : 'flex' }}>
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
}

interface TimelineProps {
    timeline: OneTimeline[]
}
function Timeline({ timeline = [] }: TimelineProps) {
    const { isMobile } = useScreenResolution();

    return (
        <Flex direction='column' margin='2rem 0 0'>
            {timeline.map((tim, index, arr) => 
                <Row
                    key={`timeline-${index}`}
                    left={(index % 2) === 0 ? tim : isMobile ? tim : undefined}
                    right={(index % 2) === 0 ? undefined : isMobile ? undefined : tim}
                    index={index}
                    lastIndex={arr.length - 1}
                />
            )}
        </Flex>
    )
}

export default Timeline