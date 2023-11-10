import Text from '@/components/atoms/text'
import Flex from '@/components/templates/flex'
import { useScreenResolution } from '@/lib/extensions/hook/useScreenResolution'
import { ttColors } from '@/lib/theme/colors'
import React, { ReactNode } from 'react'
import { TbMapCancel } from 'react-icons/tb'

function ErrorPage({ icon, text, subText, children }: { icon?: ReactNode; text?: string; subText?: string; children?: ReactNode; }) {
    const { isMobile } = useScreenResolution()
    return (
        <Flex padding='9rem 0' align='center' gap="1rem" justify='center' direction='column'>
            {icon ? icon : <TbMapCancel size={80} color={ttColors.primaryLight} />}
            <Text type="h2" weight={600} size={40} text={text ?? ''} />
            {subText && <Text type="p" size={isMobile ? 14 : 16} text={subText ?? ''} />}
            {children}
        </Flex>
    )
}

export default ErrorPage