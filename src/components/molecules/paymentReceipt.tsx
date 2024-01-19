'use client'
import ttLogo from 'public/assets/images/brand/tt_blue_logo_with_text1.png'
import Section from './section'
import Flex from '../templates/flex'
import Image from 'next/image'
import Text from '../atoms/text'
import { ttColors } from '@/lib/theme/colors'


function PaymentReciept() {
  return (
    <Section>
      <Flex align='center' justify='center'>
        <Section width='700px' padding='40px 48px'>
          <Flex direction='column' gap='12px' align='center' justify='center' margin='24px 0 '>
            <Image src={ttLogo} alt='Thriller Travels logo' height={57} objectFit='cover' />
            <Text text='Generated on 21, December 2023' type='p' color={ttColors.foundation.gray} size={14} />
          </Flex>
          <Flex margin='0 0 40px' direction='column' justify='center' align='center'>
            <Text type='h4' text='Transaction Receipt' size={22} weight={600} />
            <Text type='p' text={'Payment ID: THR-UASNIUUB'} size={14} color={ttColors.foundation.gray} />
          </Flex>

          <Section background={ttColors.primary300} padding='24px' borderRadius='8px' margin='0 0 29px'>
            <Text type='h4' text='Dear Angela Abiodun,' color={ttColors.blackishBlue} weight={500} margin='0 0 10px' width={'100%'} />

            <Section className='payment-receipt-grid'>
              <Text type='p' weight={500} text='Transaction  Amount:' />
              <Text type='p' text='NGN 5,000,000' color={ttColors.blackishBlue} />
            </Section>

            <Section className='payment-receipt-grid'>
              <Text type='p' weight={500} text='Payment Intent:' />
              <Text type='p' text='Visa Processing' color={ttColors.blackishBlue} />
            </Section>

            <Section className='payment-receipt-grid'>
              <Text type='p' weight={500} text='Payment Mode:' />
              <Text type='p' text='Bank Transfer' color={ttColors.blackishBlue} />
            </Section>

            <Section className='payment-receipt-grid'>
              <Text type='p' weight={500} text='Transaction Date:' />
              <Text type='p' text='30 October, 2023' color={ttColors.blackishBlue} />
            </Section>

            <Section className='payment-receipt-grid'>
              <Text type='p' weight={500} text='Receipt Account:' />
              <Flex gap='10px' direction='column'>
                <Text type='p' text='Thrillers Account' color={ttColors.blackishBlue} />
                <Text type='p' text='9065387123' color={ttColors.blackishBlue} />
                <Text type='p' text='PalmPay Limited' color={ttColors.blackishBlue} />
              </Flex>
            </Section>

            <Section className='payment-receipt-grid-last'>
              <Text type='p' weight={500} text='Description:' />
              <Flex gap='10px' direction='column'>
                <Text type='p' text='Covers Visa Application fee for Angela Benedict.' color={ttColors.blackishBlue} />
              </Flex>
            </Section>
          </Section>

          <Flex direction='column' gap='12px' margin='0 0 23px'>
            <Text
              type='p'
              text='If you have any questions or would like more information, please call our 24-hour Contact Centre on'
              color={ttColors.blackLight}
              size={14}
            />
            <Text
              type='p'
              text='Call Thrillers, 070 9328763, +234 1-7605881-4, +234 1-9117209 or send an email to help@thrillerstravels.com'
              size={14}
              color={ttColors.blackLight}
            />
          </Flex>

          <Text color='#000' text='Thank you for choosing Thrillers Travels' type='p' weight={600} />
        </Section>
      </Flex>
    </Section>
  )
}

export default PaymentReciept 