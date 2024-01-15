import Text from '@/components/atoms/text';
import Flex from '@/components/templates/flex';
import { useScreenResolution } from '@/lib/extensions/hook/useScreenResolution';
import { ttColors } from '@/lib/theme/colors';
import Link from 'next/link';
import React from 'react'

interface PageLink {
    name: string;
    url: string;
}

interface PageLinksProps {
    links: PageLink[];
}
function PageLinks({ links = [] }: PageLinksProps) {
    const { isMobile } = useScreenResolution();

    return (
        <Flex
            direction={isMobile ? 'row' : 'column'}
            overflowX='auto'
            className='scroll-custom'
            
        >
            {links.map((link, index) => 
                <Flex padding="1.3rem 1rem" key={`link-${index}`}>
                    <Link href={link.url} style={{ textDecoration: 'none', color: 'black' }}>
                        <Text
                            type='p'
                            text={link.name}
                        />
                    </Link>
                </Flex>
            )}
        </Flex>
    )
}

export default PageLinks