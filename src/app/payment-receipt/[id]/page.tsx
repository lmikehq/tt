'use client';

import { PDFViewer } from '@react-pdf/renderer';
import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
import Flex from '@/components/templates/flex';
import ttLogo from 'public/assets/images/brand/tt_blue_logo_with_text1.png';
import { ttColors } from '@/lib/theme/colors';
import { StyleSheet } from '@react-pdf/renderer';
import { useParams } from 'next/navigation';
import { usePaymentReceipt } from "@/lib/hooks/dashboard/payment.hook";
import Spinner from "@/components/molecules/icons/spinner";
import { IUser, ReceiptProp } from "@/lib/types/response-models/dashboard";
import { format } from "date-fns";

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

type Props = {
  paymentData: ReceiptProp;
  userData: IUser;
};

function PaymentRecieptPage() {
  const router = useParams();
  const { data, isLoading } = usePaymentReceipt({
    query: router?.id as string,
    options: { retry: 2 }
  });

  if (isLoading) {
    return (
      <Flex height="450px" align="center" justify="center">
        <Spinner size="60px" fill={ttColors.blackishBlue} />
      </Flex>
    );
  }
  const { userData: user, paymentData: receipt } = data as Props;

  return (

    <PDFViewer width="100%" showToolbar={true} height="900">
      <Document>
        {/* PAGE 1 */}
        <Page size='A4'>
          <Flex direction='column' align='center' margin='0 0 14px'>
            {/* eslint-disable jsx-a11y/alt-text */}
            <Image src={ttLogo.src} style={{ height: '57px', width: '57px', objectFit: 'contain' }} />
            <Text style={{ color: ttColors.foundation.gray, fontSize: '12px' }}>Generated on {format(new Date(), 'dd-MM-yyyy')}</Text>
          </Flex>
          <Flex margin='0 0 20px' direction='column' justify='center' align='center'>
            <Text style={{ fontSize: '12px', fontWeight: 600 }}> Transaction Receipt</Text>
            <Text style={{ color: ttColors.foundation.gray, fontSize: 12 }} > Payment Reference: {receipt.reference.toUpperCase()} </Text>
          </Flex>

          <Flex styles={{ backgroundColor: ttColors.primary300, padding: '24px', margin: '24px', borderRadius: '8px' }} justify='center'>
            <Text style={{ color: ttColors.blackishBlue, fontWeight: 500, margin: '0 0 10px', width: '100%', fontSize: '14px' }}> Dear , {user.firstName} {user.lastName} </Text>

            <Flex direction='row' padding='20px 0' borderBottom='1px solid #AFDEF2'>
              <Text style={[styles.subTitle]}> Transaction Amount: </Text>
              <Text style={[styles.subResponse]}> {receipt.currency} {receipt.totalAmount} </Text>
            </Flex>

            <Flex direction='row' padding='20px 0' borderBottom='1px solid #AFDEF2'>
              <Text style={[styles.subTitle]}> Payment Intent: </Text>
              <Text style={[styles.subResponse]}> {receipt.paymentIntent} </Text>
            </Flex>

            <Flex direction='row' padding='20px 0' borderBottom='1px solid #AFDEF2'>
              <Text style={[styles.subTitle]}> Payment Mode: </Text>
              <Text style={[styles.subResponse]}> {receipt.method} </Text>
            </Flex>

            <Flex direction='row' padding='20px 0' borderBottom='1px solid #AFDEF2'>
              <Text style={[styles.subTitle]}> Transaction Date: </Text>
              <Text style={[styles.subResponse]}> {format(new Date(receipt.createdAt), 'dd-MM-yyyy')} </Text>
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
                <Text style={[styles.subResponse]}> {receipt.description} </Text>
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