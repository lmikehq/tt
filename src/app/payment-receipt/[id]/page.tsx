'use client';
import { PDFViewer } from '@react-pdf/renderer';
import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
import Flex from '@/components/templates/flex';
import ttLogo from 'public/assets/images/brand/tt_blue_logo_with_text1.png';
import { ttColors } from '@/lib/theme/colors';
import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  subTitle: {
    fontSize: '12px',
    fontWeight: 600,
    width: '200px'
  },
  subResponse: {
    color: ttColors.blackishBlue,
    fontSize: '12px',
    fontWeight: 400
  },
  flexContainer: {}
});

function PaymentRecieptPage() {
  return (
    <PDFViewer width="100%" showToolbar={true} height="900">
      <Document>
        {/* PAGE 1 */}
        <Page size='A4'>
          <Flex direction='column' align='center' margin='0 0 14px'>
            {/* eslint-disable jsx-a11y/alt-text */}
            <Image src={ttLogo.src} style={{ height: '57px', width: '57px', objectFit: 'contain' }} />
            <Text style={{ color: ttColors.foundation.gray, fontSize: '12px' }}>Generated on 21, December 2023</Text>
          </Flex>
          <Flex margin='0 0 20px' direction='column' justify='center' align='center'>
            <Text style={{ fontSize: '12px', fontWeight: 600 }}> Transaction Receipt</Text>
            <Text style={{ color: ttColors.foundation.gray, fontSize: 12 }} > Payment ID: THR-UASNIUUB </Text>
          </Flex>

          <Flex styles={{ backgroundColor: ttColors.primary300, padding: '24px', margin: '24px', borderRadius: '8px' }} justify='center'>
            <Text style={{ color: ttColors.blackishBlue, fontWeight: 500, margin: '0 0 10px', width: '100%', fontSize: '14px' }}> Dear Angela Abiodun, </Text>

            <Flex direction='row' padding='20px 0' borderBottom='1px solid #AFDEF2'>
              <Text style={[styles.subTitle]}> Transaction Amount: </Text>
              <Text style={[styles.subResponse]}> NGN 5,000,000 </Text>
            </Flex>

            <Flex direction='row' padding='20px 0' borderBottom='1px solid #AFDEF2'>
              <Text style={[styles.subTitle]}> Payment Intent: </Text>
              <Text style={[styles.subResponse]}> Visa Processing </Text>
            </Flex>

            <Flex direction='row' padding='20px 0' borderBottom='1px solid #AFDEF2'>
              <Text style={[styles.subTitle]}> Payment Mode: </Text>
              <Text style={[styles.subResponse]}> Bank Transfer </Text>
            </Flex>

            <Flex direction='row' padding='20px 0' borderBottom='1px solid #AFDEF2'>
              <Text style={[styles.subTitle]}> Transaction Date: </Text>
              <Text style={[styles.subResponse]}> 30 October, 2023 </Text>
            </Flex>

            <Flex direction='row' padding='20px 0' borderBottom='1px solid #AFDEF2'>
              <Text style={[styles.subTitle]}> Receipt Account: </Text>
              <Flex gap='10px' direction='column'>
                <Text style={[styles.subResponse]}> Thrillers Account </Text>
                <Text style={[styles.subResponse]}> 9065387123 </Text>
                <Text style={[styles.subResponse]}> PalmPay Limited </Text>
              </Flex>
            </Flex>

            <Flex direction='row' padding='20px 0'>
              <Text style={[styles.subTitle]}> Description: </Text>
              <Flex gap='10px' direction='column'>
                <Text style={[styles.subResponse]}> Covers Visa Application fee for Angela Benedict. </Text>
              </Flex>
            </Flex>
          </Flex>

          <Flex direction='column' gap='12px' margin='24px'>
            <Text
              style={[styles.subResponse, { color: ttColors.blackLight }]}
            >
              If you have any questions or would like more information, please call our 24-hour Contact Centre
            </Text>
            <Text
              style={[styles.subResponse, { color: ttColors.blackLight }]}
            >
              Call Thrillers, 070 9328763, +234 1-7605881-4, +234 1-9117209 or send an email to help@thrillerstravels.com
            </Text>
          </Flex>

          <Text style={[styles.subResponse, { color: '#000', fontWeight: 600, margin: '24px' }]}> Thank you for choosing Thrillers Travels </Text>
        </Page>
      </Document>
    </PDFViewer >
  );
}

export default PaymentRecieptPage;