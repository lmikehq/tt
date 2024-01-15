import Text from '@/components/atoms/text';
import Flex from '@/components/templates/flex';
import { useScreenResolution } from '@/lib/extensions/hook/useScreenResolution';
import { ttColors } from '@/lib/theme/colors';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
    const pathname = usePathname()

    return (
        <Flex
            direction={isMobile ? 'row' : 'column'}
            overflowX='auto'
            className='scroll-custom'
            
        >
            {links.map((link, index) => 
                <Link
                    key={`link-${index}`}
                    href={link.url}
                    style={{ textDecoration: 'none', color: 'black', padding: "1.3rem 1rem", borderRadius: ".5rem", background: pathname === link.url ? ttColors.primary300 : '' }}
                >
                    <Text
                        type='p'
                        text={link.name}
                        size={15}
                    />
                </Link>
            )}
        </Flex>
    )
}

export default PageLinks